import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginForm from "@/components/loginForm";
import { LoginPageBase } from "@/styles/login";
import { NextPage } from "next";
import { GoogleFonts } from "next-google-fonts";

const Login: NextPage = () => {
  return (
    <LoginPageBase>
<GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
    <Header/>
      <main>
        <LoginForm />
      </main>
      <Footer/>
    </LoginPageBase>
  );
};

export default Login;
