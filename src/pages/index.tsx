import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
import CardServiceOrder from "../components/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface HomeProps {
  serviceOrders: serviceOrderData[];
}

const Home: NextPage<HomeProps> = ({ serviceOrders }) => {
  return (
    <>
      <Header />
      <main>
        <ul>
          {serviceOrders.map((individualServiceOrder) => {
            return (
              <li key={individualServiceOrder.id}>
                <CardServiceOrder serviceOrder={individualServiceOrder} />
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2YWlsdG9uamVzdXM1QGhvdG1haWwuY29tIiwiaWF0IjoxNjg4MTAwMzA0LCJleHAiOjE2ODgxMDM5MDQsInN1YiI6IjExZDYxZWMwLWI0MWYtNGY5Yy04YWMzLTVkNTlhZjUyMGY2OCJ9.HUSzcGNFnP2Yx-dOoTKsN0hwobIDY-aOAo5zKucDrUc";

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
