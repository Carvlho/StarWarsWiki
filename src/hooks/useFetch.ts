import { useCallback, useState } from "react";
import { AxiosError } from "axios";

import api from "../services/api";

export interface useFetchProps {
  route: string;
}

export default function useFetch({ route }: useFetchProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    let response;

    try {
      setError(null);

      response = await api.get(route);
    } catch (_error) {
      /* Typescript stuffs */
      const error: any | Error | AxiosError<any> = _error;

      const err = error.message;
      setError(err);

      response = null;
    } finally {
      return response;
    }
  }, [route]);

  return { fetch, loading, setLoading, error };
}
