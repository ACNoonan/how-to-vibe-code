'use client';

import { useState, useEffect } from 'react';

interface TodoCheckboxProps {
  label: string;
  docSlug: string;
}

const TodoCheckbox: React.FC<TodoCheckboxProps> = ({ label, docSlug }) => {
  const id = `todo-${docSlug}-${label.replace(/\s+/g, '-')}`;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(id);
    if (saved) {
      setIsChecked(JSON.parse(saved));
    }
  }, [id]);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    localStorage.setItem(id, JSON.stringify(newCheckedState));
  };

  return (
    <div className="flex items-center my-2">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
      />
      <label htmlFor={id} className={`ml-3 text-gray-300 ${isChecked ? 'line-through text-gray-500' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default TodoCheckbox;
