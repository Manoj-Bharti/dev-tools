export function generatePassword(options: { length: number; upper: boolean; lower: boolean; numbers: boolean; symbols: boolean; excludeAmbiguous?: boolean }) {
  const { length, upper, lower, numbers, symbols, excludeAmbiguous } = options
  const upperSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lowerSet = 'abcdefghijkmnopqrstuvwxyz'
  const numberSet = '23456789'
  const symbolSet = '!@#$%^&*()-_=+[]{};:,.?'
  let pool = ''
  if (upper) pool += upperSet
  if (lower) pool += lowerSet
  if (numbers) pool += numberSet
  if (symbols) pool += symbolSet
  if (!pool) throw new Error('No character sets selected')
  const out = new Array(length).fill(0).map(() => {
    const i = Math.floor(Math.random() * pool.length)
    return pool[i]
  }).join('')
  return out
}
