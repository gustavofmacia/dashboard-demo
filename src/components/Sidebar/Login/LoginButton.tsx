"use client";

import { signIn, signOut } from "next-auth/react";
import { CiLogin, CiLogout } from "react-icons/ci";

export const LoginButton = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const handleAuth = () => {
    if (isAuthenticated) {
      signOut({ callbackUrl: "/dashboard" });
    } else {
      signIn();
    }
  };

  return (
    <button
      onClick={handleAuth}
      className="group flex cursor-pointer items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
    >
      {isAuthenticated ? <CiLogout /> : <CiLogin />}
      <span className="group-hover:text-gray-700">
        {isAuthenticated ? "Logout" : "Ingresar"}
      </span>
    </button>
  );
};
