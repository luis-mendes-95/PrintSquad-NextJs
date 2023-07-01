import Toast from "@/components/toast";
import { LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {

  const router = useRouter();

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        Toast({ message: "usuário cadastrado com sucesso!", isSucess: true });
        router.push("/loginPage");
      })
      .catch((err: any) => {
        console.log(err);
        Toast({ message: "Erro ao criar usuário, tente utilizar outro e-mail!" });
      });
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response: any) => {
        setCookie(null, "printsquad.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/"
        });
      })
      .then(() => {
        console.log("login deu liga")
        Toast({ message: "login realizado com sucesso!", isSucess: true });
        router.push("/");
      })
      .catch((err: any) => {
        console.log(err);
        Toast({ message: "Erro ao logar, verifique e o e-mail e a senha estão corretos !" });
      });
  };
  return <AuthContext.Provider value={{ register, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);