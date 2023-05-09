const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const mailControllers = require("../controllers/mail");
const router = express.Router();
const { createMail, getAllInbox,getMailById, repplyMailInbox, getAllRepply, readMail, unReadMail, moveToTrash, getAllSent, getAllTrash } = mailControllers;

router.use(checkAuth);
router.post(
  "/",
  [
    check('to').not().isEmpty(),
    check('title').not().isEmpty(),
    check('body').not().isEmpty()
  ],
  createMail
);
router.get('/inbox', getAllInbox);
router.get('/sent', getAllSent);
router.get('/trash', getAllTrash);
router.get('/:mailId', getMailById);
router.post(
  "/repply",
  [
    check('to').not().isEmpty(),
    check('body').not().isEmpty()
  ],
  repplyMailInbox
);

router.get('/repply/:mail', getAllRepply);

router.patch('/read/:mailId', readMail)
router.patch('/unread/:mailId', unReadMail)

router.delete('/moveToTrash/:mailId', moveToTrash)


module.exports = router;
