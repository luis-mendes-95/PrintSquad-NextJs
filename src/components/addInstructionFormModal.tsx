import { useState } from "react";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import Modal from "./modal";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { toast } from "react-toastify";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const AddInstructionFormModal = ({ serviceOrder }: iCardServiceOrderProps) => {

  const { SetShowInstructionModal, getAllServiceOrders } = useServiceOrder();
  const [instruction, setInstruction] = useState("");
  const router = useRouter()

  const cookies = parseCookies();
  const token = cookies["printsquad.token"];

  const onSave = async () => {
    const formData = {
      client: serviceOrder.client,
      description: `${instruction} ||| ${serviceOrder.description}`,
      status: "AGUARDANDO ARTE"
    };

    try {
      const response = await api.patch(`serviceOrders/${serviceOrder.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Instrução de arte adicionada com sucesso!");
        SetShowInstructionModal()
        getAllServiceOrders()
        router.push(`/${serviceOrder.id}`)
      } else {
        toast.error("Ocorreu um erro ao adicionar a instrução de arte.");
      }
    } catch (error) {
      console.error("Erro ao adicionar a instrução de arte:", error);
      toast.error("Ocorreu um erro ao adicionar a instrução de arte.");
    }
  };

  return (
    <Modal>
      <h2 style={{fontSize:"18pt", fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold"}}>Adicionar Instrução de Arte</h2>
      <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} style={{fontSize:"20pt", padding: "5px", height:"50%"}} />
      <div>
        <button onClick={SetShowInstructionModal} style={{fontSize:"20pt", padding: "5px", width:"50%"}} className="buttonCancel">
          Voltar
        </button>
        <button className="buttonSave" onClick={onSave} style={{fontSize:"20pt", padding: "5px", width:"50%"}}>
          Salvar
        </button>
      </div>
    </Modal>
  );
};

export default AddInstructionFormModal;
