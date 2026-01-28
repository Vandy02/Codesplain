import { useActionState } from "react"
import { explain } from "../../actions/Index"
import CodeExplanation from "../CodeExplanation"
import Error from "../Error"

const CodeExplainForms = () => {
  const [formState, formAction, isPending] = useActionState(explain, null);
  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-md">
        <form action={formAction}> 
            <label className="block mb-2 text-sm font-medium text-gray-900">Language:</label>
            <select name='language' className="w-full p-2 border border-gray-300 rounded-md"
                defaultValue={formState?.inputs?.language || "javascript"}>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
            </select>
            <label className="block mb-2 text-sm font-medium text-gray-900">Your Code:</label>
            <textarea name='code' required placeholder="Enter your code here" className="w-full p-2 border border-gray-300 rounded-md" rows="10"
                defaultValue={formState?.inputs?.code || ""}></textarea>
            <button type="submit" disabled={isPending} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"> {isPending ? "Explaining..." : "Explain Code"}</button>
        </form>
        { isPending ? (
            <p className="mt-4 text-sm text-gray-500">Thinking...</p>
        ) : formState?.success ? (
            < CodeExplanation explanation={formState?.data.explanation} language={formState.data.language} />
        ): (
            formState?.success === false && (
             <Error error={formState?.error} />
        ))}
    </div>
  )
}

export default CodeExplainForms