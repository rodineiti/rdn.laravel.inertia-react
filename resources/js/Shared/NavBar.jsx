import React from "react";
import { usePage } from "@inertiajs/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { component } = usePage();

  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <NavLink href="/" active={component === "Home"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href="/users" active={component === "Users"}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink href="/logout" method="POST" as="button">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
