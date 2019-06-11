import express from 'express';
import mongoose from 'mongoose';

import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../configs/httpStatusCodes';
import Lifecycle from '../models/lifecycle';
import Issue from '../models/issue';

const router = express.Router();

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

export default router;
