export default function GameCars({ icon1, desc, icon2, dia,onde}) {

  return (
    <div
      className="flex flex-col items-center gap-3 bg-white py-3 w-70 "
    >
      <p>{dia}</p>
      <div className="flex gap-10 items-center justify-center">
        <img src={icon1} alt={desc} className="w-15 h-15"/>
        <h2 className="font-semibold font-open-sans">0X0</h2>
        <img src={icon2} alt={desc} className="w-15 h-15"/>
      </div>
      <p>{onde}</p>
    </div>
  );
}