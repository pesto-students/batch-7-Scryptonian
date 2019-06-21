import express from 'express';
import mongoose, { mongo } from 'mongoose';

import {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, NOT_FOUND,
} from '../configs/httpStatusCodes';
import { roles } from '../configs/config';
import Lifecycle from '../models/lifecycle';
import Issue from '../models/issue';
import User from '../models/user';
import Comment from '../models/comment';
import userRoleCheck from '../middlewares/userRoleCheck';

const router = express.Router();

async function setAttribute(req, res) {
  const { issueid } = req.params;
  const { attributeName, attributeValue } = req.body;
  const modifiedBy = req.userid;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isIssueIdValid) {
    return res.status(BAD_REQUEST).send('Invalid issueid');
  }

  let updateObject;
  const attributeObject = {};
  if (attributeValue === null) {
    attributeObject[attributeName] = '';
    updateObject = { $unset: attributeObject, $set: { modifiedBy } };
  } else {
    attributeObject[attributeName] = attributeValue;
    updateObject = { $set: { ...attributeObject, modifiedBy } };
  }

  let savedIssue;
  try {
    savedIssue = await Issue.findByIdAndUpdate(issueid, updateObject, { new: true });
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

// Get details of a particular issue
router.get('/:issueid', async (req, res) => {
  const { issueid } = req.params;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isIssueIdValid) {
    return res.status(BAD_REQUEST).send('Invalid issueid');
  }

  let issue;
  try {
    issue = await Issue.findById(issueid)
      .populate({ path: 'comments', populate: { path: 'commentedBy' } })
      .populate({ path: 'createdBy' })
      .populate({ path: 'assignee' })
      .populate({ path: 'modifiedBy' })
      .populate({ path: 'labels' })
      .exec();
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  if (issue === null) {
    return res.status(NOT_FOUND).send(`Issue with ID ${issueid} is not present.`);
  }

  return res.status(OK).send(issue);
});

// Add a new issue
router.post('/', async (req, res) => {
  const { lifecycleid, issue } = req.body;
  const createdBy = req.userid;

  const isLifecycleIdValid = mongoose.Types.ObjectId.isValid(lifecycleid);

  if (!isLifecycleIdValid || !issue) {
    return res.status(BAD_REQUEST).send('Invalid lifecycleid or issue');
  }

  const issueDocument = { issue, createdBy, lifecycle: lifecycleid };

  let savedIssue;
  try {
    savedIssue = await Issue.create(issueDocument);
    await Lifecycle.findOneAndUpdate({ _id: lifecycleid }, { $push: { issues: savedIssue._id } });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error saving new issue. ${e.message}`);
  }

  return res.send(savedIssue);
});

// Delete an issue
router.delete('/:issueid', userRoleCheck(roles.ADMIN), async (req, res) => {
  const { issueid } = req.params;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isIssueIdValid) {
    return res.status(BAD_REQUEST).send('Invalid issueid');
  }

  try {
    const deletedIssue = await Issue.findByIdAndRemove(issueid).exec();
    await Lifecycle.findByIdAndUpdate(
      deletedIssue.lifecycle,
      { $pull: { issues: deletedIssue._id } },
      { new: true },
    );
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send('Error deleting issue');
  }

  return res.status(OK).send();
});

// Assign an issue to someone
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

// Add a due date to an issue
router.patch(
  '/:issueid/duedate',
  (req, res, next) => {
    req.body.attributeName = 'dueDate';
    req.body.attributeValue = req.body.duedate;
    next();
  },
  setAttribute,
);

// Add a comment to an issue
router.post('/:issueid/comment', async (req, res) => {
  const { issueid } = req.params;
  const { comment } = req.body;
  const commentedBy = req.userid;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isIssueIdValid || !comment) {
    return res.status(BAD_REQUEST).send('Invalid issueid or comment');
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

// Delete a comment from an issue
router.delete('/:issueid/comment/:commentid', async (req, res) => {
  const { issueid, commentid } = req.params;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  const isCommentIdValid = mongoose.Types.ObjectId.isValid(commentid);
  if (!isIssueIdValid || !isCommentIdValid) {
    return res.status(BAD_REQUEST).send('Invalid issueid or commentid');
  }

  let updatedIssue;
  try {
    const deletedComment = await Comment.findByIdAndRemove(commentid).exec();
    updatedIssue = await Issue.findByIdAndUpdate(
      issueid,
      { $pull: { comments: deletedComment._id } },
      { new: true },
    );
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send('Error deleting comment');
  }

  return res.status(OK).send(updatedIssue);
});

// Add/Remove an upvote from an issue
router.patch('/:issueid/upvote', async (req, res) => {
  const { issueid } = req.params;
  const userUpvoted = req.userid;

  const isIssueIdValid = mongoose.Types.ObjectId.isValid(issueid);
  if (!isIssueIdValid) {
    return res.status(BAD_REQUEST).send('Invalid issueid');
  }

  let issue;
  try {
    issue = await Issue.findById(issueid);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error getting issue. ${e.message}`);
  }

  if (issue === null) {
    return res.status(NOT_FOUND).send(`Issue with id ${issueid} is not present.`);
  }

  const peopleWhoUpvoted = issue.upvotedBy;
  let updateObject;
  if (peopleWhoUpvoted.includes(userUpvoted)) {
    updateObject = { $pull: { upvotedBy: userUpvoted }, $inc: { upvotes: -1 } };
  } else {
    updateObject = { $push: { upvotedBy: userUpvoted }, $inc: { upvotes: 1 } };
  }

  let updatedIssue;
  try {
    updatedIssue = await Issue.findByIdAndUpdate(issueid, updateObject, { new: true });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error changing upvote count. ${e.message}`);
  }

  return res.status(OK).send(updatedIssue);
});

// Update order of issues in lifecycles
router.patch('/reorder', async (req, res) => {
  const { lifecycles } = req.body;

  const lifecycleDocuments = lifecycles.map((lifecycle) => {
    const issueIds = lifecycle.issues.map(issue => issue._id);
    return {
      ...lifecycle,
      issues: issueIds,
    };
  });

  try {
    lifecycleDocuments.forEach(async (lifecycle) => {
      await Lifecycle.findByIdAndUpdate(lifecycle._id, { $unset: { issues: '' } }, { new: true });
      await Lifecycle.findByIdAndUpdate(
        lifecycle._id,
        { $set: { issues: lifecycle.issues } },
        { new: true },
      );
    });
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }

  return res.status(OK).send();
});

// Set a label to an issue
router.patch('/:issueid/label', async (req, res) => {
  const { issueid } = req.params;
  const { allLabels } = req.body;

  let updatedIssue;
  try {
    updatedIssue = await Issue.findByIdAndUpdate(issueid, { $set: { labels: [] } }, { new: true });
    updatedIssue = await Issue.findByIdAndUpdate(
      issueid,
      { $push: { labels: allLabels } },
      { new: true },
    );
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error setting label. ${e.message}`);
  }

  return res.status(OK).send(updatedIssue);
});

export default router;
