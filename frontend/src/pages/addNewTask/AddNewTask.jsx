import React from 'react';
import './AddNewTask.css';
import { Link } from "react-router-dom";

const AddNewTask = () => {
  return (
    <div className='add-new-task-container'>
      <form onSubmit={(e) => submitTask(e)}>
          <div>
            <Link to={'/'}>
              <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)" /><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)" /></svg>
            </Link>
          </div>
          <div>
            <label for="title-input">Title</label>
            <input
              required
              type="text"
              id="title-input"
              name='title'
            />
            <label for="date-input">Date</label>
            <input
              type="date"
              id="date-input"
              name='date'
            />
            <label for="description-input">Description</label>
            <textarea
              id="description-input"
              cols="30" rows="5"
              name='description'
            ></textarea>
          </div>
          <div>
            <button type="submit">
              Add Task
            </button>
          </div>
        </form>
    </div>
  )
}

export default AddNewTask