import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({
  auth,
  otherLegalServiceTask, // Use otherLegalServiceTask instead of lawsuitTask
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Task: "${otherLegalServiceTask.task_name}"`}
          </h2>
          <Link
            href={route(
              "other-legal-service-tasks.edit",
              otherLegalServiceTask.id
            )}
            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Task: "${otherLegalServiceTask.task_name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="grid gap-1 grid-cols-2 mt-2">
                  <div>
                    <div>
                      <label className="font-bold text-lg">Task Name</label>
                      <p className="mt-1">{otherLegalServiceTask.task_name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Priority</label>
                      <p className="mt-1">{otherLegalServiceTask.priority}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Status</label>
                      <p className="mt-1">{otherLegalServiceTask.status}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Due Date</label>
                      <p className="mt-1">{otherLegalServiceTask.due_date}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Assigned User</label>
                      <p className="mt-1">
                        {otherLegalServiceTask.user
                          ? otherLegalServiceTask.user.name
                          : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Created By</label>
                      <p className="mt-1">
                        {otherLegalServiceTask.created_by
                          ? otherLegalServiceTask.created_by.name
                          : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Updated By</label>
                      <p className="mt-1">
                        {otherLegalServiceTask.updated_by
                          ? otherLegalServiceTask.updated_by.name
                          : "N/A"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Description</label>
                      <p className="mt-1">
                        {otherLegalServiceTask.description}
                      </p>
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
                        {otherLegalServiceTask.created_at}
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-md text-gray-700 dark:text-gray-300">
                        Updated At
                      </label>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {otherLegalServiceTask.updated_at}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
