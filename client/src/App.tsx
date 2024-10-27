import { useEffect, useState } from 'react';
import axios from 'axios';

type Cat = {
  id: string;
  name: string;
  age: number;
  breed: string;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [cats, setCats] = useState<Cat[]>([]);

  const fetchCats = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get<Cat[]>('/api/cats');
      // const response = await axios.get<Cat[]>('http://localhost:3000/api/cats');

      setCats(response.data);
      setIsError(false);
    } catch (error) {
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
