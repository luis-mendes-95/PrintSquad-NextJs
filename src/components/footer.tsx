import { useAuth } from "@/contexts/authContext";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import { FooterBase } from "@/styles/footer";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";

const Footer = () => {

  const { showLogoutButton, logout, user } = useAuth();
  const { SetShowFilterModal, showFinancesButton, setShowFinances } = useServiceOrder()
  const router = useRouter();

  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
      <FooterBase>
        {user && (
          <>
            <button className="ButtonFilter" onClick={() => { router.push("/") }} style={{ fontSize: "25pt", width: "60px", height: "60px" }}>🏠</button>
            <button
              style={{ fontSize: "25pt", width: "60px", height: "60px" }}
              className="ButtonAddOrder"
              onClick={() => {
                router.push("/addServiceOrderPage");
              }}
            >
              +
            </button>
            <button className="ButtonFilter" onClick={SetShowFilterModal} style={{ fontSize: "25pt", width: "60px", height: "60px" }}>🔍</button>
          </>
        )}

        {/* {showLogoutButton && (
          <button className="ButtonLogout" onClick={logout}>
            LogOut
          </button>
        )} */}
        {
          showLogoutButton && (
            <button className="ButtonFinances" onClick={setShowFinances} style={{ backgroundColor: "green", color: "white", padding:"5px" }}>
              Finanças
            </button>
          )
        }
      </FooterBase>
    </>
  );
};

export default Footer;
