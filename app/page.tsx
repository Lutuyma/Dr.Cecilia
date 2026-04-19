import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingWizard from "@/components/BookingWizard";
import ChatbotFAQ from "@/components/ChatbotFAQ";
import { Sobre, Servicos, Formacao } from "@/components/StaticSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Sobre />
      <Servicos />
      <Formacao />
      <BookingWizard />
      <ChatbotFAQ />
      
      <footer className="bg-[var(--color-primary)] py-8 text-center text-[var(--color-accent)] opacity-90 border-t border-[var(--color-accent)]">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Dra. Cecília António - Solicitadora. Todos os direitos reservados.</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <span>📞 (+351) 925 023 895</span>
            <span>✉️ cecilia-antonio@hotmail.com | ceciliaantonio09967@osae.pt</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
