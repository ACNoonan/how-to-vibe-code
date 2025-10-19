'use client';

import { useState, useEffect } from 'react';

interface EditableInputProps {
  id: string;
  docSlug: string;
}

const EditableInput: React.FC<EditableInputProps> = ({ id, docSlug }) => {
  const storageKey = `input-${docSlug}-${id}`;
  const [value, setValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValue(saved);
    }
  }, [storageKey]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    localStorage.setItem(storageKey, event.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder="Type your response here..."
      className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500 my-4"
      rows={4}
    />
  );
};

export default EditableInput;
