import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({
  auth,
  other_legal_service_tasks,
  success,
  queryParams = null,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Other Legal Service Tasks
          </h2>
          <Link
            href={route("other-legal-service-tasks.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Other Legal Service Tasks" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                other_legal_service_tasks={other_legal_service_tasks}
                queryParams={queryParams}
                success={success}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
