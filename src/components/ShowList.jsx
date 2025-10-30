// src/components/ShowList.jsx

import React, { useState, useMemo } from 'react';
import ShowCard from './ShowCard.jsx';
import Pagination from './Pagination.jsx'; 
import WatchlistPanel from './WatchlistPanel.jsx'; 
import { actionTypes } from '../state/appReducer.jsx';
import './ShowList.css';

// ShowList, Home.jsx'ten gelen state ve dispatch'i alıyor
const ShowList = ({ state, dispatch }) => {
    
    // State objesinden gerekli bilgileri çıkarıyoruz
    const { shows, watchList, filters, currentPage, pageSize } = state;

    // --- FAVORİ YÖNETİMİ ---
    const handleToggleFavorite = (showId) => {
        const action = watchList.includes(showId)
            ? { type: actionTypes.REMOVE_WATCHLIST, payload: showId }
            : { type: actionTypes.ADD_WATCHLIST, payload: showId };
        
        dispatch(action);
    };

    // --- TÜM FİLTRE DEĞERLERİNİ HESAPLAMA ---
    const { allGenres, allLanguages } = useMemo(() => {
        const genresSet = new Set();
        const languagesSet = new Set();
        shows.forEach(show => {
            show.genres?.forEach(genre => genresSet.add(genre));
            if (show.language) languagesSet.add(show.language);
        });
        return { 
            allGenres: Array.from(genresSet).sort(),
            allLanguages: Array.from(languagesSet).sort()
        };
    }, [shows]);

    // --- FİLTRELEME MANTIKLARI ---
    const filteredShows = useMemo(() => {
        return shows.filter(show => {
            // 1. Tür Filtresi
            if (filters.genre && !show.genres?.includes(filters.genre)) {
                return false;
            }
            // 2. Dil Filtresi
            if (filters.language && show.language !== filters.language) {
                return false;
            }
            // 3. Min. Puan Filtresi
            const rating = show.rating?.average || 0;
            // filters.minRating bir sayı olduğu için (parseFloat ile çevrilmişti) karşılaştırma yapıyoruz
            if (rating < filters.minRating) { 
                return false;
            }
            return true;
        });
    }, [shows, filters]);

    // --- SAYFALAMA MANTIKLARI ---
    const totalPages = Math.ceil(filteredShows.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentShows = filteredShows.slice(startIndex, startIndex + pageSize);

    const handleFilterChange = (name, value) => {
        dispatch({
            type: actionTypes.SET_FILTERS,
            payload: { [name]: value }
        });
    };
    
    const handlePageChange = (newPage) => {
        dispatch({ type: actionTypes.SET_PAGE, payload: newPage });
    };

    return (
        <div className="show-list-page">
            
            {/* 1. FİLTRE PANELİ */}
            <div className="filter-panel">
                {/* SIFIRLA BUTONU */}
                <button 
                    className="reset-button"
                    onClick={() => dispatch({ 
                        type: actionTypes.SET_FILTERS, 
                        payload: { genre: '', language: '', minRating: 0 } 
                    })}
                >
                    Sıfırla
                </button>
                
                {/* TÜRLER */}
                <select 
                    value={filters.genre} 
                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                >
                    <option value="">Tür (hepsi)</option>
                    {allGenres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>

                {/* DİLLER */}
                 <select 
                    value={filters.language} 
                    onChange={(e) => handleFilterChange('language', e.target.value)}
                >
                    <option value="">Dil (hepsi)</option>
                    {allLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
                
                {/* MİNİMUM PUAN */}
                <select 
                    value={filters.minRating} 
                    onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                >
                    <option value={0}>Min. Puan (0+)</option>
                    <option value={7}>7+</option>
                    <option value={8}>8+</option>
                    <option value={9}>9+</option>
                </select>
            </div>

            {/* 2. ANA İÇERİK (LİSTE VE SAĞ PANEL) */}
            <div className="show-list-main-content">
                
                {/* DİZİ KARTLARI LİSTESİ */}
                <div className="show-list-grid">
                    {currentShows.length > 0 ? (
                        currentShows.map(show => (
                            <ShowCard 
                                key={show.id}
                                show={show}
                                isFavorite={watchList.includes(show.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))
                    ) : (
                        <p className="no-results">Filtrelere uygun sonuç bulunamadı.</p>
                    )}
                </div>

                {/* SAĞ PANEL (WATCHLIST) */}
                <WatchlistPanel watchListIds={watchList} dispatch={dispatch} />
                
            </div>
            
            {/* 3. SAYFALAMA */}
            {filteredShows.length > pageSize && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default ShowList;