import { Cat } from '../../api/types';
import './CatCard.css';
import { Trash2 as IconTrash2 } from 'react-feather';
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
      <div className="cat__tail" />

      <h2 className="cat__name">{cat.name}</h2>

      <p className="cat__data">Owner: {cat.owner.login}</p>

      <p className="cat__data">Age: {cat.age}</p>

      <p className="cat__data">Breed: {cat.breed}</p>

      <div className="cat__actions">
        {canChange && (
          <button
            className="icon-button"
            title="Edit"
            onClick={() => onEdit(cat)}
          >
            <IconEdit className="cat__action-icon" />
          </button>
        )}

        {canChange && (
          <button
            className="icon-button"
            title="Delete"
            onClick={() => onDelete(cat.id)}
          >
            <IconTrash2 className="cat__action-icon" />
          </button>
        )}
      </div>
    </div>
  );
}

export default CatCard;
