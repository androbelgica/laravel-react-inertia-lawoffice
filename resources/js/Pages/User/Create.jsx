import React, { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    address: "",
    phone_number: "",
    email: "",
    role: "user",
    avatar: "",
    phone: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const avatarsPerPage = 10;

  useEffect(() => {
    const generateAvatars = async () => {
      const generatedAvatars = await Promise.all(
        Array.from({ length: 30 }, async (_, i) => {
          const avatar = createAvatar(avataaars, { seed: i.toString() });
          return await avatar.toDataUri();
        })
      );
      setAvatars(generatedAvatars);
    };

    generateAvatars();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setData("avatar", avatar);
  };

  const handleNextAvatars = () => {
    setAvatarIndex((prevIndex) =>
      Math.min(prevIndex + avatarsPerPage, avatars.length - avatarsPerPage)
    );
  };

  const handlePreviousAvatars = () => {
    setAvatarIndex((prevIndex) => Math.max(prevIndex - avatarsPerPage, 0));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("users.store"));
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

                <InputError message={errors.phone_number} className="mt-2" />
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
                <InputLabel htmlFor="user_avatar" value="Avatar" />

                <div className="flex items-center space-x-4 mt-2">
                  <button
                    type="button"
                    onClick={handlePreviousAvatars}
                    disabled={avatarIndex === 0}
                    className="bg-gray-200 p-2 rounded"
                  >
                    &lt;
                  </button>
                  <div className="flex space-x-2">
                    {avatars
                      .slice(avatarIndex, avatarIndex + avatarsPerPage)
                      .map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={`w-10 h-10 cursor-pointer ${
                            selectedAvatar === avatar
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => handleAvatarSelect(avatar)}
                        />
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleNextAvatars}
                    disabled={avatarIndex + avatarsPerPage >= avatars.length}
                    className="bg-gray-200 p-2 rounded"
                  >
                    &gt;
                  </button>
                </div>

                {selectedAvatar && (
                  <div className="mt-4">
                    <InputLabel value="Selected Avatar" />
                    <img
                      src={selectedAvatar}
                      alt="Selected Avatar"
                      className="w-10 h-10 mt-2"
                    />
                  </div>
                )}

                <InputError message={errors.avatar} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_phone" value="Phone" />

                <TextInput
                  id="user_phone"
                  type="text"
                  name="phone"
                  value={data.phone}
                  className="mt-1 block w-full"
                  onChange={handleInputChange}
                />

                <InputError message={errors.phone} className="mt-2" />
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
