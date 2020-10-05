import { useState, useEffect } from 'react';

export const useDebouncedTerm = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [term]);

  return [term, debouncedTerm, setTerm];
}

export default useDebouncedTerm;
