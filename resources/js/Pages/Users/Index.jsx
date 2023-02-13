import React, { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Paginate from "../../Shared/Paginate";

export default function Users({ users }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const search = () => {
    router.get(
      route(route().current()),
      { search: query, page },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const destroy = (id) => {
    router.delete(`/users/${id}`);
  };

  useEffect(() => {
    search();
  }, [query, page]);

  return (
    <>
      <Head>
        <title>Users</title>
        <meta
          type="description"
          content="Users Information"
          head-key="description"
        />
      </Head>

      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-3xl">Users</h1>

          <Link href="/users/create" className="text-blue-500 text-sm ml-2">
            Add New User
          </Link>
        </div>

        <input
          type="search"
          name="search"
          value={query}
          placeholder="Search..."
          className="border px-2 rounded-lg"
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              search();
            }
          }}
        />
      </div>

      <div className="p-0">
        <table className="items-center justify-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
          <thead className="align-bottom">
            <tr>
              <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                Name
              </th>
              <th className="px-6 py-3 text-right font-semibold capitalize align-middle bg-transparent border-b border-solid shadow-none dark:border-white/40 dark:text-white tracking-none whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="border-t">
            {users?.data &&
              users?.data.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                    <div className="my-auto">
                      <h6 className="mb-0 text-sm leading-normal dark:text-white">
                        {item.name}
                      </h6>
                      <h6 className="mb-0 text-sm leading-normal dark:text-white">
                        {item.email}
                      </h6>
                    </div>
                  </td>
                  <td className="p-2 text-right align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                    <Link
                      href={`/users/${item.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <Link
                      className="text-red-600 hover:text-red-900"
                      onClick={() => destroy(item.id)}
                    >
                      Del
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {users && users.total > 0 && (
          <Paginate pagination={users} handlePage={(page) => setPage(page)} />
        )}
      </div>
    </>
  );
}
