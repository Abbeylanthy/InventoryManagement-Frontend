import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import ViewUserModal from "../../components/users/ViewUserModal";
import CreateUserModal from "../../components/users/CreateUserModal";
import UpdateUserModal from "../../components/users/UpdateUserModal";
import { useDeactivateUser } from "../../hooks/useToggleUserStatus";

export default function Users() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [openViewModal, setOpenViewModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState<any>(null);

  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useUsers(page, search);

  const deactivateUserMutation = useDeactivateUser();

  if (isLoading)
    return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Failed to load users.
      </div>
    );

  return (
   <div>

  <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Users
  </h1>

  <button
    onClick={() => setOpenCreateModal(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    + Create User
  </button>

</div>

  <div className="mb-6">

    <input
    autoFocus
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => {
        setPage(1);
        setSearch(e.target.value);
      }}
      className="border rounded-lg p-3 w-full md:w-80"
    />

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full border">

      <thead className="bg-gray-100">

        <tr>

          <th className="border p-3">
            Username
          </th>

          <th className="border p-3">
            Roles
          </th>

          <th className="border p-3">
            Verification
            </th>

          <th className="border p-3">
            Status
          </th>

          <th className="border p-3">
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

        {data?.items.length === 0 ? (

          <tr>

            <td
              colSpan={5}
              className="text-center py-8 text-gray-500"
            >
              No users found.
            </td>

          </tr>

        ) : (

          data?.items.map((user) => (

            <tr key={user.id}>

              <td className="border p-3">
                {user.userName}
              </td>

              <td className="border p-3">

                <div className="flex flex-wrap gap-2">

                  {user.roles.map((role) => (

                    <span
                      key={role.id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {role.name}
                    </span>

                  ))}

                </div>

              </td>

              <td className="border p-3">

  {user.emailVerified ? (

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Verified
    </span>

  ) : (

    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
      Not Verified
    </span>

  )}

</td>

              <td className="border p-3">

  {user.isActive ? (

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Active
    </span>

  ) : (

    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
      Inactive
    </span>

  )}

</td>

            <td className="border p-3">

  <div className="flex gap-2">

    <button
      onClick={() => {
        setSelectedUser(user.id);
        setOpenViewModal(true);
      }}
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      View
    </button>

    <button
  onClick={() => {

    const confirmed = window.confirm(
      `Are you sure you want to ${user.isActive ? "deactivate" : "activate"} ${user.userName}?`
    );

    if (!confirmed) return;

    deactivateUserMutation.mutate(user.id, {
      onSuccess: () => {
        alert(
          `User ${user.isActive ? "deactivated" : "activated"
          } successfully.`
        );

      },
      onError: (error: any) => {
        alert(
          error?.response?.data?.message ??
          `Failed to ${user.isActive ? "deactivate" : "activate"} user.`
        );
      },
    });

  }}
  className="bg-orange-600 text-white px-3 py-1 rounded"
>
  {user.isActive ? "Deactivate" : "Activate"}
</button>

  </div>

</td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

  <div className="flex justify-between items-center mt-6">

    <button
      disabled={!data?.hasPrevious}
      onClick={() => setPage(page - 1)}
      className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
    >
      Previous
    </button>

    <span>
      Page {data?.pageNumber} of {data?.totalPages}
    </span>

    <button
      disabled={!data?.hasNext}
      onClick={() => setPage(page + 1)}
      className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
    >
      Next
    </button>

  </div>

  <ViewUserModal
    open={openViewModal}
    userId={selectedUser}
    onClose={() => setOpenViewModal(false)}
    />

    <CreateUserModal
  open={openCreateModal}
  onClose={() => setOpenCreateModal(false)}
/>

<UpdateUserModal
open={openUpdateModal}
user={selectedUserForUpdate}
onClose={() => setOpenUpdateModal(false)}
/>

</div>
  );
}