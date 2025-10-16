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

export const getTasks = async(req , res)=>{
    try {
        const query = {userId : req.user._id}

        if(req.query.status){
            query.status = req.query.status
        }
        if(req.query.priority){
           query.priority = req.query.priority
        }


         const tasks = await Task.find(query).sort({ createdAt: -1 })
         res.status(200).json({
            success: true,
            results: tasks.length,
            data: { tasks },

         })
    } catch (error) {
         console.error("Get tasks error:", error.message)
        res.status(400).json({
      status: "error",
      message: error.message,
    })
    }
}

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found or you do not have permission to access it"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: { task },
    });

  } catch (error) {
    console.error("Get task error:", error.message);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id, 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found or you do not have permission to update it",
      });
    }

    const allowedUpdates = ["title", "description", "status", "priority", "dueDate"];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) { 
        task[field] = req.body[field];
      }
    });

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: { task },
    });
  } catch (error) {
    console.error("Update task error:", error.message);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found or you do not have permission to delete it",
      });
    }

    res.status(200).json({
      success: true, 
      msg: "Task deleted successfully",
      data: { task },
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
