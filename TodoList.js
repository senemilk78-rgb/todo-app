import TodoItem from './TodoItem.js';

export default function TodoList({ todos, filter, onToggleComplete, onDelete }) {
  const container = document.createElement('div');
  container.className = 'todo-list-container';

  if (todos.length === 0) {
    let emptyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/></svg>`;
    let emptyText = "Harika! Tüm görevlerini tamamladın.";
    let emptySubtext = "Yeni bir görev ekleyerek üretken kalmaya devam et.";

    if (filter === 'active') {
      emptyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`;
      emptyText = "Aktif görevin bulunmuyor.";
      emptySubtext = "Günü planlamak için yukarıdan yeni bir görev ekleyebilirsin.";
    } else if (filter === 'completed') {
      emptyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
      emptyText = "Henüz tamamlanmış görev yok.";
      emptySubtext = "Görevlerini tamamlayarak burayı doldurmaya başla!";
    }

    container.innerHTML = `
      <div class="todo-empty-state">
        <div class="icon-container">
          ${emptyIcon}
        </div>
        <h3 class="empty-title">${emptyText}</h3>
        <p class="empty-subtext">${emptySubtext}</p>
      </div>
    `;
  } else {
    todos.forEach(todo => {
      const todoItemNode = TodoItem({ todo, onToggleComplete, onDelete });
      container.appendChild(todoItemNode);
    });
  }

  return container;
}
