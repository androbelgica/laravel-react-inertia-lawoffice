import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, lawsuit, clients = [], lawyers = [] }) {
  const { data, setData, put, errors, reset } = useForm({
    title: lawsuit.title,
    case_number: lawsuit.case_number,
    case_type: lawsuit.case_type,
    case_status: lawsuit.case_status,
    court_name: lawsuit.court_name,
    client_id: lawsuit.client_id,
    lawyer_id: lawsuit.lawyer_id,
    open_date: lawsuit.open_date,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("lawsuits.update", lawsuit.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Case - {lawsuit.title}
          </h2>
        </div>
      }
    >
      <Head title="Edit Case" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="lawsuit_title" value="Lawsuit Title" />

                <TextInput
                  id="lawsuit_title"
                  type="text"
                  name="title"
                  value={data.title}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("title", e.target.value)}
                />

                <InputError message={errors.title} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="case_number" value="Case Number" />

                <TextInput
                  id="case_number"
                  type="text"
                  name="case_number"
                  value={data.case_number}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("case_number", e.target.value)}
                />

                <InputError message={errors.case_number} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="case_type" value="Case Type" />

                <SelectInput
                  id="case_type"
                  name="case_type"
                  value={data.case_type}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("case_type", e.target.value)}
                >
                  <option value="">Select Case Type</option>
                  <option value="criminal">Criminal</option>
                  <option value="civil">Civil</option>
                  <option value="administrative">Administrative</option>
                  <option value="election">Election</option>
                  <option value="labor">Labor</option>
                  <option value="tax">Tax</option>
                  <option value="environmental">Environmental</option>
                  <option value="intellectual property">
                    Intellectual Property
                  </option>
                </SelectInput>

                <InputError message={errors.case_type} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="case_status" value="Case Status" />

                <SelectInput
                  id="case_status"
                  name="case_status"
                  value={data.case_status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("case_status", e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="closed">Closed</option>
                  <option value="decided">Decided</option>
                  <option value="dismissed">Dismissed</option>
                  <option value="appealed">Appealed</option>
                  <option value="remanded">Remanded</option>
                  <option value="settled">Settled</option>
                  <option value="withdrawn">Withdrawn</option>
                </SelectInput>

                <InputError message={errors.case_status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="court_name" value="Court Name" />

                <TextInput
                  id="court_name"
                  type="text"
                  name="court_name"
                  value={data.court_name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("court_name", e.target.value)}
                />

                <InputError message={errors.court_name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="client_id" value="Client" />

                <SelectInput
                  id="client_id"
                  name="client_id"
                  value={data.client_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("client_id", e.target.value)}
                >
                  <option value={lawsuit.client_id}>
                    {lawsuit.client ? lawsuit.client.name : "Select Client"}
                  </option>
                  {clients.data.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.client_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="lawyer_id" value="Lawyer" />

                <SelectInput
                  id="lawyer_id"
                  name="lawyer_id"
                  value={data.lawyer_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("lawyer_id", e.target.value)}
                >
                  <option value={lawsuit.lawyer_id}>
                    {lawsuit.lawyer ? lawsuit.lawyer.name : "Select Lawyer"}
                  </option>
                  {lawyers.data.map((lawyer) => (
                    <option key={lawyer.id} value={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.lawyer_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="open_date" value="Open Date" />

                <TextInput
                  id="open_date"
                  type="date"
                  name="open_date"
                  value={data.open_date}
                  className="mt-1 block w-full text-white"
                  onChange={(e) => setData("open_date", e.target.value)}
                  style={{ colorScheme: "dark" }}
                />

                <InputError message={errors.open_date} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("lawsuits.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
