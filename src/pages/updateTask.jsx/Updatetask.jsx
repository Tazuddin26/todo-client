import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Updatetask = ({ isOpen, setIsOpen, task, refetch }) => {
  console.log(task);
  const axiosPublic = UseAxiosPublic();
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  useEffect(() => {
    if (task) {
      setValue("title", task.title || "");
      setValue("category", task.category || "");
      setValue("description", task.description || "");
    }
  }, [task, setValue]);
  const selectedCategory = watch("category");
  const onSubmit = async (data) => {
    console.log("data", data);
    const defaultTask = {
      title: data?.title,
      category: data?.category,
      description: data?.description,
    };
    const taskUpdate = await axiosPublic.put(`/task/${task._id}`, defaultTask);

    if (taskUpdate.data.modifiedCount > 0) {
      reset();
      refetch();
      //Show success PopUp
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Todo Task is Updated Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="relative flex justify-center">
        {/* <button
          onClick="isOpen = true"
          className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Open Modal
        </button> */}

        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white">
               Edit TaskManage
              </h3>
<hr />
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="">
                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Title
                    </label>
                    <input
                      type="text"
                      // defaultValue={title}
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

                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      {...register("category", { required: true })}
                      className="select select-bordered max-w-xl block w-full px-4 py-2 mt-2 dark:bg-gray-800 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    >
                      <option disabled value="category">
                        Task Category
                      </option>
                      <option value="ToDo">ToDo</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-300">
                      Description
                    </label>

                    <textarea
                      placeholder="Text here..."
                      //   defaultValue={description}
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
                </div>
                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Update Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatetask;
