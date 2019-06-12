import express from 'express';
import mongoose from 'mongoose';

import {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, NOT_FOUND,
} from '../configs/httpStatusCodes';
import Lifecycle from '../models/lifecycle';
import Issue from '../models/issue';
import User from '../models/user';

const router = express.Router();

router.get('/:issueid', async (req, res) => {
  const { issueid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(issueid)) {
    return res.status(BAD_REQUEST).send('Invalid issueID');
  }

  let issue;
  try {
    issue = await Issue.findById(issueid)
      .populate('createdBy')
      .exec();
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  if (issue === null) {
    return res.status(NOT_FOUND).send(`Issue with id ${issueid} is not present.`);
  }

  return res.status(OK).send(issue);
});

router.post('/', async (req, res) => {
  const { lifecycleid, issue, createdBy } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(lifecycleid)
    || !issue
    || !mongoose.Types.ObjectId.isValid(createdBy)
  ) {
    return res.status(BAD_REQUEST).send('Invalid lifecycleID');
  }

  const issueDocument = { issue, createdBy };

  let savedIssue;
  try {
    savedIssue = await Issue.create(issueDocument);
    await Lifecycle.findOneAndUpdate({ _id: lifecycleid }, { $push: { issues: savedIssue._id } });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error saving new issue ${e.message}`);
  }

  return res.send(savedIssue);
});

router.patch('/:issueid/assignee', async (req, res) => {
  const { issueid } = req.params;
  const { assigneeid } = req.body;

  if (!mongoose.Types.ObjectId.isValid(issueid)) {
    return res.status(BAD_REQUEST).send('Invalid issueid');
  }

  let updateObject;
  if (assigneeid === null) {
    updateObject = { $unset: { assignee: '' } };
  } else {
    if (!mongoose.Types.ObjectId.isValid(assigneeid)) {
      return res.status(BAD_REQUEST).send('Invalid assigneeid');
    }

    updateObject = { $set: { assignee: assigneeid } };
  }

  let savedIssue;
  try {
    savedIssue = await Issue.findOneAndUpdate(issueid, updateObject, { new: true });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error setting new assignee ${e.message}`);
  }

  if (savedIssue === null) {
    return res.status(NOT_FOUND).send(`Issue with id ${issueid} is not present.`);
  }

  return res.status(OK).send(savedIssue);
});

export default router;
