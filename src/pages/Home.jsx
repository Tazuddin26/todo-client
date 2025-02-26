import { useForm } from "react-hook-form";
import TaskPage from "./taskPage/TaskPage";
import UseAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
// import io from "socket.io-client";
// const socket = io.connect("https://todo-server-1-pmap.onrender.com");
// const socket = io.connect("http://localhost:5200");
// import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const queryClient = useQueryClient();
  const axiosPublic = UseAxiosPublic();

  const mutation = useMutation({
    mutationFn: (newTask) =>
      axiosPublic.post("/task", newTask).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formdata = { ...data, category: "ToDo" };
    mutation.mutate(formdata);
    reset();
  };

  return (
    <div className="mt-4 flex justify-between flex-col lg:flex-row gap-4 ">
      <div className="lg:w-6/6 mx-4 bg-white dark:bg-gray-800">
        <TaskPage />
      </div>
      <div className="lg:w-2/6 px-3 lg:px-0">
        <section className="max-w-md p-6  bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Add to Task
          </h2>
          <hr className="my-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div>
                <label className="text-gray-700 dark:text-gray-200 my-4">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  {...register("title", {
                    required: true,
                    maxLength: {
                      value: 50,
                      message: "Title cannot exceed 50 characters",
                    },
                  })}
                  placeholder="Todo's Title..."
                  className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              {/* <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Category
                </label>
                <select
                  {...register("category", { required: true })}
                  // value="category"
                  className="select select-bordered max-w-xl block w-full px-4 py-2 mt-2 dark:bg-gray-800 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                >
                  <option disabled value="Task Category">
                    Task Category
                  </option>
                  <option value="todo">ToDo</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div> */}
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-300">
                  Description
                </label>

                <textarea
                  placeholder="Text here..."
                  name="description"
                  {...register("description", {
                    required: true,
                    maxLength: {
                      value: 200,
                      message: "Description cannot exceed 200 characters",
                    },
                  })}
                  className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                ></textarea>
              </div>

              {/* <div>
              <label className="text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div> */}
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 bg-green-600 text-white transition-colors duration-300 transform  rounded-md hover:bg-green-500 focus:outline-none focus:bg-gray-600">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Home;
