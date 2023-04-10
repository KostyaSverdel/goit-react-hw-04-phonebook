import { useState, useEffect } from 'react';

const useFilter = () => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedFilter = localStorage.getItem('filter');
    if (storedFilter) {
      setFilter(storedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return { filter, handleFilterChange };
};

export default useFilter;
