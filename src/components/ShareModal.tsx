import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  text = 'Check this out on Easy Tution',
  url = window.location.href
}) => {
  const { t, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast(t('Link copied to clipboard!', 'লিংক কপি করা হয়েছে!'));
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl border border-[#ECE8E0] shadow-2xl p-6 relative animate-in fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-[#6B6760] hover:text-[#1C1B1F] hover:bg-[#FBF9F5]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#272A6B]/10 text-[#272A6B] flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[#1C1B1F]">
            {t('Share this with friends', 'বন্ধুদের সাথে শেয়ার করুন')}
          </h3>
        </div>

        <p className="text-xs text-[#6B6760] line-clamp-2 mb-4">
          {title}
        </p>

        {/* Copy link input */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl border border-[#ECE8E0] bg-[#FBF9F5] mb-4">
          <input
            type="text"
            readOnly
            value={url}
            className="w-full bg-transparent px-2 text-xs text-[#6B6760] focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#272A6B] text-white text-xs font-semibold hover:bg-[#202256] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('Copied', 'কপি হয়েছে')}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t('Copy', 'কপি')}</span>
              </>
            )}
          </button>
        </div>

        {/* Social channels */}
        <div className="grid grid-cols-3 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium text-center transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-medium text-center transition-colors"
          >
            Facebook
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium text-center transition-colors"
          >
            Twitter / X
          </a>
        </div>
      </div>
    </div>
  );
};
