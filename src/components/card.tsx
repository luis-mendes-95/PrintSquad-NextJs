import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import Image from "next/image";
import Link from "next/link";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const CardServiceOrder = ({ serviceOrder }: iCardServiceOrderProps) => {
  return (
    <div className="bg-blue-200 rounded-lg w-full md:w-72 p-4">
      <Link href={`${serviceOrder.id}`}>
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xl font-bold mb-4">{serviceOrder.client}</p>
          <div className="space-y-2">
            <div className="flex justify-center mt-4">
              {serviceOrder.mockupImg !== null ? (
                <Image
                  className="w-25 h-25"
                  width={109}
                  height={186}
                  src={serviceOrder.mockupImg}
                  alt="Mockup da ordem de serviço"
                />
              ) : null}
            </div>
            <div>
              <p className="font-bold">PRODUCT:</p>
              <p>{serviceOrder.product}</p>
            </div>
            <div className="bg-orange-400 text-blue-900 text-center rounded-lg">
              <p className="font-bold">STATUS:</p>
              <p>{serviceOrder.status}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardServiceOrder;
