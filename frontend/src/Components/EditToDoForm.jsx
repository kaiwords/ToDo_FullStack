import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const schema = yup
  .object({
    task: yup.string().required("Task is required")
          .min(3, "Task must be at least 3 characters")
    })
    .required()

export default function EditToDoForm({ handleUpdateTask, task }) {
      const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        task: task.task}
  });

    const onSubmit = (data) => 
    {
        handleUpdateTask({
            id: task.id,
            task: data.task,
            isEditing: false,
        }); //default == console.log(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Enter a task" {...register("task")} />
            {errors.task && <span>{errors.task.message}</span>}
            <button type="submit">Update Task</button>
        </form>
    )
}