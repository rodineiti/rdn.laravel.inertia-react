import React from "react";
import { Link } from "@inertiajs/react";

export default function NavLink({ children, active = false, ...rest }) {
  return (
    <Link
      className={`text-black hover:underline ${
        active ? "font-bold underline" : ""
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
}
