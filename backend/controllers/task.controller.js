import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createTasks = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newTasks = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const saveTask = await newTasks.save();
    res.json(saveTask);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: "Task not found" });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ message: "Task not found" });
  }
};
export const updateTasks = async (req, res) => {
  try {
    const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tasks) {
      res.status(404).json({ message: "Task not found" });
    }
    return res.json(tasks);
  } catch (error) {
    return res.status(400).json({ message: "Task not found" });
  }
};
