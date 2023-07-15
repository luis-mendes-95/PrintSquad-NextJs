import Toast from "@/components/toast";
import { LoggedInUser, LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
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
  checkLoggedIn: () => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {

  const [user, setUser] = useState<LoggedInUser | null>(null)
  const [showLogoutButton, setShowLogoutButton] = useState(false)

  const setShowLogout = () => {
    setShowLogoutButton((prevState) => !prevState)
  }

  const checkLoggedIn = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Faça a chamada da API usando o token no header
        const response = await api.get("/users");

        // Trate a resposta da chamada da API conforme necessário
        if (response.status === 200) {
          const savedUser: LoggedInUser | any = cookies["printsquad.user"];

          const newUser: LoggedInUser | any = {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
          }

          setUser(newUser)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          maxAge: 60 * 9999999,
          path: "/"
        });

        setCookie(null, "printsquad.user", response.data.user, {
          maxAge: 60 * 9999999,
          path: "/"
        });

        setCookie(null, "printsquad.userName", response.data.name, {
          maxAge: 60 * 9999999,
          path: "/"
        });

        setCookie(null, "printsquad.phone", response.data.phone, {
          maxAge: 60 * 9999999,
          path: "/"
        });

        setCookie(null, "printsquad.email", response.data.email, {
          maxAge: 60 * 9999999,
          path: "/"
        });

        setCookie(null, "printsquad.userId", response.data.user.id, {
          maxAge: 60 * 9999999,
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
  
  return <AuthContext.Provider value={{ register, login, logout, showLogoutButton, user, setShowLogout, checkLoggedIn }}>{children}</AuthContext.Provider>;

};

export const useAuth = () => useContext(AuthContext);