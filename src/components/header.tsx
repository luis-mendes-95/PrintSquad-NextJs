import { useRouter } from "next/router";
import { HeaderBase, StyledImage } from "../styles/header";
import { GoogleFonts } from "next-google-fonts";
import { useAuth } from "@/contexts/authContext";

const Header = () => {
  const router = useRouter();

  const { user, setShowLogout } = useAuth();

  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />{" "}
    
      <HeaderBase>
        <h1 onClick={()=>{router.push("/");}} className="h1TitleHeader">PrintSquad</h1>

          {

            !user &&
            <nav className="navHeaderButtons">
            <ul className="ulHeaderButtons">
              <li className="liHeaderButtons" onClick={() => {router.push("/about");}}>
                About
              </li>
              <li className="liHeaderButtons" onClick={() => {router.push("/loginPage");}}>
                Login
              </li>
            </ul>
          </nav>

          }

          {

          user &&
            <StyledImage src="https://res.cloudinary.com/dwadq5lzp/image/upload/v1689875084/ehwcx3vqhsgoknhduq0z.png" alt={"userLogo"} onClick={setShowLogout} width={100} height={100}/>

          }



      </HeaderBase>
    </>
  );
};

export default Header;
