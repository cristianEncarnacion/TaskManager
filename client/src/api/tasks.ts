import axios from "./axios";
import { Task } from "../types/task";
export const getTasksRequest = () => {
  return axios.get("/tasks");
};

export const getTaskRequest = (id: number) => {
  return axios.get(`/tasks/${id}`);
};

export const createTaskRequest = (task: {
  title: string;
  description: string;
}) => {
  return axios.post("/tasks", task);
};

export const deleteTaskRequest = (id: any) => {
  return axios.delete(`/tasks/${id}`);
};

export const updateTaskRequest = (id: number, task: Task, date?: Task) => {
  return axios.put(`/tasks/${id}`, task);
};
