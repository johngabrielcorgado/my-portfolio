export const metadata = {
  title: "Privacy Policy | Gabriel Corgado Portfolio",
  description:
    "Privacy Policy outlining how personal data is collected, used, and protected in compliance with Philippine laws.",
};

const lastUpdated = "October 20, 2025";

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-8 py-24 md:py-32 text-slate-200">
      <header className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-10 text-sm sm:text-base leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Overview</h2>
          <p>
            This Privacy Policy explains how I, Gabriel Corgado, collect, use,
            store, and protect personal data received through this portfolio
            website and its contact form. The policy complies with Republic Act
            No. 10173 or the Data Privacy Act of 2012 (DPA) and its
            Implementing Rules and Regulations, as well as guidance from the
            National Privacy Commission (NPC).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            2. Personal Data Collected
          </h2>
          <p>
            When you submit an inquiry via the contact form, I collect the
            following information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>First and last name</li>
            <li>Email address</li>
            <li>Project details or message content</li>
            <li>Any additional information you voluntarily include</li>
          </ul>
          <p>
            No automated decision-making or profiling is performed, and this
            website does not use tracking cookies or third-party analytics tools
            at this time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            3. Purpose and Legal Basis
          </h2>
          <p>Personal data is processed for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Responding to your inquiries or project proposals</li>
            <li>Maintaining a record of communications for project tracking</li>
            <li>Fulfilling legal obligations or responding to lawful requests</li>
          </ul>
          <p>
            Processing is based on your consent when you provide information
            through the contact form and on legitimate interest to communicate
            with potential clients.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            4. Data Sharing and Disclosure
          </h2>
          <p>
            Your information will not be sold or shared with third parties
            except in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              When required by law, regulation, or legal process (e.g., valid
              subpoena or order).
            </li>
            <li>
              When necessary to protect my rights, property, or safety, or that
              of others.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            5. Storage and Security
          </h2>
          <p>
            Messages sent through the contact form are transmitted via email
            using secure SMTP transport. Reasonable physical, technical, and
            organizational safeguards are implemented to protect data, including
            encrypted transmission, access controls, and routine monitoring of
            hosting infrastructure. Personal data is retained only as long as
            necessary to fulfill the stated purposes or to comply with legal
            obligations, and it is securely deleted thereafter.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            6. Your Rights Under the DPA
          </h2>
          <p>
            As a data subject under Philippine law, you are entitled to the
            following rights:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Be informed of how your personal data is collected and used</li>
            <li>Access and request a copy of personal data held about you</li>
            <li>Rectify inaccurate or incomplete personal data</li>
            <li>Object to or request restriction of processing</li>
            <li>Request deletion of personal data when legally permissible</li>
            <li>
              File a complaint with the National Privacy Commission if you
              believe your rights have been violated
            </li>
          </ul>
          <p>
            To exercise these rights, please reach out via the contact details
            below. Requests will be addressed in accordance with NPC guidelines.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            7. International Data Transfers
          </h2>
          <p>
            This portfolio is hosted on infrastructure that may be located
            outside the Philippines. By submitting your information, you consent
            to the transfer and processing of your data in jurisdictions that
            may have different data protection rules. Adequate safeguards are
            maintained to protect your data in accordance with the Data Privacy
            Act.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            8. Updates to this Policy
          </h2>
          <p>
            This Privacy Policy may be updated to reflect changes in laws,
            technology, or business practices. Significant updates will be
            posted on this page with a revised “Last updated” date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">9. Contact</h2>
          <p>
            For privacy-related questions or to exercise your data subject
            rights, please contact:
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
          <p>
            If you require further assistance, you may also contact the National
            Privacy Commission at{" "}
            <a
              href="https://www.privacy.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              privacy.gov.ph
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
