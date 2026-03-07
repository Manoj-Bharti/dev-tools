import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service - DevToolkit',
  description: 'Terms of Service for DevToolkit. Read our terms governing the use of our free developer tools.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <article className="legal-page max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted mt-2">Last Updated: March 1, 2026</p>
      </header>

      <nav className="toc mb-12 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li><a href="#agreement">Agreement to Terms</a></li>
          <li><a href="#description">Description of Services</a></li>
          <li><a href="#intellectual-property">Intellectual Property Rights</a></li>
          <li><a href="#user-representations">User Representations and Warranties</a></li>
          <li><a href="#prohibited-activities">Prohibited Activities</a></li>
          <li><a href="#user-content">User Generated Content</a></li>
          <li><a href="#disclaimer">Disclaimer of Warranties</a></li>
          <li><a href="#limitation">Limitation of Liability</a></li>
          <li><a href="#indemnification">Indemnification</a></li>
          <li><a href="#term-termination">Term and Termination</a></li>
          <li><a href="#modifications">Modifications to Services</a></li>
          <li><a href="#governing-law">Governing Law and Dispute Resolution</a></li>
          <li><a href="#severability">Severability</a></li>
          <li><a href="#entire-agreement">Entire Agreement</a></li>
          <li><a href="#contact">Contact Information</a></li>
        </ol>
      </nav>

      <section id="agreement">
        <h2>Agreement to Terms</h2>
        <p>
          These Terms of Service (“Terms”) constitute a legally binding agreement
          between you (“User”, “you” or “your”) and DevToolkit (“we”, “us”, or
          “our”). By accessing or using the Site located at <a href="https://common-dev-tools.netlify.app" className="underline">
            https://common-dev-tools.netlify.app
          </a>, you agree to be bound by these Terms. If you do not agree with any of
          these Terms, you must discontinue your use of the Site immediately.
        </p>
        <p>
          You represent that you are at least 13 years of age (or the age of
          majority in your jurisdiction) and have the legal capacity to enter
          into this agreement.
        </p>
        <p>
          We may revise these Terms at any time by posting updated terms on this
          page. Your continued use of the Site after the changes are posted
          constitutes acceptance of the new Terms.
        </p>
      </section>

      <section id="description">
        <h2>Description of Services</h2>
        <p>
          DevToolkit provides a collection of free client-side developer tools,
          including but not limited to Base64 encoding/decoding, JSON formatting,
          JWT decoding, hash generation, and more. All processing occurs locally
          in your web browser; we do not transmit or store your data.
        </p>
        <p>
          The Site is provided “as is” with no guarantees regarding accuracy,
          completeness, or availability. Tools may produce unexpected results,
          and you should verify outputs independently when using them for
          critical tasks.
        </p>
      </section>

      <section id="intellectual-property">
        <h2>Intellectual Property Rights</h2>
        <p>
          All content, design, graphics, and code on the Site are the property of
          DevToolkit or its licensors and are protected by copyright,
          trademark, and other intellectual property laws. Except as expressly
          provided in these Terms, you may not copy, reproduce, modify, publish,
          distribute, or exploit any portion of the Site without prior written
          permission.
        </p>
        <p>
          You retain ownership of any data or content you input into the tools.
          We claim no rights over the information you process using the
          Site’s functionality.
        </p>
        <p>
          The software for this project is open source under the MIT License. The
          source code is available on GitHub at{' '}
          <a
            href="https://github.com/Manoj-Bharti/dev-tools"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            github.com/Manoj-Bharti/dev-tools
          </a>.
        </p>
      </section>

      <section id="user-representations">
        <h2>User Representations and Warranties</h2>
        <p>
          By using the Site, you represent and warrant that you:
        </p>
        <ul>
          <li>Are at least 13 years old (or the age of majority in your
            jurisdiction).</li>
          <li>Will use the Site lawfully and in accordance with these Terms.</li>
          <li>Will not engage in any unauthorized access, hacking, or security
            testing of the Site.</li>
          <li>Will not misuse the tools for malicious purposes, including creating
            malware or spam.</li>
        </ul>
      </section>

      <section id="prohibited-activities">
        <h2>Prohibited Activities</h2>
        <p>You agree not to engage in any of the following while using the Site:</p>
        <ul>
          <li>Use the Site for any illegal purpose or in violation of applicable
            laws.</li>
          <li>Attempt to disrupt, degrade, or impair the Site’s operation (e.g.
            DDoS attacks, brute-force attempts).</li>
          <li>Scrape or crawl the Site using automated tools beyond reasonable
            limits.</li>
          <li>Attempt to circumvent security measures or access restricted areas.
          </li>
          <li>Pretend to be another person or entity (impersonation).</li>
          <li>Distribute viruses, worms, malware, or other harmful code via the
            Site.</li>
        </ul>
      </section>

      <section id="user-content">
        <h2>User Generated Content</h2>
        <p>
          The Site does not store or retain any user-generated content. Any data
          you input into the tools is processed locally in your browser and not
          transmitted to us. Therefore, there is no mechanism for us to display,
          modify, or delete such content.
        </p>
      </section>

      <section id="disclaimer">
        <h2>Disclaimer of Warranties</h2>
        <p>
          THE SITE AND ALL SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITH
          NO WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT
          PERMITTED BY LAW, DEVTOOLKIT DISCLAIMS ALL WARRANTIES, INCLUDING BUT
          NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR
          FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE ARE NOT RESPONSIBLE FOR
          RESULTS GENERATED BY ANY TOOL AND DISCLAIM LIABILITY FOR ANY DECISIONS
          YOU MAKE BASED ON OUTPUT.
        </p>
      </section>

      <section id="limitation">
        <h2>Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL DEVTOOLKIT OR
          ITS CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS
          OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING OUT
          OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF THE SITE.
        </p>
        <p>
          OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATING TO
          THESE TERMS OR THE SITE SHALL NOT EXCEED ONE HUNDRED DOLLARS (USD
          $100) OR THE AMOUNT YOU PAID US, IF ANY, WHICHEVER IS LESS.
        </p>
      </section>

      <section id="indemnification">
        <h2>Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless DevToolkit and its
          officers, directors, employees, agents, and affiliates from and against
          any claims, liabilities, damages, losses, costs, and expenses (including
          reasonable attorneys’ fees) arising out of or in any way connected with
          your use of the Site, violation of these Terms, or infringement of any
          intellectual property or other rights of any person or entity.
        </p>
      </section>

      <section id="term-termination">
        <h2>Term and Termination</h2>
        <p>
          These Terms remain in effect while you use the Site. We reserve the
          right to modify, suspend, or discontinue the Site or any portion
          thereof at any time without notice. We may also terminate or restrict
          your access for any reason, including suspected breach of these Terms.
        </p>
        <p>
          Upon termination, you must cease all use of the Site. Sections
          regarding disclaimers, limitations of liability, indemnification,
          intellectual property, and governing law shall survive any termination.
        </p>
      </section>

      <section id="modifications">
        <h2>Modifications to Services</h2>
        <p>
          We reserve the right to change, suspend, or discontinue any aspect of
          the Site at any time without liability or notice. We may add, delete,
          or modify features and tools as we see fit. Your continued use after
          changes constitutes acceptance.
        </p>
      </section>

      <section id="governing-law">
        <h2>Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the State of California, United States, without regard to its
          conflict of laws principles. Any disputes arising from these Terms or
          your use of the Site shall be resolved exclusively in the state or
          federal courts located in San Francisco County, California, and you
          consent to personal jurisdiction in those courts.
        </p>
        <p>
          You and we both waive any right to a jury trial and agree to resolve
          disputes through binding arbitration administered by a nationally
          recognized arbitration service (e.g., JAMS or AAA) under the rules
          chosen by that service. The arbitration will take place in San
          Francisco, California, or via teleconference. Notwithstanding the
          foregoing, either party may seek injunctive or other equitable relief
          in a court of competent jurisdiction.
        </p>
      </section>

      <section id="severability">
        <h2>Severability</h2>
        <p>
          If any provision of these Terms is found to be invalid or unenforceable
          by a court of competent jurisdiction, the remaining provisions will
          remain in full force and effect.
        </p>
      </section>

      <section id="entire-agreement">
        <h2>Entire Agreement</h2>
        <p>
          These Terms constitute the entire agreement between you and DevToolkit
          regarding your use of the Site and supersede all prior or contemporaneous
          communications and proposals, whether oral, written or electronic, between
          you and DevToolkit.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Information</h2>
        <p>
          If you have questions or concerns about these Terms, please contact us
          at <a href="mailto:legal@common-dev-tools.com" className="underline">legal@common-dev-tools.com</a>.
          We strive to respond within 48–72 hours. For technical issues or bug
          reports, you may also open an issue on our GitHub repository at{' '}
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
    </article>
  )
}
