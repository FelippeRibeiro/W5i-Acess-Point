import axios, { AxiosError } from "axios";
import { redirect, usePathname, useRouter } from "next/navigation";
import { createContext, useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import Loading from "../components/loading/loading";
import jwt, { JwtPayload } from "jsonwebtoken";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
interface userContext {
  id: number;
  isLogged: boolean;
  name: string;
  email: string;
  login: (email: string, password: string) => {};
  cadastrar: (name: string, email: string, password: string) => {};
  logout: () => {};
  register: () => {};
  hits: IHit[] | undefined;
  today: IHit | undefined;
  permanencia: string | undefined;
}

export const User = createContext({} as userContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [hits, setHits] = useState<IHit[]>();
  const [today, setToday] = useState<IHit>();
  const [permanencia, setPermanencia] = useState<string | undefined>();
  const pathname = usePathname();
  const router = useRouter();
  const id = 1;
  const [name, setNome] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  const [isLogged, setIsLogged] = useState<boolean>(false);
  console.log("Context render");

  useEffect(() => {
    if (!isLogged) {
      const ValidateUser = jwt.decode(Cookies.get("token") as string) as JwtPayload;
      if (ValidateUser) {
        setNome(ValidateUser.name);
        setNome(ValidateUser.name);
        setEmail(ValidateUser.email);
        setIsLogged(true);
        setIsLoading(false);
      } else if (pathname === "/home" || pathname === "/registros") {
        redirect("/login");
      }
    } else if (pathname === "/login" || pathname === "/cadastro") {
      redirect("/home");
    }
    setIsLoading(false);
  }, [pathname, isLogged]);

  const server = axios.create({
    baseURL: "http://localhost:3001",
    headers: { Authorization: `Bearer ${token}` },
  });
  server.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.status == 401) {
      setIsLogged(false);
      Cookies.remove("token");
    }
  });

  useEffect(() => {
    if (isLogged) {
      getStatus();
    }
  }, [isLogged]);

  async function getStatus() {
    const { data } = await server.get<IHit[]>("/point");
    if (data) {
      setToday(data.find((el) => moment().format("DD/MM/YYYY") == el.date));
      setHits(data);
    }
  }

  async function logout() {
    setToken(undefined);
    Cookies.remove("token");
    setIsLogged(false);
  }

  async function login(email: string, password: string) {
    try {
      const { data, status } = await server.post("/auth/login", {
        email,
        password,
      });
      setToken(data.acess_token);
      Cookies.set("token", data.acess_token, { expires: 7 });
      setIsLogged(true);
      setNome(data.user.name);
      setEmail(data.user.email);
    } catch (error) {
      toast.error("Email ou senha incorretos");
    }
  }

  async function cadastrar(name: string, email: string, password: string) {
    try {
      const { data, status } = await server.post("/auth/register", {
        name,
        email,
        password,
      });
      setToken(data.acess_token);
      Cookies.set("token", data.acess_token, { expires: 7 });
      setIsLogged(true);
      setNome(data.user.name);
      setEmail(data.user.email);
    } catch (error) {
      alert("Email ou senha incorretos");
    }
  }

  async function register() {
    try {
      const { data, status } = await server.post<{
        status: string;
        id: number;
        date: string;
        entry: string;
        exit: string;
        usersId: number;
      }>("/point/register");

      toast.success(`Ponto de ${data.status} Registrado ${moment().format("DD/MM/YYYY HH:mm")}`);
      getStatus();
    } catch (error) {
      toast.error("Você não pode mais registrar o ponto hoje.\nVolte amanhã!");
    }
  }

  return (
    <User.Provider
      value={{
        id,
        name,
        email,
        isLogged,
        login,
        cadastrar,
        logout,
        register,
        hits,
        today,
        permanencia,
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {permanencia} {children}
        </>
      )}
    </User.Provider>
  );
}

function hoursByMinutes(totalMinutes: number): { hours: number; minutes: number } {
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
}

interface IHit {
  date: string;
  entrada: string;
  saida: string;
  permanencia: string;
}
