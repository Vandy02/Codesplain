import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Check } from 'lucide-react'

const CodeExplanation = ({explanation}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try{
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
    <div className="w-full max-w-4xl bg-white p-6 rounded-md shadow-sm border border-gray-100 relative group">
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
    <div className="prose prose-slate max-w-none text-gray-700">
        <Markdown remarkPlugins={[remarkGfm]}>
          {explanation}
        </Markdown>
      </div>
    </div>
  )
}

export default CodeExplanation