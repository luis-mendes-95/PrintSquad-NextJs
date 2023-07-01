import { UserData, userSchema } from "@/schemas/user.schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";

const RegisterForm = () => {

  const { register, handleSubmit } = useForm<UserData>({resolver: zodResolver(userSchema)});

  const { register: registerUser } = useAuth();

  const onFormSubmit = (formData: UserData) => {
    registerUser(formData);
    console.log(formData);
  };

  return (
    <div className="user-form-container">
      <p className="text-4xl mt-6 font-semibold">Fazer cadastro</p>

      <form className="space-y-6 w-4/5" onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="name" className="user-form-label">
            Name
          </label>

          <div className="mt-2">
            <input
              type="text"
              placeholder="Your name here"
              className="user-form-input"
              {...register("name")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="user-form-label">
            E-mail
          </label>

          <div className="mt-2">
            <input
              type="email"
              placeholder="example@.com"
              className="user-form-input"
              {...register("email")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="user-form-label">
            Phone
          </label>

          <div className="mt-2">
            <input
              type="text"
              placeholder="Your phone here"
              className="user-form-input"
              {...register("phone")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="user-form-label">
            Password
          </label>

          <div className="mt-2">
            <input
              type="password"
              placeholder="Sua senha"
              className="user-form-input"
              {...register("password")}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="user-form-button">
            Cadastrar
          </button>
        </div>

        <Link href={"/login"} className="user-form-link">
          Ir para o login
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
