import { prisma } from "./lib/prisma.js";

export const getTasks = async () => {
    return prisma.task.findMany();
}