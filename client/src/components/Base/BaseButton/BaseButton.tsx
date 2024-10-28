import './BaseButton.css';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

function BaseButton({ children, onClick, disabled, className }: Props) {
  return (
    <button
      className={`base-button ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default BaseButton;
