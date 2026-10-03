import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StudyResource } from '../types';
import { AdSlot } from '../components/AdSlot';
import {
  FileText,
  Download,
  Bookmark,
  Search,
  Eye,
  X,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { resources, savedResourceIds, toggleSaveResource, showToast, t, lang } = useApp();

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [search, setSearch] = useState('');
  const [previewResource, setPreviewResource] = useState<StudyResource | null>(null);

  const subjects = ['All', 'Physics', 'Chemistry', 'Math', 'Biology', 'English', 'General Knowledge', 'ICT'];
  const classes = ['All', 'Class 6-8', 'Class 9-10', 'SSC', 'HSC', 'Admission'];

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      if (selectedSubject !== 'All' && res.subject !== selectedSubject) return false;
      if (selectedClass !== 'All' && res.classLevel !== selectedClass) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = res.title.toLowerCase().includes(q) || (res.titleBn && res.titleBn.includes(q));
        const matchDesc = res.description.toLowerCase().includes(q);
        const matchUploader = res.uploaderName.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchUploader) return false;
      }
      return true;
    });
  }, [resources, selectedSubject, selectedClass, search]);

  const handleDownload = (res: StudyResource) => {
    showToast(
      lang === 'bn'
        ? `"${res.titleBn || res.title}" ডাউনলোড শুরু হয়েছে...`
        : `Downloading "${res.title}" (${res.size})...`
    );
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F59E0B]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('Free Open Study Library', 'উন্মুক্ত স্টাডি লাইব্রেরি')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('Study Resources, Formula Sheets & PDF Notes', 'স্টাডি রিসোর্স ও হ্যান্ডনোট')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          {t(
            'Download free chapter summaries, high-yield suggestion papers, and handwritten formula booklets created by top tutors across Bangladesh.',
            'বাংলাদেশের সেরা শিক্ষকদের তৈরি ফর্মুলা শিট, অধ্যায়ভিত্তিক হ্যান্ডনোট এবং বোর্ড পরীক্ষার পূর্ণাঙ্গ সাজেশন সম্পূর্ণ বিনামূল্যে সংগ্রহ করুন।'
          )}
        </p>
      </div>

      {/* Academic Publication & Study Kits Partner Banner */}
      <AdSlot type="resources_banner" />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Search notes by keyword, chapter, or uploader...', 'নোট বা বিষয়ের নাম দিয়ে খুঁজুন...')}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#1E3A8A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none"
          >
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none"
          >
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Main Grid: Resources (8 cols) + Sidebar Ad (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Resource Items (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredResources.map((res, index) => {
              const isSaved = savedResourceIds.includes(res.id);
              const showAdAfter = index === 3;

              return (
                <React.Fragment key={res.id}>
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-md hover:border-[#1E3A8A]/40 relative">
                    <div>
                      {/* Top metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1E3A8A]">{res.subject}</span>
                          <span aria-hidden="true">·</span>
                          <span>{res.classLevel}</span>
                        </div>
                        <button
                          onClick={() => toggleSaveResource(res.id)}
                          className={`p-1 transition-colors ${isSaved ? 'text-[#F59E0B]' : 'text-slate-300 hover:text-slate-600'}`}
                          title="Save resource"
                        >
                          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-2">
                        {lang === 'bn' && res.titleBn ? res.titleBn : res.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {lang === 'bn' && res.descriptionBn ? res.descriptionBn : res.description}
                      </p>

                      <div className="text-[11px] text-slate-500 space-y-0.5 mb-4">
                        <p>{t('Uploaded by:', 'আপলোডার:')} <strong className="text-slate-800">{res.uploaderName}</strong></p>
                        <p>{res.fileType} · {res.size} · {res.downloadCount}+ {t('downloads', 'ডাউনলোড')}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setPreviewResource(res)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('Preview', 'প্রিভিউ')}</span>
                      </button>

                      <button
                        onClick={() => handleDownload(res)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t('Download Free', 'ফ্রি ডাউনলোড')}</span>
                      </button>
                    </div>
                  </div>

                  {showAdAfter && (
                    <AdSlot type="native_tutor" className="col-span-1 sm:col-span-2" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Sidebar Ad (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="text-sm font-bold text-slate-900">
                {t('Have Quality Notes to Share?', 'আপনার নোট শেয়ার করতে চান?')}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t(
                'Are you a tutor or top student? Upload your handwritten formulas and study guides to help thousands of learners nationwide.',
                'আপনার তৈরি করা গোছানো নোট আপলোড করে ছড়িয়ে দিন দেশের সকল শিক্ষার্থীদের মাঝে।'
              )}
            </p>
            <span className="inline-block text-[11px] font-bold text-[#1E3A8A] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {t('100% Free Knowledge Sharing', 'উন্মুক্ত জ্ঞানচর্চা')}
            </span>
          </div>

          <AdSlot type="sidebar" />
        </aside>

      </div>

      {/* Preview Reader Modal */}
      {previewResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          onClick={() => setPreviewResource(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 relative max-h-[90vh] flex flex-col justify-between overflow-hidden animate-in fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="pr-4">
                <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">
                  {previewResource.subject} · {previewResource.classLevel}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {previewResource.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('By', 'তৈরি করেছেন')} {previewResource.uploaderName}
                </p>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Reader Container */}
            <div className="py-6 overflow-y-auto space-y-4 my-2 text-xs text-slate-800 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="font-bold text-sm text-[#1E3A8A]">
                  {t('Summary & Table of Contents:', 'সারসংক্ষেপ ও সূচিপত্র:')}
                </p>
                <p className="text-slate-600">{previewResource.description}</p>
              </div>

              <div className="p-5 rounded-2xl border border-dashed border-slate-200 text-center space-y-3 py-10 bg-slate-50/70">
                <FileText className="w-12 h-12 text-[#1E3A8A] mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">
                  {t('Official PDF Document Ready for Download', 'অফিসিয়াল পিডিএফ ফাইল প্রস্তুত')}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {previewResource.size} · High resolution vector formulas and clean printable typography.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {previewResource.downloadCount}+ {t('students downloaded this', 'শিক্ষার্থী ডাউনলোড করেছে')}
              </span>
              <button
                onClick={() => {
                  handleDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#1E40AF] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#F59E0B]" />
                <span>{t('Download PDF Now', 'পিডিএফ ডাউনলোড করুন')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
