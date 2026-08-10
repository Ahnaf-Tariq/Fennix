export interface LegalSubsection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  closingParagraphs?: string[]
}

export interface LegalSection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  closingParagraphs?: string[]
  subsections?: LegalSubsection[]
}

export interface LegalDocument {
  title: string
  lastUpdated: string
  sections: LegalSection[]
  contactEmail?: string
}

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "July 31, 2026",
  contactEmail: "privacy@fennix.ai",
  sections: [
    {
      title: "1. Introduction",
      paragraphs: [
        "At Fennix, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Service.",
      ],
    },
    {
      title: "2. Information We Collect",
      subsections: [
        {
          title: "2.1 Personal Information",
          paragraphs: [
            "We may collect personal information that you voluntarily provide to us when you:",
          ],
          bullets: [
            "Register for an account",
            "Use our Service",
            "Contact us for support",
            "Subscribe to our newsletter",
          ],
        },
        {
          title: "2.2 Usage Data",
          paragraphs: [
            "We automatically collect certain information when you access and use the Service, including:",
          ],
          bullets: [
            "Device information (IP address, browser type, operating system)",
            "Usage patterns and preferences",
            "Log data and analytics",
            "Cookies and similar tracking technologies",
          ],
        },
      ],
    },
    {
      title: "3. How We Use Your Information",
      paragraphs: ["We use the information we collect to:"],
      bullets: [
        "Provide, maintain, and improve our Service",
        "Process your transactions and manage your account",
        "Send you technical notices, updates, and support messages",
        "Respond to your comments, questions, and requests",
        "Monitor and analyze trends, usage, and activities",
        "Detect, prevent, and address technical issues",
        "Personalize and improve your experience",
      ],
    },
    {
      title: "4. Information Sharing and Disclosure",
      paragraphs: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
      ],
      bullets: [
        "With your consent",
        "To comply with legal obligations",
        "To protect and defend our rights or property",
        "With service providers who assist us in operating our Service",
        "In connection with a business transfer or merger",
      ],
    },
    {
      title: "5. Data Security",
      paragraphs: [
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "6. Cookies and Tracking Technologies",
      paragraphs: [
        "We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.",
      ],
    },
    {
      title: "7. Your Rights",
      paragraphs: [
        "Depending on your location, you may have certain rights regarding your personal information, including:",
      ],
      bullets: [
        "The right to access your personal information",
        "The right to rectify inaccurate information",
        "The right to request deletion of your information",
        "The right to object to processing of your information",
        "The right to data portability",
        "The right to withdraw consent",
      ],
    },
    {
      title: "8. Data Retention",
      paragraphs: [
        "We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
      ],
    },
    {
      title: "9. Children's Privacy",
      paragraphs: [
        "Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
      ],
    },
    {
      title: "10. Changes to This Privacy Policy",
      paragraphs: [
        'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.',
      ],
    },
    {
      title: "11. Contact Us",
      paragraphs: [
        "If you have any questions about this Privacy Policy, please contact us at privacy@fennix.ai.",
      ],
    },
  ],
}

export const termsOfService: LegalDocument = {
  title: "Terms & Conditions",
  lastUpdated: "July 31, 2026",
  contactEmail: "legal@fennix.ai",
  sections: [
    {
      title: "1. Acceptance of Terms",
      paragraphs: [
        'By accessing and using Fennix ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
      ],
    },
    {
      title: "2. Use License",
      paragraphs: [
        "Permission is granted to temporarily download one copy of the materials on Fennix's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
      ],
      bullets: [
        "Modify or copy the materials",
        "Use the materials for any commercial purpose or for any public display",
        "Attempt to reverse engineer any software contained on Fennix's website",
        "Remove any copyright or other proprietary notations from the materials",
      ],
    },
    {
      title: "3. Service Description",
      paragraphs: [
        "Fennix provides real-time intelligence and analytics services for business decision-making. We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice.",
      ],
    },
    {
      title: "4. User Accounts",
      paragraphs: [
        "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.",
      ],
    },
    {
      title: "5. Privacy Policy",
      paragraphs: [
        "Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.",
      ],
    },
    {
      title: "6. Prohibited Uses",
      paragraphs: ["You may not use our Service:"],
      bullets: [
        "In any way that violates any applicable national or international law or regulation",
        "To transmit, or procure the sending of, any advertising or promotional material",
        "To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity",
        "In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful",
      ],
    },
    {
      title: "7. Intellectual Property",
      paragraphs: [
        "The Service and its original content, features, and functionality are and will remain the exclusive property of Fennix and its licensors. The Service is protected by copyright, trademark, and other laws.",
      ],
    },
    {
      title: "8. Limitation of Liability",
      paragraphs: [
        "In no event shall Fennix, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.",
      ],
    },
    {
      title: "9. Changes to Terms",
      paragraphs: [
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.",
      ],
    },
    {
      title: "10. Contact Information",
      paragraphs: [
        "If you have any questions about these Terms & Conditions, please contact us at legal@fennix.ai.",
      ],
    },
  ],
}

