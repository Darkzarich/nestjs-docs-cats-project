import { useEffect, useState } from 'react';
import * as api from './api';
import { Cat } from './types';
import CatCard from './components/CatCard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cats, setCats] = useState<Cat[]>([]);

  const fetchCats = async () => {
    try {
      setIsLoading(true);

      const response = await api.fetchCats();

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
      await api.deleteCat(id);
      fetchCats();
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="container">
      <h1>
        Cats
        <button
          className="button refresh-button"
          title="Refresh"
          onClick={fetchCats}
          disabled={isLoading}
        >
          {isLoading ? '⏳' : '🔄'}
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
              <CatCard key={cat.id} cat={cat} onDelete={deleteCat} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
