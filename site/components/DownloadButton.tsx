'use client';

interface DownloadButtonProps {
  docSlug: string;
  originalContent: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ docSlug, originalContent }) => {
  const handleDownload = () => {
    let content = originalContent;

    // Replace editable inputs with their stored values
    const editableInputRegex = /<EditableInput id="([^"]+)" \/>/g;
    content = content.replace(editableInputRegex, (_match, id) => {
      const storageKey = `input-${docSlug}-${id}`;
      const savedValue = localStorage.getItem(storageKey);
      return `\n**My Response for ${id}:**\n\n${savedValue || 'No response provided.'}\n`;
    });

    // Replace todo checkboxes with their state
    const todoRegex = /-\s*\[\s*\]\s*(.+)/g;
    content = content.replace(todoRegex, (_match, label) => {
        const id = `todo-${docSlug}-${label.trim().replace(/\s+/g, '-')}`;
        const saved = localStorage.getItem(id);
        const isChecked = saved ? JSON.parse(saved) : false;
        return `- [${isChecked ? 'x' : ' '}] ${label.trim()}`;
    });

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docSlug}-with-my-work.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      Download My Work
    </button>
  );
};

export default DownloadButton;
