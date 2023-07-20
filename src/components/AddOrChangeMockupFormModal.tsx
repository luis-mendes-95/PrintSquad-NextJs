import { useState } from "react";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import Modal from "./modal";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import api from "@/services/api";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const AddOrChangeMockupFormModal = ({ serviceOrder }: iCardServiceOrderProps) => {
  const { SetShowMockupModal, getAllServiceOrders } = useServiceOrder();
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      uploadMockup(selectedFile);
    }
  };

  const uploadMockup = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("mockup", file);

      const response = await api.patch(`/serviceOrders/upload/${serviceOrder.id}`, formData);

      if (response.status === 200 && response.data.mockupImg) {
        const mockupUrl = response.data.mockupImg;
        toast.success("Mockup adicionado com sucesso!", { autoClose: 1000 });

        const requestBody = {
          client: serviceOrder.client,
          mockupImg: mockupUrl,
          status: "AGUARDANDO CLIENTE",
        };

        const requestUrl = `/serviceOrders/${serviceOrder.id}`;

        try {
          await api.patch(requestUrl, requestBody);
          SetShowMockupModal();
          getAllServiceOrders();
          router.push(`/${serviceOrder.id}`);
        } catch (error) {
          console.error("Erro ao atualizar a serviceOrder:", error);
          toast.error("Ocorreu um erro ao adicionar o mockup.");
        }
      } else {
        toast.error("Ocorreu um erro ao adicionar o mockup.");
      }
    } catch (error) {
      console.error("Erro ao adicionar o mockup:", error);
      toast.error("Ocorreu um erro ao adicionar o mockup.");
    }

    setUploading(false);
  };

  return (
    <Modal>
      {
        !uploading &&
        <h2 style={{textAlign:"center", fontFamily:"sans-serif"}}>Adicionar ou Alterar Mockup</h2>
      }
      
      {
        !uploading &&
        <input style={{width: "100%", margin:"50px 0", backgroundColor:"lightgray", padding:"50px 10px", borderRadius:"18px", boxShadow:"1pt 1pt 3pt black"}} type="file" onChange={onFileInputChange} />
      }

      {
        uploading &&
        <>
              <p style={{width:"100%", textAlign:"center", fontWeight:"bold", fontSize:"25pt", fontFamily:"sans-serif"}}>Aguarde os arquivos serem enviados.</p>
              <img
                src="https://media.giphy.com/media/r3xBH1FXWz0h55CVtj/giphy.gif"
                alt="Loading"
                style={{ width: "100%", borderRadius: "90%" }}
              />
        </>
      }
      
      <div style={{margin:"50px 0 0 0"}}>
        <button style={{fontSize:"15pt", width:"100%"}} onClick={SetShowMockupModal} className="buttonCancel">
          Voltar
        </button>
        <button style={{fontSize:"15pt", width:"100%"}} className="buttonSave" disabled={uploading}>
            Salvar
        </button>
      </div>

      <style jsx>{`
        .buttonSave {
          font-size: ${uploading ? "6pt" : "inherit"};
        }
      `}</style>
    </Modal>
  );
};

export default AddOrChangeMockupFormModal;
