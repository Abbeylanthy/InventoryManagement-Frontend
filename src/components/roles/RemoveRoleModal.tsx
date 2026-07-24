import { X } from "lucide-react";
import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useRemoveRoleFromUsers } from "../../hooks/useRemoveRoleFromUsers";

interface Props {
  open: boolean;
  onClose: () => void;
  role: any;
}

export default function RemoveRoleModal({
  open,
  onClose,
  role,
}: Props) {

    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const { data, isLoading } = useUsers(1, "", 1000);

    const removeRoleMutation = useRemoveRoleFromUsers();

    const handleRemoveRole = () => {
  if (!role) return;

  if (selectedUsers.length === 0) {
    alert("Please select at least one user.");
    return;
  }

  removeRoleMutation.mutate(
    {
      roleId: role.id,
      userIds: selectedUsers,
    },
    {
     onSuccess: (response: any) => {
  alert(response.message);

  setSelectedUsers([]);

  onClose();
},
      onError: (error: any) => {
        alert(
          error?.response?.data?.message ??
          "Failed to remove role."
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
          Remove Users from Role
        </h2>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-gray-500">
          Selected Role
        </p>

        <p className="font-semibold text-lg">
          {role?.name}
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          Loading users...
        </div>
      ) : (
        <div className="max-h-80 overflow-y-auto border rounded-lg p-3 space-y-2">

          {data?.items.map((user) => (

            <label
              key={user.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
            >

              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={(e) => {

                  if (e.target.checked) {

                    setSelectedUsers([
                      ...selectedUsers,
                      user.id,
                    ]);

                  } else {

                    setSelectedUsers(
                      selectedUsers.filter(
                        (id) => id !== user.id
                      )
                    );

                  }

                }}
              />

              <span>
                {user.userName}
              </span>

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
  onClick={handleRemoveRole}
  disabled={removeRoleMutation.isPending}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
>
  {removeRoleMutation.isPending
    ? "Removing..."
    : "Remove Role"}
</button>

      </div>

    </div>
  </div>
);
}