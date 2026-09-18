import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoForm from '../Components/ToDoForm';

describe('ToDoForm', () => {
  it('submits a valid task', async () => {
    const user = userEvent.setup();
    const handleAddTask = vi.fn();

    render(<ToDoForm handleAddTask={handleAddTask} />);

    await user.type(screen.getByPlaceholderText(/enter a task/i), 'Write tests');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(handleAddTask).toHaveBeenCalledWith('Write tests');
  });

  it('shows validation error for short task', async () => {
    const user = userEvent.setup();
    const handleAddTask = vi.fn();

    render(<ToDoForm handleAddTask={handleAddTask} />);

    await user.type(screen.getByPlaceholderText(/enter a task/i), 'ab');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(await screen.findByText(/at least 3 characters/i)).toBeInTheDocument();
    expect(handleAddTask).not.toHaveBeenCalled();
  });
});
