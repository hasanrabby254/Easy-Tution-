import React from 'react';
import { useApp } from '../context/AppContext';
import { AdSlot } from '../components/AdSlot';
import { Tutor } from '../types';
import { resolveImageUrl, handleImageFallback } from '../utils/imageAssets';
import {
  Check,
  Star,
  MapPin,
  Bookmark,
  Share2,
  Phone,
  MessageSquare,
  GraduationCap,
  Calendar,
  Clock,
  ArrowLeft,
  Award,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface TutorProfilePageProps {
  tutorId: string;
  onBack: () => void;
  onSelectTutor: (id: string) => void;
  onContactTutor: (tutor: Tutor) => void;
  onShare: (title: string, url: string) => void;
}

export const TutorProfilePage: React.FC<TutorProfilePageProps> = ({
  tutorId,
  onBack,
  onSelectTutor,
  onContactTutor,
  onShare
}) => {
  const { tutors, savedTutorIds, toggleSaveTutor, t, lang } = useApp();

  const tutor = tutors.find(item => item.id === tutorId) || tutors[0];
  const isSaved = savedTutorIds.includes(tutor.id);

  // Similar tutors in same subject/district
  const similarTutors = tutors
    .filter(item => item.id !== tutor.id && (item.district === tutor.district || item.subjects.some(s => tutor.subjects.includes(s))))
    .slice(0, 3);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1E3A8A] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
        <span>{t('Back to Tutors Directory', 'সকল শিক্ষকের তালিকায় ফিরুন')}</span>
      </button>

      {/* Main Grid: Profile Details (8 cols) + Sticky Contact Card (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Main Profile Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative shrink-0">
                <img
                  src={resolveImageUrl(tutor.photoUrl, tutor.name)}
                  alt={tutor.name}
                  referrerPolicy="no-referrer"
                  onError={e => handleImageFallback(e, tutor.name, tutor.photoUrl)}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
                />
                {tutor.verified && (
                  <span className="absolute -bottom-2 -right-2 bg-[#1E3A8A] text-white p-1.5 rounded-xl shadow-xs" title="Verified Educator">
                    <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {lang === 'bn' && tutor.nameBn ? tutor.nameBn : tutor.name}
                    </h1>
                    {tutor.verified && (
                      <span className="text-xs font-bold text-[#2E8B6A] bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200/60">
                        <Check className="w-3 h-3" />
                        {t('Verified', 'যাচাইকৃত')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleSaveTutor(tutor.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A]' : 'border-slate-200 text-slate-500 hover:text-slate-900'
                      }`}
                      title={isSaved ? 'Saved' : 'Save tutor'}
                    >
                      <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => onShare(`${tutor.name} - Easy Tution Profile`, window.location.href)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                      title="Share Profile"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm font-bold text-[#1E3A8A] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#F59E0B]" />
                  <span>{tutor.degree} — {tutor.institute}</span>
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <strong className="text-slate-900">{tutor.rating}</strong>
                    <span>({tutor.reviewCount} {t('reviews', 'মতামত')})</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>{tutor.experienceYears} {t('Years Experience', 'বছরের অভিজ্ঞতা')}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tutor.area}, {tutor.district}</span>
                  </span>
                </div>

                {/* Clean unboxed subjects metadata */}
                <div className="text-xs text-[#1E3A8A] font-bold pt-2">
                  {t('Subjects:', 'বিষয়সমূহ:')} {tutor.subjects.join(' · ')}
                </div>
              </div>
            </div>
          </div>

          {/* Section: About Me */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900">
              {t('About the Tutor & Teaching Methodology', 'শিক্ষকের পরিচিতি ও পাঠদান পদ্ধতি')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn' && tutor.bioBn ? tutor.bioBn : tutor.bio}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t(
                'Conducts regular chapter-wise evaluations, assigns curated handwritten problem sheets, and mentors students with personalized time-management strategies for board and competitive admission exams.',
                'প্রতিটি অধ্যায় শেষে বিশেষ পরীক্ষা গ্রহণ করা হয় এবং বোর্ড পরীক্ষা ও ভর্তি পরীক্ষার মানসম্পন্ন সংক্ষিপ্ত নোট সরবরাহ করা হয়।'
              )}
            </p>
          </div>

          {/* AD SPACE: Banner between sections */}
          <AdSlot type="profile_banner" />

          {/* Section: Academic Background & Subjects */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900">
              {t('Academic Background & Subjects Taught', 'শিক্ষাগত যোগ্যতা ও পাঠদানের বিষয়')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {t('Graduation / College', 'প্রতিষ্ঠান')}
                </span>
                <p className="text-sm font-bold text-slate-900">{tutor.institute}</p>
                <p className="text-xs text-[#1E3A8A] font-semibold">{tutor.degree}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {t('Classes & Levels', 'শ্রেণি ও স্তর')}
                </span>
                <p className="text-sm font-bold text-slate-900">{tutor.classLevels.join(', ')}</p>
                <p className="text-xs text-emerald-800 font-semibold">{t('Bangla & English Medium Available', 'বাংলা ও ইংলিশ ভার্সন')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {t('Preferred Subjects', 'বিশেষায়িত বিষয়সমূহ')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map(sub => (
                  <span
                    key={sub}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#1E3A8A] shadow-2xs"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 border border-blue-100">
                  <Clock className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">{t('Availability', 'উপস্থিতির সময়')}</span>
                  <span className="text-xs font-bold text-slate-900">{tutor.availability}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 border border-blue-100">
                  <Calendar className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">{t('Teaching Mode', 'পড়ানোর ধরন')}</span>
                  <span className="text-xs font-bold text-slate-900 capitalize">{tutor.teachingMode} ({t('Home / Online', 'হোম ও অনলাইন')})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Tutors */}
          {similarTutors.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-base font-bold text-slate-900">
                {t('Similar Tutors in this Subject / Region', 'একই বিষয় বা এলাকার অন্যান্য শিক্ষক')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarTutors.map(st => (
                  <div
                    key={st.id}
                    onClick={() => onSelectTutor(st.id)}
                    className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-[#1E3A8A]/40 hover:shadow-xs transition-all cursor-pointer space-y-2"
                  >
                    <img
                      src={st.photoUrl}
                      alt={st.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-28 object-cover rounded-xl border border-slate-200"
                    />
                    <h4 className="text-xs font-bold text-slate-900 truncate">{st.name}</h4>
                    <p className="text-[11px] text-[#1E3A8A] font-bold truncate">{st.institute}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>{st.district}</span>
                      <span className="font-bold text-[#2E8B6A] bg-emerald-50 px-2 py-0.5 rounded">{st.hourlyRate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Contact Card (4 cols) */}
        <aside className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="space-y-1 pb-4 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-500">{t('Tuition Fee', 'টিউশন ফি')}</span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#2E8B6A] tabular-nums">
                {tutor.hourlyRate}
              </div>
              <span className="text-[11px] text-[#2E8B6A] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {t('100% Free · No Monthly Fee Required', '১০০% ফ্রি · কোনো মাসিক ফি লাগবে না')}
              </span>
            </div>

            {/* Direct Contact Buttons */}
            <div className="space-y-2.5">
              <a
                href={`tel:${tutor.phone}`}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#F59E0B]" />
                <span>{t('Direct Call:', 'সরাসরি কল:')} {tutor.phone}</span>
              </a>

              <a
                href={`https://wa.me/${tutor.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#2E8B6A]" />
                <span>{t('Chat on WhatsApp', 'হোয়াটসঅ্যাপে নক করুন')}</span>
              </a>

              <button
                onClick={() => onContactTutor(tutor)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 border border-blue-200/60 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('Send Inquiry Message', 'ইনকোয়ারি মেসেজ পাঠান')}</span>
              </button>
            </div>

            {/* Safety & Trust Markers */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                <p>{t('National ID and Student University ID submitted for verification.', 'জাতীয় পরিচয়পত্র ও বিশ্ববিদ্যালয়ের আইডি কার্ড যাচাইকৃত।')}</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#2E8B6A] shrink-0 mt-0.5" />
                <p>{t('Free 1st demo class recommended before confirming month-long batch.', 'প্রথম দিন ডেমো ক্লাস নেওয়ার পরামর্শ দেওয়া হয়।')}</p>
              </div>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
};
