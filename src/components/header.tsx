import { useRouter } from "next/router";
import {HeaderBase} from "../styles/header"
import { GoogleFonts } from 'next-google-fonts';

const Header = () => {
  const router = useRouter();

  return (
    <HeaderBase>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
      <h1 onClick={() => {router.push("/");}} className="h1TitleHeader">PrintSquad</h1>
      <nav className="navHeaderButtons">
        <ul className="ulHeaderButtons">
          <li className="liHeaderButtons"onClick={() => {router.push("/about");}}>About</li>
          <li className="liHeaderButtons"onClick={() => {router.push("/loginPage");}}>Login</li>
        </ul>
      </nav>
    </HeaderBase>
  );
};

export default Header;
