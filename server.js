const express = require('express');
const path = require('path');
const tasks = require('./tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tasks', function (req, res) {
  res.json(tasks.getAll());
});

app.post('/api/tasks', function (req, res) {
  const title = String(req.body.title || '').trim();

  if (title === '') {
    return res.status(400).json({ error: 'A task needs a title.' });
  }

  res.status(201).json(tasks.add(title));
});

app.patch('/api/tasks/:id', function (req, res) {
  const task = tasks.toggle(Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  res.json(task);
});

app.delete('/api/tasks/:id', function (req, res) {
  const deleted = tasks.remove(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  res.status(204).end();
});

app.get('/health', function (req, res) {
  res.json({ status: 'ok' });
});

app.listen(PORT, function () {
  console.log('TaskBoard is running. Open http://localhost:' + PORT);
});
