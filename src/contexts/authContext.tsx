import Toast from "@/components/toast";
import { LoggedInUser, LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
  logout: () => void;
  user: LoggedInUser | null;
  showLogoutButton: boolean;
  setShowLogout: () => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {

  const [user, setUser] = useState<LoggedInUser | null>(null)
  const [showLogoutButton, setShowLogoutButton] = useState(false)

  const setShowLogout = () => {
    setShowLogoutButton((prevState) => !prevState)
  }

  const router = useRouter();

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        toast.success("usuário cadastrado com sucesso!", {
          autoClose: 1000
        });
        router.push("/loginPage");
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Erro ao criar usuário, tente utilizar outro e-mail!", {
          autoClose: 1000
        });
      });
  };

  const login = (loginData: LoginData) => {

    api.post("/login", loginData).then((response: any) => {

        setCookie(null, "printsquad.token", response.data.token, {
          maxAge: 60 * 99999,
          path: "/"
        });

        setCookie(null, "printsquad.userName", response.data.name, {
          maxAge: 60 * 99999,
          path: "/"
        });

        setCookie(null, "printsquad.phone", response.data.phone, {
          maxAge: 60 * 99999,
          path: "/"
        });

        setCookie(null, "printsquad.email", response.data.email, {
          maxAge: 60 * 99999,
          path: "/"
        });

        setUser(response.data.user)

      })
      .then(() => {

        toast.success("Login realizado com sucesso!", {
          autoClose: 1000
        });

        router.push("/");

      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Erro ao logar, verifique e o e-mail e a senha estão corretos.", {
          autoClose: 1000
        });
      });
  };

  const logout = () => {

    document.cookie = "printsquad.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "printsquad.userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "printsquad.phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "printsquad.email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setUser(null)
    setShowLogout()

    toast.success("Logout realizado com sucesso!", {
      autoClose: 1000
    });
    
    router.push('/');
  }
  
  return <AuthContext.Provider value={{ register, login, logout, showLogoutButton, user, setShowLogout }}>{children}</AuthContext.Provider>;

};

export const useAuth = () => useContext(AuthContext);