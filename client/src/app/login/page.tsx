"use client";
import React, { useState } from "react";
import { UseUser } from "../providers";
import { Button, Input } from "@chakra-ui/react";

import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  const { name, isLogged, login } = UseUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Image src={"/w5i.png"} width={100} height={50} alt="w5i logo"></Image>
      <div className="flex flex-col items-center justify-center p-6 rounded-md shadow-md shadow-blue-400">
        <h1 className="text-4xl font-serif">Login</h1>
        <div>
          <div>
            <label htmlFor="">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
            ></Input>
          </div>

          <div>
            <label htmlFor="">Password</label>
            <Input
              type="password"
              value={password}
              placeholder="Sua senha"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
        </div>
        <Button
          className="bg-blue-600 text-white m-7"
          onClick={() => {
            if (!email || !password) {
              toast.error("Preencha Todos o campos!");
              return;
            }
            login(email, password);
          }}
        >
          Login
        </Button>
        <Link href={"/cadastro"}>Não possui uma conta?</Link>
      </div>
    </div>
  );
}
