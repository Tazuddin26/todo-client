import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import { useState, useEffect } from "react";
import Updatetask from "../updateTask.jsx/Updatetask";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:5100");
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
    const taskGroup = {
      ToDo: tasks.filter((task) => task.category === "ToDo"),
      InProgress: tasks.filter((task) => task.category === "InProgress"),
      Done: tasks.filter((task) => task.category === "Done"),
    };
    setGroupedTasks(taskGroup);
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
    newGroupedTasks[destination.droppableId].splice(
      destination.index,
      0,
      movedTask
    );
    // setGroupedTasks(newGroupedTasks);
    // socket.emit("taskMoved", {
    //   taskId: movedTask._id,
    //   newCategory: destination.droppableId,
    // });
  };

  return (
    <div className="">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lg:flex">
          {categories.map((category, index) => (
            <Droppable key={index} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="lg:w-4/12 max-h-screen "
                >
                  <div className="lg:px-3 lg:py-3 bg-gray-600">
                    <h1 className="text-base text-center uppercase text-gray-200">
                      {category}
                    </h1>
                  </div>
                  <hr />
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
                            className="mt-4 space-y-5 xl:mt-6 lg:max-w-72"
                          >
                            <div
                              className={`flex items-center justify-between mx-auto py-6  cursor-pointer rounded-xl dark:border-gray-700"
                           
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
                              <div className="flex items-center">
                                <div className="flex flex-col mx-5 text-start space-y-1">
                                  <h2 className="text-base font-medium text-gray-700 sm:text-xl dark:text-gray-700">
                                    {task.title}
                                  </h2>
                                  <div className="text-base text-gray-700">
                                    <p>{task.description}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-4/12">
                                <p className="text-pink-700 text-xs text-center space-y-2">
                                  <span className="text-purple-700 font-bold">
                                    {task.createdDate}
                                  </span>{" "}
                                  <span className="font-bold">
                                    {task.createdTime}
                                  </span>
                                </p>
                              </div>
                              <div className="flex justify-center items-center gap-2 border-l border-gray-700 p-2">
                                <button onClick={() => handleDeleteTask(task)}>
                                  <FaTrash
                                    size={18}
                                    className="text-rose-600"
                                  />
                                </button>
                                <button onClick={() => handleEdit(task)}>
                                  <FaEdit
                                    size={18}
                                    className="text-yellow-600"
                                  />
                                </button>
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
