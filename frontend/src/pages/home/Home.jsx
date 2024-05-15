import React, { useState } from 'react';
import "./Home.css";

const Home = () => {

  const confirmCloseDialog = document.getElementById("confirm-close-dialog");
  const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
  const tasksContainer = document.getElementById("tasks-container");

  const [tasks, setTasks] = useState([]);
  const [renderTasks, setRenderTasks] = useState(null);

  var today = new Date();
  var year = today.getFullYear();
  var mes = today.getMonth() + 1;
  var dia = today.getDate();
  var fecha = dia + "-" + mes + "-" + year;
  console.log(fecha);

  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({
    title: "",
    date: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  console.log(localStorage.data)

  const taskData = JSON.parse(localStorage.getItem("data")) || [];
  let currentTask = {};

  const addOrUpdateTask = () => {
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    const taskObj = {
      id: `${data.title.toLowerCase().split(" ").join("-")}-${Date.now()}`,
      title: data.title,
      date: data.date,
      description: data.description,
    };

    if (dataArrIndex === -1) {
      taskData.unshift(taskObj);
    } else {
      taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer()
    reset()
  };

  const updateTaskContainer = () => {
    // tasksContainer.innerHTML = "";

    // taskData.forEach(
    //   ({ id, title, date, description }) => {
    //     (tasksContainer.innerHTML += `
    //     <div class="task" id="${id}">
    //       <p><strong>Title:</strong> ${title}</p>
    //       <p><strong>Date:</strong> ${date}</p>
    //       <p><strong>Description:</strong> ${description}</p>
    //       <button onclick="editTask(this)" type="button" class="btn">Edit</button>
    //       <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
    //     </div>
    //   `)
    //   }
    // );
  };


  const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
      (item) => item.id === buttonEl.parentElement.id
    );

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
  }

  const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
      (item) => item.id === buttonEl.parentElement.id
    );
    currentTask = taskData[dataArrIndex];
    data.title = currentTask.title;
    data.date = currentTask.date;
    data.description = currentTask.description;
    addOrUpdateTaskBtn.innerText = "Update Task";
    setToggle(false)
  }

  const reset = () => {
    addOrUpdateTaskBtn.innerText = "Add Task";
    data.title = "";
    data.date = "";
    data.description = "";
    setToggle(false);
    currentTask = {};
  }

  if (taskData.length) {
    updateTaskContainer();
  }

  const openTaskFormBtn1 = () => {
    setToggle(true)
  };

  const closeTaskFormBtn1 = () => {
    const formInputsContainValues = data.title || data.date || data.description;
    const formInputValuesUpdated = data.title !== currentTask.title || data.date !== currentTask.date || data.description !== currentTask.description;

    if (formInputsContainValues && formInputValuesUpdated) {
      confirmCloseDialog.showModal();
    } else {
      reset();
    }
  };

  const cancelBtn1 = () => confirmCloseDialog.close();

  const discardBtn1 = () => {
    confirmCloseDialog.close();
    reset()
  };

  const taskForm1 = (e) => {
    e.preventDefault();
    addOrUpdateTask();
  };

  return (
    <main>
      <h1>Todo App</h1>
      <div class="todo-app">
        <button
          id="open-task-form-btn"
          onClick={() => openTaskFormBtn1()}
          class="btn large-btn"
        >
          Add New Task
        </button>
        <form
          class={toggle ? "task-form" : "hidden"}
          id="task-form"
          onSubmit={(e) => taskForm1(e)}
        >
          <div class="task-form-header">
            <button
              id="close-task-form-btn"
              class="close-task-form-btn"
              onClick={() => closeTaskFormBtn1}
              type="button"
              aria-label="close"
            >
              <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)" /><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)" /></svg>
            </button>
          </div>
          <div class="task-form-body">
            <label class="task-form-label" for="title-input">Title</label>
            <input
              required
              type="text"
              class="form-control"
              id="title-input"
              name='title'
              value={data.title}
              onChange={(e) => handleChange(e)}
            />
            <label class="task-form-label" for="date-input">Date</label>
            <input
              type="date"
              class="form-control"
              id="date-input"
              name='date'
              value={data.date}
              onChange={(e) => handleChange(e)}
            />
            <label class="task-form-label" for="description-input">Description</label>
            <textarea
              class="form-control"
              id="description-input"
              cols="30" rows="5"
              name='description'
              value={data.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div class="task-form-footer">
            <button id="add-or-update-task-btn" class="btn large-btn" type="submit">
              Add Task
            </button>
          </div>
        </form>
        <dialog id="confirm-close-dialog" >
          <form method="dialog">
            <p class="discard-message-text">Discard unsaved changes?</p>
            <div class="confirm-close-dialog-btn-container">
              <button id="cancel-btn" onClick={() => cancelBtn1()} class="btn">
                Cancel
              </button>
              <button id="discard-btn" onClick={() => discardBtn1()} class="btn">
                Discard
              </button>
            </div>
          </form>
        </dialog>
        <div id="tasks-container">
          {
            taskData.forEach(({ id, title, date, description }) => {
              console.log(title)
              return (
                <div class="task" id={id} key={id}>
                  <p><strong>Title:</strong> {title}</p>
                  <p><strong>Date:</strong> {date}</p>
                  <p><strong>Description:</strong> {description}</p>
                  <button onclick={(e) => editTask(e)} type="button" class="btn">Edit</button>
                  <button onclick={(e) => deleteTask(e)} type="button" class="btn">Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}

export default Home