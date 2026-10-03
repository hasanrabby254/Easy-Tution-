import React from 'react';

// Static ESM imports so Vite bundler compiles and hashes them into dist/assets/...
// This guarantees they work anywhere (Vercel, Netlify, Cloud Run, GitHub Pages) without 404s.
import heroTuitionLearning from '../assets/images/hero_tuition_learning_1790937371162.jpg';
import studentReadingRedEggChair from '../assets/images/student_reading_red_egg_chair.png';
import seamlessStudent3dChar from '../assets/images/seamless_student_3d_char_1790939654116.jpg';
import studyGuideCover from '../assets/images/study_guide_cover_1790937413212.jpg';
import tutorNahinHasan from '../assets/images/tutor_nahin_hasan_1790964176251.jpg';
import tutorShaibalDas from '../assets/images/tutor_shaibal_das_1790964188845.jpg';
import tutorPortraitMale from '../assets/images/tutor_portrait_male_1790937400587.jpg';
import tutorPortraitFemale from '../assets/images/tutor_portrait_female_1790937385923.jpg';
import tutorPortraitMaleEng from '../assets/images/tutor_portrait_male_eng_1790962855032.jpg';
import tutorPortraitFemBiz from '../assets/images/tutor_portrait_fem_biz_1790962867480.jpg';
import tutorPortraitMaleSci from '../assets/images/tutor_portrait_male_sci_1790962890759.jpg';
import tutorPortraitFemMed from '../assets/images/tutor_portrait_fem_med_1790962877951.jpg';
import tutorPortraitMaleArts from '../assets/images/tutor_portrait_male_arts_1790962930691.jpg';
import tutorPortraitFemEng from '../assets/images/tutor_portrait_fem_eng_1790962918823.jpg';
import tutorPortraitMaleIut from '../assets/images/tutor_portrait_male_iut_1790962945907.jpg';
import tutorPortraitFemIr from '../assets/images/tutor_portrait_fem_ir_1790962957963.jpg';
import tutorPortraitMaleBau from '../assets/images/tutor_portrait_male_bau_1790962971472.jpg';
import tutorPortraitMaleBuet from '../assets/images/tutor_portrait_male_buet_1790962983229.jpg';

export const IMAGE_ASSETS = {
  heroTuitionLearning,
  studentReadingRedEggChair,
  seamlessStudent3dChar,
  studyGuideCover,
  tutorNahinHasan,
  tutorShaibalDas,
  tutorPortraitMale,
  tutorPortraitFemale,
  tutorPortraitMaleEng,
  tutorPortraitFemBiz,
  tutorPortraitMaleSci,
  tutorPortraitFemMed,
  tutorPortraitMaleArts,
  tutorPortraitFemEng,
  tutorPortraitMaleIut,
  tutorPortraitFemIr,
  tutorPortraitMaleBau,
  tutorPortraitMaleBuet,
};

const FILE_NAME_MAP: Record<string, string> = {
  'hero_tuition_learning_1790937371162.jpg': heroTuitionLearning,
  'student_reading_red_egg_chair.png': studentReadingRedEggChair,
  'seamless_student_3d_char_1790939654116.jpg': seamlessStudent3dChar,
  'study_guide_cover_1790937413212.jpg': studyGuideCover,
  'tutor_nahin_hasan_1790964176251.jpg': tutorNahinHasan,
  'tutor_shaibal_das_1790964188845.jpg': tutorShaibalDas,
  'tutor_portrait_male_1790937400587.jpg': tutorPortraitMale,
  'tutor_portrait_female_1790937385923.jpg': tutorPortraitFemale,
  'tutor_portrait_male_eng_1790962855032.jpg': tutorPortraitMaleEng,
  'tutor_portrait_fem_biz_1790962867480.jpg': tutorPortraitFemBiz,
  'tutor_portrait_male_sci_1790962890759.jpg': tutorPortraitMaleSci,
  'tutor_portrait_fem_med_1790962877951.jpg': tutorPortraitFemMed,
  'tutor_portrait_male_arts_1790962930691.jpg': tutorPortraitMaleArts,
  'tutor_portrait_fem_eng_1790962918823.jpg': tutorPortraitFemEng,
  'tutor_portrait_male_iut_1790962945907.jpg': tutorPortraitMaleIut,
  'tutor_portrait_fem_ir_1790962957963.jpg': tutorPortraitFemIr,
  'tutor_portrait_male_bau_1790962971472.jpg': tutorPortraitMaleBau,
  'tutor_portrait_male_buet_1790962983229.jpg': tutorPortraitMaleBuet,
};

/**
 * Resolves any image URL to the bundled Vite asset URL.
 * Automatically fixes legacy `/src/assets/images/...` paths stored in localStorage
 * or passed from server APIs, ensuring images never break in production.
 */
export function resolveImageUrl(url?: string, fallbackName: string = 'Tutor'): string {
  if (!url) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=1E3A8A&color=fff&size=256`;
  }

  // Extract file name from any path
  const rawFileName = url.split('/').pop()?.split('?')[0];
  if (rawFileName && FILE_NAME_MAP[rawFileName]) {
    return FILE_NAME_MAP[rawFileName];
  }

  // Check if starts with /src/assets/images/
  if (url.startsWith('/src/assets/images/')) {
    const fn = url.replace('/src/assets/images/', '');
    if (FILE_NAME_MAP[fn]) {
      return FILE_NAME_MAP[fn];
    }
    return `/images/${fn}`;
  }

  // Check if starts with /assets/images/
  if (url.startsWith('/assets/images/')) {
    const fn = url.replace('/assets/images/', '');
    if (FILE_NAME_MAP[fn]) {
      return FILE_NAME_MAP[fn];
    }
    return `/images/${fn}`;
  }

  // If already a valid absolute URL, data URL, or Vite hashed asset URL
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('/assets/')
  ) {
    return url;
  }

  return url;
}

/**
 * Catches any broken image load and falls back to:
 * 1. The /images/ public directory version
 * 2. High-quality UI-Avatars with initials
 */
export function handleImageFallback(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  name: string = 'User',
  originalUrl?: string
) {
  const target = e.currentTarget;
  if (!target.dataset.triedPublic && originalUrl) {
    target.dataset.triedPublic = 'true';
    const fileName = originalUrl.split('/').pop()?.split('?')[0];
    if (fileName) {
      target.src = `/images/${fileName}`;
      return;
    }
  }
  if (!target.dataset.triedAvatar) {
    target.dataset.triedAvatar = 'true';
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1E3A8A&color=fff&size=256`;
  }
}
