import { X } from "lucide-react";
import { useState } from "react";
import { useRoles } from "../../hooks/useRoles";
import { useCreateUser } from "../../hooks/useCreateUser";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateUserModal({
  open,
  onClose,
}: Props) {

  const { data, isLoading } = useRoles();

  const createUserMutation = useCreateUser();

  const handleSubmit = () => {

  createUserMutation.mutate(form, {

    onSuccess: () => {

      alert("User created successfully.");

      onClose();

    },

    onError: (error: any) => {

      alert(
        error?.response?.data?.message ??
        "Failed to create user."
      );

    },

  });

};

  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  password: "",
  roleIds: [] as number[],
});

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Create User
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {isLoading ? (

  <div className="text-center py-10">
    Loading Roles...
  </div>

) : (

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
      placeholder="Phone Number"
      value={form.phoneNumber}
      onChange={(e) =>
        setForm({
          ...form,
          phoneNumber: e.target.value,
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

    <input
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={(e) =>
        setForm({
          ...form,
          password: e.target.value,
        })
      }
      className="border rounded-lg p-3"
    />

    <textarea
      placeholder="Address"
      value={form.address}
      onChange={(e) =>
        setForm({
          ...form,
          address: e.target.value,
        })
      }
      className="border rounded-lg p-3 col-span-2"
    />

    <div className="col-span-2">

  <label className="block font-semibold mb-3">
    Roles
  </label>

  <div className="grid grid-cols-2 gap-3">

    {data?.items.map((role) => (

      <label
        key={role.id}
        className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer"
      >

        <input
          type="checkbox"
          checked={form.roleIds.includes(role.id)}
          onChange={(e) => {

            if (e.target.checked) {

              setForm({
                ...form,
                roleIds: [...form.roleIds, role.id],
              });

            } else {

              setForm({
                ...form,
                roleIds: form.roleIds.filter(
                  (id) => id !== role.id
                ),
              });

            }

          }}
        />

        {role.name}

      </label>

    ))}

    <div className="col-span-2 flex justify-end gap-3 mt-6">

  <button
    onClick={onClose}
    className="px-5 py-2 rounded-lg border"
  >
    Cancel
  </button>

  <button
    onClick={handleSubmit}
    disabled={createUserMutation.isPending}
    className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
  >
    {createUserMutation.isPending
      ? "Creating..."
      : "Create User"}
  </button>

</div>

  </div>

</div>

  </div>

)}

      </div>

    </div>
  );
}