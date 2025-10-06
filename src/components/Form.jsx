import { supabase } from "@/lib/supabase";

import { useState, useRef, useEffect } from "react";
import { AddPlayer } from "./AddPlayer";
import { FiUser, FiCheck } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Form() {
  const [avatar, setAvatar] = useState(null);
  const [teamLogo, setTeamLogo] = useState(null);
  const avatarInputRef = useRef(null);
  const teamInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [shirt, setShirt] = useState("");
  const [position, setPosition] = useState("");
  const [leg, setLeg] = useState("");
  const [team, setTeam] = useState("");

  const [canContinue, setCanContinue] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [individualExperience, setIndividualExperience] = useState(false);
  const [teamExperience, setTeamExperience] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    cpf: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });

  const [dbError, setDbError] = useState("");

  const checkIfExists = async () => {
    if (!email && !phone && !cpf) return false;

    let filters = [];

    if (email) filters.push(`email.eq.${email}`);
    if (phone) {
      const digits = phone.replace(/\D/g, "");
      filters.push(`phone.eq.${digits}`);
    }
    if (cpf) {
      const digits = cpf.replace(/\D/g, "");
      filters.push(`cpf.eq.${digits}`);
    }

    const orString = filters.join(",");

    const { data, error } = await supabase
      .from("inscricoes")
      .select("id")
      .or(orString)
      .limit(1);

    if (error) {
      console.error("Erro ao verificar dados existentes:", error);
      return false;
    }

    return data && data.length > 0;
  };

  const makeInitialPlayers = () =>
    Array.from({ length: 11 }).map(() => ({
      avatar: null,
      avatarFile: null,
      name: "",
      username: "",
    }));

  const [players, setPlayers] = useState(makeInitialPlayers());

  const [mode, setMode] = useState(null);

  useEffect(() => {
    const phoneDigits = phone.replace(/\D/g, "");
    const cpfDigits = cpf.replace(/\D/g, "");
    const emailValid =
      email.includes("@") && email.split("@")[1]?.includes(".");

    let newErrors = { name: "", email: "", phone: "", cpf: "" };

    if (touched.name && !name.trim()) newErrors.name = "Nome é obrigatório";

    if (touched.email && !email.trim()) newErrors.email = "Email é obrigatório";
    else if (touched.email && !emailValid) newErrors.email = "Email inválido";

    if (touched.phone && !phone.trim())
      newErrors.phone = "Telefone é obrigatório";
    else if (touched.phone && phoneDigits.length !== 11)
      newErrors.phone = "Telefone incompleto";

    if (touched.cpf && !cpf.trim()) newErrors.cpf = "CPF é obrigatório";
    else if (touched.cpf && cpfDigits.length !== 11)
      newErrors.cpf = "CPF incompleto";

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");

    if (!touched.name && !touched.email && !touched.phone && !touched.cpf) {
      setCanContinue(false);
      return;
    }

    const validateUnique = async () => {
      const exists = await checkIfExists();
      if (exists) {
        setDbError("CPF, email ou telefone já cadastrado.");
      } else {
        setDbError("");
      }
      setCanContinue(!hasErrors && !exists);
    };

    validateUnique();
  }, [name, email, phone, cpf, touched]);

  useEffect(() => {
    const isIndividualValid =
      shirt.trim() !== "" && position.trim() !== "" && leg.trim() !== "";

    const validPlayersCount = players.filter(
      (p) => p.name.trim() !== ""
    ).length;

    const isTeamValid =
      isIndividualValid &&
      team.trim() !== "" &&
      teamLogo !== null &&
      validPlayersCount >= 6;

    if (mode === "individual") {
      setCanSubmit(isIndividualValid);
    } else if (mode === "team") {
      setCanSubmit(isTeamValid);
    } else {
      setCanSubmit(false);
    }
  }, [shirt, position, leg, team, players, mode, teamLogo]);

  const [openStep, setOpenStep] = useState(1);

  const uploadFile = async (file, folder = "") => {
    if (!file) return null;
    const filename = `${Date.now()}-${file.name}`;
    const path = folder ? `${folder}/${filename}` : filename;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(path, file, { cacheControl: "0", upsert: false });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    const { data: publicData } = supabase.storage
      .from("uploads")
      .getPublicUrl(data.path);

    return publicData?.publicUrl ?? null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let avatarUrl = null;
      if (avatar) {
        avatarUrl = await uploadFile(avatar, "avatars");
      }

      let teamLogoUrl = null;
      if (teamLogo) {
        teamLogoUrl = await uploadFile(teamLogo, "team-logos");
      }
      let playersData = null;
      if (mode === "team") {
        const validPlayers = players.filter(
          (p) => p.name && p.name.trim() !== ""
        );
        playersData = await Promise.all(
          validPlayers.map(async (p) => {
            let playerAvatarUrl = null;
            if (p.avatarFile) {
              try {
                playerAvatarUrl = await uploadFile(p.avatarFile, `players`);
              } catch (err) {
                console.warn("erro no upload da jogadora", p.name, err);
              }
            }

            return {
              name: p.name || "",
              email: p.email || "",
              phone: p.phone || "",
              cpf: p.cpf || "",
              shirt: p.shirt || "",
              position: p.position || "",
              leg: p.leg || "",
              avatar: playerAvatarUrl,
            };
          })
        );
      }

      const insertPayload = {
        mode,
        name,
        email,
        phone: phone.replace(/\D/g, ""),
        cpf: cpf.replace(/\D/g, ""),
        shirt,
        position,
        leg,
        team: mode === "team" ? team : null,
        players: mode === "team" ? playersData : null,
        avatar: avatarUrl,
        team_logo: teamLogoUrl,
        experience_professional:
          mode === "individual" ? individualExperience : teamExperience,
        status: "Pendente",
      };

      const { data: inserted, error: insertError } = await supabase
        .from("inscricoes")
        .insert([insertPayload])
        .select();

      if (insertError) {
        console.error("Erro ao salvar inscrição:", insertError);
        toast.error("Erro ao enviar inscrição. Veja console para detalhes.");
        return;
      }

      toast.success("Inscrição enviada com sucesso!");
      handleMainCancel();
    } catch (err) {
      console.error("Erro no submit:", err);
      toast.error("Erro ao processar. Verifique o console.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
  };

  const handleTeamLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTeamLogo(file);
  };

  const updatePlayer = (index, newData) => {
    setPlayers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...newData };
      return next;
    });
  };

  const handleMainCancel = () => {
    setAvatar(null);
    setTeamLogo(null);
    setName("");
    setEmail("");
    setPhone("");
    setCpf("");
    setShirt("");
    setPosition("");
    setLeg("");
    setTeam("");
    setPlayers(makeInitialPlayers());
    setOpenStep(1);
    setMode(null);
  };

  return (
    <section className="flex flex-col items-center gap-[0.875rem] mx-auto lg:w-full lg:max-w-[20.9375rem] lg:mx-0 lg:ml-auto">
      <h1 className="heading-form">Inscreva-se</h1>

      <div id="input-wrapper" className="flex flex-col lg:w-full mt-4">
        {/* Nome */}
        <label htmlFor="name" className="relative mb-5">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span className="absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text">
            Nome completo
          </span>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>

        {/* Email */}
        <label htmlFor="email" className="relative mb-5">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!touched.email)
                setTouched((prev) => ({ ...prev, email: true }));
            }}
            className="peer w-full border-b border-stroke-color outline-0 pt-2 "
          />
          <span className="absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text">
            E-mail para contato
          </span>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </label>

        {/* Telefone */}
        <label htmlFor="phone" className="relative mb-5">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder=" "
            value={phone}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 11) value = value.slice(0, 11);

              value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
              value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2");

              setPhone(value);
              if (!touched.phone)
                setTouched((prev) => ({ ...prev, phone: true }));
            }}
            maxLength={15}
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span className="absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text">
            Telefone
          </span>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </label>

        {/* CPF */}
        <label htmlFor="cpf" className="relative mb-10">
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder=" "
            value={cpf}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 11) value = value.slice(0, 11);

              value = value.replace(/(\d{3})(\d)/, "$1.$2");
              value = value.replace(/(\d{3})(\d)/, "$1.$2");
              value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

              setCpf(value);
              if (!touched.cpf) setTouched((prev) => ({ ...prev, cpf: true }));
            }}
            maxLength={14}
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span className="absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text whitespace-nowrap">
            CPF
          </span>
          {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
        </label>

        <p className="form-caption lg:text-xs mb-11 lg:max-w-[18.25rem]">
          Seus dados estão seguros. Use o formulário para começar seu cadastro
          com tranquilidade.
        </p>

        <Button
          onClick={() => {
            setTouched({
              name: true,
              email: true,
              phone: true,
              cpf: true,
            });
            setName((p) => p); // força revalidação
            setEmail((p) => p);
            setPhone((p) => p);
            setCpf((p) => p);

            if (canContinue) {
              setOpenStep(1); // reseta pro primeiro passo
              setDialogOpen(true);
            } else {
              toast.error(
                "Preencha todos os campos obrigatórios antes de continuar."
              );
            }
          }}
          className="py-[1.375rem] rounded-[1.25rem] bg-pink hover:bg-hover-pink cursor-pointer text-white w-full"
        >
          Continuar
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {dbError && (
            <p className="text-red-500 text-sm mb-2 text-center">{dbError}</p>
          )}

          <DialogContent className="sm:max-w-[39.0625rem] max-h-[90vh] overflow-y-auto">
            {openStep === 1 && (
              <>
                <DialogHeader className="place-self-center">
                  <DialogTitle>Você deseja se inscrever como?</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    className="bg-pink text-white hover:bg-hover-pink cursor-pointer"
                    onClick={() => {
                      setMode("individual");
                      setOpenStep(2);
                    }}
                  >
                    Individual
                  </Button>
                  <Button
                    className="bg-pink text-white hover:bg-hover-pink cursor-pointer"
                    onClick={() => {
                      setMode("team");
                      setOpenStep(2);
                    }}
                  >
                    Inscrever meu time
                  </Button>
                </div>
              </>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {openStep === 2 && (
                <>
                  <DialogHeader>
                    <DialogTitle>Inscreva-se para o campeonato</DialogTitle>
                    <DialogDescription>
                      Digite todas as suas informações
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4">
                    {/* Informações da jogadora */}
                    <div className="flex justify-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => avatarInputRef.current.click()}
                      >
                        {avatar ? (
                          <img
                            src={URL.createObjectURL(avatar)}
                            alt="Avatar para a jogadora dentro do form"
                            className="rounded-full w-32 h-32 object-cover"
                          />
                        ) : (
                          <FiUser
                            size={150}
                            className="bg-off-white rounded-full p-4"
                          />
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={avatarInputRef}
                      onChange={handleAvatarChange}
                    />

                    <div className="grid gap-3">
                      <Label htmlFor="name-1">
                        Nome completo{" "}
                        {errors.name ? (
                          <span className="text-red-500">*</span>
                        ) : name.trim() !== "" ? (
                          <FiCheck className="text-green-500" />
                        ) : null}
                      </Label>
                      <Input
                        id="name-1"
                        value={name}
                        disabled
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="email-1">
                        E-mail para contato{" "}
                        <Label
                          htmlFor="email-1"
                          className="flex items-center gap-1"
                        >
                          E-mail para contato
                          {errors.email ? (
                            <span className="text-red-500">*</span>
                          ) : email.trim() !== "" ? (
                            <FiCheck className="text-green-500" />
                          ) : null}
                        </Label>
                      </Label>
                      <Input
                        id="email-1"
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="phone-1">
                        Telefone{" "}
                        <Label
                          htmlFor="email-1"
                          className="flex items-center gap-1"
                        >
                          E-mail para contato
                          {errors.phone ? (
                            <span className="text-red-500">*</span>
                          ) : email.trim() !== "" ? (
                            <FiCheck className="text-green-500" />
                          ) : null}
                        </Label>
                      </Label>
                      <Input
                        id="phone-1"
                        value={phone}
                        disabled
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="cpf-1">
                        CPF{" "}
                        <Label
                          htmlFor="email-1"
                          className="flex items-center gap-1"
                        >
                          E-mail para contato
                          {errors.cpf ? (
                            <span className="text-red-500">*</span>
                          ) : email.trim() !== "" ? (
                            <FiCheck className="text-green-500" />
                          ) : null}
                        </Label>
                      </Label>
                      <Input
                        id="cpf-1"
                        value={cpf}
                        disabled
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="shirt-1">
                        Número da camisa{" "}
                        {shirt.trim() === "" ? (
                          <span className="text-red-500">*</span>
                        ) : (
                          <FiCheck className="text-green-500" />
                        )}
                      </Label>
                      <Input
                        id="shirt-1"
                        value={shirt}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(/\D/g, "");
                          setShirt(onlyNumbers);
                        }}
                        placeholder="Ex: 10"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <Label>
                          Escolha a sua posição{" "}
                          {position === "" ? (
                            <span className="text-red-500">*</span>
                          ) : (
                            <FiCheck className="text-green-500" />
                          )}
                        </Label>
                        <Select value={position} onValueChange={setPosition}>
                          <SelectTrigger className="w-[100%] cursor-pointer">
                            <SelectValue placeholder="Posição" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              className="cursor-pointer"
                              value="Goleira"
                            >
                              Goleira
                            </SelectItem>
                            <SelectItem
                              className="cursor-pointer"
                              value="Zagueira"
                            >
                              Zagueira
                            </SelectItem>
                            <SelectItem
                              className="cursor-pointer"
                              value="Lateral Esquerda"
                            >
                              Lateral Esquerda
                            </SelectItem>
                            <SelectItem
                              className="cursor-pointer"
                              value="Lateral Direita"
                            >
                              Lateral Direita
                            </SelectItem>
                            <SelectItem
                              className="cursor-pointer"
                              value="Meia Esquerda"
                            >
                              Meia Esquerda
                            </SelectItem>
                            <SelectItem
                              className="cursor-pointer"
                              value="Meia Direita"
                            >
                              Meia Direita
                            </SelectItem>
                            <SelectItem
                              className="cursor-pointer"
                              value="Atacante"
                            >
                              Atacante
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-3">
                        <Label>
                          Perna dominante{" "}
                          {leg === "" ? (
                            <span className="text-red-500">*</span>
                          ) : (
                            <FiCheck className="text-green-500" />
                          )}
                        </Label>
                        <Select value={leg} onValueChange={setLeg}>
                          <SelectTrigger className="w-[100%] cursor-pointer">
                            <SelectValue placeholder="Perna" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              className="cursor-pointer"
                              value="Esquerda"
                            >
                              Esquerda
                            </SelectItem>
                            <SelectItem
                              className="cursor-pointer"
                              value="Direta"
                            >
                              Direita
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {mode === "individual" && (
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="individual-experience"
                            checked={individualExperience}
                            onCheckedChange={(checked) =>
                              setIndividualExperience(checked)
                            }
                          />
                          <label htmlFor="individual-experience">
                            Você possui experiência profissional?
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Só mostra se for time */}
                    {mode === "team" && (
                      <div className="flex flex-col gap-3 border-t-2 mt-4">
                        <DialogHeader>
                          <DialogTitle className="mt-4">
                            Inscreva o seu time
                          </DialogTitle>
                          <DialogDescription>
                            Digite todas as informações do seu time.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-3 mt-2">
                          <Label htmlFor="team-logo">
                            Logotipo do time{" "}
                            {teamLogo === null ? (
                              <span className="text-red-500">*</span>
                            ) : (
                              <FiCheck className="text-green-500" />
                            )}
                          </Label>
                          <div
                            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-hover-pink transition-colors"
                            onClick={() => teamInputRef.current.click()}
                          >
                            {teamLogo ? (
                              <img
                                src={URL.createObjectURL(teamLogo)}
                                alt="Logo do time"
                                className="w-20 h-20 object-cover rounded-full"
                              />
                            ) : (
                              <>
                                <FiUser size={40} className="text-gray-400" />
                                <p className="text-gray-400 text-sm mt-2 text-center">
                                  Clique aqui para selecionar o logotipo
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={teamInputRef}
                            onChange={handleTeamLogoChange}
                          />
                        </div>

                        <div className="grid gap-3 mt-2">
                          <Label htmlFor="team-1">
                            Nome do time{" "}
                            {team.trim() === "" ? (
                              <span className="text-red-500">*</span>
                            ) : (
                              <FiCheck className="text-green-500" />
                            )}
                          </Label>
                          <Input
                            id="team-1"
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                            placeholder="Ex: Wolves"
                          />
                        </div>

                        <div className="grid gap-3 mt-2">
                          <Label>
                            Adicione jogadoras ao seu time{" "}
                            {players.filter((p) => p.name.trim() !== "")
                              .length < 6 ? (
                              <span className="text-red-500">*</span>
                            ) : (
                              <FiCheck className="text-green-500" />
                            )}
                          </Label>
                          <DialogDescription className="text-[0.80rem]">
                            Adicione no mínimo 6 jogadoras
                          </DialogDescription>
                          <div className="grid gap-3 sm:gap-x-21 sm:grid-cols-2 sm:place-self-start">
                            {players.map((p, idx) => (
                              <AddPlayer
                                key={idx}
                                index={idx}
                                player={p}
                                onUpdate={updatePlayer}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="team-experience"
                            checked={teamExperience}
                            onCheckedChange={(checked) =>
                              setTeamExperience(checked)
                            }
                            className="cursor-pointer"
                          />
                          <label htmlFor="team-experience">
                            Seu time contém alguém com experiência profissional?
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={handleMainCancel}
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="bg-pink text-white hover:bg-hover-pink cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Enviar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
