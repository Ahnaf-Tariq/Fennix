import type { Metadata } from "next"
import { LegalDocumentPage } from "@/components/legal/legal-document-page"
import { termsOfService } from "@/lib/legal-content"

export const metadata: Metadata = {
  title: "Terms of Service - Fennix",
  description:
    "Read the terms and conditions for using Fennix, our real-time decision intelligence platform.",
}

export default function TermsPage() {
  return <LegalDocumentPage document={termsOfService} tag="Legal" />
}
