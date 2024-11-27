import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";

type Props = {
  task: {
    _id: number;
    title: string;
    description: string;
    date?: string;
  };
};

const TaskCard = ({ task }: Props) => {
  const { deleteTask } = useTask();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 px-3 py-2 rounded-md text-white"
          >
            Delete
          </button>

          <Link
            to={`/tasks/${task._id}`}
            className="bg-indigo-500 px-3 py-2 rounded-md text-white"
          >
            Edit
          </Link>
        </div>
      </div>
      <p className="text-slate-300">{task.description}</p>
      <p>{new Date(task.date!).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskCard;
