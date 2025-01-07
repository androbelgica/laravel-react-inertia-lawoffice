import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, client }) {
 
  const { data, setData, put, errors, reset } = useForm({
    name: client.name || "",
    address: client.address || "",
    phone_number: client.phone_number || "",
    email: client.email || "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("clients.update", client.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Client - {client.name}
          </h2>
        </div>
      }
    >
      <Head title="Edit Client" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="client_name" value="Client Name" />

                <TextInput
                  id="client_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="client_address" value="Client Address" />

                <TextInput
                  id="client_address"
                  type="text"
                  name="address"
                  value={data.address}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("address", e.target.value)}
                />

                <InputError message={errors.address} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="client_phone_number" value="Phone Number" />

                <TextInput
                  id="client_phone_number"
                  type="text"
                  name="phone_number"
                  value={data.phone_number}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("phone_number", e.target.value)}
                />

                <InputError message={errors.phone_number} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="client_email" value="Email" />

                <TextInput
                  id="client_email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("clients.index")}
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