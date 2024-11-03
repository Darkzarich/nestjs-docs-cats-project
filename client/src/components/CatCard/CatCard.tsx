import { Cat } from '../../api/types';
import './CatCard.css';
import { X as IconX } from 'react-feather';
import { Edit as IconEdit } from 'react-feather';

type Props = {
  cat: Cat;
  onDelete: (id: string) => void;
  onEdit: (cat: Cat) => void;
  canChange?: boolean;
};

function CatCard({ cat, onDelete, onEdit, canChange }: Props) {
  return (
    <div className="cat">
      <div className="cat__toolbar">
        {canChange && (
          <button
            className="icon-button"
            title="Edit"
            onClick={() => onEdit(cat)}
          >
            <IconEdit color="var(--color-primary)" />
          </button>
        )}

        {canChange && (
          <button
            className="icon-button"
            title="Delete"
            onClick={() => onDelete(cat.id)}
          >
            <IconX color="var(--color-error)" />
          </button>
        )}
      </div>

      <h2 className="cat__name">{cat.name}</h2>

      <p className="cat__data">
        <span className="cat__data-label">Owner:</span> {cat.owner.login}
      </p>

      <p className="cat__data">
        <span className="cat__data-label">Age:</span> {cat.age}
      </p>

      <p className="cat__data">
        <span className="cat__data-label">Breed:</span> {cat.breed}
      </p>
    </div>
  );
}

export default CatCard;
