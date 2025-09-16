export default function NextGame({ num, quadra, hora, img1, desc, nomeTime, nomeTime2, img2}) {

  return (
    <div
      className="flex gap-5 h-30"
    >
      <div className="flex flex-col bg-white w-35 items-center justify-center">
        <h3>Jogo {num}</h3>
        <p>Quadra {quadra}</p>
        <p>{hora}</p>
      </div>

      <div className="flex flex-row bg-white items-center w-90 justify-center">
        <div className="flex flex-col justify-center items-center mr-5 gap-1">
        <img src={img1} alt={desc} className="w-15 h-15"/>
        <h3>{nomeTime}</h3>
        </div>
        
        <div className="h-20 w-px bg-gray-base"></div>

        <div className="flex flex-col justify-center items-center ml-5 gap-1">
        <img src={img2} alt={desc} className="w-15 h-16"/>
        <h3>{nomeTime2}</h3>
        </div>
      </div>
    </div>
  );
}