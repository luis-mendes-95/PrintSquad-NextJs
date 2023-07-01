import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import Image from "next/image";
import Link from "next/link";
import { CardBase } from "../styles/card";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const CardServiceOrder = ({ serviceOrder }: iCardServiceOrderProps) => {

  const router = useRouter()

  return (
    <CardBase onClick={()=>{router.push(`${serviceOrder.id}`)}}>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />

      <div className="divServiceOrderMockup">
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
        {serviceOrder.status === "Aguardando Arte" && <p className="pending">{serviceOrder.status}</p>}
        {serviceOrder.status === "Aguardando Cliente" && <p className="waiting">{serviceOrder.status}</p>}
        {serviceOrder.status === "Aprovada" && <p className="aproved">{serviceOrder.status}</p>}
        
      </div>

      <div className="divProductTitle">
        <h3>PRODUCT:</h3>
        <p>{serviceOrder.product}</p>
      </div>
    </CardBase>
  );
};

export default CardServiceOrder;
