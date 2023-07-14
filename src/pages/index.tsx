import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import CardServiceOrder from "../components/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {DivHomeBase} from "../styles/home"
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface HomeProps {
  serviceOrders: serviceOrderData[];
}

const Home: NextPage<HomeProps> = ({ serviceOrders }) => {

  const router = useRouter();

  const { user, checkLoggedIn } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/about");
    }
  }, [user, router]);

  checkLoggedIn()

  return (
    <DivHomeBase>
      <Header />
      <main>
        {
          user &&
            <ul className="serviceOrderCards">
            {serviceOrders.length === 0 && <div className="divNoOrders">Você não possui nenhuma ordem de serviço</div>}
            {serviceOrders.map((individualServiceOrder) => {
              return (
                <li key={individualServiceOrder.id}>
                  <CardServiceOrder serviceOrder={individualServiceOrder} />
                </li>
              );
            })}
          </ul>
        }

        {
          !user &&
        <section className="sectionHomePageVisitor">
          sectionHomePageVisitor
        </section>
        }

      </main>
      <Footer />

    </DivHomeBase>
  );
};

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2YWlsdG9uamVzdXM1QGhvdG1haWwuY29tIiwiaWF0IjoxNjg5MzYzNjE4LCJleHAiOjE2ODkzNjcyMTgsInN1YiI6IjExZDYxZWMwLWI0MWYtNGY5Yy04YWMzLTVkNTlhZjUyMGY2OCJ9.jYB7cRaS-9ji7-xrxh_AkzNthbRBB_kzaO3hp5f130k";

  const response = await api.get<serviceOrderData[]>("/serviceOrders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: { serviceOrders: response.data },
  };
};

export default Home;
