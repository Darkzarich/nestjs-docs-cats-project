import BaseInput, { useInput } from '../Base/BaseInput';
import BaseModal from '../Base/BaseModal';
import BaseButton from '../Base/BaseButton/BaseButton';
import { Cat } from '../../api/types';
import './AddCatModal.css';
import { createPortal } from 'react-dom';

type Props = {
  isShow?: boolean;
  onClose: () => void;
  onSubmit: (cat: Omit<Cat, 'id' | 'owner'>) => void;
};

function AddCatModal({ isShow, onClose, onSubmit }: Props) {
  const {
    value: name,
    onChange: onNameChange,
    setValue: setName,
  } = useInput('');

  const { value: age, onChange: onAgeChange, setValue: setAge } = useInput('0');

  const {
    value: breed,
    onChange: onBreedChange,
    setValue: setBreed,
  } = useInput('');

  const handleSave = () => {
    onSubmit({ name, age: parseInt(age), breed });

    setName('');
    setAge('0');
    setBreed('');

    onClose();
  };

  return createPortal(
    <BaseModal isShow={isShow} title={`Add a cat`} onClose={onClose}>
      <form>
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
          <BaseButton
            type="submit"
            onClick={handleSave}
            disabled={!name || !age || !breed}
          >
            Finish
          </BaseButton>

          <BaseButton onClick={onClose}>Cancel</BaseButton>
        </div>
      </form>
    </BaseModal>,
    document.body,
  );
}

export default AddCatModal;
