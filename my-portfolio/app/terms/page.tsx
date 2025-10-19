export const metadata = {
  title: "Terms and Conditions | Gabriel Corgado Portfolio",
  description:
    "Terms and Conditions governing the use of Gabriel Corgado's portfolio website in accordance with Philippine laws.",
};

const lastUpdated = "October 20, 2025";

export default function TermsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-8 py-24 md:py-32 text-slate-200">
      <header className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          Terms and Conditions
        </h1>
        <p className="text-sm text-slate-400">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-10 text-sm sm:text-base leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Acceptance</h2>
          <p>
            By accessing or using this portfolio website, you agree to comply
            with these Terms and Conditions, the Data Privacy Act of 2012
            (Republic Act No. 10173), Consumer Act of the Philippines (Republic
            Act No. 7394), E-Commerce Act (Republic Act No. 8792), and other
            applicable Philippine laws. If you do not agree with any part of
            these terms, please refrain from using the site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            2. Intellectual Property
          </h2>
          <p>
            All content on this site—including text, code snippets, designs,
            logos, graphics, and media—is owned by Gabriel Corgado unless
            otherwise indicated. Content is protected by Philippine intellectual
            property laws and relevant international treaties. You may view the
            content for personal reference but must obtain express written
            consent before copying, redistributing, or using it for commercial
            purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            3. Acceptable Use
          </h2>
          <p>
            You agree not to misuse this site, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Introducing viruses or malicious code</li>
            <li>
              Attempting unauthorized access to the site or associated
              infrastructure
            </li>
            <li>
              Using automated bots or scraping tools without prior written
              consent
            </li>
            <li>
              Engaging in activities that violate any Philippine law, regulation
              by the National Privacy Commission, or other applicable authority
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            4. User Submissions
          </h2>
          <p>
            Information submitted through the contact form must be accurate and
            lawfully provided. You remain responsible for the content of your
            message and warrant that it does not infringe on any rights or
            contain unlawful material. By submitting information, you grant
            permission to use it solely for responding to your inquiry or
            providing related services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            5. Portfolio Showcases
          </h2>
          <p>
            Projects showcased are representations of work completed or under
            development. While efforts are made to keep details accurate and
            current, I do not guarantee the completeness, reliability, or
            availability of external client websites.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            6. Third-Party Links
          </h2>
          <p>
            This site may link to third-party websites for project examples or
            resources. These links are provided for convenience and do not
            signify endorsement. I am not responsible for the content, security,
            or privacy practices of external sites. Please review their terms
            and privacy policies before engaging.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            7. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by Philippine law, I shall not be
            liable for any direct, indirect, incidental, punitive, or
            consequential damages arising from your use of this site or reliance
            on its content. The site is provided “as is” and “as available,”
            without warranties of any kind.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            8. Indemnification
          </h2>
          <p>
            You agree to indemnify and hold harmless Gabriel Corgado from any
            claims, damages, liabilities, costs, or expenses (including legal
            fees) arising from your breach of these Terms, misuse of the site,
            or violation of any law or rights of a third party.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            9. Changes to the Terms
          </h2>
          <p>
            I reserve the right to modify these Terms at any time to reflect
            updates in law, services, or business practices. Significant
            revisions will be posted on this page with an updated effective
            date. Continued use of the site after changes constitutes acceptance
            of the revised Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            10. Governing Law and Venue
          </h2>
          <p>
            These Terms are governed by the laws of the Republic of the
            Philippines. Disputes shall be resolved exclusively before the
            appropriate courts of Taguig City or Makati City, to the exclusion
            of other venues.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">11. Contact</h2>
          <p>
            For questions or concerns regarding these Terms, please contact:
          </p>
          <address className="not-italic text-slate-300">
            Gabriel Corgado
            <br />
            Metro Manila, Philippines
            <br />
            Email:{" "}
            <a
              href="mailto:corgadogabriel@gmail.com"
              className="text-purple-400 hover:text-purple-300"
            >
              corgadogabriel@gmail.com
            </a>
          </address>
        </section>
      </div>
    </section>
  );
}
