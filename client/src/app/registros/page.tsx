"use client";
import Navbar from "@/components/nav/navbar";
import React from "react";
import { UseUser } from "../providers";
import { Card, CardBody, CardHeader, Stack } from "@chakra-ui/react";

export default function page() {
  const { hits } = UseUser();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center  h-screen ">
        <Stack spacing={4} className="w-[30%] max-lg:w-[70%]">
          {hits?.reverse().map((item) => {
            return (
              <Card className="p-4 border-b bg-slate-400">
                <CardHeader>
                  <h1 className="text-center font-medium">{item.date}</h1>
                </CardHeader>
                <CardBody>
                  <p>
                    Entrada: <span className="font-semibold">{item.entrada}</span>{" "}
                  </p>
                  <p>
                    Saida: <span className="font-semibold">{item.saida || "Não Registrado!"}</span>{" "}
                  </p>
                  <p>
                    Permanencia: <span className="font-semibold"> {item.permanencia}</span>
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </Stack>
      </div>
    </>
  );
}
