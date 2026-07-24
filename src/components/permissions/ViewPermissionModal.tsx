import { X } from "lucide-react";
import { usePermission } from "../../hooks/usePermissions";

interface Props {
  open: boolean;
  onClose: () => void;
  permissionId: number | null;
}

export default function ViewPermissionModal({
  open,
  onClose,
  permissionId,
}: Props) {
  const { data, isLoading, isError } = usePermission(permissionId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            View Permission
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
            Failed to load permission.
          </div>
        ) : (
          <div className="space-y-4">

            <div>
              <p className="text-gray-500 text-sm">
                Permission Name
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
                Assigned Roles
              </p>

              {data?.roles?.length ? (
                <div className="flex flex-wrap gap-2">
                  {data.roles.map((role) => (
                    <span
                      key={role.id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No roles assigned.
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}