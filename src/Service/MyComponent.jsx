import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://m3p-backend-squad3-p7i7.onrender.com');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);

      } catch (error) {
        setError(error);
        console.error('Erro:', error);
      }
    };

    fetchData();
}, []);

if (error) {
    return <div>Erro ao carregar dados: {error.message}</div>;
}

return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Carregando...'}
    </div>
  );
};

export default MyComponent;