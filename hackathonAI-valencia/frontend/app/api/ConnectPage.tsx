'use client';

import { useEffect, useState } from 'react';

const ConnectPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          user: 123,
          query: 'De qué trata este documento?',
          filename: 'dieta_de_toni_lopez.pdf',
        };

        const url = `https://smartpipes.bodia.ai/query_pdfs`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer amigos_hackathonianos',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Connected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ConnectPage;
