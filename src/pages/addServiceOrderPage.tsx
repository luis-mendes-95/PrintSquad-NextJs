import Footer from "@/components/footer";
import Header from "@/components/header";
import RegisterForm from "@/components/_registerForm";
import { NextPage } from "next";
import {AddServiceOrderPageBase} from "../styles/addServiceOrderPage"
import ServiceOrderForm from "@/components/serviceOrderForm";

const Register: NextPage = () => {
  return (
    <AddServiceOrderPageBase>
      <Header />
      <main>
        <ServiceOrderForm/>
      </main>
      <Footer />
    </AddServiceOrderPageBase>
  );
};

export default Register;
