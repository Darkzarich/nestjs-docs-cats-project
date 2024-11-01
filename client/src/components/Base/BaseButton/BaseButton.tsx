import './BaseButton.css';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

function BaseButton({
  children,
  type = 'button',
  onClick,
  disabled,
  className,
}: Props) {
  return (
    <button
      type={type}
      className={`base-button ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default BaseButton;
