import { useState } from "react";
import { useRoles } from "../../hooks/useRoles";
import ViewRoleModal from "../../components/roles/ViewRoleModal";
import CreateRoleModal from "../../components/roles/CreateRoleModal";
import UpdateRoleModal from "../../components/roles/UpdateRoleModal";
import { useToggleRoleStatus } from "../../hooks/useToggleRoleStatus";
import AssignRoleModal from "../../components/roles/AssignRoleModal";
import RemoveRoleModal from "../../components/roles/RemoveRoleModal";

export default function Roles() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [openViewModal, setOpenViewModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [openAssignRoleModal, setOpenAssignRoleModal] = useState(false);

  const [openRemoveRoleModal, setOpenRemoveRoleModal] = useState(false);

  const [selectedRoleForUpdate, setSelectedRoleForUpdate] = useState<any>(null);

  const [selectedRoleForAssignment, setSelectedRoleForAssignment] = useState<any>(null);

  const [selectedRoleForRemoval, setSelectedRoleForRemoval] = useState<any>(null);

  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const { data, isLoading, isError,
  } = useRoles(page, search);

  const toggleRoleStatus = useToggleRoleStatus();

  if (isLoading)
    return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Failed to load roles.
      </div>
    );

  return (
   <div>

  <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Roles
  </h1>

  <button
    onClick={() => setOpenCreateModal(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    + Create Role
  </button>

</div>

  <div className="mb-6">

    <input
    autoFocus
      type="text"
      placeholder="Search roles..."
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
      <th className="border p-3">Role Name</th>

      <th className="border p-3">Status</th>

      <th className="border p-3">Actions</th>
    </tr>
  </thead>

  <tbody>
    {data?.items.length === 0 ? (
      <tr>
        <td
          colSpan={3}
          className="text-center py-8 text-gray-500"
        >
          No roles found.
        </td>
      </tr>
    ) : (
      data?.items.map((role) => (
        <tr key={role.id}>
          <td className="border p-3">
            {role.name}
          </td>

          <td className="border p-3">
            {role.isActive ? (
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
                  setSelectedRole(role.id);
                  setOpenViewModal(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                View
              </button>

              <button
                onClick={() => {
                  setSelectedRoleForUpdate(role);
                  setOpenUpdateModal(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
  onClick={() => {
    setSelectedRoleForAssignment(role);
    setOpenAssignRoleModal(true);
  }}
  className="bg-purple-600 text-white px-3 py-1 rounded"
>
  Assign Users
</button>

<button
  onClick={() => {
    setSelectedRoleForRemoval(role);
    setOpenRemoveRoleModal(true);
  }}
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Remove Users
</button>

              <button
                onClick={() => {
                  const confirmed = window.confirm(
                    `Are you sure you want to ${
                      role.isActive
                        ? "deactivate"
                        : "activate"
                    } ${role.name}?`
                  );

                  if (!confirmed) return;

                  toggleRoleStatus.mutate(role.id, {
                    onSuccess: () => {
                      alert(
                        `Role ${
                          role.isActive
                            ? "deactivated"
                            : "activated"
                        } successfully.`
                      );
                    },

                    onError: (error: any) => {
                      alert(
                        error?.response?.data?.message ??
                          "Operation failed."
                      );
                    },
                  });
                }}
                className="bg-orange-600 text-white px-3 py-1 rounded"
              >
                {role.isActive
                  ? "Deactivate"
                  : "Activate"}
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

  <ViewRoleModal
    open={openViewModal}
    roleId={selectedRole}
    onClose={() => setOpenViewModal(false)}
    />

    <CreateRoleModal
  open={openCreateModal}
  onClose={() => setOpenCreateModal(false)}
/>

<UpdateRoleModal
open={openUpdateModal}
role={selectedRoleForUpdate}
onClose={() => setOpenUpdateModal(false)}
/>

<AssignRoleModal
  open={openAssignRoleModal}
  role={selectedRoleForAssignment}
  onClose={() => setOpenAssignRoleModal(false)}
/>

<RemoveRoleModal
  open={openRemoveRoleModal}
  role={selectedRoleForRemoval}
  onClose={() => setOpenRemoveRoleModal(false)}
/>

</div>
  );
}