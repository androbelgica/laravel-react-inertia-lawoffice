import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { Head, Link, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import React, { useEffect, useState } from "react";

export default function Index({
  auth,
  other_services,
  users = [],
  queryParams = null,
  success,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("other-legal-services.index"), queryParams);
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
    router.get(route("other-legal-services.index"), queryParams);
  };

  const deleteService = (service) => {
    if (
      !window.confirm("Are you sure you want to delete this service record?")
    ) {
      return;
    }
    router.delete(route("other-legal-services.destroy", service.id));
  };

  const isSorted = (name, direction) => {
    return (
      queryParams.sort_field === name &&
      queryParams.sort_direction === direction
    );
  };

  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Other Legal Services
          </h2>
          <Link
            href={route("other-legal-services.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Other Legal Services" />

      <div className="py-12"></div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {success && showSuccess && (
          <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4 transition-opacity duration-1000 ease-out">
            {success}
          </div>
        )}
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
                      name="service_name"
                      sortable={true}
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Service Name
                    </TableHeading>
                    <TableHeading
                      name="progress_status"
                      sortable={true}
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Progress Status
                    </TableHeading>
                    <TableHeading
                      name="date_started"
                      sortable={true}
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Date Started
                    </TableHeading>
                    <TableHeading
                      name="date_ended"
                      sortable={true}
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Date Ended
                    </TableHeading>
                    <TableHeading
                      name="client_id"
                      sortable={true}
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Client
                    </TableHeading>
                    <TableHeading
                      name="created_by"
                      sortable={true}
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Created By
                    </TableHeading>
                    <TableHeading
                      name="updated_by"
                      sortable={true}
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Updated By
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
                        defaultValue={queryParams.service_name}
                        placeholder="Service Name"
                        onBlur={(e) =>
                          searchFieldChanged("service_name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("service_name", e)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-full"
                        defaultValue={queryParams.progress_status}
                        onChange={(e) =>
                          searchFieldChanged("progress_status", e.target.value)
                        }
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {other_services.data.map((service) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={service.id}
                    >
                      <td className="px-3 py-2">{service.id}</td>
                      <td className="px-3 py-2">{service.service_name}</td>
                      <td className="px-3 py-2">{service.progress_status}</td>
                      <td className="px-3 py-2">{service.date_started}</td>
                      <td className="px-3 py-2">{service.date_ended}</td>
                      <td className="px-3 py-2">
                        {service.client ? service.client.name : "N/A"}
                      </td>
                      <td className="px-3 py-2">
                        {service.created_by ? service.created_by.name : "N/A"}
                      </td>
                      <td className="px-3 py-2">
                        {service.updated_by ? service.updated_by.name : "N/A"}
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        {service.created_at}
                      </td>
                      <td className="px-3 py-2">
                        <Link
                          href={route("other-legal-services.edit", service.id)}
                          className="font-medium text-blue-600 dark:text-white hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => deleteService(service)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination links={other_services.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
