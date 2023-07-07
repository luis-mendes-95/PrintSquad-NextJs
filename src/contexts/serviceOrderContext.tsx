import {  Dispatch,  ReactNode,  SetStateAction,  createContext,  useContext,  useState,} from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import {  serviceOrderData,  serviceOrderRequest,} from "@/schemas/serviceOrder.schema";
import { parseCookies } from "nookies";
import Toast from "@/components/toast";

interface Props {
  children: ReactNode;
}

interface ServiceOrderProviderData {  
  selectedOrderId: string;
  setSelectedOrderId: (serviceOrderId: string) => void;
  createServiceOrder: (data: serviceOrderRequest) => void;
}

const ServiceOrderContext = createContext<ServiceOrderProviderData>( {} as ServiceOrderProviderData);

const ServiceOrderProvider = ({ children }: Props) => {

  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const router = useRouter();

  const createServiceOrder = (data: serviceOrderRequest) => {
    console.log(data)
  }

  const cookies = parseCookies();
  if (cookies["printsquad.token"]) {    api.defaults.headers.common.authorization = `Bearer ${cookies["printsquad.token"]}`;  }

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

export const useServiceOrder = () => useContext(ServiceOrderContext);

export default ServiceOrderProvider;
