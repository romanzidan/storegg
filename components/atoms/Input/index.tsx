import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
}

export default function Input(props: InputProps) {
  const { label, ...nativeProps } = props;
  return (
    <>
      <label className="form-label text-lg fw-medium color-palette-1 mb-10">{label}</label>
      <input
        className="form-control rounded-pill text-lg"
        placeholder="Enter your name"
        type="text"
        name="name"
        aria-describedby="name"
        {...nativeProps}
      />
    </>
  );
}
