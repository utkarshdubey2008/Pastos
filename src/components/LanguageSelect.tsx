import React from 'react';
import { Language } from '../types';

const languages: Language[] = [
  { name: 'Plain Text', value: 'text' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Python', value: 'python' },
  { name: 'HTML', value: 'html' },
  { name: 'CSS', value: 'css' },
  { name: 'JSON', value: 'json' },
  { name: 'Markdown', value: 'markdown' },
];

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}