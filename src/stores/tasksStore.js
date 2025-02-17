import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

// Using the Composition pattern for our store and not the Options pattern
// Inside here we can define our reactive variables and functions (methods)
// We always need to return an object with the reactive variables and functions
// So that we can use them in our components
export const useTasksStore = defineStore('tasks', () => {
  let tasks = reactive(JSON.parse(localStorage.getItem('tasks')) || []);

  let modalIsActive = ref(false);

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

  function addTask(newTask) {
    if (newTask.name && newTask.description) {
      newTask.id = tasks.length
        ? Math.max(...tasks.map((task) => task.id)) + 1
        : 1;
      tasks.push(newTask);
      closeModal();
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

  function openModal() {
    modalIsActive.value = true;
  }

  function closeModal() {
    modalIsActive.value = false;
  }

  return {
    tasks,
    modalIsActive,
    filterBy,
    setFilter,
    filteredTasks,
    addTask,
    toggleTaskStatus,
    openModal,
    closeModal,
    modalIsActive,
  };
});
