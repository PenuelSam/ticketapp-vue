export function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch (error) {
    console.warn('Failed to read storage', error)
    return fallback
  }
}

export function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}
