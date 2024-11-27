import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

export const TasksPage = () => {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length == 0) return <h1>No tasks</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task, index) => {
        return <TaskCard key={index} task={task} />;
      })}
    </div>
  );
};
