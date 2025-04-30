import { useUser } from "../utils/hooks";
import { User, Mail, CheckCircle, XCircle } from "lucide-react";
import LogoutButton from "@/components/subcomponents/LogoutButton";

export const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
            <p className="mt-2 text-gray-600">
              Manage your account information
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-8">
            {/* Profile Info */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {user.isVerified ? (
                    <CheckCircle className="h-5 w-5 text-teal-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Verification Status</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isVerified
                          ? "bg-teal-100 text-teal-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}

            <LogoutButton triggerClassName="pt-6 border-t border-gray-100 w-full">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200">
                Logout
              </button>
            </LogoutButton>
          </div>
        </div>
      </div>
    </div>
  );
};
