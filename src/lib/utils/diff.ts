export type DiffLine = { type: 'unchanged' | 'added' | 'removed'; text: string }

export function simpleLineDiff(a: string, b: string): DiffLine[] {
  const A = a.split('\n')
  const B = b.split('\n')
  const out: DiffLine[] = []
  const max = Math.max(A.length, B.length)
  for (let i = 0; i < max; i++) {
    const la = A[i]
    const lb = B[i]
    if (la === lb) out.push({ type: 'unchanged', text: la ?? '' })
    else {
      if (la !== undefined) out.push({ type: 'removed', text: la })
      if (lb !== undefined) out.push({ type: 'added', text: lb })
    }
  }
  return out
}
