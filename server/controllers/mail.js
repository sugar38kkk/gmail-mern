const Mail = require("../models/mail");
const User = require("../models/user");
const Repply = require("../models/repply");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const createMail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please try again!", 422));
  }
  const sender = req.userData.userId;
  const { to, title, body } = req.body;
  existingUser = await User.findOne({ phone: to });
  if (!existingUser) {
    return next(new HttpError("Arrive not found, please try again!", 404));
  }
  const createdPost = await Mail.create({
    to,
    title,
    body,
    sender,
  });
  try {
    const sess = await mongoose.startSession(); //start session
    sess.startTransaction(); //start transaction
    await createdPost.save({ session: sess }); //save new doc with the new post
    //(BTS: MongoDB grabs just the post id and adds it to the "posts" array in the "user" doc)
    await sess.commitTransaction(); //session commits the transaction
    //only at this point, the changes are saved in DB... anything goes wrong, EVERYTHING is undone by MongoDB
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating mail failed, please try again", 500));
  }
  res.status(201).json({
    isOk: true,
  });
};

const getAllInbox = async (req, res, next) => {
  let mails;
  try {
    mails = await Mail.find({
      to: req.userData.phone,
      isDeleted: false
    })
      .sort({ date: "desc" })
      .populate("sender");
  } catch (err) {
    return next(new HttpError("Could not fetch mails, please try again", 500));
  }
  res.json({ mails: mails.map((post) => post.toObject({ getters: true })) });
};

const getAllSent = async (req, res, next) => {
  let mails;
  try {
    mails = await Mail.find({
      sender: req.userData.userId,
      isDeleted: false
    })
      .sort({ date: "desc" })
      .populate("sender");
  } catch (err) {
    return next(new HttpError("Could not fetch mails, please try again", 500));
  }
  res.json({ mails: mails.map((post) => post.toObject({ getters: true })) });
};

const getAllTrash = async (req, res, next) => {
  let mails;
  try {
    mails = await Mail.find({
      to: req.userData.phone,
      isDeleted: true
    })
      .sort({ date: "desc" })
      .populate("sender");
  } catch (err) {
    return next(new HttpError("Could not fetch mails, please try again", 500));
  }
  res.json({ mails: mails.map((post) => post.toObject({ getters: true })) });
};

const getMailById = async (req, res, next) => {
  const { mailId } = req.params;
  let mail;
  try {
    mail = await Mail.findById(mailId).populate("sender");
    //findById works directly on the contructor fn
  } catch (err) {
    //stop execution in case of error
    return next(new HttpError("Something went wrong with the server", 500));
  }
  if (!mail) {
    return next(new HttpError("Could not find post for the provided ID", 404));
  }

  mail.isRead = true
  await mail.save()
  //post is a special mongoose obj; convert it to normal JS obj using toObject
  //get rid of "_" in "_id" using { getters: true }
  res.json({ mail: mail.toObject({ getters: true }) });
};

const repplyMailInbox = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please try again!", 422));
  }
  const sender = req.userData.userId;
  const { to, body, mail } = req.body;
  existingUser = await User.findOne({ phone: to });
  if (!existingUser) {
    return next(new HttpError("Arrive not found, please try again!", 404));
  }
  const repplyMail = await Repply.create({
    to,
    body,
    sender,
    mail
  });
  try {
    const sess = await mongoose.startSession(); //start session
    sess.startTransaction(); //start transaction
    await repplyMail.save({ session: sess }); //save new doc with the new post
    //(BTS: MongoDB grabs just the post id and adds it to the "posts" array in the "user" doc)
    await sess.commitTransaction(); //session commits the transaction
    //only at this point, the changes are saved in DB... anything goes wrong, EVERYTHING is undone by MongoDB
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating mail failed, please try again", 500));
  }
  res.status(201).json({
    isOk: true,
  });
};

const getAllRepply = async (req, res, next) => {
  let mails;
  try {
    mails = await Repply.find({
      mail: req.params.mail,
    })
      .sort({ date: "desc" })
      .populate("sender");
  } catch (err) {
    return next(new HttpError("Could not fetch mails, please try again", 500));
  }
  res.json({ mails: mails.map((post) => post.toObject({ getters: true })) });
};

const readMail = async (req, res, next) => {
  const { mailId } = req.params;
  let mail;
  try {
    mail = await Mail.findById(mailId).populate("sender");
    //findById works directly on the contructor fn
  } catch (err) {
    //stop execution in case of error
    return next(new HttpError("Something went wrong with the server", 500));
  }
  if (!mail) {
    return next(new HttpError("Could not find post for the provided ID", 404));
  }

  mail.isRead = true
  await mail.save()
  //post is a special mongoose obj; convert it to normal JS obj using toObject
  //get rid of "_" in "_id" using { getters: true }
  res.json({ isOk: true});
};

const unReadMail = async (req, res, next) => {
  const { mailId } = req.params;
  let mail;
  try {
    mail = await Mail.findById(mailId).populate("sender");
    //findById works directly on the contructor fn
  } catch (err) {
    //stop execution in case of error
    return next(new HttpError("Something went wrong with the server", 500));
  }
  if (!mail) {
    return next(new HttpError("Could not find post for the provided ID", 404));
  }

  mail.isRead = false
  await mail.save()
  //post is a special mongoose obj; convert it to normal JS obj using toObject
  //get rid of "_" in "_id" using { getters: true }
  res.json({ isOk: true});
};


const moveToTrash = async (req, res, next) => {
  const { mailId } = req.params;
  let mail;
  try {
    mail = await Mail.findById(mailId).populate("sender");
    //findById works directly on the contructor fn
  } catch (err) {
    //stop execution in case of error
    return next(new HttpError("Something went wrong with the server", 500));
  }
  if (!mail) {
    return next(new HttpError("Could not find post for the provided ID", 404));
  }

  mail.isDeleted = true
  await mail.save()
  //post is a special mongoose obj; convert it to normal JS obj using toObject
  //get rid of "_" in "_id" using { getters: true }
  res.json({ isOk: true});
};

exports.createMail = createMail;
exports.getAllInbox = getAllInbox;
exports.getMailById = getMailById;
exports.repplyMailInbox = repplyMailInbox
exports.getAllRepply = getAllRepply
exports.readMail = readMail
exports.unReadMail = unReadMail
exports.moveToTrash = moveToTrash
exports.getAllSent = getAllSent
exports.getAllTrash = getAllTrash