import { useEffect, useState } from 'react';
import {
  Loader as IconLoader,
  RefreshCw as IconRefreshCw,
} from 'react-feather';
import { Api, ApiError } from './api';
import { Cat } from './api/types';
import CatCard from './components/CatCard/CatCard';
import { useModal } from './components/Base/BaseModal';
import EditCatModal from './components/EditCatModal/EditCatModal';
import CatCardPlaceholder from './components/CatCard/CatCardPlaceholder';
import AddCatModal from './components/AddCatModal/AddCatModal';
// import { useUserStore } from './stores/user.store';
import Header from './components/Header/Header';
import BaseButton from './components/Base/BaseButton/BaseButton';
import { useUserStore } from './stores/user.store';

function App() {
  const user = useUserStore((state) => state.user);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cats, setCats] = useState<Cat[]>([]);

  const [editedCat, setEditedCat] = useState<Cat>();

  const {
    isShow: isShowEditCatModal,
    showModal: showEditCatModal,
    hideModal: hideEditCatModal,
  } = useModal();

  const {
    isShow: isShowAddCatModal,
    showModal: showAddCatModal,
    hideModal: hideAddCatModal,
  } = useModal();

  const fetchCats = async () => {
    try {
      setIsLoading(true);

      const response = await Api.fetchCats();

      if (!response.data) {
        return;
      }

      setCats(response.data);
      setIsError(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCat = async (id: string) => {
    try {
      await Api.deleteCat(id);

      setCats(cats.filter((cat) => cat.id !== id));
    } catch (e) {
      const error = e as ApiError;

      // For simplicity, we just alert the error
      window.alert(`Error deleting a cat: ${error.response?.data.message}`);
    }
  };

  const handleOpenEditCatModal = (cat: Cat) => {
    setEditedCat(cat);
    showEditCatModal();
  };

  const handleEditCat = async (updatedCat: Cat) => {
    try {
      setEditedCat(undefined);

      await Api.updateCat(updatedCat.id, {
        name: updatedCat.name,
        age: updatedCat.age,
        breed: updatedCat.breed,
      });

      setCats((prevCats) =>
        prevCats.map((cat) => (cat.id === updatedCat.id ? updatedCat : cat)),
      );
    } catch (e) {
      const error = e as ApiError;

      // For simplicity, we just alert the error
      window.alert(`Error updating a cat: ${error.response?.data.message}`);
    }
  };

  const handleShowAddCatModal = () => {
    if (!user) {
      return;
    }

    showAddCatModal();
  };

  const handleAddCat = async (cat: Omit<Cat, 'id' | 'owner'>) => {
    try {
      await Api.createCat(cat);

      fetchCats();
    } catch (e) {
      const error = e as ApiError;

      // For simplicity, we just alert the error
      window.alert(`Error adding a cat: ${error.response?.data.message}`);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchCats();
  }, [fetchCurrentUser]);

  return (
    <>
      <Header />

      <div className="container">
        {isLoading && <div className="loader">Loading...</div>}

        {!isLoading && isError && (
          <div className="error">Error fetching cats</div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="cat-counter">
              <p>
                Total Cats: <span id="cat-count__count">{cats.length}</span>
              </p>

              <BaseButton
                className="icon-button"
                onClick={fetchCats}
                disabled={isLoading}
              >
                Update
                {isLoading ? (
                  <IconLoader size={16} />
                ) : (
                  <IconRefreshCw size={16} />
                )}
              </BaseButton>
            </div>
            <div className="cats-list">
              <CatCardPlaceholder
                onClick={handleShowAddCatModal}
                isDisabled={!user}
              />

              {cats.map((cat) => (
                <CatCard
                  key={cat.id}
                  cat={cat}
                  onDelete={deleteCat}
                  onEdit={handleOpenEditCatModal}
                  canChange={!!user && user.id === cat.owner.id}
                />
              ))}
            </div>
          </>
        )}

        <EditCatModal
          isShow={isShowEditCatModal}
          onClose={hideEditCatModal}
          onSave={handleEditCat}
          cat={editedCat}
        />

        <AddCatModal
          isShow={isShowAddCatModal}
          onClose={hideAddCatModal}
          onSubmit={handleAddCat}
        />
      </div>
    </>
  );
}

export default App;
