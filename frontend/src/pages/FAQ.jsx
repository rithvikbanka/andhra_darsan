import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';
import { faqs } from '../mock';

const FAQ = () => {
  return (
    <div className="bg-[#FAF7F0] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90">
            Everything you need to know about Andhra Darsan experiences
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {faqs.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#8B0000] mb-6">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {section.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${sectionIndex}-${faqIndex}`}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <AccordionTrigger className="text-left font-semibold text-[#2C2C2C] hover:text-[#8B0000] transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#5C5C5C] leading-relaxed pt-2">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="border-0 shadow-xl mt-12 bg-gradient-to-r from-[#FAF7F0] to-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
              Still Have Questions?
            </h3>
            <p className="text-[#5C5C5C] mb-6">
              Our experience curators are here to help you plan the perfect cultural journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210">
                <button className="px-6 py-3 bg-[#8B0000] hover:bg-[#6B0000] text-white rounded-md transition-colors">
                  Call Us: +91 98765 43210
                </button>
              </a>
              <a href="mailto:hello@andhradarsan.com">
                <button className="px-6 py-3 border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-md transition-colors">
                  Email: hello@andhradarsan.com
                </button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
