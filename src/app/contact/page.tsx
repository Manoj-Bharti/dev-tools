import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - DevToolkit',
  description: 'Get in touch with the DevToolkit team. Contact us for support, feedback, or inquiries.',
}

export default function ContactPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
      <header className="mb-12">
        <h1>Contact Us</h1>
        <p className="text-muted">We'd love to hear from you</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold">General Inquiries</h2>
            <p>Email us at <a href="mailto:contact@common-dev-tools.com" className="underline">contact@common-dev-tools.com</a></p>
            <p>Response time: 48–72 hours.</p>
          </div>

          <div className="p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold">Legal / Terms</h2>
            <p>Email us at <a href="mailto:legal@common-dev-tools.com" className="underline">legal@common-dev-tools.com</a></p>
          </div>

          <div className="p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold">Security Issues</h2>
            <p>Email us at <a href="mailto:security@common-dev-tools.com" className="underline">security@common-dev-tools.com</a></p>
            <p>Please allow 24–48 hours for a response.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold">Bug Reports &amp; Features</h2>
            <p>
              Please open an issue on GitHub: <br />
              <a
                href="https://github.com/Manoj-Bharti/dev-tools/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                github.com/Manoj-Bharti/dev-tools/issues
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2>FAQ</h2>
        <ul className="space-y-4">
          <li>
            <strong>Is my data safe?</strong> Yes. All tools run in your browser
            and no data is sent to our servers.
          </li>
          <li>
            <strong>Is this really free?</strong> Yes, DevToolkit will always be
            free to use.
          </li>
          <li>
            <strong>Can I use these tools commercially?</strong> Absolutely.
          </li>
          <li>
            <strong>How can I contribute?</strong> Visit our GitHub repository,
            open an issue, or submit a pull request.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2>Response Expectations</h2>
        <p>
          We aim to respond to emails within the timeframes listed above. Please
          include as much detail as possible in your message so we can assist
          you efficiently.
        </p>
        <p>
          For bug reports, include steps to reproduce the issue and any relevant
          screenshots or tool inputs.
        </p>
      </section>
    </article>
  )
}
