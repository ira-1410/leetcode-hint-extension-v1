const BACKEND_URL = "https://leetcode-hint-extension-v1.onrender.com/hints";

/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "FETCH_HINTS") {
      fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request.payload)
      })
        .then(res => res.json())
        .then(data => {
          sendResponse({ success: true, data });
        })
        .catch(err => {
          console.error("Backend error:", err);
          sendResponse({ success: false, error: err.message });
        });

      return true; // IMPORTANT: keeps message channel open
    }
});*/

fetch(BACKEND_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(request.payload)
})
  .then(async (res) => {
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RAW RESPONSE:", text);
    return JSON.parse(text); // this is what currently fails
  })
  .then(data => {
    sendResponse({ success: true, data });
  })
  .catch(err => {
    console.error("Backend error:", err);
    sendResponse({ success: false, error: err.message });
  });

return true;
