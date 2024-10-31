import { useState } from "react";
import { Label } from "./Label";
import { TextInput } from "./TextInput";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  setPassword: (password: string) => void;
  password: string;
  id: string;
  label: string;
  isInvalid: boolean;
}

export function PasswordInput({
  setPassword,
  password,
  id,
  label,
  isInvalid,
}: PasswordInputProps) {
  
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <Label htmlFor={id}>{label}</Label>
      <TextInput
        type={showPassword ? "text" : "password"}
        id={id}
        onChange={(ev) => setPassword(ev.target.value)}
        value={password}
        required
        isInvalid={isInvalid}
      />
      <button
        type="button"
        className="absolute bottom-2 right-4"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <Eye className="text-zinc-400" size={20} />
        ) : (
          <EyeOff className="text-zinc-400" size={20} />
        )}
      </button>
    </div>
  );
}
