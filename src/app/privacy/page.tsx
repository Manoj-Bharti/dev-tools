import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - DevToolkit',
  description: 'DevToolkit Privacy Policy. We do not collect, store, or transmit any personal information. All tools run entirely in your browser.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <article className="legal-page max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted mt-2">Last Updated: March 1, 2026</p>
      </header>

      {/* Table of Contents */}
      <nav className="toc mb-12 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li><a href="#introduction">Introduction</a></li>
          <li><a href="#information-we-collect">Information We Collect</a></li>
          <li><a href="#how-we-use">How We Use Your Information</a></li>
          <li><a href="#cookies">Cookies and Tracking Technologies</a></li>
          <li><a href="#third-party">Third-Party Services</a></li>
          <li><a href="#data-storage">Data Storage and Security</a></li>
          <li><a href="#your-rights">Your Privacy Rights</a></li>
          <li><a href="#children">Children's Privacy</a></li>
          <li><a href="#international">International Data Transfers</a></li>
          <li><a href="#changes">Changes to This Privacy Policy</a></li>
          <li><a href="#data-retention">Data Retention</a></li>
          <li><a href="#do-not-track">Do Not Track Signals</a></li>
          <li><a href="#california">California Privacy Rights (CCPA)</a></li>
          <li><a href="#eu-users">European Union Users (GDPR)</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ol>
      </nav>

      {/* Content Sections */}
      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          DevToolkit (“we,” “us,” or “our”) is committed to protecting the privacy of
          visitors to <a href="https://common-dev-tools.netlify.app" className="underline">https://common-dev-tools.netlify.app</a> (the “Site").
          This Privacy Policy explains how we handle information when you access
          or use our services. Because all tools run entirely in your browser and
          we collect no personal data, this policy is intentionally straightforward.
        </p>
      </section>

      <section id="information-we-collect">
        <h2>Information We Collect</h2>
        <p>
          We do not collect any personal information from users. All processing is
          performed on the client side in your browser. We do not store, transmit,
          or record any data that you enter into the tools. There are no user
          accounts, no sign‑ups, and no back‑end servers processing your input.
        </p>
        <p>
          Because we collect nothing, we are unable to associate data with you or
          any device, and we cannot fulfill data access or deletion requests in a
          meaningful way. If we ever add features that collect information, this
          policy will be updated accordingly.
        </p>
      </section>

      <section id="how-we-use">
        <h2>How We Use Your Information</h2>
        <p>
          As we do not collect any information, there is nothing to use. All
          operations occur entirely within your web browser. Your input data
          remains on your device and is not shared with us or any third party.
        </p>
      </section>

      <section id="cookies">
        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We do not use cookies, web beacons, or any other tracking technologies.
          There is no analytics, no advertising, and no third-party trackers. If
          we ever implement analytics or similar technologies, we will update this
          section and give users the ability to opt out.
        </p>
      </section>

      <section id="third-party">
        <h2>Third-Party Services</h2>
        <p>
          Our Site is hosted on Netlify. Netlify may collect minimal technical
          information (e.g. IP address, user agent) strictly to serve the site.
          We do not control or access any data Netlify collects. You can review
          Netlify’s privacy practices at{' '}
          <a href="https://www.netlify.com/privacy/" className="underline" target="_blank" rel="noopener noreferrer">
            https://www.netlify.com/privacy/
          </a>.
        </p>
        <p>
          Other than hosting, we do not employ any third-party services that
          collect or process personal information. If additional services are
          added in the future, this section will be updated.
        </p>
      </section>

      <section id="data-storage">
        <h2>Data Storage and Security</h2>
        <p>
          Because all functionality runs client-side, there is no data stored on
          our servers. Your browser handles every operation and the results remain
          in your device’s memory. We do not maintain databases, logs, or backups
          of user data.
        </p>
        <p>
          You can always clear your browser cache or close the tab to remove any
          temporary data. We employ standard security practices on the Site, but
          since no personal information is collected, risks are minimal.
        </p>
      </section>

      <section id="your-rights">
        <h2>Your Privacy Rights</h2>
        <p>
          Even though we do not collect personal data, we outline your rights to
          be transparent and comply with applicable privacy laws.
        </p>
        <h3>GDPR Rights</h3>
        <ul>
          <li>Right to access – Not applicable.</li>
          <li>Right to rectification – Not applicable.</li>
          <li>Right to erasure – Not applicable.</li>
          <li>Right to restrict processing – Not applicable.</li>
          <li>Right to object – Not applicable.</li>
          <li>Right to data portability – Not applicable.</li>
        </ul>
        <h3>CCPA Rights</h3>
        <ul>
          <li>Right to know – We do not collect or share personal information.</li>
          <li>Right to delete – Not applicable.</li>
          <li>Right to opt‑out of sale – We do not sell data.</li>
          <li>Right to non‑discrimination – Not applicable.</li>
        </ul>
        <p>
          If you have concerns, you may contact us using the information below.
        </p>
      </section>

      <section id="children">
        <h2>Children's Privacy</h2>
        <p>
          Our Site is not directed at children under the age of 13. We do not
          knowingly collect personal information from anyone, including children.
          If we become aware that a child under 13 has provided us with personal
          data, we will delete it promptly. By using the Site, you represent that
          you are at least 13 years of age (or the age of majority in your
          jurisdiction).
        </p>
      </section>

      <section id="international">
        <h2>International Data Transfers</h2>
        <p>
          Since we do not collect or transfer personal information, international
          data transfer provisions do not apply. If we begin processing
          information in the future, we will comply with applicable laws
          governing cross-border transfers.
        </p>
      </section>

      <section id="changes">
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The “Last Updated”
          date at the top will reflect any changes. You are encouraged to review
          this page periodically. Continued use of the Site after changes are
          posted constitutes acceptance of the revised policy.
        </p>
      </section>

      <section id="data-retention">
        <h2>Data Retention</h2>
        <p>
          We retain no user data because we collect none. Any information you
          enter remains in your browser memory and is cleared when you close the
          page or refresh. There is no retention period to disclose.
        </p>
      </section>

      <section id="do-not-track">
        <h2>Do Not Track Signals</h2>
        <p>
          We do not respond to Do Not Track signals because we do not track or
          store any information. In the event we add tracking in the future, this
          policy will be modified accordingly.
        </p>
      </section>

      <section id="california">
        <h2>California Privacy Rights (CCPA)</h2>
        <p>
          Under the California Consumer Privacy Act, California residents have
          rights regarding personal information. Since we do not collect
          personal information, these rights are not applicable. For more
          information on CCPA, please visit{' '}
          <a href="https://oag.ca.gov/privacy/ccpa" className="underline" target="_blank" rel="noopener noreferrer">
            the California Attorney General’s website
          </a>.
        </p>
      </section>

      <section id="eu-users">
        <h2>European Union Users (GDPR)</h2>
        <p>
          This Site is intended for use by individuals worldwide. We have no
          designated data controller because we do not collect personal
          information. If you are located in the EU or European Economic Area,
          please note that no personal data is processed through this Site. By
          using the Site, you acknowledge that we are not acting as a data
          controller or processor under GDPR.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our practices,
          please contact us. For technical issues or feature
          requests, you may also open an issue on our GitHub repository at{' '}
          <a
            href="https://github.com/Manoj-Bharti/dev-tools/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            github.com/Manoj-Bharti/dev-tools/issues
          </a>.
        </p>
      </section>

      {/* Contact Footer (redundant footer?) maybe not needed because Footer component handles but we include separate? We'll leave next section for if needed. */}
    </article>
  )
}
