import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FiUser } from "react-icons/fi";

export default function JogadorasLista({ teamName }) {
  const [jogadoras, setJogadoras] = useState([]);

  useEffect(() => {
    const fetchInscricao = async () => {
      if (!teamName) return;

      const { data, error } = await supabase
        .from("inscricoes")
        .select("name, email, avatar, shirt, players")
        .eq("team", teamName)
        .single();

      if (error) {
        console.error("Erro ao buscar inscrição:", error);
        return;
      }

      if (data) {
        const playersArray = Array.isArray(data.players)
          ? data.players.map((p) => ({
              ...p,
              shirt: p.shirt || "",
            }))
          : [];

        const allPlayers = [
          {
            name: data.name,
            email: data.email,
            avatar: data.avatar || null,
            shirt: data.shirt || "",
          },
          ...playersArray,
        ];

        setJogadoras(allPlayers);
      }
    };

    fetchInscricao();
  }, [teamName]);

  const slots = Array.from({ length: 12 }, (_, i) => jogadoras[i] || null);

  return (
    <div className="flex flex-col w-full">
      {slots.map((jogadora, i) => (
        <div
          key={i}
          className={`flex items-center justify-between gap-3 py-2 px-3 border-b 
            ${i % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"} 
            ${i === slots.length - 1 ? "rounded-b-2xl" : ""}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden">
              {jogadora?.avatar ? (
                <img
                  src={jogadora.avatar}
                  alt={jogadora.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser size={20} className="text-gray-700" />
              )}
            </div>

            {jogadora ? (
              <div className="flex gap-1 items-center">
                <span className="text-[0.90rem] lg:text-[1rem] font-antonio font-light">
                  {jogadora.name}
                </span>
                <span className="text-[0.80rem] lg:text-[0.9rem] font-antonio font-light">
                  {jogadora.shirt ? `(${jogadora.shirt})` : ""}
                </span>
              </div>
            ) : (
              <span className="text-[0.90rem] lg:text-[1rem] text-gray-700 font-antonio font-light">
                Vaga disponível
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
