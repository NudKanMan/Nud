// src/components/Utility/Navbar.tsx
import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-primary p-4 shadow-lg text-primary flex justify-between items-center">
      <Link href="/" passHref>
        <h1 className="text-lg font-semibold cursor-pointer hover:text-accent transition-colors duration-200">
          Nud Platform
        </h1>
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link href="/profile" passHref>
              <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition-colors duration-200">
                Profile
              </button>
            </Link>
            <Link href="/profile/edit" passHref>
              <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition-colors duration-200">
                Edit Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition-colors duration-200">
                Login
              </button>
            </Link>
            <Link href="/register" passHref>
              <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition-colors duration-200">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
