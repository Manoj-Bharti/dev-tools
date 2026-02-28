export function encodeBase64(input: string) {
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    let binary = ''
    const chunk = 0x8000
    for (let i = 0; i < data.length; i += chunk) {
      binary += String.fromCharCode(...data.subarray(i, i + chunk))
    }
    return btoa(binary)
  } catch (e) {
    // fallback
    return btoa(unescape(encodeURIComponent(input)))
  }
}

export function decodeBase64(input: string) {
  try {
    const binary = atob(input)
    const bytes = new Uint8Array(Array.from(binary).map((c) => c.charCodeAt(0)))
    const decoder = new TextDecoder()
    return decoder.decode(bytes)
  } catch (e) {
    // fallback
    return decodeURIComponent(escape(atob(input)))
  }
}
