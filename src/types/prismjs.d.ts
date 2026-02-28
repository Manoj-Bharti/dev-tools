declare module 'prismjs' {
  const Prism: {
    highlightElement: (element: HTMLElement) => void
    highlight: (code: string, grammar: any, language: string) => string
  }
  export default Prism
}

declare module 'prismjs/components/prism-json' {
  // Empty declaration for prismjs json component
}
