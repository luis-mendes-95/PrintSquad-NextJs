import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import CardServiceOrder from "../components/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DivHomeBase } from "../styles/home";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseCookies } from "nookies";

interface HomeProps {
  serviceOrders: serviceOrderData[];
}

const Home: NextPage<HomeProps> = ({ serviceOrders }) => {

  const router = useRouter();

  const { user, checkLoggedIn } = useAuth();

  useEffect(() => {

    checkLoggedIn()

  }, [])
  

  return (
    <DivHomeBase>
      <Header />
      <main>
        {user ? (
          <ul className="serviceOrderCards">
            {serviceOrders.length === 0 && (
              <div className="divNoOrders">Você não possui nenhuma ordem de serviço</div>
            )}
            {serviceOrders.map((individualServiceOrder) => {
              return (
                <li key={individualServiceOrder.id}>
                  <CardServiceOrder serviceOrder={individualServiceOrder} />
                </li>
              );
            })}
          </ul>
        ) : (
          <section className="sectionHomePageVisitor" style={{backgroundColor:"black", height:"100vh"}}>sectionHomePageVisitor</section>
        )}
      </main>
      <Footer />
    </DivHomeBase>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { "printsquad.token": token } = parseCookies(context);

  let serviceOrders: serviceOrderData[] = [];

  if (token) {
    try {
      const response = await api.get<serviceOrderData[]>("/serviceOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      serviceOrders = response.data;
    } catch (error) {
      console.error("Erro ao obter as ordens de serviço:", error);
      // Aqui você pode adicionar o tratamento de erro adequado, como redirecionar para uma página de erro ou exibir uma mensagem para o usuário.
    }
  }

  return {
    props: { serviceOrders },
  };
};

export default Home;
