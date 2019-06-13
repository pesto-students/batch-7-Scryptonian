import express from 'express';
import mongoose from 'mongoose';

import {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, NOT_FOUND,
} from '../configs/httpStatusCodes';
import Lifecycle from '../models/lifecycle';
import Issue from '../models/issue';
import User from '../models/user';
import Comment from '../models/comment';

const router = express.Router();

async function setAttribute(req, res) {
  const { issueid } = req.params;
  const { attributeName, attributeValue } = req.body;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isIssueIdValid) {
    return res.status(BAD_REQUEST).send('Invalid issueid');
  }

  let updateObject;
  const attributeObject = {};
  if (attributeValue === null) {
    attributeObject[attributeName] = '';
    updateObject = { $unset: attributeObject };
  } else {
    attributeObject[attributeName] = attributeValue;
    updateObject = { $set: attributeObject };
  }

  let savedIssue;
  try {
    savedIssue = await Issue.findOneAndUpdate(issueid, updateObject, { new: true });
  } catch (e) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send(`Error setting new ${attributeName}. ${e.message}`);
  }

  if (savedIssue === null) {
    return res.status(NOT_FOUND).send(`Issue with ID ${issueid} is not present.`);
  }

  return res.status(OK).send(savedIssue);
}

router.get('/:issueid', async (req, res) => {
  const { issueid } = req.params;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isIssueIdValid) {
    return res.status(BAD_REQUEST).send('Invalid issueid');
  }

  let issue;
  try {
    issue = await Issue.findById(issueid)
      .populate({ path: 'comments' })
      .populate({ path: 'createdBy' })
      .populate({ path: 'assignee' })
      .populate({ path: 'modifiedBy' })
      .exec();
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  if (issue === null) {
    return res.status(NOT_FOUND).send(`Issue with ID ${issueid} is not present.`);
  }

  return res.status(OK).send(issue);
});

router.post('/', async (req, res) => {
  const { lifecycleid, issue, createdBy } = req.body;

  const isLifecycleIdValid = mongoose.Types.ObjectId.isValid(lifecycleid);
  const isCreatedByValid = mongoose.Types.ObjectId.isValid(createdBy);

  if (!isLifecycleIdValid || !issue || !isCreatedByValid) {
    return res.status(BAD_REQUEST).send('Invalid lifecycleid, issue or createdBy field');
  }

  const issueDocument = { issue, createdBy };

  let savedIssue;
  try {
    savedIssue = await Issue.create(issueDocument);
    await Lifecycle.findOneAndUpdate({ _id: lifecycleid }, { $push: { issues: savedIssue._id } });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error saving new issue. ${e.message}`);
  }

  return res.send(savedIssue);
});

router.patch(
  '/:issueid/assignee',
  (req, res, next) => {
    const { assigneeid } = req.body;
    req.body.attributeName = 'assignee';
    req.body.attributeValue = assigneeid;

    const isAssigneeIdValid = mongoose.Types.ObjectId.isValid(assigneeid);
    if (assigneeid !== null && !isAssigneeIdValid) {
      return res.status(BAD_REQUEST).send('Invalid assigneeid');
    }
    return next();
  },
  setAttribute,
);

router.patch(
  '/:issueid/duedate',
  (req, res, next) => {
    req.body.attributeName = 'dueDate';
    req.body.attributeValue = new Date(req.body.duedate);
    next();
  },
  setAttribute,
);

router.post('/:issueid/comment', async (req, res) => {
  const { issueid } = req.params;
  const { comment, commentedBy } = req.body;

  const isCommentedByValid = mongoose.Types.ObjectId.isValid(commentedBy);
  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isCommentedByValid || !isIssueIdValid || !comment) {
    return res.status(BAD_REQUEST).send('Invalid issueid, commentedBy or comment');
  }

  let savedIssue;
  try {
    const savedComment = await Comment.create({ comment, commentedBy });
    savedIssue = await Issue.findOneAndUpdate(
      { _id: issueid },
      { $push: { comments: savedComment._id } },
      { new: true },
    );
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error saving new comment. ${e.message}`);
  }

  return res.send(savedIssue);
});

export default router;
