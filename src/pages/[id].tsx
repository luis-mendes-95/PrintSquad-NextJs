import Footer from "@/components/footer";
import Header from "@/components/header";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { ServiceOrderPageBase } from "../styles/serviceOrderPage";
import CardServiceOrder from "@/components/card";
import CardPage from "@/components/cardPage";
import ServiceOrderDashboard from "@/components/ServiceOrderDashboard";
import ServiceOrderDashFiles from "@/components/ServiceOrderDashFiles";
import AddInstructionFormModal from "@/components/addInstructionFormModal";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import AddFileFormModal from "@/components/addFileFormModal";
import AddOrChangeMockupFormModal from "@/components/AddOrChangeMockupFormModal";
import Modal from "@/components/modal";
import FilterModal from "@/components/filterModal";

interface ServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrder: NextPage<ServiceOrderProps> = ({  serviceOrder,}: ServiceOrderProps) => {

  const router = useRouter();

  const {
    SetShowInstructionModal,
    showAddInstrunctionModal,
    SetShowFileModal,
    showAddFileModal,
    SetShowMockupModal,
    showAddMockupModal,
    SetShowMockupImgModal,
    showMockupImgModal,
    authorizePrinting,
    showFilterModal,
    sentToPrinting,
    finnishOrder,
    sentToArchive,
    SetServiceOrders,
    serviceOrders
  } = useServiceOrder();

  const handleAuthorizePrinting = () => {
    authorizePrinting(
      serviceOrder.id,
      serviceOrder.client,
      serviceOrder.description
    );
  };

  const handleSentToPrinting = () => {
    sentToPrinting(
      serviceOrder.id,
      serviceOrder.client,
      serviceOrder.description
    );
  };

  const handleFinnish = () => {
    finnishOrder(
      serviceOrder.id,
      serviceOrder.client,
      serviceOrder.description
    );
  };

  const handleArchive = () => {
    sentToArchive(
      serviceOrder.id,
      serviceOrder.client,
      serviceOrder.description
    );
  };

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

          {serviceOrder.status === "AGUARDANDO ARTE" && (
            <button
              className="ButtonSendUpdateMockup"
              onClick={SetShowMockupModal}
            >
              ENVIAR / SUBSTITUIR MOCKUP
            </button>
          )}

          {serviceOrder.status === "AGUARDANDO ARTE" && (
            <button
              className="ButtonAuthorize"
              onClick={handleSentToPrinting}
              style={{ backgroundColor: "brown" }}
            >
              ENVIADOS PARA IMPRESSÃO
            </button>
          )}
          

          {serviceOrder.status === "AGUARDANDO CLIENTE" && (
            <button
              className="ButtonAuthorize"
              onClick={handleAuthorizePrinting}
            >
              AUTORIZAR IMPRESSÃO
            </button>
          )}

          {serviceOrder.status === "APROVADA" && (
            <button
              className="ButtonAuthorize"
              onClick={handleSentToPrinting}
              style={{ backgroundColor: "brown" }}
            >
              ENVIADOS PARA IMPRESSÃO
            </button>
          )}

          {serviceOrder.status === "EM PRODUÇÃO" && (
            <button
              className="ButtonAuthorize"
              onClick={handleFinnish}
              style={{ backgroundColor: "green" }}
            >
              CONCLUIR PRODUÇÃO
            </button>
          )}

          {serviceOrder.status === "CONCLUÍDA" && (
            <button
              className="ButtonAuthorize"
              onClick={handleArchive}
              style={{ backgroundColor: "brown" }}
            >
              ARQUIVAR
            </button>
          )}
        </ul>
      </main>
      <Footer/>
      {showAddInstrunctionModal && (
        <AddInstructionFormModal serviceOrder={serviceOrder} />
      )}
      {showAddFileModal && <AddFileFormModal serviceOrder={serviceOrder} />}
      {showAddMockupModal && (
        <AddOrChangeMockupFormModal serviceOrder={serviceOrder} />
      )}
      {showMockupImgModal && (
        <Modal>
          <div>
            <button
              onClick={SetShowMockupImgModal}
              style={{ margin: "20px 10px" }}
            >
              X
            </button>
            <button
              onClick={() => {
                window.open(serviceOrder.mockupImg, "_blank");
              }}
              style={{ margin: "20px 10px" }}
            >
              Ver Tela Cheia
            </button>
          </div>
          <img
            src={serviceOrder.mockupImg}
            style={{
              width: "100%",
              transform: "scale(1.3)",
              margin: "30px 0 0 0",
            }}
          />
        </Modal>
      )}
      {showFilterModal && <FilterModal />}
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

export const getStaticProps: GetStaticProps<ServiceOrderProps> = async (  ctx  ) => {

  const id = ctx.params!.id;

  const response = await api.get<serviceOrderData>(`/serviceOrders/${id}`);

  return { props: { serviceOrder: response.data }, revalidate: 60 };

};

export default ServiceOrder;
