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
import { FiUser, FiEdit2, FiCheck } from "react-icons/fi";

export function AddPlayer({ index, player = {}, onUpdate }) {
  const avatarInputRef = useRef(null);

  const [avatar, setAvatar] = useState(player.avatarFile || null);
  const [name, setName] = useState(player.name || "");
  const [email, setEmail] = useState(player.email || "");
  const [phone, setPhone] = useState(player.phone || "");
  const [cpf, setCpf] = useState(player.cpf || "");
  const [shirt, setShirt] = useState(player.shirt || "");
  const [position, setPosition] = useState(player.position || "");
  const [leg, setLeg] = useState(player.leg || "");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    shirt: "",
    position: "",
    leg: "",
  });

  const [isValid, setIsValid] = useState(false);

  // validações automáticas
  useEffect(() => {
    const emailValid =
      email.includes("@") && email.split("@")[1]?.includes(".");
    const phoneDigits = phone.replace(/\D/g, "");
    const cpfDigits = cpf.replace(/\D/g, "");
    const shirtDigits = shirt.replace(/\D/g, "");

    const newErrors = {
      name: !name.trim() ? "*" : "",
      email: !email.trim() ? "*" : !emailValid ? "Email inválido" : "",
      phone: !phone.trim()
        ? "*"
        : phoneDigits.length !== 11
        ? "Telefone incompleto"
        : "",
      cpf: !cpf.trim() ? "*" : cpfDigits.length !== 11 ? "CPF incompleto" : "",
      shirt: !shirt.trim() ? "*" : "",
      position: !position.trim() ? "*" : "",
      leg: !leg.trim() ? "*" : "",
    };

    setErrors(newErrors);

    const valid = Object.values(newErrors).every((msg) => msg === "");
    setIsValid(valid);
  }, [name, email, phone, cpf, shirt, position, leg]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
    onUpdate(index, { ...player, avatarFile: file });
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
    if (avatarInputRef.current) avatarInputRef.current.value = null;

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

  // máscaras automáticas
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    setPhone(value);
  };

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const handleShirtChange = (e) => {
    // Aceita apenas números
    const value = e.target.value.replace(/\D/g, "");
    setShirt(value);
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

          <div className="flex justify-center mb-4">
            <div
              className="cursor-pointer"
              onClick={() => avatarInputRef.current.click()}
            >
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar jogadora"
                  className="rounded-full w-32 h-32 object-cover"
                />
              ) : (
                <FiUser size={150} className="bg-off-white rounded-full p-4" />
              )}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4">
            {/* Nome */}
            <div className="grid gap-3">
              <Label>
                Nome Completo{" "}
                {errors.name ? (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                ) : (
                  <FiCheck className="text-green-500" />
                )}
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Marcela Silva"
              />
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label>
                E-mail{" "}
                {errors.email ? (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                ) : (
                  <FiCheck className="text-green-500" />
                )}
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@example.com"
              />
            </div>

            {/* Telefone */}
            <div className="grid gap-3">
              <Label>
                Telefone{" "}
                {errors.phone ? (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
                ) : (
                  <FiCheck className="text-green-500" />
                )}
              </Label>
              <Input
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(11) 98323-0202"
                maxLength={15}
              />
            </div>

            {/* CPF */}
            <div className="grid gap-3">
              <Label>
                CPF{" "}
                {errors.cpf ? (
                  <span className="text-red-500 text-sm">{errors.cpf}</span>
                ) : (
                  <FiCheck className="text-green-500" />
                )}
              </Label>
              <Input
                value={cpf}
                onChange={handleCpfChange}
                placeholder="123.456.789-12"
                maxLength={14}
              />
            </div>

            {/* Camisa */}
            <div className="grid gap-3">
              <Label>
                Número da camisa{" "}
                {errors.shirt ? (
                  <span className="text-red-500 text-sm">{errors.shirt}</span>
                ) : (
                  <FiCheck className="text-green-500" />
                )}
              </Label>
              <Input
                value={shirt}
                onChange={handleShirtChange}
                placeholder="Ex: 10"
                inputMode="numeric"
              />
            </div>

            {/* Seletores */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label>
                  Escolha a posição{" "}
                  {errors.position ? (
                    <span className="text-red-500 text-sm">
                      {errors.position}
                    </span>
                  ) : (
                    <FiCheck className="text-green-500" />
                  )}
                </Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger className="cursor-pointer w-[100%]">
                    <SelectValue placeholder="Posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="Goleira">
                      Goleira
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Zagueira">
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
                    <SelectItem className="cursor-pointer" value="Meia Direita">
                      Meia Direita
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Atacante">
                      Atacante
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label>
                  Perna dominante{" "}
                  {errors.leg ? (
                    <span className="text-red-500 text-sm">{errors.leg}</span>
                  ) : (
                    <FiCheck className="text-green-500" />
                  )}
                </Label>
                <Select value={leg} onValueChange={setLeg}>
                  <SelectTrigger className="cursor-pointer w-[100%]">
                    <SelectValue placeholder="Perna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="Esquerda">
                      Esquerda
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Direita">
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
              onClick={handleCancel}
              className="cursor-pointer"
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
                Salvar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
