import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTasks,
  deleteTasks,
  updateTasks,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired, createTasks);
router.delete("/tasks/:id", authRequired, deleteTasks);
router.put("/tasks/:id", authRequired, updateTasks);

export default router;
