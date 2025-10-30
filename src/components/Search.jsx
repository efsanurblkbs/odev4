// src/components/Search.jsx (useReducer'a uyarlandı)

import React, { useState } from 'react';
import './Search.css'; 

const Search = ({ initialSearchTerm, onSearch, isLoading }) => {
  // Arama inputunu kontrol etmek için hala yerel state kullanabiliriz
  const [term, setTerm] = useState(initialSearchTerm);

  const handleInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); 
    const query = term.trim();
    if (query !== '') {
        // Ana sayfadaki (Home) handleSearchTermChange fonksiyonunu çağır
        onSearch(query); 
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Dizi Adını Girin (Örn: Game of Thrones, Friends)"
          value={term}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Aranıyor...' : 'Ara'}
        </button>
      </form>
      {/* Hata mesajı artık Home.jsx'te gösterilecek */}
    </div>
  );
};

export default Search;