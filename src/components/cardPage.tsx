import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import Image from "next/image";
import { CardBasePage } from "../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";
import { useServiceOrder } from "@/contexts/serviceOrderContext";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const CardPage = ({ serviceOrder }: iCardServiceOrderProps) => {

  const router = useRouter()
  const { SetShowMockupImgModal} = useServiceOrder()

  return (
    <CardBasePage>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />

      <div className="divServiceOrderMockup">
        <p>{serviceOrder.date}</p>
        <h2>{serviceOrder.client}</h2>
        {serviceOrder.mockupImg !== null ? (
          <Image
            width={100}
            height={100}
            src={serviceOrder.mockupImg}
            alt="Mockup da ordem de serviço"
            style={{ borderRadius: "50%", border: "2.5pt solid orange", height:"80px", maxWidth: "80px"}}
          />
        ) : (
          <div className="noImage">...</div>
        )}
      </div>

      <div className="divStatus">
        <h3>STATUS:</h3>
        {serviceOrder.status === "AGUARDANDO ARTE" && <p className="pending">{serviceOrder.status}</p>}
        {serviceOrder.status === "AGUARDANDO CLIENTE" && <p className="waiting">{serviceOrder.status}</p>}
        {serviceOrder.status === "APROVADA" && <p className="aproved">{serviceOrder.status}</p>}
        {serviceOrder.status === "EM PRODUÇÃO" && <p className="aproved" style={{color: "brown"}}>{serviceOrder.status}</p>}
        {serviceOrder.status === "CONCLUÍDA" && <p className="aproved" style={{color: "lightblue"}}>{serviceOrder.status}</p>}
        {serviceOrder.status === "ARQUIVADA" && <p className="aproved" style={{color: "gray"}}>{serviceOrder.status}</p>}
        
      </div>

      <div className="divMockup" >
        <h3 >VER MOCKUP:</h3>
          <button className="ButtonSeeMockup" onClick={SetShowMockupImgModal} style={{fontSize:"25pt"}}>ABRIR</button>
  
      </div>

      <div className="divProductTitle">
        <h3>PRODUTO:</h3>
        <p style={{fontSize:"25pt"}}>{serviceOrder.product}</p>
      </div>

      <div className="divPrintType">
        <h3>TIPO:</h3>
        <p >{serviceOrder.printType}</p>
      </div>
      
    </CardBasePage>
  );
};

export default CardPage;
