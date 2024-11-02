import BaseInput, { useInput } from '../Base/BaseInput';
import BaseModal from '../Base/BaseModal';
import BaseButton from '../Base/BaseButton/BaseButton';
import './SignUpModal.css';
import { createPortal } from 'react-dom';

type Props = {
  isShow?: boolean;
  onClose: () => void;
  onSubmit: (credentials: {
    login: string;
    password: string;
    confirm: string;
  }) => void;
};

function SignUpModal({ isShow, onClose, onSubmit }: Props) {
  const {
    value: login,
    onChange: onLoginChange,
    setValue: setLogin,
  } = useInput('');
  const {
    value: password,
    onChange: onPasswordChange,
    setValue: setPassword,
  } = useInput('');
  const {
    value: confirm,
    onChange: onConfirmChange,
    setValue: setConfirm,
  } = useInput('');

  const handleSave = () => {
    onSubmit({ login, password, confirm });

    setLogin('');
    setPassword('');
    setConfirm('');

    onClose();
  };

  return createPortal(
    <BaseModal isShow={isShow} title="Sign Up" onClose={onClose}>
      <form>
        <div className="sign-up-modal__fields">
          <BaseInput label="Login" value={login} onChange={onLoginChange} />

          <BaseInput
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />

          <BaseInput
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={onConfirmChange}
          />
        </div>

        <div className="sign-up-modal__actions">
          <BaseButton
            type="submit"
            onClick={handleSave}
            disabled={!login || !password || !confirm || password !== confirm}
          >
            Sign Up
          </BaseButton>

          <BaseButton onClick={onClose}>Cancel</BaseButton>
        </div>
      </form>
    </BaseModal>,
    document.body,
  );
}

export default SignUpModal;
