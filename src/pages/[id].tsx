import Footer from "@/components/footer";
import Header from "@/components/header";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { ServiceOrderPageBase } from "../styles/serviceOrderPage";
import CardServiceOrder from "@/components/card";
import CardPage from "@/components/cardPage";
import ServiceOrderDashboard from "@/components/ServiceOrderDashboard";
import ServiceOrderDashFiles from "@/components/ServiceOrderDashFiles";

interface ServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrder: NextPage<ServiceOrderProps> = ({
  serviceOrder,
}: ServiceOrderProps) => {
  const router = useRouter();

  return (
    <ServiceOrderPageBase>
      <Header />
      <main>
        <ul className="serviceOrderCards">
          <li key={serviceOrder.id} className="liCardServiceOrder">
            <CardPage serviceOrder={serviceOrder} />
          </li>

          <li
            key={serviceOrder.id}
            className="liDashServiceOrder"
            style={{ maxWidth: "93%", minWidth: "42%" }}
          >
            <ServiceOrderDashboard serviceOrder={serviceOrder} />
          </li>

          <li
            key={serviceOrder.id}
            className="liDashServiceOrderFiles"
            style={{ maxWidth: "100%", minWidth: "30%" }}
          >
            <ServiceOrderDashFiles serviceOrder={serviceOrder} />
          </li>

          <button className="ButtonSendUpdateMockup">
            ENVIAR / SUBSTITUIR MOCKUP
          </button>
          <button className="ButtonAuthorize">AUTORIZAR PRODUÇÃO</button>
        </ul>
      </main>
      <Footer />
    </ServiceOrderPageBase>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "847b5e73-1215-4287-8246-8cd6415f952e" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ServiceOrderProps> = async (
  ctx
) => {
  const id = ctx.params!.id;
  const response = await api.get<serviceOrderData>(`/serviceOrders/${id}`);

  return { props: { serviceOrder: response.data }, revalidate: 60 };
};

export default ServiceOrder;
