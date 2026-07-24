import { X } from "lucide-react";
import { useRole } from "../../hooks/useRoles";

interface Props {
  open: boolean;
  onClose: () => void;
  roleId: number | null;
}

export default function ViewRoleModal({
  open,
  onClose,
  roleId,
}: Props) {
  const { data, isLoading, isError } = useRole(roleId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            View Role
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            Loading...
          </div>
        ) : isError ? (
          <div className="text-center text-red-600 py-8">
            Failed to load role.
          </div>
        ) : (
          <div className="space-y-4">

            <div>
              <p className="text-gray-500 text-sm">
                Role Name
              </p>

              <p className="font-semibold">
                {data?.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Status
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  data?.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data?.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-2">
                Assigned Permissions
              </p>

              {data?.permissions?.length ? (
                <div className="flex flex-wrap gap-2">
                  {data.permissions.map((permission) => (
                    <span
                      key={permission.id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {permission.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No permissions assigned.
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}