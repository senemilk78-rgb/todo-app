export default function TodoStats({ 
  totalCount, 
  completedCount, 
  filter, 
  setFilter, 
  categoryFilter, 
  setCategoryFilter 
}) {
  const card = document.createElement('div');
  card.className = 'todo-stats-card';

  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  card.innerHTML = `
    <div class="progress-section">
      <div class="progress-text-row">
        <span class="progress-title">Tamamlama Oranı</span>
        <span class="progress-value">${completedCount}/${totalCount} (${percentage}%)</span>
      </div>
      <div class="progress-bar-bg">
        <div 
          class="progress-bar-fill ${percentage === 100 ? 'finished' : ''}" 
          style="width: ${percentage}%"
        ></div>
      </div>
    </div>

    <div class="filters-section">
      <div class="status-filters">
        <button type="button" class="filter-tab ${filter === 'all' ? 'active' : ''}" data-filter="all">Tümü</button>
        <button type="button" class="filter-tab ${filter === 'active' ? 'active' : ''}" data-filter="active">Aktif</button>
        <button type="button" class="filter-tab ${filter === 'completed' ? 'active' : ''}" data-filter="completed">Tamamlanan</button>
      </div>

      <div class="category-filters">
        <span class="cat-filter-label">Kategori:</span>
        <select class="cat-filter-select">
          <option value="all" ${categoryFilter === 'all' ? 'selected' : ''}>Tümü</option>
          <option value="work" ${categoryFilter === 'work' ? 'selected' : ''}>İş</option>
          <option value="personal" ${categoryFilter === 'personal' ? 'selected' : ''}>Kişisel</option>
          <option value="shopping" ${categoryFilter === 'shopping' ? 'selected' : ''}>Alışveriş</option>
          <option value="other" ${categoryFilter === 'other' ? 'selected' : ''}>Diğer</option>
        </select>
      </div>
    </div>
  `;

  // Bind status filter tabs click
  const tabs = card.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedFilter = tab.getAttribute('data-filter');
      setFilter(selectedFilter);
    });
  });

  // Bind category select change
  const select = card.querySelector('.cat-filter-select');
  select.addEventListener('change', (e) => {
    setCategoryFilter(e.target.value);
  });

  return card;
}
