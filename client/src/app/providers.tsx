"use client";

import { User, UserProvider } from "../context/userContext";
import { useContext } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export const UseUser = () => useContext(User);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Toaster position="top-center" toastOptions={{ style: { padding: "10px" } }} />
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </UserProvider>
  );
}
