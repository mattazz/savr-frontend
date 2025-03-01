import { useUser } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { user, logout } = useUser();

  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Full Name</p>
            <p className="text-lg font-medium text-black">{user.fullName}</p>
          </div>

          <div>
            <p className="text-gray-600">Username</p>
            <p className="text-lg font-medium text-gray-900">{user.username}</p>
          </div>

          <div>
            <p className="text-gray-600">Email</p>
            <p className="text-lg font-medium text-gray-900">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-600">Verification Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isVerified ? "Verified ✅" : "Not Verified ❌"}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
