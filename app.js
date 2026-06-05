import Auth from './components/Auth.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoStats from './components/TodoStats.js';

let currentUser = localStorage.getItem('minimalist-current-user') || null;
let todos = [];
let filter = 'all';
let categoryFilter = 'all';

const root = document.getElementById('root');

function saveTodos() {
  if (currentUser) {
    localStorage.setItem(`todos_${currentUser.toLowerCase()}`, JSON.stringify(todos));
  }
}

function loadTodos() {
  if (currentUser) {
    try {
      const saved = localStorage.getItem(`todos_${currentUser.toLowerCase()}`);
      todos = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Görev listesi yüklenemedi:', e);
      todos = [];
    }
  } else {
    todos = [];
  }
}

// Format local date in Turkish
const getFormattedDate = () => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Date().toLocaleDateString('tr-TR', options);
};

// Main paint function
function render() {
  root.innerHTML = '';
  
  if (!currentUser) {
    // Show Auth
    const authNode = Auth({
      onLogin: (username) => {
        currentUser = username;
        localStorage.setItem('minimalist-current-user', username);
        loadTodos();
        render(); // Repaint application view
      }
    });
    root.appendChild(authNode);
  } else {
    // Show main Todo application
    const appContainer = document.createElement('main');
    appContainer.className = 'app-container';
    
    appContainer.innerHTML = `
      <header class="app-header">
        <div class="header-top">
          <div class="welcome-box">
            <h1 class="app-title">Yapılacaklar</h1>
            <p class="welcome-user">Hoş geldin, <strong>${currentUser}</strong>!</p>
          </div>
          <div class="header-actions">
            <div class="date-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>${getFormattedDate()}</span>
            </div>
            <button type="button" class="logout-btn" title="Çıkış Yap">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </header>
      
      <div id="stats-wrapper"></div>
      <div id="input-wrapper"></div>
      <div id="list-wrapper"></div>
    `;
    
    root.appendChild(appContainer);

    // Bind logout button click
    const logoutBtn = appContainer.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
      currentUser = null;
      localStorage.removeItem('minimalist-current-user');
      todos = [];
      filter = 'all';
      categoryFilter = 'all';
      render(); // Repaint auth view
    });

    const statsWrapper = document.getElementById('stats-wrapper');
    const inputWrapper = document.getElementById('input-wrapper');
    const listWrapper = document.getElementById('list-wrapper');

    // Mount the TodoInput exactly once to keep focus state while typing
    const inputNode = TodoInput({
      onAddTodo: (text, category) => {
        const newTodo = {
          id: Date.now().toString(),
          text,
          completed: false,
          category,
          createdAt: new Date().toISOString()
        };
        todos = [newTodo, ...todos];
        saveTodos();
        updateView(statsWrapper, listWrapper);
      }
    });
    inputWrapper.appendChild(inputNode);

    // Initial paint of stats and list
    updateView(statsWrapper, listWrapper);
  }
}

// Update view for dynamic parts (stats and list)
function updateView(statsWrapper, listWrapper) {
  if (!statsWrapper || !listWrapper) return;
  
  statsWrapper.innerHTML = '';
  listWrapper.innerHTML = '';

  // Apply status and category filters
  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    const matchesCategory =
      categoryFilter === 'all' || todo.category === categoryFilter;

    return matchesStatus && matchesCategory;
  });

  const totalCount = todos.filter(todo => categoryFilter === 'all' || todo.category === categoryFilter).length;
  const completedCount = todos.filter(todo => (categoryFilter === 'all' || todo.category === categoryFilter) && todo.completed).length;

  // Render Stats
  const statsNode = TodoStats({
    totalCount,
    completedCount,
    filter,
    setFilter: (newFilter) => {
      filter = newFilter;
      updateView(statsWrapper, listWrapper);
    },
    categoryFilter,
    setCategoryFilter: (newCategoryFilter) => {
      categoryFilter = newCategoryFilter;
      updateView(statsWrapper, listWrapper);
    }
  });
  statsWrapper.appendChild(statsNode);

  // Render List
  const listNode = TodoList({
    todos: filteredTodos,
    filter,
    onToggleComplete: (id) => {
      todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos();
      updateView(statsWrapper, listWrapper);
    },
    onDelete: (id) => {
      todos = todos.filter(todo => todo.id !== id);
      saveTodos();
      updateView(statsWrapper, listWrapper);
    }
  });
  listWrapper.appendChild(listNode);
}

// Start application
loadTodos();
render();
