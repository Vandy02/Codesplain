import { useActionState, useRef } from "react"
import { explain } from "../../actions/Index"
import CodeExplanation from "../CodeExplanation"
import Error from "../Error"


const CodeExplainForms = () => {
    const [formState, formAction, isPending] = useActionState(explain, null);
    const formRef = useRef(null);
    const handleClear = () => {
    formRef.current?.reset(); 
    };
    return (
        <div className="w-full max-w-4xl bg-white p-6 rounded-md">
            <form action={formAction}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Language Selection */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Language:</label>
                        <select name='language' className="w-full p-2 border border-gray-300 rounded-md"
                            defaultValue={formState?.inputs?.language || "javascript"}>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="javascript">JavaScript</option>
                        </select>
                    </div>
                    {/* --- NEW: Complexity Level Selection --- */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Explanation Level:</label>
                        <select name='level' className="w-full p-2 border border-gray-300 rounded-md bg-white"
                            defaultValue={formState?.inputs?.level || "Intermediate"}>
                            <option value="Beginner">Beginner (Explain like I'm 5)</option>
                            <option value="Intermediate">Intermediate (I know a bit of tech)</option>
                            <option value="Senior">Senior (Explain for a Senior Developer)</option>
                        </select>
                    </div>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Your Code:</label>
                <textarea name='code' required placeholder="Enter your code here" className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900" rows="10"
                    defaultValue={formState?.inputs?.code || ""}></textarea>
                <button type="submit" disabled={isPending} className="flex-2 w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium shadow-md shadow-indigo-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"> {isPending ? "Explaining..." : "Explain Code" }</button>
                <button type="reset" className="flex-1 py-3 px-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02] transition-all">
                    🧹 Clear
                </button>
            </form>
            {isPending ? (
                <div className="mt-8 p-4 border border-blue-100 bg-blue-50 rounded-lg animate-pulse">
                <span className="text-3xl mb-2 animate-bounce">✨🤖✨</span>
                <p className="mt-4 text-sm text-gray-500">Thinking...</p>
                <p className="font-bold text-lg">Decoding the matrix...</p>
                <p className="text-sm mt-1 opacity-80">
                  (Using the free tier so this might take about 30 seconds. Perfect time to grab a sip of coffee or tea! ☕)
                </p>
                </div>
            ) : formState?.success ? (
                <div className="mt-8">
                < CodeExplanation explanation={formState?.data.explanation} language={formState.data.language} />
                </div>
            ) : (
                formState?.success === false && (
                    <Error error={formState?.error} />
                ))}
        </div>
    )
}

export default CodeExplainForms
