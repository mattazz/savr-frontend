import { Link } from "react-router-dom";
import { useUser } from "../utils/hooks";
function CustomNav() {
  const { user } = useUser();

  return (
    <>
      {user && !user.isVerified && (
        <div className="bg-yellow-100 text-yellow-800 pl-4  border-yellow-600  rounded-lg shadow-md  mx-auto ">
          <p className="font-medium text-lg">
            Your email address is not verified,
          </p>
          <p className="text-sm">
            Please check your mailbox to verify your account as unverified
            accounts are deleted in ten days
          </p>
        </div>
      )}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <a href="/">SAVR</a>
          </div>
          <ul className="flex gap-5">
            <li>
              <Link to="/aboutUs" className="text-white hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              {user ? (
                <Link to="/profile" className="text-white hover:text-gray-400">
                  Profile
                </Link>
              ) : (
                <Link to="/Login" className="text-white hover:text-gray-400">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default CustomNav;
