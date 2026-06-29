import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, Smartphone, CheckSquare } from "lucide-react";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Query");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Dispatch query to local REST controller which commits log telemetry
    fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Enquiry Checklist: ${subject}`,
        category: "EMAIL",
        recipient: name,
        message: `Contact query dispatch: ${message} | Phone: ${phone}`
      })
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setTimeout(() => setIsSuccess(false), 4500);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        alert("Enquiry logged on physical console.");
      });
  };

  return (
    <section className="relative py-16 md:py-24" id="contact-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title row */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#155e75] dark:text-cyan-400">CONNECT WITH REGISTRATION CHAIRS</p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Contact JNS SmartCampus
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
            Have academic questions? Reach out to our physical registrar offices. We respond to email despatches within 12 business hours.
          </p>
        </div>

        {/* Contact Bento structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Institutional details & coordinates (Map Box) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Meta Info list */}
            <div className="rounded-3xl border border-white/10 bg-white/10 dark:bg-white/[0.03] backdrop-blur-md p-6 space-y-5">
              <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white mb-4">University Registry Office</h3>
              
              <div className="flex items-start space-x-3.5 text-xs font-semibold text-slate-705 dark:text-slate-350">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Physical Address Coordinates</p>
                  <p className="text-slate-805 dark:text-slate-205 mt-1">JNS SmartCampus, IT Corridor, OMR Highway, Chennai, Tamil Nadu, 600096</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-xs font-semibold text-slate-705 dark:text-slate-355">
                <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Institutional Hotline Desk</p>
                  <p className="font-mono text-slate-805 dark:text-slate-205 mt-1 leading-normal select-all">+91 44 2840-9900 (Admissions Support)</p>
                  <p className="font-mono text-slate-505 dark:text-slate-400 select-all">+91 44 2840-9941 (Deans Executive Office)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-xs font-semibold text-slate-705 dark:text-slate-355">
                <Mail className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Institutional Email Desk</p>
                  <p className="font-mono text-slate-805 dark:text-slate-205 mt-1 select-all hover:underline">registrar@jns.edu.in</p>
                  <p className="font-mono text-slate-505 dark:text-slate-405 select-all hover:underline">helpdesk@jns.edu.in</p>
                </div>
              </div>
            </div>

            {/* Custom high-fidelity styled CSS simulated Google Map block */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-slate-950/20 backdrop-blur-md flex-1 h-56 text-slate-400">
              {/* Complex SVG representation of modern campus pathways map layout */}
              <svg className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e2e8f0" />
                <path d="M0 40h400M0 120h400M120 0v200M280 0v200" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M50 80h100M240 160h100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                <rect x="150" y="30" width="80" height="60" rx="3" fill="#94a3b8" />
                <rect x="40" y="140" width="60" height="40" rx="3" fill="#cbd5e1" />
                <rect x="310" y="40" width="50" height="50" rx="3" fill="#cbd5e1" />
                <circle cx="190" cy="60" r="8" fill="#1e3a8a" />
              </svg>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-bold font-display flex items-center gap-1.5">
                  <MapPin className="h-4.5 w-4.5 fill-red-500 text-red-500 shrink-0" />
                  <span>JNS SmartCampus Physical Area</span>
                </p>
                <p className="text-[10px] font-medium text-slate-300 mt-0.5">Central Blocks A, B & Science Laboratories</p>
              </div>
            </div>

          </div>

          {/* Enquiry Submission Form */}
          <div className="lg:col-span-7 border border-white/10 bg-white/10 p-6 sm:p-8 dark:bg-slate-950/20 backdrop-blur-md rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white mb-2 flex items-center gap-2">
                <HelpCircle className="h-5.5 w-5.5 text-blue-500" /> Digital Enquiry Form
              </h3>
              <p className="text-xs text-slate-500 mb-6 dark:text-slate-400">Fill your contact biography parameters to route an official helpdesk logging callback.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-xs font-semibold outline-hidden dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Email Coordinates</label>
                    <input
                      type="email"
                      required
                      placeholder="jane.doe@outlook.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-xs font-semibold outline-hidden dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 94000 54321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-xs font-semibold outline-hidden dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Scope Subject Of Enquiry</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-xs font-bold outline-hidden dark:text-white"
                    >
                      <option>General Query</option>
                      <option>Admissions Registration</option>
                      <option>Sponsorships & Corporates</option>
                      <option>Faculty Council Openings</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-450 mb-1">Message Detail</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide detailed description regarding your subject checklist..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-xs font-semibold outline-hidden dark:text-white resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-blue-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:opacity-50 flex items-center space-x-1.5"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Routing Enquiry..." : "Submit Enquiry Request"}</span>
                  </button>
                </div>
              </form>
            </div>

            {isSuccess && (
              <div className="mt-4 flex items-center space-x-2 text-emerald-800 bg-emerald-50 border border-emerald-250 rounded-xl p-3 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900 text-xs font-bold animate-pulse">
                <CheckSquare className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Success: Enquiry mapped to student notification desk database controllers! Callback routed.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
