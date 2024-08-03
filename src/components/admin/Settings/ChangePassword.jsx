import { toast } from "react-toastify";
import React from "react";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { useForm } from "react-hook-form";

const ChangePassword = (values) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitPassword = async (values) => {
    try {
      const res = await AdminAxiosInstance.put("/api/admin/password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      console.log(res.data);
      toast.success("Password successfully updated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit(submitPassword)}
      className="flex flex-col flex-wrap mb-16"
    >
      <p className="font-semibold text-sm md:text-lg my-4">Change password</p>
      <div className="w-full grid grid-flow-row grid-cols-2 gap-x-4">
        <div className="w-full">
          <label className="block font-medium text-sm mb-1">Old password</label>

          <input
            {...register("oldPassword", {
              required: "Old password is required",
            })}
            placeholder="Old password"
            className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
          />
          {errors.oldPassword && (
            <p
              className="text-red-500 -mt-2 mb-2 text-wrap w-1/2
            "
            >
              {errors.oldPassword?.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block font-medium text-sm mb-1">New password</label>

          <input
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 8, message: "Minimum length is 8" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "At least one uppercase, one lowercase, one digit, and one special character",
              },
            })}
            placeholder="New password"
            className="w-[15rem] h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
          />
          {errors.newPassword && (
            <p className="text-red-500 -mt-2 mb-2 text-wrap w-1/2">
              {errors.newPassword?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 font-semibold text-sm text-white rounded-md"
        >
          Change password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
