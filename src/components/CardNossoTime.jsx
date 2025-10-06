import Logo from "../assets/logo-admin.svg";

export default function CardNossoTime({ nome, imagem, cargo, data }) {
  return (
    <div className="relative inline-block">
      {/* Card container com borda arredondada */}
      <div className="relative rounded-[0.625rem] overflow-hidden">
        {/* Imagem */}
        <img className="w-[25rem] h-[25rem] object-cover" src={imagem} alt={nome} />

        {/* Logo no canto superior direito */}
        <div className="absolute top-0 right-0 p-4">
          <img className="w-8 h-8" src={Logo} alt="logo" />
        </div>

        {/* Data no canto superior esquerdo */}
        <div className="absolute top-[2.375rem] left-1 rotate-[-90deg] text-white font-light font-antonio text-[0.625rem]">
          {data}
        </div>

        {/* Nome e cargo grudados no rodapé da imagem */}
        <div className="absolute bottom-4 left-0 w-full px-4 text-white">
          <h2 className="border-b border-white text-center font-antonio h-8">
            {nome}
          </h2>
          <h3 className="text-center font-open-sans text-[0.75rem] font-light">{cargo}</h3>
        </div>
      </div>
    </div>
  );
}
