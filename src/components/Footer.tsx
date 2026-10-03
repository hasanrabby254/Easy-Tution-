import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Heart, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <footer className="bg-[#1E3A8A] text-white pt-14 pb-8 border-t border-blue-900/50">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Easy<span className="text-[#F59E0B]"> Tution</span>
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider font-semibold text-[#F59E0B]">
              Learn , Teach , Grow
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {t(
                'Easy Tution is Bangladesh’s free educational platform bridging eager students and dedicated tutors. Practice real-time mock tests, download curated lecture notes, and connect with zero commissions.',
                'ইজি টিউশন (Easy Tution) বাংলাদেশের একটি সম্পূর্ণ ফ্রি শিক্ষা প্ল্যাটফর্ম। এখানে শিক্ষার্থীরা সরাসরি নির্ভরযোগ্য গৃহশিক্ষক খুঁজে পায়, ফ্রি মক টেস্টে অংশ নেয় এবং উচ্চমানের হ্যান্ডনোট ডাউনলোড করে।'
              )}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#F59E0B]" />
                support@easytution.org
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#F59E0B]">
              {t('Explore', 'অন্বেষণ')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('Home', 'হোম')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tutors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('Find Tutors', 'গৃহশিক্ষক খুঁজুন')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tests')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('MCQ Mock Tests', 'এমসিকিউ মক টেস্ট')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('resources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('Study Resources', 'স্টাডি রিসোর্স')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-[#F59E0B] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{t('Admin Panel', 'অ্যাডমিন প্যানেল')}</span>
                  <span className="text-[10px] text-slate-400">(demo)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#F59E0B]">
              {t('Categories', 'ক্যাটাগরি')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button onClick={() => navigateTo('tests')} className="hover:text-white transition-colors">
                  {t('SSC Preparation (Class 9-10)', 'এসএসসি প্রস্তুতি (৯ম-১০ম)')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tests')} className="hover:text-white transition-colors">
                  {t('HSC Science & Commerce', 'এইচএসসি বিজ্ঞান ও বাণিজ্য')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tests')} className="hover:text-white transition-colors">
                  {t('University Admission (DU/BUET/Medical)', 'বিশ্ববিদ্যালয় ভর্তি')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tests')} className="hover:text-white transition-colors">
                  {t('General Knowledge & BCS', 'সাধারণ জ্ঞান ও বিসিএস')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tutors')} className="hover:text-white transition-colors">
                  {t('English Language Mastery', 'ইংরেজি ল্যাঙ্গুয়েজ')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Sustainability & Ads */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#F59E0B]">
              {t('Free Forever Model', 'ফ্রি মডেল')}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'Easy Tution charges 0% fees to both teachers and students. We fund server capacity, question curation, and storage exclusively via respectful, premium advertisements.',
                'ইজি টিউশন শিক্ষক ও শিক্ষার্থী কারও কাছ থেকেই কোনো ফি বা কমিশন নেয় না। সম্মানজনক বিজ্ঞাপন আয়ের মাধ্যমে প্ল্যাটফর্মটি পরিচালিত হয়।'
              )}
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] bg-white/10 text-white/90 px-2.5 py-1 rounded-md border border-white/15">
                {t('100% Free & Open Education', 'শতভাগ ফ্রি ও উন্মুক্ত শিক্ষা')}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Easy Tution · Learn , Teach , Grow. {t('Crafted with', 'উৎসর্গীকৃত')} <Heart className="w-3.5 h-3.5 text-rose-400 inline fill-rose-400" /> {t('for learners across Bangladesh.', 'বাংলাদেশের সকল শিক্ষক ও শিক্ষার্থীদের জন্য।')}
          </p>

          <div className="flex items-center gap-5">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
              {t('Privacy Policy', 'গোপনীয়তা নীতি')}
            </button>
            <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
              {t('Terms of Service', 'ব্যবহারের শর্তাবলি')}
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
              {t('Contact Us', 'যোগাযোগ')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
