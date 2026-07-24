import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateCurrentUser } from "../../hooks/useUpdateCurrentUser";

export default function Profile() {
  const { data, isLoading, isError } = useCurrentUser();
  const [editing, setEditing] = useState(false);

const updateMutation = useUpdateCurrentUser();

const {
  register,
  handleSubmit,
  reset,
} = useForm();

useEffect(() => {
  if (data) {
    reset({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
    });
  }
}, [data, reset]);

const onSubmit = (formData: any) => {
  updateMutation.mutate(
    {
      id: data.id,
      dto: formData,
    },
    {
      onSuccess: () => {
        toast.success("Profile updated successfully.");
        setEditing(false);
      },
      onError: () => {
        toast.error("Failed to update profile.");
      },
    }
  );
};

  if (isLoading)
    return <p className="p-6">Loading profile...</p>;

  if (isError)
    return <p className="p-6">Failed to load profile.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="grid grid-cols-2 gap-6">

         <div>
  <label className="font-semibold">
    First Name
  </label>

  {editing ? (
    <input
      {...register("firstName")}
      className="mt-1 w-full border rounded-lg p-2"
    />
  ) : (
    <p className="mt-1">
      {data.firstName}
    </p>
  )}
</div>
         <div>
  <label className="font-semibold">
    Last Name
  </label>

  {editing ? (
    <input
      {...register("lastName")}
      className="mt-1 w-full border rounded-lg p-2"
    />
  ) : (
    <p className="mt-1">
      {data.lastName}
    </p>
  )}
</div>

         <div>
  <label className="font-semibold">
     UserName
  </label>

  {editing ? (
    <input
      {...register("userName")}
      className="mt-1 w-full border rounded-lg p-2"
    />
  ) : (
    <p className="mt-1">
      {data.userName}
    </p>
  )}
</div>

        <div>
  <label className="font-semibold">
    Email
  </label>

  {editing ? (
    <input
      {...register("email")}
      className="mt-1 w-full border rounded-lg p-2"
    />
  ) : (
    <p className="mt-1">
      {data.email}
    </p>
  )}
</div>

         <div>
  <label className="font-semibold">
    Date of Birth
  </label>

  {editing ? (
    <input
      {...register("dateOfBirth")}
      className="mt-1 w-full border rounded-lg p-2"
    />
  ) : (
    <p className="mt-1">
      {data.dateOfBirth}
    </p>
  )}
</div>

         <div>
  <label className="font-semibold">
    Gender
  </label>

 {editing ? (
  <select
    {...register("gender")}
    className="mt-1 w-full border rounded-lg p-2"
  >
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
) : (
  <p className="mt-1">{data.gender}</p>
)}
</div>

          <div>
            <label className="font-semibold">
              Role
            </label>

            <p className="mt-1">
              {data.roles[0]?.name}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Email Verified
            </label>

            <p className="mt-1">
              {data.emailVerified ? "Yes" : "No"}
            </p>
          </div>

        </div>

       <div className="mt-8 flex gap-3">

  {editing ? (
    <>
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Save Changes
      </button>

      <button
        onClick={() => {
          reset();
          setEditing(false);
        }}
        className="bg-gray-500 text-white px-6 py-3 rounded-lg"
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      onClick={() => setEditing(true)}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
      Edit Profile
    </button>
  )}

</div>

      </div>

    </div>
  );
}