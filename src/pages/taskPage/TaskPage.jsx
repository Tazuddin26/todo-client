import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import { useState, useEffect } from "react";
import Updatetask from "../updateTask.jsx/Updatetask";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdCancel, MdEditNote } from "react-icons/md";

import io from "socket.io-client";
const socket = io.connect("https://todo-server-1-pmap.onrender.com", {
  transports: ["websocket"],
  // withCredentials: true,
});

const TaskPage = () => {
  const axiosPublic = UseAxiosPublic();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({
    ToDo: [],
    InProgress: [],
    Done: [],
  });

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      return res.data;
    },
  });
  useEffect(() => {
    socket.on("taskUpdated", (updatedTask) => {
      console.log("New Category:", updatedTask.newCategory);
      if (refetch) {
        refetch();
      }
    });
    socket.on("taskDelete", (taskId) => {
      console.log("taskDelete", taskId);
      if (refetch) {
        refetch();
      }
    });

    return () => {
      socket.off("taskUpdated");
      socket.off("taskDelete");
    };
  }, [refetch]);

  useEffect(() => {
    const taskGroup = {
      ToDo: tasks.filter((task) => task.category === "ToDo"),
      InProgress: tasks.filter((task) => task.category === "InProgress"),
      Done: tasks.filter((task) => task.category === "Done"),
    };
    if (tasks) {
      setGroupedTasks(taskGroup);
    }
  }, [tasks]);

  const categories = ["ToDo", "InProgress", "Done"];

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleDeleteTask = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/task/${task._id}`);
        console.log("delete id", res.data);
        socket.emit("taskDeleted", { taskId: task._id });
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${task.title} is deleted Todos`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!result.destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const newGroupedTasks = { ...groupedTasks };
    const [movedTask] = newGroupedTasks[source.droppableId].splice(
      source.index,
      1
    );

    console.log(source.droppableId);
    movedTask.category = destination.droppableId;
    newGroupedTasks[destination.droppableId].splice(
      destination.index,
      0,
      movedTask
    );
    setGroupedTasks(newGroupedTasks);
    updateTaskCategory(movedTask._id, destination.droppableId);
  };
  const updateTaskCategory = async (taskId, newCategory) => {
    try {
      const res = await axiosPublic.patch(`/task/${taskId}`, {
        category: newCategory,
        // order: parseInt(order),
      });
      console.log("Task category updated:", res.data);
      socket.emit("updateTask", { taskId, newCategory });
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  return (
    <div className="">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lg:flex ">
          {categories.map((category, index) => (
            <Droppable key={index} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="lg:w-4/12 max-h-screen lg:p-2 p-4"
                >
                  <div
                    className={`px-3 py-3  rounded-md ${
                      category === "Done"
                        ? "bg-green-500"
                        : category === "InProgress"
                        ? "bg-yellow-500"
                        : category === "ToDo"
                        ? "bg-blue-500"
                        : "bg-gray-100"
                    }`}
                  >
                    <h1 className="text-base text-center uppercase text-gray-200">
                      {category}
                    </h1>
                  </div>

                  <div>
                    {groupedTasks[category].map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mt-4 space-y-5 xl:mt- lg:max-w-80 "
                          >
                            <div
                              className={` border-2 items-center justify-between p-4 cursor-pointer rounded-xl dark:border-gray-700"
                           
                                  ${
                                    task.category === "Done"
                                      ? "bg-green-300"
                                      : task.category === "InProgress"
                                      ? "bg-yellow-100"
                                      : task.category === "ToDo"
                                      ? "bg-blue-200"
                                      : "bg-gray-100"
                                  }`}
                            >
                              <div className=" items-center">
                                <div className="flex p-1 justify-between text-start space-y-1">
                                  <h2 className="text-base font-medium text-gray-700 sm:text-xl dark:text-gray-700">
                                    {task.title}
                                  </h2>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div className="   justify-end items-center ">
                                    <p className="text-pink-700 text-xs text-end space-y-2">
                                      <span className="text-purple-700 font-bold">
                                        {task.createdDate}
                                      </span>{" "}
                                      <span className="font-bold">
                                        {task.createdTime}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="flex flex-col justify-center items-center gap-1 border-gray-700">
                                    <button
                                      onClick={() => handleDeleteTask(task)}
                                    >
                                      <MdCancel
                                        size={24}
                                        className="text-rose-600"
                                      />
                                    </button>
                                    <button onClick={() => handleEdit(task)}>
                                      <MdEditNote
                                        size={24}
                                        className="text-blue-600"
                                      />
                                    </button>
                                  </div>
                                </div>
                                <div className="text-base text-gray-700 ">
                                  <p>{task.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal edit */}
      {isOpen && (
        <Updatetask
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          task={selectedTask}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default TaskPage;
