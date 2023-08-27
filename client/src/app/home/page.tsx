"use client";
import React from "react";
import { UseUser } from "../providers";
import { redirect } from "next/navigation";
import { Button, Card, CardBody, CardHeader } from "@chakra-ui/react";
import Nav from "../../components/nav/navbar";
import moment from "moment";

export default function Page() {
  const { name, isLogged, login, email, register, today } = UseUser();

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center w-screen h-screen">
        <Card className=" border border-blue-300 px-6 shadow-black shadow-sm mt-40">
          <CardHeader>
            <h1 className="font-extrabold text-center">
              {today?.date || moment().format("DD/MM/YYYY")}
            </h1>
            <h1 className="text-center font-medium ">{name} </h1>
          </CardHeader>
          <CardBody>
            {today?.entrada && <h1>Entrada: {today?.entrada}</h1>}
            {today?.saida && <h1>Saida: {today.saida}</h1>}
            {today?.entrada && today.saida && <h1>Permanencia: {today.permanencia}</h1>}

            <Button className="rounded-full bg-orange-300 m-3 p-8" onClick={register}>
              Registrar
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
