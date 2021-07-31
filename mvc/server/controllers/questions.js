const Question = require('../models/question');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.loadQuestions = async (req, res, next, id) => {
  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: 'Η ερώτηση δεν βρέθηκε' });
    req.question = question;
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Το id της ερώτησης δεν βρέθηκε.' });
    return next(error);
  }
  next();
};

exports.createQuestion = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  try {
    const { title, tags, text } = req.body;
    const author = req.user.id;
    const question = await Question.create({
      title,
      author,
      tags,
      text
    });
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.question;
    const question = await Question.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('answers');
    res.json(question);
  } catch (error) {
    next(error);
  }
};

exports.listQuestions = async (req, res, next) => {
  try {
    const { sortType = '-score' } = req.body;
    const questions = await Question.find().sort(sortType);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.listByTags = async (req, res, next) => {
  try {
    const { sortType = '-score', tags } = req.params;
    const questions = await Question.find({ tags: { $all: tags } }).sort(sortType);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.listByUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { sortType = '-created' } = req.body;
    const author = await User.findOne({ username });
    const questions = await Question.find({ author: author.id }).sort(sortType).limit(10);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.removeQuestion = async (req, res, next) => {
  try {
    await req.question.remove();
    res.json({ message: 'Η ερώτηση διαγράφηκε.' });
  } catch (error) {
    next(error);
  }
};

exports.loadComment = async (req, res, next, id) => {
  try {
    const comment = await req.question.comments.id(id);
    if (!comment) return res.status(404).json({ message: 'Το σχόλιο δεν βρέθηκεσ.' });
    req.comment = comment;
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ message: 'Το id του σχολίου δεν βρέθηκε.' });
    return next(error);
  }
  next();
};

exports.questionValidate = [
  body('title')
    .exists()
    .trim()
    .withMessage('Απαιτείται')

    .notEmpty()
    .withMessage('Μπορείτε να προσθέτε μέχρι 100 tags')

    .isLength({ max: 180 })
    .withMessage('Βάλατε πολλούς χαρακτήρες'),

  body('text')
    .exists()
    .trim()
    .withMessage('Απαιτείται')

    .isLength({ min: 10 })
    .withMessage('Μην ντρέπεστε, γράψτε κάτι παραπάνω.')

    .isLength({ max: 5000 })
    .withMessage('Βάλατε πολλούς χαρακτήρες'),

  body('tags').exists().withMessage('Απαιτείται')
];
