/* ═══════════════════════════════════════════════
   ISSA ALHOMSI — PORTFOLIO — script.js
   Personal details live in config.js (not here).
   To add a language: add a block to `translations`
   and extend switchLanguage().
═══════════════════════════════════════════════ */
'use strict';

document.documentElement.classList.add('js');

const CFG = window.SITE_CONFIG || {};
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────── TRANSLATIONS ─────────────── */
const translations = {
  en: {
    pageTitle: 'Issa Alhomsi | Mechanical Design Engineer | CAD/CAM & CNC Programming',
    metaDesc:  'Portfolio of Issa Alhomsi, a mechanical engineer working in CAD/CAM and CNC programming: Autodesk PowerMill 3-axis toolpaths, SOLIDWORKS design, mold design fundamentals and a 3-axis CNC router built as a graduation project.',
    skip: 'Skip to content',
    langAria: 'Switch to Arabic', langLabel: 'العربية',
    navHome: 'Home', navAbout: 'About', navSkills: 'Skills', navProjects: 'Projects',
    navEducation: 'Education', navServices: 'Services', navContact: 'Contact',
    backTop: 'Back to top', close: 'Close',

    heroEyebrow: 'Mechanical Engineering Portfolio',
    heroName: 'Issa Alhomsi',
    heroRole: 'Mechanical Design Engineer | CAD/CAM Engineer | CNC Programmer',
    heroDesc: 'Mechanical engineer focused on turning designs into manufacturable parts: 3-axis toolpaths in Autodesk PowerMill, SOLIDWORKS modeling, and CNC machine build and calibration.',
    heroCtaProjects: 'View Projects', heroCta: 'Contact Me', heroCV: 'Download CV',
    focus1: 'CAM & CNC programming', focus2: 'SOLIDWORKS design', focus3: 'Design for manufacturing',
    tbLabel1: 'Engineer', tbLabel2: 'Discipline', tbVal2: 'Mechanical Design',
    tbLabel3: 'Focus', tbVal3: 'CAD/CAM · CNC', tbLabel4: 'Education', tbVal4: 'Damascus University',

    aboutTitle: 'From design intent\n<em>to machined part</em>',
    aboutP1: 'I am a mechanical engineer from Damascus University working across CAD, CAM and CNC. My hands-on experience is in preparing 3-axis toolpaths in Autodesk PowerMill (roughing, rest machining and finishing) and checking them through simulation and G-code verification.',
    aboutP2: 'For my graduation project I designed, assembled and calibrated a 3-axis CNC router, connecting mechanical design in SOLIDWORKS with component selection, GRBL control and G-code motion.',
    aboutP3: 'I care about drawings that can be manufactured, toolpaths that are safe and efficient, and tolerances that match the function of the part.',
    trait1: 'Toolpath generation and simulation', trait2: 'Machine assembly and calibration',
    trait3: 'Design for manufacturing and assembly', trait4: 'Engineering drawings and GD&T',

    skillsTitle: 'Tools & technical\n<em>competencies</em>',
    skillCat1: 'CAM & CNC Programming', skillCat2: 'CAD & Mechanical Design', skillCat3: 'Manufacturing & Mechanical Engineering',
    sk2: '3-Axis CNC Programming', sk3: 'Roughing, Rest Machining & Finishing', sk4: 'Toolpath Generation and Simulation',
    sk5: 'G-code Generation and Verification', sk6: 'GRBL Control Systems', sk7: 'Basic Fanuc CNC Knowledge',
    sk8: 'SOLIDWORKS 3D Modeling', sk9: 'Mechanical Assemblies', sk10: 'Sheet Metal Design', sk11: 'Engineering Drawings',
    sk13: 'Geometric Dimensioning and Tolerancing (GD&T)',
    sk14: 'CNC Machining Processes', sk15: 'Mechanical Component Selection', sk16: 'Machine Assembly and Calibration',
    sk17: 'Design for Manufacturing (DFM)', sk18: 'Design for Assembly (DFA)', sk19: 'Basic Plastic Injection Mold Design',

    projectsTitle: 'Selected engineering\n<em>work</em>',
    filterAll: 'All', filterAcademic: 'Academic', filterCam: 'CAM & Machining', filterDesign: 'Mechanical Design',
    viewDetails: 'View details', badgeAcademic: 'Academic project', altPrefix: 'Project image: ',
    p1Title: '3-Axis CNC Router — Mechanical Design & Implementation',
    p1Desc: 'Graduation project covering the full build: frame design in SOLIDWORKS, selection of motion components, assembly, alignment and calibration, GRBL integration and G-code motion.',
    p1Modal: 'Academic graduation project in mechanical engineering: a 3-axis CNC machine designed and built from scratch. The mechanical frame was designed in SOLIDWORKS and the machine uses a wooden frame, T8 lead screws, NEMA 17 stepper motors, a CNC Shield V3 driver board, GRBL firmware on Arduino and a DC 775 spindle motor. The work covers structural design, motion system selection, assembly, alignment and calibration, control integration, G-code motion, and documentation of the engineering and manufacturing aspects.',
    p2Title: 'Plastic Injection Mold Design',
    p2Desc: 'Core and cavity design, parting lines, side cores where required, draft angles, PMMA shrinkage allowance and DFM principles.',
    p2Modal: 'Academic project: a two-plate injection mold designed in SOLIDWORKS, covering core and cavity blocks, parting-line definition, side cores where required, ejector pin layout, guide pillars and bushings, and mold-base assembly. Draft angles and PMMA shrinkage allowances were applied, following design-for-manufacturing principles.',
    p3Title: 'Mold Cavity & Core CAM Programming',
    p3Desc: 'Roughing, rest machining and 3D offset finishing toolpaths in Autodesk PowerMill, with collision and gouge checks for mold components.',
    p3Modal: 'CAM programming in Autodesk PowerMill for machining a mold cavity and core. Includes roughing, rest machining and finishing strategy setup (including constant-Z finishing), stock model verification, and toolpath simulation to confirm safe and efficient machining.',
    p4Title: 'CAM Roughing Toolpath Verification',
    p4Desc: 'Roughing setup and collision/gouge verification in PowerMill for a multi-pocket mold component.',
    p4Modal: 'Roughing strategy developed in PowerMill for a multi-pocket mold component, including tool selection, stepover and stepdown settings, and toolpath verification to find and correct unsafe or colliding segments before machining.',
    p5Title: 'Speaker Mold Core — CAM Programming',
    p5Desc: 'Toolpath programming for a speaker enclosure mold core, combining several finishing strategies and lead-in options.',
    p5Modal: 'CAM programming for a speaker enclosure mold core in PowerMill, combining several finishing strategies (constant Z, ball-nose passes) with different lead-in options (ramp, horizontal arc, vertical arc) to achieve full, gouge-free surface coverage.',
    p6Title: 'Speaker Mold Core — Finishing Strategy',
    p6Desc: 'Finishing-pass planning and simulation for the same mold core, checking surface coverage and safe tool engagement.',
    p6Modal: 'Finishing-stage toolpath planning for the same speaker enclosure mold core, focused on simulating and verifying each finishing pass (lead-in behavior, surface coverage and safe tool engagement) before generating the final NC program.',
    p7Title: 'Housing CAM Toolpath — 3D Offset',
    p7Desc: '3D offset finishing toolpath for a housing part with circular bosses and pockets, using pattern-based machining.',
    p7Modal: 'Finishing toolpath for a housing-type part with circular bosses and pockets, using a pattern-based 3D offset strategy in PowerMill to machine the transition surface between features with a consistent stepover.',
    p8Title: 'Skid-Steer Loader Assembly',
    p8Desc: 'Full 3D assembly of a compact skid-steer loader: boom arm, bucket, cab frame and wheel drivetrain.',
    p8Modal: 'Complete SOLIDWORKS assembly of a compact skid-steer loader covering the lifting-arm linkage, bucket, operator cab structure, engine bay and wheel drivetrain. The work focused on realistic proportions, interference checks between moving parts, and a rendered presentation model.',
    p9Title: 'Universal Joint Coupling',
    p9Desc: 'Double universal (Cardan) joint coupling for transmitting rotary motion between misaligned shafts.',
    p9Modal: 'Machine-element design of a double universal joint coupling used to transmit torque between two shafts at an angle. The model includes the yokes, cross pins and bearing details needed for accurate motion transfer and manufacturability.',
    p10Title: 'FPV Racing Drone Frame',
    p10Desc: 'Compact 4-motor FPV racing drone frame with a central electronics bay, reinforced arms and motor/propeller mounts.',
    p10Modal: '3D design of a lightweight FPV racing quadcopter frame, including the central chassis for the flight controller and battery, reinforced arms, and motor/propeller mounts. The layout aims for a low center of gravity and easy access to components.',
    p11Title: 'Multi-Stage Gear Train',
    p11Desc: 'Multi-stage spur gear train for speed reduction, with gear ratio calculations and shaft layout.',
    p11Modal: 'Design of a multi-stage spur gear train for speed reduction in a power transmission system, including gear ratio calculations, shaft and keyway sizing, and center-distance layout across all mesh stages.',
    p12Title: 'Rotomolded Water Tank',
    p12Desc: 'Ribbed cylindrical water tank with an integrated cap and mounting fittings.',
    p12Modal: '3D product design of a cylindrical water storage tank with a ribbed body for rigidity, an integrated screw cap and fitting mounts. The design considers rotational-molding manufacturability and uniform wall thickness.',
    p13Title: 'Wooden Table Design',
    p13Desc: 'Wooden-top table with a welded steel leg frame, sized for everyday use.',
    p13Modal: 'Furniture design combining a solid wood tabletop with a welded steel leg frame, covering dimensions for structural stability, the joint between the wood top and the metal frame, and a presentation render.',

    eduTitle: 'Education &\n<em>academic work</em>', badgeEdu: 'Education',
    edu1Role: 'Graduation Project — 3-Axis CNC Router',
    edu1Org: 'Damascus University — Mechanical Engineering',
    edu1Desc: 'Design, assembly and calibration of a 3-axis CNC router, with GRBL control integration and G-code motion.',
    edu2Role: 'Mechanical Engineering', edu2Org: 'Damascus University',
    edu2Desc: 'Coursework relevant to machine design, manufacturing processes and CAD/CAM, including SOLIDWORKS, Autodesk PowerMill and CNC machining.',

    servicesTitle: 'Areas where I can\n<em>support your work</em>',
    servicesIntro: 'Based on the projects shown above, these are the design and CAM tasks I can help with.',
    svc1Title: '3-Axis CAM Programming', svc1Desc: 'Strategies for roughing, rest machining and finishing, checked through simulation before G-code output.',
    svc2Title: 'Autodesk PowerMill Toolpaths', svc2Desc: 'Toolpath generation and verification, including collision and gouge checks on mold-type parts.',
    svc3Title: 'SOLIDWORKS 3D Modeling', svc3Desc: 'Parametric part modeling and sheet metal design prepared for manufacturing.',
    svc4Title: 'Mechanical Assembly Design', svc4Desc: 'Assemblies with component selection, fit checks and interference review.',
    svc5Title: 'Engineering Drawings', svc5Desc: 'Manufacturing drawings with dimensions, tolerances, GD&T callouts and a bill of materials.',
    svc6Title: 'Basic Plastic Injection Mold Design', svc6Desc: 'Core/cavity split, parting lines, side cores, draft angles and shrinkage allowance, with DFM in mind.',

    cvTitle: 'Curriculum Vitae', cvDesc: 'Download my CV as a PDF for a full summary of education and projects.',
    cvBtn: 'Download CV (PDF)', cvMissing: 'The CV file has not been added yet.',

    contactTitle: 'Get in\n<em>touch</em>',
    contactIntro: 'For questions about my projects or a design/CAM collaboration, send a message.',
    contactEmail: 'Email', contactPhone: 'Phone', contactPending: 'Will be added soon',
    formName: 'Name', formNamePh: 'Your full name', formEmail: 'Email',
    formSubject: 'Subject', formSubjectPh: 'Subject of your message',
    formMsg: 'Message', formMsgPh: 'Describe your project or question...', formSend: 'Send Message',
    errName: 'Name is required', errEmail: 'Please enter a valid email address',
    errMsg: 'Message is too short (at least 10 characters)',
    formSending: 'Sending...',
    formMailto: 'Your email app should open with the message ready to send.',
    formSent: 'Message sent. Thank you!',
    formFail: 'The message could not be sent. Please try again later.',
    formUnavailable: 'The contact form is not active yet. Contact details will be added soon.',

    footerTagline: 'Mechanical Design Engineer | CAD/CAM & CNC Programming',
    footerCopy: '© {year} Issa Alhomsi. All rights reserved.',
    typingStrings: ['Mechanical Design Engineer', 'CAD/CAM Engineer', 'CNC Programmer']
  },

  ar: {
    pageTitle: 'عيسى الحمصي | مهندس تصميم ميكانيكي | CAD/CAM وبرمجة CNC',
    metaDesc:  'الموقع المهني للمهندس عيسى الحمصي، مهندس ميكانيك في مجال CAD/CAM وبرمجة CNC: مسارات تشغيل ثلاثية المحاور في Autodesk PowerMill، تصميم بواسطة SOLIDWORKS، أساسيات تصميم القوالب، وآلة CNC ثلاثية المحاور من مشروع التخرج.',
    skip: 'تخطَّ إلى المحتوى',
    langAria: 'التبديل إلى الإنجليزية', langLabel: 'English',
    navHome: 'الرئيسية', navAbout: 'نبذة', navSkills: 'المهارات', navProjects: 'المشاريع',
    navEducation: 'التعليم', navServices: 'الخدمات', navContact: 'التواصل',
    backTop: 'العودة إلى الأعلى', close: 'إغلاق',

    heroEyebrow: 'ملف أعمال هندسي',
    heroName: 'عيسى الحمصي',
    heroRole: 'مهندس تصميم ميكانيكي | مهندس CAD/CAM | مبرمج CNC',
    heroDesc: 'مهندس ميكانيك يركّز على تحويل التصاميم إلى قطع قابلة للتصنيع: مسارات تشغيل ثلاثية المحاور في Autodesk PowerMill، ونمذجة في SOLIDWORKS، وبناء آلات CNC ومعايرتها.',
    heroCtaProjects: 'استعرض المشاريع', heroCta: 'تواصل معي', heroCV: 'تحميل السيرة الذاتية',
    focus1: 'برمجة CAM وCNC', focus2: 'التصميم بواسطة SOLIDWORKS', focus3: 'التصميم من أجل التصنيع',
    tbLabel1: 'المهندس', tbLabel2: 'الاختصاص', tbVal2: 'التصميم الميكانيكي',
    tbLabel3: 'المجال', tbVal3: 'CAD/CAM وCNC', tbLabel4: 'التعليم', tbVal4: 'جامعة دمشق',

    aboutTitle: 'من فكرة التصميم\n<em>إلى القطعة المشغّلة</em>',
    aboutP1: 'أنا مهندس ميكانيك خريج جامعة دمشق، أعمل في مجالات CAD وCAM وCNC. خبرتي العملية في إعداد مسارات تشغيل ثلاثية المحاور في Autodesk PowerMill، من التخشين والتشغيل المتبقي إلى التشطيب، والتحقق منها عبر المحاكاة وفحص كود G-code.',
    aboutP2: 'في مشروع التخرج صمّمتُ آلة CNC راوتر ثلاثية المحاور وجمّعتُها وعايرتُها، وربطتُ فيها التصميم الميكانيكي في SOLIDWORKS باختيار مكوّنات الحركة وبنظام التحكم GRBL وتنفيذ الحركة بكود G-code.',
    aboutP3: 'أهتم بالرسومات القابلة للتصنيع، ومسارات التشغيل الآمنة والفعّالة، والتسامحات المتناسبة مع وظيفة القطعة.',
    trait1: 'إنشاء مسارات التشغيل ومحاكاتها', trait2: 'تجميع الآلات ومعايرتها',
    trait3: 'التصميم من أجل التصنيع والتجميع', trait4: 'الرسومات الهندسية وGD&T',

    skillsTitle: 'الأدوات والكفاءات\n<em>التقنية</em>',
    skillCat1: 'برمجة CAM وCNC', skillCat2: 'CAD والتصميم الميكانيكي', skillCat3: 'التصنيع والهندسة الميكانيكية',
    sk2: 'برمجة CNC ثلاثية المحاور', sk3: 'التخشين والتشغيل المتبقي والتشطيب', sk4: 'إنشاء مسارات التشغيل ومحاكاتها',
    sk5: 'توليد كود G-code والتحقق منه', sk6: 'أنظمة التحكم GRBL', sk7: 'معرفة أساسية بأنظمة Fanuc CNC',
    sk8: 'النمذجة ثلاثية الأبعاد في SOLIDWORKS', sk9: 'التجميعات الميكانيكية', sk10: 'تصميم الصفائح المعدنية', sk11: 'الرسومات الهندسية',
    sk13: 'الأبعاد والتسامحات الهندسية (GD&T)',
    sk14: 'عمليات التشغيل بآلات CNC', sk15: 'اختيار المكوّنات الميكانيكية', sk16: 'تجميع الآلات ومعايرتها',
    sk17: 'التصميم من أجل التصنيع (DFM)', sk18: 'التصميم من أجل التجميع (DFA)', sk19: 'أساسيات تصميم قوالب حقن البلاستيك',

    projectsTitle: 'مختارات من الأعمال\n<em>الهندسية</em>',
    filterAll: 'الكل', filterAcademic: 'أكاديمي', filterCam: 'CAM والتشغيل', filterDesign: 'التصميم الميكانيكي',
    viewDetails: 'عرض التفاصيل', badgeAcademic: 'مشروع أكاديمي', altPrefix: 'صورة المشروع: ',
    p1Title: 'راوتر CNC ثلاثي المحاور — التصميم الميكانيكي والتنفيذ',
    p1Desc: 'مشروع التخرج، ويشمل البناء الكامل: تصميم الهيكل في SOLIDWORKS، واختيار مكوّنات الحركة، والتجميع والمحاذاة والمعايرة، ودمج نظام GRBL، وتنفيذ الحركة بكود G-code.',
    p1Modal: 'مشروع تخرج أكاديمي في الهندسة الميكانيكية: آلة CNC ثلاثية المحاور صُمّمت وبُنيت من الصفر. صُمّم الهيكل الميكانيكي في SOLIDWORKS، وتعتمد الآلة على هيكل خشبي وقضبان حركة T8 ومحركات خطوية NEMA 17 ولوحة تشغيل CNC Shield V3 وفيرموير GRBL على Arduino ومحرك مغزل DC 775. يغطي العمل التصميم الإنشائي واختيار منظومة الحركة والتجميع والمحاذاة والمعايرة ودمج نظام التحكم وتنفيذ الحركة بكود G-code، مع توثيق الجوانب الهندسية والتصنيعية للمشروع.',
    p2Title: 'تصميم قالب حقن بلاستيك',
    p2Desc: 'تصميم النواة والتجويف، ودراسة خطوط الفصل، والنوى الجانبية عند الحاجة، وزوايا السحب، وانكماش مادة PMMA، وتطبيق مبادئ DFM.',
    p2Modal: 'مشروع أكاديمي: قالب حقن ثنائي اللوح صُمّم في SOLIDWORKS، ويشمل كتلتي النواة والتجويف، وتحديد خطوط الفصل، والنوى الجانبية عند الحاجة، وتوزيع دبابيس الإخراج، وأعمدة التوجيه والبطانات، وتجميع قاعدة القالب. رُوعيت زوايا السحب وبدلات انكماش PMMA وفق مبادئ التصميم من أجل التصنيع.',
    p3Title: 'برمجة CAM لتجويف ونواة قالب',
    p3Desc: 'مسارات تخشين وتشغيل متبقٍّ وتشطيب بأسلوب 3D Offset في Autodesk PowerMill، مع فحص التصادم والقصّ الزائد لمكوّنات القالب.',
    p3Modal: 'برمجة CAM في Autodesk PowerMill لتشغيل تجويف ونواة قالب. تشمل إعداد استراتيجيات التخشين والتشغيل المتبقي والتشطيب (ومنها التشطيب بمستوى Z ثابت)، والتحقق من نموذج الخامة، ومحاكاة المسارات للتأكد من تشغيل آمن وفعّال.',
    p4Title: 'التحقق من مسار تخشين CAM',
    p4Desc: 'إعداد مسار التخشين والتحقق من التصادم والقصّ الزائد في PowerMill لقطعة قالب متعددة الجيوب.',
    p4Modal: 'استراتيجية تخشين طُوّرت في PowerMill لقطعة قالب متعددة الجيوب، وتشمل اختيار الأداة وضبط الخطوة الجانبية والخطوة العمودية، والتحقق من المسار لاكتشاف المقاطع غير الآمنة أو المتصادمة وتصحيحها قبل التشغيل.',
    p5Title: 'نواة قالب سماعة — برمجة CAM',
    p5Desc: 'برمجة مسارات تشغيل لنواة قالب علبة سماعة، مع الجمع بين عدة استراتيجيات تشطيب وخيارات دخول مختلفة.',
    p5Modal: 'برمجة CAM لنواة قالب علبة سماعة في PowerMill، تجمع بين عدة استراتيجيات تشطيب (Z ثابت، تمريرات بأداة كروية) مع خيارات دخول مختلفة (منحدر، قوس أفقي، قوس عمودي) لتحقيق تغطية كاملة للسطح دون قصّ زائد.',
    p6Title: 'نواة قالب سماعة — استراتيجية التشطيب',
    p6Desc: 'تخطيط تمريرات التشطيب ومحاكاتها لنفس النواة، مع فحص تغطية السطح وأمان تماس الأداة.',
    p6Modal: 'تخطيط مسارات مرحلة التشطيب لنفس نواة قالب علبة السماعة، مع التركيز على محاكاة كل تمريرة والتحقق منها (سلوك الدخول، وتغطية السطح، وأمان تماس الأداة) قبل توليد برنامج NC النهائي.',
    p7Title: 'مسار CAM لقطعة هيكل — 3D Offset',
    p7Desc: 'مسار تشطيب بأسلوب 3D Offset لقطعة هيكل ذات نتوءات وجيوب دائرية، باستخدام تشغيل قائم على نمط.',
    p7Modal: 'مسار تشطيب لقطعة من نوع هيكل تحتوي على نتوءات وجيوب دائرية، باستخدام استراتيجية 3D Offset القائمة على نمط في PowerMill لتشغيل السطح الانتقالي بين العناصر بخطوة جانبية منتظمة.',
    p8Title: 'تجميع حمّالة انزلاقية (Skid-Steer Loader)',
    p8Desc: 'تجميع ثلاثي الأبعاد كامل لحمّالة انزلاقية مدمجة: ذراع الرفع والجرّافة وهيكل المقصورة ومنظومة دفع العجلات.',
    p8Modal: 'تجميع كامل في SOLIDWORKS لحمّالة انزلاقية مدمجة، يشمل مفصلات ذراع الرفع والجرّافة وهيكل مقصورة القيادة وحجرة المحرك ومنظومة دفع العجلات. ركّز العمل على النسب الواقعية وفحص التداخل بين الأجزاء المتحركة ونموذج عرض مُرندَر.',
    p9Title: 'وصلة مفصل عالمي مزدوج',
    p9Desc: 'وصلة مفصل عالمي مزدوج (Cardan) لنقل الحركة الدورانية بين محورين غير متحاذيين.',
    p9Modal: 'تصميم عنصر آلي لوصلة مفصل عالمي مزدوج تنقل العزم بين محورين بينهما زاوية. يتضمن النموذج الشوكات ومحاور الصليب وتفاصيل المحامل اللازمة لنقل حركة دقيق وقابل للتصنيع.',
    p10Title: 'هيكل درون سباق FPV',
    p10Desc: 'هيكل درون سباق مدمج رباعي المحركات، بحجرة إلكترونيات مركزية وأذرع مقوّاة ومساكن للمحركات والمراوح.',
    p10Modal: 'تصميم ثلاثي الأبعاد لهيكل كوادكوبتر سباق خفيف من نوع FPV، يشمل الشاسيه المركزي لوحدة التحكم بالطيران والبطارية وأذرعًا مقوّاة ومساكن للمحركات والمراوح. يهدف التوزيع إلى خفض مركز الثقل وتسهيل الوصول إلى المكوّنات.',
    p11Title: 'علبة تروس متعددة المراحل',
    p11Desc: 'علبة تروس مستقيمة متعددة المراحل لتخفيض السرعة، مع حساب نسب التروس وتوزيع المحاور.',
    p11Modal: 'تصميم علبة تروس مستقيمة متعددة المراحل لتخفيض السرعة في منظومة نقل حركة، ويشمل حساب نسب التروس وتحديد أبعاد المحاور والمفاتيح (Keyway) وتوزيع المسافات المركزية عبر جميع مراحل التعشيق.',
    p12Title: 'خزان مياه بالقولبة الدورانية',
    p12Desc: 'خزان مياه أسطواني مضلّع بغطاء متكامل ووصلات تثبيت.',
    p12Modal: 'تصميم منتج ثلاثي الأبعاد لخزان تخزين مياه أسطواني بجسم مضلّع لزيادة الصلابة، مع غطاء لولبي متكامل ووصلات تثبيت. يراعي التصميم قابلية التصنيع بالقولبة الدورانية وانتظام سماكة الجدار.',
    p13Title: 'تصميم طاولة خشبية',
    p13Desc: 'طاولة بسطح خشبي وهيكل أرجل فولاذي ملحوم، بأبعاد مناسبة للاستخدام اليومي.',
    p13Modal: 'تصميم أثاث يجمع بين سطح خشبي مصمت وهيكل أرجل فولاذي ملحوم، ويغطي الأبعاد اللازمة للثبات الإنشائي وتفاصيل الوصل بين السطح الخشبي والهيكل المعدني ونموذج عرض مُرندَر.',

    eduTitle: 'التعليم\n<em>والعمل الأكاديمي</em>', badgeEdu: 'تعليم',
    edu1Role: 'مشروع التخرج — راوتر CNC ثلاثي المحاور',
    edu1Org: 'جامعة دمشق — الهندسة الميكانيكية',
    edu1Desc: 'تصميم راوتر CNC ثلاثي المحاور وتجميعه ومعايرته، مع دمج نظام التحكم GRBL وتنفيذ الحركة بكود G-code.',
    edu2Role: 'الهندسة الميكانيكية', edu2Org: 'جامعة دمشق',
    edu2Desc: 'مقررات ذات صلة بتصميم الآلات وعمليات التصنيع وهندسة CAD/CAM، منها SOLIDWORKS وAutodesk PowerMill والتشغيل بآلات CNC.',

    servicesTitle: 'مجالات يمكنني\n<em>دعم عملكم فيها</em>',
    servicesIntro: 'استنادًا إلى المشاريع المعروضة أعلاه، هذه مهام التصميم وCAM التي يمكنني المساعدة فيها.',
    svc1Title: 'برمجة CAM ثلاثية المحاور', svc1Desc: 'استراتيجيات التخشين والتشغيل المتبقي والتشطيب، مع التحقق منها بالمحاكاة قبل إخراج كود G-code.',
    svc2Title: 'مسارات Autodesk PowerMill', svc2Desc: 'إنشاء مسارات التشغيل والتحقق منها، بما في ذلك فحص التصادم والقصّ الزائد في قطع القوالب.',
    svc3Title: 'نمذجة SOLIDWORKS ثلاثية الأبعاد', svc3Desc: 'نمذجة بارامترية للقطع وتصميم الصفائح المعدنية بما يناسب التصنيع.',
    svc4Title: 'تصميم التجميعات الميكانيكية', svc4Desc: 'تجميعات مع اختيار المكوّنات وفحص التوافق ومراجعة التداخل.',
    svc5Title: 'الرسومات الهندسية', svc5Desc: 'رسومات تصنيع بأبعاد وتسامحات وإشارات GD&T وقائمة مواد (BOM).',
    svc6Title: 'أساسيات تصميم قوالب حقن البلاستيك', svc6Desc: 'فصل النواة والتجويف، وخطوط الفصل، والنوى الجانبية، وزوايا السحب، وبدلات الانكماش، مع مراعاة DFM.',

    cvTitle: 'السيرة الذاتية', cvDesc: 'حمّل سيرتي الذاتية بصيغة PDF لملخص كامل عن التعليم والمشاريع.',
    cvBtn: 'تحميل السيرة الذاتية (PDF)', cvMissing: 'لم تتم إضافة ملف السيرة الذاتية بعد.',

    contactTitle: 'للتواصل\n<em>معي</em>',
    contactIntro: 'للاستفسار عن مشاريعي أو التعاون في التصميم وCAM، يمكنك إرسال رسالة.',
    contactEmail: 'البريد الإلكتروني', contactPhone: 'الهاتف', contactPending: 'سيُضاف قريبًا',
    formName: 'الاسم', formNamePh: 'اسمك الكامل', formEmail: 'البريد الإلكتروني',
    formSubject: 'الموضوع', formSubjectPh: 'موضوع رسالتك',
    formMsg: 'الرسالة', formMsgPh: 'صِف مشروعك أو سؤالك...', formSend: 'إرسال الرسالة',
    errName: 'الاسم مطلوب', errEmail: 'يرجى إدخال بريد إلكتروني صحيح',
    errMsg: 'الرسالة قصيرة جدًا (10 أحرف على الأقل)',
    formSending: 'جارٍ الإرسال...',
    formMailto: 'يُفترض أن يفتح تطبيق البريد لديك والرسالة جاهزة للإرسال.',
    formSent: 'تم إرسال الرسالة. شكرًا لك!',
    formFail: 'تعذّر إرسال الرسالة. يرجى المحاولة لاحقًا.',
    formUnavailable: 'نموذج التواصل غير مفعّل بعد. ستُضاف بيانات التواصل قريبًا.',

    footerTagline: 'مهندس تصميم ميكانيكي | CAD/CAM وبرمجة CNC',
    footerCopy: '© {year} عيسى الحمصي. جميع الحقوق محفوظة.',
    typingStrings: ['مهندس تصميم ميكانيكي', 'مهندس CAD/CAM', 'مبرمج CNC']
  }
};