export const disclaimer: LegalDocument = {
  title: "Disclaimer",
  lastUpdated: "July 31, 2026",
  contactEmail: "legal@fennix.ai",
  sections: [
    {
      title: "1. General Information",
      paragraphs: [
        'The information contained on Fennix ("the Service") is for general information purposes only. Fennix assumes no responsibility for errors or omissions in the contents of the Service.',
        "Fennix is a real-time intelligence platform that provides AI-powered analytics and insights. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Service.",
      ],
    },
    {
      title: "2. No Professional Advice",
      paragraphs: [
        "The information provided by Fennix is not intended to constitute professional advice of any kind, including but not limited to:",
      ],
      bullets: [
        "Financial, investment, or accounting advice",
        "Legal advice or legal opinions",
        "Medical or health advice",
        "Tax advice or recommendations",
        "Business strategy or consulting services",
      ],
      closingParagraphs: [
        "You should consult with appropriate professionals for advice tailored to your specific situation before making any decisions based on information provided by the Service.",
      ],
    },
    {
      title: "3. Data Accuracy and Reliability",
      paragraphs: [
        "Fennix processes and analyzes data from various sources, including your connected systems, databases, and external data feeds. While we employ advanced AI and analytics technologies to ensure data accuracy, we cannot guarantee:",
      ],
      bullets: [
        "The accuracy, completeness, or timeliness of data from external sources",
        "That all data processing will be error-free",
        "That insights and recommendations will always be correct or applicable",
        "The availability or reliability of third-party data sources",
      ],
      closingParagraphs: [
        "You are responsible for verifying the accuracy and relevance of any information, insights, or recommendations provided by the Service before making business decisions.",
      ],
    },
    {
      title: "4. Limitation of Liability",
      paragraphs: [
        "In no event shall Fennix, Finnovatech LLC, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation:",
      ],
      bullets: [
        "Loss of profits, revenue, or business opportunities",
        "Loss of data or information",
        "Business interruption or operational losses",
        "Decisions made based on information provided by the Service",
        "Any other intangible losses",
      ],
      closingParagraphs: [
        "This limitation of liability applies regardless of the theory of liability, whether in contract, tort, strict liability, or otherwise, even if Fennix has been advised of the possibility of such damages.",
      ],
    },
    {
      title: "5. Third-Party Services and Data",
      paragraphs: [
        "Fennix may integrate with or provide access to third-party services, data sources, and APIs. We are not responsible for:",
      ],
      bullets: [
        "The accuracy, reliability, or availability of third-party services",
        "Any changes, discontinuation, or modifications to third-party services",
        "Data provided by external sources or APIs",
        "Any issues arising from third-party service integrations",
      ],
      closingParagraphs: [
        "Your use of third-party services is subject to their respective terms of service and privacy policies.",
      ],
    },
    {
      title: "6. AI and Machine Learning Limitations",
      paragraphs: [
        "Fennix utilizes artificial intelligence and machine learning technologies to analyze data and provide insights. You acknowledge and understand that:",
      ],
      bullets: [
        "AI-generated insights are based on patterns and algorithms and may not always be accurate",
        "Machine learning models may produce unexpected or incorrect results",
        "AI recommendations should be reviewed and validated by qualified professionals",
        "Technology limitations may affect the quality or availability of AI-powered features",
      ],
    },
    {
      title: "7. Service Availability and Interruptions",
      paragraphs: [
        "While we strive to maintain continuous availability of the Service, Fennix does not guarantee:",
      ],
      bullets: [
        "Uninterrupted or error-free operation of the Service",
        "That the Service will be available at all times",
        "That defects or errors will be corrected",
        "That the Service will meet your specific requirements",
      ],
      closingParagraphs: [
        "The Service may be temporarily unavailable due to maintenance, updates, technical issues, or circumstances beyond our control.",
      ],
    },
    {
      title: "8. Forward-Looking Statements",
      paragraphs: [
        "The Service may contain forward-looking statements, predictions, or forecasts based on data analysis. These statements are not guarantees of future performance and are subject to risks, uncertainties, and assumptions. Actual results may differ materially from those expressed or implied in such statements.",
      ],
    },
    {
      title: "9. Changes to Disclaimer",
      paragraphs: [
        'Fennix reserves the right to modify this Disclaimer at any time. We will notify users of any material changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after such modifications constitutes acceptance of the updated Disclaimer.',
      ],
    },
    {
      title: "10. Contact Information",
      paragraphs: [
        "If you have any questions about this Disclaimer, please contact us at legal@fennix.ai.",
      ],
    },
  ],
}
