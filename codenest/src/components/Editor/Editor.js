import React from 'react';
import './Editor.css';

const Editor = ({ language, value, onChange, height = '50vh' }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="editor-container rounded-lg overflow-hidden border border-gray-700">
      <textarea
        className="code-editor"
        value={value}
        onChange={handleChange}
        style={{ height }}
        placeholder="Write your code here..."
      />
    </div>
  );
};

export default Editor;