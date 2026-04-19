"use client";

export default function Hero() {
  return (
    <section className="brand-hero-bg text-white py-16 sm:py-24 md:py-32 text-center mt-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-[var(--color-accent)] leading-tight">
          Cecília António
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light opacity-90 max-w-2xl mx-auto mb-8 sm:mb-10">
          Solicitadora
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4 sm:px-0">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            className="bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[#c9aa6c] font-semibold py-3.5 px-8 rounded-lg shadow-md transition-all text-center w-full sm:w-auto">
            Perguntas Frequentes
          </button>
          <a href="#marcacoes" className="bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] font-semibold py-3.5 px-8 rounded-lg transition-all text-center w-full sm:w-auto">
            Marcar Consulta
          </a>
        </div>
      </div>
    </section>
  );
}
