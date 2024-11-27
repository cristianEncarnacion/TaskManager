import { useForm } from "react-hook-form";
import { userProps } from "../types/user";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { user, signup, errors: registerErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userProps>();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors &&
        registerErrors.map((error, index) => (
          <div key={index} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))}
      {user && (
        <p className="bg-green-500 p-2 text-white">User created successfully</p>
      )}
      <form onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold my-2">Register</h1>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {errors.username && (
          <span className="text-red-500">This field is required</span>
        )}
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
          Register
        </button>
      </form>
      <p className="flex gap-x-2 justify-between">
        {" "}
        Already have an account?{" "}
        <Link to="/" className="text-sky-500">
          Login
        </Link>{" "}
      </p>
    </div>
  );
};

export default RegisterPage;
