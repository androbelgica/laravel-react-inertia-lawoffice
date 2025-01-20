import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({
  auth,
  other_service,
  clients = [],
  users = [],
}) {
  if (!other_service) {
    return <div>Loading...</div>;
  }

  const { data, setData, put, errors, reset } = useForm({
    service_name: other_service.service_name,
    description: other_service.description,
    date_started: other_service.date_started,
    date_ended: other_service.date_ended,
    progress_status: other_service.progress_status,
    client_id: other_service.client_id,
    created_by: other_service.created_by,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("other-legal-services.update", other_service.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Other Legal Service - {other_service.service_name}
          </h2>
        </div>
      }
    >
      <Head title="Edit Other Legal Service" />

      <div className="py-12"></div>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <form
            onSubmit={onSubmit}
            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
          >
            <div className="mt-4">
              <InputLabel htmlFor="service_name" value="Service Name" />

              <TextInput
                id="service_name"
                type="text"
                name="service_name"
                value={data.service_name}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData("service_name", e.target.value)}
              />

              <InputError message={errors.service_name} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="description" value="Description" />

              <TextAreaInput
                id="description"
                name="description"
                value={data.description}
                className="mt-1 block w-full"
                onChange={(e) => setData("description", e.target.value)}
              />

              <InputError message={errors.description} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="date_started" value="Date Started" />

              <TextInput
                id="date_started"
                type="date"
                name="date_started"
                value={data.date_started}
                className="mt-1 block w-full text-white"
                onChange={(e) => setData("date_started", e.target.value)}
                style={{ colorScheme: "dark" }}
              />

              <InputError message={errors.date_started} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="date_ended" value="Date Ended" />

              <TextInput
                id="date_ended"
                type="date"
                name="date_ended"
                value={data.date_ended}
                className="mt-1 block w-full text-white"
                onChange={(e) => setData("date_ended", e.target.value)}
                style={{ colorScheme: "dark" }}
              />

              <InputError message={errors.date_ended} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="progress_status" value="Progress Status" />

              <SelectInput
                id="progress_status"
                name="progress_status"
                value={data.progress_status}
                className="mt-1 block w-full"
                onChange={(e) => setData("progress_status", e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </SelectInput>

              <InputError message={errors.progress_status} className="mt-2" />
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
                <option value={other_service.client_id}>
                  {other_service.client
                    ? other_service.client.name
                    : "Select Client"}
                </option>
                {clients.data.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </SelectInput>

              <InputError message={errors.client_id} className="mt-2" />
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
                <option value={other_service.created_by}>
                  {other_service.created_by
                    ? other_service.created_by.name
                    : "Select User"}
                </option>
                {users.data.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </SelectInput>

              <InputError message={errors.created_by} className="mt-2" />
            </div>
            <div className="mt-4 text-right">
              <Link
                href={route("other-legal-services.index")}
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
    </AuthenticatedLayout>
  );
}
