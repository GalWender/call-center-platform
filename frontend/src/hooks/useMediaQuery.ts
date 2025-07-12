import { useEffect, useState } from 'react';
const useMediaQuery = (query: string): boolean => {
  const getMatches = () => window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' ? getMatches() : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = () => setMatches(mediaQuery.matches);

    handler();
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
