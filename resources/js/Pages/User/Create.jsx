import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Create({ auth }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { data, setData, post, errors, reset } = useForm({
    name: "",
    address: "",
    phone_number: "",
    email: "",
    role: "user",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.password_confirmation) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    post(route("users.store"), {
      onError: () => {
        reset("password", "password_confirmation");
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new User
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />

                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={handleInputChange}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_address" value="User Address" />

                <TextInput
                  id="user_address"
                  type="text"
                  name="address"
                  value={data.address}
                  className="mt-1 block w-full"
                  onChange={handleInputChange}
                />

                <InputError message={errors.address} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_phone_number" value="Phone Number" />

                <TextInput
                  id="user_phone_number"
                  type="text"
                  name="phone_number"
                  value={data.phone_number}
                  className="mt-1 block w-full"
                  onChange={handleInputChange}
                />

                <InputError message={errors.phone} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_email" value="Email" />

                <TextInput
                  id="user_email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={handleInputChange}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_role" value="Role" />

                <SelectInput
                  id="user_role"
                  name="role"
                  value={data.role}
                  className="mt-1 block w-full"
                  onChange={handleInputChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </SelectInput>

                <InputError message={errors.role} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_password" value="Password" />

                <div className="relative">
                  <TextInput
                    id="user_password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>

                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="Confirm Password"
                />

                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  onChange={handleInputChange}
                />

                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
                {passwordMismatch && (
                  <InputError
                    message="Passwords do not match"
                    className="mt-2"
                  />
                )}
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("users.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
