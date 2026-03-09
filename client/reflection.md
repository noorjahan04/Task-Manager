# Reflection: Working with AI Tools in Software Development

## Introduction
Building this Task Manager application using AI assistance (Cursor/Copilot) was an illuminating experience that revealed both the power and limitations of current AI coding tools. This reflection explores specific moments where AI excelled, where it fell short, and how this workflow differs from traditional development.

## Moments of AI Excellence

### 1. Project Scaffolding (Saved ~45 minutes)
The most time-saving moment was when I used Cursor's Cmd+K to generate the entire MVC project structure. A single prompt: "Create a Node.js/Express server with MVC pattern, MongoDB connection, and basic routes" produced a complete, working backend foundation. What made this prompt successful was its specificity - I clearly stated the architecture pattern (MVC), the database (MongoDB), and the basic requirements. The AI understood context and generated not just the package.json, but also the folder structure, model schema, controller methods, and route handlers with proper error handling.

**What worked well:**
- The AI correctly implemented the MVC separation
- It generated proper Mongoose schema with validation
- It created RESTful routes following conventions
- It included basic error handling in controllers

### 2. React Component Generation (Saved ~30 minutes)
Another impressive moment was when the AI generated the complete TaskItem component with all features. The prompt "Create a React component for a task item that shows title, priority badge with colors, completion status, and has toggle/delete functionality" produced a component with:

