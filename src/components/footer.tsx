import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white p-4 flex justify-between items-center text-center w-full fixed bottom-0">
      <nav className="w-full">
        <ul className="flex space-x-4 w-full">
          <li className="w-full">
            <Link
              className="text-center w-full font-semibold"
              href="https://www.linkedin.com/in/lu%C3%ADs-mendes-aab672239/"
              target="blank"
            >
              Development by L Mendes
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
