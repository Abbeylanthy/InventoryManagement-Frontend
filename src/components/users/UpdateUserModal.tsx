import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";

interface Props {
  open: boolean;
  onClose: () => void;
  user: any;
}

export default function UpdateUserModal({
  open,
  onClose,
  user,
}: Props) {

  const updateUserMutation = useUpdateUser();

 const handleSubmit = () => {

  updateUserMutation.mutate(
    {
      id: user.id,
      data: form,
    },
    {
      onSuccess: () => {

        alert("User updated successfully.");

        onClose();

      },

      onError: (error: any) => {

        alert(
          error?.response?.data?.message ??
          "Failed to update user."
        );

      },
    }
  );

};

  const [form, setForm] = useState({
  firstName: user?.firstName ?? "",
  lastName: user?.lastName ?? "",
  userName: user?.userName ?? "",
  email: user?.email ?? "",
  dateOfBirth: user?.dateOfBirth ?? "",
  gender: user?.gender ?? "",
});

useEffect(() => {

  if (user) {

    setForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      userName: user.userName ?? "",
      email: user.email ?? "",
      dateOfBirth: user.dateOfBirth
        ? user.dateOfBirth.split("T")[0]
        : "",
      gender: user.gender ?? "",
    });

  }

}, [user]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Update User
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

  <div className="grid grid-cols-2 gap-4">

    <input
      placeholder="First Name"
      value={form.firstName}
      onChange={(e) =>
        setForm({
          ...form,
          firstName: e.target.value,
        })
      }
      className="border rounded-lg p-3"
    />

    <input
      placeholder="Last Name"
      value={form.lastName}
      onChange={(e) =>
        setForm({
          ...form,
          lastName: e.target.value,
        })
      }
      className="border rounded-lg p-3"
    />

    <input
      placeholder="Username"
      value={form.userName}
      onChange={(e) =>
        setForm({
          ...form,
          userName: e.target.value,
        })
      }
      className="border rounded-lg p-3"
    />

    <input
      type="email"
      placeholder="Email"
      value={form.email}
      onChange={(e) =>
        setForm({
          ...form,
          email: e.target.value,
        })
      }
      className="border rounded-lg p-3"
    />


    <input
      type="date"
      value={form.dateOfBirth}
      onChange={(e) =>
        setForm({
          ...form,
          dateOfBirth: e.target.value,
        })
      }
      className="border rounded-lg p-3"
    />

    <select
      value={form.gender}
      onChange={(e) =>
        setForm({
          ...form,
          gender: e.target.value,
        })
      }
      className="border rounded-lg p-3"
    >
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
    </select>

    

    <div className="col-span-2 flex justify-end gap-3 mt-6">

  <button
    onClick={onClose}
    className="px-5 py-2 rounded-lg border"
  >
    Cancel
  </button>

  <button
    onClick={handleSubmit}
    disabled={updateUserMutation.isPending}
    className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
  >
    {updateUserMutation.isPending
      ? "Updating..."
      : "Update User"}
  </button>

</div>

  </div>

</div>

  </div>

  );
}