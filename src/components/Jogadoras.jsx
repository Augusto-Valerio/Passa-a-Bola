import { useEffect, useState } from "react";
import Usuario from "../../assets/usuario.png"

export default function Jogadoras({ img, num}) { 
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(responde => responde.json())
      .then(data => setUsuario(data)) 
      .catch(error => console.log(error))
      .finally(() => console.log("Finalizou!"));
  }, []);

  if (!usuario) return null; 

  return ( 
    <>
    {usuario.map((pegaItem,index) => (
      <div
      key={index}
      className={`flex justify-between h-10 ${
        index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}
    >
        <div className="flex items-center ml-4 gap-3">
          <img src={Usuario} alt="imagem perfil jogadora" className="w-4 h-4" />
          <p>{pegaItem.name}</p>
        </div>
        <p className="flex items-center mr-4">{num}</p>
      </div> 
    ))}
    </>
  ); 
}
