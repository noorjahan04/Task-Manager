// AI-generated, reviewed and modified
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  deleteCompletedTasks
} = require('../controllers/taskController');

// Validation rules
const taskValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high')
];

// Routes
router.route('/')
  .get(getTasks)
  .post(taskValidationRules, createTask);

router.route('/completed')
  .delete(deleteCompletedTasks);

router.route('/:id')
  .get(getTask)
  .patch(taskValidationRules, updateTask)
  .delete(deleteTask);

router.patch('/:id/toggle', toggleTask);

module.exports = router;