import { useServiceOrder } from "@/contexts/serviceOrderContext"
import Modal from "./modal"

const AddInstructionFormModal = () => {

  const { SetShowInstructionModal } = useServiceOrder()

  return (
    <Modal>
        <h2>Adicionar Instrução de Arte</h2>
        <textarea/>
        <div>
            <button onClick={SetShowInstructionModal}>Voltar</button>
            <button>Salvar</button>
        </div>
    </Modal>
  )
}

export default AddInstructionFormModal