import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

// Using the Composition pattern for our store and not the Options pattern
// Inside here we can define our reactive variables and functions (methods)
// We always need to return an object with the reactive variables and functions
// So that we can use them in our components
export const useTasksStore = defineStore('tasks', () => {
  let tasks = reactive([
    {
      name: 'Website design',
      description:
        'Define the style guide, branding and create the webdesign on Figma.',
      completed: true,
      id: 1,
    },
    {
      name: 'Website development',
      description: 'Develop the portfolio website using Vue JS.',
      completed: false,
      id: 2,
    },
    {
      name: 'Hosting and infrastructure',
      description:
        'Define hosting, domain and infrastructure for the portfolio website.',
      completed: false,
      id: 3,
    },
    {
      name: 'Composition API',
      description:
        'Learn how to use the composition API and how it compares to the options API.',
      completed: true,
      id: 4,
    },
    {
      name: 'Pinia',
      description: 'Learn how to setup a store using Pinia.',
      completed: true,
      id: 5,
    },
    {
      name: 'Groceries',
      description: 'Buy rice, apples and potatos.',
      completed: false,
      id: 6,
    },
    {
      name: 'Bank account',
      description: 'Open a bank account for my freelance business.',
      completed: false,
      id: 7,
    },
  ]);

  let filterBy = ref('');

  function setFilter(value) {
    filterBy.value = value;
  }

  const filteredTasks = computed(() => {
    switch (filterBy.value) {
      case 'todo':
        return tasks.filter((task) => !task.completed);
      case 'done':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  function addTask() {
    if (newTask.name && newTask.description) {
      newTask.id = Math.max(...tasks.map((task) => task.id)) + 1;
      tasks.push(newTask);
      newTask = { completed: false };
    } else {
      alert('Please enter title and description for the new task.');
    }
  }

  function toggleTaskStatus(id) {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
  }

  return {
    tasks,
    filterBy,
    setFilter,
    filteredTasks,
    addTask,
    toggleTaskStatus,
  };
});
