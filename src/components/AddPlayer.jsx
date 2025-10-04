import { useRef, useState, useEffect } from "react";

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
import { FiUser } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

export function AddPlayer({ index, player = {}, onUpdate }) {
  const avatarInputRef = useRef(null);

  // estados locais (baseados no que já tiver em player)
  const [avatar, setAvatar] = useState(player.avatarFile || null);
  const [name, setName] = useState(player.name || "");
  const [email, setEmail] = useState(player.email || "");
  const [phone, setPhone] = useState(player.phone || "");
  const [cpf, setCpf] = useState(player.cpf || "");
  const [shirt, setShirt] = useState(player.shirt || "");
  const [position, setPosition] = useState(player.position || "");
  const [leg, setLeg] = useState(player.leg || "");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid =
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      cpf.trim() !== "" &&
      shirt.trim() !== "" &&
      position.trim() !== "" &&
      leg.trim() !== "";

    setIsValid(valid);
  }, [name, email, phone, cpf, shirt, position, leg]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);

    onUpdate(index, {
      ...player,
      avatarFile: file,
    });
  };

  const handleSave = () => {
    onUpdate(index, {
      avatarFile: avatar,
      name,
      email,
      phone,
      cpf,
      shirt,
      position,
      leg,
    });
  };

  const handleCancel = () => {
    setAvatar(null);
    setName("");
    setEmail("");
    setPhone("");
    setCpf("");
    setShirt("");
    setPosition("");
    setLeg("");

    if (avatarInputRef.current) {
      avatarInputRef.current.value = null;
    }

    onUpdate(index, {
      avatarFile: null,
      name: "",
      email: "",
      phone: "",
      cpf: "",
      shirt: "",
      position: "",
      leg: "",
    });
  };

  return (
    <div className="flex gap-2 items-center max-w-[13.25rem]">
      {/* Avatar pequeno */}
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer overflow-hidden shrink-0"
        onClick={() => avatarInputRef.current.click()}
      >
        {player?.avatarFile ? (
          <img
            src={URL.createObjectURL(player.avatarFile)}
            alt={`player-${index}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <FiUser className="text-gray-700" />
        )}
      </div>

      {/* Input file escondido */}
      <input
        type="file"
        accept="image/*"
        ref={avatarInputRef}
        onChange={handleAvatarChange}
        className="hidden"
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="truncate w-[13.4375rem] text-left cursor-pointer"
          >
            {player?.name ? (
              <>
                <span className="truncate">{player.name}</span>
                <FiEdit2 className="ml-2 shrink-0" />
              </>
            ) : (
              "Adicionar jogadora"
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[26.5625rem] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {player?.name ? "Editar Jogadora" : "Adicionar Jogadora"}
            </DialogTitle>
            <DialogDescription>
              Digite as informações da jogadora
            </DialogDescription>
          </DialogHeader>

          {/* Avatar grande */}
          <div className="flex justify-center mb-4">
            <div
              className="cursor-pointer"
              onClick={() => avatarInputRef.current.click()}
            >
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar para seleção de adicionar jogadoras"
                  className="rounded-full w-32 h-32 object-cover"
                />
              ) : (
                <FiUser size={150} className="bg-off-white rounded-full p-4" />
              )}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Nome Completo</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Marcela Silva"
              />
            </div>

            <div className="grid gap-3">
              <Label>E-mail</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@example.com"
              />
            </div>

            <div className="grid gap-3">
              <Label>Telefone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 98323-0202"
              />
            </div>

            <div className="grid gap-3">
              <Label>CPF</Label>
              <Input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="123.456.789-12"
              />
            </div>

            <div className="grid gap-3">
              <Label>Numero da camisa</Label>
              <Input
                value={shirt}
                onChange={(e) => setShirt(e.target.value)}
                placeholder="Ex: 10"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label>Escolha a posição</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger className="w-[100%] cursor-pointer">
                    <SelectValue placeholder="Posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Goleira" className="cursor-pointer">
                      Goleira
                    </SelectItem>
                    <SelectItem value="Zagueira" className="cursor-pointer">
                      Zagueira
                    </SelectItem>
                    <SelectItem
                      value="Lateral Esquerda"
                      className="cursor-pointer"
                    >
                      Lateral Esquerda
                    </SelectItem>
                    <SelectItem
                      value="Lateral Direita"
                      className="cursor-pointer"
                    >
                      Lateral Direita
                    </SelectItem>
                    <SelectItem
                      value="Meia Esquerda"
                      className="cursor-pointer"
                    >
                      Meia Esquerda
                    </SelectItem>
                    <SelectItem value="Meia Direita" className="cursor-pointer">
                      Meia Direita
                    </SelectItem>
                    <SelectItem value="Atacante" className="cursor-pointer">
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
                    <SelectItem value="Esquerda" className="cursor-pointer">
                      Esquerda
                    </SelectItem>
                    <SelectItem value="Direita" className="cursor-pointer">
                      Direita
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleCancel}
            >
              Limpar
            </Button>
            <DialogClose asChild>
              <Button
                className={`bg-pink text-white hover:bg-hover-pink cursor-pointer ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSave}
                disabled={!isValid}
              >
                Enviar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
