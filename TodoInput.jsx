import React, { useState } from 'react';
import { PlusCircle, Briefcase, User, ShoppingCart, Tag } from 'lucide-react';
import './TodoInput.css';

const CATEGORIES = [
  { id: 'work', name: 'İş', icon: Briefcase, colorClass: 'cat-work' },
  { id: 'personal', name: 'Kişisel', icon: User, colorClass: 'cat-personal' },
  { id: 'shopping', name: 'Alışveriş', icon: ShoppingCart, colorClass: 'cat-shopping' },
  { id: 'other', name: 'Diğer', icon: Tag, colorClass: 'cat-other' }
];

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('other');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTodo(text.trim(), category);
    setText('');
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yeni bir görev ekle..."
          maxLength={80}
          className="todo-input"
        />
        <button type="submit" className="add-button" disabled={!text.trim()}>
          <PlusCircle size={18} />
          <span>Ekle</span>
        </button>
      </div>
      
      <div className="category-selector">
        <span className="selector-label">Kategori Seç:</span>
        <div className="category-options">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-btn ${cat.colorClass} ${isSelected ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <Icon size={13} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
}
