import { jest } from '@jest/globals';

const mockPrisma = {
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

jest.unstable_mockModule('../src/server/lib/prisma.js', () => ({
  prisma: mockPrisma,
}));

const { getTasks, createTask, getTask, updateTask, deleteTask } = await import('../src/server/dbService.js');

describe('dbService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all tasks', async () => {
    mockPrisma.task.findMany.mockResolvedValue([{ id: 1, task: 'Write tests' }]);

    const result = await getTasks();

    expect(mockPrisma.task.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 1, task: 'Write tests' }]);
  });

  it('creates a task with default editing state', async () => {
    mockPrisma.task.create.mockResolvedValue({ id: 2, task: 'New task', isEditing: false });

    const result = await createTask('New task');

    expect(mockPrisma.task.create).toHaveBeenCalledWith({
      data: { task: 'New task', isEditing: false },
    });
    expect(result).toEqual({ id: 2, task: 'New task', isEditing: false });
  });

  it('fetches a task by id', async () => {
    mockPrisma.task.findUnique.mockResolvedValue({ id: 3, task: 'Existing task' });

    const result = await getTask(3);

    expect(mockPrisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(result).toEqual({ id: 3, task: 'Existing task' });
  });

  it('updates a task and resets editing state', async () => {
    mockPrisma.task.update.mockResolvedValue({ id: 4, task: 'Updated task', isEditing: false });

    const result = await updateTask(4, 'Updated task');

    expect(mockPrisma.task.update).toHaveBeenCalledWith({
      where: { id: 4 },
      data: { task: 'Updated task', isEditing: false },
    });
    expect(result).toEqual({ id: 4, task: 'Updated task', isEditing: false });
  });

  it('deletes a task by id', async () => {
    mockPrisma.task.delete.mockResolvedValue({ id: 5, task: 'Delete me' });

    const result = await deleteTask(5);

    expect(mockPrisma.task.delete).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(result).toEqual({ id: 5, task: 'Delete me' });
  });
});
