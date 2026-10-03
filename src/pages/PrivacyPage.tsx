import React from 'react';
import { useApp } from '../context/AppContext';

export const PrivacyPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 space-y-6 bg-white rounded-3xl border border-[#ECE8E0] my-8 p-8 shadow-xs">
      <h1 className="text-2xl font-bold text-[#1C1B1F]">
        {t('Easy Tution Privacy Policy', 'গোপনীয়তা নীতি')}
      </h1>
      <p className="text-xs text-[#6B6760]">
        {t('Last updated: March 2026', 'সর্বশেষ আপডেট: মার্চ ২০২৬')}
      </p>

      <div className="space-y-4 text-xs sm:text-sm text-[#6B6760] leading-relaxed">
        <h2 className="text-sm font-bold text-[#1C1B1F]">1. Information We Collect</h2>
        <p>
          Easy Tution collects basic details provided during signup (such as name, phone number, email address, educational institution, and subjects). This data is used solely to facilitate educational connections between students and tutors.
        </p>

        <h2 className="text-sm font-bold text-[#1C1B1F]">2. Free Access & Advertising</h2>
        <p>
          Easy Tution is 100% free for all users. We display privacy-friendly advertising banners. We never sell your personal contact numbers to marketing brokers or third-party call centers.
        </p>

        <h2 className="text-sm font-bold text-[#1C1B1F]">3. Tutor Verification & Document Safety</h2>
        <p>
          Identification documents submitted for tutor verification are held securely for trust & safety checks and are never publicly shared on search engines.
        </p>

        <h2 className="text-sm font-bold text-[#1C1B1F]">4. User Rights</h2>
        <p>
          You may edit or delete your account data, remove your tutor profile, or opt out of inquiries at any time through your dashboard or by emailing support@easytution.org.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 space-y-6 bg-white rounded-3xl border border-[#ECE8E0] my-8 p-8 shadow-xs">
      <h1 className="text-2xl font-bold text-[#1C1B1F]">
        {t('Terms of Service', 'ব্যবহারের শর্তাবলি')}
      </h1>
      <p className="text-xs text-[#6B6760]">
        {t('Effective Date: March 2026', 'কার্যকরের তারিখ: মার্চ ২০২৬')}
      </p>

      <div className="space-y-4 text-xs sm:text-sm text-[#6B6760] leading-relaxed">
        <h2 className="text-sm font-bold text-[#1C1B1F]">1. Platform Role & Zero Commission</h2>
        <p>
          Easy Tution operates as a direct matching directory and educational sandbox. Easy Tution does not act as an employment agency and takes 0% cut of honorarium agreements reached between tutors and guardians.
        </p>

        <h2 className="text-sm font-bold text-[#1C1B1F]">2. Academic Integrity</h2>
        <p>
          Mock tests, question answers, and uploaded study resources are intended for academic enrichment and self-practice. Users agree not to misuse materials for commercial redistribution.
        </p>

        <h2 className="text-sm font-bold text-[#1C1B1F]">3. Respectful Conduct</h2>
        <p>
          Students, parents, and tutors agree to communicate professionally. Harassment, false identity claims, or fraudulent tutor credentials will result in immediate profile suspension.
        </p>
      </div>
    </div>
  );
};
