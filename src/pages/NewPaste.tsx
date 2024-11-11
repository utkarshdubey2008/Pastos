import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Editor } from '../components/Editor';
import { LanguageSelect } from '../components/LanguageSelect';
import { Clock } from 'lucide-react';

export function NewPaste() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('text');
  const [expiration, setExpiration] = useState('never');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = nanoid(10);
    const paste = {
      id,
      content,
      language,
      title: title || 'Untitled',
      createdAt: new Date(),
      expiresAt: expiration === 'never' ? null : new Date(Date.now() + parseInt(expiration) * 1000),
    };
    
    // In a real app, we'd save this to a backend
    localStorage.setItem(`paste-${id}`, JSON.stringify(paste));
    navigate(`/paste/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title (optional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter a title for your paste"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Language
            </label>
            <div className="mt-1">
              <LanguageSelect value={language} onChange={setLanguage} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiration
            </label>
            <select
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="never">Never</option>
              <option value="3600">1 Hour</option>
              <option value="86400">1 Day</option>
              <option value="604800">1 Week</option>
              <option value="2592000">1 Month</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <div className="mt-1">
            <Editor
              content={content}
              onChange={setContent}
              language={language}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Create Paste
          </button>
        </div>
      </form>
    </div>
  );
}