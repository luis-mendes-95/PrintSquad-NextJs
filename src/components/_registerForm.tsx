import { UserData, userSchema } from "@/schemas/user.schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const { register: registerUser } = useAuth();

  const onFormSubmit = (formData: UserData) => {
    registerUser(formData);
  };

  return (
    <div>
      <p>Fazer cadastro</p>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <div>
            <input
              type="text"
              placeholder="Your name here"
              {...register("name")}
            />
          </div>
        </div>
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
          <label htmlFor="phone">Phone</label>
          <div>
            <input
              type="text"
              placeholder="Your phone here"
              {...register("phone")}
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
          <button type="submit">Cadastrar</button>
        </div>
        <Link href="/login">Ir para o login</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
