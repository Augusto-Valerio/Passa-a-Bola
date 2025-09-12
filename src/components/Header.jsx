import logoHeader from "../assets/logo-header.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="hidden lg:block">
      <div className="flex justify-between items-center nav-text py-[1.875rem]">
        <Link to="/">
          <img src={logoHeader} alt="Logo passa a bola" />
        </Link>

        <nav>
          <ul className="flex gap-10 text-white">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/copa-pab" className="hover:text-gray-300">
                Copa PAB
              </Link>
            </li>
            <li>
              <Link to="" className="hover:text-gray-300">
                Nosso time
              </Link>
            </li>
            <li>
              <Link to="" className="hover:text-gray-300">
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 text-white">
          <button className="py-[0.30rem] px-[1.875rem] border-1 border-white rounded-[1.875rem]">
            Inscreva-se
          </button>
          <button className="py-[0.30rem] px-[3.125rem] bg-login-button rounded-[1.875rem]">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
