import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form } from './index';

describe('Testing Form Component', () => {
  test('The form title exists', async () => {
    render(<Form appSetTasks={() => {}} />);

    const formTitle = await screen.findByText('Adicione uma tarefa:');

    expect(formTitle).toBeInTheDocument();
  });

  test('Tasks are being created', async () => {
    render(<Form appSetTasks={() => {}} />);

    const titleInput = screen.getByPlaceholderText('Titulo*');
    const descriptionInput = screen.getByPlaceholderText('Descrição');
    const saveButton = screen.getByText('Adicionar nota');

    fireEvent.change(titleInput, { target: { value: 'Tarefa do dia' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descrição da tarefa' } });
    fireEvent.click(saveButton);

    expect(titleInput.textContent).toBe('');
    expect(descriptionInput.textContent).toBe('');
  });
});
