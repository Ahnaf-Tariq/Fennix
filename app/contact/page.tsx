import type { Metadata } from "next"
import ContactBooking from "@/components/contact/contact-booking"
import ContactHeroForm from "@/components/contact/contact-hero-form"
import ContactInfo from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact - Fennix",
  description:
    "Request your pilot, book a call, or reach our team directly. We typically respond within 24 hours.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <ContactHeroForm />
      <ContactInfo />
      <ContactBooking />
    </main>
  )
}
