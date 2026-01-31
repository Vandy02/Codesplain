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
                <textarea name='code' required placeholder="Enter your code here" className="w-full p-2 border border-gray-300 rounded-md" rows="10"
                    defaultValue={formState?.inputs?.code || ""}></textarea>
                <button type="submit" disabled={isPending} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"> {isPending ? "Explaining..." : "Explain Code"}</button>
            </form>
            {isPending ? (
                <div className="mt-8 p-4 border border-blue-100 bg-blue-50 rounded-lg animate-pulse">
                <p className="mt-4 text-sm text-gray-500">Thinking...</p>
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