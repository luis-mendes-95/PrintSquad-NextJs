import Footer from "@/components/footer";
import Header from "@/components/header";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import api from "@/services/api";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";

interface ServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const ServiceOrder: NextPage<ServiceOrderProps> = ({ serviceOrder }: ServiceOrderProps) => {
  const router = useRouter();

  return (
    <>
      <Header />
      <main>
        <p>{serviceOrder.client}</p>
        <div>
          <div>
            <p>Product:</p>
            <p>{serviceOrder.product}</p>
          </div>
          <div>
            <p>Print Type:</p>
            <p>{serviceOrder.printType}</p>
          </div>
          <div>
            <p>Description:</p>
            <p>{serviceOrder.description}</p>
          </div>
          <div>
            <p>Status:</p>
            <p>{serviceOrder.status}</p>
          </div>
          <div>
            <p>Cost:</p>
            <p>{serviceOrder.cost}</p>
          </div>
          <div>
            <p>Price:</p>
            <p>{serviceOrder.price}</p>
          </div>
          <div>
            <p>Margin:</p>
            <p>{serviceOrder.margin}</p>
          </div>
        </div>
        <div>
          <Image
            width={209}
            height={186}
            src={serviceOrder.mockupImg}
            alt="Mockup da ordem de serviço"
          />
        </div>
        <div>
          <button>Então, djow...</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "847b5e73-1215-4287-8246-8cd6415f952e" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ServiceOrderProps> = async (ctx) => {
  const id = ctx.params!.id;
  const response = await api.get<serviceOrderData>(`/serviceOrders/${id}`);

  return { props: { serviceOrder: response.data }, revalidate: 60 };
};

export default ServiceOrder;
