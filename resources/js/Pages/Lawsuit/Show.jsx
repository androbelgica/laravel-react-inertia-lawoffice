import { LAWSUIT_STATUS_CLASS_MAP, LAWSUIT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../LawsuitTask/TasksTable";

export default function Show({
  auth,
  success,
  lawsuit,
  lawsuit_tasks,
  queryParams,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Case Number "${lawsuit.case_number}"`}
          </h2>
          <Link
            href={route("lawsuits.edit", lawsuit.id)}
            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`"${lawsuit.case_number}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="grid gap-1 grid-cols-2 mt-2">
                  <div>
                    <div>
                      <label className="font-bold text-lg">Case Number</label>
                      <p className="mt-1">{lawsuit.case_number}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Case Title</label>
                      <p className="mt-1">{lawsuit.title}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Case Type</label>
                      <p className="mt-1">{lawsuit.case_type}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Court Name</label>
                      <p className="mt-1">{lawsuit.court_name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Case Status</label>
                      <p className="mt-1">
                        <span
                          className={
                            "px-2 py-1 rounded text-white " +
                            LAWSUIT_STATUS_CLASS_MAP[lawsuit.case_status]
                          }
                        >
                          {LAWSUIT_STATUS_TEXT_MAP[lawsuit.case_status]}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Client</label>
                      <p className="mt-1">
                        {lawsuit.client ? lawsuit.client.name : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Lawyer</label>
                      <p className="mt-1">
                        {lawsuit.lawyer ? lawsuit.lawyer.name : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Open Date</label>
                      <p className="mt-1">{lawsuit.open_date}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Close Date</label>
                      <p className="mt-1">{lawsuit.close_date}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                    <label className="font-bold text-lg">
                      Other Information
                    </label>
                    <div className="mt-4">
                      <label className="font-bold text-md text-gray-700 dark:text-gray-300">
                        Created At
                      </label>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {lawsuit.created_at}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-md text-gray-700 dark:text-gray-300">
                        Created By
                      </label>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {lawsuit.created_by ? lawsuit.created_by.name : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-md text-gray-700 dark:text-gray-300">
                        Updated By
                      </label>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {lawsuit.updated_by ? lawsuit.updated_by.name : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex justify-end mb-4">
                <Link
                  href={route("lawsuit-tasks.create", {
                    lawsuit_id: lawsuit.id,
                    origin: "lawsuits.show", // Add origin parameter
                  })}
                  className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600"
                >
                  Add New Task
                </Link>
              </div>
              <TasksTable
                lawsuit_tasks={lawsuit_tasks}
                success={success}
                queryParams={queryParams}
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
