import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import JogadorasLista from "@/components/Jogadoras";
import { FaArrowLeft } from "react-icons/fa6";

export default function Time() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [activeTab, setActiveTab] = useState("jogadoras");

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
    <div className="grid gap-4">
      <section className="flex justify-center bg-off-white">
        <div className="bg-white w-[80vw] rounded-2xl mt-[43px] drop-shadow-[0px_0px_12.1px_rgba(0,0,0,0.26)]">
          <Link
            to="/admin"
            className="flex items-center gap-2 px-6 pt-2 w-fit text-black hover:text-pink cursor-pointer"
          >
            <FaArrowLeft />
            <span>Voltar</span>
          </Link>
          
          {/* Header do time */}
          <div className="flex justify-center items-center flex-col pt-[1.875rem] pb-[2.3125rem] gap-2">
            <h1 className="font-antonio text-[1.75rem] text-midnight">
              {team.name}
            </h1>
            {team.logo && (
              <img
                src={team.logo}
                alt={team.name}
                className="w-24 h-24 object-cover rounded-full"
              />
            )}
          </div>

          {/* Tabs com borda completa */}
          <div className="flex">
            <button
              className={`flex-1 rounded-t-lg border border-gray-300 justify-center items-center cursor-pointer py-[5px] ${
                activeTab === "jogadoras" ? "bg-gray-300" : "bg-white"
              }`}
              onClick={() => setActiveTab("jogadoras")}
            >
              Jogadoras
            </button>
            <button
              className={`flex-1 rounded-t-lg border border-gray-300 justify-center items-center cursor-pointer py-[5px] ${
                activeTab === "jogos" ? "bg-gray-300" : "bg-white"
              }`}
              onClick={() => setActiveTab("jogos")}
            >
              Jogos
            </button>
            <button
              className={`flex-1 rounded-t-lg border border-gray-300 justify-center items-center cursor-pointer py-[5px] ${
                activeTab === "informacoes" ? "bg-gray-300" : "bg-white"
              }`}
              onClick={() => setActiveTab("informacoes")}
            >
              Informações
            </button>
          </div>

          {/* Conteúdo das abas */}
          <div>
            {activeTab === "jogadoras" && (
              <JogadorasLista teamName={team.name} />
            )}

            {activeTab === "jogos" && (
              <div className="text-center font-antonio text-gray-500">
                Nenhum jogo disputado recentemente.
              </div>
            )}

            {activeTab === "informacoes" && (
              <div className="flex flex-col items-center gap-4">
                {team.logo && (
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                )}
                <h2 className="font-antonio text-xl">{team.name}</h2>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Botões abaixo */}
      <div className="grid place-self-center w-[80vw] gap-[0.375rem] pb-10">
        <button className="border border-pink font-antonio rounded-[0.3125rem] py-[5px] text-pink hover:bg-white hover:text-midnight transition cursor-pointer">
          Ausente
        </button>
        <button className="bg-pink hover:bg-hover-pink hover:text-white cursor-pointer font-antonio rounded-[0.3125rem] text-white py-[5px] transition">
          Desclassificar time
        </button>
      </div>
    </div>
  );
}
