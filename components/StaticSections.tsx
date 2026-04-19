import { Briefcase, GraduationCap, Users } from "lucide-react";

export function Sobre() {
  return (
    <section id="sobre" className="py-12 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-slate-800 mb-6 sm:mb-8 border-b-2 border-[var(--color-accent)] inline-block pb-2">Sobre Mim</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-6 font-inter">
          Licenciada em Direito, inscrita na Ordem dos Solicitadores com a cédula profissional 9967. A Dra. Solicitadora Cecília António possui vasto conhecimento e experiência nas mais diversas áreas do Direito, desde registos e cobranças a demais processos jurídicos.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed font-inter">
          A minha missão é solucionar de forma eficaz e personalizada, com o mais amplo conhecimento técnico e estratégico voltado para resultados.
        </p>
      </div>
    </section>
  );
}

export function Servicos() {
  const servicos = [
    { title: "Direito da Família", desc: "Acompanhamento em processos de natureza familiar." },
    { title: "Direito Comercial", desc: "Apoio a empresas e negócios corporativos." },
    { title: "Registos, notariado e Traduções", desc: "Tratamento de registos, autenticações e traduções certificadas." },
    { title: "Direito migratório", desc: "Apoio em processos de legalização e vistos." },
    { title: "Direito administrativo", desc: "Relações com a Administração Pública." },
    { title: "Direito fiscal", desc: "Apoio no cumprimento das obrigações fiscais." }
  ];

  return (
    <section id="servicos" className="py-12 sm:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-8 sm:mb-12 text-center">Áreas de Atuação</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {servicos.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[var(--color-accent)] hover:shadow-md transition-shadow">
              <h3 className="font-playfair text-xl font-bold mb-3 text-[var(--color-primary)]">{s.title}</h3>
              <p className="text-slate-600 text-sm font-inter">{s.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-[var(--color-primary)] text-white p-6 sm:p-8 rounded-xl shadow-md border border-[var(--color-accent)]/30 text-center">
          <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[var(--color-accent)]">Consultoria Jurídica</h3>
          <p className="font-inter text-slate-300">
            Direito penal, direito do trabalho, direito constitucional, desporto, segurança social e direito dos transportes.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Formacao() {
  return (
    <section id="formacao" className="py-12 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-8 sm:mb-12">Formação Académica</h2>
        <div className="space-y-6 flex flex-col items-center">
          <div className="flex flex-col items-center max-w-lg">
            <GraduationCap className="w-12 h-12 text-[var(--color-accent)] mb-4" />
            <h3 className="font-playfair text-xl font-bold text-[var(--color-primary)]">Licenciatura em Direito</h3>
            <p className="text-slate-500 font-inter">UAL</p>
          </div>
          <div className="w-16 h-px bg-[var(--color-accent)] my-4 opacity-50"></div>
          <div className="flex flex-col items-center max-w-lg">
            <GraduationCap className="w-12 h-12 text-[var(--color-accent)] mb-4" />
            <h3 className="font-playfair text-xl font-bold text-[var(--color-primary)]">Especialização em Ciências Jurídicas-Forenses</h3>
            <p className="text-slate-500 font-inter">FDUL</p>
          </div>
        </div>
      </div>
    </section>
  );
}
