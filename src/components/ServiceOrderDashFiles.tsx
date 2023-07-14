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

  // Transforma a string de links em um array
  const links = serviceOrder.files.split(/\s+/);

  return (
    <>
      <DashServiceOrderFiles>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
        <h2>ARQUIVOS:</h2>
        <button className="buttonAddFile">ADICIONAR + </button>
        <div className="divServiceOrderInstructions">
          {/* Renderiza um link para cada link do array */}
          {links.map((link, index) => (
            <a href={link.trim()} target="_blank" key={index}>{link.trim()}</a>
          ))}
        </div>
      </DashServiceOrderFiles>
    </>
  );
};

export default ServiceOrderDashFiles;
