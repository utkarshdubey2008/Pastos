import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { Language } from '../types';

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

export function Editor({ content, onChange, language, readOnly = false }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      Prism.highlightElement(textareaRef.current);
    }
  }, [content, language]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[60vh] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        spellCheck="false"
        readOnly={readOnly}
      />
    </div>
  );
}