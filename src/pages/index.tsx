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
    checkLoggedIn()
    
    if (!user) {
      router.push("/about");
    }
  }, [user, router]);



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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2YWlsdG9uamVzdXM1QGhvdG1haWwuY29tIiwiaWF0IjoxNjg5Mzc0OTU1LCJleHAiOjE2ODkzNzg1NTUsInN1YiI6IjJjOWQxNjQ1LWEyY2MtNDc0Ny1iMzQ5LTQ4ZDcyNDkxMDM5YyJ9.kvwSUo4CutLO8HQEy6DLIjkteCgKCsY6X6n-rZc8JNU";

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
