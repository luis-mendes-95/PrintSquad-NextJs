import { DivBackgroundModal } from "../styles/modal";

interface IModal {
    children: React.ReactNode
}

const Modal = ({children}: IModal) => {
  
  return (
    <DivBackgroundModal>

        <div className="divModalInfo">
            {children}
        </div>

    </DivBackgroundModal>
  )
}

export default Modal