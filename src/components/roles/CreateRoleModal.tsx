import { X } from "lucide-react";
import { useState } from "react";
import { useCreateRole } from "../../hooks/useCreateRole";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateRoleModal({
  open,
  onClose,
}: Props) {
  const createRoleMutation = useCreateRole();

  const [form, setForm] = useState({
    name: "",
  });

  const handleSubmit = () => {
    createRoleMutation.mutate(form, {
      onSuccess: () => {
        alert("Role created successfully.");
        setForm({ name: "" });
        onClose();
      },
      onError: (error: any) => {
        alert(
          error?.response?.data?.message ??
          "Failed to create role."
        );
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Create Role
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <input
          placeholder="Role Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="border rounded-lg p-3 w-full mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={createRoleMutation.isPending}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {createRoleMutation.isPending
              ? "Creating..."
              : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}