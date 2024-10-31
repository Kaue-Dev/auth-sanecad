import { Label } from "./Label";
import { TextInput } from "./TextInput";

interface PersonTypeInputProps {
  id: string;
  label: string;
  setState: (value: string) => void;
  value: string;
  isInvalid: boolean;
  errorMessage?: string;
}

export function PersonTypeInput ({
  id,
  label,
  setState,
  value,
  isInvalid,
  errorMessage,
}: PersonTypeInputProps) {

  return (
    <div>
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>{label}</Label>
        <TextInput
          type="text"
          id={id}
          onChange={(ev) => setState(ev.target.value)}
          value={value}
          isInvalid={isInvalid}
          required
        />
      </div>
      {isInvalid && (
        <p className="text-red-500 text-sm mt-1 ml-1">{errorMessage}</p>
      )}
    </div>
  );
}
