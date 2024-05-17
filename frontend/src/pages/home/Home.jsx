import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <main>
      <h1>Todo App</h1>
      <div class="todo-app">
        <Link to={"/addnewtask"}>Add New Task</Link>



        <dialog id="confirm-close-dialog" >
          <form method="dialog">
            <p class="discard-message-text">Discard unsaved changes?</p>
            <div class="confirm-close-dialog-btn-container">
              <button id="cancel-btn" class="btn">
                Cancel
              </button>
              <button id="discard-btn" class="btn">
                Discard
              </button>
            </div>
          </form>
        </dialog>
        <div id="tasks-container">
          <div class="task" >
            <p><strong>Title:</strong> title</p>
            <p><strong>Date:</strong> date</p>
            <p><strong>Description:</strong> description</p>
            <button type="button" class="btn">Edit</button>
            <button type="button" class="btn">Delete</button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Home