import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import { Link, router, useForm } from "@inertiajs/react";

export default function TasksTable({
  lawsuit_tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) {
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

  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    destroy(route("lawsuit-tasks.destroy", id), {
      onSuccess: () => {
        router.get(route("lawsuit-tasks.index"), queryParams);
      },
    });
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}
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
              {!hideProjectColumn && <th className="px-3 py-3">Case Number</th>}
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
                Case Number
              </TableHeading>
              <TableHeading
                name="user_id" // Change assigned_to to user_id
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
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-auto"
                  style={{
                    width: `${
                      queryParams.task_name ? queryParams.task_name.length : 10
                    }ch`,
                  }}
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
                  className="w-auto"
                  style={{
                    width: `${
                      queryParams.priority ? queryParams.priority.length : 10
                    }ch`,
                  }}
                  defaultValue={queryParams.priority}
                  onChange={(e) =>
                    searchFieldChanged("priority", e.target.value)
                  }
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3">
                <SelectInput
                  className="w-auto"
                  style={{
                    width: `${
                      queryParams.status ? queryParams.status.length : 10
                    }ch`,
                  }}
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
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
                  className="w-auto"
                  style={{
                    width: `${
                      queryParams.lawsuit ? queryParams.lawsuit.length : 10
                    }ch`,
                  }}
                  defaultValue={queryParams.lawsuit}
                  placeholder="Case Number"
                  onBlur={(e) => searchFieldChanged("lawsuit", e.target.value)}
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
                {!hideProjectColumn && (
                  <td className="px-3 py-2">
                    {lawsuit_task.lawsuit
                      ? lawsuit_task.lawsuit.case_number
                      : "N/A"}
                  </td>
                )}

                <th className="px-3 py-2 text-gray-100 hover:underline">
                  <Link href={route("lawsuit-tasks.show", lawsuit_task.id)}>
                    {lawsuit_task.task_name}
                  </Link>
                </th>
                <td className="px-3 py-2">{lawsuit_task.description}</td>
                <td className="px-3 py-2">
                  <span
                    className={TASK_PRIORITY_CLASS_MAP[lawsuit_task.priority]}
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
                  {lawsuit_task.lawsuit
                    ? lawsuit_task.lawsuit.case_number
                    : "N/A"}
                </td>
                <td className="px-3 py-2">
                  {lawsuit_task.user // Change assigned_to to user
                    ? lawsuit_task.user.name
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
                  <button
                    onClick={() => handleDelete(lawsuit_task.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={lawsuit_tasks.meta.links} />
    </>
  );
}
