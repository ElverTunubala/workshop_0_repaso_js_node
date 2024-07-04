class Task {
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }
}

class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.loadTasks();
  }

  addTask(description) {
    const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    const task = new Task(id, description);
    console.dir(task);
    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  toggleTaskComplete(id) {
    //Obtenemos la tarea segun el id
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.toggleComplete();
      this.saveTasks();
      this.renderTasks();
    }
  }

  editTask(id, newDescription) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.updateDescription(newDescription);
      this.saveTasks();
      this.renderTasks();
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    this.renderTasks();
  }

  renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    this.tasks.forEach((task) => {
      const item = document.createElement('li');
      item.className = task.completed ? 'completed' : '';

      const descriptionSpan = document.createElement('span');
      descriptionSpan.textContent = task.description;
      descriptionSpan.addEventListener('click', () =>
        this.toggleTaskComplete(task.id)
      );

      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const newDescription = prompt('Editar tarea', task.description);
        if (newDescription) {
          this.editTask(task.id, newDescription);
        }
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteTask(task.id);
      });

      const taskCompletedButton = document.createElement('button');
      taskCompletedButton.textContent = 'completar';
      taskCompletedButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleTaskComplete(task.id);
      });

      item.appendChild(descriptionSpan);
      item.appendChild(editButton);
      item.appendChild(deleteButton);
      item.appendChild(taskCompletedButton);
      taskList.appendChild(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager();
  document.getElementById('add-task').addEventListener('click', () => {
    const newTask = document.getElementById('new-task').value;
    if (newTask) {
      taskManager.addTask(newTask);
      document.getElementById('new-task').value = '';
    }
  });
});
