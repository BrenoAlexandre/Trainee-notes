import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Item } from './Item';
import { Filter } from './Filter';
import { ITask } from '../../../../Interfaces/ITask';
import TasksService from '../../../../services/tasks.service';

interface IListProps {
  tasks: ITask[];
  appSetTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const List = ({ tasks, appSetTasks }: IListProps) => {
  const [filter, setFilter] = useState(0);

  const pendantTasks = tasks.filter((t) => {
    return !t.complete;
  });
  const completeTasks = tasks.filter((t) => {
    return t.complete;
  });

  const filteredTasks = [tasks, pendantTasks, completeTasks];

  const deleteHandler = (id: string) => {
    TasksService.delete(id);

    let newTaskList = tasks.filter((task) => {
      return task.id !== id;
    });

    appSetTasks(newTaskList);
  };

  const editHandler = (id: string, title: string, description: string, complete: boolean) => {
    TasksService.update(id, title, description, complete);

    const newTaskList = tasks.map((task) => {
      if (task.id === id) {
        task.title = title;
        task.description = description;
        task.complete = complete;
      }

      return task;
    });

    appSetTasks(newTaskList);
  };

  const filterHandler = (filter: number) => {
    if (filter === 0) setFilter(0);
    else if (filter === 1) setFilter(1);
    else if (filter === 2) setFilter(2);
  };

  return (
    <div>
      <Typography variant='h5'>Suas tarefas: </Typography>
      {/* Counter */}
      <Typography component={'span'}>
        <strong>Total de tarefas:</strong> <span data-testid='totalTasks'>{tasks.length}</span>
        <strong> | Tarefas pendentes:</strong>{' '}
        <span data-testid='pendingTasks'>{pendantTasks.length}</span>
        <strong> | Tarefas concluídas:</strong>{' '}
        <span data-testid='completeTasks'>{completeTasks.length}</span>
      </Typography>
      {/* Counter */}
      <Filter filterHandler={filterHandler} />
      <Card sx={{ backgroundColor: 'gray', margin: '15px 12rem 0 12rem' }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ margin: '0, 20rem, 0, 20rem' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell align='center'>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks[filter].length ? (
                  filteredTasks[filter].map((task) => {
                    return <Item props={{ task, deleteHandler, editHandler }} key={task.id} />;
                  })
                ) : (
                  <TableRow>
                    <TableCell>
                      <Typography data-testid='emptyListText'>
                        {filter === 0 && 'Crie uma tarefa e ela aparecerá aqui'}
                        {filter === 1 && 'Crie uma nova tarefa e ela aparecerá aqui'}
                        {filter === 2 && 'Conclua uma  tarefa e ela aparecerá aqui'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};
