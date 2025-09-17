import editar from "../../assets/editar.png"
import retorno from "../../assets/retorno.png"

import Jogadoras from "../../components/Jogadoras"

export default function Copa(){
  return(
    <>
    <section className="flex items-center justify-center bg-off-white h-screen ">
      <div className="bg-white w-[80vw] items-center rounded-2xl ">
        <div className="flex justify-center items-center mx-8 flex-col my-5">
          <div className="flex justify-between w-[100%] items-center">
          <img src={editar} alt="icon de editar" className="w-3 h-3"/>
          <img src={retorno} alt="icon de retorno" className="w-3 h-2" />
          </div>
          <h1>Wolves</h1>
        </div>

        <div className="flex ">
          <div className="flex flex-1 rounded-t-lg justify-center items-center bg-gray-300">
            <h2>Jogadoras</h2>
          </div>
          <div className="flex flex-1 rounded-t-lg justify-center items-center border border-gray-300">
            <h2>Jogos</h2>
          </div>
          <div className="flex flex-1 rounded-t-lg border justify-center items-center border-gray-300">
            <h2>Informações</h2>
          </div>
        </div>

        <Jogadoras
          img= "../../assets/time3.png"
          num = "6"
        />

      </div>
    </section>
    
    </>
  );
}