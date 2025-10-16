import Task from "../models/Task.js";



export const createTask = async (req, res) => {
  try {

    

   
    if (!req.body.title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description || "",
      status: req.body.status || "pending",
      priority: req.body.priority || "medium",
      dueDate: req.body.dueDate || null,
      userId: req.user._id,
    });

  
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: { task },
    });

  } catch (error) {
    console.error("Create task error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating task",
      error: error.message,
    });
  }
};
