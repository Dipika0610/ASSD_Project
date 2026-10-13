let nextId = 1;
const all = [];

function getAll() {
  return all;
}

function add(title) {
  const task = {
    id: nextId,
    title: title,
    done: false
  };
  nextId = nextId + 1;
  all.push(task);
  return task;
}

function toggle(id) {
  const task = all.find(function (t) {
    return t.id === id;
  });

  if (!task) {
    return null;
  }

  task.done = !task.done;
  return task;
}

function remove(id) {
  const index = all.findIndex(function (t) {
    return t.id === id;
  });

  if (index === -1) {
    return false;
  }

  all.splice(index, 1);
  return true;
}

function clear() {
  all.length = 0;
  nextId = 1;
}

module.exports = { getAll, add, toggle, remove, clear };
