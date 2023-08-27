"use client";
import React, { useState } from "react";
import { UseUser } from "../providers";
import { Button, Input } from "@chakra-ui/react";

import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  const { name, isLogged, login, cadastrar } = UseUser();
  const [form, setForm] = useState<{ name: string; email: string; password: string }>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex  flex-col w-screen h-screen items-center justify-center">
      <Image src={"/w5i.png"} width={100} height={50} alt="w5i logo"></Image>
      <div className="flex flex-col items-center justify-center p-6 rounded-md shadow-md shadow-blue-400">
        <h1 className="text-4xl font-serif">Cadastro</h1>
        <div>
          <div>
            <label htmlFor="">Nome</label>
            <Input
              value={form.name}
              placeholder="Seu nome"
              onChange={(e) =>
                setForm((old) => {
                  return { ...old, name: e.target.value };
                })
              }
            ></Input>
          </div>
          <div>
            <label htmlFor="">Email</label>
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={form.email}
              onChange={(e) =>
                setForm((old) => {
                  return { ...old, email: e.target.value };
                })
              }
            ></Input>
          </div>

          <div>
            <label htmlFor="">Password</label>
            <Input
              type="password"
              placeholder="Sua senha"
              value={form.password}
              onChange={(e) =>
                setForm((old) => {
                  return { ...old, password: e.target.value };
                })
              }
            ></Input>
          </div>
        </div>
        <Button
          className="bg-blue-600 text-white m-7"
          onClick={() => {
            if (!form.email || !form.name || !form.password) {
              toast.error("Preencha todos os campos!");
              return;
            }
            cadastrar(form.name, form.email, form.password);
          }}
        >
          Cadastrar
        </Button>
        <Link href={"/login"}>Já possui uma conta?</Link>
      </div>
    </div>
  );
}
