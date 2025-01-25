import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Index({
  auth,
  clients,
  queryParams = null,
  success,
  isException,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("clients.index"), queryParams);
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
    router.get(route("clients.index"), queryParams);
  };

  const isSorted = (name, direction) => {
    return (
      queryParams.sort_field === name &&
      queryParams.sort_direction === direction
    );
  };

  const deleteClient = (client) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }
    router.delete(route("clients.destroy", client.id), {
      onError: (errors) => {
        alert("Failed to delete client. Please try again.");
      },
    });
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
            Clients
          </h2>
          <Link
            href={route("clients.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Clients" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && showSuccess && (
            <div
              className={`py-2 px-4 text-white rounded mb-4 transition-opacity duration-1000 ease-out ${
                isException ? "bg-amber-500" : "bg-emerald-500"
              }`}
            >
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
                        name="name"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>
                      <TableHeading
                        name="address"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Address
                      </TableHeading>
                      <TableHeading
                        name="phone_number"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Phone Number
                      </TableHeading>
                      <TableHeading
                        name="email"
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Email
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
                          defaultValue={queryParams.name}
                          placeholder="Client Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.data.map((client) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={client.id}
                      >
                        <td className="px-3 py-2">{client.id}</td>
                        <td className="px-3 py-2 text-nowrap">{client.name}</td>
                        <td className="px-3 py-2">{client.address}</td>
                        <td className="px-3 py-2 text-nowrap">
                          {client.phone_number}
                        </td>
                        <td className="px-3 py-2">{client.email}</td>
                        <td className="px-3 py-2">{client.created_by.name}</td>
                        <td className="px-3 py-2">{client.created_at}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("clients.edit", client.id)}
                            className="font-medium text-blue-600 dark:text-white hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteClient(client)}
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
              <Pagination links={clients.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
