
import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

interface CodeBlockProps {
  jsonString: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ jsonString }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Reset copied state when jsonString changes
  useEffect(() => {
    setIsCopied(false);
  }, [jsonString]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-prompt.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative mt-8 bg-gray-900/80 rounded-xl shadow-2xl border border-blue-800/30">
      <div className="flex justify-between items-center px-4 py-2 bg-blue-950/70 rounded-t-lg border-b border-blue-800/50">
        <p className="text-base font-semibold text-blue-200">Generated JSON Prompt</p>
        <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`px-3 py-1 text-sm font-medium rounded-md flex items-center gap-2 transition-all duration-200 ${
                isCopied
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCopied ? <Icon type="check" className="w-4 h-4" /> : <Icon type="copy" className="w-4 h-4" />}
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1 text-sm font-medium rounded-md flex items-center gap-2 transition-all duration-200 bg-gray-600 text-white hover:bg-gray-700"
            >
              <Icon type="download" className="w-4 h-4" />
              Download
            </button>
        </div>
      </div>
      <pre className="p-4 text-base text-left overflow-x-auto text-cyan-200">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};
