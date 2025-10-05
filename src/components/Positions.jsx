export default function Positions({
  pos,
  clube,
  logo,
  jogos,
  vitorias,
  empates,
  derrotas,
  golsPro,
  golsContra,
  pontos,
}) {
  const saldoGols = (golsPro ?? 0) - (golsContra ?? 0);

  return (
    <div className="flex items-center border-b border-gray-200 w-full h-12 min-w-[650px] sm:justify-between">
      <div className="flex items-center gap-3 bg-white sticky left-0 z-10 w-[180px] flex-shrink-0 pl-3">
        <p className="w-6 text-center font-semibold">{pos}</p>
        {logo && (
          <img
            src={logo}
            alt={clube}
            className="w-7 h-7 rounded-full object-cover"
          />
        )}
        <p className="whitespace-nowrap font-medium text-sm max-w-[4rem]">
          {clube}
        </p>
      </div>

      <div className="flex items-center gap-6 px-4 text-sm font-medium flex-shrink-0 ">
        <p className="w-6 text-center">{jogos}</p>
        <p className="w-6 text-center">{vitorias}</p>
        <p className="w-6 text-center">{empates}</p>
        <p className="w-6 text-center">{derrotas}</p>
        <p className="w-6 text-center">{golsPro}</p>
        <p className="w-6 text-center">{golsContra}</p>
        <p className="w-6 text-center">{saldoGols}</p>
        <p className="w-6 text-center font-semibold">{pontos}</p>
      </div>
    </div>
  );
}
