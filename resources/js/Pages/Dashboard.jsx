import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Scheduler from "./Scheduler";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import {
  FaTasks,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard({
  lawsuit_tasks,
  other_legal_service_tasks,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  totalPendingOtherTasks,
  myPendingOtherTasks,
  totalProgressOtherTasks,
  myProgressOtherTasks,
  totalCompletedOtherTasks,
  myCompletedOtherTasks,
  activeTasks = { data: [] },
  activeOtherTasks = { data: [] },
}) {
  const taskData = [
    { name: "Pending", Litigation: myPendingTasks, Other: myPendingOtherTasks },
    {
      name: "In Progress",
      Litigation: myProgressTasks,
      Other: myProgressOtherTasks,
    },
    {
      name: "Completed",
      Litigation: myCompletedTasks,
      Other: myCompletedOtherTasks,
    },
  ];

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Task Summary Cards */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transform transition duration-500 hover:scale-105">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center">
                <FaExclamationCircle className="text-amber-500 text-3xl mr-3" />
                <h3 className="text-amber-500 text-2xl font-semibold">
                  Pending Litigation Tasks
                </h3>
              </div>
              <p className="text-xl mt-4">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transform transition duration-500 hover:scale-105">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center">
                <FaSpinner className="text-blue-500 text-3xl mr-3" />
                <h3 className="text-blue-500 text-2xl font-semibold">
                  In Progress Litigation Tasks
                </h3>
              </div>
              <p className="text-xl mt-4">
                <span className="mr-2">{myProgressTasks}</span>/
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transform transition duration-500 hover:scale-105">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 text-3xl mr-3" />
                <h3 className="text-green-500 text-2xl font-semibold">
                  Completed Litigation Tasks
                </h3>
              </div>
              <p className="text-xl mt-4">
                <span className="mr-2">{myCompletedTasks}</span>/
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
          {/* Repeat for Other Tasks */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transform transition duration-500 hover:scale-105">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center">
                <FaExclamationCircle className="text-amber-500 text-3xl mr-3" />
                <h3 className="text-amber-500 text-2xl font-semibold">
                  Pending Other Tasks
                </h3>
              </div>
              <p className="text-xl mt-4">
                <span className="mr-2">{myPendingOtherTasks}</span>/
                <span className="ml-2">{totalPendingOtherTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transform transition duration-500 hover:scale-105">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center">
                <FaSpinner className="text-blue-500 text-3xl mr-3" />
                <h3 className="text-blue-500 text-2xl font-semibold">
                  In Progress Other Tasks
                </h3>
              </div>
              <p className="text-xl mt-4">
                <span className="mr-2">{myProgressOtherTasks}</span>/
                <span className="ml-2">{totalProgressOtherTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transform transition duration-500 hover:scale-105">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 text-3xl mr-3" />
                <h3 className="text-green-500 text-2xl font-semibold">
                  Completed Other Tasks
                </h3>
              </div>
              <p className="text-xl mt-4">
                <span className="mr-2">{myCompletedOtherTasks}</span>/
                <span className="ml-2">{totalCompletedOtherTasks}</span>
              </p>
            </div>
          </div>
          {/* ... */}
        </div>

        {/* Task Progress Chart */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="text-gray-200 text-xl font-semibold mb-4">
              Task Progress Overview
            </h3>
            <BarChart width={730} height={250} data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Litigation" fill="#8884d8" />
              <Bar dataKey="Other" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>

        {/* Active Tasks Tables */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-gray-200 text-xl font-semibold">
                My Active Litigation Tasks
              </h3>
              <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Task Name</th>
                    <th className="px-3 py-3">Case Number</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-3 py-2">{task.id}</td>

                      <td className="px-3 py-2 text-white hover:underline">
                        <Link href={route("lawsuit-tasks.show", task.id)}>
                          {task.task_name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-white hover:underline">
                        <Link href={route("lawsuit-tasks.show", task.id)}>
                          {task.lawsuit.case_number}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-nowrap text-white " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-gray-200 text-xl font-semibold">
                My Active Other Tasks
              </h3>
              <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Task Name</th>
                    <th className="px-3 py-3">Service Name</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeOtherTasks.data.map((othertask) => (
                    <tr
                      key={othertask.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-3 py-2">{othertask.id}</td>
                      <td className="px-3 py-2 text-white hover:underline">
                        <Link
                          href={route(
                            "other-legal-service-tasks.show",
                            othertask.id
                          )}
                        >
                          {othertask.task_name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-white hover:underline">
                        <Link
                          href={route(
                            "other-legal-service-tasks.show",
                            othertask.id
                          )}
                        >
                          {othertask.other_legal_service.service_name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-nowrap text-white " +
                            TASK_STATUS_CLASS_MAP[othertask.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[othertask.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        {othertask.due_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
          <Scheduler
            lawsuit_tasks={lawsuit_tasks}
            other_legal_service_tasks={other_legal_service_tasks}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
