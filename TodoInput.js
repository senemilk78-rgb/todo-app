export default function TodoInput({ onAddTodo }) {
  const form = document.createElement('form');
  form.className = 'todo-input-form';
  
  form.innerHTML = `
    <div class="input-row">
      <input
        type="text"
        placeholder="Yeni bir görev ekle..."
        maxlength="80"
        class="todo-input"
      />
      <button type="submit" class="add-button" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
        <span>Ekle</span>
      </button>
    </div>
    
    <div class="category-selector">
      <span class="selector-label">Kategori Seç:</span>
      <div class="category-options">
        <button type="button" class="category-btn cat-work" data-category="work">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          <span>İş</span>
        </button>
        <button type="button" class="category-btn cat-personal" data-category="personal">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Kişisel</span>
        </button>
        <button type="button" class="category-btn cat-shopping" data-category="shopping">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <span>Alışveriş</span>
        </button>
        <button type="button" class="category-btn cat-other active" data-category="other">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l7.996 7.996a2.5 2.5 0 0 0 3.536 0l4.017-4.017a2.5 2.5 0 0 0 0-3.536z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
          <span>Diğer</span>
        </button>
      </div>
    </div>
  `;

  let selectedCategory = 'other';
  const input = form.querySelector('.todo-input');
  const submitBtn = form.querySelector('.add-button');
  const catBtns = form.querySelectorAll('.category-btn');

  // Input change validation
  input.addEventListener('input', () => {
    submitBtn.disabled = !input.value.trim();
  });

  // Category select buttons
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.getAttribute('data-category');
    });
  });

  // Handle submit event
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    onAddTodo(text, selectedCategory);
    input.value = '';
    submitBtn.disabled = true;
  });

  return form;
}
