import { useEffect, useState } from 'react';
import * as api from './api';
import { Cat } from './types';

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

  useEffect(() => {
    fetchCats();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Cats</h1>

      {isError && <div className="error">Error fetching cats</div>}

      {!isError && (
        <>
          <p className="cat-meta">Number of cats: {cats.length}</p>

          <div className="cats">
            {cats.map((cat) => (
              <div className="cat" key={cat.id}>
                <h2>{cat.name}</h2>
                <p>Age: {cat.age}</p>
                <p>Breed: {cat.breed}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
