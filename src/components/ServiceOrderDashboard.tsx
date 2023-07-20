import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { DashServiceOrder } from "../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";
import { useServiceOrder } from "@/contexts/serviceOrderContext";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrderDashboard = ({ serviceOrder }: iCardServiceOrderProps) => {
  const router = useRouter();
  const { SetShowInstructionModal } = useServiceOrder();

  const descriptionArray = serviceOrder.description.split("|||");

  return (
    <>
      <DashServiceOrder>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
        <h2 style={{fontSize:"30pt"}}>INSTRUÇÕES:</h2>
        <button style={{fontSize:"20pt"}} className="buttonAddInstruction" onClick={SetShowInstructionModal}>ADICIONAR + </button>
        <div className="divServiceOrderInstructions">
          {descriptionArray.map((description, index) => (
            <p key={index} className="pDescription" style={{fontSize:"20pt"}}>{description}</p>
          ))}
        </div>
      </DashServiceOrder>
    </>
  );
};

export default ServiceOrderDashboard;
