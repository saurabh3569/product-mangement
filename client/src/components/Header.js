import { Link } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Product Management
        </Link>
        <div className="space-x-4">
          {token ? (
            <button onClick={logout} className="text-white hover:text-gray-300">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
