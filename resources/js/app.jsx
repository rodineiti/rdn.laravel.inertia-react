import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from "./Shared/Layout";

createInertiaApp({
  resolve: (name) => {
    const page = resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    );

    page.then((module) => {
      if (module.default.layout === undefined) {
        module.default.layout = (module) => <Layout children={module} />;
      }
    });

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});

InertiaProgress.init({
  color: "red",
});

/*
const pages = import.meta.glob('./Pages/***.jsx', { eager: true })
let page = pages[`./Pages/${name}.jsx`];
page.default.layout = page.default.layout || (page => <Layout children={page} />)
return page
*/
