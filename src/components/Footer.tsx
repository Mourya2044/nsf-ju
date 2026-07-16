"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-chalk border-t border-brand-dark/10 dark:border-brand-chalk/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-brand-chalk/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border border-brand-chalk flex items-center justify-center font-bold text-xs">
                NSF
              </div>
              <span className="font-extrabold text-lg tracking-wider uppercase font-mono">
                NSF Jadavpur
              </span>
            </div>
            <p className="text-xs text-brand-chalk/60 leading-relaxed font-light">
              Revitalizing academic discipline, anti-ragging security, and
              national pride across Jadavpur University based on NCE Bengal
              frameworks.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-brand-saffron font-mono tracking-widest mb-4">
              Functional Cells
            </h4>
            <ul className="space-y-2 text-xs text-brand-chalk/60 font-semibold font-mono">
              <li>
                <Link
                  href="/manifesto"
                  className="hover:text-brand-chalk transition-all"
                >
                  Technical Cell
                </Link>
              </li>
              <li>
                <Link
                  href="/manifesto"
                  className="hover:text-brand-chalk transition-all"
                >
                  Media Cell
                </Link>
              </li>
              <li>
                <Link
                  href="/manifesto"
                  className="hover:text-brand-chalk transition-all"
                >
                  Outreach Cell
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-brand-saffron font-mono tracking-widest mb-4">
              Student Portals
            </h4>
            <ul className="space-y-2 text-xs text-brand-chalk/60 font-semibold font-mono">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-brand-chalk transition-all"
                >
                  Member Workspace Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/executives"
                  className="hover:text-brand-chalk transition-all"
                >
                  Committee Executives
                </Link>
              </li>
              <li>
                <Link
                  href="/join"
                  className="hover:text-brand-chalk transition-all"
                >
                  Enrollment Desk
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-brand-saffron font-mono tracking-widest mb-4">
              Campus Location
            </h4>
            <p className="text-xs text-brand-chalk/60 font-mono leading-relaxed">
              Jadavpur University Main Campus, Gate 4, Jadavpur, Kolkata -
              700032
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-chalk/80 font-semibold font-mono">
              <Mail className="w-3.5 h-3.5 text-brand-saffron" />
              <span>nationaliststudentsfrontju@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-chalk/40 font-mono font-bold">
          <p>
            &copy; 2026 Nationalist Students&apos; Front, Jadavpur University.
            Restoring our roots.
          </p>
          <div className="flex gap-4 font-mono text-[10px] uppercase font-bold tracking-wider">
            <a href="#" className="hover:text-brand-saffron">
              JU Code of Conduct
            </a>
            <span>•</span>
            <a href="#" className="hover:text-brand-saffron">
              Nationalist Manifesto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
