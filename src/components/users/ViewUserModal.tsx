import { X } from "lucide-react";
import { useUser } from "../../hooks/useUser";

interface Props {
  open: boolean;
  userId: number | null;
  onClose: () => void;
}

export default function ViewUserModal({
  open,
  userId,
  onClose,
}: Props) {

  const {
    data,
    isLoading,
  } = useUser(userId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            User Details
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {isLoading ? (

          <div className="text-center py-10">
            Loading...
          </div>

        ) : (

          <>

            <div className="grid grid-cols-2 gap-6 mb-8">

  <div>
    <p className="text-gray-500 text-sm">First Name</p>
    <p className="font-semibold">{data?.firstName}</p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Last Name</p>
    <p className="font-semibold">{data?.lastName}</p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Username</p>
    <p className="font-semibold">{data?.userName}</p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Email</p>
    <p className="font-semibold">{data?.email}</p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Date of Birth</p>
    <p className="font-semibold">
      {data?.dateOfBirth}
    </p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Gender</p>
    <p className="font-semibold">
      {data?.gender}
    </p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Account Status</p>

    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        data?.isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {data?.isActive ? "Active" : "Inactive"}
    </span>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Email Verified</p>

    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        data?.emailVerified
          ? "bg-blue-100 text-blue-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {data?.emailVerified ? "Verified" : "Not Verified"}
    </span>
  </div>

</div>

            <div>

              <h3 className="font-semibold mb-4">
                Roles & Permissions
              </h3>

              {data?.roles.map((role) => (

                <div
                  key={role.id}
                  className="border rounded-lg p-4 mb-4"
                >

                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">

                    {role.name}

                  </span>

                  <div className="flex flex-wrap gap-2 mt-4">

                    {role.permissions?.map((permission) => (

                      <span
                        key={permission.id}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {permission.name}
                      </span>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>
  );
}