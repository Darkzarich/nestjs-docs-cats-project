import './BaseInput.css';

type Props = {
  value?: string;
  label?: string;
  type?: 'text' | 'number';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BaseInput({ value, onChange, label, type = 'text' }: Props) {
  return (
    <label className="base-input">
      <div className="base-input__label">{label}</div>
      <input
        className="base-input__input"
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default BaseInput;
