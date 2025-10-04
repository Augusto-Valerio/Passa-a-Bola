import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { FiUser } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

export default function JogadorasLista({ teamName }) {
  const [jogadoras, setJogadoras] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const [stats, setStats] = useState({ j: 0, g: 0, a: 0 });

  useEffect(() => {
    if (!selected) return;

    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("jogadora_stats")
        .select("*")
        .eq("email", selected.email)
        .eq("team", teamName)
        .single();

      if (error || !data) {
        setStats({ j: 0, g: 0, a: 0 });
      } else {
        setStats({ j: data.j, g: data.g, a: data.a });
      }
    };

    fetchStats();
  }, [selected]);

  useEffect(() => {
    const fetchInscricao = async () => {
      if (!teamName) return;

      const { data, error } = await supabase
        .from("inscricoes")
        .select("*")
        .eq("team", teamName)
        .single();

      if (error) {
        console.error("Erro ao buscar inscrição:", error);
        return;
      }

      if (data) {
        const playersArray = Array.isArray(data.players)
          ? data.players.map((p) => ({ ...p, shirt: p.shirt || "" }))
          : [];

        const allPlayers = [
          {
            name: data.name,
            email: data.email,
            avatar: data.avatar || null,
            shirt: data.shirt || "",
            phone: data.phone || "",
            cpf: data.cpf || "",
            position: data.position || "",
            leg: data.leg || "",
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

          {jogadora && (
            <Button
              onClick={() => {
                setSelected(jogadora);
                setEditData(jogadora);
                setTab("info");
                setIsEditing(false);
              }}
              className="text-xs bg-pink text-white hover:bg-hover-pink cursor-pointer"
            >
              Visualizar
            </Button>
          )}
        </div>
      ))}

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="sm:max-w-[32rem] max-h-[85vh] overflow-y-auto p-0">
          {selected && (
            <div className="flex flex-col w-full">
              {isEditing && (
                <div className="bg-red-600 text-white w-full flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-2">
                    <FiEdit size={18} />
                    <span className="font-antonio font-semibold text-sm tracking-wide">
                      Modo: Edição
                    </span>
                  </div>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-white text-red-600 hover:bg-gray-100 flex items-center gap-1 font-antonio text-sm z-10 cursor-pointer"
                  >
                    <FiEdit size={14} />
                    Sair
                  </Button>
                </div>
              )}

              {/* HEADER DA JOGADORA */}
              <div className="bg-off-white w-full pt-6 pb-[6px] px-4 flex flex-col items-center gap-4 rounded-t-lg">
                <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {selected.avatar ? (
                    <img
                      src={selected.avatar}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser size={50} className="text-gray-400" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-antonio">{selected.name}</h2>

                  <FiEdit
                    size={18}
                    onClick={() => setIsEditing(!isEditing)}
                    className="cursor-pointer text-gray-500 hover:text-black"
                  />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-8 text-lg font-antonio">
                    <span>J</span>
                    <span>G</span>
                    <span>A</span>
                  </div>

                  <div className="flex gap-12 text-lg font-antonio">
                    {isEditing ? (
                      <>
                        <Input
                          type="text"
                          value={stats.j}
                          onChange={(e) =>
                            setStats({
                              ...stats,
                              j: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-12 text-center"
                        />
                        <Input
                          type="text"
                          value={stats.g}
                          onChange={(e) =>
                            setStats({
                              ...stats,
                              g: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-12 text-center"
                        />
                        <Input
                          type="text"
                          value={stats.a}
                          onChange={(e) =>
                            setStats({
                              ...stats,
                              a: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-12 text-center"
                        />
                      </>
                    ) : (
                      <>
                        <span>{stats.j}</span>
                        <span>{stats.g}</span>
                        <span>{stats.a}</span>
                      </>
                    )}
                  </div>
                </div>

                <Tabs
                  value={tab}
                  onValueChange={setTab}
                  className="w-full mt-4"
                >
                  <TabsList className="grid grid-cols-2 place-self-center gap-1 ">
                    <TabsTrigger
                      value="matches"
                      className={`font-antonio font-light border-b-2 cursor-pointer ${
                        tab === "matches"
                          ? "border-black"
                          : "border-transparent"
                      }`}
                    >
                      Últimos Jogos
                    </TabsTrigger>
                    <TabsTrigger
                      value="info"
                      className={`font-antonio font-light border-b-2 cursor-pointer ${
                        tab === "info" ? "border-black" : "border-transparent"
                      }`}
                    >
                      Informações
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* CONTEÚDO DAS TABS */}
              <div className="p-6">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsContent value="matches">
                    <p className="text-center font-antonio text-gray-500">
                      Nenhum jogo recente.
                    </p>
                  </TabsContent>

                  <TabsContent value="info">
                    <div className="grid gap-3">
                      {[
                        { label: "Nome", key: "name" },
                        { label: "Email", key: "email" },
                        { label: "Telefone", key: "phone" },
                        { label: "CPF", key: "cpf" },
                        { label: "Camisa", key: "shirt" },
                        { label: "Posição", key: "position" },
                        { label: "Perna dominante", key: "leg" },
                      ].map(({ label, key }) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="font-antonio font-semibold">
                            {label}:
                          </span>
                          {isEditing ? (
                            <Input
                              value={editData[key] || ""}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  [key]: e.target.value,
                                })
                              }
                              className="w-[60%] text-right text-sm font-antonio"
                            />
                          ) : (
                            <span className="font-antonio">
                              {selected[key]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter className="px-6 pb-4 flex justify-between">
                {isEditing ? (
                  <Button
                    onClick={async () => {
                      let updateData = {};

                      if (selected.email === jogadoras[0].email) {
                        updateData = {
                          name: editData.name,
                          email: editData.email,
                          avatar: editData.avatar,
                          shirt: editData.shirt,
                          phone: editData.phone,
                          cpf: editData.cpf,
                          position: editData.position,
                          leg: editData.leg,
                        };
                      } else {
                        updateData = {
                          players: jogadoras
                            .filter((p) => p.email !== jogadoras[0].email)
                            .map((p) =>
                              p.email === selected.email ? editData : p
                            ),
                        };
                      }

                      const { error } = await supabase
                        .from("inscricoes")
                        .update(updateData)
                        .eq("team", teamName);

                      if (error) {
                        console.error("Erro ao salvar:", error);
                        return;
                      }

                      if (selected.email === jogadoras[0].email) {
                        setJogadoras((prev) => {
                          const updated = [...prev];
                          updated[0] = editData;
                          return updated;
                        });
                      } else {
                        setJogadoras((prev) =>
                          prev.map((p) =>
                            p.email === selected.email ? editData : p
                          )
                        );
                      }

                      if (selected.email !== editData.email) {
                        await supabase
                          .from("jogadora_stats")
                          .delete()
                          .eq("email", selected.email)
                          .eq("team", teamName);
                      }

                      
                      const { error: statsError } = await supabase
                        .from("jogadora_stats")
                        .upsert(
                          {
                            email: editData.email, 
                            team: teamName,
                            j: stats.j,
                            g: stats.g,
                            a: stats.a,
                            updated_at: new Date(),
                          },
                          { onConflict: ["email", "team"] }
                        );

                      if (statsError) {
                        console.error("Erro ao salvar stats:", statsError);
                        return;
                      }

                      setSelected(editData);
                      setIsEditing(false);

                      toast.success("Alterações salvas!");
                    }}
                    className="bg-pink text-white hover:bg-hover-pink cursor-pointer"
                  >
                    Salvar
                  </Button>
                ) : null}

                <Button
                  onClick={() => setSelected(null)}
                  variant="outline"
                  className="cursor-pointer"
                >
                  Fechar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
