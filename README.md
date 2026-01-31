# 🚀 Codesplain -  AI Code Explainer

An intelligent coding assistant that breaks down complex snippets into digestible explanations. Choose your expertise level—**Beginner (ELI5)**, **Intermediate**, or **Senior**—to get tailored insights powered by AI.

## ✨ Features

* **Multi-Level Explanations:**
    * **Beginner (Explain Like I'm 5):**: Uses analogies like Legos and recipes to explain logic without jargon.
    * **Intermediate**: Balances technical terms with clear, logical flow.
    * **Senior**: Focuses on Big O notation ($O(n)$), architectural patterns, and performance.
* **Syntax Highlighting**: Beautiful code blocks with language-specific formatting.
* **Math Support**: Renders complex mathematical notations using LaTeX.
* **Clean UI**: Built with Tailwind CSS for a responsive, modern developer experience.

## 🛠️ Tech Stack

* **Frontend**: React (Vite), Tailwind CSS, Lucide Icons
* **Backend**: Node.js, Express
* **AI Engine**: OpenAI API (via Nebius TokenFactory)
* **Markdown**: `react-markdown` with GFM and Math plugins

## 📦 Installation

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/ai-code-explainer.git](https://github.com/your-username/ai-code-explainer.git)
cd ai-code-explainer
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a .env file in the server folder:
```bash
PORT=3002
NEBIUS_API_KEY=your_api_key_here
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

🖥️ Usage
1. Paste your code into the text area.
2. Select the programming language.
3. Choose your Explanation Level.
4. Click "Explain Code" and watch the AI break it down!
