import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({ status, className = "" }) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      address: user.address,
      phone_number: user.phone_number,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-amber-900 dark:text-amber-100">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        <div>
          <InputLabel htmlFor="address" value="Address" />

          <TextInput
            id="address"
            className="mt-1 block w-full"
            value={data.address}
            onChange={(e) => setData("address", e.target.value)}
            required
            autoComplete="address"
          />

          <InputError className="mt-2" message={errors.address} />
        </div>

        <div>
          <InputLabel htmlFor="phone_number" value="Phone Number" />

          <TextInput
            id="phone_number"
            className="mt-1 block w-full"
            value={data.phone_number}
            onChange={(e) => setData("phone_number", e.target.value)}
            required
            autoComplete="tel"
          />

          <InputError className="mt-2" message={errors.phone_number} />
        </div>

        {(user.is_default_password === true ||
          user.is_default_password === 1) && (
          <div>
            <p className="mt-2 text-sm text-amber-800 dark:text-amber-600">
              You are using a default password. Please update your password for
              better security.
            </p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-amber-600 dark:text-amber-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
