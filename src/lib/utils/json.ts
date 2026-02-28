export function formatJson(input: string) {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed, null, 2)
}

export function minifyJson(input: string) {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed)
}

export function validateJson(input: string) {
  try {
    JSON.parse(input)
    return { valid: true }
  } catch (e) {
    return { valid: false, error: (e as Error).message }
  }
}

