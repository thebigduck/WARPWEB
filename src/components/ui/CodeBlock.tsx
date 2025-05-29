import React from 'react';
interface CodeBlockProps { children: React.ReactNode; inline?: boolean; }
export const CodeBlock: React.FC<CodeBlockProps> = ({ children, inline = false }) => {
    const langClass = inline ? "" : "language-cpp"; 
    const textContent = typeof children === 'string' ? children : String(children);
    return (
      <pre className={`${inline ? '' : 'bg-comet-grey/50 p-4 rounded-md overflow-x-auto text-sm my-3 shadow-inner border border-shadow-slate/50'} ${langClass}`}>
        <code className={`${inline ? 'bg-comet-grey text-nebula-aqua px-1.5 py-0.5 rounded text-xs inline-block' : 'text-starlight-blue'} font-mono`}>{textContent}</code>
      </pre>
    );
};