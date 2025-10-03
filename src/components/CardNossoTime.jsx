import Logo from "../assets/logo-admin.svg";

export default function CardNossoTime({ nome, imagem, cargo, data }) {
  return (
    <div className="relative inline-block">
      {/* Card container com borda arredondada */}
      <div className="relative rounded-[10px] overflow-hidden">
        {/* Imagem */}
        <img className="w-[400px] h-[400px] object-cover" src={imagem} alt={nome} />

        {/* Logo no canto superior direito */}
        <div className="absolute top-0 right-0 p-2">
          <img className="w-6 h-6" src={Logo} alt="logo" />
        </div>

        {/* Data no canto superior esquerdo */}
        <div className="absolute top-[38px] left-1 rotate-[-90deg] text-white font-light font-antonio text-[10px]">
          {data}
        </div>

        {/* Nome e cargo grudados no rodapé da imagem */}
        <div className="absolute bottom-2 left-0 w-full px-4 text-white">
          <h2 className="border-b border-white text-center font-antonio">
            {nome}
          </h2>
          <h3 className="text-center font-open-sans text-[12px] font-light">{cargo}</h3>
        </div>
      </div>
    </div>
  );
}
