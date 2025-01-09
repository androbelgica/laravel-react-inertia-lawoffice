import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, clients, lawyers, users }) {
  const { data, setData, post, errors, reset } = useForm({
    title: "",
    case_number: "",
    case_type: "",
    case_status: "",
    client_id: "",
    lawyer_id: "",
    created_by: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("lawsuits.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Lawsuit
          </h2>
        </div>
      }
    >
      <Head title="Lawsuits" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="lawsuit_title" value="Lawsuit Title" />

                <TextInput
                  id="lawsuit_title"
                  type="text"
                  name="title"
                  value={data.title}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("title", e.target.value)}
                />

                <InputError message={errors.title} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="case_number" value="Case Number" />

                <TextInput
                  id="case_number"
                  type="text"
                  name="case_number"
                  value={data.case_number}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("case_number", e.target.value)}
                />

                <InputError message={errors.case_number} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="case_type" value="Case Type" />

                <TextInput
                  id="case_type"
                  type="text"
                  name="case_type"
                  value={data.case_type}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("case_type", e.target.value)}
                />

                <InputError message={errors.case_type} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="case_status" value="Case Status" />

                <TextInput
                  id="case_status"
                  type="text"
                  name="case_status"
                  value={data.case_status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("case_status", e.target.value)}
                />

                <InputError message={errors.case_status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="client_id" value="Client" />

                <SelectInput
                  id="client_id"
                  name="client_id"
                  value={data.client_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("client_id", e.target.value)}
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.client_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="lawyer_id" value="Lawyer" />

                <SelectInput
                  id="lawyer_id"
                  name="lawyer_id"
                  value={data.lawyer_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("lawyer_id", e.target.value)}
                >
                  <option value="">Select Lawyer</option>
                  {lawyers.map((lawyer) => (
                    <option key={lawyer.id} value={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.lawyer_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="created_by" value="Created By" />

                <SelectInput
                  id="created_by"
                  name="created_by"
                  value={data.created_by}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("created_by", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.created_by} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("lawsuits.index")}
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