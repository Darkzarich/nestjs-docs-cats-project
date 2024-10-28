import './BaseModal.css';
import { X as IconX } from 'react-feather';

type Props = {
  isShow?: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
};

function BaseModal({ isShow, title, onClose, children }: Props) {
  if (!isShow) {
    return;
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          className="icon-button modal__close-button"
          title="Close"
          onClick={onClose}
        >
          <IconX />
        </button>

        <h1 className="modal__title">{title}</h1>

        {children}
      </div>
    </div>
  );
}

export default BaseModal;
