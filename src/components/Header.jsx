// src/components/Header.js

import React from 'react';
// Stilleri ayrı bir dosyadan çekeceğiz (ilerleyen adımlarda oluşturulacak)
import './Header.css'; 

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1>Kampüs Film Kulübü</h1>
        <nav>
          <ul>
            {/* Navigasyon linkleri, henüz routing yapmadık ama yeri hazır */}
            <li><a href="/">Ana Sayfa</a></li>
            <li><a href="/izleme-listesi">İzleme Listem</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;