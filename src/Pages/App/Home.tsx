import React, { useEffect, useState } from 'react';
import './App.css';
import { List } from './Components/List';
import { Form } from './Components/Form';
import { ITask } from '../../Interfaces/ITask';
import TasksService from '../../services/tasks.service';

function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  let userId = 'ea0474bd-e70f-407c-83d7-17234685cc08';

  const fetchUserTasks = async (): Promise<void> => {
    try {
      const data = await TasksService.tasksByUser(userId);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  });

  return (
    <div className='App'>
      <Form appSetTasks={setTasks} />
      <List tasks={tasks} appSetTasks={setTasks} />
    </div>
  );
}

export default Home;