```jsx
const TaskItem = ({ task, onToggle, onDelete }) => {
  const priorityColors = {
    high: '#ff6b6b',
    medium: '#feca57',
    low: '#48dbfb'
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
        />
        <span className="task-title">{task.title}</span>
        <span className="task-priority" style={{ backgroundColor: priorityColors[task.priority] }}>
          {task.priority}
        </span>
      </div>
      <button onClick={() => onDelete(task._id)} className="delete-btn">🗑️</button>
    </div>
  );
};

## The AI correctly handled all requirements:

- Priority-based color coding

- Conditional styling for completed tasks

- Proper event handlers

- Accessible button with emoji icon

## AI Shortcomings and How I Detected Them

1. Path-to-Regexp Error in Route Handling
The Issue: The AI generated a route handler with invalid syntax:
app.use('/api/*', (req, res) => { ... })

How I Detected It: When starting the server, I got a clear error:
 PathError [TypeError]: Missing parameter name at index 6:/api

 What Went Wrong: The AI used Express route syntax incorrectly. Express doesn't support wildcards * in that format. It should have used a function to check the URL or a proper parameterized route.

The Fix: I had to manually correct it to:

app.use((req, res) => {
  if (req.url.startsWith('/api')) {
    res.status(404).json({ error: 'API route not found' });
  }
});

2. Missing Input Validation
The Issue: The initial POST route had no validation:
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

How I Detected It: During testing, I sent a POST request with empty title and the server accepted it, creating invalid tasks in the database.

What Went Wrong: The AI optimized for the "happy path" and didn't consider edge cases or data integrity. It assumed the client would always send valid data.

The Fix: I had to explicitly ask for validation and implement it:

const { body, validationResult } = require('express-validator');

const taskValidationRules = [
  body('title').notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title too long')
];


3. Missing Key Props in React Lists
The Issue: The AI generated TaskList without key props:
{tasks.map(task => (
  <TaskItem task={task} />
))}

How I Detected It: React logged warnings in the browser console about missing keys. Also, when testing with dynamic updates, I noticed UI glitches.

What Went Wrong: The AI prioritized visual output over React best practices, treating key props as optional rather than required.

The Fix: Added unique key prop:

{tasks.map(task => (
  <TaskItem key={task._id} task={task} />
))}


## Impact on Development Workflow

Working with an AI editor fundamentally changed my development rhythm. Instead of writing code line-by-line, I found myself in a constant loop of: prompt → review → modify → prompt again. This felt more like pair programming with a very fast but occasionally naive junior developer.

## Positive Changes:

1. Faster Prototyping: I could go from idea to working prototype in minutes

2. Less Context Switching: AI handled syntax details while I focused on architecture

3. Learning Opportunity: I saw different approaches to solving problems

4. Documentation Generation: AI helped create READMEs and comments

##Challenges:

1. Constant Vigilance: I had to review every line of generated code

2. Prompt Engineering: Learning how to ask the right questions

3. Debugging AI Mistakes: Sometimes harder than writing from scratch

4. Trust Issues: Never sure if the code is production-ready

Would I Use AI on a Real Project?
Yes, but with significant caveats.

## Where I'd Use AI:

- Boilerplate Code: Generating basic CRUD operations, routes, models

- Initial Project Setup: Scaffolding folder structure, configuration files

- Documentation: Creating READMEs, comments, API documentation

- Simple Components: Basic UI components with clear requirements

- Tests: Generating test cases for existing code

## Where I'd Be Cautious:

- Security-Critical Code: Authentication, authorization, payment processing

- Complex Business Logic: Anything with financial calculations or critical rules

- Performance Optimization: AI doesn't understand performance implications

- Edge Cases: AI rarely considers error scenarios

- Team Standards: AI might not follow team coding conventions

## Production Readiness Checklist:

For any AI-generated code I'd use in production, I'd need:

✅ Code review by team members

✅ Unit tests passing

✅ Integration tests passing

✅ Security audit

✅ Performance testing

✅ Error handling review

✅ Documentation updated


Advice for Junior Developers
Based on this experience, here's what junior developers need to be careful about when using AI editors on a team codebase:

1. Understand Before Accepting
Never commit AI-generated code you don't fully understand. The AI might use patterns or syntax you're unfamiliar with. Ask yourself:

- Can I explain this code to a teammate?

- Do I understand all the dependencies?

- What are the potential side effects?

2. Consistency Matters
AI might generate code that doesn't match your team's style guide or architectural patterns. Always format and structure AI code to match existing codebase conventions. Check:

- Naming conventions (camelCase, PascalCase)

- File structure and organization

- Error handling patterns

- Comment style and documentation

3. Security First
AI might suggest insecure patterns without realizing it. In my project, the AI generated an authentication middleware that just returned true:

const authenticateToken = (req, res, next) => {
  // Mock token validation - always passes
  req.user = { id: 1, name: 'Demo User' };
  next();
};

- A junior developer might not recognize this as insecure. Always:

- Never trust AI-generated security code

- Use established, vetted libraries for auth

- Follow security best practices from OWASP

- Get security code reviewed by seniors

4. Testing is Non-Negotiable
AI doesn't test its own code. Every AI-generated feature needs the same test coverage as manually written code. For my task manager, I had to manually add tests for:

- Input validation (empty title, wrong priority)

- Error handling (database errors, network issues)

- Edge cases (non-existent IDs, malformed requests)

- UI interactions (click events, form submission)

5. Documentation Debt
AI rarely generates good comments or documentation. The code it produces might work but be unmaintainable. For example, the AI generated this controller without explaining why certain choices were made:

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

- A junior developer needs to add:

- Why use findByIdAndUpdate vs save()

- Why return the new document

- What happens if the task doesn't exist

- Error handling strategy

6. Version Control Awareness
AI-generated code should be clearly marked in pull requests. In my commits, I added comments:

// AI-generated, reviewed and modified - TaskItem component
// Changes made: Added accessibility attributes, fixed key prop

This helps reviewers understand what to focus on.

7. Dependencies and Versions
AI might suggest outdated or incompatible dependencies. Always check:

- Latest stable versions

- Compatibility with your stack

- Security vulnerabilities

- License compatibility

8. Performance Implications
AI doesn't understand performance. It might generate:

- N+1 query problems

- Memory leaks in React components

- Inefficient algorithms

- Blocking operations

Junior developers need to profile and test performance.


## Conclusion

This experiment revealed that AI tools are powerful accelerators but not replacements for developer judgment. The best results came from treating AI as a smart assistant that handles routine tasks while I focused on architecture, validation, and edge cases.

Key Takeaways:

- AI excels at generating boilerplate and common patterns

- AI struggles with edge cases, security, and context

- Human review is absolutely essential

- Prompt quality directly impacts code quality

- Junior developers need extra caution with AI tools

As these tools evolve, the developer's role shifts from code writer to code curator - a change that requires new skills and increased vigilance. The future isn't AI replacing developers, but developers who use AI replacing those who don't.

Final Thought: AI is like a power tool - incredibly useful but dangerous if used without proper training and safety precautions. Use it wisely, review everything, and never stop learning the fundamentals.



