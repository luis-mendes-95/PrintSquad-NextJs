import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { serviceOrderData, serviceOrderRequest } from "@/schemas/serviceOrder.schema";
import { parseCookies } from "nookies";
import Toast from "@/components/toast";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface ServiceOrderProviderData {
  showAddInstrunctionModal: boolean;
  SetShowInstructionModal: () => void;
  showAddFileModal: boolean;
  SetShowFileModal: () => void;
  selectedOrderId: string;
  setSelectedOrderId: Dispatch<SetStateAction<string>>;
  createServiceOrder: (data: serviceOrderRequest) => Promise<{ success: boolean, serviceOrderId: string }>;
}

const ServiceOrderContext = createContext<ServiceOrderProviderData>({} as ServiceOrderProviderData);

const ServiceOrderProvider = ({ children }: Props) => {

  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [showAddInstrunctionModal, setShowInstructionModal] = useState<boolean>(false);
  const [showAddFileModal, setShowFileModal] = useState<boolean>(false);

  const SetShowInstructionModal = () => {
    window.scrollTo(0, 0);
    setShowInstructionModal((prevState)=> !prevState)
  }

  const SetShowFileModal = () => {
    window.scrollTo(0, 0);
    setShowFileModal((prevState)=> !prevState)
  }

  const router = useRouter();

  const createServiceOrder = async (data: serviceOrderRequest): Promise<{ success: boolean, serviceOrderId: string }> => {
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
        toast.success("Ordem de Serviço Cadastrada com Sucesso!", { autoClose: 1000 });
        return {
          success: true,
          serviceOrderId,
        };
      }
    } catch (error) {
      console.error(error);
      toast.error("Todos os campos precisam ser preenchidos, se preencheu, só tentar novamente.");
    }

    return {
      success: false,
      serviceOrderId: "",
    };
  };

  return (
    <ServiceOrderContext.Provider
      value={{
        selectedOrderId,
        setSelectedOrderId,
        createServiceOrder,
        SetShowInstructionModal,
        showAddInstrunctionModal,
        SetShowFileModal,
        showAddFileModal
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  );
};

export const useServiceOrder = (): ServiceOrderProviderData => useContext(ServiceOrderContext);

export default ServiceOrderProvider;
