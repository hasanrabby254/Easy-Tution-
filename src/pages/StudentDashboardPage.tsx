import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { resolveImageUrl, handleImageFallback } from '../utils/imageAssets';
import { StudentProgressDashboard } from '../components/StudentProgressDashboard';
import { AdSlot } from '../components/AdSlot';
import {
  Flame,
  BookOpen,
  Bookmark,
  Award,
  Clock,
  ArrowRight,
  UserCheck,
  Download,
  Edit3,
  CheckCircle2,
  X,
  BarChart3,
  User,
  Sparkles
} from 'lucide-react';

interface StudentDashboardProps {
  onSelectTest: (testId: string) => void;
  onSelectTutor: (tutorId: string) => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardProps> = ({
  onSelectTest,
  onSelectTutor
}) => {
  const {
    currentUser,
    updateUser,
    testResults,
    tutors,
    resources,
    savedTutorIds,
    savedResourceIds,
    t,
    lang,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'saved'>('analytics');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(currentUser?.name || 'Samiul Bashar');
  const [classLevel, setClassLevel] = useState(currentUser?.classLevel || 'HSC Science');
  const [district, setDistrict] = useState(currentUser?.district || 'Dhaka');

  const savedTutorsList = tutors.filter(t => savedTutorIds.includes(t.id));
  const savedResourcesList = resources.filter(r => savedResourceIds.includes(r.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, classLevel, district });
    setIsEditingProfile(false);
  };

  const displayName = currentUser?.name || 'Samiul Bashar';
  const displayClass = currentUser?.classLevel || 'HSC Science';
  const displayDistrict = currentUser?.district || 'Dhaka';

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-2xl shadow-xs border border-blue-900/30">
            {displayName.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {displayName}
              </h1>
              {currentUser && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="p-1 text-slate-500 hover:text-[#1E3A8A] cursor-pointer"
                  title="Edit Profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {displayClass} · {displayDistrict} · {t('Student ID', 'শিক্ষার্থী আইডি')} #STU-{currentUser?.id ? currentUser.id.slice(-4) : '2026'}
            </p>
          </div>
        </div>

        {/* Streak & Stats */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-initial p-3.5 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center gap-3">
            <Flame className="w-6 h-6 text-[#F59E0B]" />
            <div>
              <span className="text-xs font-semibold text-amber-900 block">
                {t('Study Streak', 'অনুশীলন স্ট্রিক')}
              </span>
              <span className="text-base font-extrabold text-slate-900 tabular-nums">
                {currentUser?.streakDays || 5} {t('Days Active', 'দিন সক্রিয়')}
              </span>
            </div>
          </div>

          <div className="flex-1 md:flex-initial p-3.5 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center gap-3">
            <Award className="w-6 h-6 text-[#1E3A8A]" />
            <div>
              <span className="text-xs font-semibold text-[#1E3A8A] block">
                {t('Tests Taken', 'মক টেস্ট')}
              </span>
              <span className="text-base font-extrabold text-slate-900 tabular-nums">
                {testResults.length} {t('Completed', 'টি সম্পন্ন')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Booster Sponsorship */}
      <AdSlot type="student_dashboard_sponsor" />

      {/* Segmented Dashboard Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t('Learning Progress & Analytics', 'লার্নিং প্রগ্রেস ও অ্যানালিটিক্স')}</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{t('Saved Tutors & Notes', 'সংরক্ষিত শিক্ষক ও নোট')}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-slate-200 text-slate-700">
            {savedTutorsList.length + savedResourcesList.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Recharts Visualizations & Trends */}
      {activeTab === 'analytics' && (
        <StudentProgressDashboard onSelectTest={onSelectTest} />
      )}

      {/* Tab 2: Saved Mentors & Handnotes */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">
                  {t('Saved Tutors', 'বুকমার্ক করা শিক্ষকবৃন্দ')}
                </h2>
                <button
                  onClick={() => navigateTo('tutors')}
                  className="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                >
                  {t('Find More Tutors', 'আরও শিক্ষক খুঁজুন')}
                </button>
              </div>

              {savedTutorsList.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">
                  {t('No saved tutors yet. Browse the directory to bookmark free mentors.', 'কোনো শিক্ষক সেভ করা নেই।')}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedTutorsList.map(tutor => (
                    <div
                      key={tutor.id}
                      className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={resolveImageUrl(tutor.photoUrl, tutor.name)}
                          alt={tutor.name}
                          referrerPolicy="no-referrer"
                          onError={e => handleImageFallback(e, tutor.name, tutor.photoUrl)}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{tutor.name}</h4>
                          <p className="text-[11px] text-[#1E3A8A] font-medium truncate">{tutor.institute}</p>
                          <p className="text-[10px] text-slate-500 truncate">{tutor.area}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectTutor(tutor.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1E3A8A] rounded-xl hover:bg-[#1E40AF] shrink-0 cursor-pointer"
                      >
                        {t('Profile', 'প্রোফাইল')}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900">
                {t('Saved Notes & Books', 'সংরক্ষিত হ্যান্ডনোট')}
              </h3>
              {savedResourcesList.length === 0 ? (
                <p className="text-xs text-slate-500 py-2">
                  {t('No resources saved yet.', 'কোনো রিসোর্স সেভ করা নেই।')}
                </p>
              ) : (
                <div className="space-y-2.5">
                  {savedResourcesList.map(res => (
                    <div
                      key={res.id}
                      onClick={() => navigateTo('resources')}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{res.title}</p>
                        <p className="text-[10px] text-slate-500">{res.subject} · {res.size}</p>
                      </div>
                      <Download className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsEditingProfile(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 relative space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {t('Edit Student Profile', 'শিক্ষার্থী প্রোফাইল এডিট')}
              </h3>
              <button onClick={() => setIsEditingProfile(false)}>
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('Name', 'নাম')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('Class / Level', 'শ্রেণি')}
                </label>
                <input
                  type="text"
                  value={classLevel}
                  onChange={e => setClassLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  {t('District', 'জেলা')}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#1E40AF]"
              >
                {t('Save Changes', 'সংরক্ষণ করুন')}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

