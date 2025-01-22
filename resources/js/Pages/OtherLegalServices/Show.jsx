import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../OtherLegalServicesTask/TasksTable";

export default function Show({
  auth,
  success,
  other_service,
  other_legal_service_tasks,
  queryParams,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Service Name "${other_service.service_name}"`}
          </h2>
          <Link
            href={route("other-legal-services.edit", other_service.id)}
            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`"${other_service.service_name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="grid gap-1 grid-cols-2 mt-2">
                  <div>
                    <div>
                      <label className="font-bold text-lg">Service Name</label>
                      <p className="mt-1">{other_service.service_name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Description</label>
                      <p className="mt-1">{other_service.description}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">
                        Progress Status
                      </label>
                      <p className="mt-1">{other_service.progress_status}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Client</label>
                      <p className="mt-1">
                        {other_service.client
                          ? other_service.client.name
                          : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Created By</label>
                      <p className="mt-1">
                        {other_service.created_by
                          ? other_service.created_by.name
                          : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Date Started</label>
                      <p className="mt-1">{other_service.date_started}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Date Ended</label>
                      <p className="mt-1">{other_service.date_ended}</p>
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
                        {other_service.created_at}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-md text-gray-700 dark:text-gray-300">
                        Updated By
                      </label>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {other_service.updated_by
                          ? other_service.updated_by.name
                          : "N/A"}
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
                  href={route("other-legal-service-tasks.create", {
                    other_legal_service_id: other_service.id,
                  })}
                  className="bg-green-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-green-600"
                >
                  Add New Task
                </Link>
              </div>
              <TasksTable
                other_legal_service_tasks={
                  other_service.other_legal_service_tasks
                }
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
