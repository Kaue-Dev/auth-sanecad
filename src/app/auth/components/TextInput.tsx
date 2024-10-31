type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean;
}

export const TextInput = ({ isInvalid = false, ...props }: TextInputProps) => {
  return (
    <input 
      {...props} 
      className={`w-full h-10 bg-zinc-200 border outline-none px-4 text-base transition-all
        ${isInvalid ? 'border-red-500 animate-shake' : 'border-zinc-300'}`}
    />
  )
}
