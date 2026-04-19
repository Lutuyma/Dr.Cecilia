"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, getDay } from "date-fns";
import { Calendar, Clock, User, Mail, CheckCircle, FileText, ArrowRight, AlertTriangle, MessageSquare } from "lucide-react";

const AREAS = [
  "Direito da Família",
  "Direito Comercial",
  "Registos, Notariado e Traduções",
  "Direito Migratório",
  "Direito Administrativo",
  "Direito Fiscal",
  "Consultoria Jurídica (Geral, Trabalho, Desporto, Segurança Social, etc.)",
  "Direito Penal"
];

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [excludedTimes, setExcludedTimes] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Stepper logic
  const steps = [
    { title: "Assunto", icon: FileText },
    { title: "Data", icon: Calendar },
    { title: "Detalhes", icon: User },
  ];

  // Calendar logic
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!startDate) return;
      
      try {
        const dStr = startDate.toISOString().split('T')[0];
        const res = await fetch(`/api/calendar?date=${dStr}`);
        const data = await res.json();
        
        if (data.success && data.busy) {
          const busyDates = data.busy.map((b: any) => new Date(b.start));
          setExcludedTimes(busyDates);
        }
      } catch (e) {
        console.error('Error fetching availability:', e);
      }
    };
    
    if (startDate && step === 2) {
      fetchAvailability();
    }
  }, [startDate, step]);

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const isWeekday = (date: Date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const handleAreaSelect = (selectedArea: string) => {
    setArea(selectedArea);
    setStep(2);
  };

  const handleDateSelect = () => {
    if (startDate) {
      setStep(3);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;

    setLoading(true);
    
    try {
      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: startDate.toISOString(),
          name: formData.name,
          email: formData.email,
          area: area,
          message: formData.message
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setStep(4);
      } else {
        alert("Ocorreu um erro ao agendar. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="marcacoes" className="py-12 sm:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">Marque a sua Consulta</h2>
          <p className="text-slate-600 font-inter text-sm sm:text-base">
            Siga os passos abaixo para agendar a sua avaliação jurídica.
          </p>
        </div>

        <div className="bg-white border border-[var(--color-accent)]/20 shadow-md rounded-2xl overflow-hidden p-6 sm:p-10">
          
          {/* Stepper */}
          {step < 4 && (
            <div className="mb-10 flex items-center justify-between relative max-w-2xl mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0 rounded-full">
                <div 
                  className="h-1 bg-[var(--color-accent)] transition-all duration-300 rounded-full"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
              {steps.map((s, index) => {
                const isCurrent = step === index + 1;
                const isCompleted = step > index + 1;
                const Icon = s.icon;
                return (
                  <div key={index} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-colors bg-white
                      ${isCurrent ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 
                        isCompleted ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-accent)]' : 
                        'border-slate-300 text-slate-400'}
                    `}>
                      {isCompleted ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </div>
                    <span className={`mt-2 text-xs sm:text-sm font-medium ${isCurrent || isCompleted ? 'text-[var(--color-primary)]' : 'text-slate-400'}`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 1: Area Selection */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-playfair text-xl font-bold mb-6 text-center text-[var(--color-primary)]">1. Qual a área do seu problema?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AREAS.map((a) => (
                  <button
                    key={a}
                    onClick={() => handleAreaSelect(a)}
                    className="p-4 border border-slate-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-[#363636] hover:text-[var(--color-accent)] transition-all text-left font-medium flex justify-between items-center group shadow-sm bg-white"
                  >
                    <span className="pr-4">{a}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Calendar */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-xl font-bold flex gap-2 items-center text-[var(--color-primary)]">
                  <Calendar className="w-5 h-5 text-[var(--color-accent)]" /> Mês e Hora
                </h3>
                <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-[var(--color-accent)] transition-colors underline">Voltar atrás</button>
              </div>

              <div className="flex flex-col items-center">
                <div className="custom-datepicker-container bg-white border border-slate-200 rounded-xl p-4 shadow-sm w-full max-w-sm flex justify-center">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    timeCaption="Hora"
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={new Date()}
                    filterDate={isWeekday}
                    filterTime={filterPassedTime}
                    minTime={setHours(setMinutes(new Date(), 0), 10)}
                    maxTime={setHours(setMinutes(new Date(), 0), 15)}
                    inline
                    className="border-none"
                    calendarClassName="shadow-none border-none pointer-events-auto w-full"
                    excludeTimes={excludedTimes}
                  />
                </div>
                
                {startDate && (
                  <div className="mt-8 w-full">
                    <div className="bg-slate-50 border border-[var(--color-accent)]/30 p-4 rounded-md flex items-center justify-between">
                      <p className="text-[var(--color-primary)] font-medium">
                        Data escolhida: <span className="font-bold">{startDate.toLocaleString('pt-PT')}</span>
                      </p>
                      <button 
                        onClick={handleDateSelect}
                        className="bg-[var(--color-primary)] text-[var(--color-accent)] px-6 py-2 rounded-md hover:bg-[#222222] transition-colors"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Personal Data */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-xl font-bold flex gap-2 items-center text-[var(--color-primary)]">
                  <User className="w-5 h-5 text-[var(--color-accent)]" /> Detalhes Finais
                </h3>
                <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-[var(--color-accent)] transition-colors underline">Voltar atrás</button>
              </div>

              <form onSubmit={handleBooking} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1 font-inter">
                    <User className="w-4 h-4" /> Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Introduza o seu nome"
                    className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] outline-none transition-all shadow-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1 font-inter">
                    <Mail className="w-4 h-4" /> Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] outline-none transition-all shadow-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1 font-inter">
                    <MessageSquare className="w-4 h-4" /> Descrição do Caso
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva brevemente a sua situação para preparar-mos a consulta..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] outline-none transition-all shadow-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <div className="pt-4 mt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                    <p><strong>Assunto:</strong> {area}</p>
                    <p><strong>Data:</strong> {startDate?.toLocaleString('pt-PT')}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-[var(--color-primary)] disabled:bg-slate-400 hover:bg-[#222222] text-[var(--color-accent)] font-medium py-3 px-8 rounded-md transition-all shadow-md hover:shadow-lg"
                  >
                    {loading ? 'A agendar...' : 'Confirmar Marcação'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && submitted && (
            <div className="text-center animate-in fade-in zoom-in duration-500 py-8">
              <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
              <h3 className="font-playfair text-3xl font-bold mb-4 text-[var(--color-primary)]">Marcação Confirmada!</h3>
              <p className="text-slate-600 text-lg mb-2">
                Obrigado, <span className="font-semibold">{formData.name}</span>.
              </p>
              <p className="text-slate-500">
                A sua consulta para o dia <strong>{startDate?.toLocaleString('pt-PT')}</strong> foi agendada com sucesso. Irá receber o convite com todos os detalhes no seu email.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
