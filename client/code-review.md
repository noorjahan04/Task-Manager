# Code Review: AI-Generated Code Issues

## Issue 1: Missing Error Handling in Async Routes

**File:** `server/controllers/taskController.js` (original version)

**Issue:** The initial AI-generated controller methods lacked proper try/catch blocks.

**Original code:**
```javascript
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

Problem: If the database query fails, the server crashes without proper error response.

Fix: Added try/catch blocks and passed errors to error handler:

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort('-createdAt');
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

## Issue 2: No Input Validation

File: server/routes/taskRoutes.js (original version)

Issue: The POST route didn't validate incoming data before saving to database.

Original code:
router.post('/', createTask);

Problem: Malformed data could corrupt the database or cause validation errors at the database level instead of providing helpful feedback.

Fix: Added express-validator middleware:

const taskValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must be less than 100 characters')
];

router.post('/', taskValidationRules, createTask);


## Issue 3: Missing Key Prop in React List

File: client/src/components/TaskList.jsx (original version)

Issue: The list rendering used index as key.

Original code:
{tasks.map((task, index) => (
  <TaskItem key={index} task={task} />
))}

Problem: Using index as key can cause rendering issues when items are reordered, added, or deleted. It also leads to state bugs with controlled components.

Fix: Used unique MongoDB _id as key:

{tasks.map(task => (
  <TaskItem
    key={task._id}
    task={task}
    onToggle={onToggleTask}
    onDelete={onDeleteTask}
  />
))}


## Issue 4: Environment Variables Hardcoded

File: server/config/db.js (original version)

Issue: MongoDB URI was hardcoded in the connection string.

Original code:
mongoose.connect('mongodb://localhost:27017/taskmanager')

Problem: This breaks in different environments (development, testing, production).

Fix: Used environment variables with dotenv:

mongoose.connect(process.env.MONGODB_URI, {
});


## Issue 5: No 404 Handling for Single Resource

File: server/controllers/taskController.js (original version)

Issue: The getTask method didn't handle non-existent IDs properly.

Original code:
const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

Problem: Returns null with 200 status instead of 404 for non-existent resources.

Fix: Added proper 404 response:

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};


## Bonus: AI Self-Review

- When I asked Copilot to review the TaskItem component, it identified:

- Accessibility Issue: Missing ARIA labels for interactive elements

- Date Formatting: Hardc