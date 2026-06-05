const CATEGORY_MAP = {
  work: { 
    name: 'İş', 
    colorClass: 'cat-work',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  },
  personal: { 
    name: 'Kişisel', 
    colorClass: 'cat-personal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
  },
  shopping: { 
    name: 'Alışveriş', 
    colorClass: 'cat-shopping',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`
  },
  other: { 
    name: 'Diğer', 
    colorClass: 'cat-other',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l7.996 7.996a2.5 2.5 0 0 0 3.536 0l4.017-4.017a2.5 2.5 0 0 0 0-3.536z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`
  }
};

export default function TodoItem({ todo, onToggleComplete, onDelete }) {
  const item = document.createElement('div');
  item.className = `todo-item-card ${todo.completed ? 'completed' : ''}`;
  item.setAttribute('data-id', todo.id);

  const catData = CATEGORY_MAP[todo.category] || CATEGORY_MAP.other;

  item.innerHTML = `
    <button 
      type="button" 
      class="custom-checkbox ${todo.completed ? 'checked' : ''}"
      aria-label="${todo.completed ? 'Görevi tamamlanmadı olarak işaretle' : 'Görevi tamamlandı olarak işaretle'}"
    >
      ${todo.completed ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><path d="M20 6 9 17l-5-5"/></svg>
      ` : ''}
    </button>

    <div class="todo-content">
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <span class="todo-category-badge ${catData.colorClass}">
        ${catData.svg}
        <span>${catData.name}</span>
      </span>
    </div>

    <button 
      type="button" 
      class="delete-item-btn" 
      aria-label="Görevi sil"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
    </button>
  `;

  // Security: Escape HTML helper
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  const checkbox = item.querySelector('.custom-checkbox');
  const content = item.querySelector('.todo-content');
  const deleteBtn = item.querySelector('.delete-item-btn');

  checkbox.addEventListener('click', (e) => {
    e.stopPropagation();
    onToggleComplete(todo.id);
  });

  content.addEventListener('click', () => {
    onToggleComplete(todo.id);
  });

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Smooth fade out animation
    item.style.transition = 'all 0.25s ease-out';
    item.style.opacity = '0';
    item.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      onDelete(todo.id);
    }, 250);
  });

  return item;
}
