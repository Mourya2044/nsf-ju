"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Lock } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 animate-fade-in">
          
          {/* Editorial Split Grid */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left: Large Stark Headline */}
            <div className="lg:col-span-8 space-y-8">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-saffron font-bold block">
                Nationalist Students&apos; Front (NSF JU) — Veer Bhogya Vasundhara
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-light tracking-tight leading-[1.1] text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                Reclaiming academic integrity, heritage & campus <span className="italic font-normal text-brand-saffron">dignity</span>.
              </h1>
              <p className="text-lg text-brand-dark/70 dark:text-brand-chalk/70 leading-relaxed font-light max-w-2xl transition-colors duration-200">
                The Nationalist Students&apos; Front is committed to Jadavpur University&apos;s true historical foundations. We strive for a safe, physically secure, and ragging-free university environment rooted in self-discipline, cultural pride, and academic rigor.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/join"
                  className="px-8 py-4 bg-brand-dark dark:bg-brand-chalk hover:bg-brand-saffron hover:text-brand-chalk dark:hover:bg-brand-saffron dark:hover:text-brand-chalk text-brand-chalk dark:text-brand-dark text-xs font-bold uppercase tracking-widest transition-all duration-200"
                >
                  Enroll Volunteer Credentials
                </Link>
                <Link
                  href="/manifesto"
                  className="px-8 py-4 border border-brand-dark dark:border-brand-chalk hover:bg-brand-dark hover:text-brand-chalk dark:hover:bg-brand-chalk dark:hover:text-brand-dark text-brand-dark dark:text-brand-chalk text-xs font-bold uppercase tracking-widest transition-all duration-200"
                >
                  View JU Manifesto
                </Link>
              </div>
            </div>

            {/* Right: Historical context block */}
            <div className="lg:col-span-4 lg:border-l lg:border-brand-dark/10 dark:lg:border-brand-chalk/10 lg:pl-8 space-y-8 transition-colors duration-200">
              <div className="pt-2">
                <span className="font-mono text-[10px] text-brand-dark/50 dark:text-brand-chalk/50 uppercase tracking-widest font-bold transition-colors duration-200">
                  Foundations
                </span>
                <blockquote className="font-serif italic text-md text-brand-dark/80 dark:text-brand-chalk/80 mt-2 leading-relaxed transition-colors duration-200">
                  &quot;The true education for Bengal is one that makes students genuine sons of the motherland, offering them intellectual strength and deep moral courage.&quot;
                </blockquote>
                <p className="text-[11px] font-mono uppercase tracking-wider text-brand-saffron mt-3 font-bold">
                  — Sri Aurobindo, First Principal, Bengal National College (Precursor to JU)
                </p>
              </div>
              <div className="border-t border-brand-dark/10 dark:border-brand-chalk/10 pt-6 space-y-4 font-mono text-xs transition-colors duration-200">
                <div className="flex justify-between py-1 border-b border-brand-dark/5 dark:border-brand-chalk/5 transition-colors duration-200">
                  <span className="text-brand-dark/50 dark:text-brand-chalk/50">Founded Legacy</span>
                  <span className="font-bold text-brand-dark dark:text-brand-chalk">2016 (NSF JU)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-dark/5 dark:border-brand-chalk/5 transition-colors duration-200">
                  <span className="text-brand-dark/50 dark:text-brand-chalk/50">Campus Presence</span>
                  <span className="font-bold text-brand-dark dark:text-brand-chalk">JU Main / Salt Lake</span>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-dark/5 dark:border-brand-chalk/5 transition-colors duration-200">
                  <span className="text-brand-dark/50 dark:text-brand-chalk/50">Key Mandate</span>
                  <span className="font-bold text-brand-dark dark:text-brand-chalk">Zero-Tolerance Ragging</span>
                </div>
              </div>
            </div>

          </div>

          {/* Structured Editorial Grid Separator */}
          <div className="editorial-grid my-20 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="text-3xl font-serif text-brand-saffron font-bold">2016</span>
              <p className="text-xs font-mono uppercase text-brand-dark/50 dark:text-brand-chalk/50 mt-1 font-bold transition-colors duration-200">NSF JU Establishment</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-brand-dark dark:text-brand-chalk font-bold transition-colors duration-200">Zero</span>
              <p className="text-xs font-mono uppercase text-brand-dark/50 dark:text-brand-chalk/50 mt-1 font-bold transition-colors duration-200">Tolerance for Ragging</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-brand-saffron font-bold">Service</span>
              <p className="text-xs font-mono uppercase text-brand-dark/50 dark:text-brand-chalk/50 mt-1 font-bold transition-colors duration-200">Dedicated Helpdesks</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-brand-dark dark:text-brand-chalk font-bold transition-colors duration-200">Secure</span>
              <p className="text-xs font-mono uppercase text-brand-dark/50 dark:text-brand-chalk/50 mt-1 font-bold transition-colors duration-200">Member Workspace</p>
            </div>
          </div>

          {/* Clean Utility Split */}
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Manifesto Box */}
            <div className="border border-brand-dark dark:border-brand-chalk p-8 flex flex-col justify-between bg-brand-chalk dark:bg-brand-dark transition-colors duration-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-saffron font-bold block mb-4">
                  Welfare & Ideology
                </span>
                <h3 className="text-3xl font-serif text-brand-dark dark:text-brand-chalk mb-3 transition-colors duration-200">Our Core Manifesto & Cells</h3>
                <p className="text-brand-dark/70 dark:text-brand-chalk/70 text-sm leading-relaxed mb-8 transition-colors duration-200">
                  Discover how our functional committees—the Heritage Cell, Anti-Ragging Task Force, and Rashtra Seva Unit—actively coordinate campaigns, seminars, and relief services across the campus.
                </p>
              </div>
              <button
                onClick={() => router.push("/manifesto")}
                className="text-xs font-mono uppercase tracking-wider font-bold text-brand-saffron hover:text-brand-dark dark:hover:text-brand-chalk flex items-center gap-2 self-start transition-colors"
              >
                <span>Browse Manifesto & Cells</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Task Engine Box */}
            <div className="border border-brand-dark dark:border-brand-chalk p-8 flex flex-col justify-between bg-brand-chalk dark:bg-brand-dark transition-colors duration-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-dark/50 dark:text-brand-chalk/50 font-bold block mb-4 transition-colors duration-200">
                  Internal Organization
                </span>
                <h3 className="text-3xl font-serif text-brand-dark dark:text-brand-chalk mb-3 transition-colors duration-200">Member Task Workspace</h3>
                <p className="text-brand-dark/70 dark:text-brand-chalk/70 text-sm leading-relaxed mb-8 transition-colors duration-200">
                  Existing members can create an account, log in, view assigned tasks, and enlist in voluntary safety campaigns. Admin roles can dispatch tasks and manage member credentials.
                </p>
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="text-xs font-mono uppercase tracking-wider font-bold text-brand-dark dark:text-brand-chalk hover:text-brand-saffron flex items-center gap-2 self-start transition-colors"
              >
                <span>Access Secure Task Board</span>
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
