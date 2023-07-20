import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { DashServiceOrderFiles } from "../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";
import { useServiceOrder } from "@/contexts/serviceOrderContext";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrderDashFiles = ({ serviceOrder }: iCardServiceOrderProps) => {

  const { SetShowFileModal } = useServiceOrder()
  const router = useRouter();

  // Verifica se serviceOrder.files é null
  if (serviceOrder.files === null) {
    return (
      <DashServiceOrderFiles>
        <h2 style={{fontSize:"25pt"}}>ARQUIVOS:</h2>
        <button className="buttonAddFile" onClick={SetShowFileModal}>ADICIONAR + </button>
        <p>Não foram enviados arquivos para este cliente.</p>
      </DashServiceOrderFiles>
    );
  }

  // Transforma a string de links em um array
  const links = serviceOrder.files.split(/\s+/);

  return (
    <>
      <DashServiceOrderFiles>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
        <h2>ARQUIVOS:</h2>
        <button className="buttonAddFile" onClick={SetShowFileModal}>ADICIONAR + </button>
        <div className="divServiceOrderInstructions">
          {/* Renderiza um link para cada link do array */}
          {links.map((link, index) => (
            <a href={link.trim()} target="_blank" key={index} style={{backgroundColor:"orange", textDecoration:"none", color:"white", padding:"5px", borderRadius:"8px", textShadow:"1pt 1pt 3pt black", fontWeight:"bold", fontFamily:"sans-serif"}}>{`Arquivo (${link.trim().slice(-4)})`}</a>
          ))}
        </div>
      </DashServiceOrderFiles>
    </>
  );
};

export default ServiceOrderDashFiles;
