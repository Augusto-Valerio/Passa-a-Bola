export default function Positions({ pos, clube, jogos, vitorias, pontos}) {

  return (
    <div
      className="flex "
    >
      <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between px-3 h-12 w-[95vw]">
        <div className="flex gap-12 ml-5.5">
          <p>{pos}</p> 
          <p>{clube}</p>
        </div>  
        <div className="flex gap-7.5 mr-3.5">
          <p>{jogos}</p>
          <p>{vitorias}</p>
          <p>{pontos}</p>
        </div>
      </div>
      <div className="border-b border-gray-base "></div>
      </div>
    </div>
  );
}