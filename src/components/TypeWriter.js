import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypeWriter = ({ content, onComplete, components }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[index]);
        setIndex(index + 1);
      }, 20); // Adjust speed here (lower number = faster)

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, content]);

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {displayedContent}
      </ReactMarkdown>
    </div>
  );
};

export default TypeWriter;