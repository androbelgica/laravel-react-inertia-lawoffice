import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { Head, Link, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "@/constants";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";

export default function Index({ auth, lawsuit_tasks, queryParams = null }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("lawsuit-tasks.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("lawsuit-tasks.index"), queryParams);
  };

  const isSorted = (name, direction) => {
    return (
      queryParams.sort_field === name &&
      queryParams.sort_direction === direction
    );
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lawsuit Tasks
        </h2>
      }
    >
      <Head title="Lawsuit Tasks" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <TableHeading
                        name="task_name"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Task Name
                      </TableHeading>
                      <TableHeading
                        name="description"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Description
                      </TableHeading>
                      <TableHeading
                        name="priority"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Priority
                      </TableHeading>
                      <TableHeading
                        name="status"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>
                      <TableHeading
                        name="due_date"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Due Date
                      </TableHeading>
                      <TableHeading
                        name="lawsuit_id"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Lawsuit
                      </TableHeading>
                      <TableHeading
                        name="assigned_to"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Assigned To
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Created At
                      </TableHeading>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.task_name}
                          placeholder="Task Name"
                          onBlur={(e) =>
                            searchFieldChanged("task_name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("task_name", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>

                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.progress_status}
                          onChange={(e) =>
                            searchFieldChanged("priority", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"> </th>

                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.lawsuit}
                          placeholder="Lawsuit"
                          onBlur={(e) =>
                            searchFieldChanged("lawsuit", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("lawsuit", e)}
                        />
                      </th>
                      <th className="px-3 py-3"> </th>

                      <th className="px-3 py-3"> </th>

                      <th className="px-3 py-3"></th>

                      <th className="px-3 py-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <pre>{JSON.stringify(lawsuit_tasks,undefined, 2)}</pre>  */}
                    {lawsuit_tasks.data.map((lawsuit_task) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={lawsuit_task.id}
                      >
                        <td className="px-3 py-2">{lawsuit_task.id}</td>
                        <td className="px-3 py-2">{lawsuit_task.task_name}</td>
                        <td className="px-3 py-2">
                          {lawsuit_task.description}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              TASK_PRIORITY_CLASS_MAP[lawsuit_task.priority]
                            }
                          >
                            {TASK_PRIORITY_TEXT_MAP[lawsuit_task.priority]}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              TASK_STATUS_CLASS_MAP[lawsuit_task.status]
                            }
                          >
                            {TASK_STATUS_TEXT_MAP[lawsuit_task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{lawsuit_task.due_date}</td>
                        <td className="px-3 py-2">
                          {lawsuit_task.lawsuit.case_number}
                        </td>
                        <td className="px-3 py-2">
                          {lawsuit_task.assigned_to
                            ? lawsuit_task.assigned_to.name
                            : "N/A"}
                        </td>
                        <td className="px-3 py-2">{lawsuit_task.created_at}</td>
                        <td className="px-3 py-2 text-right">
                          <Link
                            href={route("lawsuit-tasks.edit", lawsuit_task.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route(
                              "lawsuit-tasks.destroy",
                              lawsuit_task.id
                            )}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={lawsuit_tasks.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
