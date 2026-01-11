"use client";

import { useEffect } from "react";
import Logo from "./Logo";
import { UserButton, useUser } from "@clerk/nextjs";
import { checkAndAddUser } from "../server";

const Navbar = () => {
  const { user } = useUser();

  useEffect(() => {
    const init = async () => {
      if (user?.primaryEmailAddress?.emailAddress && user.fullName) {
        await checkAndAddUser(user.primaryEmailAddress.emailAddress, user.fullName);
      }
    };
    init();
  }, [user]);

  return (
    <div className="px-5 md:px-[10%] pt-4">
      <div className="flex justify-between items-center">
        <Logo />

        <div className="bg-transparent ml-auto">
          {/* Toujours rendre UserButton pour éviter l'erreur d'hydration */}
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
