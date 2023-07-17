import { useAuth } from "@/contexts/authContext";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { FooterBase } from "@/styles/footer";
import { NextPage } from "next";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";


const Footer= () => {
  

  const { showLogoutButton, logout, user } = useAuth();
  const { SetShowFilterModal } = useServiceOrder()
  const router = useRouter();

  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
      <FooterBase>
        {user && (
          <>
            <button className="ButtonFilter" onClick={()=>{router.push("/")}}>🏠</button>
            <button
              className="ButtonAddOrder"
              onClick={() => {
                router.push("/addServiceOrderPage");
              }}
            >
              +
            </button>
            <button className="ButtonFilter" onClick={SetShowFilterModal}>🔍</button>
          </>
        )}

        {showLogoutButton && (
          <button className="ButtonLogout" onClick={logout}>
            LogOut
          </button>
        )}
      </FooterBase>
    </>
  );
};

export default Footer;
