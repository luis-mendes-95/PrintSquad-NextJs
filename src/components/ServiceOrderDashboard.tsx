import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import Image from "next/image";
import Link from "next/link";
import { DashServiceOrder } from "../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";
import AddInstructionFormModal from "./addInstructionFormModal"
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
        <h2>INSTRUÇÕES:</h2>
        <button className="buttonAddInstruction" onClick={SetShowInstructionModal}>ADICIONAR + </button>
        <div className="divServiceOrderInstructions">
          {descriptionArray.map((description, index) => (
            <p key={index} className="pDescription">{description}</p>
          ))}
        </div>
      </DashServiceOrder>
    </>
  );
};

export default ServiceOrderDashboard;
