import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

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
        <Button href="/activities">Activities</Button>

        <Button href="/friends">Friends</Button>

        <Button href="/reviews">Reviews</Button>

        {token !== null ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button href="/login">Login</Button>
            <Button href="/register">Register</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
