import { PlusSquare as IconPlusSquare } from 'react-feather';

import './CatCard.css';

type Props = {
  onClick?: () => void;
  isDisabled?: boolean;
};

function CatCardPlaceholder({ onClick, isDisabled }: Props) {
  return (
    <div className="cat cat--placeholder">
      <IconPlusSquare
        onClick={onClick}
        className={`icon-button ${isDisabled ? 'icon-button--disabled' : ''}`}
        size="48px"
        color={isDisabled ? 'var(--color-disabled)' : 'var(--color-primary)'}
      />
    </div>
  );
}

export default CatCardPlaceholder;
