import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Tutor } from '../types';
import { AdSlot } from '../components/AdSlot';
import { resolveImageUrl, handleImageFallback } from '../utils/imageAssets';
import {
  Search,
  Filter,
  Check,
  Star,
  MapPin,
  Bookmark,
  RotateCcw,
  SlidersHorizontal,
  X,
  GraduationCap
} from 'lucide-react';

interface FindTutorsPageProps {
  onSelectTutor: (tutorId: string) => void;
  onContactTutor: (tutor: Tutor) => void;
  initialSearch?: string | null;
}

const parseMonthlyFee = (rateStr?: string): number => {
  if (!rateStr) return 3500;
  const bnToEn: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  const converted = rateStr.replace(/[০-৯]/g, d => bnToEn[d] || d);
  const match = converted.replace(/,/g, '').match(/\d{4,5}/);
  return match ? parseInt(match[0], 10) : 3500;
};

export const FindTutorsPage: React.FC<FindTutorsPageProps> = ({
  onSelectTutor,
  onContactTutor,
  initialSearch = ''
}) => {
  const { tutors, savedTutorIds, toggleSaveTutor, t, lang } = useApp();

  const [search, setSearch] = useState(initialSearch || '');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedMode, setSelectedMode] = useState<'All' | 'online' | 'offline' | 'both'>('All');
  const [selectedSalary, setSelectedSalary] = useState<'All' | '3500-4000' | '4001-4800' | '4801-5500'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'students' | 'fee_asc' | 'fee_desc'>('rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const subjectsList = ['All', 'Physics', 'Higher Math', 'General Math', 'Chemistry', 'Biology', 'English', 'ICT', 'Bangla'];
  const classesList = ['All', 'Class 6-8', 'Class 9-10', 'SSC', 'HSC', 'University Admission', 'Medical Admission'];
  const districtsList = ['All', 'Dhaka', 'Chattogram', 'Rajshahi', 'Sylhet', 'Khulna', 'Mymensingh'];

  const filteredTutors = useMemo(() => {
    return tutors
      .filter(tutor => {
        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = tutor.name.toLowerCase().includes(q) || (tutor.nameBn && tutor.nameBn.includes(q));
          const matchSub = tutor.subjects.some(s => s.toLowerCase().includes(q));
          const matchInst = tutor.institute.toLowerCase().includes(q);
          const matchArea = tutor.area.toLowerCase().includes(q) || tutor.district.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchInst && !matchArea) return false;
        }

        // Subject
        if (selectedSubject !== 'All') {
          if (!tutor.subjects.includes(selectedSubject)) return false;
        }

        // Class
        if (selectedClass !== 'All') {
          if (!tutor.classLevels.includes(selectedClass)) return false;
        }

        // District
        if (selectedDistrict !== 'All') {
          if (tutor.district !== selectedDistrict) return false;
        }

        // Mode
        if (selectedMode !== 'All') {
          if (tutor.teachingMode !== selectedMode && tutor.teachingMode !== 'both') return false;
        }

        // Monthly Salary Range (৳3,500 - ৳5,500)
        if (selectedSalary !== 'All') {
          const fee = parseMonthlyFee(tutor.hourlyRate);
          if (selectedSalary === '3500-4000' && (fee < 3500 || fee > 4000)) return false;
          if (selectedSalary === '4001-4800' && (fee <= 4000 || fee > 4800)) return false;
          if (selectedSalary === '4801-5500' && (fee <= 4800 || fee > 5500)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'fee_asc') return parseMonthlyFee(a.hourlyRate) - parseMonthlyFee(b.hourlyRate);
        if (sortBy === 'fee_desc') return parseMonthlyFee(b.hourlyRate) - parseMonthlyFee(a.hourlyRate);
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        return b.studentCount - a.studentCount;
      });
  }, [tutors, search, selectedSubject, selectedClass, selectedDistrict, selectedMode, selectedSalary, sortBy]);

  const displayedTutors = filteredTutors.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch('');
    setSelectedSubject('All');
    setSelectedClass('All');
    setSelectedDistrict('All');
    setSelectedMode('All');
    setSelectedSalary('All');
    setSortBy('rating');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/70 mb-1">
          <Check className="w-3.5 h-3.5 text-[#2E8B6A]" />
          <span>{t('Affordable Monthly Honorarium · ৳3,500 to ৳5,500/Month', 'সাশ্রয়ী মাসিক সম্মানী · ৳৩,৫০০ থেকে ৳৫,৫০০/মাস')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('Find Verified Tutors in Bangladesh', 'গৃহশিক্ষক খুঁজুন (মাসিক সম্মানী: ৳৩,৫০০ - ৳৫,৫০০)')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t(
            'Connect with 2,400+ qualified university mentors from BUET, DU, Medical & Public Universities. All tutors charge transparent monthly fees between ৳3,500 and ৳5,500 with zero middleman commissions.',
            'বুয়েট, ঢাবি, রাবি ও মেডিকেলসহ শীর্ষ বিশ্ববিদ্যালয়ের অভিজ্ঞ শিক্ষকদের সাথে সরাসরি যুক্ত হোন। অভিজ্ঞতা অনুযায়ী সর্বনিম্ন ৩,৫০০ থেকে সর্বোচ্চ ৫,৫০০ টাকা সাশ্রয়ী মাসিক সম্মানীতে মানসম্মত পাঠদান। কোনো এজেন্সি কমিশন নেই।'
          )}
        </p>
      </div>

      {/* Featured Mentorship Network Sponsor */}
      <AdSlot type="tutor_top_sponsor" className="mb-6" />

      {/* Main Grid: Filters Sidebar (Desktop) + Tutor List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1E3A8A]" />
                {t('Filter Search', 'ফিল্টার')}
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-[#F59E0B] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('Reset', 'রিসেট')}</span>
              </button>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                {t('Subject', 'বিষয়')}
              </label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
              >
                {subjectsList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Class Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                {t('Class / Level', 'শ্রেণি / লেভেল')}
              </label>
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
              >
                {classesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                {t('District', 'জেলা')}
              </label>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
              >
                {districtsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Teaching Mode */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                {t('Teaching Mode', 'পড়ানোর মাধ্যম')}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'All', label: 'All' },
                  { id: 'online', label: 'Online' },
                  { id: 'offline', label: 'Home' },
                  { id: 'both', label: 'Both' }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMode(m.id as any)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors ${
                      selectedMode === m.id
                        ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Monthly Fee Range Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                {t('Monthly Fee Range', 'মাসিক সম্মানীর সীমা')}
              </label>
              <select
                value={selectedSalary}
                onChange={e => setSelectedSalary(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
              >
                <option value="All">{t('All Rates (৳3,500 - ৳5,500)', 'সব রেট (৳৩,৫০০ - ৳৫,৫০০)')}</option>
                <option value="3500-4000">{t('৳3,500 - ৳4,000 / month', '৳৩,৫০০ - ৳৪,০০০ / মাস')}</option>
                <option value="4001-4800">{t('৳4,001 - ৳4,800 / month', '৳৪,০০১ - ৳৪,৮০০ / মাস')}</option>
                <option value="4801-5500">{t('৳4,801 - ৳5,500 / month', '৳৪,৮০১ - ৳৫,৫০০ / মাস')}</option>
              </select>
            </div>

            {/* Transparent Monthly Fee Callout */}
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#1E3A8A] text-xs font-bold">
                <Check className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                <span>{t('Direct Monthly Honorarium', 'সরাসরি মাসিক সম্মানী')}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {t(
                  'Tutors charge transparent monthly honorarium (৳3,500 - ৳5,500/month) based on experience and academic rigor. Direct payment to tutors with 0% platform cuts.',
                  'শিক্ষকদের অভিজ্ঞতা ও বিষয় অনুযায়ী মাসিক সম্মানী নির্ধারিত (৳৩,৫০০ - ৳৫,৫০০/মাস)। কোনো এজেন্সি চার্জ নেই, সরাসরি শিক্ষককে পরিশোধ করুন।'
                )}
              </p>
            </div>
          </div>

          {/* AD SPACE: Sidebar Rectangle (300x250) on desktop */}
          <AdSlot type="sidebar" />
        </aside>

        {/* Tutor Cards Content (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Bar: Search input + Mobile filter trigger + Sort by */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('Search by tutor name, university, or area...', 'শিক্ষকের নাম, বিশ্ববিদ্যালয় বা এলাকা লিখুন...')}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-600/10 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
              >
                <Filter className="w-3.5 h-3.5 text-[#1E3A8A]" />
                <span>{t('Filters', 'ফিল্টার')}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="hidden sm:inline">{t('Sort:', 'সাজান:')}</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-2.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#1E3A8A] font-medium"
                >
                  <option value="rating">{t('Highest Rated', 'সর্বোচ্চ রেটিং')}</option>
                  <option value="experience">{t('Most Experienced', 'অভিজ্ঞতা বেশি')}</option>
                  <option value="students">{t('Most Students', 'সর্বাধিক শিক্ষার্থী')}</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              {t('Showing', 'প্রদর্শিত')} <strong className="text-slate-900">{displayedTutors.length}</strong> {t('of', 'এর মধ্যে')} {filteredTutors.length} {t('tutors', 'জন শিক্ষক')}
            </span>
            {(selectedSubject !== 'All' || selectedClass !== 'All' || selectedDistrict !== 'All' || search) && (
              <button onClick={resetFilters} className="text-[#1E3A8A] hover:underline font-bold">
                {t('Clear all filters', 'সকল ফিল্টার মুছুন')}
              </button>
            )}
          </div>

          {/* Grid of Tutor Cards */}
          {displayedTutors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center mx-auto border border-blue-100">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t('No tutors found matching your criteria', 'কোনো গৃহশিক্ষক পাওয়া যায়নি')}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {t('Try searching with broader terms or clear your location/subject filters.', 'অন্য বিষয় বা জেলা দিয়ে আবার অনুসন্ধান করুন।')}
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1E3A8A] rounded-xl hover:bg-[#1E40AF] transition-colors shadow-xs"
              >
                {t('Reset Filters', 'ফিল্টার রিসেট')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayedTutors.map((tutor, index) => {
                const isSaved = savedTutorIds.includes(tutor.id);
                const showSponsoredCard = index === 3 || index === 7; // Native sponsored card inserted in grid

                return (
                  <React.Fragment key={tutor.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -3 }}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-lg hover:border-[#1E3A8A]/40 relative group"
                    >
                      <div>
                        {/* Photo & Header */}
                        <div className="flex items-start gap-4 mb-3.5">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                            <img
                              src={resolveImageUrl(tutor.photoUrl, tutor.name)}
                              alt={tutor.name}
                              referrerPolicy="no-referrer"
                              onError={e => handleImageFallback(e, tutor.name, tutor.photoUrl)}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                                {lang === 'bn' && tutor.nameBn ? tutor.nameBn : tutor.name}
                              </h3>
                              <button
                                onClick={() => toggleSaveTutor(tutor.id)}
                                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                                  isSaved ? 'text-[#F59E0B]' : 'text-slate-300 hover:text-slate-600'
                                }`}
                                aria-label="Save tutor"
                              >
                                <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                              </button>
                            </div>

                            <p className="text-xs text-[#1E3A8A] font-bold truncate">
                              {tutor.institute}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1 font-bold text-slate-900">
                                <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                                {tutor.rating}
                              </span>
                              <span>·</span>
                              <span>{tutor.experienceYears} {t('yrs exp', 'বছর')}</span>
                              {tutor.verified && (
                                <>
                                  <span>·</span>
                                  <span className="text-[#2E8B6A] font-semibold flex items-center gap-0.5">
                                    <Check className="w-3 h-3" />
                                    {t('Verified', 'যাচাইকৃত')}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Location & Mode */}
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2.5 truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          <span className="truncate">{tutor.area}, {tutor.district}</span>
                          <span>·</span>
                          <span className="capitalize">{tutor.teachingMode}</span>
                        </div>

                        {/* Bio snippet */}
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                          {lang === 'bn' && tutor.bioBn ? tutor.bioBn : tutor.bio}
                        </p>

                        {/* Subjects metadata (unboxed clean style) */}
                        <div className="text-xs text-[#1E3A8A] font-semibold bg-slate-50 p-2.5 rounded-xl mb-4 truncate border border-slate-100">
                          {tutor.subjects.join(' · ')}
                        </div>
                      </div>

                      {/* Bottom action bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#2E8B6A] bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#2E8B6A]" />
                          {tutor.hourlyRate}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onContactTutor(tutor)}
                            className="px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 active:scale-[0.97] rounded-xl transition-all cursor-pointer"
                          >
                            {t('Contact Free', 'ফ্রি যোগাযোগ')}
                          </button>
                          <button
                            onClick={() => onSelectTutor(tutor.id)}
                            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] active:scale-[0.97] rounded-xl transition-all cursor-pointer shadow-xs"
                          >
                            {t('View Profile', 'প্রোফাইল')}
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* PRD requirement: Native sponsored card inserted after every 5th tutor card */}
                    {showSponsoredCard && (
                      <AdSlot type="native_tutor" className="col-span-1 sm:col-span-2" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredTutors.length && (
            <div className="pt-4 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#1E3A8A] transition-colors shadow-xs"
              >
                {t('Load More Tutors', 'আরও শিক্ষক দেখুন')}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">
                  {t('Filter Tutors', 'ফিল্টার')}
                </h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                >
                  {subjectsList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">Class</label>
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                >
                  {classesList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">District</label>
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                >
                  {districtsList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#1E40AF] text-white text-xs font-bold shadow-xs"
              >
                {t('Apply Filters', 'ফিল্টার প্রয়োগ করুন')}
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                {t('Reset All', 'রিসেট')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
