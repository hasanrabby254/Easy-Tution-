import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  ShieldCheck,
  Heart,
  Users,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>{t('Our Mission & Vision', 'আমাদের লক্ষ্য ও উদ্দেশ্য')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Democratizing Quality Education in Bangladesh', 'সবার জন্য উন্মুক্ত ও নির্ভরযোগ্য শিক্ষা')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t(
            'Easy Tution was founded on a simple belief: high quality tutoring and examination practice should not be locked behind predatory middleman agencies or steep subscription paywalls.',
            'ইজি টিউশনের (Easy Tution) যাত্রা শুরু হয় একটি মহৎ বিশ্বাস থেকে: গুণগত শিক্ষা কোনো অন্যায্য মিডিয়া ফি বা অতিরিক্ত সাবস্ক্রিপশনের বেড়াজালে আটকে থাকতে পারে না।'
          )}
        </p>
      </div>

      {/* Values 3-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold border border-blue-100">
            <Heart className="w-6 h-6 text-[#1E3A8A]" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {t('Zero Agency Cuts', '০% মিডিয়া কমিশন')}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t(
              'Conventional agencies extract 50% to 100% of a tutor’s first month salary. Easy Tution takes zero taka from tutors and students.',
              'ঐতিহ্যবাহী মিডিয়াগুলোর মতো আমরা কোনো বেতন বা টিউশন ফি থেকে কমিশন কাটি না। শিক্ষক ও শিক্ষার্থীদের যোগাযোগ সম্পূর্ণ উন্মুক্ত।'
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold border border-blue-100">
            <ShieldCheck className="w-6 h-6 text-[#1E3A8A]" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {t('Verified University Mentors', 'যাচাইকৃত শিক্ষার্থী শিক্ষক')}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t(
              'We verify institutional identification cards from BUET, DU, RU, Medical Colleges, and Engineering Universities to foster deep trust with parents.',
              'অভিভাবকদের শতভাগ নিশ্চিন্ত রাখতে আমরা শিক্ষকদের বিশ্ববিদ্যালয়ের আইডি কার্ড ও শিক্ষাগত তথ্যাদি যাচাই করি।'
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold border border-blue-100">
            <Award className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {t('Free High-Yield Practice', 'ফ্রি মানসম্মত অনুশীলন')}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t(
              'Our timed MCQ platform with step-by-step solutions gives examinees the competitive edge needed to secure top percentiles in SSC, HSC & Admission.',
              'টাইমারসহ এমসিকিউ মক টেস্টের মাধ্যমে শিক্ষার্থীরা তাদের সময় ব্যবস্থাপনা ও সঠিক ধারণা ঝালিয়ে নিতে পারে।'
            )}
          </p>
        </div>
      </div>

      {/* Sustainable Ad Model Callout */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          {t('How Easy Tution Stays 100% Free Forever', 'Easy Tution কীভাবে আজীবন ফ্রি থাকে?')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t(
            'We sustain server hosting, CDN bandwidth, question bank updates, and safety moderation through carefully curated, respectful ad placements. We do not use noisy popups, spam redirects, or tracking telemetry. Every ad space is cleanly demarcated with verified sponsor tags.',
            'আমাদের সার্ভার খরচ ও প্ল্যাটফর্ম পরিচালনা নির্বাহ হয় রুচিশীল বিজ্ঞাপনের মাধ্যমে। আমরা কোনো পপ-আপ বা বিরক্তিকর বিজ্ঞাপন ব্যবহার করি না।'
          )}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => navigateTo('tutors')}
            className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF] transition-colors shadow-xs cursor-pointer"
          >
            {t('Find a Tutor Now', 'গৃহশিক্ষক খুঁজুন')}
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {t('Contact Support', 'সহায়তায় যোগাযোগ')}
          </button>
        </div>
      </div>

    </div>
  );
};
