import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Introduction',
    content: `Andhra Darsan ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services to discover and book cultural experiences across Andhra Pradesh.`,
  },
  {
    title: '2. Information We Collect',
    items: [
      'Name and email address (provided during account registration)',
      'Google account profile information (when signing in with Google OAuth)',
      'Booking preferences and history',
      'Device and browser information collected automatically via cookies',
      'Usage data such as pages visited and interactions within the platform',
    ],
  },
  {
    title: '3. How We Use Your Information',
    items: [
      'To create and manage your user account',
      'To process and confirm experience bookings',
      'To send booking confirmations, reminders, and updates via email',
      'To improve our platform, content, and user experience',
      'To respond to your inquiries and provide customer support',
      'To send occasional newsletters (only if you opt in)',
    ],
  },
  {
    title: '4. Data Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share limited data with trusted service providers (such as payment processors and email delivery services) solely to operate our platform. All third-party providers are bound by confidentiality agreements.`,
  },
  {
    title: '5. Data Security',
    content: `Your data is stored securely via Supabase, which employs industry-standard encryption at rest and in transit. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '6. Cookies',
    content: `We use essential cookies to keep you signed in and remember your preferences. We do not use third-party tracking cookies for advertising. You can disable cookies in your browser settings, though this may affect your experience on our platform.`,
  },
  {
    title: '7. Your Rights',
    items: [
      'Access the personal data we hold about you',
      'Request correction of inaccurate information',
      'Request deletion of your account and associated data',
      'Withdraw consent for data processing at any time',
    ],
    footer: 'To exercise any of these rights, please contact us at the email address below.',
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions or concerns about this Privacy Policy, please reach out to us:`,
    contact: true,
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#8B0000] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#8B0000] mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: February 2026</p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>

              {section.content && (
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              )}

              {section.items && (
                <ul className="list-disc list-inside space-y-1.5 text-gray-600 leading-relaxed">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="text-gray-600 leading-relaxed mt-3">{section.footer}</p>
              )}

              {section.contact && (
                <div className="mt-3 bg-white border border-gray-200 rounded-xl p-5">
                  <p className="text-gray-700 font-medium">Andhra Darsan</p>
                  <a href="mailto:hello@andhradarsan.com" className="text-[#8B0000] hover:underline text-sm">
                    hello@andhradarsan.com
                  </a>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Andhra Darsan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
