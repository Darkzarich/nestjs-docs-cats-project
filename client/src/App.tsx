import { useEffect, useState } from 'react';
import * as Api from './api';
import { Cat } from './types';
import CatCard from './components/CatCard/CatCard';
import { useModal } from './components/Base/BaseModal';
import {
  Loader as IconLoader,
  RefreshCw as IconRefreshCw,
  PlusSquare as IconPlusSquare,
} from 'react-feather';
import EditCatModal from './components/EditCatModal/EditCatModal';
import CatCardPlaceholder from './components/CatCard/CatCardPlaceholder';
import AddCatModal from './components/AddCatModal/AddCatModal';

function App() {
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
      const error = e as Api.ApiError;

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
      const error = e as Api.ApiError;

      // For simplicity, we just alert the error
      window.alert(`Error updating a cat: ${error.response?.data.message}`);
    }
  };

  const handleAddCat = async (cat: Omit<Cat, 'id'>) => {
    try {
      await Api.createCat(cat);

      fetchCats();
    } catch (e) {
      const error = e as Api.ApiError;

      // For simplicity, we just alert the error
      window.alert(`Error adding a cat: ${error.response?.data.message}`);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="container">
      <h1 className="title">
        Cats
        <button
          className="icon-button"
          title="Refresh"
          onClick={fetchCats}
          disabled={isLoading}
        >
          {isLoading ? (
            <IconLoader />
          ) : (
            <IconRefreshCw color="var(--color-primary)" />
          )}
        </button>
      </h1>

      {isLoading && <div>Loading...</div>}

      {!isLoading && isError && (
        <div className="error">Error fetching cats</div>
      )}

      {!isLoading && !isError && (
        <>
          <p className="cat-meta">Number of cats: {cats.length}</p>
          <div className="cats">
            {cats.map((cat) => (
              <CatCard
                key={cat.id}
                cat={cat}
                onDelete={deleteCat}
                onEdit={handleOpenEditCatModal}
              />
            ))}

            <CatCardPlaceholder>
              <IconPlusSquare
                onClick={showAddCatModal}
                className="icon-button"
                size="48px"
                color="var(--color-primary)"
              />
            </CatCardPlaceholder>
          </div>
        </>
      )}

      {isShowEditCatModal && (
        <EditCatModal
          isShow={isShowEditCatModal}
          onClose={hideEditCatModal}
          onSave={handleEditCat}
          cat={editedCat}
        />
      )}

      {isShowAddCatModal && (
        <AddCatModal
          isShow={isShowAddCatModal}
          onClose={hideAddCatModal}
          onSubmit={handleAddCat}
        />
      )}
    </div>
  );
}

export default App;
