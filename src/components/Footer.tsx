import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Three-column layout on desktop, stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tools Column */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/base64" className="hover:underline">Base64 Encoder</Link></li>
              <li><Link href="/json" className="hover:underline">JSON Formatter</Link></li>
              <li><Link href="/jwt" className="hover:underline">JWT Decoder</Link></li>
              <li><Link href="/hash" className="hover:underline">Hash Generator</Link></li>
              <li><Link href="/url" className="hover:underline">URL Encoder</Link></li>
              <li><Link href="/regex" className="hover:underline">Regex Tester</Link></li>
              <li><Link href="/timestamp" className="hover:underline">Timestamp Converter</Link></li>
              <li><Link href="/uuid" className="hover:underline">UUID Generator</Link></li>
              <li><Link href="/diff" className="hover:underline">Diff Viewer</Link></li>
              <li><Link href="/password" className="hover:underline">Password Checker</Link></li>
              <li><Link href="/tools" className="hover:underline">View All Tools</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/Manoj-Bharti/dev-tools" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
              <li><a href="mailto:contact@common-dev-tools.com" className="hover:underline">Email Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2026 DevToolkit Contributors</p>
          <p className="mt-2">
            Open source under <a href="https://github.com/Manoj-Bharti/dev-tools/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline">MIT License</a>
          </p>
          <p className="mt-2">Made with ❤️ by developers, for developers</p>
        </div>
      </div>
    </footer>
  )
}
