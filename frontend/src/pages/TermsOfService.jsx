import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Andhra Darsan website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our platform. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of those changes.`,
  },
  {
    title: '2. Use of Services',
    content: `Andhra Darsan provides a platform for discovering and booking curated cultural experiences across Andhra Pradesh — including heritage walks, temple visits, handloom workshops, culinary journeys, and nature explorations. Our services are intended for personal, non-commercial use. You agree not to misuse the platform, attempt to gain unauthorized access, or interfere with its operation.`,
  },
  {
    title: '3. User Accounts',
    items: [
      'You may create an account using your email address or Google OAuth.',
      'You are responsible for maintaining the confidentiality of your login credentials.',
      'You agree to provide accurate, current, and complete information during registration.',
      'You must notify us immediately of any unauthorized use of your account.',
      'We reserve the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    title: '4. Bookings and Payments',
    items: [
      'All experience bookings are subject to availability and confirmation.',
      'Prices displayed are in Indian Rupees (₹) and are subject to change without prior notice.',
      'Full payment is required at the time of booking unless otherwise specified.',
      'Cancellation and refund policies vary by experience — details are provided on each experience page before booking.',
      'Andhra Darsan acts as a facilitator between you and local experience providers. We are not liable for the actions or omissions of third-party providers.',
    ],
  },
  {
    title: '5. Intellectual Property',
    content: `All content on the Andhra Darsan platform — including text, images, logos, design, and code — is the property of Andhra Darsan or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written consent.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `Andhra Darsan is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied. We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to loss of data, revenue, or profit.`,
  },
  {
    title: '7. Governing Law',
    content: `These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Andhra Pradesh, India.`,
  },
  {
    title: '8. Contact',
    content: `If you have any questions about these Terms of Service, please contact us:`,
    contact: true,
  },
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#8B0000] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#8B0000] mb-2">Terms of Service</h1>
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

export default TermsOfService;
