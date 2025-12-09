import { motion } from "framer-motion";
import Layout from "@/components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-8">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 2024
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Websile ("we," "our," or "us") respects your privacy and is committed to 
                  protecting your personal data. This privacy policy explains how we collect, 
                  use, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Personal information (name, email address, phone number) when you contact us</li>
                  <li>Company information when you request a quote</li>
                  <li>Usage data about how you interact with our website</li>
                  <li>Technical data such as IP address, browser type, and device information</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Respond to your inquiries and provide our services</li>
                  <li>Improve our website and user experience</li>
                  <li>Send you relevant updates about our services (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">5. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may use third-party services (such as analytics providers) that collect, 
                  monitor, and analyze data to help us improve our services. These third parties 
                  have their own privacy policies.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of your personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">7. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website uses cookies to enhance your browsing experience. You can control 
                  cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this privacy policy or our practices, 
                  please contact us at:
                </p>
                <p className="text-muted-foreground">
                  Email: privacy@websile.com<br />
                  Address: San Francisco, CA
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of 
                  any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
