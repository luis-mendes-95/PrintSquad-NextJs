import {  Dispatch,  ReactNode,  SetStateAction,  createContext,  useContext,  useEffect,  useState,} from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { serviceOrderRequest } from "@/schemas/serviceOrder.schema";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface ServiceOrderProviderData {

  //SERVICE ORDERS
  serviceOrders: any;
  SetServiceOrders: (data:any) => any;
  getAllServiceOrders: () => any;

  //FINANCIAL CONTROLS
  designerPayables: number;

  //INDIVIDUAL SERVICE ORDER
  selectedOrderId: string;
  setSelectedOrderId: Dispatch<SetStateAction<string>>;
  createServiceOrder: ( data: serviceOrderRequest  ) => Promise<{ success: boolean; serviceOrderId: string }>;

  //FILTER
  showCards: string;
  SetShowCards: (status: string) => void;

  //INSTRUCTIONS
  showAddInstrunctionModal: boolean;
  SetShowInstructionModal: () => void;

  //FILES
  showAddFileModal: boolean;
  SetShowFileModal: () => void;

  //MOCKUP
  showAddMockupModal: boolean;
  SetShowMockupModal: () => void;
  showMockupImgModal: boolean;
  SetShowMockupImgModal: () => void;

  //FILTER
  showFilterModal: boolean;
  SetShowFilterModal: () => void;

  //AUTHORIZE
  authorizePrinting: (    id: string,    client: string,    description: string  ) => Promise<void>;

  //PRINT
  sentToPrinting: (    id: string,    client: string,    description: string  ) => Promise<void>;

  //FINNISH
  finnishOrder: (    id: string,    client: string,    description: string  ) => Promise<void>;

  //ARCHIVE
  sentToArchive: (    id: string,    client: string,    description: string  ) => Promise<void>;

  showFinancesButton: boolean;
  setShowFinances: () => void;
}

const ServiceOrderContext = createContext<ServiceOrderProviderData>(
  {} as ServiceOrderProviderData
);

