import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

const CodeExplanation = ({ explanation }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-gray-100 antialiased">
      {/* Header & Copy Button */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-bold mb-4">Code Explanation</h2>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
        >
          {copied ? (
            <><Check size={16} className="text-green-500" /> <span>Copied!</span></>
          ) : (
            <><Copy size={16} /> <span>Copy</span></>
          )}
        </button>
      </div>
      <div className="prose prose-slate max-w-none prose-p:leading-7 prose-li:leading-relaxed text-gray-700">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ children }) => <div className="mb-4 leading-7 text-gray-600">{children}</div>,
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';

              if (!inline) {
                return (
                  <span className="block relative my-6 shadow-lg rounded-xl overflow-hidden border border-gray-800">
                    {language && (
                      <span className="absolute right-4 top-0 bg-orange-500 text-white text-[10px] uppercase px-2 py-1 rounded-b-md z-10 font-bold tracking-wider">
                        {language}
                      </span>
                    )}
                    <SyntaxHighlighter
                      style={oneDark}
                      language={language}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: '20px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        backgroundColor: '#282c34'
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </span>
                );
              }

              // Clean inline code - no pink, no border
              return (
                <code className="bg-gray-100 text-gray-900 px-1 rounded font-mono" {...props}>
                  {children}
                </code>
              );
            },
            // Keep only the table here if you want it styled, 
            // otherwise, remove it to let 'prose' handle it.
          }}
        >
          {explanation}
        </Markdown>
      </div>
    </div>
  )
}

export default CodeExplanation