import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import { Head, Link, router } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import { OTHER_SERVICE_STATUS_CLASS_MAP, OTHER_SERVICE_STATUS_TEXT_MAP } from '@/constants';

export default function Index({ auth, other_services, queryParams = null }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('other-legal-services.index'), queryParams); 
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('other-legal-services.index'), queryParams);
    };

    const isSorted = (name, direction) => {
        return queryParams.sort_field === name && queryParams.sort_direction === direction;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Other Legal Services
                </h2>
            }
        >
            <Head title="Other Legal Services" />

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
                                                name="service_name"
                                                sortable={true}
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Service Name
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
                                                name="client"
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
                                                    onBlur={(e) => searchFieldChanged('service_name', e.target.value)}
                                                    onKeyPress={(e) => onKeyPress('service_name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.progress_status}
                                                    onChange={(e) => searchFieldChanged('progress_status', e.target.value)}
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
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {other_services.data.map((other_service) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={other_service.id}
                                            >
                                                <td className="px-3 py-2">{other_service.id}</td>
                                                <td className="px-3 py-2">{other_service.service_name}</td>
                                                <td className="px-3 py-2">{other_service.description}</td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            OTHER_SERVICE_STATUS_CLASS_MAP[other_service.progress_status]
                                                        }
                                                    >
                                                        {OTHER_SERVICE_STATUS_TEXT_MAP[other_service.progress_status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">{other_service.date_started}</td>
                                                <td className="px-3 py-2">{other_service.date_ended}</td>
                                                <td className="px-3 py-2">{other_service.client ? other_service.client.name : 'N/A'}</td>
                                                <td className="px-3 py-2">{other_service.created_by ? other_service.created_by.name : 'N/A'}</td>
                                                <td className="px-3 py-2">{other_service.updated_by ? other_service.updated_by.name : 'N/A'}</td>
                                                <td className="px-3 py-2">{other_service.created_at}</td>
                                                <td className="px-3 py-2">
                                                    <Link
                                                        href={route('other-legal-services.edit', other_service.id)}
                                                        className="font-medium text-blue-600 dark:text-white hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('other-legal-services.destroy', other_service.id)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </Link>
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
            </div>
        </AuthenticatedLayout>
    );
}