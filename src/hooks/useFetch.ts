import { useEffect, useState } from 'react';

// Custom hook genérico: busca dados de uma URL e controla carregando/erro.
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then(setData)
      .catch((e: Error) => {
        if (e.name !== 'AbortError') setError('Não foi possível carregar os dados.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // cancela a requisição se o componente sair da tela
  }, [url]);

  return { data, loading, error };
}
