import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import {
  serviceOrderData,
  serviceOrderRequest,
} from "@/schemas/serviceOrder.schema";
import { parseCookies } from "nookies";
import Toast from "@/components/toast";

interface Props {
  children: ReactNode;
}

interface ServiceOrderProviderData {
  selectedOrderId: string;
  setSelectedOrderId: (serviceOrderId: string) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  serviceOrderInfo: serviceOrderRequest;
  setServiceOrderInfo: Dispatch<SetStateAction<serviceOrderRequest>>;
  mockupImage: File | null;
  files: File | null;
  setCoverImage: Dispatch<SetStateAction<File | null>>;

  setServiceOrder: Dispatch<SetStateAction<File | null>>;
  uploadServiceOrderFiles: (
    serviceOrderId: string,
    files: File,
    mockupImage: File
  ) => void;
}

const ServiceOrderContext = createContext<ServiceOrderProviderData>(
  {} as ServiceOrderProviderData
);

const ServiceOrderProvider = ({ children }: Props) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const cookies = parseCookies();

  if (cookies["printsquad.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["printsquad.token"]}`;
  }
  const [serviceOrderInfo, setServiceOrderInfo] = useState({
    files: "",
    mockupImg: "",
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const [mockupImage, setMockupImage] = useState<File | null>(null);
  const [files, setFile] = useState<File | null>(null);

  const uploadFiles = async (    serviceOrderId: string,    files: File,    mockupImage: File  ) => {

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const fd = new FormData();

    console.log(mockupImage)

    if (mockupImage.name.includes("jpg") || mockupImage.name.includes("png")) {
      fd.append("mockupImage", mockupImage);
      fd.append("files", files);

      const status = await api
        .patch(`serviceOrders/upload/${serviceOrderId}`, fd, config)
        .then((res) => res.status);
      return { status };
    }
    return { status: 400 };
  };

  const uploadServiceOrderFiles = async (    serviceOrderId: string,    files: File,    mockupImage: File  ) => {

    const response = await uploadFiles(serviceOrderId, files!, mockupImage!);

    if (response.status === 200) {
      Toast({ message: "Arquivo enviado com sucesso !", isSucess: true });
    }
    
  };

  return (
    <ServiceOrderContext.Provider
      value={{
        page,
        setPage,
        serviceOrderInfo,
        setServiceOrderInfo,
        uploadServiceOrderFiles,
        mockupImage,
        files,
        setCoverImage: () => {}, // Adicione esta linha
        setServiceOrder: () => {}, // Adicione esta linha
        selectedOrderId,
        setSelectedOrderId,
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  );
};

export const useServiceOrder = () => useContext(ServiceOrderContext);

export default ServiceOrderProvider;
