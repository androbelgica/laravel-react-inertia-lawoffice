import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({
  auth,
  users = [],
  other_legal_services = [],
  other_legal_service_id = "",
}) {
  const { data, setData, post, errors, reset } = useForm({
    task_name: "",
    description: "",
    priority: "",
    status: "pending", // Use lowercase value
    due_date: "",
    user_id: "",
    other_legal_service_id: other_legal_service_id, // Set initial value from prop
  });

  // Find the other legal service by other_legal_service_id
  const selectedOtherLegalService = other_legal_services.find(
    (service) => service.id === parseInt(other_legal_service_id)
  );

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("other-legal-service-tasks.store"));
  };

  // Sort users and other legal services alphabetically by name/title
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
  const sortedOtherLegalServices = other_legal_services.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Other Legal Service Task
          </h2>
        </div>
      }
    >
      <Head title="Other Legal Service Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />

                <TextInput
                  id="task_name"
                  type="text"
                  name="task_name"
                  value={data.task_name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("task_name", e.target.value)}
                />

                <InputError message={errors.task_name} className="mt-2" />
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
                <InputLabel htmlFor="priority" value="Priority" />

                <SelectInput
                  id="priority"
                  name="priority"
                  value={data.priority}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>

                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="status" value="Status" />

                <SelectInput
                  id="status"
                  name="status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="due_date" value="Due Date" />

                <TextInput
                  id="due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full text-white"
                  onChange={(e) => setData("due_date", e.target.value)}
                  style={{ colorScheme: "dark" }}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_id" value="Assigned To" />

                <SelectInput
                  id="user_id"
                  name="user_id"
                  value={data.user_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {sortedUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.user_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="other_legal_service_id"
                  value="Other Legal Service"
                />

                <SelectInput
                  id="other_legal_service_id"
                  name="other_legal_service_id"
                  value={data.other_legal_service_id}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("other_legal_service_id", e.target.value)
                  }
                  disabled={!!other_legal_service_id} // Disable if other_legal_service_id is passed
                >
                  <option value="">Select Other Legal Service</option>
                  {sortedOtherLegalServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.other_legal_service_id}
                  className="mt-2"
                />
              </div>
              {selectedOtherLegalService && (
                <div className="mt-4">
                  <InputLabel value="Other Legal Service Title" />
                  <p className="mt-1">{selectedOtherLegalService.title}</p>
                </div>
              )}
              <div className="mt-4 text-right">
                <Link
                  href={route("other-legal-service-tasks.index")}
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
