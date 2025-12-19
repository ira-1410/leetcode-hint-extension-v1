const cache = new Map();

export function getCachedHints(key) {
  return cache.get(key) || null;
}

export function setCachedHints(key, hints) {
  if (Array.isArray(hints)) {
    cache.set(key, hints);
  }
}
