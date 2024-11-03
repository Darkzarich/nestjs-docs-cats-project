import BaseInput, { useInput } from '../Base/BaseInput';
import BaseModal from '../Base/BaseModal';
import BaseButton from '../Base/BaseButton/BaseButton';
import './SignUpModal.css';
import { createPortal } from 'react-dom';
import { useUserStore } from '../../stores/user.store';
import { Api, ApiError } from '../../api';

type Props = {
  isShow?: boolean;
  onClose: () => void;
};

function SignUpModal({ isShow, onClose }: Props) {
  const setUser = useUserStore((state) => state.setUser);

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

  const handleSignUp = async () => {
    setLogin('');
    setPassword('');
    setConfirm('');
    onClose();

    try {
      const res = await Api.signUp({ login, password, confirm });

      if (!res.data) {
        return;
      }

      setUser(res.data);
    } catch (e) {
      const error = e as ApiError;

      // For simplicity, we just alert the error
      window.alert(`Error during sign up: ${error.response?.data.message}`);
    }
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
            onClick={handleSignUp}
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
