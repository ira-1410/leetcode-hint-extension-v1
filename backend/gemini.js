const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateHints({ title, tags }) {
    const response = await fetch(
        `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `
                        You are a teaching assistant helping a student solve a LeetCode problem.
                        Problem: ${title}
                        Tags: ${tags.join(", ")}

                        Rules:
                        - EXACTLY 3 hints. Each hint should be 1 to 2 sentences
                        - NO code, pseudocode or syntax. Focus on strategy and edge cases
                        – Choose from common leetcode solution patterns: sliding window, two pointer, searching algorithms, greedy/dynamic programming
                        - Output only the 3 hints as plain text, one hint per line
                    `
                }]
            }]
        })
        }
    );

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
