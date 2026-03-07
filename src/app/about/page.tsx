import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - DevToolkit',
  description: 'Learn about DevToolkit, a privacy-first collection of free developer utilities. All tools run in your browser, no data collection.',
}

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
      <header className="mb-12">
        <h1>About DevToolkit</h1>
        <p className="text-muted">Privacy-first developer tools, built by developers</p>
      </header>

      <section>
        <h2>Our Mission</h2>
        <p>
          DevToolkit was born out of frustration. Every day, developers hop
          between countless websites just to encode a string in Base64 or test a
          regular expression. Many of those sites are slow, bloated with ads, and
          often collect more data than they need.
        </p>
        <p>
          Our mission is simple: bring together essential utilities in one place
          that is fast, reliable, and respects your privacy. No tracking, no
          cookies, no servers – just tools that run entirely in your browser.
        </p>
      </section>

      <section>
        <h2>How It Works</h2>
        <p>
          Every feature on DevToolkit operates client-side. When you paste data
          into a tool, the computation happens in your device’s memory. We do not
          transmit your input anywhere, and we do not store results on a
          server. This keeps things lightning-fast and ensures your data stays
          with you.
        </p>
        <p>
          The project is open source, and you can inspect the code or run a copy
          locally if you wish. It’s free forever – no subscriptions, no
          donations, just a small collection of utilities made by developers for
          developers.
        </p>
      </section>

      <section>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Privacy first</strong> – we collect nothing and we mean it.</li>
          <li><strong>Speed &amp; performance</strong> – minimal dependencies and
            efficient code.</li>
          <li><strong>Developer experience</strong> – simple UI, no distractions.</li>
          <li><strong>Open source</strong> – everything is available on GitHub for
            review and contribution.</li>
        </ul>
      </section>

      <section>
        <h2>Open Source</h2>
        <p>
          The source code for DevToolkit lives on GitHub under the MIT License.
          Feel free to browse, fork, or contribute.
        </p>
        <p>
          <a href="https://github.com/Manoj-Bharti/dev-tools" target="_blank" rel="noopener noreferrer" className="underline">
            github.com/Manoj-Bharti/dev-tools
          </a>
        </p>
        <p>
          If you find a bug or have an idea for a new tool, open an issue or send
          a pull request. Stars are appreciated!
        </p>
      </section>

      <section>
        <h2>Roadmap</h2>
        <p>
          We’re constantly adding and improving tools based on community feedback.
          Some areas we’re looking at include:
        </p>
        <ul>
          <li>Additional encoding/decoding utilities</li>
          <li>More advanced JSON and data transformation helpers</li>
          <li>Accessibility and performance enhancements</li>
          <li>Community-suggested tools</li>
        </ul>
        <p>
          Have an idea? Let us know via GitHub issues or the contact page below.
        </p>
      </section>

      <section>
        <h2>Behind the Project</h2>
        <p>
          DevToolkit is a community-driven effort. A team of anonymous developers
          and contributors came together to solve a common pain point: the
          proliferation of scattered, privacy-invasive tools on the web. By
          keeping the project anonymous and attributing the work to “DevToolkit
          Contributors,” we emphasize that this is a collective effort, not a
          personal brand.
        </p>
      </section>

      <section>
        <h2>Get Involved</h2>
        <p>
          Want to help? Here’s how you can get involved:
        </p>
        <ul>
          <li>Contribute code or documentation on GitHub.</li>
          <li>Report bugs or request features through GitHub issues.</li>
          <li>Share the site with your friends and colleagues.</li>
          <li>Submit improvements to accessibility or performance.</li>
        </ul>
      </section>
    </article>
  )
}
