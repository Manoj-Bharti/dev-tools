export function generateUUIDv4() {
  // RFC4122 version 4
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  const b = Array.from(bytes).map(toHex)
  return `${b.slice(0,4).join('')}-${b.slice(4,6).join('')}-${b.slice(6,8).join('')}-${b.slice(8,10).join('')}-${b.slice(10,16).join('')}`
}
