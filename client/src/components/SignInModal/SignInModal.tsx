import BaseInput, { useInput } from '../Base/BaseInput';
import BaseModal from '../Base/BaseModal';
import BaseButton from '../Base/BaseButton/BaseButton';
import './SignInModal.css';
import { createPortal } from 'react-dom';
import { Api, ApiError } from '../../api';
import { useUserStore } from '../../stores/user.store';

type Props = {
  isShow?: boolean;
  onClose: () => void;
};

function SignInModal({ isShow, onClose }: Props) {
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

  const handleSignIn = async () => {
    setLogin('');
    setPassword('');
    onClose();

    try {
      const res = await Api.signIn({ login, password });

      if (!res.data) {
        return;
      }

      setUser(res.data);
    } catch (e) {
      const error = e as ApiError;

      // For simplicity, we just alert the error
      window.alert(`Error during sign in: ${error.response?.data.message}`);
    }
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
            onClick={handleSignIn}
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
