import { useEffect } from 'react';
import BaseInput, { useInput } from '../Base/BaseInput';
import BaseModal from '../Base/BaseModal';
import BaseButton from '../Base/BaseButton/BaseButton';
import { Cat } from '../../api/types';
import './EditCatModal.css';
import { createPortal } from 'react-dom';

type Props = {
  cat?: Cat;
  isShow?: boolean;
  onClose: () => void;
  onSave: (cat: Cat) => void;
};

function EditCatModal({ cat, isShow, onClose, onSave }: Props) {
  const {
    value: name,
    onChange: onNameChange,
    setValue: setName,
  } = useInput(cat?.name);
  const {
    value: age,
    onChange: onAgeChange,
    setValue: setAge,
  } = useInput(cat?.age?.toString());
  const {
    value: breed,
    onChange: onBreedChange,
    setValue: setBreed,
  } = useInput(cat?.breed);

  const handleSave = () => {
    onSave({ id: cat!.id, name, age: parseInt(age), breed });

    setName('');
    setAge('0');
    setBreed('');

    onClose();
  };

  useEffect(() => {
    if (cat) {
      setName(cat.name || '');
      setAge(cat.age?.toString() || '');
      setBreed(cat.breed || '');
    }
  }, [cat, setName, setAge, setBreed]);

  return createPortal(
    <BaseModal
      isShow={isShow}
      title={`Edit cat "${cat?.name}"`}
      onClose={onClose}
    >
      <form>
        <div className="edit-cat-modal__fields">
          <BaseInput label="Name" value={name} onChange={onNameChange} />

          <BaseInput
            label="Age"
            type="number"
            value={age}
            onChange={onAgeChange}
          />

          <BaseInput label="Breed" value={breed} onChange={onBreedChange} />
        </div>

        <div className="edit-cat-modal__actions">
          <BaseButton
            type="submit"
            disabled={!name || !age || !breed}
            onClick={handleSave}
          >
            Save
          </BaseButton>

          <BaseButton onClick={onClose}>Cancel</BaseButton>
        </div>
      </form>
    </BaseModal>,
    document.body,
  );
}

export default EditCatModal;
