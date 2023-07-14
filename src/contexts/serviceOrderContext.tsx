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
  selectedOrderId: string;
  setSelectedOrderId: Dispatch<SetStateAction<string>>;
  createServiceOrder: (data: serviceOrderRequest) => void;
}

const ServiceOrderContext = createContext<ServiceOrderProviderData>({} as ServiceOrderProviderData);

const ServiceOrderProvider = ({ children }: Props) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const router = useRouter();

  const createServiceOrder = async (data: serviceOrderRequest) => {

    try {

      const cookies = parseCookies();
      const token = cookies["printsquad.token"];

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await api.post("/serviceOrders", data, { headers });

      if (response.status === 201) {
        toast.success("Ordem de Serviço Cadastrada com Sucesso!", {autoClose:1000})
        setTimeout(() => {
          return "upload"
        }, 1000);
      }

    } catch (error) {
      console.error(error);
      toast.error("Todos os campos precisam ser preenchidos, se preencheu, só tentar novamente.")
    }

  };

  return (
    <ServiceOrderContext.Provider
      value={{
        selectedOrderId,
        setSelectedOrderId,
        createServiceOrder,
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  );
};

export const useServiceOrder = (): ServiceOrderProviderData => useContext(ServiceOrderContext);

export default ServiceOrderProvider;
