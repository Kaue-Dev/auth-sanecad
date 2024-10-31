interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label {...props}>{children}</label>
  )
}
