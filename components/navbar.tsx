"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export function NavBar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm py-3 border-bottom border-light">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-dark fs-4">
          Main Page
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            {session?.user && (
              <li className="nav-item">
                <Link
                  href="/my-products"
                  className="nav-link fw-medium text-secondary px-3"
                >
                  My Products
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0 gap-3">
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm text-secondary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : session?.user ? (
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border shadow-sm rounded-pill py-1 pe-3 ps-2"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="rounded-circle border"
                    />
                  ) : (
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: 28, height: 28, fontSize: "0.8rem" }}
                    >
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="small fw-medium text-dark d-none d-sm-inline">
                    {session.user.name}
                  </span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2"
                  aria-labelledby="userDropdown"
                >
                  <li className="dropdown-header border-bottom pb-2 mb-1">
                    <div className="fw-semibold text-dark">
                      {session.user.name}
                    </div>
                    <div className="small text-muted">{session.user.email}</div>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="dropdown-item text-danger fw-medium d-flex align-items-center"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="btn btn-dark px-4 py-2 rounded-pill fw-medium shadow-sm transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
