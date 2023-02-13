import React from "react";
import { Head, usePage } from "@inertiajs/react";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  const { auth } = usePage().props;

  return (
    <>
      <Head>
        <title>Demo App</title>
        <meta
          type="description"
          content="Information about Demo App"
          head-key="description"
        />
      </Head>

      <section className="p-6 bg-gray-200">
        <header className="flex justify-between">
          <div className="flex items-center">
            <h1 className="font-bold text-lg">My App</h1>

            <p className="text-sm ml-4">Welcome, {auth?.user?.name}</p>
          </div>

          <NavBar />
        </header>
      </section>

      <section className="p-6">
        <div className="max-w-3xl mx-auto">{children}</div>
      </section>
    </>
  );
}