/* ─────────────── STATE ─────────────── */
let currentLang = 'en';                       // English is the default
try {
  const saved = localStorage.getItem('issa-lang');
  if (saved === 'ar' || saved === 'en') currentLang = saved;
} catch (e) { /* storage unavailable */ }

let typing = { si: 0, ci: 0, deleting: false, timer: null };

/* ─────────────── i18n ─────────────── */
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  currentLang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t.pageTitle;

  const meta = $('meta[name="description"]');
  if (meta) meta.content = t.metaDesc;
  const ogT = $('meta[property="og:title"]');
  if (ogT) ogT.content = t.pageTitle;
  const ogD = $('meta[property="og:description"]');
  if (ogD) ogD.content = t.metaDesc;

  const year = String(new Date().getFullYear());
  $$('[data-i18n]').forEach(el => {
    const raw = t[el.dataset.i18n];
    if (raw === undefined) return;
    el.innerHTML = raw.replace('{year}', year).replace(/\n/g, '<br/>');
  });

  $$('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(',').forEach(pair => {
      const [attr, key] = pair.trim().split('|');
      if (t[key] !== undefined) el.setAttribute(attr, t[key]);
    });
  });

  /* Project image alt text follows the project title */
  $$('.project-card').forEach(card => {
    const img = $('img', card);
    const title = $('.proj-title', card);
    if (img && title) img.alt = t.altPrefix + title.textContent;
  });

  /* Language toggle shows the language you can switch TO */
  const btn = $('#langToggle');
  if (btn) btn.setAttribute('aria-label', t.langAria);
  const label = $('#langLabel');
  if (label) label.textContent = t.langLabel;

  /* Typing effect */
  clearTimeout(typing.timer);
  typing = { si: 0, ci: 0, deleting: false, timer: null };
  startTyping(t.typingStrings);

  /* If modal is open, refresh its text */
  if ($('#modalOverlay').classList.contains('open') && openProject) fillModal(openProject);

  try { localStorage.setItem('issa-lang', lang); } catch (e) { /* ignore */ }
}

