import { useRouter } from "next/router";
import {HeaderBase} from "../styles/header"
import { GoogleFonts } from 'next-google-fonts';

const Header = () => {
  const router = useRouter();

  return (
    <HeaderBase>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
      <h1 onClick={() => {router.push("/");}}>PrintSquad</h1>
      <nav>
        <ul>
          <li>About</li>
          <li>Login</li>
        </ul>
      </nav>
    </HeaderBase>
  );
};

export default Header;
