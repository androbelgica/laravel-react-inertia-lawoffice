import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({
  auth,
  lawsuitTask = {},
  users = [],
  lawsuits = [],
}) {
  const { data, setData, put, errors, reset } = useForm({
    task_name: lawsuitTask.task_name || "",
    description: lawsuitTask.description || "",
    priority: lawsuitTask.priority || "",
    status: lawsuitTask.status || "",
    due_date: lawsuitTask.due_date || "",
    user_id: lawsuitTask.user_id || "",
    lawsuit_id: lawsuitTask.lawsuit_id || "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("lawsuit-tasks.update", lawsuitTask.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Lawsuit Task - {lawsuitTask.task_name}
          </h2>
        </div>
      }
    >
      <Head title="Edit Lawsuit Task" />

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
                  {users.data.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.user_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="lawsuit_id" value="Lawsuit" />

                <SelectInput
                  id="lawsuit_id"
                  name="lawsuit_id"
                  value={data.lawsuit_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("lawsuit_id", e.target.value)}
                >
                  {lawsuits.data.map((lawsuit) => (
                    <option key={lawsuit.id} value={lawsuit.id}>
                      {lawsuit.title}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.lawsuit_id} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("lawsuit-tasks.index")}
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
