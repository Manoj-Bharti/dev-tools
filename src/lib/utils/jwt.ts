export function decodeBase64Url(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  try {
    return decodeURIComponent(escape(atob(str)))
  } catch (e) {
    return atob(str)
  }
}

export function decodeJwt(token: string) {
  const parts = token.split('.')
  if (parts.length < 2) throw new Error('Invalid token')
  const header = JSON.parse(decodeBase64Url(parts[0]))
  const payload = JSON.parse(decodeBase64Url(parts[1]))
  return { header, payload }
}

export async function verifyJwtHS(token: string, secret: string) {
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const alg = JSON.parse(decodeBase64Url(parts[0])).alg as string
  if (!alg || !alg.startsWith('HS')) return false
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['verify'])
  const data = new TextEncoder().encode(parts[0] + '.' + parts[1])
  const sig = parts[2].replace(/-/g, '+').replace(/_/g, '/')
  const sigBytes = Uint8Array.from(atob(sig), c => c.charCodeAt(0))
  // Currently verify using SHA-256 for HS256; if alg differs, return false
  const ok = await crypto.subtle.verify('HMAC', key, sigBytes, data)
  return ok
}
