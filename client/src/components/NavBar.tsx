import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {};

const NavBar = (props: Props) => {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(user);
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        {" "}
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>{user && `Welcome ${user.username}`}</li>
            <li>
              <Link
                to="/add-tasks"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <button onClick={() => logout()}>Logut</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
