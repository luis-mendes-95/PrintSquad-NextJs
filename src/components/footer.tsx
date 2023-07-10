import { useAuth } from "@/contexts/authContext";
import { FooterBase } from "@/styles/footer";
import { GoogleFonts } from "next-google-fonts";
import { useRouter } from "next/router";

const Footer = () => {
  const { showLogoutButton, logout, user } = useAuth();
  const router = useRouter();

  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
      <FooterBase>
        {user && (
          <>
            <button
              className="ButtonAddOrder"
              onClick={() => {
                router.push("/addServiceOrderPage");
              }}
            >
              +
            </button>
            <button className="ButtonFilter">🔍</button>
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
