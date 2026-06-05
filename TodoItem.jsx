import React from 'react';
import { Check, Trash2, Briefcase, User, ShoppingCart, Tag } from 'lucide-react';
import './TodoItem.css';

const CATEGORY_MAP = {
  work: { name: 'İş', icon: Briefcase, colorClass: 'cat-work' },
  personal: { name: 'Kişisel', icon: User, colorClass: 'cat-personal' },
  shopping: { name: 'Alışveriş', icon: ShoppingCart, colorClass: 'cat-shopping' },
  other: { name: 'Diğer', icon: Tag, colorClass: 'cat-other' }
};

export default function TodoItem({ todo, onToggleComplete, onDelete }) {
  const categoryData = CATEGORY_MAP[todo.category] || CATEGORY_MAP.other;
  const CategoryIcon = categoryData.icon;

  return (
    <div className={`todo-item-card ${todo.completed ? 'completed' : ''}`}>
      <button 
        type="button" 
        className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggleComplete(todo.id)}
        aria-label={todo.completed ? "Görevi tamamlanmadı olarak işaretle" : "Görevi tamamlandı olarak işaretle"}
      >
        {todo.completed && <Check size={12} className="check-icon" />}
      </button>

      <div className="todo-content" onClick={() => onToggleComplete(todo.id)}>
        <span className="todo-text">{todo.text}</span>
        <span className={`todo-category-badge ${categoryData.colorClass}`}>
          <CategoryIcon size={10} />
          <span>{categoryData.name}</span>
        </span>
      </div>

      <button 
        type="button" 
        className="delete-item-btn" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
        aria-label="Görevi sil"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
