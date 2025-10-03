import FooterCard from "./FooterCard";

import Youtube from "../assets/youtube-icon.svg";
import Instagram from "../assets/instagram-icon.svg";
import Facebook from "../assets/facebook-icon.svg";
import Tiktok from "../assets/tiktok-icon.svg";
import Twitter from "../assets/twitter-icon.svg";
import Spotify from "../assets/spotify-icon.svg";

import LogoFooter from "../assets/logo-footer.svg";

export default function Footer() {
  const socials = [
    {
      icon: Youtube,
      platform: "Youtube",
      social: "@Passaabola",
      link: "https://www.youtube.com/@passabola",
    },
    {
      icon: Instagram,
      platform: "Instagram",
      social: "@Passaabola",
      link: "https://www.instagram.com/passaabola/",
    },
    {
      icon: Facebook,
      platform: "Facebook",
      social: "@Passaabola",
      link: "https://facebook.com/Passaabola",
    },
    {
      icon: Tiktok,
      platform: "TikTok",
      social: "@Passaabola",
      link: "https://www.tiktok.com/@passabola",
    },
    {
      icon: Twitter,
      platform: "X",
      social: "@Passaabola",
      link: "https://x.com/Passaabola",
    },
    {
      icon: Spotify,
      platform: "Spotify",
      social: "@Passaabola",
      link: "https://open.spotify.com/show/18H1ysI9zyDIRahuCnZGQr?si=93b3d3ed36de4a9a",
    },
  ];

  return (
    <footer className="bg-white pt-11">
      <div className="border-b border-gray-base pb-9 max-w-[59.375rem] mx-auto">
        <div
          id="social-media"
          className="flex gap-5 overflow-x-auto snap-x lg:justify-center lg:overflow-visible"
        >
          {socials.map((item) => (
            <div className="shrink-0 w-[9.375rem]">
              <FooterCard
                icon={item.icon}
                platform={item.platform}
                social={item.social}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Links e logo */}
      <div className="mt-8 place-self-center md:flex md:gap-16">
        {/* Logo */}
        <div>
          <img src={LogoFooter} alt="Passa a Bola" />
        </div>

        {/* Colunas */}
        <div id="list-wrapper" className="grid grid-cols-2 mt-3 gap-12 md:flex">
          <div>
            <h3 className="footer-list-title mb-3">SOBRE NÓS</h3>
            <ul className="flex flex-col gap-[0.625rem] text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Centro de ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Todas competições
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-list-title mb-3">SEJA UM PATROCINADOR</h3>
            <ul className="flex flex-col gap-[0.625rem] text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  Vendas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Fontes
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Solução de marca
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-list-title mb-3">INFORMAÇÕES LEGAIS</h3>
            <ul className="flex flex-col gap-[0.625rem] text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Política e privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Termos e condições
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Licenças
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-list-title mb-3">MAIS PASSAABOLA</h3>
            <ul className="flex flex-col gap-[0.625rem] text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  App Store
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Google Play
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  TV comentada
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-10 place-self-center pb-3 text-[0.875rem] text-gray-700">
        Copyright © 2025 Passaabola. Todos os direitos reservados.
      </p>
    </footer>
  );
}
