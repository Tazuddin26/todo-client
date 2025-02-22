import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import { SiTodoist } from "react-icons/si";

const SignUp = () => {
  const axiosPublic = UseAxiosPublic();
  const { createUser, updateUserProfile } = UseAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((res) => {
      const loggedUser = res.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL).then(() => {
        // console.log("user profile update");
        // create user Entry in Database
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added database");
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `User Created Successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      });
    });
  };
  return (
    <div>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center lg:h-[718px] h-[600px]">
          <div
            className=" bg-cover object-cover object-center w-full"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/rKRNtJnt/todo.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex items-center h-full lg:px-20 px-3 bg-gray-900 bg-opacity-40">
              <div className="flex items-center w-full lg:max-w-md px-6 mx-auto bg-blur-lg bg-gray-800 bg-opacity-60 rounded-lg">
                <div className="flex-1">
                  <div className="text-center">
                    <div className="flex justify-center mx-auto">
                      <h1 className="flex items-center gap-1 mt-4">
                        <SiTodoist size={32} className="text-cyan-600" />{" "}
                        <span className="uppercase text-rose-500 text-xl font-bold font-mono">
                          ToDo
                        </span>
                      </h1>
                    </div>

                    <p className="mt-3 text-xl font-semibold text-gray-500 dark:text-gray-300">
                      Sign up for your New account
                    </p>
                  </div>

                  <div className="mt-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                          User Name
                        </label>
                        <input
                          type="name"
                          name="name"
                          id="name"
                          placeholder="User name"
                          {...register("name", { required: true })}
                          className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.username && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="example@example.com"
                          {...register("email", { required: true })}
                          className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.email && (
                          <span className="text-red-500 ">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="">
                        <div className="flex justify-between mb-2">
                          <label className="text-sm text-gray-600 dark:text-gray-200">
                            Password
                          </label>
                        </div>

                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Your Password"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern:
                              /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                          })}
                          className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.password && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                        {errors.password?.type === "minLength" && (
                          <span className="text-red-500">
                            Password must be at least 6 characters
                          </span>
                        )}
                        {errors.password?.type === "maxLength" && (
                          <span className="text-red-500">
                            Password must be at most 20 characters
                          </span>
                        )}
                        {errors.password?.type === "pattern" && (
                          <span className="text-red-500">
                            Password must contain at least one uppercase letter,
                            one lowercase letter, one number and one special
                            character
                          </span>
                        )}
                      </div>

                      <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                          Sign in
                        </button>
                      </div>
                    </form>
                    <p className="mt-6 text-sm text-center text-gray-400 my-4">
                      <Link
                        to="/login"
                        className="text-blue-500 focus:outline-none focus:underline hover:underline"
                      >
                        Already have an account?
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
