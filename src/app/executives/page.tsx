"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export default function ExecutivesPage() {
  const executives = [
    {
      initials: "SB",
      name: "Somsurya Banerjee",
      title: "Founding Member & Convener",
      dept: "Research Scholar • Metallurgy",
      email: "somsurya.banerjee@nsfju.org",
    },
    {
      initials: "RD",
      name: "Rupankar Dutta",
      title: "Co-Convener, Arts Faculty",
      dept: "MA Comparative Lit. • 2nd Year",
      email: "rupankar.arts@nsfju.org",
    },
    {
      initials: "PM",
      name: "Priyanka Maitra",
      title: "Sanskriti Lead & coordinator",
      dept: "M.Sc Chemistry • 2nd Year",
      email: "priyanka.m@nsfju.org",
    },
    {
      initials: "AC",
      name: "Abhijit Chakraborty",
      title: "Anti-Ragging Helpdesk Chair",
      dept: "B.E. Computer Science • 3rd Year",
      email: "abhijit.c@nsfju.org",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-saffron font-bold">
              NSF Jadavpur Working Committee
            </span>
            <h1 className="text-4xl font-serif mt-2 text-brand-dark dark:text-brand-chalk font-light transition-colors duration-200">
              Executive Leadership Directory
            </h1>
            <p className="text-brand-dark/60 dark:text-brand-chalk/60 text-md mt-1 font-light transition-colors duration-200">
              Active postgraduate scholars and undergraduate student leaders driving restoration across JU cells.
            </p>
          </div>

          {/* Minimalist Card Grid Divider layouts */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 border-t border-l border-brand-dark/10 dark:border-brand-chalk/10 transition-colors duration-200">
            {executives.map((exec, idx) => (
              <div
                key={idx}
                className="border-r border-b border-brand-dark/10 dark:border-brand-chalk/10 p-8 space-y-4 hover:bg-brand-dark/[0.01] dark:hover:bg-brand-chalk/[0.01] transition-all duration-300 bg-brand-chalk dark:bg-brand-dark"
              >
                <div className="w-16 h-16 border border-brand-dark dark:border-brand-chalk flex items-center justify-center text-xl font-bold font-serif uppercase text-brand-saffron transition-colors duration-200">
                  {exec.initials}
                </div>
                <div>
                  <h3 className="font-serif text-lg text-brand-dark dark:text-brand-chalk font-bold transition-colors duration-200">
                    {exec.name}
                  </h3>
                  <p className="text-[10px] font-mono text-brand-saffron font-bold uppercase mt-1">
                    {exec.title}
                  </p>
                  <p className="text-xs text-brand-dark/50 dark:text-brand-chalk/50 font-medium mt-1 transition-colors duration-200">
                    {exec.dept}
                  </p>
                </div>
                <div className="pt-3 border-t border-brand-dark/5 dark:border-brand-chalk/5 text-xs text-brand-dark/60 dark:text-brand-chalk/60 flex items-center gap-2 font-mono font-bold break-all transition-colors duration-200">
                  <Mail className="w-4 h-4 text-brand-saffron shrink-0" />
                  <span className="text-[11px]">{exec.email}</span>
                </div>
              </div>
            ))}
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
