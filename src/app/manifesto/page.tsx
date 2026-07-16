"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ShieldAlert, Flag } from "lucide-react";

export default function ManifestoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
          
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-saffron font-bold">
              NSF Ideology & Mandates
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif mt-2 text-brand-dark dark:text-brand-chalk transition-colors duration-200">
              Reviving Jadavpur&apos;s True Purpose
            </h1>
            <p className="text-brand-dark/70 dark:text-brand-chalk/70 mt-3 font-light leading-relaxed text-lg transition-colors duration-200">
              We aim to replace political volatility and intimidation with disciplined leadership, academic excellence, physical training, and a deep appreciation of classical Indian heritage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Cell Card 1 */}
            <div className="border border-brand-dark/10 dark:border-brand-chalk/10 p-8 flex flex-col justify-between bg-brand-chalk dark:bg-brand-dark hover:border-brand-dark/30 dark:hover:border-brand-chalk/30 transition-all duration-300">
              <div>
                <div className="w-10 h-10 border border-brand-dark dark:border-brand-chalk flex items-center justify-center mb-6 transition-colors duration-200">
                  <BookOpen className="w-5 h-5 text-brand-saffron" />
                </div>
                <h3 className="text-xl font-serif mb-3 text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                  NSF Heritage Cell
                </h3>
                <p className="text-xs text-brand-dark/60 dark:text-brand-chalk/60 leading-relaxed font-light mb-6 transition-colors duration-200">
                  Keeping Jadavpur&apos;s historical swadeshi roots alive. Organizing classical Bengali celebrations, Sanskriti memorial seminars, and study groups on Swami Vivekananda&apos;s ideals.
                </p>
              </div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase border-t border-brand-dark/10 dark:border-brand-chalk/10 pt-4 transition-colors duration-200">
                <span className="text-brand-saffron">Focus:</span> Sri Aurobindo Memorial Series
              </div>
            </div>

            {/* Cell Card 2 */}
            <div className="border border-brand-dark/10 dark:border-brand-chalk/10 p-8 flex flex-col justify-between bg-brand-chalk dark:bg-brand-dark hover:border-brand-dark/30 dark:hover:border-brand-chalk/30 transition-all duration-300">
              <div>
                <div className="w-10 h-10 border border-brand-dark dark:border-brand-chalk flex items-center justify-center mb-6 transition-colors duration-200">
                  <ShieldAlert className="w-5 h-5 text-brand-saffron" />
                </div>
                <h3 className="text-xl font-serif mb-3 text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                  Anti-Ragging & Campus Safety
                </h3>
                <p className="text-xs text-brand-dark/60 dark:text-brand-chalk/60 leading-relaxed font-light mb-6 transition-colors duration-200">
                  Combating toxic campus behaviors. We run active freshman support networks, coordinate local accommodation vetting, and advocate for strict student safety protocols on campus.
                </p>
              </div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase border-t border-brand-dark/10 dark:border-brand-chalk/10 pt-4 transition-colors duration-200">
                <span className="text-brand-saffron">Focus:</span> Anti-Ragging Task Force
              </div>
            </div>

            {/* Cell Card 3 */}
            <div className="border border-brand-dark/10 dark:border-brand-chalk/10 p-8 flex flex-col justify-between bg-brand-chalk dark:bg-brand-dark hover:border-brand-dark/30 dark:hover:border-brand-chalk/30 transition-all duration-300">
              <div>
                <div className="w-10 h-10 border border-brand-dark dark:border-brand-chalk flex items-center justify-center mb-6 transition-colors duration-200">
                  <Flag className="w-5 h-5 text-brand-saffron" />
                </div>
                <h3 className="text-xl font-serif mb-3 text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                  Rashtra Seva Unit
                </h3>
                <p className="text-xs text-brand-dark/60 dark:text-brand-chalk/60 leading-relaxed font-light mb-6 transition-colors duration-200">
                  Driving volunteer action. From running massive local blood donation programs at Aurobindo Bhavan to contributing to civic duties, service runs core to our student committee.
                </p>
              </div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase border-t border-brand-dark/10 dark:border-brand-chalk/10 pt-4 transition-colors duration-200">
                <span className="text-brand-saffron">Focus:</span> Netaji Voluntary Service
              </div>
            </div>

          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
