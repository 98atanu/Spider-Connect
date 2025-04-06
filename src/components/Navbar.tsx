import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import { RootState, AppDispatch } from "../store";
import { logout, loginUser } from "../store/slices/auth-slice";
import SpiderLogo from "../assets/web.png";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";


const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("authUser");
    if (userData && !user) {
      const parsedUser = JSON.parse(userData);
      dispatch(loginUser({ name: parsedUser.name, email: parsedUser.email }));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 shadow-md px-6 py-4 border-b border-slate-700">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition"
        >
          <img src={SpiderLogo} alt="Spider Logo" className="h-8 w-8" />
          <span className="hidden sm:inline">Spider Connect</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <Link
                to="/"
                className="flex items-center gap-1 text-indigo-400 hover:text-white transition"
              >
                
                <FaHome className="text-xl" />
                <span className="hidden sm:inline font-bold">Feed</span>
              </Link>
              <Link
                to="/post/new"
                className="flex items-center gap-1 text-indigo-400 hover:text-white transition"
              >
                <MdLibraryAdd className="text-xl" />
                <span className="hidden sm:inline font-bold">New</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-1 text-indigo-400 hover:text-white transition"
              >
                <FaCircleUser className="text-xl" />
                <span className="hidden sm:inline font-bold">Profile</span>
              </Link>
              <span className="text-slate-300 text-sm hidden sm:inline">
                Hi, {user.name} 👋
              </span>
              <span className="text-slate-300 text-sm sm:hidden">
                {user.name}
              </span>
            </>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <div className="hidden sm:flex gap-4">
              <Link
                to="/login"
                className="text-indigo-400 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-indigo-400 hover:text-white transition"
              >
                Register
              </Link>
            </div>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block sm:hidden text-indigo-400 text-2xl"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden mt-3 flex flex-col space-y-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-indigo-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-indigo-300 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
