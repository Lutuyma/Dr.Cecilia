"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronDown } from "lucide-react";

export default function ChatbotFAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Olá! Sou a assistente virtual da Dra. Cecília. Como posso ajudar hoje?' }
  ]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  const faqs = [
    { question: "🕒 Qual é o horário de atendimento?", answer: "O horário regular de atendimento é das 09h00 às 16h00. Fora deste horário, pode deixar a sua mensagem por aqui ou enviar um email, e a Dra. Cecília António entrará em contacto consigo com a maior brevidade possível. Deseja agendar uma consulta?" },
    { question: "💶 Qual é o valor das consultas/honorários?", answer: "Os honorários para uma consulta inicial começam nos 60 euros. O valor final dependerá sempre da complexidade do caso e do serviço específico de que necessita (como elaboração de contratos, registos ou representação). Quer que o ajude a marcar uma avaliação inicial?" },
    { question: "📱 Como posso falar diretamente com a solicitadora?", answer: "Pode entrar em contacto da forma que lhe for mais conveniente:\n\n📞 Telefone / WhatsApp: 925 023 895 (resposta mais rápida)\n✉️ Email: cecilia-antonio@hotmail.com (ideal para envio de documentos)\n\nQual o meio que prefere utilizar?" },
    { question: "📍 Onde é que a Dra. Cecília atende?", answer: "A Dra. Cecília tem mobilidade para o acompanhar em todo o território nacional (Portugal). Além do acompanhamento presencial, realizamos consultas e consultoria jurídica por videochamada ou telefone, para sua total comodidade. De que zona do país nos contacta?" },
    { question: "⚖️ Em que situações me pode ajudar um Solicitador?", answer: "Um Solicitador é um profissional com formação em Direito que o representa e defende os seus interesses perante diversas entidades (Finanças, Conservatórias, Câmaras Municipais e Tribunais).\n\nA Dra. Cecília pode ajudá-lo(a) a resolver assuntos de forma rápida e segura, como: contratos, registos, divórcios, partilhas, cobranças de dívidas e questões fiscais ou migratórias. Qual é a área do seu problema atual?" }
  ];

  const handleAsk = (faq: typeof faqs[0]) => {
    setMessages(prev => [...prev, { sender: 'user', text: faq.question }]);
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: faq.answer }]);
    }, 600);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-[var(--color-accent)] text-[var(--color-primary)] p-4 rounded-full shadow-xl hover:bg-[#c9aa6c] transition-all z-50 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Assistente Virtual"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 w-auto sm:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 transition-all duration-300 origin-bottom-right flex flex-col ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '650px', maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Header */}
        <div className="bg-[var(--color-primary)] border-b border-[var(--color-accent)] text-[var(--color-accent)] p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-semibold font-playfair">Assistente Virtual</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-[var(--color-accent)] hover:text-white">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-[var(--color-primary)] text-white rounded-tr-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Options / Input */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
          <p className="text-xs text-slate-500 mb-2 text-center">Perguntas Frequentes:</p>
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => handleAsk(faq)}
                className="text-left text-xs bg-slate-50 hover:bg-slate-100 text-[var(--color-primary)] py-2 px-3 rounded-md transition-colors border border-slate-200"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
