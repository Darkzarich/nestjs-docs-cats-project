import BaseInput, { useInput } from '../Base/BaseInput';
import BaseModal from '../Base/BaseModal';
import BaseButton from '../Base/BaseButton/BaseButton';
import { Cat } from '../../types';
import './AddCatModal.css';

type Props = {
  isShow?: boolean;
  onClose: () => void;
  onSubmit: (cat: Omit<Cat, 'id'>) => void;
};

function AddCatModal({ isShow, onClose, onSubmit }: Props) {
  const { value: name, onChange: onNameChange } = useInput('');
  const { value: age, onChange: onAgeChange } = useInput('1');
  const { value: breed, onChange: onBreedChange } = useInput('');

  const handleSave = () => {
    onSubmit({ name, age: parseInt(age), breed });
    onClose();
  };

  return (
    <BaseModal isShow={isShow} title={`Add a cat`} onClose={onClose}>
      <div className="add-cat-modal__fields">
        <BaseInput label="Name" value={name} onChange={onNameChange} />

        <BaseInput
          label="Age"
          type="number"
          value={age}
          onChange={onAgeChange}
        />

        <BaseInput label="Breed" value={breed} onChange={onBreedChange} />
      </div>

      <div className="add-cat-modal__actions">
        <BaseButton onClick={handleSave} disabled={!name || !age || !breed}>
          Finish
        </BaseButton>

        <BaseButton onClick={onClose}>Cancel</BaseButton>
      </div>
    </BaseModal>
  );
}

export default AddCatModal;
