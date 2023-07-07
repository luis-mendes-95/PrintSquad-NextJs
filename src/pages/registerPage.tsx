import Footer from "@/components/footer";
import Header from "@/components/header";
import RegisterForm from "@/components/_registerForm";
import { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
};

export default Register;
