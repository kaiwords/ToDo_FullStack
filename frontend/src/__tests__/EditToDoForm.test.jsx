import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditToDoForm from '../Components/EditToDoForm';
import * as taskActions from '../actions/taskActions';

vi.mock('../actions/taskActions', () => ({
  updateTask: vi.fn(),
}));

describe('EditToDoForm', () => {
  it('submits the updated task and calls the parent handler', async () => {
    const user = userEvent.setup();
    const handleUpdateTask = vi.fn();
    taskActions.updateTask.mockResolvedValue({ id: 1, task: 'Updated task' });

    render(
      <EditToDoForm
        handleUpdateTask={handleUpdateTask}
        task={{ id: 1, task: 'Original task' }}
      />
    );

    const input = screen.getByPlaceholderText(/enter a task/i);
    await user.clear(input);
    await user.type(input, 'Updated task');
    await user.click(screen.getByRole('button', { name: /update task/i }));

    expect(taskActions.updateTask).toHaveBeenCalledWith(1, 'Updated task');
    expect(handleUpdateTask).toHaveBeenCalledWith({ id: 1, task: 'Updated task' });
  });
});
