export function getCachedHints(cacheKey) {
  return new Promise((resolve) => {
    chrome.storage.local.get([cacheKey], (result) => {
      resolve(result[cacheKey] || null);
    });
  });
}

export function setCachedHints(cacheKey, hints) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [cacheKey]: hints }, resolve);
  });
}
