import type { Metadata } from "next"
import { LegalDocumentPage } from "@/components/legal/legal-document-page"
import { privacyPolicy } from "@/lib/legal-content"

export const metadata: Metadata = {
  title: "Privacy Policy - Fennix",
  description:
    "Learn how Fennix collects, uses, and protects your information when you use our decision intelligence platform.",
}

export default function PrivacyPage() {
  return <LegalDocumentPage document={privacyPolicy} tag="Legal" />
}
