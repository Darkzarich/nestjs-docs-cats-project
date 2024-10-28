import { useState } from 'react';

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);

  const showModal = () => setIsShow(true);
  const hideModal = () => setIsShow(false);

  const toggleModal = () => setIsShow((prev) => !prev);

  return { isShow, showModal, hideModal, toggleModal };
};
