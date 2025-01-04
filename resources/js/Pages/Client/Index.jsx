import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import { Head, Link, router} from '@inertiajs/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

export default function Index({auth, clients, queryParams = null}) {

        queryParams = queryParams || {};
        const searchFieldChanged = (name, value) => {
          if (value) {
              queryParams[name] = value;
          } else {
              delete queryParams[name];
          }
            router.get(route('clients.index'), queryParams);   
             };

        const onKeyPress = (name, e) => {
            if (e.key !== 'Enter') return;
         
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
        return queryParams.sort_field === name && queryParams.sort_direction === direction;
    };

    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Clients
                </h2>
            }
        >
            <Head title="Clients" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           <div className='overflow-x-auto'>
                           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                     <tr className="text-nowrap">
                                       <TableHeading
                                            name = "id"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            ID
                                       </TableHeading>
                                       
                                       <TableHeading
                                            name = "name"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Name
                                       </TableHeading>
                                       <TableHeading
                                            name = "address"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Address
                                       </TableHeading>
                                       <TableHeading
                                            name = "phone_number"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Phone Number
                                       </TableHeading>
                                       <TableHeading
                                            name = "email"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Email
                                       </TableHeading>
                                       <TableHeading
                                            name = "created_by"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Created By
                                       </TableHeading>
                                       <TableHeading
                                            name = "created_at"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Created At
                                       </TableHeading>
                                        <th className="px-3 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                     <tr className="text-nowrap">
                                        <th className="px-3 py-3" ></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Client Name"
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
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
                                        <tr   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={client.id}>
                                            <td className="px-3 py-2">{client.id}</td>
                                            <td className="px-3 py-2">{client.name}</td>
                                            <td className="px-3 py-2">{client.address}</td>
                                            <td className="px-3 py-2">{client.phone_number}</td>
                                            <td className="px-3 py-2">{client.email}</td>
                                            <td className="px-3 py-2">{client.created_by.name}</td>
                                            <td className="px-3 py-2 text-nowrap">{client.created_at}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route("clients.edit", client.id)} 
                                                    className="font-medium text-blue-600 dark:text-white hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <Link href={route("clients.destroy", client.id)} 
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                    Delete
                                                </Link>
                                              
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