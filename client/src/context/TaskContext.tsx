// context/TaskProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

type Props = {
  children: React.ReactNode;
};

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  createTask: (task: any) => Promise<void>;
  getTasks: () => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  getTask: (id: number | any) => Promise<Task>;
  updateTask: (id: any, task: Task) => Promise<void>;
};

const taskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(taskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = async (task: Task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      console.log(res);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getTask = async (id: number) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const updateTask = async (id: any, task: Task, date?: Task) => {
    try {
      const res = await updateTaskRequest(id, task, date);
      console.log(res);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <taskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export default TaskProvider;
