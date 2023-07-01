import Footer from "@/components/footer";
import Header from "@/components/header";
import UploadImageForm from "@/components/uploadImageForm";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { GetServerSideProps, NextPage } from "next";

import nookies from "nookies";

const UploadMockups: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        <UploadImageForm/>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies["printsquad.token"]) {
    return {
      redirect: {
        destination: "/loginPage",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UploadMockups;
