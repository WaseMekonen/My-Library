import React from "react";
import { Link } from "react-router-dom";

export default function LogOut({ setAuth}) {
  return (
    <Link onClick={() => setAuth(null)} to="/">
      Log Out
    </Link>
  );
}
