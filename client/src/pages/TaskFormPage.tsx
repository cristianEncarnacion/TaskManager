import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Task } from "../types/task";
export const TaskFormPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Task>();
  const { createTask, getTask, updateTask } = useTask();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);
  const onsubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-2">
        <form onSubmit={onsubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 ${
              errors.title ? "border-red-500" : ""
            }`}
            autoFocus
            required
          />
          {errors.title && <span>{errors.title.message}</span>}
          <label htmlFor="description">Description</label>

          <textarea
            rows={3}
            placeholder="Description"
            {...register("description")}
            className="w-full resize-none bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            required
          ></textarea>

          <button type="submit" className="bg-indigo-500 px-3 py-2 rounded-md">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};
