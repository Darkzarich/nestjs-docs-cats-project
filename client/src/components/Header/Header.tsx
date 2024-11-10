import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from '../../stores/user.store';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import { useModal } from '../Base/BaseModal';

import './Header.css';

function Header() {
  const { user, clearUser } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      clearUser: state.clearUser,
      setUser: state.setUser,
    })),
  );

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

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Cats</h1>

        <div className="header__actions">
          {user && (
            <>
              <div className="header__login">
                Welcome, <strong>{user.login}</strong>
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

      <SignInModal isShow={isShowSignInModal} onClose={hideSignInModal} />

      <SignUpModal isShow={isShowSignUpModal} onClose={hideSignUpModal} />
    </header>
  );
}

export default Header;
