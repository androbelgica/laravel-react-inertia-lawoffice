import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import { Head, Link, router} from '@inertiajs/react';

export default function Index({auth, lawsuits, queryParams = null}) {

        queryParams = queryParams || {};
        const searchFieldChanged = (title, value) => {
          if (value) {
              queryParams[title] = value;
          } else {
              delete queryParams[title];
          }
            router.get(route('lawsuits.index'), queryParams);   
             };

        const onKeyPress = (title, e) => {
            if (e.key !== 'Enter') return;
         
                searchFieldChanged(title, e.target.value);
            };

            const sortChanged = (title) => {
                if (title === queryParams.sort_field) {
                  if (queryParams.sort_direction === "asc") {
                    queryParams.sort_direction = "desc";
                  } else {
                    queryParams.sort_direction = "asc";
                  }
                } else {
                  queryParams.sort_field = title;
                  queryParams.sort_direction = "asc";
                }
                router.get(route("lawsuits.index"), queryParams);
              };
            
        
    const isSorted = (name, direction) => {
        return queryParams.sort_field === name && queryParams.sort_direction === direction;
    };

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Lawsuits
                </h2>
            }
        >
            <Head title="Lawsuits" />

            <div className="py-12"></div>
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
                                            name = "title"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Title
                                       </TableHeading>
                                       <TableHeading
                                            name = "case_number"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Case Number
                                       </TableHeading>
                                       <TableHeading
                                            name = "case_type"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Case Type
                                       </TableHeading>
                                       <TableHeading
                                            name = "case_status"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Case Status
                                       </TableHeading>
                                       <TableHeading
                                            name = "court_name"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Court Name
                                       </TableHeading>
                                       <TableHeading
                                            name = "open_date"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Open Date
                                       </TableHeading>
                                       <TableHeading
                                            name = "close_date"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Close Date
                                       </TableHeading>
                                       <TableHeading
                                            name = "lawyer_id"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Lawyer
                                       </TableHeading>
                                       <TableHeading
                                            name = "client_id"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Client
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
                                            name = "updated_by"
                                            sortable = {true}
                                            sort_field = {queryParams.sort_field}
                                            sort_direction = {queryParams.sort_direction}
                                            sortChanged = {sortChanged}
                                        >
                                            Updated By
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
                                                defaultValue={queryParams.title}
                                                placeholder="Lawsuit Title"
                                                onBlur={e => searchFieldChanged('title', e.target.value)}
                                                onKeyPress={e => onKeyPress('title', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
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
                                    {lawsuits.data.map((lawsuit) => (
                                        <tr   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={lawsuit.id}>
                                            <td className="px-3 py-2">{lawsuit.id}</td>
                                            <td className="px-3 py-2">{lawsuit.title}</td>
                                            <td className="px-3 py-2">{lawsuit.case_number}</td>
                                            <td className="px-3 py-2">{lawsuit.case_type}</td>
                                            <td className="px-3 py-2">{lawsuit.case_status}</td>
                                            <td className="px-3 py-2">{lawsuit.court_name}</td>
                                            <td className="px-3 py-2">{lawsuit.open_date}</td>
                                            <td className="px-3 py-2">{lawsuit.close_date}</td>
                                            <td className="px-3 py-2">{lawsuit.lawyer.name}</td>
                                            <td className="px-3 py-2">{lawsuit.client.name}</td>
                                            <td className="px-3 py-2">{lawsuit.created_by.name}</td>
                                            <td className="px-3 py-2">{lawsuit.updated_by.name}</td>
                                            <td className="px-3 py-2 text-nowrap">{lawsuit.created_at}</td>
                                            <td className="px-3 py-2">
                                                {/* <Link href={route("lawsuits.edit", lawsuit.id)} 
                                                    className="font-medium text-blue-600 dark:text-white hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <Link href={route("lawsuits.destroy", lawsuit.id)} 
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                    Delete
                                                </Link> */}
                                              
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           </div>
                            <Pagination links={lawsuits.meta.links} />
                        </div>
                    </div>
                </div>
            
        </AuthenticatedLayout>
    );
}