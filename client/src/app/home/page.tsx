"use client";
import React, { useState, useEffect } from "react";
import { UseUser } from "../providers";
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
            <h1>
              Entrada: <span className="font-semibold">{today?.entrada || "Não Registrado!"}</span>
            </h1>
            <h1>
              Saida: <span className="font-semibold"> {today?.saida || "Não Registrado!"}</span>
            </h1>
            {today?.entrada && today.saida && (
              <h1>
                Permanencia: <span className="font-semibold">{today.permanencia} </span>
              </h1>
            )}

            <Button className="rounded-full bg-orange-300 m-3 p-8" onClick={register}>
              Registrar
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
