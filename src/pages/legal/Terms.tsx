import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>

          <Card className="glass-effect">
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-8 space-y-6">
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using zdev's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>User actions and system events may be logged for security and audit purposes.</li>
                  <li>Cloudflare Turnstile CAPTCHA is used to protect sensitive actions.</li>
                  <li>Turnstile may set cookies for bot protection and session management.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on zdev's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on zdev's website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Custom Development Services</h2>
                <p>
                  All custom development work is provided on a project basis. The scope, timeline, and pricing will be agreed upon before work begins. Any changes to the project scope may result in additional charges.
                </p>
                <p className="mt-3">
                  Source code and deliverables become your property upon full payment, unless otherwise specified in the project agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. License Key Usage</h2>
                <p>
                  For projects that include license keys:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>License keys are tied to specific domains or servers as agreed upon</li>
                  <li>Unauthorized use or distribution of license keys is prohibited</li>
                  <li>We reserve the right to deactivate license keys that violate terms</li>
                  <li>Support and updates are provided as specified in your project agreement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Payment Terms</h2>
                <p>
                  Payment terms will be outlined in your project proposal. Generally:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>50% deposit required before work begins</li>
                  <li>Remaining balance due upon project completion</li>
                  <li>Late payments may result in service suspension</li>
                  <li>All prices are in USD unless otherwise specified</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Warranty & Liability</h2>
                <p>
                  The materials on zdev's website and delivered projects are provided on an 'as is' basis. zdev makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitations</h2>
                <p>
                  In no event shall zdev or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on zdev's website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Revisions and Errata</h2>
                <p>
                  The materials appearing on zdev's website could include technical, typographical, or photographic errors. zdev does not warrant that any of the materials on its website are accurate, complete, or current. zdev may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications to Terms</h2>
                <p>
                  zdev may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                  <br />
                  <a href="mailto:support@zdev.dev" className="text-primary hover:underline">
                    support@zdev.dev
                  </a>
                </p>
              </section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PublicLayout>
  );
};

export default Terms;