function switchLanguage() {
  applyTranslations(currentLang === 'en' ? 'ar' : 'en');
}

/* ─────────────── TYPING EFFECT ─────────────── */
function startTyping(strings) {
  const el = $('#typedText');
  if (!el || !strings || !strings.length) return;
  el.textContent = '';
  const cursor = $('.cursor-blink');
  if (reduceMotion) {
    el.textContent = strings[0];
    if (cursor) cursor.hidden = true;
    return;
  }
  if (cursor) cursor.hidden = false;

  function tick() {
    const str = strings[typing.si % strings.length];
    el.textContent = str.slice(0, typing.ci);
    if (!typing.deleting && typing.ci === str.length) {
      typing.timer = setTimeout(() => { typing.deleting = true; tick(); }, 2000);
      return;
    }
    if (typing.deleting && typing.ci === 0) {
      typing.deleting = false;
      typing.si = (typing.si + 1) % strings.length;
    }
    typing.ci += typing.deleting ? -1 : 1;
    typing.timer = setTimeout(tick, typing.deleting ? 40 : 80);
  }
  typing.timer = setTimeout(tick, 600);
}

/* ─────────────── CONFIG-DRIVEN DETAILS ─────────────── */
function safeUrl(u) {
  u = (u || '').trim();
  return /^https?:\/\//i.test(u) ? u : '';
}

