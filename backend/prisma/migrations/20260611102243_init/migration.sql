-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "isEditing" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_task_key" ON "User"("task");
