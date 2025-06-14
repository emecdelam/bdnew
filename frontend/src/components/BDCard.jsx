import React from 'react';
import './BDCard.css';

const BDCard = ({ bd }) => {
  return (
    <div className="bd-card">
      <div className="bd-card-header">
        <h3 className="bd-title">{bd.titrealbum || 'Album sans titre'}</h3>
        {bd.titreserie && (
          <p className="bd-series">{bd.titreserie}</p>
        )}
      </div>
      
      <div className="bd-card-content">
        {bd.numtome && (
          <div className="bd-meta">
            <span className="bd-label">Tome:</span>
            <span className="bd-value">{bd.numtome}</span>
          </div>
        )}
        
        <div className="bd-meta">
          <span className="bd-label">Scénariste:</span>
          <span className="bd-value">{bd.scenariste}</span>
        </div>
        
        <div className="bd-meta">
          <span className="bd-label">Dessinateur:</span>
          <span className="bd-value">{bd.dessinateur}</span>
        </div>
        
        {bd.editeur && (
          <div className="bd-meta">
            <span className="bd-label">Éditeur:</span>
            <span className="bd-value">{bd.editeur}</span>
          </div>
        )}
        
        {bd.collection && (
          <div className="bd-meta">
            <span className="bd-label">Collection:</span>
            <span className="bd-value">{bd.collection}</span>
          </div>
        )}
        
        {bd.genre && (
          <div className="bd-meta">
            <span className="bd-label">Genre:</span>
            <span className="bd-value">{bd.genre}</span>
          </div>
        )}
        
        <div className="bd-meta">
          <span className="bd-label">Cote:</span>
          <span className="bd-value bd-cote">{bd.cote}</span>
        </div>
      </div>
    </div>
  );
};

export default BDCard;
