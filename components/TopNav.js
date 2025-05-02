"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const TopNav = () => {
  const { data, status, loading } = useSession();

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link href="/" className="nav-link">
        🛒 NEXTECOM
      </Link>

      {status === "authenticated" ? (
        <>
          <Link href="/dashboard/user" className="nav-link">
            {data?.user?.name}
          </Link>
          <a
            href="/logout"
            className="nav-link"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </a>
        </>
      ) : (
        <div className="d-flex">
          <Link href="/login" className="nav-link">
            Login
          </Link>
          <Link href="/register" className="nav-link">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
