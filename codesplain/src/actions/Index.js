"use server"

export async function explain(prevState, formData) {
    const code = formData.get("code")
    const language = formData.get("language")
    const level = formData.get("level")

    const inputs = {
        code,
        language,
        level
    }
    
    try{
        const res =await fetch(`${import.meta.env.VITE_API_BASE_URL}/explain-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code, language, level }),
        });
    
    if(!res.ok){
        return {
            success: false,
            error: "Error explaining code",
            inputs
        }
    }
    const data = await res.json();
    return {
        success: true,
        data,
        inputs
    }
}catch (err){
        return {
            success: false,
            error: `Server Error: ${err?.message}`,
            inputs
        };
    }
}