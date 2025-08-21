import {useEffect,useState} from 'react'

export const useDebounce = (val) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const timer = setTimeout(() => {
        console.log(searchTerm);
      }, 1000);
  
      return () => {
        clearTimeout(timer);
      };
    }, [searchTerm]);
  return {
    searchTerm,
    setSearchTerm
  }
}

