import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FiCheck } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TeamNameInput({ team, setTeam, setTeamAvailable }) {
  const [teamAvailable, setTeamAvailableLocal] = useState(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const checkTeamName = async () => {
      const trimmed = team.trim();

      if (!trimmed) {
        setTeamAvailableLocal(null);
        setTeamAvailable(null);
        setChecking(false);
        return;
      }

      setChecking(true);

      const normalize = (str) =>
        str
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim();

      const normalizedTeam = normalize(trimmed);

      const { data, error } = await supabase.from("inscricoes").select("team");

      if (error) {
        console.error("Erro ao verificar nome de time:", error);
        setChecking(false);
        return;
      }

      const alreadyExists = data?.some(
        (item) => normalize(item.team) === normalizedTeam
      );

      const available = !alreadyExists;
      setTeamAvailableLocal(available);
      setTeamAvailable(available);
      setChecking(false);
    };

    checkTeamName();
  }, [team, setTeamAvailable]);

  useEffect(() => {}, [teamAvailable]);

  return (
    <div className="grid gap-3 mt-2">
      <Label
        htmlFor="team"
        className="font-medium text-gray-700 flex items-center gap-2"
      >
        Nome do Time
        {checking ? (
          <span className="text-gray-400">Verificando...</span>
        ) : team.trim() === "" ? (
          <span className="text-red-500">*</span>
        ) : teamAvailable === false ? (
          <span className="text-red-500 font-medium">
            Nome de time indisponível
          </span>
        ) : teamAvailable === true ? (
          <FiCheck className="text-green-500" />
        ) : (
          <span className="text-red-500">*</span>
        )}
      </Label>

      <Input
        id="team"
        type="text"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        placeholder="Ex: Wolves"
      />
    </div>
  );
}
