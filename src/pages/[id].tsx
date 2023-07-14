import Footer from "@/components/footer";
import Header from "@/components/header";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { ServiceOrderPageBase } from "../styles/serviceOrderPage";
import CardServiceOrder from "@/components/card";
import CardPage from "@/components/cardPage";
import ServiceOrderDashboard from "@/components/ServiceOrderDashboard";
import ServiceOrderDashFiles from "@/components/ServiceOrderDashFiles";
import AddInstructionFormModal from "@/components/addInstructionFormModal";
import { useServiceOrder } from "@/contexts/serviceOrderContext";

interface ServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrder: NextPage<ServiceOrderProps> = ({  serviceOrder,}: ServiceOrderProps) => {

  const router = useRouter();
  const { SetShowInstructionModal, showAddInstrunctionModal } = useServiceOrder()

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
          <button className="ButtonAuthorize">AUTORIZAR IMPRESSÃO</button>
        </ul>
      </main>
      <Footer />
      {showAddInstrunctionModal&& <AddInstructionFormModal serviceOrder={serviceOrder}/>}
      
    </ServiceOrderPageBase>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Faça uma chamada à API para obter a lista de IDs disponíveis
    const response = await api.get("/serviceOrders");

    // Mapeie os dados para obter um array de objetos contendo os parâmetros dos caminhos
    const paths = response.data.map((order: serviceOrderData) => ({
      params: { id: order.id },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Erro ao obter os caminhos estáticos:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};


export const getStaticProps: GetStaticProps<ServiceOrderProps> = async (  ctx) => {
  const id = ctx.params!.id;
  const response = await api.get<serviceOrderData>(`/serviceOrders/${id}`);

  return { props: { serviceOrder: response.data }, revalidate: 60 };
};

export default ServiceOrder;
