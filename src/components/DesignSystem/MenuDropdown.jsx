import React, { useEffect, useRef, useState } from 'react';

export default function MenuDropdown({ items = [], selected = null, onSelect }) {
  const [openIndex, setOpenIndex] = useState(-1);
  const containerRef = useRef();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setOpenIndex(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpenIndex(i => Math.min(items.length - 1, i + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setOpenIndex(i => Math.max(0, i - 1));
      }
      if (e.key === 'Enter' && openIndex >= 0) {
        onSelect && onSelect(items[openIndex]);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [items, openIndex, onSelect]);

  return (
    <div ref={containerRef} className="glass-dropdown" role="menu" aria-label="menu-dropdown">
      {items.map((it, idx) => (
        <button
          key={it.value ?? idx}
          type="button"
          className={`${selected === it.value ? 'selected' : ''}`}
          onClick={() => onSelect && onSelect(it)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
