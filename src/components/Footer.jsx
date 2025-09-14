import FooterCard from "./FooterCard";

import Youtube from "../assets/youtube-icon.svg";
import Instagram from "../assets/instagram-icon.svg";
import Facebook from "../assets/facebook-icon.svg";
import Tiktok from "../assets/tiktok-icon.svg";
import Twitter from "../assets/twitter-icon.svg";
import Spotify from "../assets/spotify-icon.svg";

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
    <footer className="bg-white mt-11">
      <div className="flex gap-5 overflow-x-auto snap-x lg:justify-center lg:overflow-visible ">
        {socials.map((item) => (
          <div className="shrink-0 w-[150px]">
            <FooterCard
              icon={item.icon}
              platform={item.platform}
              social={item.social}
              link={item.link}
            />
          </div>
        ))}
      </div>
    </footer>
  );
}