const ServiceOrderProvider = ({ children }: Props) => {

  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [showAddInstrunctionModal, setShowInstructionModal] = useState<boolean>(false);
  const [showAddFileModal, setShowFileModal] = useState<boolean>(false);
  const [showAddMockupModal, setShowMockupModal] = useState<boolean>(false);
  const [showMockupImgModal, setShowMockupImgModal] = useState<boolean>(false);

  const [serviceOrders, setServiceOrders] = useState([]);

  const [designerPayables, setDesignerPayables] = useState(0);

  const [showFinancesButton, setShowFinancesButton] = useState(false);

  const setShowFinances = () => {
    setShowFinancesButton((prevState) => !prevState);
  };



  const SetServiceOrders = (data: any) => {
    setServiceOrders(data)
    return data
  }

  useEffect(() => {
    getAllServiceOrders()
  }, [])

  const SetDesignerPayables = (serviceOrders: any) => {
    
    let orders = serviceOrders

    let total = 0

    console.log(serviceOrders)

    for (const order of orders) {
      console.log("eae")
      console.log(parseInt(order.cost));
      total += parseInt(order.cost)
    }

    setDesignerPayables(total)

  }
  

  const [showCards, setShowCards] = useState<string>("AGUARDANDO ARTE");

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const router = useRouter();

  const SetShowCards = (status: string) => {
    setShowCards(status);
  };

  const SetShowFilterModal = () => {
    setShowFilterModal((prevState) => !prevState);
    getAllServiceOrders();
    router.push("/");
  };

  const SetShowInstructionModal = () => {
    window.scrollTo(0, 0);
    setShowInstructionModal((prevState) => !prevState);
  };

  const SetShowFileModal = () => {
    window.scrollTo(0, 0);
    setShowFileModal((prevState) => !prevState);
  };

  const SetShowMockupModal = () => {
    window.scrollTo(0, 0);
    setShowMockupModal((prevState) => !prevState);
  };

  const SetShowMockupImgModal = () => {
    window.scrollTo(0, 0);
    setShowMockupImgModal((prevState) => !prevState);
  };

  const createServiceOrder = async (
    data: serviceOrderRequest
  ): Promise<{ success: boolean; serviceOrderId: string }> => {
    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await api.post("/serviceOrders", data, { headers });

      if (response.status === 201) {
        const serviceOrderId = response.data.id; // Assuming the response includes the ID of the created service order
        toast.success("Ordem de Serviço Cadastrada com Sucesso!", {
          autoClose: 1000,
        });
        getAllServiceOrders()
        return {
          success: true,
          serviceOrderId,
        };
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Todos os campos precisam ser preenchidos, se preencheu, só tentar novamente."
      );
    }

    return {
      success: false,
      serviceOrderId: "",
    };
  };

  const getAllServiceOrders = async ( ): Promise<void> => {

    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await api.get(`/serviceOrders/`, {
        headers,
      });

      if (response.status === 200) {
        SetServiceOrders(response.data)
      }
    } catch (error) {
      console.error("Erro ao puxar ordens de serviço:", error);
    }
  };

  const authorizePrinting = async (
    id: string,
    client: string,
    description: string
  ): Promise<void> => {
    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0"); // Obtém o dia atual com 2 dígitos (ex: 01, 02, 03)
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtém o mês atual com 2 dígitos (ex: 01, 02, 03). Lembre-se que o valor retornado pelo método getMonth() é baseado em zero, por isso é necessário adicionar 1.
      const year = date.getFullYear(); // Obtém o ano atual (ex: 2023)
      const hours = String(date.getHours()).padStart(2, "0"); // Obtém a hora atual com 2 dígitos (ex: 01, 02, 03)
      const minutes = String(date.getMinutes()).padStart(2, "0"); // Obtém os minutos atuais com 2 dígitos (ex: 01, 02, 03)

      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

      const body = {
        client,
        status: "APROVADA",
        description: `MOCKUP APROVADO EM: ${formattedDate} ||| ` + description,
      };

      const response = await api.patch(`/serviceOrders/${id}`, body, {
        headers,
      });

      if (response.status === 200) {
        getAllServiceOrders()
        toast.success("Impressão autorizada com sucesso!", { autoClose: 1000 });
        router.push(`/${id}`);
      } else {
        toast.error("Ocorreu um erro ao autorizar a impressão.");
      }
    } catch (error) {
      console.error("Erro ao autorizar a impressão:", error);
      toast.error("Ocorreu um erro ao autorizar a impressão.");
    }
  };

  const sentToPrinting = async (
    id: string,
    client: string,
    description: string
  ): Promise<void> => {
    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0"); // Obtém o dia atual com 2 dígitos (ex: 01, 02, 03)
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtém o mês atual com 2 dígitos (ex: 01, 02, 03). Lembre-se que o valor retornado pelo método getMonth() é baseado em zero, por isso é necessário adicionar 1.
      const year = date.getFullYear(); // Obtém o ano atual (ex: 2023)
      const hours = String(date.getHours()).padStart(2, "0"); // Obtém a hora atual com 2 dígitos (ex: 01, 02, 03)
      const minutes = String(date.getMinutes()).padStart(2, "0"); // Obtém os minutos atuais com 2 dígitos (ex: 01, 02, 03)

      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

      const body = {
        client,
        status: "EM PRODUÇÃO",
        description:
          `ENVIADO PARA IMPRESSÃO EM: ${formattedDate} ||| ` + description,
      };

      const response = await api.patch(`/serviceOrders/${id}`, body, {
        headers,
      });

      if (response.status === 200) {
        toast.success("Impressão autorizada com sucesso!", { autoClose: 1000 });
        getAllServiceOrders()
        router.push(`/`);
      } else {
        toast.error("Ocorreu um erro ao autorizar a impressão.");
      }
    } catch (error) {
      console.error("Erro ao autorizar a impressão:", error);
      toast.error("Ocorreu um erro ao autorizar a impressão.");
    }
  };

  const finnishOrder = async (
    id: string,
    client: string,
    description: string
  ): Promise<void> => {
    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0"); // Obtém o dia atual com 2 dígitos (ex: 01, 02, 03)
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtém o mês atual com 2 dígitos (ex: 01, 02, 03). Lembre-se que o valor retornado pelo método getMonth() é baseado em zero, por isso é necessário adicionar 1.
      const year = date.getFullYear(); // Obtém o ano atual (ex: 2023)
      const hours = String(date.getHours()).padStart(2, "0"); // Obtém a hora atual com 2 dígitos (ex: 01, 02, 03)
      const minutes = String(date.getMinutes()).padStart(2, "0"); // Obtém os minutos atuais com 2 dígitos (ex: 01, 02, 03)

      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

      const body = {
        client,
        status: "CONCLUÍDA",
        description:
          `PRODUÇÃO CONCLUÍDA EM: ${formattedDate} ||| ` + description,
      };

      const response = await api.patch(`/serviceOrders/${id}`, body, {
        headers,
      });

      if (response.status === 200) {
        toast.success("Parabéns! Produção concluída com sucesso!🚀🚀🚀", { autoClose: 1000 });
        getAllServiceOrders()
        router.push(`/`);
      } else {
        toast.error("Ocorreu um erro ao concluir a produção.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao concluir a produção.", error);
      toast.error("Ocorreu um erro ao concluir a produção.");
    }
  };

  const sentToArchive = async (
    id: string,
    client: string,
    description: string
  ): Promise<void> => {
    try {
      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0"); // Obtém o dia atual com 2 dígitos (ex: 01, 02, 03)
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtém o mês atual com 2 dígitos (ex: 01, 02, 03). Lembre-se que o valor retornado pelo método getMonth() é baseado em zero, por isso é necessário adicionar 1.
      const year = date.getFullYear(); // Obtém o ano atual (ex: 2023)
      const hours = String(date.getHours()).padStart(2, "0"); // Obtém a hora atual com 2 dígitos (ex: 01, 02, 03)
      const minutes = String(date.getMinutes()).padStart(2, "0"); // Obtém os minutos atuais com 2 dígitos (ex: 01, 02, 03)

      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

      const body = {
        client,
        status: "ARQUIVADA",
        description:
          `ORDEM DE SERVIÇO ARQUIVADA EM: ${formattedDate} ||| ` + description,
      };

      const response = await api.patch(`/serviceOrders/${id}`, body, {
        headers,
      });

      if (response.status === 200) {
        toast.success("Ordem de serviço arquivada!", { autoClose: 1000 });
        getAllServiceOrders()
        router.push(`/`);
      } else {
        toast.error("Ocorreu um erro ao arquivar a ordem.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao arquivar a ordem.", error);
      toast.error("Ocorreu um erro ao arquivar a ordem.");
    }
  };

  return (
    <ServiceOrderContext.Provider
      value={{
        selectedOrderId,
        setSelectedOrderId,
        createServiceOrder,
        authorizePrinting,
        SetShowInstructionModal,
        showAddInstrunctionModal,
        SetShowFileModal,
        showAddFileModal,
        SetShowMockupModal,
        showAddMockupModal,
        SetShowMockupImgModal,
        showMockupImgModal,
        SetShowCards,
        showCards,
        showFilterModal,
        SetShowFilterModal,
        sentToPrinting,
        finnishOrder,
        sentToArchive,
        serviceOrders,
        SetServiceOrders,
        getAllServiceOrders,
        designerPayables,
        setShowFinances,
        showFinancesButton
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  );
};

export const useServiceOrder = (): ServiceOrderProviderData =>
  useContext(ServiceOrderContext);

export default ServiceOrderProvider;
