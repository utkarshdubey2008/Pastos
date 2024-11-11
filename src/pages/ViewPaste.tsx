import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '../components/Editor';
import { Copy, Clock, Calendar } from 'lucide-react';
import { Paste } from '../types';

export function ViewPaste() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paste, setPaste] = useState<Paste | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedPaste = localStorage.getItem(`paste-${id}`);
    if (!storedPaste) {
      navigate('/');
      return;
    }

    const pasteData = JSON.parse(storedPaste);
    if (pasteData.expiresAt && new Date(pasteData.expiresAt) < new Date()) {
      localStorage.removeItem(`paste-${id}`);
      navigate('/');
      return;
    }

    setPaste(pasteData);
  }, [id, navigate]);

  const handleCopy = () => {
    if (paste) {
      navigator.clipboard.writeText(paste.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!paste) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {paste.title}
            </h3>
            <div className="flex items-center space-x-4">
              {paste.expiresAt && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Expires {new Date(paste.expiresAt).toLocaleDateString()}</span>
                </div>
              )}
              <button
                onClick={handleCopy}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Created {new Date(paste.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <Editor
            content={paste.content}
            onChange={() => {}}
            language={paste.language}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}