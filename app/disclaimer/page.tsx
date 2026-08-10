import type { Metadata } from "next"
import { LegalDocumentPage } from "@/components/legal/legal-document-page"
import { disclaimer } from "@/lib/legal-content"

export const metadata: Metadata = {
  title: "Disclaimer - Fennix",
  description:
    "Important disclaimers regarding Fennix AI insights, data accuracy, and use of our decision intelligence platform.",
}

export default function DisclaimerPage() {
  return <LegalDocumentPage document={disclaimer} tag="Legal" />
}
