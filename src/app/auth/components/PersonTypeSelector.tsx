import { Label } from "./Label";

interface PersonTypeSelectorProps {
  personType: string;
  setPersonType: (personType: string) => void;
}

export function PersonTypeSelector({ personType, setPersonType, }: PersonTypeSelectorProps) {

  function handlePersonTypeChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setPersonType(ev.target.value);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <input
          type="radio"
          id="pessoaFisica"
          name="tipoPessoa"
          value="Pessoa Física"
          onChange={handlePersonTypeChange}
          checked={personType === "Pessoa Física"}
        />
        <Label htmlFor="pessoaFisica">Pessoa Física</Label>
      </div>

      <div className="flex items-center gap-1">
        <input
          type="radio"
          id="pessoaJuridica"
          name="tipoPessoa"
          value="Pessoa Jurídica"
          onChange={handlePersonTypeChange}
          checked={personType === "Pessoa Jurídica"}
        />
        <Label htmlFor="pessoaJuridica">Pessoa Jurídica</Label>
      </div>
    </div>
  );
}