function setupContactDetails() {
  const email = (CFG.ISSA_EMAIL || '').trim();
  const phone = (CFG.ISSA_PHONE || '').trim();
  const linkedin = safeUrl(CFG.ISSA_LINKEDIN);
  const github = safeUrl(CFG.ISSA_GITHUB);

  function fill(key, href, text) {
    const a = $('[data-contact="' + key + '"]');
    if (!a) return;
    a.href = href;
    a.textContent = text;           // replaces the "coming soon" span (and its data-i18n)
    const wrap = $('[data-contact-wrap="' + key + '"]');
    if (wrap) wrap.hidden = false;
  }
  if (email) fill('email', 'mailto:' + email, email);
  if (phone) fill('phone', 'tel:' + phone.replace(/[^\d+]/g, ''), phone);
  if (linkedin) fill('linkedin', linkedin, linkedin.replace(/^https?:\/\/(www\.)?/i, ''));
  if (github) fill('github', github, github.replace(/^https?:\/\/(www\.)?/i, ''));

  const fs = { linkedin, github, email: email ? 'mailto:' + email : '' };
  $$('[data-footer-social]').forEach(a => {
    const href = fs[a.dataset.footerSocial];
    if (href) { a.href = href; a.hidden = false; }
  });

  /* Profile photo: shown only if the file really loads; otherwise the placeholder stays */
  const photo = (CFG.ISSA_PHOTO_PATH || '').trim();
  const photoImg = $('#heroPhotoImg');
  if (photo && photoImg) {
    const probe = new Image();
    probe.onload = () => {
      photoImg.src = photo;
      photoImg.alt = 'Issa Alhomsi';
      photoImg.hidden = false;
      $('#heroPhoto').classList.add('has-photo');
    };
    probe.src = photo;
  }
}

