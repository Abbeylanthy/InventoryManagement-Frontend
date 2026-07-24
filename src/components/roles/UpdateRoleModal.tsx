import { X } from "lucide-react";
import { useState, useEffect } from "react"; 
import { useUpdateRole } from "../../hooks/useUpdateRole";


interface Props {
  open: boolean;
  onClose: () => void;
  role: any;
}

export default function UpdateRoleModal({
  open,
  onClose,
  role,
}: Props) {

  const [name, setName] = useState("");

  const updateRoleMutation = useUpdateRole();

  useEffect(() => {
    if (role) {
      setName(role.name);
    }
  }, [role]);

  const handleUpdate = () => {
  if (!role) return;

  updateRoleMutation.mutate(
    {
      id: role.id,
      name,
    },
    {
      onSuccess: () => {
        alert("Role updated successfully.");
        onClose();
      },
      onError: (error: any) => {
        alert(
          error?.response?.data?.message ??
          "Failed to update role."
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
          Update Role
        </h2>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Role Name
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
  disabled={updateRoleMutation.isPending}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
>
  {updateRoleMutation.isPending
    ? "Updating..."
    : "Update Role"}
</button>

        </div>

      </div>

    </div>
  </div>
);
}