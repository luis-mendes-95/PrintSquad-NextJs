import { LoginData, loginSchema } from "@/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (formData: LoginData) => {
    setLoading(true);
    login(formData);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  };

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="email">E-mail</label>
          <div>
            <input
              type="email"
              placeholder="example@.com"
              {...register("email")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              placeholder="Sua senha"
              {...register("password")}
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={loading}>Entrar</button>
        </div>

        {/* <Link href="/register">Não é cadastrado ainda? Clique aqui</Link> */}
      </form>
    </div>
  );
};

export default LoginForm;
