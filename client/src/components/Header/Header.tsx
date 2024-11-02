import './Header.css';
import { useUserStore } from '../../stores/user.store';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import { useModal } from '../Base/BaseModal';
import { User as IconUser } from 'react-feather';
import { Api, ApiError } from '../../api';

function Header() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const setUser = useUserStore((state) => state.setUser);

  const {
    isShow: isShowSignInModal,
    showModal: showSignInModal,
    hideModal: hideSignInModal,
  } = useModal();

  const {
    isShow: isShowSignUpModal,
    showModal: showSignUpModal,
    hideModal: hideSignUpModal,
  } = useModal();

  const handleSignIn = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
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

  const handleSignUp = async ({
    login,
    password,
    confirm,
  }: {
    login: string;
    password: string;
    confirm: string;
  }) => {
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

  return (
    <header className="header">
      <div className="header__content">
        <h1>Cats</h1>

        <div className="header__actions">
          {user && (
            <>
              <div className="header__login">
                {user.login} <IconUser />
              </div>
              <div className="header__action" onClick={clearUser}>
                Logout
              </div>
            </>
          )}

          {!user && (
            <>
              <div className="header__action" onClick={showSignInModal}>
                Sign In
              </div>

              <div className="header__action" onClick={showSignUpModal}>
                Sign Up
              </div>
            </>
          )}
        </div>
      </div>

      <SignInModal
        isShow={isShowSignInModal}
        onClose={hideSignInModal}
        onSubmit={handleSignIn}
      />

      <SignUpModal
        isShow={isShowSignUpModal}
        onClose={hideSignUpModal}
        onSubmit={handleSignUp}
      />
    </header>
  );
}

export default Header;
