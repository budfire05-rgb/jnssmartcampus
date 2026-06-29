import React from "react";
import { ArrowRight, X } from "lucide-react";

interface CRMProps {
  onClose?: () => void;
}

export const CRM: React.FC<CRMProps> = ({ onClose }) => {
  const openInternSyncCRM = () => {
    window.location.href = "http://localhost:3001";
  };

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_20%),linear-gradient(180deg,#040712_0%,#0b0a1b_60%,#060615_100%)] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <div className="w-full max-w-md rounded-[2rem] border border-cyan-400/15 bg-blue-950/95 p-8 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">CRM Login</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">InternSync CRM</h1>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-slate-950/90 text-cyan-100 transition hover:bg-cyan-500/10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              This login card is anchored on the right and routes directly to the InternSync CRM app at localhost:3001.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-cyan-500/15 bg-blue-900/95 p-6 shadow-xl shadow-cyan-500/10">
              <div className="space-y-4">
                <div className="rounded-3xl bg-blue-950/90 p-4 border border-cyan-500/10">
                  <p className="text-sm font-semibold text-white">Email</p>
                  <p className="mt-2 text-slate-300">you@jns.edu.in</p>
                </div>
                <div className="rounded-3xl bg-blue-950/90 p-4 border border-cyan-500/10">
                  <p className="text-sm font-semibold text-white">Password</p>
                  <p className="mt-2 text-slate-300">••••••••</p>
                </div>
                <button
                  onClick={openInternSyncCRM}
                  className="w-full rounded-3xl bg-white text-blue-950 px-5 py-3 font-semibold transition hover:bg-cyan-100"
                >
                  Open InternSync CRM
                  <ArrowRight className="inline-block h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Make sure the InternSync CRM application is running on <strong>localhost:3001</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
