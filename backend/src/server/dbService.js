import { prisma } from "./lib/prisma.js";

export const getTasks = async () => {
    return prisma.task.findMany();
};

export const createTask = async (task) => {
    return prisma.task.create({
        data: {
            task: task,
            isEditing: false,
        },
    });
};