import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import JogadorasLista from "@/components/Jogadoras";

export default function Time() {
  const { id } = useParams(); // ID do time vindo da URL
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setTeam(data);
    };
    fetchTeam();
  }, [id]);

  if (!team) return <p>Carregando...</p>;

  return (
    <section className="flex justify-center bg-off-white h-screen">
      <div className="bg-white w-[80vw] rounded-2xl mt-[43px] drop-shadow-lg">
        <div className="flex justify-center items-center mx-8 flex-col my-5">
          <h1>{team.name}</h1>
        </div>

        <div className="flex">
          <button className="flex-1 bg-gray-300">Jogadoras</button>
          <button className="flex-1">Jogos</button>
          <button className="flex-1">Informações</button>
        </div>

        <JogadorasLista teamName={team.name} />
      </div>
    </section>
  );
}