async function setupCV() {
  const path = (CFG.ISSA_CV_PATH || '').trim();
  const links = $$('.cv-link');
  if (path) {
    links.forEach(a => {
      a.href = path;
      a.setAttribute('download', '');
      a.classList.remove('is-disabled');
      a.removeAttribute('aria-disabled');
    });
    const note = $('#cvNote');
    if (note) note.hidden = true;
  }
}

/* ─────────────── NAVBAR ─────────────── */
const navbar = $('#navbar');
const navToggle = $('#navToggle');
const navLinks = $('#navLinks');
const navWrap = navLinks ? navLinks.closest('nav') : null;

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  if (navWrap) navWrap.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
}
navToggle?.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
$$('.nav-link').forEach(l => l.addEventListener('click', () => setMenu(false)));

function updateActiveLink() {
  let current = '';
  $$('main section[id]').forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  $$('.nav-link').forEach(l => {
    const on = l.getAttribute('href') === '#' + current;
    l.classList.toggle('active', on);
    if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
  });
}

const backTop = $('#backTop');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    backTop.classList.toggle('visible', window.scrollY > 500);
    updateActiveLink();
    ticking = false;
  });
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

/* ─────────────── SCROLL REVEAL ─────────────── */
const revealEls = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ─────────────── PROJECT FILTER ─────────────── */
$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    const f = btn.dataset.filter;
    $$('.project-card').forEach(card => {
      const cats = (card.dataset.cat || '').split(/\s+/);
      card.hidden = !(f === 'all' || cats.includes(f));
    });
  });
});

