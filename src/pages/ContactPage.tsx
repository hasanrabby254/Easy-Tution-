import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(t('Message received! Our team will get back within 24 hours.', 'বার্তা জমা হয়েছে! আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।'));
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1F]">
          {t('Get in Touch with Easy Tution', 'যোগাযোগ করুন')}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6760]">
          {t(
            'Questions about tutor verification, partnership, or mock tests? We’re here to help.',
            'টিউটর ভেরিফিকেশন, পার্টনারশিপ বা কোনো সমস্যা থাকলে আমাদের জানান।'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact info cards (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#ECE8E0] p-6 shadow-xs space-y-6">
            <h3 className="text-sm font-bold text-[#1C1B1F]">
              {t('Contact Information', 'যোগাযোগের ঠিকানা')}
            </h3>

            <div className="space-y-4 text-xs text-[#6B6760]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1B1F] block">{t('Main Campus Office', 'প্রধান কার্যালয়')}</strong>
                  <span>House 42, Road 9/A, Dhanmondi, Dhaka 1209, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#272A6B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1B1F] block">{t('Support Email', 'ইমেইল')}</strong>
                  <span>support@tuitionmedia.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2E8B6A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1B1F] block">{t('Helpline', 'হেল্পলাইন')}</strong>
                  <span>+880 1700 000000 (10 AM - 8 PM)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE8E0]">
              <span className="text-[11px] font-semibold text-[#272A6B] bg-[#272A6B]/5 px-3 py-1 rounded-md block text-center">
                {t('Dedicated Student & Tutor Support', 'শিক্ষার্থী ও শিক্ষকদের সহায়তায় নিয়োজিত')}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#ECE8E0] p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#2E8B6A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1B1F]">
                {t('Thank You for Reaching Out!', 'ধন্যবাদ! আপনার বার্তা গৃহীত হয়েছে')}
              </h3>
              <p className="text-xs text-[#6B6760] max-w-sm mx-auto">
                {t('We have received your message and will respond promptly.', 'আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে যোগাযোগ করবে।')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#272A6B] border border-[#272A6B]"
              >
                {t('Send Another Message', 'আরেকটি বার্তা পাঠান')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1B1F] mb-1">
                  {t('Your Full Name', 'আপনার পুরো নাম')} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ECE8E0] focus:outline-none focus:border-[#272A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1B1F] mb-1">
                  {t('Email Address or Phone', 'ইমেইল বা ফোন')} *
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com or 017xxxxxxxx"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ECE8E0] focus:outline-none focus:border-[#272A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1B1F] mb-1">
                  {t('Inquiry Type', 'বিষয়')}
                </label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#ECE8E0] focus:outline-none"
                >
                  <option value="General Inquiry">{t('General Question', 'সাধারণ জিজ্ঞাসা')}</option>
                  <option value="Tutor Verification">{t('Tutor Verification Support', 'শিক্ষক ভেরিফিকেশন সহায়তা')}</option>
                  <option value="Sponsorship">{t('Ad Placement & Sponsorship', 'বিজ্ঞাপন ও স্পনসরশিপ')}</option>
                  <option value="Bug Report">{t('Report a Technical Issue', 'সমস্যা বা বাগ রিপোর্ট')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1B1F] mb-1">
                  {t('Message', 'বার্তা')} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t('Write your question or request here...', 'আপনার বক্তব্য বিস্তারিত লিখুন...')}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ECE8E0] focus:outline-none focus:border-[#272A6B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#272A6B] text-white text-xs font-bold hover:bg-[#202256] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('Send Message', 'বার্তা পাঠান')}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
