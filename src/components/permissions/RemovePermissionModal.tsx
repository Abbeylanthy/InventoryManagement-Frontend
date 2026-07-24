import { X } from "lucide-react";
import { useState } from "react";
import { useRoles } from "../../hooks/useRoles";
import { useRemovePermissionFromRoles } from "../../hooks/useRemovePermissionFromRoles";

interface Props {
  open: boolean;
  onClose: () => void;
  permission: any;
}

export default function RemovePermissionModal({
  open,
  onClose,
  permission,
}: Props) {
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const { data, isLoading } = useRoles(1, "");

  const removePermissionMutation = useRemovePermissionFromRoles();

  const handleRemovePermission = () => {
    if (!permission) return;

    if (selectedRoles.length === 0) {
      alert("Please select at least one role.");
      return;
    }

    removePermissionMutation.mutate(
      {
        permissionId: permission.id,
        roleIds: selectedRoles,
      },
      {
        onSuccess: () => {
          alert("Permission removed successfully.");

          setSelectedRoles([]);
          onClose();
        },

        onError: (error: any) => {
          alert(
            error?.response?.data?.message ??
              "Failed to remove permission."
          );
        },
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Remove Permission From Roles
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-500">
            Selected Permission
          </p>

          <p className="font-semibold text-lg">
            {permission?.name}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            Loading roles...
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto border rounded-lg p-3 space-y-2">
            {data?.items.map((role) => (
              <label
                key={role.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRoles([
                        ...selectedRoles,
                        role.id,
                      ]);
                    } else {
                      setSelectedRoles(
                        selectedRoles.filter(
                          (id) => id !== role.id
                        )
                      );
                    }
                  }}
                />

                <span>{role.name}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleRemovePermission}
            disabled={removePermissionMutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {removePermissionMutation.isPending
              ? "Removing..."
              : "Remove Permission"}
          </button>
        </div>
      </div>
    </div>
  );
}