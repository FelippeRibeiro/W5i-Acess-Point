"use client";
import React from "react";
import { UseUser } from "../../app/providers";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { name, logout } = UseUser();
  return (
    <div className="bg-blue-500 w-screen top-0 h-16 flex justify-between p-3 rounded-b-xl shadow-md mb-2">
      <Link href={"/home"}>
        <Button>
          <h1 className="font-semibold flex items-center">
            <Image src={"/w5i.png"} width={50} height={50} alt="w5i logo" /> {name}
          </h1>
        </Button>
      </Link>

      <Link href={"/registros"}>
        <Button className="text-center">Meus Registros</Button>
      </Link>

      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}
