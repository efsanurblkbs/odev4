// src/components/ShowCard.jsx (Sadece buton kısmı değişti)

import React from 'react';
import './ShowCard.css'; 

const ShowCard = ({ show, isFavorite, onToggleFavorite }) => {
    
  // ... (Görsel, özet ve diğer değişken tanımlamaları aynı kalır)
  const imageUrl = show.image?.medium || 'https://via.placeholder.com/210x295?text=Poster+Yok';
  const summary = show.summary 
    ? show.summary.replace(/<[^>]+>/g, '').substring(0, 150) + '...' 
    : 'Özet bulunmamaktadır.';
  const genres = show.genres?.join(', ') || 'Belirtilmemiş';
  const rating = show.rating?.average || 'N/A';

  const handleToggle = () => {
    onToggleFavorite(show.id);
  };

  return (
    <div className="show-card">
      <img src={imageUrl} alt={show.name} className="show-image" />
      <div className="show-details">
        <h3>{show.name}</h3>
        <p className="show-info">
          Türler: <strong>{genres}</strong> | Puan: <strong>{rating}</strong>
        </p>
        <p className="show-summary">{summary}</p>
        
        {/* İKİ BUTON BURADA */}
        <div className="card-actions">
            {/* 1. Detay Butonu: Tıklandığında URL'yi değiştirir */}
            <button 
                className="detail-btn"
                onClick={() => window.location.pathname = `/show/${show.id}`}
            >
                Detay
            </button>
            
            {/* 2. Favori Butonu */}
            <button 
                className={`favorite-btn ${isFavorite ? 'remove' : 'add'}`}
                onClick={handleToggle}
            >
                {isFavorite ? 'Listeden Çıkar' : 'Gösterime Ekle'}
            </button>
        </div>
        
      </div>
    </div>
  );
};

export default ShowCard;