/* ─────────────── PROJECT IMAGES (fallback if a file is missing) ─────────────── */
$$('.proj-img img').forEach(img => {
  const mark = () => img.parentElement.classList.add('img-missing');
  img.addEventListener('error', mark);
  if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) mark();
});

/* ─────────────── PROJECT MODAL ─────────────── */
const overlay = $('#modalOverlay');
const modalTitle = $('#modalTitle');
const modalDesc = $('#modalDesc');
let openProject = null;
let lastFocus = null;

function fillModal(key) {
  const t = translations[currentLang];
  modalTitle.textContent = t[key + 'Title'] || '';
  modalDesc.textContent = t[key + 'Modal'] || t[key + 'Desc'] || '';
}
function openModal(key, trigger) {
  openProject = key;
  lastFocus = trigger || document.activeElement;
  fillModal(key);
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('#modalClose').focus();
}
function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  openProject = null;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
$$('.proj-view-btn').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.closest('.project-card').dataset.proj, btn));
});
$('#modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (overlay.classList.contains('open')) closeModal();
    else if (navLinks.classList.contains('open')) setMenu(false);
  }
  /* Keep focus inside the open dialog */
  if (e.key === 'Tab' && overlay.classList.contains('open')) {
    e.preventDefault();
    $('#modalClose').focus();
  }
});

