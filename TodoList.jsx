import React from 'react';
import TodoItem from './TodoItem';
import { Sparkles, CalendarRange, CheckCircle } from 'lucide-react';
import './TodoList.css';

export default function TodoList({ todos, filter, onToggleComplete, onDelete }) {
  if (todos.length === 0) {
    let emptyIcon = <Sparkles size={40} className="empty-icon" />;
    let emptyText = "Harika! Tüm görevlerini tamamladın.";
    let emptySubtext = "Yeni bir görev ekleyerek üretken kalmaya devam et.";

    if (filter === 'active') {
      emptyIcon = <CalendarRange size={40} className="empty-icon" />;
      emptyText = "Aktif görevin bulunmuyor.";
      emptySubtext = "Günü planlamak için yukarıdan yeni bir görev ekleyebilirsin.";
    } else if (filter === 'completed') {
      emptyIcon = <CheckCircle size={40} className="empty-icon" />;
      emptyText = "Henüz tamamlanmış görev yok.";
      emptySubtext = "Görevlerini tamamlayarak burayı doldurmaya başla!";
    }

    return (
      <div className="todo-empty-state">
        <div className="icon-container">
          {emptyIcon}
        </div>
        <h3 className="empty-title">{emptyText}</h3>
        <p className="empty-subtext">{emptySubtext}</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
