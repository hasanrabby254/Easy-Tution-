import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdSlot } from '../components/AdSlot';
import { StudyResource } from '../types';
import {
  UserCheck,
  Eye,
  PhoneCall,
  MessageSquare,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Clock,
  Plus,
  Send,
  FileText
} from 'lucide-react';

export const TutorDashboardPage: React.FC = () => {
  const {
    currentUser,
    updateUser,
    inquiries,
    addResource,
    t,
    lang
  } = useApp();

  // Active inquiries for this tutor
  const tutorInquiries = inquiries.filter(
    inq => inq.tutorId === currentUser?.id || inq.tutorId === 'tutor-1'
  );

  // Edit profile form
  const [institute, setInstitute] = useState(currentUser?.institute || 'BUET');
  const [degree, setDegree] = useState(currentUser?.degree || 'B.Sc. in EEE');
  const [hourlyRate, setHourlyRate] = useState(currentUser?.hourlyRate || '১০০% ফ্রি (০ ৳)');
  const [area, setArea] = useState(currentUser?.area || 'Dhanmondi, Dhaka');
  const [bio, setBio] = useState(currentUser?.bio || 'Passionate about conceptual learning in Physics & Math.');
  const [teachingMode, setTeachingMode] = useState(currentUser?.teachingMode || 'both');

  // Upload resource form
  const [resTitle, setResTitle] = useState('');
  const [resSubject, setResSubject] = useState('Physics');
  const [resClass, setResClass] = useState('HSC');
  const [resType, setResType] = useState<'PDF' | 'Notes' | 'Formula Sheet' | 'Suggestion'>('Notes');
  const [resDesc, setResDesc] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      institute,
      degree,
      hourlyRate,
      area,
      bio,
      teachingMode: teachingMode as any
    });
  };

  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) return;

    const newRes: StudyResource = {
      id: `res-${Date.now()}`,
      title: resTitle,
      subject: resSubject,
      classLevel: resClass,
      fileType: resType,
      size: '3.2 MB',
      downloadCount: 0,
      uploaderName: `${currentUser?.name || 'Tutor'} (${institute})`,
      description: resDesc || 'Handwritten comprehensive study notes uploaded via tutor dashboard.'
    };

    addResource(newRes);
    setResTitle('');
    setResDesc('');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-[#ECE8E0] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#272A6B] text-white flex items-center justify-center font-bold text-2xl shadow-xs">
            {currentUser?.name.charAt(0) || 'T'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C1B1F]">
                {currentUser?.name}
              </h1>
              {currentUser?.verified ? (
                <span className="text-xs font-bold text-[#2E8B6A] bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('Verified Educator', 'ভেরিফায়েড শিক্ষক')}
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  {t('Verification Pending', 'ভেরিফিকেশন পেন্ডিং')}
                </span>
              )}
            </div>
            <p className="text-xs text-[#6B6760]">
              {institute} · {degree} · {area}
            </p>
          </div>
        </div>

        {/* Profile Progress */}
        <div className="w-full md:w-64 space-y-1.5 p-4 rounded-2xl bg-[#FBF9F5] border border-[#ECE8E0]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1C1B1F]">{t('Profile Completion', 'প্রোফাইল সম্পূর্ণতা')}</span>
            <span className="font-bold text-[#272A6B]">90%</span>
          </div>
          <div className="w-full bg-[#ECE8E0] h-2 rounded-full overflow-hidden">
            <div className="bg-[#2E8B6A] h-full w-[90%]" />
          </div>
          <span className="text-[10px] text-[#6B6760] block">
            {t('Add your certificate to reach 100%', 'সার্টিফিকেট যুক্ত করে ১০০% সম্পন্ন করুন')}
          </span>
        </div>
      </div>

      {/* Demo Analytics Cards (PRD requirement: profile views and contact clicks) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#ECE8E0] p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#6B6760] block">{t('Profile Views (Monthly)', 'প্রোফাইল ভিউ')}</span>
            <span className="text-2xl font-extrabold text-[#1C1B1F] tabular-nums">412</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#ECE8E0] p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#6B6760] block">{t('Contact & Call Clicks', 'যোগাযোগ ক্লিক')}</span>
            <span className="text-2xl font-extrabold text-[#1C1B1F] tabular-nums">89</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#ECE8E0] p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#272A6B]/10 text-[#272A6B] flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#6B6760] block">{t('Student Inquiries', 'শিক্ষার্থীদের বার্তা')}</span>
            <span className="text-2xl font-extrabold text-[#1C1B1F] tabular-nums">
              {tutorInquiries.length}
            </span>
          </div>
        </div>
      </div>

      {/* AD SPACE: Small banner */}
      <AdSlot type="profile_banner" />

      {/* Main Grid: Student Inquiries (7 cols) + Upload Notes / Edit Profile (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Student Inquiries Received */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ECE8E0] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E0]">
            <div>
              <h2 className="text-base font-bold text-[#1C1B1F]">
                {t('Direct Student Inquiries', 'শিক্ষার্থীদের বার্তা')}
              </h2>
              <p className="text-xs text-[#6B6760]">
                {t('Contact requests submitted by students from your profile', 'আপনার প্রোফাইল থেকে আসা টিউশনি প্রস্তাবসমূহ')}
              </p>
            </div>
            <span className="text-xs font-bold text-[#272A6B] bg-[#272A6B]/8 px-2.5 py-1 rounded-md">
              {tutorInquiries.length} {t('New', 'নতুন')}
            </span>
          </div>

          {tutorInquiries.length === 0 ? (
            <p className="text-xs text-[#6B6760] py-8 text-center">
              {t('No student inquiries yet. They will appear here when students contact you.', 'কোনো বার্তা আসেনি।')}
            </p>
          ) : (
            <div className="space-y-4">
              {tutorInquiries.map(inq => (
                <div
                  key={inq.id}
                  className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#ECE8E0] space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1C1B1F]">{inq.studentName}</h3>
                      <p className="text-xs text-[#272A6B] font-semibold">{inq.subject}</p>
                    </div>
                    <span className="text-[11px] text-[#6B6760]">{inq.date}</span>
                  </div>

                  <p className="text-xs text-[#1C1B1F] bg-white p-3 rounded-xl border border-[#ECE8E0] italic">
                    “{inq.message}”
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#6B6760]">
                      {t('Phone:', 'ফোন:')} <strong className="text-[#1C1B1F]">{inq.studentPhone}</strong>
                    </span>
                    <a
                      href={`tel:${inq.studentPhone}`}
                      className="px-3 py-1.5 rounded-xl bg-[#272A6B] text-white text-xs font-semibold hover:bg-[#202256]"
                    >
                      {t('Call Student', 'কল করুন')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Upload Resources & Edit Profile */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Upload Resource Form */}
          <div className="bg-white rounded-3xl border border-[#ECE8E0] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#ECE8E0]">
              <Upload className="w-4 h-4 text-[#D9A441]" />
              <h3 className="text-sm font-bold text-[#1C1B1F]">
                {t('Upload Study Notes or Suggestions', 'নোট বা সাজেশন আপলোড')}
              </h3>
            </div>

            <form onSubmit={handleUploadResource} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">
                  {t('Document Title', 'নোটের শিরোনাম')} *
                </label>
                <input
                  type="text"
                  required
                  value={resTitle}
                  onChange={e => setResTitle(e.target.value)}
                  placeholder="e.g. HSC Physics Calculus Formulas 2026"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">Subject</label>
                  <select
                    value={resSubject}
                    onChange={e => setResSubject(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Math">Math</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="ICT">ICT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">Class</label>
                  <select
                    value={resClass}
                    onChange={e => setResClass(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                  >
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Admission">Admission</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">
                  {t('Description', 'বিবরণ')}
                </label>
                <textarea
                  rows={2}
                  value={resDesc}
                  onChange={e => setResDesc(e.target.value)}
                  placeholder="Brief summary of key formulas covered..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#272A6B] text-white text-xs font-bold hover:bg-[#202256] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t('Publish Resource to Library', 'লাইব্রেরিতে পাবলিশ করুন')}</span>
              </button>
            </form>
          </div>

          {/* Edit Profile Form */}
          <div className="bg-white rounded-3xl border border-[#ECE8E0] p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#1C1B1F] pb-3 border-b border-[#ECE8E0]">
              {t('Edit Tutor Profile Details', 'প্রোফাইল তথ্য আপডেট')}
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">
                  {t('Institute / University', 'প্রতিষ্ঠান')}
                </label>
                <input
                  type="text"
                  value={institute}
                  onChange={e => setInstitute(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">
                  {t('Degree', 'ডিগ্রি')}
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={e => setDegree(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">
                  {t('Tuition Fee Model', 'টিউশন ফি মডেল')}
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('100% Free Mentoring (No monthly fee)', '১০০% ফ্রি স্বেচ্ছাসেবী পাঠদান (কোনো মাসিক ফি নেই)')}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">
                  {t('Location / Areas Covered', 'এলাকা')}
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1C1B1F] mb-1">
                  {t('Bio & Methodology', 'সংক্ষিপ্ত বিবরণ')}
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#ECE8E0]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl border border-[#272A6B] text-[#272A6B] text-xs font-bold hover:bg-[#272A6B]/5 transition-colors"
              >
                {t('Save Profile Changes', 'পরিবর্তন সংরক্ষণ করুন')}
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
