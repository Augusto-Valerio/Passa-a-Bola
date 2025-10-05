export default function NextGame({
  num,
  quadra,
  hora,
  img1,
  desc,
  nomeTime,
  nomeTime2,
  img2,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 w-full max-w-[986px] mx-auto px-4 drop-shadow-[4px_4px_9.7px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col bg-white px-6 py-4 items-center justify-center flex-shrink-0 w-full border-b md:border-0 sm:w-[200px] sm:drop-shadow-[4px_4px_9.7px_rgba(0,0,0,0.25)]">
        <h3 className="font-antonio font-bold text-[1.5625rem]">Jogo {num}</h3>
        <p className="font-open-sans font-light text-[0.875rem]">
          Quadra {quadra}
        </p>
        <p className="font-open-sans font-light text-[0.875rem]">{hora}</p>
      </div>

      <div className="flex items-center justify-center gap-6 bg-white py-6 px-4 md:px-30 w-full  sm:drop-shadow-[4px_4px_9.7px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col font-antonio font-bold lg:text-[1.5625rem] justify-center items-center mr-5 gap-1 flex-1">
          <img src={img1} alt={desc} className="w-15 h-15 object-cover" />
          <h3 className="whitespace-nowrap text-center">{nomeTime}</h3>
        </div>

        <div className="h-23 w-px bg-gray-base"></div>

        <div className="flex flex-col font-antonio font-bold lg:text-[1.5625rem] justify-center items-center ml-5 gap-1 flex-1">
          <img src={img2} alt={desc} className="w-15 h-16 object-cover" />
          <h3 className="text-center whitespace-nowrap">{nomeTime2}</h3>
        </div>
      </div>
    </div>
  );
}
