interface InputProps{
    label: string;
}

export default function Input(props: InputProps) {
  const { label, ...nativeProps } = props;
  return (
    <>
      <label className="form-label text-lg fw-medium color-palette-1 mb-10">{label}</label>
      <input
        type="tel"
        className="form-control rounded-pill text-lg"
        {...nativeProps}
      />
    </>
  );
}
