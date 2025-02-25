import { Link } from "react-router-dom";
import { useUser } from "../utils/hooks";
function CustomNav() {
  const { user } = useUser();

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">SAVR</div>
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
                <Link to="/Profile" className="text-white hover:text-gray-400">
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
      {user && !user.isVerified && (
        <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-600 p-4 rounded-lg shadow-md max-w-4xl mx-auto my-6">
          <p className="font-medium text-lg">
            Your email address is not verified,
          </p>
          <p className="text-sm">
            Please check your mailbox to verify your account as unverified
            accounts are deleted in ten days
          </p>
        </div>
      )}
    </>
  );
}

export default CustomNav;
