import { X } from "lucide-react";
import { useState, useEffect } from "react"; 
import { useUpdatePermission } from "../../hooks/useUpdatePermission";


interface Props {
  open: boolean;
  onClose: () => void;
  permission: any;
}

export default function UpdatePermissionModal({
  open,
  onClose,
  permission,
}: Props) {

  const [name, setName] = useState("");

  const updatePermissionMutation = useUpdatePermission();

  useEffect(() => {
    if (permission) {
      setName(permission.name);
    }
  }, [permission]);

  const handleUpdate = () => {
  if (!permission) return;

  updatePermissionMutation.mutate(
    {
      id: permission.id,
      name,
    },
    {
      onSuccess: () => {
        alert("Permission updated successfully.");
        onClose();
      },
      onError: (error: any) => {
        alert(
          error?.response?.data?.message ??
          "Failed to update permission."
        );
      },
    }
  );
};

  if (!open) return null;

  return (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-lg">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Update Permission
        </h2>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Permission Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3 w-full"
          />
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

         <button
  onClick={handleUpdate}
  disabled={updatePermissionMutation.isPending}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
>
  {updatePermissionMutation.isPending
    ? "Updating..."
    : "Update Permission"}
</button>

        </div>

      </div>

    </div>
  </div>
);
}