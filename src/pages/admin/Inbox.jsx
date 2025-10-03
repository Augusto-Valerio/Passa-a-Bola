import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatusFilter from "@/components/StatusFilter";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FiUser } from "react-icons/fi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Inbox() {
  const [inscricoes, setInscricoes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [availableTeams, setAvailableTeams] = useState([]);

  useEffect(() => {
    fetchInscricoes();
    fetchAvailableTeams();
  }, []);

  async function fetchInscricoes() {
    setLoading(true);
    const { data, error } = await supabase
      .from("inscricoes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setInscricoes(data || []);
    setLoading(false);
  }

  async function fetchAvailableTeams() {
    // Buscar inscrições de times aceitos
    const { data: teamsData, error } = await supabase
      .from("inscricoes")
      .select("id, team, players")
      .eq("mode", "team")
      .eq("status", "Aceitos");

    if (error) return console.error(error);

    const teamsWithVacancy = (teamsData || [])
      .map((t) => {
        // Conta todos os jogadores + capitão (se estiver separado)
        const playersCount = (t.players?.length || 0) + 1; // adiciona 1 para o capitão
        return {
          id: t.id,
          name: t.team,
          playersCount,
        };
      })
      .filter((t) => t.playersCount < 12);

    setAvailableTeams(teamsWithVacancy);
  }

  const handleAcceptIndividual = async () => {
    if (!selected.teamId)
      return alert("Selecione um time antes de aceitar a jogadora.");

    const { data: teamData, error: teamError } = await supabase
      .from("inscricoes")
      .select("players")
      .eq("id", selected.teamId)
      .single();

    if (teamError) return console.error(teamError);

    const updatedPlayers = [
      ...(teamData.players || []),
      {
        name: selected.name,
        email: selected.email,
        phone: selected.phone,
        cpf: selected.cpf,
        shirt: selected.shirt,
        position: selected.position,
        leg: selected.leg,
        avatar: selected.avatar,
      },
    ];

    const { error: updateError } = await supabase
      .from("inscricoes")
      .update({ players: updatedPlayers })
      .eq("id", selected.teamId);

    if (updateError) return console.error(updateError);
  };

  const handleAccept = async () => {
    if (!selected) return;

    if (selected.mode === "individual") await handleAcceptIndividual();
    else if (selected.mode === "team") {
      const { error: teamError } = await supabase
        .from("teams")
        .insert([{ name: selected.team }]);
      if (teamError) console.error(teamError);
    }

    const { error: statusError } = await supabase
      .from("inscricoes")
      .update({ status: "Aceitos" })
      .eq("id", selected.id);

    if (statusError) {
      console.error(statusError);
      alert("Erro ao atualizar status.");
      return;
    }

    // Atualiza estado local
    setInscricoes((prev) =>
      prev.map((i) => (i.id === selected.id ? { ...i, status: "Aceitos" } : i))
    );
    setSelected(null);
    fetchAvailableTeams();
  };

  const handleReject = async () => {
    if (!selected) return;

    const { error } = await supabase
      .from("inscricoes")
      .update({ status: "Rejeitados" })
      .eq("id", selected.id);

    if (error) return console.error(error);

    setInscricoes((prev) =>
      prev.map((i) =>
        i.id === selected.id ? { ...i, status: "Rejeitados" } : i
      )
    );
    setSelected(null);
  };

  const renderJogadora = (p) => (
    <li key={p.email} className="flex flex-col gap-3 border-2 rounded-2xl p-3">
      <div className="border-b-2 flex justify-center mb-2">
        {p.avatar ? (
          <img
            src={p.avatar}
            className="w-12 h-12 rounded-full object-cover mb-2"
            alt={p.name}
          />
        ) : (
          <FiUser size={48} className="text-gray-400 rounded-full mb-2" />
        )}
      </div>
      <div className="grid gap-2">
        <div>
          <h3 className="font-bold">Nome:</h3>
          <p>
            {p.name} {p.shirt ? `(${p.shirt})` : ""}
          </p>
        </div>
        <div>
          <h3 className="font-bold">Email:</h3>
          <div>{p.email}</div>
        </div>
        <div>
          <h3 className="font-bold">Telefone:</h3>
          <div>{p.phone}</div>
        </div>
        <div>
          <h3 className="font-bold">CPF:</h3>
          <div>{p.cpf}</div>
        </div>
        <div>
          <h3 className="font-bold">Camisa:</h3>
          <div>{p.shirt}</div>
        </div>
        <div>
          <h3 className="font-bold">Posição:</h3>
          <div>{p.position}</div>
        </div>
        <div>
          <h3 className="font-bold">Perna dominante:</h3>
          <div>{p.leg}</div>
        </div>
      </div>
    </li>
  );

  return (
    <section className="py-[2.6875rem] flex flex-col justify-center items-center">
      <div className="bg-white w-[80vw] rounded-2xl h-fit drop-shadow p-2">
        <h1 className="font-antonio text-[1.75rem] text-center pt-6 pb-9">
          Caixa de entrada
        </h1>

        <StatusFilter onChange={setStatusFilter} />

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="space-y-3">
            {inscricoes
              .filter(
                (i) => statusFilter === "Todos" || i.status === statusFilter
              )
              .map((i) => (
                <li
                  key={i.id}
                  className="p-3 border-2 mt-2 flex justify-between items-center rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm text-gray-500">
                      {i.mode === "team"
                        ? "Inscrição: Time"
                        : "Inscrição: Individual"}
                    </div>
                    <div className="text-xs text-gray-400">
                      Status: {i.status}
                    </div>
                  </div>
                  <Button
                    className="bg-pink text-white hover:bg-hover-pink cursor-pointer"
                    onClick={() => setSelected(i)}
                  >
                    Visualizar
                  </Button>
                </li>
              ))}
          </ul>
        )}

        <Dialog
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <DialogContent className="sm:max-w-[39rem] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes da inscrição</DialogTitle>
            </DialogHeader>

            {selected && (
              <div className="space-y-4">
                {/* Jogadora info */}
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    {selected.avatar ? (
                      <img
                        src={selected.avatar}
                        alt="avatar"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <FiUser size={40} className="text-gray-400" />
                    )}
                  </div>
                  <div className="grid gap-3">
                    <h2 className="font-bold">Jogadora:</h2>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <strong>Nome:</strong> {selected.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {selected.email}
                      </div>
                      <div>
                        <strong>Telefone:</strong> {selected.phone}
                      </div>
                      <div>
                        <strong>CPF:</strong> {selected.cpf}
                      </div>
                      <div>
                        <strong>Camisa:</strong> {selected.shirt}
                      </div>
                      <div>
                        <strong>Posição:</strong> {selected.position}
                      </div>
                      <div>
                        <strong>Perna dominante:</strong> {selected.leg}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time info */}
                {selected.mode === "team" && selected.players && (
                  <div className="mt-3">
                    <div className="font-semibold">
                      Nome do Time: {selected.team}
                    </div>
                    {selected.team_logo && (
                      <img
                        src={selected.team_logo}
                        alt="logo do time"
                        className="w-28 h-28 object-cover rounded mt-2"
                      />
                    )}
                    <div className="mt-3">
                      <div className="font-bold">Jogadoras do time:</div>
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {selected.players.map(renderJogadora)}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Individual */}
                {selected.mode === "individual" && (
                  <div className="mt-4">
                    <label className="block font-bold mb-1">
                      Escolher time:
                    </label>

                    <Select
                      value={selected.teamId || ""}
                      onValueChange={(value) =>
                        setSelected((prev) => ({ ...prev, teamId: value }))
                      }
                    >
                      <SelectTrigger className="w-[100%] cursor-pointer">
                        <SelectValue placeholder="Selecione um time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Times disponíveis</SelectLabel>
                          {availableTeams.length > 0 ? (
                            availableTeams.map((t) => (
                              <SelectItem
                                className="cursor-pointer"
                                key={t.id}
                                value={t.id}
                              >
                                {t.name} ({t.playersCount}/12 vagas)
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              Nenhum time com vaga
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="flex gap-2 mt-4">
              <Button
                onClick={handleReject}
                variant="outline"
                disabled={!selected || selected.status !== "Pendente"}
                className="cursor-pointer"
              >
                Rejeitar
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-pink text-white hover:bg-hover-pink cursor-pointer"
                disabled={
                  !selected ||
                  selected.status !== "Pendente" ||
                  (selected.mode === "individual" && !selected.teamId)
                }
              >
                Aceitar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
