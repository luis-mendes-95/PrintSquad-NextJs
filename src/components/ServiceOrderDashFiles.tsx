import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import Image from "next/image";
import Link from "next/link";
import { DashServiceOrderFiles } from "../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrderDashFiles = ({ serviceOrder }: iCardServiceOrderProps) => {
  const router = useRouter();

  return (
    <>
      <DashServiceOrderFiles>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
        <h2>ARQUIVOS:</h2>
        <button className="buttonAddFile">ADICIONAR + </button>
        <div className="divServiceOrderInstructions">
          <p className="pDescription">  Arquivo5  Arquivo4  Arquivo3  Arquivo2  Arquivo1  </p>
        </div>
      </DashServiceOrderFiles>
    </>
  );
};

export default ServiceOrderDashFiles;
