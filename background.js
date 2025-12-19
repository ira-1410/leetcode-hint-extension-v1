chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "FETCH_HINTS") {
      fetch("http://127.0.0.1:3100/hints", {
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
});
