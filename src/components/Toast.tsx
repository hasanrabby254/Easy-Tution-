import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold max-w-sm ${
          toast.type === 'error'
            ? 'bg-rose-50 border-rose-200 text-[#C8553D]'
            : toast.type === 'info'
            ? 'bg-indigo-50 border-indigo-200 text-[#272A6B]'
            : 'bg-emerald-50 border-emerald-200 text-[#2E8B6A]'
        }`}
      >
        {toast.type === 'error' ? (
          <AlertCircle className="w-4 h-4 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-4 h-4 shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 shrink-0" />
        )}
        <span>{toast.text}</span>
      </div>
    </div>
  );
};
