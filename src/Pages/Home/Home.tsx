import React, { useEffect, useState } from 'react';
import './App.css';
import { List } from './Components/List';
import { Form } from './Components/Form';
import { ITask } from '../../Interfaces/ITask';
import TasksService from '../../services/tasks.service';

function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    let userId = '3fb282fd-32df-4322-b6bd-404a165ba4b0';

    console.log('home');

    TasksService.tasksByUser(userId)
      .then(setTasks)
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const createTask = (task: ITask) => {
    console.log(task);
    setTasks([...tasks, task]);
  };

  const editTask = (newTask: ITask) => {
    const newTaskList = tasks.map((task) => {
      if (task.id === newTask.id) {
        return newTask;
      }

      return task;
    });

    setTasks(newTaskList);
  };

  const deleteTask = (id: string) => {
    let newTaskList = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newTaskList);
  };

  return (
    <div className='App'>
      <Form createTask={createTask} />
      <List tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
}

export default Home;
