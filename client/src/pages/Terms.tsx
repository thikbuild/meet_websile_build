import { motion } from "framer-motion";
import Layout from "@/components/Layout";

export default function Terms() {
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
              Terms of Use
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 2024
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By accessing and using the Websile website, you accept and agree to be bound by 
                  these terms and conditions. If you do not agree to these terms, please do not 
                  use our website.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">2. Use of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to use our services only for lawful purposes and in accordance with 
                  these terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Use the website in any way that violates applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to any part of our systems</li>
                  <li>Transmit any malicious code or interfere with the website's functionality</li>
                  <li>Collect user information without consent</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">3. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of Websile and is protected by intellectual property laws. You may 
                  not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">4. Client Projects</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When we work with you on a project:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>You retain ownership of your brand assets and content</li>
                  <li>We retain ownership of our proprietary tools and methodologies</li>
                  <li>Upon full payment, you receive rights to the deliverables as specified in your contract</li>
                  <li>We may showcase the work in our portfolio unless agreed otherwise</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Websile shall not be liable for any indirect, incidental, special, or consequential 
                  damages arising from your use of our website or services. Our total liability shall 
                  not exceed the amount you paid for our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">6. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website may contain links to third-party websites. We are not responsible for 
                  the content, privacy practices, or terms of use of these external sites.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">7. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting to this page. Your continued use of the website constitutes 
                  acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif mb-4">8. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These terms shall be governed by and construed in accordance with the laws of 
                  the State of California, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif mb-4">9. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, please contact us at legal@websile.com.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
