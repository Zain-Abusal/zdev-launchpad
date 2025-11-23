import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck } from 'lucide-react';

const GDPR = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FileCheck className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">GDPR Compliance</h1>
          </div>

          <Card className="glass-effect">
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-8 space-y-6">
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">GDPR Compliance Statement</h2>
                <p>
                  zdev is committed to complying with the General Data Protection Regulation (GDPR) and respecting the privacy rights of individuals in the European Union (EU) and European Economic Area (EEA). This document outlines our GDPR compliance measures and your rights under GDPR.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Legal Basis for Processing</h2>
                <p>
                  We process personal data under the following legal bases:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Contract Performance:</strong> To fulfill our contractual obligations for custom development services</li>
                  <li><strong>Consent:</strong> When you explicitly agree to specific processing activities</li>
                  <li><strong>Legitimate Interests:</strong> For improving our services, security, and business operations</li>
                  <li><strong>Legal Obligations:</strong> When required to comply with legal requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Your GDPR Rights</h2>
                <p>
                  Under GDPR, you have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-3 mt-3">
                  <li>
                    <strong>Right to Access (Article 15):</strong> Request confirmation of whether we process your personal data and obtain a copy
                  </li>
                  <li>
                    <strong>Right to Rectification (Article 16):</strong> Request correction of inaccurate or incomplete personal data
                  </li>
                  <li>
                    <strong>Right to Erasure (Article 17):</strong> Request deletion of your personal data under certain circumstances
                  </li>
                  <li>
                    <strong>Right to Restriction (Article 18):</strong> Request restriction of processing under certain conditions
                  </li>
                  <li>
                    <strong>Right to Data Portability (Article 20):</strong> Receive your personal data in a structured, commonly used format
                  </li>
                  <li>
                    <strong>Right to Object (Article 21):</strong> Object to processing based on legitimate interests or direct marketing
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent (Article 7):</strong> Withdraw consent at any time where processing is based on consent
                  </li>
                  <li>
                    <strong>Right to Lodge a Complaint (Article 77):</strong> File a complaint with a supervisory authority
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Protection Officer</h2>
                <p>
                  For GDPR-related inquiries, you can contact our Data Protection Officer at:
                  <br />
                  <a href="mailto:dpo@zdev.dev" className="text-primary hover:underline">
                    dpo@zdev.dev
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Processing Activities</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personal Data We Process:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Identity data (name, username)</li>
                      <li>Contact data (email, phone number)</li>
                      <li>Technical data (IP address, browser type)</li>
                      <li>Usage data (how you use our services)</li>
                      <li>Project data (information about your custom development projects)</li>
                      <li>Transaction data (payment and billing information)</li>
                      <li>User actions and system events (for security and audit purposes)</li>
                      <li>Cloudflare Turnstile CAPTCHA status and cookies (for bot protection)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Purpose of Processing:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Providing and managing our services</li>
                      <li>Communicating with you about your projects</li>
                      <li>Processing payments and transactions</li>
                      <li>Improving our services and user experience</li>
                      <li>Complying with legal obligations</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security Measures</h2>
                <p>
                  We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Pseudonymization and encryption of personal data</li>
                  <li>Regular security assessments and vulnerability testing</li>
                  <li>Confidentiality agreements with employees and contractors</li>
                  <li>Incident response and breach notification procedures</li>
                  <li>Regular backup and disaster recovery procedures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">6. International Data Transfers</h2>
                <p>
                  When we transfer personal data outside the EU/EEA, we ensure appropriate safeguards are in place, such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                  <li>Adequacy decisions for certain countries</li>
                  <li>Explicit consent where applicable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Retention periods vary depending on:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>The nature of the data and purpose of processing</li>
                  <li>Legal and regulatory requirements</li>
                  <li>Our legitimate business needs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Automated Decision-Making</h2>
                <p>
                  We do not use automated decision-making, including profiling, that produces legal effects or similarly significantly affects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">9. Exercising Your Rights</h2>
                <p>
                  To exercise any of your GDPR rights, please contact us at:
                </p>
                <ul className="list-none space-y-2 mt-3">
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:gdpr@zdev.dev" className="text-primary hover:underline">
                      gdpr@zdev.dev
                    </a>
                  </li>
                  <li>
                    <strong>Subject Line:</strong> GDPR Rights Request
                  </li>
                </ul>
                <p className="mt-3">
                  We will respond to your request within one month, as required by GDPR. In complex cases, we may extend this period by two additional months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">10. Complaints</h2>
                <p>
                  If you believe we have not complied with GDPR, you have the right to lodge a complaint with your local supervisory authority. However, we encourage you to contact us first so we can address your concerns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">11. Updates to This Statement</h2>
                <p>
                  We may update this GDPR compliance statement from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated statement on our website.
                </p>
              </section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PublicLayout>
  );
};

export default GDPR;
