import { MockTest } from '../types';

export const EXTRA_MOCK_TESTS: MockTest[] = [
  // --- SSC (2 more to make 4: Physics, Math, Chemistry, Biology) ---
  {
    id: 'test-ssc-chemistry',
    title: 'SSC Chemistry: Matter & Periodic Classification',
    titleBn: 'এসএসসি রসায়ন: পদার্থের অবস্থা ও পর্যায় সারণি',
    subject: 'Chemistry',
    subjectBn: 'রসায়ন',
    category: 'SSC',
    durationMinutes: 10,
    difficulty: 'Medium',
    questionCount: 5,
    totalAttempts: 1850,
    questions: [
      {
        id: 'sscc1',
        text: 'What is the atomic number of Sodium (Na)?',
        textBn: 'সোডিয়াম (Na) এর পারমাণবিক সংখ্যা কত?',
        options: ['10', '11', '12', '13'],
        optionsBn: ['১০', '১১', '১২', '১৩'],
        correctIndex: 1,
        explanation: 'Sodium has 11 protons, hence atomic number is 11.',
        explanationBn: 'সোডিয়ামের নিউক্লিয়াসে ১১টি প্রোটন থাকে, তাই পারমাণবিক সংখ্যা ১১।'
      },
      {
        id: 'sscc2',
        text: 'What type of chemical bond is present in Calcium Oxide (CaO)?',
        textBn: 'ক্যালসিয়াম অক্সাইড (CaO) অণুতে কোন ধরনের বন্ধন বিদ্যমান?',
        options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen bond'],
        optionsBn: ['সমযোজী', 'আয়নিক', 'ধাতব', 'হাইড্রোজেন বন্ধন'],
        correctIndex: 1,
        explanation: 'Ca transfers 2 electrons to O, forming an ionic bond.',
        explanationBn: 'ধাতু (Ca) ও অধাতুর (O) মধ্যে ইলেকট্রন আদান-প্রদানের মাধ্যমে আয়নিক বন্ধন গঠিত হয়।'
      },
      {
        id: 'sscc3',
        text: 'Which gas turns lime water milky?',
        textBn: 'কোন গ্যাস চুনের পানিকে ঘোলা করে?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        optionsBn: ['অক্সিজেন', 'কার্বন ডাই-অক্সাইড', 'নাইট্রোজেন', 'হাইড্রোজেন'],
        correctIndex: 1,
        explanation: 'CO2 reacts with Ca(OH)2 to form white insoluble CaCO3.',
        explanationBn: 'CO2 চুনের পানির সাথে বিক্রিয়া করে অদ্রবণীয় ক্যালসিয়াম কার্বনেট তৈরি করে।'
      },
      {
        id: 'sscc4',
        text: 'What is the chemical formula of rust?',
        textBn: 'মরিচার সঠিক রাসায়নিক সংকেত কোনটি?',
        options: ['Fe2O3', 'Fe3O4', 'Fe2O3·nH2O', 'FeO'],
        optionsBn: ['Fe2O3', 'Fe3O4', 'Fe2O3·nH2O', 'FeO'],
        correctIndex: 2,
        explanation: 'Rust is hydrated ferric oxide: Fe2O3·nH2O.',
        explanationBn: 'মরিচা হলো আর্দ্র ফেরিক অক্সাইড (Fe2O3·nH2O)।'
      },
      {
        id: 'sscc5',
        text: 'Which group elements are called Halogens in the periodic table?',
        textBn: 'পর্যায় সারণির কোন গ্রুপের মৌলগুলোকে হ্যালোজেন বলা হয়?',
        options: ['Group 1', 'Group 2', 'Group 17', 'Group 18'],
        optionsBn: ['গ্রুপ ১', 'গ্রুপ ২', 'গ্রুপ ১৭', 'গ্রুপ ১৮'],
        correctIndex: 2,
        explanation: 'Group 17 elements (F, Cl, Br, I, At) are halogens (salt producers).',
        explanationBn: 'পর্যায় সারণির গ্রুপ ১৭ মৌলগুলোকে হ্যালোজেন বা লবণ উৎপাদনকারী বলা হয়।'
      }
    ]
  },
  {
    id: 'test-ssc-biology',
    title: 'SSC Biology: Cells, Tissues & Human Respiration',
    titleBn: 'এসএসসি জীববিজ্ঞান: কোষ, কলা ও শ্বসনতন্ত্র',
    subject: 'Biology',
    subjectBn: 'জীববিজ্ঞান',
    category: 'SSC',
    durationMinutes: 10,
    difficulty: 'Easy',
    questionCount: 5,
    totalAttempts: 1640,
    questions: [
      {
        id: 'sscb1',
        text: 'Which organelle is called the kitchen of plant cells?',
        textBn: 'উদ্ভিদকোষের রান্নাঘর বলা হয় কোন অঙ্গাণুকে?',
        options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Vacuole'],
        optionsBn: ['মাইটোকন্ড্রিয়া', 'ক্লোরোপ্লাস্ট', 'রাইবোসোম', 'কোষ গহ্বর'],
        correctIndex: 1,
        explanation: 'Chloroplasts carry out photosynthesis to produce glucose.',
        explanationBn: 'ক্লোরোপ্লাস্টে সালোকসংশ্লেষণ প্রক্রিয়ায় খাদ্য তৈরি হয়।'
      },
      {
        id: 'sscb2',
        text: 'How many chambers are there in the human heart?',
        textBn: 'মানুষের হৃদপিণ্ডে কয়টি প্রকোষ্ঠ থাকে?',
        options: ['2', '3', '4', '5'],
        optionsBn: ['২টি', '৩টি', '৪টি', '৫টি'],
        correctIndex: 2,
        explanation: 'Human heart has 4 chambers: 2 atria and 2 ventricles.',
        explanationBn: 'মানুষের হৃদপিণ্ড ৪টি প্রকোষ্ঠ নিয়ে গঠিত (২টি অলিন্দ ও ২টি নিলয়)।'
      },
      {
        id: 'sscb3',
        text: 'What is the main structural component of plant cell walls?',
        textBn: 'উদ্ভিদের কোষপ্রাচীরের প্রধান উপাদান কোনটি?',
        options: ['Cellulose', 'Chitin', 'Keratin', 'Glycogen'],
        optionsBn: ['সেলুলোজ', 'কাইটিন', 'কেরাটিন', 'গ্লাইকোজেন'],
        correctIndex: 0,
        explanation: 'Cellulose makes up the primary structural layer of plant cell walls.',
        explanationBn: 'উদ্ভিদকোষ প্রাচীরের প্রধান গাঠনিক উপাদান সেলুলোজ।'
      },
      {
        id: 'sscb4',
        text: 'Which blood cell helps in blood clotting during injuries?',
        textBn: 'রক্ত তঞ্চন বা জমাট বাঁধতে সাহায্য করে কোন রক্তকণিকা?',
        options: ['RBC', 'WBC', 'Platelets (Thrombocytes)', 'Plasma'],
        optionsBn: ['লোহিত রক্তকণিকা', 'শ্বেত রক্তকণিকা', 'অণুচক্রিকা', 'রক্তরস'],
        correctIndex: 2,
        explanation: 'Platelets release thromboplastin to clot bleeding wounds.',
        explanationBn: 'অণুচক্রিকা বা প্লাটিলেট ক্ষতস্থানে রক্ত জমাট বাঁধতে মূল ভূমিকা পালন করে।'
      },
      {
        id: 'sscb5',
        text: 'Which vitamin is synthesized in human skin by sunlight?',
        textBn: 'সূর্যের আলো থেকে মানুষের ত্বকে কোন ভিটামিন তৈরি হয়?',
        options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
        optionsBn: ['ভিটামিন এ', 'ভিটামিন সি', 'ভিটামিন ডি', 'ভিটামিন কে'],
        correctIndex: 2,
        explanation: 'Sunlight converts cholesterol in skin into Vitamin D.',
        explanationBn: 'সূর্যের অতিবেগুনি রশ্মির উপস্থিতিতে ত্বকে ভিটামিন ডি সংশ্লেষিত হয়।'
      }
    ]
  },

  // --- HSC (2 more to make 4: Physics, Math, Chemistry, Biology) ---
  {
    id: 'test-hsc-physics',
    title: 'HSC Physics: Vectors, Dynamics & Work-Energy',
    titleBn: 'এইচএসসি পদার্থবিজ্ঞান: ভেক্টর, নিউটোনিয়ান বলবিদ্যা ও কাজ-শক্তি',
    subject: 'Physics',
    subjectBn: 'পদার্থবিজ্ঞান',
    category: 'HSC',
    durationMinutes: 12,
    difficulty: 'Hard',
    questionCount: 5,
    totalAttempts: 2310,
    questions: [
      {
        id: 'hscp1',
        text: 'What is the angle between two vectors A and B if A · B = |A × B|?',
        textBn: 'যদি A · B = |A × B| হয়, তবে ভেক্টরদ্বয়ের মধ্যবর্তী কোণ কত?',
        options: ['0°', '45°', '90°', '180°'],
        optionsBn: ['০°', '৪৫°', '৯০°', '১৮০°'],
        correctIndex: 1,
        explanation: 'AB cosθ = AB sinθ => tanθ = 1 => θ = 45°.',
        explanationBn: 'cosθ = sinθ হলে tanθ = ১, সুতরাং θ = ৪৫°।'
      },
      {
        id: 'hscp2',
        text: 'What is the escape velocity from the surface of Earth?',
        textBn: 'পৃথিবীর পৃষ্ঠ হতে মুক্তিবেগের মান কত?',
        options: ['9.8 km/s', '11.2 km/s', '12.5 km/s', '7.9 km/s'],
        optionsBn: ['৯.৮ কিমি/সেকেন্ড', '১১.২ কিমি/সেকেন্ড', '১২.৫ কিমি/সেকেন্ড', '৭.৯ কিমি/সেকেন্ড'],
        correctIndex: 1,
        explanation: 'Escape velocity v_e = √(2gR) ≈ 11.2 km/s.',
        explanationBn: 'মুক্তিবেগ v_e = √(2gR) যার মান প্রায় ১১.২ কিমি/সেকেন্ড।'
      },
      {
        id: 'hscp3',
        text: 'What happens to the time period of a simple pendulum when its length is quadrupled?',
        textBn: 'একটি সরল দোলকের কার্যকর দৈর্ঘ্য ৪ গুণ বৃদ্ধি করলে এর দোলনকাল কত গুণ হবে?',
        options: ['Doubled (2 times)', '4 times', 'Halved', 'Unchanged'],
        optionsBn: ['দ্বিগুণ হবে', '৪ গুণ হবে', 'অর্ধেক হবে', 'অপরিবর্তিত থাকবে'],
        correctIndex: 0,
        explanation: 'T = 2π√(L/g). If L becomes 4L, T becomes √4 = 2 times.',
        explanationBn: 'T সমানুপাতিক √L। দৈর্ঘ্য ৪ গুণ করলে দোলনকাল ২ গুণ হবে।'
      },
      {
        id: 'hscp4',
        text: 'What is the efficiency of a Carnot engine operating between 500 K and 300 K?',
        textBn: '৫০০ K ও ৩০০ K তাপমাত্রার মধ্যে চালিত কার্নো ইঞ্জিনের কর্মদক্ষতা কত?',
        options: ['20%', '40%', '60%', '80%'],
        optionsBn: ['২০%', '৪০%', '৬০%', '৮০%'],
        correctIndex: 1,
        explanation: 'η = 1 - (T2/T1) = 1 - (300/500) = 0.40 = 40%.',
        explanationBn: 'η = ১ - (৩০০ / ৫০০) = ০.৪০ = ৪০%।'
      },
      {
        id: 'hscp5',
        text: 'What is the work done by centripetal force on an object in uniform circular motion?',
        textBn: 'সুষম বৃত্তাকার গতিতে ঘূর্ণায়মান বস্তুর ওপর কেন্দ্রমুখী বল দ্বারা কৃতকাজ কত?',
        options: ['Positive', 'Negative', 'Zero', 'Infinite'],
        optionsBn: ['ধনাত্মক', 'ঋণাত্মক', 'শূন্য', 'অসীম'],
        correctIndex: 2,
        explanation: 'Force is perpendicular to displacement (cos 90° = 0), so work = 0.',
        explanationBn: 'বল ও সরণের মধ্যবর্তী কোণ ৯০° হওয়ায় কাজ W = Fs cos 90° = ০।'
      }
    ]
  },
  {
    id: 'test-hsc-higher-math',
    title: 'HSC Higher Math: Calculus & Trigonometry',
    titleBn: 'এইচএসসি উচ্চতর গণিত: ক্যালকুলাস ও ত্রিকোণমিতি',
    subject: 'Higher Math',
    subjectBn: 'উচ্চতর গণিত',
    category: 'HSC',
    durationMinutes: 12,
    difficulty: 'Hard',
    questionCount: 5,
    totalAttempts: 1980,
    questions: [
      {
        id: 'hscm1',
        text: 'What is the derivative of e^(2x) with respect to x?',
        textBn: 'x এর সাপেক্ষে e^(2x) এর ব্যবকলন (derivative) কোনটি?',
        options: ['e^(2x)', '2 e^(2x)', '1/2 e^(2x)', '2x e^(2x)'],
        optionsBn: ['e^(2x)', '২ e^(2x)', '১/২ e^(2x)', '২x e^(2x)'],
        correctIndex: 1,
        explanation: 'd/dx [e^(2x)] = 2 e^(2x).',
        explanationBn: 'চেইন রুল অনুসারে d/dx [e^(2x)] = ২ e^(2x)।'
      },
      {
        id: 'hscm2',
        text: 'What is the value of ∫ (1/x) dx?',
        textBn: 'সমাকলন ∫ (১/x) dx এর মান কত?',
        options: ['x', 'ln|x| + c', '-1/x² + c', 'e^x + c'],
        optionsBn: ['x', 'ln|x| + c', '-১/x² + c', 'e^x + c'],
        correctIndex: 1,
        explanation: 'The integral of 1/x is ln|x| + c.',
        explanationBn: '১/x এর অনির্দিষ্ট সমাকলন ln|x| + c।'
      },
      {
        id: 'hscm3',
        text: 'What is the determinant of a 2x2 matrix with rows [3, 2] and [1, 4]?',
        textBn: '[৩, ২] এবং [১, ৪] সারিবিশিষ্ট ২x২ ম্যাট্রিক্সের নির্ণায়কের মান কত?',
        options: ['10', '12', '14', '8'],
        optionsBn: ['১০', '১২', '১৪', '৮'],
        correctIndex: 0,
        explanation: 'det = (3 × 4) - (2 × 1) = 12 - 2 = 10.',
        explanationBn: 'নির্ণায়ক = (৩ × ৪) - (২ × ১) = ১২ - ২ = ১০।'
      },
      {
        id: 'hscm4',
        text: 'What is the value of sin(90° + θ)?',
        textBn: 'sin(৯০° + θ) এর মান নিচের কোনটি?',
        options: ['sin θ', '-sin θ', 'cos θ', '-cos θ'],
        optionsBn: ['sin θ', '-sin θ', 'cos θ', '-cos θ'],
        correctIndex: 2,
        explanation: 'In 2nd quadrant, sine is positive and odd multiple of 90 changes sin to cos: cos θ.',
        explanationBn: '২য় চতুর্ভাগে সাইন ধনাত্মক এবং বিজোড় গুণিতক হওয়ায় sin পরিবর্তিত হয়ে cos θ হয়।'
      },
      {
        id: 'hscm5',
        text: 'What is the eccentricity (e) of a parabola?',
        textBn: 'পরাবৃত্ত বা Parabola এর উৎকেন্দ্রিকতা (e) এর মান কত?',
        options: ['e = 0', 'e = 1', 'e < 1', 'e > 1'],
        optionsBn: ['e = ০', 'e = ১', 'e < ১', 'e > ১'],
        correctIndex: 1,
        explanation: 'For a parabola, eccentricity e = 1.',
        explanationBn: 'পরাবৃত্তের ক্ষেত্রে উৎকেন্দ্রিকতা সর্বদা e = ১।'
      }
    ]
  },

  // --- Admission (3 more to make 4: BUET Math/Physics, Medical Biology, English, IBA Analytical) ---
  {
    id: 'test-admission-engineering-physics-math',
    title: 'Engineering Admission: BUET Advanced Physics & Math',
    titleBn: 'বুয়েট ও ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি: পদার্থবিজ্ঞান ও উচ্চতর গণিত',
    subject: 'Physics & Math',
    subjectBn: 'পদার্থ ও গণিত',
    category: 'Admission',
    durationMinutes: 15,
    difficulty: 'Hard',
    questionCount: 5,
    totalAttempts: 3450,
    questions: [
      {
        id: 'admeng1',
        text: 'At what angle of projection is the horizontal range of a projectile maximum?',
        textBn: 'প্রাসের ক্ষেত্রে নিক্ষেপণ কোণ কত হলে অনুভূমিক পাল্লা সর্বাধিক হয়?',
        options: ['30°', '45°', '60°', '90°'],
        optionsBn: ['৩০°', '৪৫°', '৬০°', '৯০°'],
        correctIndex: 1,
        explanation: 'Range R = (u² sin 2θ)/g. Maximum when sin 2θ = 1 => 2θ = 90° => θ = 45°.',
        explanationBn: 'sin 2θ = ১ হলে পাল্লা সর্বোচ্চ হয়, সুতরাং θ = ৪৫°।'
      },
      {
        id: 'admeng2',
        text: 'What is the limit of (sin x) / x as x approaches 0?',
        textBn: 'x → ০ হলে lim (sin x) / x এর মান কত?',
        options: ['0', '1', '∞', 'Undefined'],
        optionsBn: ['০', '১', '∞', 'অসংজ্ঞায়িত'],
        correctIndex: 1,
        explanation: 'Standard limit theorem: lim_{x->0} (sin x / x) = 1.',
        explanationBn: 'মৌলিক ক্যালকুলাস উপপাদ্য অনুসারে মানটি ১।'
      },
      {
        id: 'admeng3',
        text: 'What is the equivalent resistance of three 6 Ω resistors connected in parallel?',
        textBn: 'তিনটি ৬ ওহম রোধ সমান্তরালে যুক্ত থাকলে তুল্যরোধ কত হবে?',
        options: ['18 Ω', '2 Ω', '3 Ω', '1 Ω'],
        optionsBn: ['১৮ Ω', '২ Ω', '৩ Ω', '১ Ω'],
        correctIndex: 1,
        explanation: '1/R = 1/6 + 1/6 + 1/6 = 3/6 = 1/2 => R = 2 Ω.',
        explanationBn: '১/R = ৩/৬ = ১/২, সুতরাং তুল্যরোধ = ২ ওহম।'
      },
      {
        id: 'admeng4',
        text: 'Which law relates magnetic field along a closed loop to electric current?',
        textBn: 'বদ্ধ লুপে চৌম্বকক্ষেত্র ও তড়িৎপ্রবাহের সম্পর্ক স্থাপন করে কোন সূত্র?',
        options: ['Faraday’s Law', 'Ampere’s Law', 'Coulomb’s Law', 'Gauss’s Law'],
        optionsBn: ['ফ্যারাডের সূত্র', 'অ্যাম্পিয়ারের সূত্র', 'কুলম্বের সূত্র', 'গাউসের সূত্র'],
        correctIndex: 1,
        explanation: 'Ampere’s Circuital Law: ∮ B · dl = μ₀ I_enc.',
        explanationBn: 'অ্যাম্পিয়ারের সূত্র চুম্বক ক্ষেত্র ও বিদ্যুৎ প্রবাহের মধ্যে সম্পর্ক দেয়।'
      },
      {
        id: 'admeng5',
        text: 'What is the dimension of Planck’s constant (h)?',
        textBn: 'প্লাঙ্কের ধ্রুবক (h) এর মাত্রা সমীকরণ কোনটি?',
        options: ['[M L² T⁻¹]', '[M L T⁻¹]', '[M L² T⁻²]', '[M L⁻¹ T⁻²]'],
        optionsBn: ['[M L² T⁻¹]', '[M L T⁻¹]', '[M L² T⁻²]', '[M L⁻¹ T⁻²]'],
        correctIndex: 0,
        explanation: 'E = hν => h = E/ν = [M L² T⁻²] / [T⁻¹] = [M L² T⁻¹].',
        explanationBn: 'শক্তি E = hν থেকে h এর মাত্রা [M L² T⁻¹]।'
      }
    ]
  },
  {
    id: 'test-admission-medical-biology',
    title: 'Medical Admission: High-Yield Biology & Medical Chemistry',
    titleBn: 'মেডিকেল ভর্তি প্রস্তুতি: প্রাণিবিজ্ঞান ও জৈব রসায়ন',
    subject: 'Biology & Chemistry',
    subjectBn: 'জীববিজ্ঞান ও রসায়ন',
    category: 'Admission',
    durationMinutes: 12,
    difficulty: 'Hard',
    questionCount: 5,
    totalAttempts: 2980,
    questions: [
      {
        id: 'admmed1',
        text: 'Which cranial nerve in humans controls vision?',
        textBn: 'মানুষের কোন করোটিক স্নায়ু দৃষ্টির অনুভূতি বহন করে?',
        options: ['Olfactory (I)', 'Optic (II)', 'Oculomotor (III)', 'Vagus (X)'],
        optionsBn: ['অলফ্যাক্টরি (I)', 'অপটিক (II)', 'অকুলোমোটর (III)', 'ভেগাস (X)'],
        correctIndex: 1,
        explanation: 'The Optic nerve (Cranial Nerve II) transmits visual info from retina to brain.',
        explanationBn: '২য় করোটিক স্নায়ু (অপটিক) রেটিনা থেকে মস্তিষ্কে দৃষ্টি অনুভূতি বহন করে।'
      },
      {
        id: 'admmed2',
        text: 'Which functional group is present in aldehydes?',
        textBn: 'অ্যালডিহাইডের কার্যকরী মূলক কোনটি?',
        options: ['-OH', '-CHO', '-COOH', '-CO-'],
        optionsBn: ['-OH', '-CHO', '-COOH', '-CO-'],
        correctIndex: 1,
        explanation: 'Aldehydes possess the terminal carbonyl -CHO group.',
        explanationBn: 'অ্যালডিহাইডের সাধারণ কার্যকরী মূলক হলো -CHO।'
      },
      {
        id: 'admmed3',
        text: 'What is the total number of bones in an adult human skeleton?',
        textBn: 'একজন প্রাপ্তবয়স্ক মানুষের কঙ্কালে মোট কয়টি অস্থি থাকে?',
        options: ['198', '206', '212', '224'],
        optionsBn: ['১৯৮টি', '২০৬টি', '২১২টি', '২২৪টি'],
        correctIndex: 1,
        explanation: 'An adult human skeleton consists of 206 distinct bones.',
        explanationBn: 'মানবদেহে মোট ২০৬টি অস্থি বিদ্যমান।'
      },
      {
        id: 'admmed4',
        text: 'Which hormone regulates blood calcium levels by lowering it?',
        textBn: 'রক্তে ক্যালসিয়ামের মাত্রা হ্রাস করতে সাহায্য করে কোন হরমোন?',
        options: ['Parathyroid hormone', 'Calcitonin', 'Thyroxine', 'Insulin'],
        optionsBn: ['প্যারাথাইরয়েড হরমোন', 'ক্যালসিটোনিন', 'থাইরক্সিন', 'ইনসুলিন'],
        correctIndex: 1,
        explanation: 'Calcitonin, secreted by thyroid C cells, lowers blood calcium levels.',
        explanationBn: 'থাইরয়েড গ্রন্থি নিঃসৃত ক্যালসিটোনিন রক্তে অতিরিক্ত ক্যালসিয়াম কমায়।'
      },
      {
        id: 'admmed5',
        text: 'What is the IUPAC name of acetone?',
        textBn: 'অ্যাসিটোন (CH3COCH3) এর ইউপ্যাক (IUPAC) নাম কী?',
        options: ['Propanal', 'Propan-2-one', 'Ethanone', 'Butanone'],
        optionsBn: ['প্রোপান্যাল', 'প্রোপান-২-ওন', 'ইথানোন', 'বিউটানোন'],
        correctIndex: 1,
        explanation: 'Acetone has a 3-carbon chain with a ketone at position 2: Propan-2-one.',
        explanationBn: '৩-কার্বনের কিটোন মূলকবিশিষ্ট যৌগের ইউপ্যাক নাম প্রোপান-২-ওন।'
      }
    ]
  },
  {
    id: 'test-admission-iba-math-analytical',
    title: 'DU IBA & BBA Admission: Analytical Math & Reasoning',
    titleBn: 'ঢাবি আইবিএ ও ব্যবসায় শিক্ষা ভর্তি: অ্যানালিটিক্যাল ও বেসিক ম্যাথ',
    subject: 'Analytical & Math',
    subjectBn: 'গণিত ও অ্যানালিটিক্যাল',
    category: 'Admission',
    durationMinutes: 12,
    difficulty: 'Hard',
    questionCount: 5,
    totalAttempts: 2710,
    questions: [
      {
        id: 'admiba1',
        text: 'A shirt originally priced at ৳1,000 is sold at a 20% discount. What is the selling price?',
        textBn: '১,০০০ টাকা মূল্যের একটি শার্ট ২০% ছাড়ে বিক্রি করলে বিক্রয়মূল্য কত হবে?',
        options: ['৳750', '৳800', '৳850', '৳900'],
        optionsBn: ['৳ ৭৫০', '৳ ৮০০', '৳ ৮৫০', '৳ ৯০০'],
        correctIndex: 1,
        explanation: 'Discount = 20% of 1000 = 200. Selling price = 1000 - 200 = 800.',
        explanationBn: 'ছাড় = ১০০০ এর ২০% = ২০০ টাকা। বিক্রয়মূল্য = ৮০০ টাকা।'
      },
      {
        id: 'admiba2',
        text: 'If 6 workers can build a wall in 10 days, how many days will 15 workers take?',
        textBn: '৬ জন শ্রমিক একটি দেয়াল ১০ দিনে তৈরি করতে পারলে, ১৫ জন শ্রমিকের কত দিন লাগবে?',
        options: ['4 days', '5 days', '6 days', '3 days'],
        optionsBn: ['৪ দিন', '৫ দিন', '৬ দিন', '৩ দিন'],
        correctIndex: 0,
        explanation: 'Work = 6 × 10 = 60 person-days. Time = 60 / 15 = 4 days.',
        explanationBn: 'মোট কাজ = ৬০ জন-দিন। ১৫ জনের লাগবে = ৬০ / ১৫ = ৪ দিন।'
      },
      {
        id: 'admiba3',
        text: 'What is the next number in the series: 2, 6, 12, 20, 30, ___?',
        textBn: 'ধারার পরবর্তী সংখ্যাটি কত: ২, ৬, ১২, ২০, ৩০, ___?',
        options: ['40', '42', '44', '46'],
        optionsBn: ['৪০', '৪২', '৪৪', '৪৬'],
        correctIndex: 1,
        explanation: 'Differences are +4, +6, +8, +10, +12. 30 + 12 = 42.',
        explanationBn: 'ব্যবধানগুলো ৪, ৬, ৮, ১০, ১২ করে বাড়ছে। ৩০ + ১২ = ৪২।'
      },
      {
        id: 'admiba4',
        text: 'A train 120m long passes a pole in 6 seconds. What is its speed in km/h?',
        textBn: '১২০ মিটার দীর্ঘ একটি ট্রেন ৬ সেকেন্ডে একটি খুঁটি অতিক্রম করলে ট্রেনের গতিবেগ ঘণ্টায় কত কিমি?',
        options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'],
        optionsBn: ['৬০ কিমি/ঘণ্টা', '৭২ কিমি/ঘণ্টা', '৮০ কিমি/ঘণ্টা', '৯০ কিমি/ঘণ্টা'],
        correctIndex: 1,
        explanation: 'Speed = 120/6 = 20 m/s. In km/h: 20 × (18/5) = 72 km/h.',
        explanationBn: 'গতিবেগ = ১২০/৬ = ২০ মি/সে = ২০ × (১৮/৫) = ৭২ কিমি/ঘণ্টা।'
      },
      {
        id: 'admiba5',
        text: 'If A is taller than B, and B is taller than C, which statement is definitely true?',
        textBn: 'যদি A, B এর চেয়ে লম্বা এবং B, C এর চেয়ে লম্বা হয়, তবে কোনটি অবশ্যই সত্য?',
        options: ['A is shorter than C', 'A is taller than C', 'C is taller than A', 'A and C are equal'],
        optionsBn: ['A, C এর চেয়ে খাটো', 'A, C এর চেয়ে লম্বা', 'C, A এর চেয়ে লম্বা', 'A ও C সমান'],
        correctIndex: 1,
        explanation: 'Transitive inequality: A > B > C => A > C.',
        explanationBn: 'A > B এবং B > C হলে নিশ্চিতভাবে A > C (A, C এর চেয়ে লম্বা)।'
      }
    ]
  },

  // --- General Knowledge (3 more to make 4: Bangladesh/World, History/Const, Science/IT, Literature) ---
  {
    id: 'test-gk-bangladesh-affairs',
    title: 'GK: Bangladesh History, Constitution & Governance',
    titleBn: 'সাধারণ জ্ঞান: বাংলাদেশের ইতিহাস, মুক্তিযুদ্ধ ও সংবিধান',
    subject: 'General Knowledge',
    subjectBn: 'সাধারণ জ্ঞান',
    category: 'General Knowledge',
    durationMinutes: 10,
    difficulty: 'Easy',
    questionCount: 5,
    totalAttempts: 3820,
    questions: [
      {
        id: 'gkb1',
        text: 'When was the historic Six-Point program declared by Bangabandhu?',
        textBn: 'ঐতিহাসিক ৬ দফা কর্মসূচি কবে ঘোষণা করা হয়?',
        options: ['1966', '1969', '1970', '1971'],
        optionsBn: ['১৯৬৬', '১৯৬৯', '১৯৭০', '১৯৭১'],
        correctIndex: 0,
        explanation: 'The 6-point movement was formally launched in Lahore in February 1966.',
        explanationBn: '১৯৬৬ সালের ফেব্রুয়ারিতে লাহোরে ঐতিহাসিক ৬ দফা কর্মসূচি ঘোষণা করা হয়।'
      },
      {
        id: 'gkb2',
        text: 'How many articles are there in the Constitution of Bangladesh?',
        textBn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধানে কয়টি অনুচ্ছেদ রয়েছে?',
        options: ['133', '142', '153', '165'],
        optionsBn: ['১৩৩টি', '১৪২টি', '১৫৩টি', '১৬৫টি'],
        correctIndex: 2,
        explanation: 'The Constitution contains 153 articles arranged in 11 parts.',
        explanationBn: 'বাংলাদেশের সংবিধানে ১১টি ভাগে মোট ১৫৩টি অনুচ্ছেদ রয়েছে।'
      },
      {
        id: 'gkb3',
        text: 'Which sector of the 1971 Liberation War was commanded without a regular Sector Commander?',
        textBn: '১৯৭১ সালের মুক্তিযুদ্ধে কোন সেক্টরটি নিয়মিত কমান্ডারহীন ছিল?',
        options: ['Sector 8', 'Sector 10', 'Sector 11', 'Sector 4'],
        optionsBn: ['সেক্টর ৮', 'সেক্টর ১০', 'সেক্টর ১১', 'সেক্টর ৪'],
        correctIndex: 1,
        explanation: 'Sector 10 (naval commandos) operated directly under the C-in-C without a fixed sector commander.',
        explanationBn: '১০ নম্বর নৌ-সেক্টরে কোনো নিয়মিত সেক্টর কমান্ডার ছিল না।'
      },
      {
        id: 'gkb4',
        text: 'Where is the National Memorial of Bangladesh (Jatiya Smriti Soudho) located?',
        textBn: 'বাংলাদেশের জাতীয় স্মৃতিসৌধ কোথায় অবস্থিত?',
        options: ['Mirpur', 'Savar', 'Suhrawardy Udyan', 'Mujibnagar'],
        optionsBn: ['মিরপুর', 'সাভার', 'সোহরাওয়ার্দী উদ্যান', 'মুজিবনগর'],
        correctIndex: 1,
        explanation: 'The National Martyrs’ Memorial is located in Savar, Dhaka.',
        explanationBn: 'জাতীয় স্মৃতিসৌধ সাভারে অবস্থিত, এর স্থপতি সৈয়দ মাইনুল হোসেন।'
      },
      {
        id: 'gkb5',
        text: 'Which is the largest archaeological site in Bangladesh?',
        textBn: 'বাংলাদেশের সবচেয়ে প্রাচীন প্রত্নতাত্ত্বিক নিদর্শন কোনটি?',
        options: ['Mainamati', 'Mahasthangarh', 'Paharpur', 'Kantajew Temple'],
        optionsBn: ['ময়নামতি', 'মহাস্থানগড়', 'পাহাড়পুর', 'কান্তজীউ মন্দির'],
        correctIndex: 1,
        explanation: 'Mahasthangarh in Bogura is the earliest urban archaeological site.',
        explanationBn: 'বগুড়ার মহাস্থানগড় প্রাচীন পুণ্ড্রনগরের ধ্বংসাবশেষ।'
      }
    ]
  },
  {
    id: 'test-gk-science-technology',
    title: 'GK: Everyday Science, Space & Information Technology',
    titleBn: 'সাধারণ জ্ঞান: দৈনন্দিন বিজ্ঞান, মহাকাশ ও তথ্যপ্রযুক্তি',
    subject: 'General Knowledge',
    subjectBn: 'সাধারণ জ্ঞান',
    category: 'General Knowledge',
    durationMinutes: 10,
    difficulty: 'Easy',
    questionCount: 5,
    totalAttempts: 2950,
    questions: [
      {
        id: 'gks1',
        text: 'What does "AI" stand for in modern technology?',
        textBn: 'প্রযুক্তির ক্ষেত্রে "AI" এর পূর্ণরূপ কী?',
        options: ['Automated Internet', 'Artificial Intelligence', 'Advanced Informatics', 'Algorithm Integration'],
        optionsBn: ['Automated Internet', 'Artificial Intelligence', 'Advanced Informatics', 'Algorithm Integration'],
        correctIndex: 1,
        explanation: 'AI stands for Artificial Intelligence.',
        explanationBn: 'AI অর্থ Artificial Intelligence বা কৃত্রিম বুদ্ধিমত্তা।'
      },
      {
        id: 'gks2',
        text: 'Which planet is known as the "Red Planet"?',
        textBn: 'সৌরজগতের কোন গ্রহকে "লাল গ্রহ" বলা হয়?',
        options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
        optionsBn: ['শুক্র', 'মঙ্গল', 'বৃহস্পতি', 'বুধ'],
        correctIndex: 1,
        explanation: 'Mars is called the Red Planet because iron oxide on its surface gives it a reddish hue.',
        explanationBn: 'মঙ্গলের পৃষ্ঠে আয়রন অক্সাইডের আধিক্যের কারণে একে লাল গ্রহ বলা হয়।'
      },
      {
        id: 'gks3',
        text: 'Who is known as the father of the World Wide Web (WWW)?',
        textBn: 'ওয়ার্ল্ড ওয়াইড ওয়েব (WWW) এর জনক কে?',
        options: ['Bill Gates', 'Tim Berners-Lee', 'Steve Jobs', 'Alan Turing'],
        optionsBn: ['বিল গেটস', 'টিম বার্নার্স-লি', 'স্টিভ জবস', 'অ্যালান টুরিং'],
        correctIndex: 1,
        explanation: 'Tim Berners-Lee invented the World Wide Web in 1989.',
        explanationBn: 'টিম বার্নার্স-লি ১৯৮৯ সালে WWW উদ্ভাবন করেন।'
      },
      {
        id: 'gks4',
        text: 'What is the speed of light in vacuum?',
        textBn: 'শূন্যস্থানে আলোর বেগ কত?',
        options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '1.5 × 10⁸ m/s', '3 × 10¹⁰ m/s'],
        optionsBn: ['৩ × ১০⁸ মি/সে', '৩ × ১০⁶ মি/সে', '১.৫ × ১০⁸ মি/সে', '৩ × ১০¹⁰ মি/সে'],
        correctIndex: 0,
        explanation: 'Speed of light c ≈ 3 × 10^8 m/s (300,000 km/s).',
        explanationBn: 'আলোর বেগ প্রায় ৩ × ১০^৮ মিটার/সেকেন্ড বা ৩ লাখ কিমি/সেকেন্ড।'
      },
      {
        id: 'gks5',
        text: 'Which country launched the world’s first artificial satellite, Sputnik 1?',
        textBn: 'বিশ্বের প্রথম কৃত্রিম উপগ্রহ "স্পুটনিক-১" কোন দেশ মহাকাশে পাঠায়?',
        options: ['USA', 'Soviet Union (USSR)', 'China', 'Germany'],
        optionsBn: ['যুক্তরাষ্ট্র', 'সোভিয়েত ইউনিয়ন (রাশিয়া)', 'চীন', 'জার্মানি'],
        correctIndex: 1,
        explanation: 'The Soviet Union launched Sputnik 1 in October 1957.',
        explanationBn: 'সোভিয়েত ইউনিয়ন ১৯৫৭ সালের ৪ অক্টোবর স্পুটনিক-১ উৎক্ষেপণ করে।'
      }
    ]
  },
  {
    id: 'test-gk-bangla-literature',
    title: 'GK: Bangla Classical Literature & Famous Authors',
    titleBn: 'সাধারণ জ্ঞান: বাংলা সাহিত্য, প্রাচীন যুগ ও বিখ্যাত গ্রন্থাবলি',
    subject: 'General Knowledge',
    subjectBn: 'সাধারণ জ্ঞান',
    category: 'General Knowledge',
    durationMinutes: 10,
    difficulty: 'Medium',
    questionCount: 5,
    totalAttempts: 2540,
    questions: [
      {
        id: 'gkl1',
        text: 'Which is the earliest extant poetic work in Bengali literature?',
        textBn: 'বাংলা সাহিত্যের প্রাচীনতম নিদর্শন কোনটি?',
        options: ['Charyapada', 'Srikrishnakirtana', 'Mangalkavya', 'Gitagovinda'],
        optionsBn: ['চর্যাপদ', 'শ্রীকৃষ্ণকীর্তন', 'মঙ্গলকাব্য', 'গীতগোবিন্দ'],
        correctIndex: 0,
        explanation: 'Charyapada, discovered by Haraprasad Shastri in Nepal, is the oldest Bengali poetic collection.',
        explanationBn: 'হরপ্রসাদ শাস্ত্রী কর্তৃক নেপালের রাজদরবার থেকে আবিষ্কৃত চর্যাপদ বাংলা সাহিত্যের আদি নিদর্শন।'
      },
      {
        id: 'gkl2',
        text: 'In which year did Rabindranath Tagore win the Nobel Prize in Literature?',
        textBn: 'রবীন্দ্রনাথ ঠাকুর কত সালে সাহিত্যে নোবেল পুরস্কার পান?',
        options: ['1911', '1913', '1919', '1921'],
        optionsBn: ['১৯১১', '১৯১৩', '১৯১৯', '১৯২১'],
        correctIndex: 1,
        explanation: 'Rabindranath Tagore was awarded the Nobel Prize in Literature in 1913 for Gitanjali.',
        explanationBn: 'গীতাঞ্জলি কাব্যের ইংরেজি অনুবাদের জন্য ১৯১৩ সালে তিনি এশিয়ার প্রথম নোবেল বিজয়ী হন।'
      },
      {
        id: 'gkl3',
        text: 'Who wrote the famous epic poem "Meghnad Badh Kavya"?',
        textBn: 'অমিত্রাক্ষর ছন্দে রচিত "মেঘনাদবধ কাব্য" এর রচয়িতা কে?',
        options: ['Michael Madhusudan Dutt', 'Hemchandra', 'Ishwar Chandra Vidyasagar', 'Bankim Chandra'],
        optionsBn: ['মাইকেল মধুসূদন দত্ত', 'হেমচন্দ্র বন্দ্যোপাধ্যায়', 'ঈশ্বরচন্দ্র বিদ্যাসাগর', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়'],
        correctIndex: 0,
        explanation: 'Michael Madhusudan Dutt wrote the epic Meghnad Badh Kavya in blank verse.',
        explanationBn: 'মাইকেল মধুসূদন দত্ত অমিত্রাক্ষর ছন্দে প্রথম মহাকাব্য মেঘনাদবধ রচনা করেন।'
      },
      {
        id: 'gkl4',
        text: 'Who is known as the "Rebel Poet" (Bidrohi Kobi) of Bengal?',
        textBn: 'বাংলা সাহিত্যের "বিদ্রোহী কবি" হিসেবে পরিচিত কে?',
        options: ['Kazi Nazrul Islam', 'Jibanandanda Das', 'Farrukh Ahmad', 'Shamsur Rahman'],
        optionsBn: ['কাজী নজরুল ইসলাম', 'জীবনানন্দ দাশ', 'ফররুখ আহমদ', 'শামসুর রাহমান'],
        correctIndex: 0,
        explanation: 'Kazi Nazrul Islam is celebrated as the Rebel Poet for his fiery anti-colonial poetry.',
        explanationBn: 'জাতীয় কবি কাজী নজরুল ইসলাম অন্যায়ের বিরুদ্ধে লেখনীর জন্য "বিদ্রোহী কবি" নামে পরিচিত।'
      },
      {
        id: 'gkl5',
        text: 'Who is the author of the novel "Lalsalu"?',
        textBn: '"লালসালু" উপন্যাসের রচয়িতা কে?',
        options: ['Syed Waliullah', 'Shaukat Osman', 'Zahir Raihan', 'Humayun Ahmed'],
        optionsBn: ['সৈয়দ ওয়ালীউল্লাহ্', 'শওকত ওসমান', 'জহির রায়হান', 'হুমায়ূন আহমেদ'],
        correctIndex: 0,
        explanation: 'Syed Waliullah wrote the classic psychological realism novel Lalsalu.',
        explanationBn: 'ধর্মীয় ভণ্ডামির মুখোশ উন্মোচনকারী লালসালু উপন্যাসের লেখক সৈয়দ ওয়ালীউল্লাহ্।'
      }
    ]
  },

  // --- English (4 tests: Grammar, Vocabulary, Sentence Correction, Comprehension) ---
  {
    id: 'test-english-grammar-mastery',
    title: 'English: Subject-Verb Agreement & Tense Mastery',
    titleBn: 'ইংরেজি ব্যাকরণ: টেন্স ও সাবজেক্ট-ভার্ব এগ্রিমেন্ট',
    subject: 'English',
    subjectBn: 'ইংরেজি',
    category: 'English',
    durationMinutes: 10,
    difficulty: 'Medium',
    questionCount: 5,
    totalAttempts: 3120,
    questions: [
      {
        id: 'engg1',
        text: 'One of the students _____ absent yesterday.',
        textBn: 'শূন্যস্থানে সঠিক ভার্ব বসান: "One of the students _____ absent yesterday."',
        options: ['was', 'were', 'are', 'have been'],
        optionsBn: ['was', 'were', 'are', 'have been'],
        correctIndex: 0,
        explanation: '"One of the + plural noun" takes a singular verb ("was").',
        explanationBn: '"One of the" এর পর বহুবচন নাউন থাকলেও ক্রিয়াটি একবচন (was) হয়।'
      },
      {
        id: 'engg2',
        text: 'Neither the manager nor his assistants _____ arrived yet.',
        textBn: 'সঠিক ভার্ব কোনটি: "Neither the manager nor his assistants _____ arrived yet."',
        options: ['has', 'have', 'is', 'was'],
        optionsBn: ['has', 'have', 'is', 'was'],
        correctIndex: 1,
        explanation: 'In "neither... nor", the verb agrees with closest subject ("assistants" is plural -> have).',
        explanationBn: 'Neither... nor নিয়মে ক্রিয়াটি শেষের সাবজেক্ট (assistants) অনুযায়ী বহুবচন (have) হয়।'
      },
      {
        id: 'engg3',
        text: 'The train had left before we _____ the station.',
        textBn: 'সঠিক রূপ কোনটি: "The train had left before we _____ the station."',
        options: ['reached', 'had reached', 'reach', 'was reaching'],
        optionsBn: ['reached', 'had reached', 'reach', 'was reaching'],
        correctIndex: 0,
        explanation: 'In Past Perfect with "before", the first action takes had + V3 and second takes past simple (reached).',
        explanationBn: 'Before এর পূর্বে Past Perfect হলে পরে Past Simple (reached) হয়।'
      },
      {
        id: 'engg4',
        text: 'He talked as if he _____ everything.',
        textBn: 'সঠিক রূপ বসান: "He talked as if he _____ everything."',
        options: ['knows', 'knew', 'had known', 'has known'],
        optionsBn: ['knows', 'knew', 'had known', 'has known'],
        correctIndex: 2,
        explanation: 'When main clause is past ("talked"), "as if" clause takes past perfect ("had known").',
        explanationBn: 'প্রধান বাক্য Past Tense (talked) হলে as if এর পর Past Perfect (had known) বসে।'
      },
      {
        id: 'engg5',
        text: 'Ten miles _____ a long distance to walk.',
        textBn: 'সঠিক ভার্ব কোনটি: "Ten miles _____ a long distance to walk."',
        options: ['is', 'are', 'were', 'have'],
        optionsBn: ['is', 'are', 'were', 'have'],
        correctIndex: 0,
        explanation: 'Units of distance/time/money thought of as a single total take a singular verb (is).',
        explanationBn: 'দূরত্ব, পরিমাণ বা সময় একক সমষ্টি হিসেবে বিবেচনা করলে একবচন ভার্ব (is) বসে।'
      }
    ]
  },
  {
    id: 'test-english-vocabulary-idioms',
    title: 'English: High-Yield Vocabulary, Idioms & Prepositions',
    titleBn: 'ইংরেজি: গুরুত্বপূর্ণ শব্দভাণ্ডার, ইডিয়ম ও উপযুক্ত প্রিপজিশন',
    subject: 'English',
    subjectBn: 'ইংরেজি',
    category: 'English',
    durationMinutes: 10,
    difficulty: 'Medium',
    questionCount: 5,
    totalAttempts: 2790,
    questions: [
      {
        id: 'engv1',
        text: 'What is the synonym of the word "BENEVOLENT"?',
        textBn: '"BENEVOLENT" শব্দটির সমার্থক শব্দ কোনটি?',
        options: ['Cruel', 'Kind & generous', 'Selfish', 'Arrogant'],
        optionsBn: ['Cruel', 'Kind & generous', 'Selfish', 'Arrogant'],
        correctIndex: 1,
        explanation: 'Benevolent means well-meaning, generous, and charitable.',
        explanationBn: 'Benevolent অর্থ পরোপকারী, দয়ালু বা উদার।'
      },
      {
        id: 'engv2',
        text: 'The idiom "Once in a blue moon" means:',
        textBn: '"Once in a blue moon" বাগধারাটির অর্থ কী?',
        options: ['Frequently', 'Very rarely', 'Every month', 'At night'],
        optionsBn: ['Frequently', 'Very rarely', 'Every month', 'At night'],
        correctIndex: 1,
        explanation: '"Once in a blue moon" describes an event that happens extremely rarely.',
        explanationBn: '"Once in a blue moon" অর্থ কদাচিৎ বা অত্যন্ত বিরল কোনো ঘটনা।'
      },
      {
        id: 'engv3',
        text: 'He is proficient _____ mathematics.',
        textBn: 'উপযুক্ত Preposition বসান: "He is proficient _____ mathematics."',
        options: ['in', 'at', 'with', 'on'],
        optionsBn: ['in', 'at', 'with', 'on'],
        correctIndex: 0,
        explanation: 'The standard preposition after "proficient" is "in".',
        explanationBn: 'Proficient শব্দের পর উপযুক্ত preposition হিসেবে "in" বসে।'
      },
      {
        id: 'engv4',
        text: 'What is the antonym of the word "CANDID"?',
        textBn: '"CANDID" শব্দটির বিপরীতার্থক শব্দ কোনটি?',
        options: ['Honest', 'Frank', 'Deceitful / Secretive', 'Sincere'],
        optionsBn: ['Honest', 'Frank', 'Deceitful / Secretive', 'Sincere'],
        correctIndex: 2,
        explanation: 'Candid means truthful and straightforward. Opposite is secretive or deceptive.',
        explanationBn: 'Candid অর্থ অকপট বা স্পষ্টভাষী। এর বিপরীত শব্দ প্রতারণাপূর্ণ (Deceitful)।'
      },
      {
        id: 'engv5',
        text: 'To "burn the midnight oil" means:',
        textBn: '"To burn the midnight oil" ইডিয়মটির অর্থ কী?',
        options: ['To waste oil', 'To study or work late into the night', 'To cause a fire', 'To sleep early'],
        optionsBn: ['To waste oil', 'To study or work late into the night', 'To cause a fire', 'To sleep early'],
        correctIndex: 1,
        explanation: 'It means to work or study late into the night.',
        explanationBn: 'দেরী রাত পর্যন্ত কঠোর পরিশ্রম বা পড়াশোনা করা।'
      }
    ]
  },
  {
    id: 'test-english-sentence-correction',
    title: 'English: Sentence Correction & Voice Change',
    titleBn: 'ইংরেজি: বাক্য সংশোধন ও বাচ্য পরিবর্তন',
    subject: 'English',
    subjectBn: 'ইংরেজি',
    category: 'English',
    durationMinutes: 10,
    difficulty: 'Medium',
    questionCount: 5,
    totalAttempts: 2410,
    questions: [
      {
        id: 'engc1',
        text: 'Identify the correct passive form: "They built this bridge in 2020."',
        textBn: '"They built this bridge in 2020" এর সঠিক Passive Voice কোনটি?',
        options: [
          'This bridge was built by them in 2020.',
          'This bridge had been built in 2020.',
          'This bridge is built in 2020.',
          'This bridge was being built in 2020.'
        ],
        optionsBn: [
          'This bridge was built by them in 2020.',
          'This bridge had been built in 2020.',
          'This bridge is built in 2020.',
          'This bridge was being built in 2020.'
        ],
        correctIndex: 0,
        explanation: 'Past simple active (built) becomes was/were + past participle (was built).',
        explanationBn: 'Past Indefinite Tense এর প্যাসিভে was/were + V3 বসে।'
      },
      {
        id: 'engc2',
        text: 'Choose the grammatically correct sentence:',
        textBn: 'নিচের কোন বাক্যটি ব্যাকরণগতভাবে সঠিক?',
        options: [
          'He prefers tea than coffee.',
          'He prefers tea to coffee.',
          'He prefers tea more than coffee.',
          'He prefers tea over coffee.'
        ],
        optionsBn: [
          'He prefers tea than coffee.',
          'He prefers tea to coffee.',
          'He prefers tea more than coffee.',
          'He prefers tea over coffee.'
        ],
        correctIndex: 1,
        explanation: '"Prefer" takes "to" for comparison, not "than".',
        explanationBn: 'Prefer শব্দের পর তুলনার্থে than না বসে "to" বসে।'
      },
      {
        id: 'engc3',
        text: 'What is the indirect speech of: He said, "I am reading a book."',
        textBn: 'He said, "I am reading a book" এর Indirect Speech কোনটি?',
        options: [
          'He said that he was reading a book.',
          'He said that he is reading a book.',
          'He said that I was reading a book.',
          'He said that he had read a book.'
        ],
        optionsBn: [
          'He said that he was reading a book.',
          'He said that he is reading a book.',
          'He said that I was reading a book.',
          'He said that he had read a book.'
        ],
        correctIndex: 0,
        explanation: 'Present continuous ("am reading") changes to past continuous ("was reading").',
        explanationBn: 'রিপোর্টিং ভার্ব Past হলে Present Continuous পরিবর্তিত হয়ে Past Continuous (was reading) হয়।'
      },
      {
        id: 'engc4',
        text: 'Find the correct sentence with correct modifier placement:',
        textBn: 'সঠিক মডিফায়ারযুক্ত বাক্য কোনটি?',
        options: [
          'Walking down the street, a car hit him.',
          'While he was walking down the street, a car hit him.',
          'Walking down the street, he was hit by a car.',
          'Both B and C are correct.'
        ],
        optionsBn: [
          'Walking down the street, a car hit him.',
          'While he was walking down the street, a car hit him.',
          'Walking down the street, he was hit by a car.',
          'Both B and C are correct.'
        ],
        correctIndex: 3,
        explanation: 'Option A has a dangling participle. B and C fix the subject agreement properly.',
        explanationBn: 'A বাক্যে ড্যাংলিং মডিফায়ার রয়েছে, B ও C উভয় বাক্যই ব্যাকরণগতভাবে সঠিক।'
      },
      {
        id: 'engc5',
        text: 'Choose the correct form: "Hardly had we started _____ it began to rain."',
        textBn: 'সঠিক শব্দ দিয়ে পূরণ করুন: "Hardly had we started _____ it began to rain."',
        options: ['than', 'when', 'then', 'before'],
        optionsBn: ['than', 'when', 'then', 'before'],
        correctIndex: 1,
        explanation: '"Hardly had... when" is the standard correlative conjunction pair.',
        explanationBn: '"Hardly had" এর সাথে জোড়া হিসেবে "when" বসে (No sooner had এর সাথে than বসে)।'
      }
    ]
  },
  {
    id: 'test-english-reading-comprehension',
    title: 'English: Reading Comprehension & Contextual Vocabulary',
    titleBn: 'ইংরেজি: অনুচ্ছেদ অনুধাবন ও প্রায়োগিক শব্দার্থ',
    subject: 'English',
    subjectBn: 'ইংরেজি',
    category: 'English',
    durationMinutes: 10,
    difficulty: 'Medium',
    questionCount: 5,
    totalAttempts: 2280,
    questions: [
      {
        id: 'engrc1',
        text: 'What does the word "PRAGMATIC" mean in a practical context?',
        textBn: '"PRAGMATIC" শব্দটির প্রায়োগিক অর্থ কী?',
        options: ['Idealistic & dreamy', 'Dealing with things sensibly and realistically', 'Careless', 'Angry'],
        optionsBn: ['Idealistic & dreamy', 'Dealing with things sensibly and realistically', 'Careless', 'Angry'],
        correctIndex: 1,
        explanation: 'Pragmatic means guided by practical considerations rather than ideals.',
        explanationBn: 'Pragmatic অর্থ বাস্তবধর্মী বা প্রয়োগবাদী।'
      },
      {
        id: 'engrc2',
        text: 'Choose the correct spelling:',
        textBn: 'সঠিক বানান কোনটি?',
        options: ['Bureaucracy', 'Burocracy', 'Bureaucrassy', 'Beurocracy'],
        optionsBn: ['Bureaucracy', 'Burocracy', 'Bureaucrassy', 'Beurocracy'],
        correctIndex: 0,
        explanation: 'Correct spelling is B-U-R-E-A-U-C-R-A-C-Y.',
        explanationBn: 'আমলাতন্ত্রের সঠিক ইংরেজি বানান Bureaucracy।'
      },
      {
        id: 'engrc3',
        text: 'What is a "post-mortem" examination?',
        textBn: '"Post-mortem" পরীক্ষার অর্থ কী?',
        options: ['Before death inquiry', 'Autopsy performed after death', 'Eye test', 'Blood donation'],
        optionsBn: ['Before death inquiry', 'Autopsy performed after death', 'Eye test', 'Blood donation'],
        correctIndex: 1,
        explanation: 'A post-mortem is an examination of a body after death to determine cause of death.',
        explanationBn: 'ময়নাতদন্ত বা মৃত্যুর পর দেহের ডাক্তারি পরীক্ষা।'
      },
      {
        id: 'engrc4',
        text: 'The phrase "Alma Mater" refers to:',
        textBn: '"Alma Mater" পরিভাষাটি কী নির্দেশ করে?',
        options: ['Mother country', 'The school or university one graduated from', 'Birth mother', 'Native tongue'],
        optionsBn: ['Mother country', 'The school or university one graduated from', 'Birth mother', 'Native tongue'],
        correctIndex: 1,
        explanation: 'Alma Mater refers to the institution from which one has graduated.',
        explanationBn: 'যে শিক্ষা প্রতিষ্ঠান থেকে কেউ ডিগ্রী অর্জন করেছে (নিজ শিক্ষাপ্রতিষ্ঠান)।'
      },
      {
        id: 'engrc5',
        text: 'What is the meaning of "Status Quo"?',
        textBn: '"Status Quo" ল্যাটিন পরিভাষাটির অর্থ কী?',
        options: ['Existing state of affairs', 'A high social status', 'Sudden revolution', 'Legal notice'],
        optionsBn: ['Existing state of affairs', 'A high social status', 'Sudden revolution', 'Legal notice'],
        correctIndex: 0,
        explanation: 'Status quo refers to the existing, unchanged state of affairs.',
        explanationBn: 'বিদ্যমান অপরিবর্তিত অবস্থা বা স্থিতাবস্থা।'
      }
    ]
  }
];
