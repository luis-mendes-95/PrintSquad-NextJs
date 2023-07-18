import { useServiceOrder } from "@/contexts/serviceOrderContext";
import Modal from "./modal";

const FilterModal = () => {
  const { SetShowFilterModal, SetShowCards, showCards, serviceOrders } =
    useServiceOrder();

  const allLength: number = serviceOrders.filter((os: any) => {
    if(os.status !== "ARQUIVADA" && os.status !== "CONCLUÍDA"){
      return os;
    }
  }).length;

  const waitingDesigner: number = serviceOrders.filter((os: any) => {
    if (os.status === "AGUARDANDO ARTE") {
      return os;
    }
  }).length;

  const waitingClient: number = serviceOrders.filter((os: any) => {
    if (os.status === "AGUARDANDO CLIENTE") {
      return os;
    }
  }).length;

  const aprooved: number = serviceOrders.filter((os: any) => {
    if (os.status === "APROVADA") {
      return os;
    }
  }).length;

  const inProduction: number = serviceOrders.filter((os: any) => {
    if (os.status === "EM PRODUÇÃO") {
      return os;
    }
  }).length;

  const finnished: number = serviceOrders.filter((os: any) => {
    if (os.status === "CONCLUÍDA") {
      return os;
    }
  }).length;

  const archived: number = serviceOrders.filter((os: any) => {
    if (os.status === "ARQUIVADA") {
      return os;
    }
  }).length;

  return (
    <Modal>
      <div className="divBackgroundFilter">
        <h2 style={{ fontSize: "8pt" }}>FILTRAR POR STATUS:</h2>
        <button
          onClick={() => {
            SetShowCards("TODOS");
          }}
          style={
            showCards === "TODOS"
              ? {
                  backgroundColor: "green",
                  color: "white",
                  textShadow: "1pt 1pt 2pt black",
                }
              : {}
          }
        >
          {" "}
          Todos = {allLength}{" "}
        </button>
        <button
          onClick={() => {
            SetShowCards("AGUARDANDO ARTE");
          }}
          style={
            showCards === "AGUARDANDO ARTE"
              ? {
                  backgroundColor: "orange",
                  color: "white",
                  textShadow: "1pt 1pt 2pt black",
                }
              : {}
          }
        >
          Aguardando Arte = {waitingDesigner}
        </button>
        <button
          onClick={() => {
            SetShowCards("AGUARDANDO CLIENTE");
          }}
          style={
            showCards === "AGUARDANDO CLIENTE"
              ? {
                  backgroundColor: "cyan",
                  color: "white",
                  textShadow: "1pt 1pt 2pt black",
                }
              : {}
          }
        >
          Aguardando Cliente = {waitingClient}
        </button>
        <button
          onClick={() => {
            SetShowCards("APROVADA");
          }}
          style={
            showCards === "APROVADA"
              ? {
                  backgroundColor: "green",
                  color: "white",
                  textShadow: "1pt 1pt 2pt black",
                }
              : {}
          }
        >
          Aprovados = {aprooved}
        </button>
        <button
          onClick={() => {
            SetShowCards("EM PRODUÇÃO");
          }}
          style={
            showCards === "EM PRODUÇÃO"
              ? {
                  backgroundColor: "brown",
                  color: "white",
                  textShadow: "1pt 1pt 2pt black",
                }
              : {}
          }
        >
          Em produção = {inProduction}
        </button>
        <button
          onClick={() => {
            SetShowCards("CONCLUÍDA");
          }}
          style={
            showCards === "CONCLUÍDA"
              ? {
                  backgroundColor: "green",
                  color: "white",
                  textShadow: "1pt 1pt 2pt black",
                }
              : {}
          }
        >
          Concluídos = {finnished}
        </button>
        <button
          onClick={() => {
            SetShowCards("ARQUIVADA");
          }}
          style={
            showCards === "ARQUIVADA"
              ? {
                  backgroundColor: "lightgray",
                  color: "white",
                  textShadow: "1pt 1pt 2pt black",
                }
              : {}
          }
        >
          Arquivados = {archived}
        </button>
      </div>
      <div style={{ width: "100%" }}>
        <button
          onClick={SetShowFilterModal}
          style={{
            width: "100%",
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Fechar Filtro
        </button>
      </div>
    </Modal>
  );
};

export default FilterModal;
