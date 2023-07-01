import { useRouter } from "next/router";

const Header = () => {

  const router = useRouter();

    return (
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center fixed w-full top-0 z-10  ">


        <h1 className="text-2xl font-bold transition-all duration-300 hover:scale-110 cursor-pointer"  onClick={() => {router.push("/");}}>PrintSquad</h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="transition-all duration-300 hover:scale-110 cursor-pointer font-bold"><a  href="#">About</a></li>
            <li className="transition-all duration-300 hover:scale-110 cursor-pointer font-bold"><a  href="#">Login</a></li>
          </ul>
        </nav>
      </header>
    )
  }
  

export default Header;
