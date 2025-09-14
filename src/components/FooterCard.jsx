export default function FooterCard({ icon, platform, social, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="flex flex-col items-center gap-1 bg-off-white py-3"
    >
      <img src={icon} alt={platform} className="w-6 h-6"/>
      <h3 className="font-semibold font-open-sans">{platform}</h3>
      <p className="text-sm text-gray-600">{social}</p>
    </a>
  );
}
