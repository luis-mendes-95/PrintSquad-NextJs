import Footer from "@/components/footer";
import Header from "@/components/header";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import { GetServerSideProps, NextPage } from "next";
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
import { useEffect } from "react";
import FinancesModal from "@/components/financesModal";

interface ServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrder: NextPage<ServiceOrderProps> = ({
  serviceOrder,
}: ServiceOrderProps) => {
  const router = useRouter();
  const { showFinancesButton} = useServiceOrder()

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
    serviceOrders,
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
          <li key={`card-${serviceOrder.id}`} className="liCardServiceOrder">
            <CardPage serviceOrder={serviceOrder} />
          </li>

          <li
            key={`dashboard-${serviceOrder.id}`}
            className="liDashServiceOrder"
          >
            <ServiceOrderDashboard serviceOrder={serviceOrder} />
          </li>

          <li
            key={`files-${serviceOrder.id}`}
            className="liDashServiceOrderFiles"
          >
            <ServiceOrderDashFiles serviceOrder={serviceOrder} />
          </li>

          {serviceOrder.status === "AGUARDANDO ARTE" && (
            <button
              className="ButtonSendUpdateMockup"
              onClick={SetShowMockupModal}
              style={{fontSize:"15pt"}}
            >
              ENVIAR / SUBSTITUIR MOCKUP
            </button>
          )}

          {serviceOrder.status === "AGUARDANDO ARTE" && (
            <button
              className="ButtonAuthorize"
              onClick={handleSentToPrinting}
              style={{ backgroundColor: "brown", fontSize:"15pt", height: "50px"}}
              
            >
              ENVIADOS PARA IMPRESSÃO
            </button>
          )}

          {serviceOrder.status === "AGUARDANDO CLIENTE" && (
            <button
              className="ButtonAuthorize"
              onClick={handleAuthorizePrinting}
              style={{fontSize:"25pt"}}
            >
              AUTORIZAR IMPRESSÃO
            </button>
          )}

          {serviceOrder.status === "APROVADA" && (
            <button
              className="ButtonAuthorize"
              onClick={handleSentToPrinting}
              style={{ backgroundColor: "brown", height: "75px" }}
            >
              ENVIADOS PARA IMPRESSÃO
            </button>
          )}

          {serviceOrder.status === "EM PRODUÇÃO" && (
            <button
              className="ButtonAuthorize"
              onClick={handleFinnish}
              style={{ backgroundColor: "green", height: "75px", fontSize:"20pt" }}
            >
              CONCLUIR PRODUÇÃO
            </button>
          )}

          {serviceOrder.status === "CONCLUÍDA" && (
            <button
              className="ButtonAuthorize"
              onClick={handleArchive}
              style={{ backgroundColor: "brown", height: "75px", fontSize:"20pt" }}
            >
              ARQUIVAR
            </button>
          )}
        </ul>
      </main>
      <Footer />
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
            style={{width: "100%",
              margin: "30px 0px 0px",
              maxHeight: "70%",
            }}
          />
        </Modal>
      )}
      {showFilterModal && <FilterModal />}
      {showFinancesButton && <FinancesModal serviceOrders={serviceOrders}/>}
    </ServiceOrderPageBase>
  );
};

export const getServerSideProps: GetServerSideProps<ServiceOrderProps> = async (
  ctx
) => {
  const id = ctx.params!.id;

  try {
    const response = await api.get<serviceOrderData>(
      `/serviceOrders/${id}`
    );
    const serviceOrder = response.data;

    return {
      props: {
        serviceOrder,
      },
    };
  } catch (error) {
    console.error("Erro ao obter a ordem de serviço:", error);

    return {
      notFound: true,
    };
  }
};

export default ServiceOrder;
