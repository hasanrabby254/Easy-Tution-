import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Tutor } from '../types';
import { X, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface InquiryModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ tutor, isOpen, onClose }) => {
  const { sendInquiry, currentUser, t, lang } = useApp();
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentPhone, setStudentPhone] = useState(currentUser?.emailOrPhone || '');
  const [subject, setSubject] = useState(tutor?.subjects[0] || 'Physics');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !tutor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone) return;

    sendInquiry({
      tutorId: tutor.id,
      studentName,
      studentPhone,
      subject,
      message: message || `Interested in hiring for ${subject}. Please reach back.`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#2E8B6A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {t('Message Sent Successfully!', 'বার্তা সফলভাবে পাঠানো হয়েছে!')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('The tutor will contact you shortly.', 'গৃহশিক্ষক শীঘ্রই আপনার সাথে যোগাযোগ করবেন।')}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
              <img
                src={tutor.photoUrl}
                alt={tutor.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'bn' && tutor.nameBn ? tutor.nameBn : tutor.name}
                </h3>
                <p className="text-xs text-[#1E3A8A] font-semibold">{tutor.institute}</p>
                <p className="text-[11px] font-bold text-[#2E8B6A] mt-0.5">{tutor.hourlyRate} · {t('100% Free Mentoring', 'সম্পূর্ণ বিনামূল্যে')}</p>
              </div>
            </div>

            {/* Direct Contact Options */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <a
                href={`tel:${tutor.phone}`}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1E3A8A]" />
                <span>{t('Direct Call', 'কল করুন')}</span>
              </a>
              <a
                href={`https://wa.me/${tutor.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-800 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2E8B6A]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <p className="text-xs font-semibold text-slate-600 mb-2">
              {t('Or send a direct tuition inquiry message:', 'অথবা সরাসরি টিউশনির প্রস্তাব পাঠান:')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-900 mb-1">
                  {t('Your Name', 'আপনার নাম')} *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Rafiul Alam"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-900 mb-1">
                  {t('Your Phone Number / WhatsApp', 'ফোন বা হোয়াটসঅ্যাপ নম্বর')} *
                </label>
                <input
                  type="text"
                  required
                  value={studentPhone}
                  onChange={e => setStudentPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-900 mb-1">
                  {t('Subject Needed', 'প্রয়োজনীয় বিষয়')}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. HSC Physics"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-900 mb-1">
                  {t('Short Message', 'সংক্ষিপ্ত বার্তা')}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t('Tell tutor about your location and timing...', 'আপনার অবস্থান ও সময়সূচি লিখুন...')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-blue-600/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{t('Send Tuition Inquiry', 'টিউশনি বার্তা পাঠান')}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
