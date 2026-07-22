"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { CheckCircle } from "lucide-react";

export default function JoinPage() {
  const { enrollVolunteer } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    year: "1st Year",
    cell: "Technical Cell",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* 
      DATABASE INTEGRATION HOOK:
      Replace the context call below with a POST API request to persist this volunteer record.
      Example:
      await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    */
    await enrollVolunteer({ ...formData, taskId: "0" });
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 animate-fade-in">
          <div className="border border-brand-dark dark:border-brand-chalk bg-brand-chalk dark:bg-brand-dark overflow-hidden transition-colors duration-200">

            <div className="px-8 py-10 bg-brand-dark text-brand-chalk relative overflow-hidden">
              <span className="text-xs uppercase font-mono text-brand-saffron tracking-widest font-bold">
                Enrollment Desk
              </span>
              <h1 className="text-3xl font-serif mt-2 leading-snug">
                Join Nationalist Students&apos; Front
              </h1>
              <p className="text-brand-chalk/60 text-sm mt-2 leading-relaxed">
                Become a member of the the Jadavpur organization. Dedicate hours towards student safety, anti-ragging response helplines, and restoration of swadeshi cultural heritage.
              </p>
            </div>

            {submitted ? (
              <div className="p-12 text-center space-y-6">
                <CheckCircle className="w-16 h-16 text-brand-saffron mx-auto" />
                <h2 className="font-serif text-3xl text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                  Credentials Registered
                </h2>
                <p className="text-brand-dark/70 dark:text-brand-chalk/70 text-sm max-w-md mx-auto leading-relaxed transition-colors duration-200">
                  Thank you, <span className="font-bold">{formData.fullName}</span>! Your coordinates for the <span className="font-bold">{formData.cell}</span> have been logged into our local registry. A committee coordinator will reach out to verify your credentials.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      course: "",
                      year: "1st Year",
                      cell: "Technical Cell",
                    });
                  }}
                  className="px-8 py-3 bg-brand-dark dark:bg-brand-chalk hover:bg-brand-saffron dark:hover:bg-brand-saffron text-brand-chalk dark:text-brand-dark dark:hover:text-brand-chalk font-bold font-mono text-xs uppercase tracking-widest transition-colors duration-200 shadow-md"
                >
                  Register Another Account
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Subir Sen"
                      className="w-full px-2 py-3 bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 focus:border-brand-saffron transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                      Email ID *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="subir.s@gmail.com"
                      className="w-full px-2 py-3 bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 focus:border-brand-saffron transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-2 py-3 bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 focus:border-brand-saffron transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                      Enrolled Course *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      placeholder="e.g. B.E. Civil Engineering"
                      className="w-full px-2 py-3 bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 focus:border-brand-saffron transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                      Year of Study *
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-2 py-3 bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk text-sm font-bold font-mono border border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                    >
                      <option value="1st Year" className="dark:bg-brand-dark">1st Year</option>
                      <option value="2nd Year" className="dark:bg-brand-dark">2nd Year</option>
                      <option value="3rd Year" className="dark:bg-brand-dark">3rd Year</option>
                      <option value="4th Year" className="dark:bg-brand-dark">4th Year</option>
                      <option value="Post-Graduate / PH.D" className="dark:bg-brand-dark">Post-Graduate / PH.D</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                    Active Assignment Cell Core *
                  </label>
                  <select
                    value={formData.cell}
                    onChange={(e) => setFormData({ ...formData, cell: e.target.value })}
                    className="w-full px-2 py-3 bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk text-sm font-bold font-mono border border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                  >
                    <option value="Technical Cell" className="dark:bg-brand-dark">
                      Technical Cell (Seminars, Development & Infrastructure Support)
                    </option>
                    <option value="Media Cell" className="dark:bg-brand-dark">
                      Media Cell (Direct coordinate outreach, Design, PR support)
                    </option>
                    <option value="Outreach Cell" className="dark:bg-brand-dark">
                      Outreach Cell (Housing vetting support & assistance)
                    </option>
                  </select>
                </div>

                <div className="pt-4 border-t border-brand-dark/10 dark:border-brand-chalk/10 flex justify-end gap-3 transition-colors duration-200">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-brand-dark dark:bg-brand-chalk hover:bg-brand-saffron dark:hover:bg-brand-saffron text-brand-chalk dark:text-brand-dark dark:hover:text-brand-chalk font-bold font-mono text-xs uppercase tracking-widest transition-colors duration-200 shadow-md"
                  >
                    Submit Credentials
                  </button>
                </div>

              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
