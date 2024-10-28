import { Cat } from '../types';

type Props = {
  cat: Cat;
  onDelete: (id: string) => void;
};

function CatCard({ cat, onDelete }: Props) {
  return (
    <div className="cat">
      <button
        className="button delete-button"
        title="Delete"
        onClick={() => onDelete(cat.id)}
      >
        X
      </button>

      <h2>{cat.name}</h2>

      <p>Age: {cat.age}</p>

      <p>Breed: {cat.breed}</p>
    </div>
  );
}

export default CatCard;
