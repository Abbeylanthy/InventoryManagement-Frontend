import { useState } from "react";
import { usePermissions } from "../../hooks/usePermissions";
import ViewPermissionModal from "../../components/permissions/ViewPermissionModal";
import CreatePermissionModal from "../../components/permissions/CreatePermissionModal";
import UpdatePermissionModal from "../../components/permissions/UpdatePermissionModal";
import { useTogglePermissionStatus } from "../../hooks/useTogglePermissionStatus";
import AssignPermissionModal from "../../components/permissions/AssignPermissionModal";
import RemovePermissionModal from "../../components/permissions/RemovePermissionModal";


export default function Permissions() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [openViewModal, setOpenViewModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [openAssignPermissionModal, setOpenAssignPermissionModal] = useState(false);

  const [selectedPermissionForAssignment, setSelectedPermissionForAssignment] = useState<any>(null);

  const [openRemovePermissionModal, setOpenRemovePermissionModal] = useState(false);

  const [selectedPermissionForRemoval, setSelectedPermissionForRemoval] = useState<any>(null);

  const [selectedPermissionForUpdate, setSelectedPermissionForUpdate] = useState<any>(null);

  const [selectedPermission, setSelectedPermission] = useState<number | null>(null);

  const { data, isLoading, isError,
  } = usePermissions(page, search);

  const togglePermissionStatus = useTogglePermissionStatus();

  if (isLoading)
    return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Failed to load permissions.
      </div>
    );

  return (
   <div>

  <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Permissions
  </h1>

  <button
    onClick={() => setOpenCreateModal(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    + Create Permission
  </button>

</div>

  <div className="mb-6">

    <input
    autoFocus
      type="text"
      placeholder="Search permissions..."
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
      <th className="border p-3">Permission Name</th>

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
          No permisssions found.
        </td>
      </tr>
    ) : (
      data?.items.map((permission) => (
        <tr key={permission.id}>
          <td className="border p-3">
            {permission.name}
          </td>

          <td className="border p-3">
            {permission.isActive ? (
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
                  setSelectedPermission(permission.id);
                  setOpenViewModal(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                View
              </button>

              <button
                onClick={() => {
                  setSelectedPermissionForUpdate(permission);
                  setOpenUpdateModal(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
  onClick={() => {
    setSelectedPermissionForAssignment(permission);
    setOpenAssignPermissionModal(true);
  }}
  className="bg-purple-600 text-white px-3 py-1 rounded"
>
  Assign Roles
</button>

<button
  onClick={() => {
    setSelectedPermissionForRemoval(permission);
    setOpenRemovePermissionModal(true);
  }}
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Remove Roles
</button>

              <button
                onClick={() => {
                  const confirmed = window.confirm(
                    `Are you sure you want to ${
                      permission.isActive
                        ? "deactivate"
                        : "activate"
                    } ${permission.name}?`
                  );

                  if (!confirmed) return;

                  togglePermissionStatus.mutate(permission.id, {
                    onSuccess: () => {
                      alert(
                        `Permission ${
                          permission.isActive
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
                {permission.isActive
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

  <ViewPermissionModal
    open={openViewModal}
    permissionId={selectedPermission}
    onClose={() => setOpenViewModal(false)}
    />

    <CreatePermissionModal
  open={openCreateModal}
  onClose={() => setOpenCreateModal(false)}
/>

<UpdatePermissionModal
open={openUpdateModal}
permission={selectedPermissionForUpdate}
onClose={() => setOpenUpdateModal(false)}
/>

<AssignPermissionModal
  open={openAssignPermissionModal}
  permission={selectedPermissionForAssignment}
  onClose={() => setOpenAssignPermissionModal(false)}
/>

<RemovePermissionModal
  open={openRemovePermissionModal}
  permission={selectedPermissionForRemoval}
  onClose={() => setOpenRemovePermissionModal(false)}
/>

</div>
  );
}