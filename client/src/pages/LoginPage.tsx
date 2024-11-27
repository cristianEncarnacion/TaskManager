// LoginPage.js
import { useForm } from "react-hook-form";
import { userProps } from "../types/user";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userProps>();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors &&
          Array.isArray(signinErrors) &&
          signinErrors.map((error, index) => (
            <div
              key={index}
              className="bg-red-500 p-2 text-center text-white my-2"
            >
              {error}
            </div>
          ))}

        <h1 className="text-3xl font-bold my-2">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}

          <button
            type="submit"
            className="w-full bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between mt-4">
          Don't have an account?
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
