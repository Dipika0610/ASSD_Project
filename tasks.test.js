const test = require('node:test');
const assert = require('node:assert');
const tasks = require('./tasks');

test('starts with an empty list', function () {
  tasks.clear();
  assert.deepStrictEqual(tasks.getAll(), []);
});

test('adds a task and gives it the next id', function () {
  tasks.clear();

  const first = tasks.add('Learn Docker');
  const second = tasks.add('Write a workflow');

  assert.strictEqual(first.id, 1);
  assert.strictEqual(second.id, 2);
  assert.strictEqual(second.done, false);
  assert.strictEqual(tasks.getAll().length, 2);
});

test('toggles a task between done and not done', function () {
  tasks.clear();
  const task = tasks.add('Push to GitHub');

  assert.strictEqual(tasks.toggle(task.id).done, true);
  assert.strictEqual(tasks.toggle(task.id).done, false);
});

test('returns null when toggling a task that does not exist', function () {
  tasks.clear();
  assert.strictEqual(tasks.toggle(999), null);
});

test('removes a task', function () {
  tasks.clear();
  const task = tasks.add('Temporary task');

  assert.strictEqual(tasks.remove(task.id), true);
  assert.deepStrictEqual(tasks.getAll(), []);

  assert.strictEqual(tasks.remove(task.id), false);
});
