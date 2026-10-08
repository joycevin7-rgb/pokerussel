import { useState, useEffect } from "react";

// Runs `fn` whenever `key` changes and tracks { data, isLoading, error }.
// The `isCurrent` flag stops a slow, outdated request from overwriting a newer one.
export function useAsync(fn, key) {
  const [state, setState] = useState({ data: null, isLoading: true, error: null });

  useEffect(() => {
    let isCurrent = true;
    setState({ data: null, isLoading: true, error: null });

    fn()
      .then((data) => isCurrent && setState({ data, isLoading: false, error: null }))
      .catch((err) => isCurrent && setState({ data: null, isLoading: false, error: err.message }));

    return () => {
      isCurrent = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
