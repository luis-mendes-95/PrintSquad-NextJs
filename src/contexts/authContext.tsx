import { LoggedInUser, LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface AuthProviderData {
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
  logout: () => void;
  user: LoggedInUser | null;
  showLogoutButton: boolean;
  setShowLogout: () => void;
  checkLoggedIn: () => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const setShowLogout = () => {
    setShowLogoutButton((prevState) => !prevState);
  };

  const checkLoggedIn = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];
      const user = cookies["printsquad.user"];

      if (token && user) {
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
          };

          setUser(newUser);
        }
      }
    } catch (error) {
      console.log(error);
      router.push("/about")
    }

  };

  const router = useRouter();

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        toast.success("Usuário cadastrado com sucesso!", {
          autoClose: 1000,
        });
        router.push("/loginPage");
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Erro ao criar usuário, tente utilizar outro e-mail!", {
          autoClose: 1000,
        });
      });
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response: any) => {
        setCookie(null, "printsquad.token", response.data.token, {
          maxAge: 60 * 9999999,
          path: "/",
        });

        setCookie(null, "printsquad.user", response.data.user, {
          maxAge: 60 * 9999999,
          path: "/",
        });

        setCookie(null, "printsquad.userName", response.data.user.name, {
          maxAge: 60 * 9999999,
          path: "/",
        });

        setCookie(null, "printsquad.phone", response.data.user.phone, {
          maxAge: 60 * 9999999,
          path: "/",
        });

        setCookie(null, "printsquad.email", response.data.user.email, {
          maxAge: 60 * 9999999,
          path: "/",
        });

        setCookie(null, "printsquad.userId", response.data.user.id, {
          maxAge: 60 * 9999999,
          path: "/",
        });

        setUser(response.data.user);
      })
      .then(() => {
        toast.success("Login realizado com sucesso!", {
          autoClose: 1000,
        });
        router.push("/");
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(
          "Erro ao logar, verifique o e-mail e a senha estão corretos.",
          {
            autoClose: 1000,
          }
        );
      });
  };

  const logout = () => {
    destroyCookie(null, "printsquad.token", { path: "/" });
    destroyCookie(null, "printsquad.userName", { path: "/" });
    destroyCookie(null, "printsquad.phone", { path: "/" });
    destroyCookie(null, "printsquad.email", { path: "/" });
    destroyCookie(null, "printsquad.user", { path: "/" });

    setUser(null);
    setShowLogout();

    toast.success("Logout realizado com sucesso!", {
      autoClose: 1000,
    });

    router.push("/about");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        showLogoutButton,
        user,
        setShowLogout,
        checkLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
