import BaseInput, { useInput } from '../Base/BaseInput';
import BaseModal from '../Base/BaseModal';
import BaseButton from '../Base/BaseButton/BaseButton';
import './SignInModal.css';
import { createPortal } from 'react-dom';

type Props = {
  isShow?: boolean;
  onClose: () => void;
  onSubmit: (credentials: { login: string; password: string }) => void;
};

function SignInModal({ isShow, onClose, onSubmit }: Props) {
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

  const handleSave = () => {
    onSubmit({ login, password });

    setLogin('');
    setPassword('');

    onClose();
  };

  return createPortal(
    <BaseModal isShow={isShow} title="Sign In" onClose={onClose}>
      <form>
        <div className="sign-in-modal__fields">
          <BaseInput label="Login" value={login} onChange={onLoginChange} />

          <BaseInput
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>

        <div className="sign-in-modal__actions">
          <BaseButton
            type="submit"
            onClick={handleSave}
            disabled={!login || !password}
          >
            Sign In
          </BaseButton>

          <BaseButton onClick={onClose}>Cancel</BaseButton>
        </div>
      </form>
    </BaseModal>,
    document.body,
  );
}

export default SignInModal;
