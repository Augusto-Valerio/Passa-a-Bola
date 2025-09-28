import { useState, useRef } from "react";
import { AddPlayers } from "./AddPlayer";
import { FiUser } from "react-icons/fi";

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
  const [position, setPosition] = useState("");
  const [leg, setLeg] = useState("");
  const [team, setTeam] = useState("");

  const makeInitialPlayers = () =>
    Array.from({ length: 12 }).map(() => ({
      avatar: null,
      avatarFile: null,
      name: "",
      username: "",
    }));

  const [players, setPlayers] = useState(makeInitialPlayers());

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
    setPosition("");
    setLeg("");
    setTeam("");
    setPlayers(makeInitialPlayers());
  };

  return (
    <form className="flex flex-col items-center gap-[14px] mx-auto lg:w-full lg:max-w-[335px] lg:mx-0 lg:ml-auto">
      <h1 className="heading-form">Inscreva-se</h1>

      <div id="input-wrapper" className="flex flex-col lg:w-full mt-4">
        {/* Nome */}
        <label htmlFor="name" className="relative mb-5">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text"
            }
          >
            Nome completo
          </span>
        </label>

        {/* Email */}
        <label htmlFor="email" className="relative mb-5">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2 "
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text"
            }
          >
            E-mail para contato
          </span>
        </label>

        {/* Telefone */}
        <label htmlFor="phone" className="relative mb-5">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text"
            }
          >
            Telefone
          </span>
        </label>

        {/* CPF */}
        <label htmlFor="cpf" className="relative mb-10">
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text whitespace-nowrap"
            }
          >
            CPF
          </span>
        </label>

        <p className="form-caption lg:text-xs mb-11 lg:max-w-[292px]">
          Seus dados estão seguros. Use o formulário para começar seu cadastro
          com tranquilidade.
        </p>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="py-[12px] rounded-[20px] bg-pink text-white button-text button-form cursor-pointer w-full hover:bg-hover-pink">
                Continuar
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Inscreva-se para o campeonato</DialogTitle>
                <DialogDescription>
                  Digite todas as suas informações
                </DialogDescription>
              </DialogHeader>

              {/* Informações da jogadora */}
              <div className="flex justify-center">
                <div
                  className="cursor-pointer"
                  onClick={() => avatarInputRef.current.click()}
                >
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="Avatar"
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

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <Label htmlFor="name-1">Nome completo</Label>
                  </div>
                  <Input
                    id="name-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Marcela Dantas"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email-1">E-mail para contato</Label>
                  <Input
                    id="email-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@example.com"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="phone-1">Telefone</Label>
                  <Input
                    id="phone-1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 98323-0202"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="cpf-1">CPF</Label>
                  <Input
                    id="cpf-1"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="123.456.789-12"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label>Escolha a sua posição</Label>
                    <Select value={position} onValueChange={setPosition}>
                      <SelectTrigger className="w-[100%] cursor-pointer">
                        <SelectValue placeholder="Posição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g" className="cursor-pointer">
                          Goleira
                        </SelectItem>
                        <SelectItem value="zag" className="cursor-pointer">
                          Zagueira
                        </SelectItem>
                        <SelectItem value="le" className="cursor-pointer">
                          Lateral Esquerda
                        </SelectItem>
                        <SelectItem value="ld" className="cursor-pointer">
                          Lateral Direita
                        </SelectItem>
                        <SelectItem value="me" className="cursor-pointer">
                          Meia Esquerda
                        </SelectItem>
                        <SelectItem value="md" className="cursor-pointer">
                          Meia Direita
                        </SelectItem>
                        <SelectItem value="ata" className="cursor-pointer">
                          Atacante
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label>Perna dominante</Label>
                    <Select value={leg} onValueChange={setLeg}>
                      <SelectTrigger className="w-[100%] cursor-pointer">
                        <SelectValue placeholder="Perna" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="e" className="cursor-pointer">
                          Esquerda
                        </SelectItem>
                        <SelectItem value="d" className="cursor-pointer">
                          Direita
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Informações do time */}
                <div className="flex flex-col gap-3 border-t-2 mt-4">
                  <DialogHeader>
                    <DialogTitle className="mt-4">
                      Inscreva o seu time
                    </DialogTitle>
                    <DialogDescription>
                      Digite todas as informações do seu time.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-3">
                    <Label htmlFor="team-logo">Logotipo do time</Label>
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

                  <div className="grid gap-3">
                    <Label htmlFor="team-1">Nome do time</Label>
                    <Input
                      id="team-1"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      placeholder="Ex: Wolves"
                    />
                  </div>

                  <div className="grid gap-3 sm:gap-x-21 sm:grid-cols-2 sm:place-self-start">
                    {players.map((p, idx) => (
                      <AddPlayers
                        key={idx}
                        index={idx}
                        player={p}
                        onUpdate={updatePlayer}
                      />
                    ))}
                  </div>
                </div>
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
                <Button
                  type="submit"
                  className=" bg-pink text-white hover:bg-hover-pink cursor-pointer"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </form>
  );
}
