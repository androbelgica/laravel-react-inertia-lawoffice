import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
// Remove Ziggy import if it's only used for the scheduler
// import { ZiggyVue } from "ziggy-js";
// import { Ziggy } from "./ziggy"; // Import the Ziggy routes

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    createApp({ render: () => h(App, props) })
      // Remove Ziggy usage if it's only used for the scheduler
      // .use(ZiggyVue, Ziggy) // Use the Ziggy plugin
      .mount(el);
  },
});
