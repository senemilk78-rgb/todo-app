import React from 'react';
import './TodoStats.css';

export default function TodoStats({ 
  totalCount, 
  completedCount, 
  filter, 
  setFilter, 
  categoryFilter, 
  setCategoryFilter 
}) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="todo-stats-card">
      <div className="progress-section">
        <div className="progress-text-row">
          <span className="progress-title">Tamamlama Oranı</span>
          <span className="progress-value">{completedCount}/{totalCount} ({percentage}%)</span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className={`progress-bar-fill ${percentage === 100 ? 'finished' : ''}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="filters-section">
        <div className="status-filters">
          <button 
            type="button" 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tümü
          </button>
          <button 
            type="button" 
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Aktif
          </button>
          <button 
            type="button" 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Tamamlanan
          </button>
        </div>

        <div className="category-filters">
          <span className="cat-filter-label">Kategori:</span>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="cat-filter-select"
          >
            <option value="all">Tümü</option>
            <option value="work">İş</option>
            <option value="personal">Kişisel</option>
            <option value="shopping">Alışveriş</option>
            <option value="other">Diğer</option>
          </select>
        </div>
      </div>
    </div>
  );
}
