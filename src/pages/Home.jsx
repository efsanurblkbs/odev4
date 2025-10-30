// src/pages/Home.jsx

import React, { useEffect } from 'react';
import Search from '../components/Search.jsx';
import ShowList from '../components/ShowList.jsx'; 
import { actionTypes } from '../state/appReducer.jsx'; 

// Home, App.jsx'ten gelen prop'ları parantez içinde alıyor
const Home = ({ state, dispatch, fetchShows }) => { 
  
  // State objesi içinden ihtiyacımız olan verileri çıkarıyoruz
  const { shows, watchList, loading, error, searchTerm } = state;

  // Search bileşeni için arama terimini güncelleyen fonksiyon
  const handleSearchTermChange = (newTerm) => {
    // Reducer'a yeni arama terimini ve API çağrısı yapma eylemini bildir
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: newTerm });
    fetchShows(newTerm); // API çağrısı yap
  };

  // --- İLK YÜKLEME VE DURUM MESAJLARI ---
  if (loading && shows.length === 0) {
    return <div className="loading-message">Yükleniyor...</div>;
  }
  
  if (error) {
    return <div className="error-message">Hata: {error}</div>;
  }

  return (
    <div className="home-page">
      <h2>Dizi Ara ve İzleme Listene Ekle</h2>
      
      {/* Search komponentine mevcut terimi ve değiştirme fonksiyonunu gönderiyoruz */}
      <Search 
        initialSearchTerm={searchTerm}
        onSearch={handleSearchTermChange} 
        isLoading={loading}
      />

      <div className="results-area">
        
        {shows.length === 0 ? (
          <p className="no-results">Aradığınız kritere uygun dizi bulunamadı.</p>
        ) : (
          <ShowList 
            // Tüm state ve dispatch'i ShowList'e tek bir obje olarak gönderiyoruz
            state={state} 
            dispatch={dispatch}
          />
        )}
      </div>

    </div>
  );
};

export default Home;