/* ─────────────── CONTACT FORM ───────────────
   There is no back-end on GitHub Pages. The form either:
   - posts to CFG.ISSA_FORM_ENDPOINT (if you set one), or
   - opens the visitor's email app addressed to CFG.ISSA_EMAIL.
   If neither is set, it says so instead of pretending to send.        */
const form = $('#contactForm');
const statusEl = $('#formStatus');

function setStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = 'form-status' + (type ? ' ' + type : '');
}
function fieldError(inputId, errId, msg) {
  const input = $('#' + inputId);
  $('#' + errId).textContent = msg;
  if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
}

form?.addEventListener('submit', async e => {
  e.preventDefault();
  const t = translations[currentLang];
  const name = $('#fname'), email = $('#femail'), msg = $('#fmsg'), subject = $('#fsubject');
  setStatus('');

  let firstBad = null;
  const nameBad  = !name.value.trim();
  const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  const msgBad   = msg.value.trim().length < 10;
  fieldError('fname', 'nameErr', nameBad ? t.errName : '');
  fieldError('femail', 'emailErr', emailBad ? t.errEmail : '');
  fieldError('fmsg', 'msgErr', msgBad ? t.errMsg : '');
  if (nameBad) firstBad = name; else if (emailBad) firstBad = email; else if (msgBad) firstBad = msg;
  if (firstBad) { firstBad.focus(); return; }

  const endpoint = safeUrl(CFG.ISSA_FORM_ENDPOINT);
  const to = (CFG.ISSA_EMAIL || '').trim();

  if (endpoint) {
    const btn = $('#formSubmit');
    btn.disabled = true;
    setStatus(t.formSending);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(), email: email.value.trim(),
          subject: subject.value.trim(), message: msg.value.trim()
        })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      setStatus(t.formSent, 'ok');
    } catch (err) {
      setStatus(t.formFail, 'err');
    } finally {
      btn.disabled = false;
    }
    return;
  }

  if (to) {
    const subj = subject.value.trim() || ('Portfolio message from ' + name.value.trim());
    const body = msg.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')';
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
    setStatus(t.formMailto, 'ok');
    return;
  }

  setStatus(t.formUnavailable, 'err');
});

/* ─────────────── SMOOTH ANCHORS ─────────────── */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = $(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    }
  });
});

/* ─────────────── INIT ─────────────── */
$('#langToggle')?.addEventListener('click', switchLanguage);
setupContactDetails();
applyTranslations(currentLang);
setupCV();
updateActiveLink();
