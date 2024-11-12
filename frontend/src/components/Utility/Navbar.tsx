// src/components/Utility/Navbar.tsx
import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { token, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="bg-primary p-4 shadow-lg text-primary flex justify-between items-center">
      <Link href="/" passHref>
        <h1 className="text-lg font-semibold cursor-pointer hover:text-accent transition-colors duration-200">
          Nud Platform
        </h1>
      </Link>
      <div className="space-x-4 flex">
        <Link href="/activities" passHref>
          <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition">
            Activities
          </button>
        </Link>
        <Link href="/friends" passHref>
          <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition">
            Friends
          </button>
        </Link>
        <Link href="/reviews" passHref>
          <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition">
            Reviews
          </button>
        </Link>

        {token !== null ? (
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition"
            >
              Login
            </Link>
            <Link href="/register" passHref>
              <button className="px-4 py-2 rounded bg-accent text-primary font-semibold hover:bg-pink-400 transition">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
