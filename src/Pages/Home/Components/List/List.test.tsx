import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { List } from '.';
import { ITask } from '../../../../Interfaces/ITask';

describe('Testing List component', () => {
  describe('When the tasklist is empty', () => {
    it('Should render the placeholder text', async () => {
      let tasksMock: ITask[] = [];

      render(<List tasks={tasksMock} editTask={() => {}} deleteTask={() => {}} />);

      const totalTasksCounter = screen.getByTestId('totalTasks').textContent;
      const emptyListText = screen.getByTestId('emptyListText');

      expect(totalTasksCounter).toBe('0');
      expect(emptyListText).toBeInTheDocument();
    });
  });
  describe(`When the tasklist isn't empty`, () => {
    let listMock: ITask[] = [
      {
        id: '123',
        title: 'Tarefa 1',
        description: 'Tarefa diária',
        complete: false,
        user: '3fb282fd-32df-4322-b6bd-404a165ba4b0',
      },
      {
        id: '122',
        title: 'Tarefa 2',
        description: 'Comprar verdura',
        complete: false,
        user: '3fb282fd-32df-4322-b6bd-404a165ba4b0',
      },
      {
        id: '112',
        title: 'Tarefa 3',
        description: 'Passear com o Dog',
        complete: true,
        user: '3fb282fd-32df-4322-b6bd-404a165ba4b0',
      },
      {
        id: '111',
        title: 'Tarefa 4',
        description: 'Treinar',
        complete: true,
        user: '3fb282fd-32df-4322-b6bd-404a165ba4b0',
      },
    ];
    it('Should render the list', async () => {
      render(<List tasks={listMock} editTask={() => {}} deleteTask={() => {}} />);

      const totalTasksCounter = screen.getByTestId('totalTasks').textContent;

      expect(totalTasksCounter).toBe('4');
    });

    it('Should render the filtered list', async () => {
      render(<List tasks={listMock} editTask={() => {}} deleteTask={() => {}} />);

      const totalTasksCounter = screen.getByTestId('totalTasks').textContent;
      const completeTasksCounter = screen.getByTestId('completeTasks').textContent;
      const completeButton = screen.getByTestId('completeTasksFilter');

      expect(totalTasksCounter).toBe('4');
      expect(completeTasksCounter).toBe('2');

      fireEvent.click(completeButton);

      expect(screen.getByRole('table')).toHaveTextContent('Treinar');
      expect(screen.getByRole('table')).not.toHaveTextContent('Comprar verdura');
    });
  });
});
