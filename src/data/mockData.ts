import { PhotoItem, ClubEvent, Announcement, WeeklyChallenge, MemberSpotlight, UserProfile, PhotoSubmission, NewsArticle, TutorialLesson, StudentPhotographerProfile } from '../types';

export const STUDENT_PROFILES: StudentPhotographerProfile[] = [
  {
    id: 'student-aaron',
    name: 'Aaron Peng',
    nameZh: '彭奕博 (Aaron Peng)',
    grade: 'Grade 11',
    gradeZh: '11年级 (高二)',
    gradeFr: '11e année',
    roleEn: 'Sports & Event Lead Photographer',
    roleZh: '体育与赛场主摄影师',
    roleFr: 'Photographe en chef Sport & Événements',
    specialtyEn: 'High-speed sports action, sideline dynamics & 400mm telephoto captures',
    specialtyZh: '赛场高速动态抓拍、边线对抗瞬间与超远摄特写',
    specialtyFr: 'Action sportive haute vitesse, dynamique de terrain et téléobjectif 400 mm',
    gear: 'Sony α7R VI / a7r6 · FE 100-400mm f/4.5-5.6 GM OSS · FE 70-200mm f/2.8 GM II',
    bioEn: 'Sideline photo lead regularly covering Vancouver FC, UBC Thunderbirds, and Vancouver Canadians fixtures across the Lower Mainland.',
    bioZh: 'Point Grey 摄影社体育主摄影师。常年驻守温哥华FC、UBC雷鸟队及温哥华加拿大人棒球队主场边线，专注定格草屑飞溅与胜负毫厘之争。',
    bioFr: 'Photographe de terrain couvrant les matchs du Vancouver FC, des UBC Thunderbirds et des Vancouver Canadians.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'student-chengyi',
    name: 'Chengyi Shan',
    nameZh: '单承益 (Chengyi Shan)',
    grade: 'Grade 12',
    gradeZh: '12年级 (高三)',
    gradeFr: '12e année',
    roleEn: 'Landscape & Long Exposure Curator',
    roleZh: '风光与慢门艺术主管',
    roleFr: 'Responsable Paysages & Poses Longues',
    specialtyEn: 'Pacific Northwest coastal seascapes, alpine ridges & ND long-exposure atmospheres',
    specialtyZh: '太平洋西北海岸海景、高山雪脊与减光镜极简慢门',
    specialtyFr: 'Paysages côtiers du Pacifique, crêtes alpines et poses longues aux filtres ND',
    gear: 'Nikon Z8 · NIKKOR Z 14-30mm f/4 S · NIKKOR Z 70-200mm f/2.8 VR S',
    bioEn: 'Dedicated to capturing Vancouver’s tranquil coastlines, misty fir canopies in Pacific Spirit, and dramatic sea-to-sky mountain alpenglow.',
    bioZh: '痴迷于温哥华宁静的海平线、温哥华西区冷杉林晨雾以及海天公路沿线的高山金顶晨曦，擅长用大景深和细腻光影传递旷远之美。',
    bioFr: 'Passionné par les côtes tranquilles de Vancouver, la brume de Pacific Spirit et la lueur dorée des sommets alpins.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'student-shangshang',
    name: 'Shangshang Tang',
    nameZh: '唐尚尚 (Shangshang Tang)',
    grade: 'Grade 11',
    gradeZh: '11年级 (高二)',
    gradeFr: '11e année',
    roleEn: 'Architectural & Urban Geometry Lead',
    roleZh: '城市几何与建筑构图主创',
    roleFr: 'Responsable Architecture & Géométrie Urbaine',
    specialtyEn: 'Symmetrical glass facades, heritage atriums & urban structural lines',
    specialtyZh: '严苛对称性玻璃幕墙、历史建筑中庭阶梯与城市光影透视',
    specialtyFr: 'Façades vitrées symétriques, atriums historiques et perspectives urbaines',
    gear: 'Leica SL2-S · Vario-Elmarit-SL 24-70mm f/2.8 ASPH · APO-Summicron-SL 35mm f/2',
    bioEn: 'Explores the structural tension between modern glass curtain walls and century-old brick arches across Coal Harbour and Gastown.',
    bioZh: '探索高豪港摩天大楼与煤气镇百年青砖拱廊之间的结构张力，运用德味高宽容度镜头捕捉光线在建筑棱角间的折射。',
    bioFr: 'Explore la tension visuelle entre les gratte-ciel en verre de Coal Harbour et les arches patrimoniales de Gastown.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'student-amber',
    name: 'Amber Hao',
    nameZh: '郝安柏 (Amber Hao)',
    grade: 'Grade 11',
    gradeZh: '11年级 (高二)',
    gradeFr: '11e année',
    roleEn: 'Macro & Darkroom Chemistry Specialist',
    roleZh: '微距光学与传统暗房实验师',
    roleFr: 'Spécialiste Macro & Développement Argentique',
    specialtyEn: 'Ultra-macro focus stacking, crystalline botanicals & 35mm silver halide chemistry',
    specialtyZh: '微距超景深合成、植物霜晶微观世界与35mm传统银盐暗房冲洗',
    specialtyFr: 'Empilement de focus macro, cristaux végétaux et tirage argentique noir et blanc',
    gear: 'OM System OM-1 · M.Zuiko 90mm f/3.5 Macro IS PRO · Leica M6 (Ilford HP5 Plus)',
    bioEn: 'Combines micro-world optical precision with authentic manual film chemistry in Room 214 safelight workshops.',
    bioZh: '在社团214暗房安全灯下精细操作银盐显影，同时使用计算微距探秘晨露折射与植物脉络的微观奇迹。',
    bioFr: 'Allie précision optique du nanomonde et tirage manuel sous lumière inactinique au labo 214.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'student-justin',
    name: 'Justin Zhang',
    nameZh: '张家铭 (Justin Zhang)',
    grade: 'Grade 12',
    gradeZh: '12年级 (高三)',
    gradeFr: '12e année',
    roleEn: 'Street Documentary & Colorist Lead',
    roleZh: '街头纪实与电影色彩主管',
    roleFr: 'Responsable Photo de Rue & Étalonnage',
    specialtyEn: 'Vancouver rainy twilight reflections, neon cyber-palettes & documentary storytelling',
    specialtyZh: '温哥华雨夜霓虹倒影、街头人文光影与富士胶片模拟色彩',
    specialtyFr: 'Reflets nocturnes pluvieux, palettes néons et narration documentaire de rue',
    gear: 'Fujifilm X-T5 · XF 33mm f/1.4 R LM WR · XF 23mm f/1.4 R LM WR',
    bioEn: 'Documenting Granville Street neon reflections, Chinatown alleyways, and the emotional heartbeat of Vancouver nightwalkers.',
    bioZh: '常年漫步于格兰维尔娱乐区与华埠街巷，用大光圈定焦镜头捕捉温哥华雨夜中被霓虹点亮的市井温度与孤独背影。',
    bioFr: 'Chroniqueur des reflets de Granville, des ruelles de Chinatown et de la vie nocturne vancouvéroise.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'student-bruce',
    name: 'Bruce Guo',
    nameZh: '郭博睿 (Bruce Guo)',
    grade: 'Grade 10',
    gradeZh: '10年级 (高一)',
    gradeFr: '10e année',
    roleEn: 'Environmental Portrait & Editorial Stylist',
    roleZh: '环境人像与社团光影肖像师',
    roleFr: 'Photographe Portrait Environnemental & Éditorial',
    specialtyEn: 'Natural window chiaroscuro, golden hour backlight & cinematic editorial portraiture',
    specialtyZh: '自然窗光明暗法、西海岸落日逆光肖像与大礼堂电影感光束',
    specialtyFr: 'Clair-obscur naturel, portraits en contre-jour à l’heure dorée et lumière cinématique',
    gear: 'Canon EOS R6 Mark II · RF 85mm f/1.2 L USM · RF 50mm f/1.2 L USM',
    bioEn: 'Focused on capturing student emotions, library contemplation, and youth spirit through extreme shallow depth-of-field optics.',
    bioZh: '擅长运用超大光圈定焦镜头营构梦幻散景，在Point Grey校园回廊与西班牙海岸记录同龄人真挚的情感神态。',
    bioFr: 'Saisit les émotions sincères des élèves et la contemplation studieuse grâce au bokeh des focales fixes.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-01',
    studentId: 'PG-2027-8812',
    name: 'Aaron Peng',
    email: 'jageraaron711@gmail.com',
    grade: 'Grade 11',
    role: 'curator_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Sports & events photographer regularly on the pitch and sidelines covering Vancouver FC, UBC Thunderbirds, and Vancouver Canadians home games.',
    bioZh: '11年级体育与赛事摄影师。经常在温哥华FC（Vancouver FC）、UBC雷鸟队（UBC Thunderbirds）和温哥华加拿大人棒球队（Vancouver Canadians）主场拍摄比赛。',
    bioFr: 'Photographe de sport et d’événements. Couvre régulièrement les matchs à domicile du Vancouver FC, des UBC Thunderbirds et des Vancouver Canadians.',
    cameraGear: 'Sony a7r6, a7m5, a6700, Canon EOS-1V | 100-400mm, 200-600mm, 70-200mm, 24-105mm, 14mm',
    joinedDate: '2024-09-01',
    submittedPhotoCount: 8,
    approvedPhotoCount: 7,
  },
  {
    id: 'user-02',
    studentId: 'PG-2027-4491',
    name: 'Justin Zhang',
    email: 'justin930408@gmail.com',
    grade: 'Grade 11',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Grade 11 executive member. Passionate about urban architectural geometry, school event coverage, and darkroom chemistry.',
    bioZh: '11年级核心社员。专注于城市建筑几何、大型校园活动纪实与传统暗房显影工艺。',
    bioFr: 'Membre exécutif de 11e année. Passionné par l’architecture urbaine, les événements scolaires et le développement argentique.',
    cameraGear: 'Sony A7 IV + FE 35mm f/1.4 GM / FE 16-35mm f/2.8 GM II',
    joinedDate: '2024-09-15',
    submittedPhotoCount: 5,
    approvedPhotoCount: 4,
  },
  {
    id: 'user-03',
    studentId: 'PG-2026-1092',
    name: 'Amber Hao',
    email: 'amber.hao@pointgrey.vsb.bc.ca',
    grade: 'Grade 12',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Grade 12 senior executive. Exploring natural window light, fine art portraiture, and editorial visual storytelling.',
    bioZh: '12年级资深理事。热衷于自然光人像摄影、时尚杂志叙事风格与胶片质感创作。',
    bioFr: 'Membre senior de 12e année. Spécialisée en portrait en lumière naturelle et narration visuelle éditoriale.',
    cameraGear: 'Canon EOS R5 + RF 85mm f/1.2 L / RF 50mm f/1.2 L',
    joinedDate: '2023-09-01',
    submittedPhotoCount: 6,
    approvedPhotoCount: 6,
  },
  {
    id: 'user-admin',
    studentId: 'PG-FACULTY-01',
    name: 'Mr. David Harrison',
    email: 'dharrison@vsb.bc.ca',
    grade: 'Faculty Advisor',
    role: 'curator_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'Head of Visual Arts & Club Sponsor. Darkroom & exhibition curator.',
    bioZh: '视觉艺术系主任兼社团指导教师，暗房与影展总策展。',
    bioFr: 'Chef du département des arts visuels et superviseur du club. Conservateur chambre noire et expositions.',
    cameraGear: 'Leica M11 + 35mm Summilux / Hasselblad 907X',
    joinedDate: '2018-09-01',
    submittedPhotoCount: 12,
    approvedPhotoCount: 12,
  }
];

export const INITIAL_SUBMISSIONS: PhotoSubmission[] = [
  {
    id: 'sub-01',
    studentId: 'PG-2027-4491',
    studentName: 'Chloe Zhang',
    studentGrade: 'Grade 11',
    studentEmail: 'c.zhang@pointgrey.vsb.bc.ca',
    title: 'Rainy Alleyway Neon Reflections',
    titleZh: '雨巷霓虹倒影：市中心迷踪',
    titleFr: 'Reflets Néon d’une Ruelle Pluvieuse',
    category: 'street',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 33mm f/1.4 R LM WR',
      focalLength: '33mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/125s',
      iso: '800',
      location: 'Granville St & Robson, Vancouver',
      date: '2026-06-02',
    },
    description: 'Shot after heavy coastal rain. The puddle creates a perfect cybernetic mirror.',
    descriptionZh: '雨后地面积水反射温哥华市中心的霓虹灯光，营造出赛博朋克般的电影氛围。',
    descriptionFr: 'Pris après une pluie côtière. La flaque d’eau crée un miroir cybernétique parfait.',
    tags: ['Street', 'Rain', 'Neon', 'Cyberpunk'],
    submittedAt: '2026-08-25T14:30:00Z',
    status: 'approved',
    curatorFeedback: 'Excellent dynamic range and compositional symmetry in the reflection.',
    curatorFeedbackZh: '倒影构图极佳，色彩层次鲜明，已入选优秀作品库展出。',
    curatorFeedbackFr: 'Excellente plage dynamique et belle symétrie de composition dans le reflet.',
  },
  {
    id: 'sub-02',
    studentId: 'PG-2028-1092',
    studentName: 'Lucas Vance',
    studentGrade: 'Grade 10',
    studentEmail: 'l.vance@pointgrey.vsb.bc.ca',
    title: 'Autumn Frost on Japanese Maple',
    titleZh: '初霜红枫：Point Grey 庭院微光',
    titleFr: 'Givre d’Automne sur Érable Japonais',
    category: 'macro',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Nikon Z8',
      lens: 'NIKKOR Z MC 105mm f/2.8 VR S',
      focalLength: '105mm',
      aperture: 'f/3.2',
      shutterSpeed: '1/400s',
      iso: '160',
      location: 'Point Grey Courtyard Garden',
      date: '2026-08-28',
    },
    description: 'Early morning frost crystals sparkling on the school courtyard maple veins.',
    descriptionZh: '清晨校园中庭日本红枫叶脉上的冰晶微距特写，背光虚化柔美。',
    descriptionFr: 'Cristaux de givre matinaux scintillants sur les nervures d’érable du jardin de l’école.',
    tags: ['Macro', 'Maple', 'Autumn', 'Frost'],
    submittedAt: '2026-08-29T09:15:00Z',
    status: 'pending',
    curatorFeedback: 'Under review for the September Theme Challenge showcase.',
    curatorFeedbackZh: '正在由策展组评审中，有望入选九月月度主题精选。',
    curatorFeedbackFr: 'En cours d’évaluation pour la sélection du défi mensuel de septembre.',
  },
  {
    id: 'sub-03',
    studentId: 'PG-2029-7734',
    studentName: 'Daniel Kim',
    studentGrade: 'Grade 9',
    studentEmail: 'd.kim@pointgrey.vsb.bc.ca',
    title: 'SkyTrain Kinetic Motion Blur',
    titleZh: '城市飞驰：天车动态模糊',
    titleFr: 'Flou Cinétique du SkyTrain',
    category: 'experimental',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Sony A6700',
      lens: 'E 18-50mm f/2.8 DC DN',
      focalLength: '24mm',
      aperture: 'f/11',
      shutterSpeed: '1/4s',
      iso: '100',
      location: 'Commercial-Broadway SkyTrain Station',
      date: '2026-08-27',
    },
    description: 'Panning shot capturing the speed and kinetic energy of the morning commuter rush.',
    descriptionZh: '追焦拍摄记录晨间高峰期疾驰的天车，动静结合。',
    descriptionFr: 'Filé photographique capturant la vitesse et l’énergie cinétique de l’heure de pointe matinale.',
    tags: ['Panning', 'MotionBlur', 'Transit', 'Vancouver'],
    submittedAt: '2026-08-30T11:45:00Z',
    status: 'pending',
  }
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  // ================= AARON PENG (3 Works) =================
  {
    id: 'photo-aaron-01',
    title: 'Matchday Climax: Vancouver FC & Thunderbirds Pitchside',
    titleZh: '绿茵烽火：温哥华FC与雷鸟队主场激战瞬息',
    titleFr: 'Jour de Match : Vancouver FC & Thunderbirds au Cœur de l’Action',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    year: '2026',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Sony α7R VI / a7r6',
      lens: 'FE 100-400mm f/4.5-5.6 GM OSS',
      focalLength: '400mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/3200s',
      iso: '800',
      location: 'Willoughby Community Park Stadium, Langley',
      date: '2026-06-15',
    },
    description: 'Freezing peak athletic intensity and explosive counterattacks from the sidelines. Captured across home fixtures for Vancouver FC and UBC Thunderbirds.',
    descriptionZh: '定格赛场边线高动态对抗瞬间。常年驻守温哥华FC与UBC雷鸟队主场，记录草屑飞溅与决定胜负的高光刹那。',
    descriptionFr: 'Figeant l’intensité sportive au sommet et les contre-attaques fulgurantes en bord de touche lors des matchs du Vancouver FC.',
    likes: 185,
    featured: true,
    award: 'Pacific Northwest Sports Action Gold Medal',
    awardZh: '太平洋西北区体育与赛事动作摄影金奖',
    awardFr: 'Médaille d’Or de la Photo Sportive du Pacifique Nord-Ouest',
    tags: ['Sports', 'VancouverFC', 'HighSpeed', 'Sidelines', '400mm'],
    createdAt: '2026-06-16',
    critiques: [
      {
        id: 'c-aaron-1',
        author: 'Mr. Harrison (Club Sponsor)',
        role: 'Visual Arts Dept',
        comment: 'Razor-sharp tracking on the football leather and flying turf beads. Superb high-speed discipline!',
        commentZh: '对足球皮质纹理与飞溅草屑的焦点追踪极其锐利，超高速快门掌控力极佳！',
        time: '3 days ago',
        rating: 5,
      }
    ],
  },
  {
    id: 'photo-aaron-02',
    title: 'Breakaway Velocity: Track & Field Sprint Finish',
    titleZh: '破风瞬间：百米田径终点线的疾速冲刺',
    titleFr: 'Vitesse de Rupture : Sprint sur la Ligne d’Arrivée',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    year: '2026',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Sony α7R VI',
      lens: 'FE 70-200mm f/2.8 GM OSS II',
      focalLength: '135mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/4000s',
      iso: '400',
      location: 'UBC Thunderbird Stadium, Point Grey',
      date: '2026-05-28',
    },
    description: 'The explosive chest drive breaking the tape at the high school track invitational. Perfectly frozen muscle contours in midday sun.',
    descriptionZh: '高中田径邀请赛百米决赛压线冲刺瞬间。正午顶光下清晰凝结肌肉紧绷线条与撞线瞬间的张力。',
    descriptionFr: 'L’élan explosif franchissant la ligne d’arrivée lors des championnats lycéens d’athlétisme.',
    likes: 152,
    featured: false,
    tags: ['TrackAndField', 'Sprint', 'Athletics', 'PointGreyHounds', 'Action'],
    createdAt: '2026-05-29',
    critiques: [],
  },
  {
    id: 'photo-aaron-03',
    title: 'Dusk Over Coastlines & Breaking Swells',
    titleZh: '西海岸暮色防波堤与奔涌浪潮',
    titleFr: 'Crépuscule Côtier et Déferlantes Pacifiques',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    year: '2025',
    category: 'landscape',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Sony α7R VI',
      lens: 'FE 24-70mm f/2.8 GM II',
      focalLength: '35mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/15s',
      iso: '100',
      location: 'Wreck Beach & Point Grey Foreshore',
      date: '2025-10-18',
    },
    description: 'Golden hour Pacific twilight crashing over the foreshore boulders with dynamic tidal motion.',
    descriptionZh: '利用慢门展现退潮时分拍击在西海岸防波石上的温润海浪，与远处乔治亚海峡的晚霞相映成趣。',
    descriptionFr: 'Crépuscule doré sur l’estran de Point Grey où les vagues viennent se briser contre les rochers.',
    likes: 124,
    featured: false,
    tags: ['Coast', 'PacificNorthwest', 'GoldenHour', 'Waves', 'PointGrey'],
    createdAt: '2025-10-19',
    critiques: [],
  },

  // ================= CHENGYI SHAN (3 Works) =================
  {
    id: 'photo-chengyi-01',
    title: 'Kitsilano Twilight Tide & Driftwood Solitude',
    titleZh: '基斯兰奴海滩的暮色孤影与慢门潮汐',
    titleFr: 'Solitude Crépusculaire et Marée de Soie à Kitsilano',
    author: 'Chengyi Shan',
    authorGrade: 'Grade 12',
    year: '2026',
    category: 'landscape',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Nikon Z8',
      lens: 'NIKKOR Z 14-30mm f/4 S',
      focalLength: '18mm',
      aperture: 'f/11',
      shutterSpeed: '30s (10-stop ND filter)',
      iso: '64',
      location: 'Kitsilano Point, Vancouver',
      date: '2026-04-12',
    },
    description: 'A 30-second long exposure converting turbulent Pacific swells into smooth silk around weathered cedar driftwood.',
    descriptionZh: '使用10档减光镜进行30秒慢门长曝光，将拍打在雪松漂木旁的浪潮化作如丝绸般柔滑的青蓝冷雾。',
    descriptionFr: 'Pose longue de 30 secondes transformant la houle en nappe de soie autour d’un bois flotté de cèdre.',
    likes: 168,
    featured: true,
    award: 'BC Youth Coastal Landscape Honors',
    awardZh: '卑诗省青少年海岸风光优胜奖',
    awardFr: 'Prix d’Honneur du Paysage Côtier de C.-B.',
    tags: ['LongExposure', 'Coast', 'BlueHour', 'Minimalism', 'NikonZ8'],
    createdAt: '2026-04-13',
    critiques: [
      {
        id: 'c-chengyi-1',
        author: 'Aaron Peng',
        role: 'Club Executive',
        comment: 'The tonal gradient from the foreground driftwood to the snowy North Shore peaks is immaculate.',
        commentZh: '从前景古老漂木到远方北岸雪山暗影的明暗层次过渡极其细腻！',
        time: '2 days ago',
        rating: 5,
      }
    ],
  },
  {
    id: 'photo-chengyi-02',
    title: 'Cathedral of Mist in Pacific Spirit',
    titleZh: '太平洋精神公园：巨杉林间的丁达尔圣光',
    titleFr: 'Cathédrale de Brume à Pacific Spirit',
    author: 'Chengyi Shan',
    authorGrade: 'Grade 12',
    year: '2026',
    category: 'landscape',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Nikon Z8',
      lens: 'NIKKOR Z 24-120mm f/4 S',
      focalLength: '45mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/200s',
      iso: '160',
      location: 'Pacific Spirit Regional Park, Vancouver',
      date: '2026-05-18',
    },
    description: 'Luminous sunbeams piercing dense maritime fog across ancient Douglas firs along the university perimeter trail.',
    descriptionZh: '清晨海雾弥漫时分，第一缕朝阳穿透百年冷杉树冠，在大学林间小径构筑出神圣的丁达尔光柱。',
    descriptionFr: 'Rayons dorés perçant la brume marine matinale à travers la canopée séculaire des sapins de Douglas.',
    likes: 142,
    featured: true,
    award: 'PGSS Annual Exhibition Gold Medal',
    awardZh: 'PGSS年度影展金奖',
    awardFr: 'Médaille d’Or de l’Exposition Annuelle PGSS',
    tags: ['Forest', 'GodRays', 'GoldenHour', 'PacificSpirit', 'Atmospheric'],
    createdAt: '2026-05-19',
    critiques: [],
  },
  {
    id: 'photo-chengyi-03',
    title: 'Alpine Glow on Garibaldi Ridge',
    titleZh: '加里波第雪脊的日照金山',
    titleFr: 'Lumière Alpine sur la Crête Garibaldi',
    author: 'Chengyi Shan',
    authorGrade: 'Grade 12',
    year: '2025',
    category: 'landscape',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Nikon Z8',
      lens: 'NIKKOR Z 70-200mm f/2.8 VR S',
      focalLength: '180mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/500s',
      iso: '100',
      location: 'Sea-to-Sky Alpine Corridor',
      date: '2025-11-04',
    },
    description: 'Sublime magenta and amber alpenglow illuminating glacier serrations above the sea-to-sky mountain sea.',
    descriptionZh: '远摄镜头压缩雪峰群峦，将加里波第冰川山脊在日落时分染上的壮丽洋红与琥珀金辉尽收眼底。',
    descriptionFr: 'Alpenglow flamboyant sur les séracs et arêtes glaciaires du corridor Sea-to-Sky.',
    likes: 119,
    featured: false,
    tags: ['Alpine', 'Glacier', 'Alpenglow', 'Mountains', 'Telephoto'],
    createdAt: '2025-11-05',
    critiques: [],
  },

  // ================= SHANGSHANG TANG (3 Works) =================
  {
    id: 'photo-shangshang-01',
    title: 'Symmetrical Monolith: Coal Harbour Glass Curtain',
    titleZh: '几何棱镜：高豪港玻璃天幕与天际倒影',
    titleFr: 'Monolithe Symétrique : Façades de Coal Harbour',
    author: 'Shangshang Tang',
    authorGrade: 'Grade 11',
    year: '2026',
    category: 'architecture',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'Vario-Elmarit-SL 24-70mm f/2.8 ASPH',
      focalLength: '28mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/320s',
      iso: '100',
      location: 'Coal Harbour Financial Waterfront, Vancouver',
      date: '2026-05-10',
    },
    description: 'Strict symmetrical composition framing the glass curtain walls reflecting passing summer cirrus clouds.',
    descriptionZh: '严谨的中轴对称几何构图，将现代建筑的通透玻璃幕墙与流动的高空卷云收纳进德系高解析度视野。',
    descriptionFr: 'Composition symétrique rigoureuse encadrant les façades de verre qui reflètent les cirrus estivaux.',
    likes: 138,
    featured: true,
    award: 'Vancouver Architectural Composition First Prize',
    awardZh: '温哥华城市建筑构图一等奖',
    awardFr: 'Premier Prix de Composition Architecturale de Vancouver',
    tags: ['Architecture', 'Symmetry', 'Modern', 'Reflections', 'Leica'],
    createdAt: '2026-05-11',
    critiques: [
      {
        id: 'c-tang-1',
        author: 'Justin Zhang',
        role: 'Photo Lead',
        comment: 'Zero barrel distortion and razor-sharp corner lines. The reflection looks like an abstract oil painting.',
        commentZh: '畸变矫正极为精准，边缘线条利落，玻璃反光宛如一幅抽象画！',
        time: '1 day ago',
        rating: 5,
      }
    ],
  },
  {
    id: 'photo-shangshang-02',
    title: 'Helical Ascendance: Art Gallery Heritage Atrium',
    titleZh: '螺旋阶梯的静默旋律：美术馆中庭光影',
    titleFr: 'Ascendance Hélicoïdale : Atrium Patrimonial de la Galerie d’Art',
    author: 'Shangshang Tang',
    authorGrade: 'Grade 11',
    year: '2026',
    category: 'architecture',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'APO-Summicron-SL 35mm f/2 ASPH',
      focalLength: '35mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/125s',
      iso: '400',
      location: 'Vancouver Art Gallery Heritage Wing',
      date: '2026-04-18',
    },
    description: 'Fibonacci spiral staircase geometry captured in monochrome balance beneath overhead skylight diffusing panes.',
    descriptionZh: '斐波那契黄金螺旋构图，大理石扶手在顶部天光漫反射下勾勒出宁静典雅的黑白律动。',
    descriptionFr: 'Spirale de Fibonacci sous le puits de jour tamisé de l’atrium historique.',
    likes: 106,
    featured: false,
    tags: ['Spiral', 'Fibonacci', 'Monochrome', 'Geometry', 'Interior'],
    createdAt: '2026-04-19',
    critiques: [],
  },
  {
    id: 'photo-shangshang-03',
    title: 'Iron Arteries at Waterfront Intermodal Station',
    titleZh: '暮色铁道：海滨车站的几何钢构与晚霞',
    titleFr: 'Artères de Fer à la Gare Intermodale Waterfront',
    author: 'Shangshang Tang',
    authorGrade: 'Grade 11',
    year: '2025',
    category: 'architecture',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'Vario-Elmarit-SL 24-70mm f/2.8 ASPH',
      focalLength: '50mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/60s',
      iso: '250',
      location: 'Waterfront Intermodal Station Overlook',
      date: '2025-09-24',
    },
    description: 'Steel railway tracks converging beneath evening violet skies, framing the industrial maritime soul of Vancouver.',
    descriptionZh: '交汇收拢的铁轨与港口钢架在紫暮中延展，凝聚着温哥华沿海交汇枢纽的工业诗意。',
    descriptionFr: 'Rails convergents sous un ciel violacé crépusculaire au-dessus des quais maritimes.',
    likes: 98,
    featured: false,
    tags: ['Railroad', 'Transit', 'UrbanLines', 'Dusk', 'Industrial'],
    createdAt: '2025-09-25',
    critiques: [],
  },

  // ================= AMBER HAO (3 Works) =================
  {
    id: 'photo-amber-01',
    title: 'Dewdrop Prism: Inverted Clock Tower World',
    titleZh: '微距棱镜：晨露折射中的校园钟楼',
    titleFr: 'Prisme de Rosée : Reflet Inversé de la Tour de l’Horloge',
    author: 'Amber Hao',
    authorGrade: 'Grade 11',
    year: '2026',
    category: 'macro',
    imageUrl: 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'OM System OM-1',
      lens: 'M.Zuiko 90mm f/3.5 Macro IS PRO',
      focalLength: '90mm (180mm eq.)',
      aperture: 'f/5.6 (15-shot stacking)',
      shutterSpeed: '1/160s',
      iso: '200',
      location: 'Point Grey Biology Courtyard Garden',
      date: '2026-05-30',
    },
    description: '15-shot in-camera focus stacking showing an inverted reflection of the school courtyard clock tower inside a 2mm morning dewdrop.',
    descriptionZh: '使用机内15张景深合成技术，在一颗仅2毫米的草叶晨露中完整倒映出Point Grey校园钟楼的轮廓。',
    descriptionFr: 'Focus stacking de 15 prises révélant la tour de l’horloge inversée dans une goutte de rosée de 2 mm.',
    likes: 174,
    featured: true,
    award: 'BC High School Macro Innovation Prize',
    awardZh: '卑诗省高中微距技术创新奖',
    awardFr: 'Prix d’Innovation Macro des Lycées de C.-B.',
    tags: ['Macro', 'FocusStacking', 'WaterDrop', 'CampusDetails', 'Optics'],
    createdAt: '2026-05-31',
    critiques: [
      {
        id: 'c-amber-1',
        author: 'Bruce Guo',
        role: 'Club Member',
        comment: 'The optics in that tiny sphere are unbelievable—the hands on the school clock are actually legible!',
        commentZh: '水滴球体内的光学成像令人惊叹，钟楼上的指针甚至清晰可辨！',
        time: '3 days ago',
        rating: 5,
      }
    ],
  },
  {
    id: 'photo-amber-02',
    title: 'Analog Chemistry: Room 214 Safelight Exposure',
    titleZh: '暗房显影的微光化学：Room 214 胶片实验',
    titleFr: 'Chimie Argentique : Salle 214 sous Lumière Inactinique',
    author: 'Amber Hao',
    authorGrade: 'Grade 11',
    year: '2026',
    category: 'experimental',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Leica M6 (Ilford HP5 Plus 400)',
      lens: 'Summicron-M 35mm f/2 ASPH',
      focalLength: '35mm',
      aperture: 'f/2.0',
      shutterSpeed: '1/15s',
      iso: '400 (Push to 1600 in D-76)',
      location: 'PGSS Darkroom Lab (Room 214)',
      date: '2026-04-28',
    },
    description: 'Captured under the amber safelight during a club film development workshop. Silver halide crystals emerging on fiber-based paper.',
    descriptionZh: '社团暗房214室在琥珀色安全灯下的胶片显影瞬间。展现银盐晶体在定影盘中缓缓浮现的经典摄影温度。',
    descriptionFr: 'Prise sous la lumière inactinique ambrée lors d’un atelier argentique du club. Émergence des cristaux d’argent.',
    likes: 156,
    featured: true,
    award: 'Analog Darkroom Fellowship Award',
    awardZh: '传统银盐暗房研创卓越奖',
    awardFr: 'Prix d’Excellence de Laboratoire Argentique',
    tags: ['Analog', 'FilmPhotography', '35mm', 'Darkroom', 'LeicaM6'],
    createdAt: '2026-04-29',
    critiques: [],
  },
  {
    id: 'photo-amber-03',
    title: 'Crystalline Veins: Autumn Leaf Frost Structures',
    titleZh: '冰霜脉络：秋枫叶脉的微观结晶之美',
    titleFr: 'Veines Cristallines : Givre Microscopique sur Feuille',
    author: 'Amber Hao',
    authorGrade: 'Grade 11',
    year: '2025',
    category: 'macro',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'OM System OM-1',
      lens: 'M.Zuiko 60mm f/2.8 Macro',
      focalLength: '60mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/250s',
      iso: '160',
      location: 'Kerrisdale Ravine Trail, Vancouver',
      date: '2025-11-12',
    },
    description: 'Microscopic crystalline frost formations outlining the cellular xylem structure of a fallen red maple leaf.',
    descriptionZh: '微距镜头下初霜在红枫叶脉边缘凝聚成六边形微型冰晶，纤毫毕现地展现大自然精妙的几何法则。',
    descriptionFr: 'Formations cristallines microscopiques soulignant les nervures cellulaires d’une feuille d’érable.',
    likes: 112,
    featured: false,
    tags: ['Frost', 'MapleLeaf', 'Microscopic', 'Autumn', 'Nature'],
    createdAt: '2025-11-13',
    critiques: [],
  },

  // ================= JUSTIN ZHANG (3 Works) =================
  {
    id: 'photo-justin-01',
    title: 'Neon Drift on Granville Rainy Night',
    titleZh: '格兰维尔街的雨夜霓虹与水洼镜像',
    titleFr: 'Dérive Néon sur Granville par Nuit de Pluie',
    author: 'Justin Zhang',
    authorGrade: 'Grade 12',
    year: '2026',
    category: 'street',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 33mm f/1.4 R LM WR',
      focalLength: '33mm (50mm eq.)',
      aperture: 'f/1.4',
      shutterSpeed: '1/125s',
      iso: '800',
      location: 'Granville Entertainment District, Downtown Vancouver',
      date: '2026-06-02',
    },
    description: 'Reflections after a coastal downpour. Sidewalk puddles amplify cinema neon signs and speeding transit buses.',
    descriptionZh: '温哥华雨后地面的湿润反光。人行道积水化作一面充满赛博感的镜子，倒映着剧院霓虹灯与匆匆掠过的城市光轨。',
    descriptionFr: 'Reflets après une averse côtière. Les flaques amplifient les enseignes cinématographiques et les bus de nuit.',
    likes: 162,
    featured: true,
    award: 'Vancouver Youth Street Photo Honor',
    awardZh: '温哥华青年街头摄影优胜奖',
    awardFr: 'Prix d’Honneur de la Photo de Rue Jeunesse Vancouver',
    tags: ['Cyberpunk', 'RainReflection', 'Street', 'Night', 'FujifilmColors'],
    createdAt: '2026-06-03',
    critiques: [
      {
        id: 'c-justin-1',
        author: 'Lucas Vance',
        role: 'Tech Lead',
        comment: 'Classic Classic Chrome simulation handling the mixed sodium and cyan neon tones with elegance.',
        commentZh: '富士经典正片色彩模拟将高钠黄与青蓝霓虹的光比调和得极富电影感！',
        time: '2 days ago',
        rating: 5,
      }
    ],
  },
  {
    id: 'photo-justin-02',
    title: 'Steam Clock Halo & Gastown Cobblestone Twilight',
    titleZh: '煤气镇蒸汽钟下的暮色光雾与青石街道',
    titleFr: 'Halo de l’Horloge à Vapeur à Gastown au Crépuscule',
    author: 'Justin Zhang',
    authorGrade: 'Grade 12',
    year: '2026',
    category: 'street',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 23mm f/1.4 R LM WR',
      focalLength: '23mm (35mm eq.)',
      aperture: 'f/1.4',
      shutterSpeed: '1/160s',
      iso: '640',
      location: 'Water Street & Cambie Street, Gastown Historic District',
      date: '2026-05-14',
    },
    description: 'Backlit steam plume puffing from the heritage clock every quarter hour, backdropped by vintage gas lanterns.',
    descriptionZh: '每隔十五分钟从百年蒸汽钟顶端喷涌而出的蒸汽在复古煤气路灯照耀下化作温暖光晕，抚过青石路上的行人格调。',
    descriptionFr: 'Plume de vapeur rétroéclairée s’élevant de l’horloge historique le long des pavés de Water Street.',
    likes: 125,
    featured: false,
    tags: ['Gastown', 'SteamClock', 'Cobblestone', 'Twilight', 'Atmospheric'],
    createdAt: '2026-05-15',
    critiques: [],
  },
  {
    id: 'photo-justin-03',
    title: 'Chinatown Night Market Shadows & Steam',
    titleZh: '唐人街夜市的烟火温度与市井人情',
    titleFr: 'Ombres et Vapeur au Marché Nocturne de Chinatown',
    author: 'Justin Zhang',
    authorGrade: 'Grade 12',
    year: '2025',
    category: 'street',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 56mm f/1.2 R WR',
      focalLength: '56mm (85mm eq.)',
      aperture: 'f/1.2',
      shutterSpeed: '1/200s',
      iso: '1000',
      location: 'Keefer Street & Pender Street, Chinatown',
      date: '2025-10-21',
    },
    description: 'Warm street-food steam cutting through glowing red lanterns and intimate conversation in historic Chinatown alleys.',
    descriptionZh: '红灯笼映衬下街头小吃摊腾腾升起的暖热蒸汽，定格老华埠夜晚深处温润的人情烟火。',
    descriptionFr: 'Vapeur de cuisine de rue s’élevant sous les lanternes rouges dans les ruelles du quartier historique.',
    likes: 108,
    featured: false,
    tags: ['Chinatown', 'NightMarket', 'Warmth', 'StreetCandid', 'Bokeh'],
    createdAt: '2025-10-22',
    critiques: [],
  },

  // ================= BRUCE GUO (3 Works) =================
  {
    id: 'photo-bruce-01',
    title: 'The Contemplative Reader in Courtyard Wing',
    titleZh: '老教学楼西翼：窗边的静默思索',
    titleFr: 'La Lectrice Contemplative dans l’Aile Cour',
    author: 'Bruce Guo',
    authorGrade: 'Grade 10',
    year: '2026',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=70',
    exif: {
      camera: 'Canon EOS R6 Mark II',
      lens: 'RF 85mm f/1.2 L USM',
      focalLength: '85mm',
      aperture: 'f/1.2',
      shutterSpeed: '1/500s',
      iso: '160',
      location: 'Point Grey Library / Courtyard Wing',
      date: '2026-05-24',
    },
    description: 'Natural chiaroscuro window lighting inside the school heritage wing. Focuses on the subtle gaze and fleeting contemplation during finals week.',
    descriptionZh: '利用Point Grey老教学楼西侧的自然侧窗光拍摄。捕捉期末周窗边专注而静谧的思索神态，85mm f/1.2 营造出如奶油般化开的柔美散景。',
    descriptionFr: 'Éclairage naturel en clair-obscur près des fenêtres du bâtiment historique. Regard délicat et contemplation studieuse.',
    likes: 172,
    featured: true,
    award: 'Best Environmental Portraiture 2026',
    awardZh: '2026年度最佳环境人像作品',
    awardFr: 'Prix du Meilleur Portrait Environnemental 2026',
    tags: ['Portrait', 'NaturalLight', 'Chiaroscuro', '85mmBokeh', 'SchoolLife'],
    createdAt: '2026-05-25',
    critiques: [
      {
        id: 'c-bruce-1',
        author: 'Shangshang Tang',
        role: 'Club Member',
        comment: 'The soft catchlight in the eyes combined with f/1.2 falloff makes this portrait feel completely effortless and poetic.',
        commentZh: '眼眸中的自然眼神光与 f/1.2 浅景深的平滑虚化配合天衣无缝，极具诗意。',
        time: '2 days ago',
        rating: 5,
      }
    ],
  },
  {
    id: 'photo-bruce-02',
    title: 'Golden Hour Silhouette by Spanish Banks Shoreline',
    titleZh: '西班牙海岸的金色落日逆光剪影',
    titleFr: 'Silhouette à l’Heure Dorée sur les Rives de Spanish Banks',
    author: 'Bruce Guo',
    authorGrade: 'Grade 10',
    year: '2026',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Canon EOS R6 Mark II',
      lens: 'RF 50mm f/1.2 L USM',
      focalLength: '50mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/1000s',
      iso: '100',
      location: 'Spanish Banks Beach, Point Grey',
      date: '2026-06-08',
    },
    description: 'Warm golden rim-light hugging hair and ocean breeze silhouettes against the setting Pacific horizon.',
    descriptionZh: '落日金辉勾勒出发丝边缘的璀璨金边，在温哥华夏夜海风中捕捉青春的身影与向海的守望。',
    descriptionFr: 'Lumière dorée soulignant les cheveux et la silhouette face à la brise marine et l’horizon du Pacifique.',
    likes: 139,
    featured: false,
    tags: ['Sunset', 'Backlight', 'SpanishBanks', 'GoldenHour', 'Silhouette'],
    createdAt: '2026-06-09',
    critiques: [],
  },
  {
    id: 'photo-bruce-03',
    title: 'Projector Dust & Rehearsal Concentration in Auditorium',
    titleZh: '大礼堂放映机光束下的专注瞬间',
    titleFr: 'Poussière de Projecteur & Répétition dans l’Auditorium',
    author: 'Bruce Guo',
    authorGrade: 'Grade 10',
    year: '2025',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=85',
    exif: {
      camera: 'Canon EOS R6 Mark II',
      lens: 'RF 28-70mm f/2 L USM',
      focalLength: '45mm',
      aperture: 'f/2.0',
      shutterSpeed: '1/200s',
      iso: '800',
      location: 'Point Grey Secondary Auditorium & Drama Wing',
      date: '2025-11-20',
    },
    description: 'Atmospheric theatrical spot beam revealing floating stage dust and the quiet dedication of student performers.',
    descriptionZh: '礼堂聚光灯光柱穿透微尘，照亮彩排台旁低头调音的社员侧脸，黑白质感沉淀出真实的青春执着。',
    descriptionFr: 'Faisceau de projecteur révélant la poussière scénique et la concentration studieuse des élèves.',
    likes: 115,
    featured: false,
    tags: ['Auditorium', 'TheatricalLight', 'StudentDrama', 'Chiaroscuro', 'Spotlight'],
    createdAt: '2025-11-21',
    critiques: [],
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'evt-01',
    title: 'Jericho Beach & Spanish Banks Sunset Photowalk',
    titleZh: '杰里科海滩与西班牙银行落日实地外拍',
    titleFr: 'Balade Photo au Coucher de Soleil à Jericho Beach & Spanish Banks',
    category: 'photowalk',
    date: '2026-09-12',
    time: '16:30 - 19:30',
    location: 'Jericho Sailing Centre (Meeting at West Pier)',
    locationZh: '杰里科航海中心（西码头集合）',
    locationFr: 'Centre Nautique de Jericho (Rendez-vous quai Ouest)',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Join us for our autumn kickoff coastal photowalk! We will practice ND filter long exposures, golden hour silhouette portraits, and twilight cityscape reflections across Burrard Inlet.',
    descriptionZh: '秋季学期开学外拍！我们将探索长曝光减光镜使用技巧、落日人像逆光构图以及隔海远眺温哥华天际线的暮色反差。',
    descriptionFr: 'Rejoignez-nous pour la sortie photo côtière de rentrée ! Pratique des filtres ND en pose longue, portraits en contre-jour à l’heure dorée et reflets de la silhouette urbaine au crépuscule.',
    instructor: 'Ethan Chen & Maya Lin (Exec Leads)',
    instructorRole: 'Club Executive Team',
    spotsTotal: 30,
    spotsRegistered: 23,
    isRegistrationOpen: true,
    agenda: [
      { 
        time: '16:30 - 16:45', 
        activity: 'Briefing, Camera Check & Group Split', 
        activityZh: '外拍注意事项说明、器材调试与分组',
        activityFr: 'Briefing, vérification du matériel et constitution des groupes'
      },
      { 
        time: '16:45 - 18:00', 
        activity: 'Golden Hour Coastal & Driftwood Framing Workshop', 
        activityZh: '黄金时刻海岸与漂木构图实操',
        activityFr: 'Atelier de cadrage côtier et bois flotté à l’heure dorée'
      },
      { 
        time: '18:00 - 18:45', 
        activity: 'Sunset Long Exposure & ND Filter Trials', 
        activityZh: '日落慢门与ND滤镜长曝光实训',
        activityFr: 'Essais de pose longue au coucher de soleil avec filtres ND'
      },
      { 
        time: '18:45 - 19:30', 
        activity: 'Blue Hour City Skyline Challenge & Wrap-up', 
        activityZh: '蓝调时刻城市天际线拍摄与总结点评',
        activityFr: 'Défi panoramique urbain à l’heure bleue et bilan'
      },
    ],
    requirements: [
      'DSLR / Mirrorless camera or Pro Smartphone with manual exposure app',
      'Sturdy Tripod recommended for 10s+ long exposures',
      'Warm windbreaker layer for coastal twilight breeze',
      'Extra fully charged battery and formatted SD card'
    ],
    requirementsZh: [
      '单反/无反相机或具备专业手动模式的智能手机',
      '建议携带稳固三脚架以进行慢门长曝光',
      '海风较大，请备好防风保暖外套',
      '备用充足电量电池及已格式化的高速SD卡'
    ],
    requirementsFr: [
      'Appareil photo reflex/hybride ou smartphone avec mode manuel',
      'Trépied stable vivement conseillé pour poses longues >10s',
      'Coupe-vent chaud pour la brise marine au crépuscule',
      'Batterie supplémentaire chargée et carte SD formatée'
    ],
    registeredUsers: ['Lucas V.', 'Chloe Z.', 'Daniel K.', 'Sophie W.']
  },
  {
    id: 'evt-02',
    title: 'Analog Chemistry & B&W Film Darkroom Masterclass',
    titleZh: '传统银盐暗房冲洗与黑白胶片印相工作坊',
    titleFr: 'Masterclass Chambre Noire & Développement Argentique N&B',
    category: 'darkroom',
    date: '2026-09-19',
    time: '15:15 - 17:45',
    location: 'PGSS Room 214 (Analog Darkroom Lab)',
    locationZh: 'Point Grey 中学 214教室（传统暗房实验室）',
    locationFr: 'Lycée Point Grey Salle 214 (Labo Chambre Noire)',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    description: 'Hands-on session learning 35mm film loading into Paterson tanks, D-76 chemical mixing, stop bath timing, rapid fixer cycles, and optical enlarger printing.',
    descriptionZh: '亲手体验35mm黑白胶卷在全黑暗袋中的装盘、D-76显影液配比、停显与定影流程，并使用光学放大机制作属于自己的银盐相片。',
    descriptionFr: 'Session pratique : chargement de film 35mm en cuve Paterson, préparation du D-76, bain d’arrêt, fixateur rapide et tirage sous agrandisseur optique.',
    instructor: 'Mr. Harrison & Aria Takahashi',
    instructorRole: 'Visual Arts Faculty & Senior Analog Curator',
    spotsTotal: 12,
    spotsRegistered: 10,
    isRegistrationOpen: true,
    agenda: [
      { 
        time: '15:15 - 15:40', 
        activity: 'Chemical Safety, Ratio Math & Film Changing Bag Demo', 
        activityZh: '暗房化学品安全规范与暗袋装卷实演',
        activityFr: 'Sécurité chimique, dosages et manipulation sous manchon'
      },
      { 
        time: '15:40 - 16:30', 
        activity: 'Development Phase: Agitation Cycles & Temperature Control', 
        activityZh: '显影实操：控温、定时与节奏摇罐',
        activityFr: 'Phase de développement : cycles d’agitation et contrôle thermique'
      },
      { 
        time: '16:30 - 17:30', 
        activity: 'Darkroom Enlarging & Test Strip Chemistry Print', 
        activityZh: '放大机曝光、试条阶梯曝光与定影印相',
        activityFr: 'Tirage sous agrandisseur, bandes d’essai et fixage'
      },
      { 
        time: '17:30 - 17:45', 
        activity: 'Drying Rack Inspection & Contact Sheet Prep', 
        activityZh: '底片挂晾干燥检查与印样准备',
        activityFr: 'Inspection sur séchoir et préparation des planches contact'
      }
    ],
    requirements: [
      'One exposed roll of B&W 35mm film (Ilford/Kodak/Foma)',
      'Lab apron / dark clothes that can handle chemical splashes',
      'Notebook for logging exposure temperatures'
    ],
    requirementsZh: [
      '已拍摄完毕的35mm黑白胶卷一卷（如伊尔福、柯达等）',
      '耐脏深色衣物或暗房实验围裙',
      '记录显影参数与温度曲线的笔记本'
    ],
    requirementsFr: [
      'Une pellicule 35mm N&B exposée (Ilford/Kodak/Foma)',
      'Tablier de laboratoire ou vêtements sombres adaptés',
      'Carnet de notes pour consigner les températures et temps'
    ],
    registeredUsers: ['Maya L.', 'Evan H.']
  },
  {
    id: 'evt-03',
    title: 'Cyberpunk & Night Street Photography Expedition',
    titleZh: '赛博光影：温哥华市中心夜景街拍探险',
    titleFr: 'Expédition Photo de Nuit Cyberpunk & Rue à Vancouver',
    category: 'photowalk',
    date: '2026-09-26',
    time: '18:00 - 21:00',
    location: 'Gastown Steam Clock Plaza, Vancouver',
    locationZh: '煤气镇蒸汽钟广场集合',
    locationFr: 'Place de l’Horloge à Vapeur de Gastown, Vancouver',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore contrast, neon signage, panning blur, and street narrative along heritage cobblestones and Chinatown night alleys.',
    descriptionZh: '穿梭于煤气镇古老石板路与霓虹街区，探索高反差夜景、动态摇摄跟焦以及街头光影叙事技法。',
    descriptionFr: 'Explorez les contrastes nocturnes, les néons, les filés de mouvement et la narration urbaine sur les pavés historiques de Gastown.',
    instructor: 'Chloe Zhang (Street Dept Lead)',
    instructorRole: 'Executive Lead',
    spotsTotal: 25,
    spotsRegistered: 18,
    isRegistrationOpen: true,
    agenda: [
      { 
        time: '18:00 - 18:20', 
        activity: 'Steam Clock Gathering & High-ISO Noise Control Setup', 
        activityZh: '蒸汽钟集合与高感光度控噪参数预设',
        activityFr: 'Rassemblement à l’horloge à vapeur et réglages ISO élevés'
      },
      { 
        time: '18:20 - 19:40', 
        activity: 'Gastown Alleys: Framing with Neon & Lantern Reflections', 
        activityZh: '街巷实战：霓虹招牌与地面反光构图',
        activityFr: 'Ruelles de Gastown : composition avec néons et reflets'
      },
      { 
        time: '19:40 - 20:40', 
        activity: 'Transit Panning & Slow Shutter Light-Trails Practice', 
        activityZh: '城市交通光轨与慢速快门追焦跟拍',
        activityFr: 'Filés sur les transports et traînées lumineuses'
      },
      { 
        time: '20:40 - 21:00', 
        activity: 'Group Critique & Hot Cocoa Social at Local Café', 
        activityZh: '咖啡馆作品即时互评与交流分享',
        activityFr: 'Critique de groupe et chocolat chaud dans un café'
      }
    ],
    requirements: [
      'Fast prime lens recommended (e.g. 35mm / 50mm f/1.8 or wider)',
      'Compass Card / Transit fare for Skytrain movement',
      'Reflective safety marker or badge'
    ],
    requirementsZh: [
      '建议搭配大光圈定焦镜头（如 35mm / 50mm f/1.8 或更大）',
      '温哥华公交卡（Compass Card）',
      '夜晚出行注意反光安全标识'
    ],
    requirementsFr: [
      'Objectif à grande ouverture recommandé (35mm / 50mm f/1.8)',
      'Carte Compass / titre de transport pour le SkyTrain',
      'Élément réfléchissant de sécurité recommandé'
    ]
  },
  {
    id: 'evt-04',
    title: 'Lightroom Color Grading & Visual Storytelling Workshop',
    titleZh: 'Lightroom 电影感调色与色彩科学讲座',
    titleFr: 'Atelier Étalonnage Lightroom & Narration Visuelle',
    category: 'workshop',
    date: '2026-10-03',
    time: '15:15 - 16:45',
    location: 'PGSS Computer Media Lab 108',
    locationZh: 'Point Grey 中学 108 多媒体机房',
    locationFr: 'Lycée Point Grey Salle Informatique 108',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Master tone curves, HSL sliders, mask feathering, color calibration profiles, and crafting cohesive thematic series for college portfolio admissions.',
    descriptionZh: '深度解析色调曲线、HSL色彩分级、AI蒙版羽化以及专业摄影作品集（Portfolio）的视觉风格统一性。',
    descriptionFr: 'Maîtrisez les courbes de tonalité, les curseurs TSL, les masques IA et l’étalonnage colorimétrique pour concevoir un portfolio cohérent.',
    instructor: 'Guest Speaker: Alex Thorne (Emily Carr Alumni)',
    instructorRole: 'Commercial Photographer & Visual Artist',
    spotsTotal: 35,
    spotsRegistered: 28,
    isRegistrationOpen: true,
    agenda: [
      { 
        time: '15:15 - 15:45', 
        activity: 'Color Harmony Theory & RAW Dynamic Range Recovery', 
        activityZh: '色彩和弦理论与RAW格式动态范围挽救',
        activityFr: 'Théorie de l’harmonie des couleurs et récupération RAW'
      },
      { 
        time: '15:45 - 16:15', 
        activity: 'Live Breakdown: Pacific Teal & Cinematic Film Emulation', 
        activityZh: '现场演示：太平洋青蓝调色与胶片LUT模拟',
        activityFr: 'Démonstration : tons bleus Pacifique et émulation argentique'
      },
      { 
        time: '16:15 - 16:45', 
        activity: 'Student RAW Files Live Feedback & Preset Distribution', 
        activityZh: '现场学生RAW原片修改点评与社团专属预设分发',
        activityFr: 'Retours en direct sur vos fichiers RAW et partage de presets'
      }
    ],
    requirements: [
      'USB drive with 3-5 of your unedited RAW files',
      'Laptop with Lightroom / Capture One (or use school workstations)'
    ],
    requirementsZh: [
      '携带装有3-5张个人未经编辑RAW原片的U盘',
      '可自带笔记本电脑或使用机房已预装工作站'
    ],
    requirementsFr: [
      'Clé USB avec 3 à 5 fichiers RAW non édités',
      'Ordinateur portable avec Lightroom / Capture One (ou postes du labo)'
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-vfc-ottawa',
    title: 'Match Report Published: Vancouver FC Dominates Atlético Ottawa 3-1 at Home',
    titleZh: '【现场纪实】温哥华FC主场 3-1 大胜渥太华竞技 边线摄影战报与图集已发布！',
    titleFr: 'Rapport de Match : Vancouver FC 3-1 Atlético Ottawa, Reportage & Galerie Disponibles',
    date: '2026-08-01',
    category: 'general',
    content: 'Check out Aaron Peng’s pitchside photography and full tactical breakdown of Damiano Pecile’s masterclass and the 3-goal first-half blitz in the Press & Reports section.',
    contentZh: '点击查看 Aaron Peng（彭子轩）常驻威洛比社区公园球场边线拍摄的 Sony α7R V 高清图集及达米亚诺·佩西莱（Damiano Pecile）第7分钟精准直塞助攻深度战报。',
    contentFr: 'Découvrez les photos de terrain par Aaron Peng et l’analyse tactique complète de la victoire 3-1 du Vancouver FC face à l’Atlético Ottawa.',
    author: 'Aaron Peng (Sports Lead)',
    isImportant: true,
  },
  {
    id: 'ann-01',
    title: '2026-2027 Fall Term Equipment Locker Booking Now Live',
    titleZh: '2026-2027学年秋季学期摄影器材库借用通道开启',
    titleFr: 'Réservations du Matériel Photo pour la Rentrée 2026-2027 Ouvertes',
    date: '2026-09-01',
    category: 'equipment',
    content: 'All registered PGSS Photo Club members in good standing can now sign out Sony FX30 bodies, Godox strobe lighting kits, and carbon-fiber tripods from Room 214 for school project assignments.',
    contentZh: '所有已注册社员即日起可在214暗房教室预约借用社团公用器材，包括索尼无反机身、神牛专业外拍灯套装及碳纤维三脚架，用于校级摄影项目创作。',
    contentFr: 'Tous les membres inscrits du club photo PGSS peuvent désormais emprunter en salle 214 des boîtiers Sony FX30, des kits de flashs Godox et des trépieds carbone pour leurs projets scolaires.',
    author: 'Lucas Vance (Tech Equipment Lead)',
    isImportant: true,
  },
  {
    id: 'ann-02',
    title: 'Submissions Open: Annual District 39 Youth Photo Salon',
    titleZh: '第39学区温哥华青少年摄影沙龙大奖赛开始征稿',
    titleFr: 'Appel à Candidatures : Salon Annuel de la Photo Jeunesse du District 39',
    date: '2026-08-28',
    category: 'contest',
    content: 'Grand prize includes a $500 Beau Photo gift card and exhibition display at Vancouver Public Library Central Branch. Submission deadline is October 31, 2026.',
    contentZh: '大奖包含500加元Beau Photo摄影器材礼券及温哥华市中心公共图书馆主展厅展出机会。截稿日期为2026年10月31日。',
    contentFr: 'Le grand prix comprend un bon d’achat de 500 $ chez Beau Photo et une exposition à la succursale centrale de la Bibliothèque Publique de Vancouver. Date limite : 31 octobre 2026.',
    author: 'Club Executive Committee',
    isImportant: true,
  },
  {
    id: 'ann-03',
    title: 'Weekly Darkroom Chemistry Refresh & Film Stock Delivery',
    titleZh: '暗房显影药水定期更换与柯达黑白胶卷入库通知',
    titleFr: 'Renouvellement des Bains Chimiques & Réception de Pellicules N&B',
    date: '2026-08-25',
    category: 'general',
    content: 'Fresh Kodak D-76 and Ilford Rapid Fixer batches mixed. 50 rolls of Ilford HP5+ 35mm film subsidised by PAC are available for student purchase at $7 CAD each.',
    contentZh: '214暗房已完成显影与定影药水新鲜配比。由家长委员会（PAC）赞助的50卷伊尔福HP5+黑白胶卷已到货，社员享受7加元/卷优惠购入价。',
    contentFr: 'Nouveaux bains de Kodak D-76 et fixateur Ilford préparés. 50 rouleaux de film Ilford HP5+ 35mm subventionnés par le PAC sont disponibles pour les élèves à 7 $ CAD l’unité.',
    author: 'Aria Takahashi',
    isImportant: false,
  }
];

export const INITIAL_CHALLENGE: WeeklyChallenge = {
  id: 'ch-01',
  themeTitle: 'Pacific Coast & Urban Geometry',
  themeTitleZh: '太平洋海岸与城市几何秩序',
  themeTitleFr: 'Côte Pacifique & Géométrie Urbaine',
  description: 'Capture the juxtaposition between British Columbia’s raw temperate coastal nature and the sharp architectural lines of Vancouver. Look for reflections, leading angles, and atmospheric mist.',
  descriptionZh: '捕捉卑诗省壮阔的温带海岸自然与温哥华现代建筑锋利几何线条的戏剧性碰撞。寻找倒影、引导线与雾气晨光的共鸣。',
  descriptionFr: 'Capturez la rencontre entre la nature côtière de la Colombie-Britannique et les lignes architecturales épurées de Vancouver. Misez sur les reflets, les lignes directrices et la brume.',
  deadline: '2026-09-20',
  prize: 'Peak Design Camera Strap & Feature in PGSS Yearbook 2027',
  prizeZh: 'Peak Design 专业快拆相机背带 & 2027 PGSS 年鉴特页展示',
  prizeFr: 'Courroie Peak Design Pro & Double-page dédiée dans l’Annuaire PGSS 2027',
  keywords: ['Geometry', 'LeadingLines', 'Coastline', 'Reflections', 'Monochrome'],
  submissionsCount: 19,
  sampleImages: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80'
  ]
};

export const INITIAL_SPOTLIGHTS: MemberSpotlight[] = [
  {
    id: 'mem-01',
    name: 'Aaron Peng',
    grade: 'Grade 11',
    role: 'Sports & Events Lead Photographer',
    roleZh: '体育与大型赛事首席摄影师',
    roleFr: 'Photographe Principal Sports & Événements',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Sports & events photographer regularly on the pitch and sidelines covering home games for Vancouver FC, UBC Thunderbirds, and the Vancouver Canadians. Master of high-speed athletic action, sideline emotion, and decisive sports moments.',
    bioZh: '11年级体育与赛事摄影师。经常在温哥华FC（Vancouver FC）、UBC雷鸟队（UBC Thunderbirds）和温哥华加拿大人棒球队（Vancouver Canadians）主场拍摄比赛，精于捕捉极限运动瞬间、赛场情绪与竞技张力。',
    bioFr: 'Photographe de sport et d’événements. Couvre régulièrement les matchs à domicile du Vancouver FC, des UBC Thunderbirds et des Vancouver Canadians. Spécialiste de l’action sportive haute vitesse.',
    gearBag: [
      { name: 'Sony α7R VI & α7 V', type: 'Flagship Digital' },
      { name: 'Sony α6700 & Canon EOS-1V', type: 'APS-C & 35mm Film' },
      { name: 'FE 100-400mm & 200-600mm', type: 'Super Telephoto' },
      { name: 'FE 70-200mm, 24-105mm, 14mm', type: 'Pro Zoom & Ultra-Wide' }
    ],
    favoriteGenre: 'High-Speed Sports & Live Stadium Events',
    favoriteGenreZh: '体育竞技与大型赛事摄影 (Vancouver FC / UBC / Canadians)',
    favoriteGenreFr: 'Sports Haute Vitesse & Événements en Stade',
    featuredPhotoId: 'pgss-07'
  },
  {
    id: 'mem-02',
    name: 'Justin Zhang',
    grade: 'Grade 11',
    role: 'Executive Member & Optical Lead',
    roleZh: '11年级核心社员兼光学器材专员',
    roleFr: 'Membre Exécutif & Spécialiste Optique',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Visual storyteller exploring architecture, campus events, and street geometry across Vancouver. Dedicated to darkroom development and optical lens testing.',
    bioZh: '11年级核心社员。专注于城市建筑几何、大型校园活动纪实与传统暗房光学校验。',
    bioFr: 'Explorateur visuel spécialisé dans l’architecture, les événements scolaires et la géométrie urbaine. Adepte du labo argentique.',
    gearBag: [
      { name: 'Sony A7 IV', type: 'Camera Body' },
      { name: 'FE 35mm f/1.4 GM', type: 'Street Prime' },
      { name: 'FE 16-35mm f/2.8 GM II', type: 'Wide Zoom' },
      { name: 'Peak Design Carbon Tripod', type: 'Support' }
    ],
    favoriteGenre: 'Urban Geometry & Event Coverage',
    favoriteGenreZh: '城市几何与大型活动纪实',
    favoriteGenreFr: 'Géométrie Urbaine & Reportage Événementiel',
    featuredPhotoId: 'pgss-02'
  },
  {
    id: 'mem-03',
    name: 'Amber Hao',
    grade: 'Grade 12',
    role: 'Senior Executive & Portrait Curation',
    roleZh: '12年级高级理事兼人像策展',
    roleFr: 'Membre Exécutif Senior & Curation Portrait',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Fine art portraiture and editorial fashion photographer. Passionate about natural window lighting, medium format aesthetics, and chronicling authentic human connection.',
    bioZh: '12年级资深理事。专注纯艺术人像、时尚视觉与自然光影叙事，探索中画幅质感与真实情感连接。',
    bioFr: 'Photographe de portrait d’art et de mode éditoriale. Passionnée par la lumière naturelle, l’esthétique moyen format et les connexions humaines authentiques.',
    gearBag: [
      { name: 'Canon EOS R5', type: 'Camera Body' },
      { name: 'RF 85mm f/1.2 L USM', type: 'Portrait Prime' },
      { name: 'RF 50mm f/1.2 L', type: 'Standard Prime' },
      { name: 'Profoto B10X Plus', type: 'Location Light' }
    ],
    favoriteGenre: 'Fine Art Portraits & Editorial Fashion',
    favoriteGenreZh: '时尚艺术人像与自然光影',
    favoriteGenreFr: 'Portraits Beaux-Arts & Mode Éditoriale',
    featuredPhotoId: 'pgss-04'
  }
];

export const INITIAL_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-04',
    title: 'Point Grey Annual Arts Week & Photo Exhibition Inauguration: 40 Student Works Unveiled',
    titleZh: 'Point Grey 中学年度艺术周摄影展盛大开幕：40幅学生原创力作亮相主展厅',
    titleFr: 'Inauguration de l’Exposition Photo Annuelle de Point Grey : 40 Œuvres Étudiantes Présentées',
    summary: 'Grand opening of the 2026 Student Photographic Showcase in the East Wing Gallery. Over 400 attendees celebrating youth visual arts.',
    summaryZh: 'Point Grey Secondary 2026 年度学生摄影展开幕盛况。40幅涵盖大温海岸风光、体育动作抓拍与传统暗房银盐原作的作品吸引全校师生热烈观展。',
    summaryFr: 'Célébration des arts visuels et du talent photographique des élèves de Point Grey dans la galerie principale.',
    category: 'campus',
    date: '2026-09-18',
    readTime: '4 min read',
    author: 'Amber Hao & Justin Zhang',
    authorGrade: 'Grade 12 & 11',
    authorRole: 'Curation & Executive Committee',
    coverImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=85',
    tags: ['Exhibition', 'CampusArts', 'PGSS', 'Darkroom', 'FineArt', 'StudentCurators'],
    likes: 288,
    featured: true,
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80',
        caption: 'East Wing Heritage Gallery exhibition floor during opening ceremony',
        captionZh: 'Point Grey 中学东翼历史展厅揭幕仪式现场，师生驻足欣赏学生摄影作品',
        exif: 'Fujifilm X-T5 · XF 16-55mm f/2.8 R LM WR @ 23mm · f/2.8 · 1/250s · ISO 400'
      },
      {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Silver halide B&W prints developed in Room 214 Darkroom',
        captionZh: '214暗房手工显影黑白银盐原作展区，特邀指导老师现场点评',
        exif: 'Leica M6 · Summicron 35mm f/2 · Ilford HP5 Plus 400'
      },
      {
        url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student photographers discussing framing and light meter calibration',
        captionZh: '青年摄影社员交流构图与测光校准心得',
        exif: 'Sony α7 IV · FE 35mm f/1.4 GM · f/1.8 · 1/500s · ISO 200'
      }
    ],
    content: `### 🎨 Point Grey Secondary School Annual Photography Showcase

The Point Grey Secondary School Photo Club officially opened its landmark **2026 Student Photographic Showcase** today in the historic East Wing Auditorium Gallery. Curated entirely by student committee members Amber Hao and Justin Zhang, the exhibition brings together **40 original fine art pieces** created across all grade levels.

![Exhibition Opening](https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80)

### 🏛️ Three Core Curatorial Sections

1. **Heritage Darkroom Works (Room 214)**: Silver halide gelatin prints manually enlarged and developed on Ilford Multigrade FB paper by senior club members.
2. **Pacific Northwest Natural Landscapes**: Ultra-high-resolution panoramic studies of Jericho Beach, Spanish Banks, and Lighthouse Park.
3. **Varsity Athletics & Sideline Energy**: High-shutter freezes from Point Grey Hounds soccer, rugby, and track & field competitions.

![Darkroom Silver Halide Craft](https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80)

The exhibition is open daily to students, faculty, and visiting parents from 8:30 AM to 4:30 PM throughout Arts Week. Free commemorative exhibition postcards printed in-house are available at the welcome desk.`,
    contentZh: `### 🎨 Point Grey 中学 2026 年度学生摄影展开幕特稿

温哥华 Point Grey 中学（Point Grey Secondary School）摄影俱乐部今日在东礼堂历史展厅隆重揭幕 **2026 年度学生原创摄影大展**。本次展览由社团核心策展组学生全自主策划筹备，历经三个月的评选与放大装裱，共展出 **40 幅跨越各年级学生创作者的摄影杰作**。

![展览揭幕现场](https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80)

### 🏛️ 三大核心策展单元

1. **214 传统暗房银盐原作展区**：展示社员在学校 214 暗房内手工显影、定影并放大的黑白银盐作品，质感温润细腻，再现传统暗房的光影仪式感。
2. **卑诗海岸与自然风光专题**：深入杰里科海滩（Jericho Beach）、西班牙海滩（Spanish Banks）以及灯塔公园，用镜头捕捉晨昏光影与落基山余脉的静谧。
3. **校园体育与边线纪实**：定格 Point Grey 猎犬（Point Grey Hounds）校队在绿茵场、橄榄球场与硬木球馆中的热血瞬间。

![传统暗房银盐工艺展区](https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80)

本次艺术周摄影展对全校师生及家长免费开放，每日展出时间为 8:30 至 16:30。展厅入口服务台备有由社团自主印制的纪念明信片供观展者免费留念。`,
  },
  {
    id: 'news-05',
    title: 'Room 214 Darkroom Facility Upgrade: New Enlarger Calibrations & Ilford Paper Supply',
    titleZh: '214号传统暗房实验室全面调试完毕：全新银盐放大机投入使用与秋季工坊开放',
    titleFr: 'Modernisation du Labo Chambre Noire 214 : Nouveaux Agrandisseurs et Papier Ilford',
    summary: 'The analog chemistry facility in Room 214 has received newly calibrated condenser heads and fresh chemistry for student access.',
    summaryZh: '社团暗房实验室完成全面光学校准，新增四组高精度聚焦放大机与恒温冲洗槽，秋季暗房黑白胶片显影体验课即日起接受社员预约。',
    summaryFr: 'Le laboratoire de chimie argentique de la salle 214 est désormais prêt pour les ateliers d’automne.',
    category: 'gear',
    date: '2026-08-01',
    readTime: '2 min read',
    author: 'Justin Zhang',
    authorGrade: 'Grade 11',
    authorRole: 'Optical & Darkroom Lead',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85',
    tags: ['Darkroom', 'AnalogFilm', 'Ilford', 'Craftsmanship', 'Room214'],
    likes: 87,
    featured: false,
    content: `Following intensive maintenance over the summer, Room 214 darkroom is fully operational with four calibrated enlargers and dedicated chemistry stations for B&W developing.`,
    contentZh: `经过暑期的深度维护与光轴调校，214 暗房实验室现已装备完善。四组高精显影放大机、无尘干燥箱及恒温显影定影药液槽均已完成安全质检，社员可即刻预约使用。`,
  },
  {
    id: 'news-point-grey-kitsilano-bowl-preview',
    title: 'Point Grey Hounds vs Kitsilano Blue Demons: Westside Football Rivalry Bowl Preview',
    titleZh: '【西区德比前瞻】Point Grey 猎犬 vs 基斯兰奴蓝魔：秋季橄榄球传统碗赛赛前解析与首发对阵',
    summary: 'The historic Vancouver high school autumn football rivalry returns to the Point Grey Athletic Oval under Friday night lights. Formations, key matchups, and student spirit choreography.',
    summaryZh: '温哥华西区最具历史底蕴的中学橄榄球传统碗赛即将打响。深度拆解 Point Grey 猎犬地面冲阵跑锋与基斯兰奴四分卫传球对决，呈现最纯粹的高中体育热血现场。',
    category: 'sports',
    date: '2026-09-15',
    readTime: '4 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1600&q=85',
    tags: ['PointGreyHounds', 'KitsilanoBlueDemons', 'WestsideBowl', 'HighSchoolFootball', 'FridayNightLights'],
    likes: 196,
    featured: false,
    matchStats: {
      articleType: 'preview',
      fixture: 'Point Grey Hounds vs Kitsilano Blue Demons',
      stadium: 'Point Grey Secondary Athletic Oval (Vancouver, BC)',
      score: 'Kickoff Friday 18:30 PDT',
      competition: 'Vancouver Westside High School Football Classic',
      keyMoment: 'Running back power dive at goal line and marching band halftime show',
      keyMomentZh: '终点线前跑锋强力冲撞达阵与中场军乐队热烈应援',
      broadcast: 'Point Grey Sports Live YouTube Stream & School Quad Radio',
      kickoffTime: 'Friday, Sept 25 · 18:30 PDT',
      homeTeam: 'Point Grey Hounds',
      awayTeam: 'Kitsilano Blue Demons',
      homeFormation: 'I-Formation Power Run',
      awayFormation: 'Spread Shotgun Pass',
      projectedHomeXI: [
        'QB: Liam Vance (#7)',
        'RB: Marcus Tremblay (#22)',
        'FB: Ethan Cole (#44)',
        'WR: Daniel Kim (#11)',
        'WR: Oliver Scott (#81)',
        'TE: Noah Sterling (#88)',
        'OT: Jackson Reid (#72)',
        'OG: Caleb Brooks (#65)',
        'C: Dylan Wright (#55)',
        'OG: Mason Lee (#68)',
        'OT: Lucas Chen (#77)'
      ],
      projectedAwayXI: [
        'QB: Owen Gallagher (#12)',
        'RB: Jordan Walsh (#20)',
        'WR: Nathan Bailey (#8)',
        'WR: Tyler Davies (#15)',
        'WR: Samuel Park (#84)',
        'TE: Henry Wilson (#89)',
        'OT: Zachary Moore (#74)',
        'OG: Benjamin Foster (#62)',
        'C: Alex Campbell (#51)',
        'OG: Ryan Murphy (#66)',
        'OT: Matthew Taylor (#78)'
      ],
      doubts: {
        home: ['Marcus Tremblay (Ankle tape - Probable)', 'Daniel Kim (Shoulder - Game-time Decision)'],
        away: ['Jordan Walsh (Bruised ribs - Questionable)', 'Tyler Davies (Finger - Probable)']
      },
      prediction: 'Point Grey Hounds 24 - 21 Kitsilano Blue Demons'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hounds defensive line locked in pre-snap stance under twilight floodlights.',
        captionZh: '泛光灯下 Point Grey 猎犬防守锋线压低重心等待开球，目光如炬。',
        exif: 'Sony α7R V · FE 70-200mm f/2.8 GM II @ 180mm · f/2.8 · 1/1600s · ISO 2500'
      }
    ],
    content: `Friday night football at Point Grey Oval captures the soul of autumn high school athletics. With Kitsilano bringing an explosive spread passing offense against the Hounds' stalwart front seven, line-of-scrimmage collision photography will require 1/2000s shutter speeds and tight 200mm framing.`,
    contentZh: `秋季周五晚上的 Point Grey 体育场橄榄球碗赛是整座校园最期待的体育盛事。基斯兰奴蓝魔以散开阵型四分卫精准传球见长，而 Point Grey 猎犬则依托坚如磐石的前线七人组强硬冲防。比赛提供充分的段落与数据供后续随时编辑排版。`
  },
  {
    id: 'news-pg-soccer-semifinal',
    title: 'Point Grey Hounds 4-2 Kitsilano Blue Demons: City Championship Semifinal Dominance',
    titleZh: 'Point Grey 猎犬队 4-2 击败基斯兰奴：温哥华校际足球锦标赛半决赛大捷',
    titleFr: 'Point Grey Hounds 4-2 Kitsilano : Victoire Mémorable en Demi-Finale Municipale',
    summary: 'High school rivalry at its absolute best. The Point Grey Hounds scored four goals in a relentless attacking display against neighboring Kitsilano to punch their ticket to the Vancouver City Final.',
    summaryZh: '温哥华西区宿敌德比战。Point Grey 猎犬高中足球队（PG Hounds）在主场球迷如雷助威下火力全开，依靠边路撕扯与默契传切以 4-2 力克基斯兰奴高中，昂首挺进市锦标赛总决赛！',
    summaryFr: 'Les Point Grey Hounds s’imposent 4-2 contre Kitsilano dans une demi-finale de haut vol et se qualifient pour la grande finale de Vancouver.',
    category: 'sports',
    date: '2026-09-12',
    readTime: '3 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=85',
    tags: ['PGHounds', 'HighSchoolSoccer', 'VancouverDerby', 'Kitsilano', 'CityChampionship', 'AaronPeng'],
    likes: 215,
    featured: false,
    matchStats: {
      fixture: 'Point Grey Hounds vs Kitsilano Blue Demons',
      stadium: 'Point Grey Turf Field (Vancouver, BC)',
      score: '4 - 2',
      competition: 'Vancouver Secondary Schools Athletic Association (VSSAA)',
      keyMoment: 'Hat-trick heroics and 75th-minute breakaway chip over the advancing keeper',
      keyMomentZh: '高三主力前锋上演帽子戏法，第75分钟单刀挑射破门杀死悬念'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hounds striker breaking through two defenders with explosive acceleration.',
        captionZh: '猎犬队前锋双人包夹下凭借爆发力强行超车突破。',
        exif: 'Sony α7R V · FE 70-200mm f/2.8 GM II @ 165mm · f/2.8 · 1/2500s · ISO 400'
      },
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        caption: 'Student cheering section chanting and unfurling the school banner.',
        captionZh: '场边学生助威团擂鼓呐喊，挥舞 Point Grey 校旗庆祝晋级。',
        exif: 'Sony α7M IV · FE 24-70mm f/2.8 GM II @ 35mm · f/4.0 · 1/1000s · ISO 250'
      }
    ],
    content: `### 🏟️ VSSAA Semifinal Report: Point Grey Hounds 4-2 Kitsilano (Sept 12, 2026)

**Author & Photographer: Aaron Peng (Grade 11, Sports Lead Photographer)**
**Location: Point Grey Secondary Turf Field**

The atmosphere on the Point Grey turf was electric as hundreds of students, teachers, and alumni lined the fences for the biggest Westside high school clash of the season.

The Hounds came out firing with quick combination play on the wings, establishing an early 2-0 cushion before weathering a spirited second-half comeback attempt by Kitsilano. A stunning hat-trick by Grade 12 captain sealed the 4-2 scoreline and sent the Hounds to the City Championship final!`,
    contentZh: `### 🏟️ VSSAA 温哥华校际半决赛战报：Point Grey 猎犬 4-2 基斯兰奴 (2026年9月12日)

**作者 / 摄影：Aaron Peng（彭子轩，Grade 11 体育主摄影师）**
**比赛地点：Point Grey 中学校园人造草坪球场**

作为温哥华西区最具传统的两所公立名校对决，场边围满了身着蓝白与黑金配色的各年级师生与校友，助威声此起彼伏。

猎犬队开局便打出教科书般的高位压迫，利用两侧边锋的速度优势屡屡撕破对手防线，早早确立 2-0 领先。虽然下半场基斯兰奴两度扳回一球，但 Point Grey 高三队长在第75分钟冷静单刀挑射完成帽子戏法，最终以 4-2 锁定胜局，昂首晋级温哥华市总决赛！`
  },
  {
    id: 'news-pg-basketball-hoops',
    title: 'Point Grey Hounds 68-65 Lord Byng: Overtime Buzzer-Beater in Packed Westside Gymnasium',
    titleZh: 'Point Grey 猎犬男篮 68-65 险胜拜恩勋爵高中：加时赛压哨三分绝杀与满座体育馆狂欢',
    titleFr: 'Point Grey 68-65 Lord Byng : Panier Décisif à la Dernière Seconde en Prolongation',
    summary: 'Indoor sports photojournalism masterclass. Pushing high-ISO performance and tracking fast crossover drives under high school gymnasium floodlights.',
    summaryZh: '室内篮球高速动态拍摄实战。记录 Point Grey 猎犬男篮与拜恩勋爵高中的加时鏖战，在最后0.8秒投进压哨三分逆转取胜的疯狂时刻，实测室内高ISO降噪与色彩还原。',
    summaryFr: 'Match de basketball palpitant remporté à la dernière seconde après prolongation devant un gymnase comble.',
    category: 'sports',
    date: '2026-09-02',
    readTime: '3 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=85',
    tags: ['Basketball', 'PGHounds', 'LordByng', 'OvertimeBuzzerBeater', 'GymnasiumSports', 'HighISO'],
    likes: 174,
    featured: false,
    matchStats: {
      fixture: 'Point Grey Hounds vs Lord Byng Grey Ghosts',
      stadium: 'Point Grey Secondary Main Gymnasium (Vancouver, BC)',
      score: '68 - 65 (OT)',
      competition: 'Westside Basketball Classic',
      keyMoment: '0.8-second corner step-back 3-pointer buzzer-beater',
      keyMomentZh: '加时赛最后0.8秒底角后撤步三分压哨空心入网绝杀'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Buzzer-beating step-back jumper releasing high above outstretched defender hands.',
        captionZh: '绝杀瞬间！后撤步高弧度出手，皮球越过防守球员指尖直飞篮筐。',
        exif: 'Sony α7R V · FE 70-200mm f/2.8 GM II @ 85mm · f/2.8 · 1/1600s · ISO 3200'
      }
    ],
    content: `Gymnasium court lighting requires disciplined camera configuration. With color temperatures shifting between mercury vapor lamps, custom white balancing and shooting raw files is essential. Locking aperture at f/2.8 allowed maintaining 1/1600s shutter speeds to eliminate hand-blur during lightning-fast crossover dribbles and fadeaway jumpers.`,
    contentZh: `校园体育馆顶部高压气体放电灯存在色温偏黄与光强衰减问题。拍摄时使用灰卡自定义白平衡，全开 f/2.8 大光圈并将快门保持在 1/1600 秒以上，既能彻底定格后撤步跳投时手指拨球的微小动作，又能将喧嚣看台作为虚化背景烘托主体。`
  },
  {
    id: 'news-bc-rugby-sevens',
    title: 'BC High School Rugby Sevens Invitational: Freezing 1/4000s Heavy Tackle Impact on Wet Grass',
    titleZh: 'BC省高中七人制橄榄球邀请赛：1/4000秒超高速快门定格草屑飞溅与防守拦截',
    titleFr: 'Tournoi de Rugby à Sept des Lycées de la C.-B. : Impact et Puissance sur Pelouse Humide',
    summary: 'Photojournalism series capturing full-speed tackles, offload passes, and relentless athletic grit at historic Brockton Oval in Stanley Park.',
    summaryZh: '斯坦利公园布罗克顿球场七人制橄榄球纪实。深入达阵区后方底线机位，使用 1/4000 秒快门冻结肌肉碰撞冲量、腾空扑截与泥地滑行。',
    summaryFr: 'Reportage photographique immersif au Brockton Oval lors des affrontements de rugby à 7 interscolaires.',
    category: 'sports',
    date: '2026-09-08',
    readTime: '3 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1600&q=85',
    tags: ['RugbySevens', 'HighSchoolRugby', 'BrocktonOval', 'StanleyPark', 'ActionPhotography', 'AaronPeng'],
    likes: 128,
    featured: false,
    matchStats: {
      fixture: 'Point Grey Hounds vs St. George’s Saints',
      stadium: 'Brockton Oval, Stanley Park (Vancouver, BC)',
      score: '19 - 14',
      competition: 'BC High School Rugby 7s Invitational',
      keyMoment: 'Last-gasp try-saving tackle into touch at the 5-meter line',
      keyMomentZh: '终场前在5米线处飞身将对方持球冲锋队员拦截出边线'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mid-air tackle collision captured at 1/4000s shutter speed.',
        captionZh: '半空扑截瞬间，1/4000 秒快门定格草沫飞溅与极强动量碰撞。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 300mm · f/5.0 · 1/4000s · ISO 1250'
      }
    ],
    content: `Rugby sevens moves at breakneck velocity. At Brockton Oval in Stanley Park, the lush coastal grass provided natural contrast against team kits. Positioning low to the ground behind the try line allowed us to photograph players sprinting directly toward the camera, isolating their facial determination through shallow depth of field.`,
    contentZh: `七人制橄榄球攻防节奏极快，攻守转换仅在数秒之间。在斯坦利公园历史悠久的布罗克顿椭圆球场（Brockton Oval），低角度蹲守在达阵区底线拍摄，能够以正面仰角捕捉队员持球狂奔直冲镜头的强烈压迫感，1/4000 秒快门完美定格了每一次激烈的身体碰撞。`
  },
  {
    id: 'news-vfc-ottawa-0801',
    title: 'Match 1 · Vancouver FC 3-1 Atlético Ottawa: First-Half Dominance & 3-Goal Attacking Blitz',
    titleZh: '【第1场】温哥华FC 3-1 胜渥太华竞技：半场连轰3球进攻教学与佩西莱助攻实录',
    titleFr: 'Match 1 · Vancouver FC 3-1 Atlético Ottawa : Démonstration Offensive et Victoire Éclatante',
    summary: 'Pitchside dispatch from Willoughby Community Park. Vancouver FC turned this high-stakes CPL clash into an attacking masterclass, powered by Damiano Pecile’s opening spark and a three-goal first-half barrage.',
    summaryZh: '坐镇威洛比社区公园球场，温哥华FC打出进攻教学局。中场核心达米亚诺·佩西莱（Damiano Pecile）第7分钟精准直塞打破僵局，全队半场轰入3球，最终以3-1力克劲敌渥太华竞技。',
    summaryFr: 'Reportage photo au bord du terrain au Willoughby Community Park. Le Vancouver FC a livré une démonstration offensive avec 3 buts en première période pour battre l’Atlético Ottawa 3-1.',
    category: 'sports',
    date: '2026-08-01',
    readTime: '5 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=85',
    tags: ['Match1', 'VancouverFC', 'AtleticoOttawa', 'CPL', 'MatchReport', 'Sidelines', 'DamianoPecile', 'SonyAlpha', 'AaronPeng'],
    likes: 188,
    featured: true,
    matchStats: {
      fixture: 'Vancouver FC vs Atlético Ottawa',
      stadium: 'Willoughby Community Park Stadium (Langley, BC)',
      score: '3 - 1',
      competition: 'Canadian Premier League (CPL)',
      keyMoment: 'Damiano Pecile 7th-minute pinpoint through-ball assist & 3-goal first-half blitz',
      keyMomentZh: '第7分钟达米亚诺·佩西莱手术刀直塞闪电助攻，半场连下三城奠定3-1胜局'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Damiano Pecile orchestrating the pitch in midfield with razor-sharp spatial vision.',
        captionZh: '中场核心达米亚诺·佩西莱（Damiano Pecile）掌控攻防转换与前插直塞瞬间。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 280mm · f/5.0 · 1/3200s · ISO 800'
      },
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        caption: 'Goal celebration roar in front of the packed Willoughby supporter stand.',
        captionZh: '连下三城！温哥华FC前锋奔向主场球迷看台的狂喜嘶吼与激情相拥。',
        exif: 'Sony α7M IV · FE 70-200mm f/2.8 GM II @ 135mm · f/2.8 · 1/2500s · ISO 640'
      },
      {
        url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
        caption: 'Second-half defensive resilience and diving goalkeeping save against Ottawa.',
        captionZh: '下半场面对渥太华竞技反扑，后防线与门将飞身极限封堵射门角度。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 400mm · f/5.6 · 1/3200s · ISO 1250'
      }
    ],
    content: `### 🏟️ Match 1 Dispatch: Vancouver FC 3-1 Atlético Ottawa (August 1, 2026)

**Author & Pitchside Photographer: Aaron Peng (Grade 11, Sports Lead Photographer)**
**Venue: Willoughby Community Park Stadium, Langley, BC**

In the midst of the Canadian Premier League (CPL) campaign, Vancouver FC delivered an unforgettable spectacle for the home supporters on August 1st. Staged at Willoughby Community Park, Vancouver FC transformed this highly anticipated fixture into a dominant attacking showcase, securing an emphatic **3-1 victory** over powerhouse Atlético Ottawa.

---

### ⚡ Electric Start & First-Half Supremacy

From the very opening whistle, Vancouver FC displayed flawless tactical execution and ferocious hunger, dictating the tempo across all zones:

- **7th Minute Breakout**: Midfield maestro **Damiano Pecile** unlocked Ottawa's defensive line with visionary spatial anticipation. Slicing through the backline with a surgical through-ball, he found his teammate in stride to slot home the opener for a **1-0 lead**!
- **Offensive Avalanche**: Riding the wave of early momentum, Vancouver FC maintained relentless intensity. Seamless passing triangles and lethal flank transitions led to two more clinical finishes before the interval, concluding a dream first half with an astonishing **3-0 lead**.

![7th Minute Breakout Assist & Team Celebration in Front of the Supporters](https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80)

The thousands of home supporters packing Willoughby Community Park erupted in unison, chanting and cheering as the squad headed into the locker room with full control.

---

### 🛡️ Defensive Fortitude & Securing the 3 Points

Facing a three-goal deficit, Atlético Ottawa regrouped in the second half and mounted aggressive counter-waves, eventually pulling one back midway through the second half to make it 3-1. 

![Second-half diving goalkeeping save preserving the clean sheet lead (Sony α7R V · FE 100-400mm GM @ 400mm)](https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80)

However, Vancouver FC’s backline demonstrated immense composure, aerial dominance, and tactical discipline. The defensive unit and goalkeeper neutralized multiple dangerous crosses, protecting the 3-1 advantage until the final referee whistle. The victory earned Vancouver FC crucial league points and exemplified the squad's tactical cohesion and determination.

---

### 📷 Pitchside Lens Diary (Aaron Peng)

Capturing professional CPL match action from the pitchside photo trenches at Willoughby demands rapid anticipation and gear readiness:
1. **Dual Camera Setup**: 
   - **Body 1**: Sony α7R V paired with FE 100-400mm f/4.5-5.6 GM OSS (dedicated to midfield duels, goalkeeper reaction saves, and eye-level intensity).
   - **Body 2**: Sony α7M IV paired with FE 70-200mm f/2.8 GM II (dedicated to sideline sliding tackles and close-up emotional goal celebrations).
2. **Exposure Discipline**: Locking shutter speeds at **1/2500s to 1/3200s** with Real-time Tracking AF (Human Eye/Body priority) allowed us to freeze every flying turf droplet and focused gaze during high-speed transitions.`,
    contentZh: `### 🏟️ 【第1场】兰里威洛比社区公园球场现场战报：温哥华FC 3-1 渥太华竞技

**作者 / 摄影：Aaron Peng（彭子轩，Grade 11 体育与赛事主摄影师）**
**比赛日期：2026年8月1日 · 地点：威洛比社区公园球场 (Willoughby Community Park Stadium)**

(兰里，不列颠哥伦比亚省) —— 在加拿大超级联赛（CPL）漫长且竞争激烈的夏日征程中，温哥华FC在8月1日为主场球迷奉献了一场堪称进攻教学局的精彩比赛。坐镇威洛比社区公园球场，温哥华FC将这场备受期待的对决变成了一场单方面的压制，最终以 **3-1** 干脆利落地击败了强敌渥太华竞技（Atlético Ottawa）。

---

### ⚡ 闪电开局与半场统治

比赛伊始，温哥华FC便展现出了极强的战术执行力与求胜欲望，从开球第一分钟起就牢牢将比赛节奏掌控在自己手中。球队的猛攻很快收到了回报：

- **第7分钟**：中场核心**达米亚诺·佩西莱（Damiano Pecile）**便用绝佳的视野撕裂了对手的防线。他送出了一记极具穿透力的精准直塞，助攻前锋冷静推射破门，将比分改写为 **1-0**！
- **进攻狂潮**：随后温哥华FC越战越勇，边路突破与中场拦截全面开花。球队在上半场展开了狂风暴雨般的连续冲击，在快速反击与定位球配合中连下两城，以令人窒息的 **3-0** 巨大优势结束了梦幻般的半场。

![第7分钟达米亚诺·佩西莱直塞助攻与看台千人狂欢破门瞬间](https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80)

威洛比社区公园球场的数千名主场球迷陷入了彻底的狂欢，整座球场回荡着助威战歌与欢呼声。

---

### 🛡️ 稳固防守与全场胜利

下半场易边再战，大比分落后的渥太华竞技发起疯狂反扑，并在中段利用一次边路传中扳回一球（3-1）。但温哥华FC的后防线展现出了极高的战术素养和沉着韧性：
- 中卫与门将多次完成关键的高空球争顶与禁区内飞身封堵；
- 球队合理控制比赛节奏，将 3-1 的胜果牢牢保持到了终场哨响。

![下半场门将飞身极限封堵射门角度 (Sony α7R V · FE 100-400mm GM @ 400mm · 1/3200s)](https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80)

这场胜利不仅为温哥华FC斩获了宝贵的联赛积分，更是全队在攻防两端极致战术执行力与拼搏精神的绝佳体现！

---

### 📷 边线摄影机位实战手记 (Aaron Peng)

作为常驻边线的体育摄影师，本场比赛的光照与高速对抗对捕捉精彩瞬间提出了极高要求：
1. **双机双镜配置**：
   - 主机 Sony α7R V 搭配 FE 100-400mm GM OSS，负责对角线半场进攻、头球争顶及面部神态抓拍；
   - 副机 Sony α7M IV 搭配 FE 70-200mm f/2.8 GM II，负责边线滑铲、换人及进球狂奔特写；
2. **曝光与对焦参数**：
   - 快门速度死死锁定在 **1/2500s ~ 1/3200s**，彻底定格草屑飞溅与高速球体；
   - 开启运动人体/眼部实时追踪，光圈全开或设在 f/4.5 确保长焦虚化与主体锐利；
3. **高光定格瞬间**：佩西莱第7分钟起脚直塞那一刹那，镜头精准捕捉到了他踢球瞬间的专注神态与皮球离脚的动感光影，随后三次进球庆祝的看台互动更记录了最纯粹的足球激情。`
  },
  {
    id: 'news-01',
    title: 'Match 2 · Vancouver FC 2-1 Pacific FC: 90th-Minute Stoppage Time Header Winner',
    titleZh: '【第2场】温哥华FC 2-1 太平洋FC：90分钟补时绝杀抓拍与边线实战速递',
    titleFr: 'Match 2 · Vancouver FC 2-1 Pacific FC : Victoire Épique à la 90e Minute de Jeu',
    summary: 'Sideline photojournalism dispatch from Willoughby Community Park. Freezing high-speed sliding tackles, turf spray, and the 90+2 minute stoppage time winner.',
    summaryZh: '【第2场焦点战】温哥华FC 2-1 绝杀太平洋FC。深入边线摄影位，利用1/3200秒超高速快门与FE 100-400mm GM定格补时第92分钟反击头球绝杀、飞溅草屑与球员狂喜瞬间。',
    summaryFr: 'Reportage photo exclusif depuis le bord du terrain au Willoughby Community Park. Victoire 2-1 dans les arrêts de jeu contre Pacific FC.',
    category: 'sports',
    date: '2026-08-28',
    readTime: '4 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=85',
    tags: ['Match2', 'VancouverFC', 'PacificFC', 'SportsAction', 'Sidelines', 'SonyAlpha', 'CPL', 'AaronPeng'],
    likes: 142,
    featured: false,
    matchStats: {
      fixture: 'Vancouver FC vs Pacific FC',
      stadium: 'Willoughby Community Park Stadium (Langley, BC)',
      score: '2 - 1',
      competition: 'Canadian Premier League (CPL)',
      keyMoment: 'Injury time 90+2 header winner after high press counterattack',
      keyMomentZh: '伤停补时第92分钟高位逼抢头球破门绝杀'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Midfield physical aerial battle captured with FE 100-400mm at 300mm.',
        captionZh: '中场高空争顶，FE 100-400mm 在 300mm 焦段下的高动态抓拍。',
        exif: 'Sony a7r6 · 300mm · f/5.0 · 1/3200s · ISO 1000'
      },
      {
        url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
        caption: 'Goalkeeper diving deflection during critical second-half penalty scare.',
        captionZh: '下半场门将飞身极限扑救，指尖触球瞬间水雾四溅。',
        exif: 'Sony a7r6 · 400mm · f/5.6 · 1/2500s · ISO 1250'
      },
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        caption: 'Goal celebration roar in front of the supporter section.',
        captionZh: '进球后球员奔向球迷看台的狂喜嘶吼与情感张力。',
        exif: 'Sony a7m5 · 70mm · f/2.8 · 1/1600s · ISO 800'
      }
    ],
    content: `### 🏟️ Match 2 Dispatch: Vancouver FC 2-1 Pacific FC (August 28, 2026)

**Author & Pitchside Photographer: Aaron Peng (Grade 11, Sports Lead Photographer)**
**Venue: Willoughby Community Park Stadium, Langley, BC**

Covering Vancouver FC on the sidelines demands continuous tactical anticipation and instant reflex shooting. In this fierce BC derby clash of the Canadian Premier League against Pacific FC on August 28th, lighting transitioned rapidly from harsh late-afternoon sun into vibrant stadium floodlights.

---

### ⚡ 90th-Minute Counterattack Thriller

The match remained deadlocked at 1-1 entering the dying embers of the contest. Both sides fought fiercely in midfield with high-octane physical challenges:

- **90+2 Stoppage Time Breakthrough**: Vancouver FC executed an aggressive high press on the opponent's flank, forcing a hurried turnover.
- **Header Winner**: A rapid cross curled sharply into the 6-yard box where the striker arrived in full flight to power a thumping header into the top corner, lifting Vancouver FC to a dramatic **2-1 derby victory**!

---

### 📷 Technical Sideline Strategy

By locking shutter speed at **1/3200s** with Auto ISO and tracking priority set to Athlete Body/Eye, we preserved every droplet of sweat and airborne turf particulate during sliding tackles. The 100-400mm GM provided the compression needed to isolate tactical duels without interfering with match officials.`,
    contentZh: `### 🏟️ 【第2场】兰里威洛比社区公园球场现场战报：温哥华FC 2-1 太平洋FC

**作者 / 摄影：Aaron Peng（彭子轩，Grade 11 体育与赛事主摄影师）**
**比赛日期：2026年8月28日 · 地点：威洛比社区公园球场 (Willoughby Community Park Stadium)**

在温哥华FC（Vancouver FC）主场边线进行拍摄，核心在于对战术推进的超前预判。本场对阵太平洋FC的焦点BC省德比在傍晚展开，光线从强烈的侧逆光迅速过渡至大功率球场泛光灯。

---

### ⚡ 伤停补时第92分钟绝杀

整场比赛双方战成 1-1 胶着状态，直至最后伤停补时阶段：
- **第92分钟逼抢突袭**：温哥华FC前场高位逼抢成功断球，边锋起高球传中；
- **头球破门绝杀**：前锋后插上头槌破门，连拍缓冲区在 0.4 秒内完整记录了皮球入网、网窝震颤与看台沸腾的连续画面，温哥华FC最终 **2-1** 拿下德比胜利！

---

### 📷 边线技术参数与器材配置

为了彻底冻结高速跑动与激烈的滑铲争抢，我们将快门速度锁定在 **1/3200 秒**，开启 Auto ISO，并将对焦主体识别设为运动人体/眼部追踪。FE 100-400mm GM 的长焦空间压缩感能够强力剥离背景看台杂物，突显对抗冲突。`
  },
  {
    id: 'news-02',
    title: 'UBC Thunderbirds Football Homecoming: Night Game Floodlight Action Report',
    titleZh: 'UBC雷鸟队主场橄榄球夜战纪实：泛光灯下的高对抗光影与高ISO把控',
    titleFr: 'Match des UBC Thunderbirds : Reportage Action Nocturne sous les Projecteurs',
    summary: 'Thunderbird Stadium under the lights. High-intensity football collisions, tackling mechanics, and pushing dual-base ISO.',
    summaryZh: 'UBC雷鸟体育场夜间焦点战。记录近万名观众呐喊下的高强度橄榄球身体冲撞，实战解析夜赛灯光下的高感光度噪点控制与防频闪技术。',
    summaryFr: 'Rapport exclusif au Thunderbird Stadium lors du match nocturne de football universitaire.',
    category: 'sports',
    date: '2026-08-20',
    readTime: '3 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1600&q=85',
    tags: ['UBCThunderbirds', 'Football', 'NightSports', 'HighISO', 'SonyAlpha'],
    likes: 118,
    featured: true,
    matchStats: {
      fixture: 'UBC Thunderbirds vs Calgary Dinos',
      stadium: 'Thunderbird Stadium (Point Grey Campus)',
      score: '31 - 24',
      competition: 'Canada West Conference Football',
      keyMoment: '4th quarter 45-yard interception returned for touchdown',
      keyMomentZh: '第四节最后阶段45码关键抄截回攻达阵'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80',
        caption: 'Quarterback release in heavy rain and stadium spotlight beams.',
        captionZh: '四分卫在雨中泛光灯束下强力出手传球瞬间。',
        exif: 'Sony a7r6 · 400mm · f/4.5 · 1/2000s · ISO 3200'
      },
      {
        url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
        caption: 'Goal-line defensive stand in final minutes.',
        captionZh: '终场前球门线上的肉搏防守阵线。',
        exif: 'Sony a7m5 · 200mm · f/2.8 · 1/2000s · ISO 2500'
      }
    ],
    content: `Thunderbird Stadium under torrential Pacific rain creates dramatic sports atmospheres. With floodlights cycling at 120Hz, enabling high-frequency anti-flicker shooting is essential to prevent dark banding across high-speed bursts.

Shooting wide open at f/2.8 on the 70-200mm and utilizing Sony's second native ISO base kept luminance noise uniform and organic, resembling classical sports photojournalism film grain.`,
    contentZh: `大雨倾盆的雷鸟体育场（Thunderbird Stadium）营造了极具电影感的赛场氛围。由于体育场大功率照明灯存在频闪，开启机身的高频防闪烁（Anti-Flicker）拍摄功能是确保每张连拍曝光一致的关键。

在 70-200mm f/2.8 和 200-600mm 之间快速切镜，将机身推入双原生 ISO 的第二基准档位（ISO 3200），噪点细腻均匀。第四节雷鸟队后卫完成关键45码抄截，全场起立欢呼的声浪与场边喷溅的水花被完整定格。`,
  },
  {
    id: 'news-03',
    title: 'Vancouver Canadians Baseball at Historic Nat Bailey Stadium: Golden Hour Diamond Magic',
    titleZh: '温哥华加拿大人棒球队纳特球场金光时刻：击球瞬间与全景双机位报道',
    titleFr: 'Baseball des Vancouver Canadians au Stade Historique Nat Bailey',
    summary: 'Chasing sunset shadows over Queen Elizabeth Park and historic baseball action. Fast swings, dirt slides, and outfield leaps.',
    summaryZh: '温哥华历史名场 Nat Bailey 晚霞光影纪实。结合 200-600mm 超长焦与 14mm 超广角双机位，捕捉击球员挥棒破空瞬间与主客场球迷狂欢。',
    summaryFr: 'Immersion au cœur du baseball professionnel au stade historique Nat Bailey lors de la belle saison.',
    category: 'sports',
    date: '2026-08-14',
    readTime: '3 min read',
    author: 'Aaron Peng & Justin Zhang',
    authorGrade: 'Grade 11',
    authorRole: 'Point Grey Photo Club Press Team',
    coverImage: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1600&q=85',
    tags: ['VancouverCanadians', 'MiLB', 'NatBailey', 'GoldenHour', 'Baseball'],
    likes: 96,
    featured: false,
    matchStats: {
      fixture: 'Vancouver Canadians vs Eugene Emeralds',
      stadium: 'Scotiabank Field at Nat Bailey Stadium',
      score: '6 - 3',
      competition: 'Northwest League (High-A)',
      keyMoment: 'Bottom of 7th 3-run home run cleared left field porch',
      keyMomentZh: '第7局下半3分全垒打直击左外野看台顶棚'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80',
        caption: 'Batter connect and bat splintering motion blur.',
        captionZh: '击球员强力击球瞬间，木棒微震与球体形变。',
        exif: 'Sony a7r6 · 600mm · f/6.3 · 1/4000s · ISO 640'
      }
    ],
    content: `Nat Bailey Stadium provides one of the most picturesque sporting backdrops in North America. When the setting sun illuminates the third-base baseline, contrasts are immense. 

Using 1/4000s shutter speeds, we froze the 95mph fastball contact point cleanly while using 14mm ultra-wide between innings to capture the nostalgic wooden grandstand architecture.`,
    contentZh: `位于伊丽莎白女王公园旁的 Nat Bailey 体育场拥有百年历史底蕴与壮丽的温哥华落日余晖。当日落光线斜射三垒边线时，明暗反差极大。

我们采用 1/4000 秒极速快门抓取 95 英里时速棒球撞击球棒的瞬间，同时在局间切换 14mm 超广角机身，记录复古木制看台与主场吉祥物欢庆的市井温情。`,
  },
  {
    id: 'news-vfc-cavalry-0905',
    title: 'Match 3 · Vancouver FC 1-0 Cavalry FC: Rainy Turf Stalemate Broken by 84th-Minute Volley',
    titleZh: '【第3场】温哥华FC 1-0 战胜卡尔加里骑兵：暴雨泥泞之战与第84分钟凌空抽射绝杀',
    titleFr: 'Match 3 · Vancouver FC 1-0 Cavalry FC : Victoire Héroïque sous le Déluge',
    summary: 'Pitchside dispatch from a stormy night at Willoughby Community Park. Freezing torrential rain droplets, heavy sliding tackles, and a sensational 84th-minute volley from outside the penalty box.',
    summaryZh: '威洛比社区公园暴雨夜战纪实。面对上届常规赛冠军卡尔加里骑兵，温哥华FC全队在泥泞草皮上拼死拦截，并在第84分钟凭借一记石破天惊的外围凌空抽射斩获全场唯一进球。',
    summaryFr: 'Reportage photo sous la pluie battante au Willoughby Community Park. Victoire 1-0 héroïque grâce à une reprise de volée à la 84e minute.',
    category: 'sports',
    date: '2026-09-05',
    readTime: '4 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=85',
    tags: ['Match3', 'VancouverFC', 'CavalryFC', 'RainGame', 'CPL', 'AaronPeng', 'Sidelines'],
    likes: 156,
    featured: false,
    matchStats: {
      fixture: 'Vancouver FC vs Cavalry FC',
      stadium: 'Willoughby Community Park Stadium (Langley, BC)',
      score: '1 - 0',
      competition: 'Canadian Premier League (CPL)',
      keyMoment: '84th-minute thunderous first-time volley into upper 90 corner',
      keyMomentZh: '第84分钟大禁区外凌空世界波死角抽射绝杀'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
        caption: 'Volley strike moment in pouring rain with ball spinning off wet boot laces.',
        captionZh: '暴雨中凌空抽射触球瞬间，皮球带起飞溅水珠与剧烈旋转。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 320mm · f/5.0 · 1/3200s · ISO 2000'
      },
      {
        url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
        caption: 'Diving save in soggy goalmouth keeping the clean sheet intact.',
        captionZh: '泥泞门前飞身扑救，门将手掌触球化解对手必进头球。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 400mm · f/5.6 · 1/2500s · ISO 2500'
      },
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Team celebration slide in the corner flag mud.',
        captionZh: '破门后全队狂奔至角旗区跪地滑铲庆祝，泥水四溅。',
        exif: 'Sony α7M IV · FE 70-200mm f/2.8 GM II @ 110mm · f/2.8 · 1/2000s · ISO 1600'
      }
    ],
    content: `### 🏟️ Match 3 Dispatch: Vancouver FC 1-0 Cavalry FC (September 5, 2026)

**Author & Pitchside Photographer: Aaron Peng (Grade 11, Sports Lead Photographer)**
**Venue: Willoughby Community Park Stadium, Langley, BC**

A classic Pacific Northwest autumn storm swept across Langley on match night. Heavy rainfall blanketed the pitch, testing equipment weather-sealing and demanding unrelenting stamina from both sides.

---

### ⚡ 84th-Minute Volley Stunner

Throughout 80 grueling minutes of tactical grinding, both backlines held firm against treacherous skidding balls. 

- **The Decisive Surge**: In the 84th minute, following a cleared corner kick, Vancouver FC's central midfielder stepped up to an aerial ball 25 yards out, unleashing an unstoppable first-time volley that dipped cleanly under the crossbar!
- **Clean Sheet Sealed**: The final ten minutes saw Cavalry FC launch desperate aerial bombardment, but Vancouver FC’s back four stood tall through intense physical aerial duels to preserve the 1-0 triumph.

---

### 📷 Pitchside Lens Diary (Aaron Peng)
Shooting in steady rain requires complete lens rain covers and carbon fiber monopod support:
1. **Weather Sealing Test**: The FE 100-400mm GM handled moisture effortlessly, maintaining instant AF lock even through thick sheets of falling rain.
2. **Exposure Strategy**: Pushed ISO up to **2000-2500** to sustain **1/3200s** shutter speed, freezing water droplets bursting off players' shoulders during physical challenges.`,
    contentZh: `### 🏟️ 【第3场】兰里威洛比社区公园现场战报：温哥华FC 1-0 卡尔加里骑兵

**作者 / 摄影：Aaron Peng（彭子轩，Grade 11 体育与赛事主摄影师）**
**比赛日期：2026年9月5日 · 地点：威洛比社区公园球场 (Willoughby Community Park Stadium)**

(兰里，不列颠哥伦比亚省) —— 典型的太平洋西北部秋季暴雨笼罩了整个赛场。高强度雨水与湿滑草皮极度考验球员体能与脚下控球，也给场边摄影师的器材防护与抓拍提出了极限考验。

---

### ⚡ 第84分钟石破天惊凌空绝杀

整整前80分钟，双方在泥泞中展开了白热化的身体肉搏，后防线均未给对手任何轻松起脚的机会：
- **致命一击**：比赛进行至第84分钟，角球被卡尔加里后卫顶出禁区，温哥华FC中场后插上，毫不犹豫迎球凌空抽射！皮球在雨雾中划出一道急速下坠的弧线直挂球门右上死角（1-0）！
- **众志成城零封**：随后客队全线压上高球轰炸，温哥华FC全员退守封堵，门将飞身将对方近距离补射拒之门外，把 1-0 的胜果死死守到了最后！

---

### 📷 边线摄影手记 (Aaron Peng)
1. **防雨与防雾策略**：套上专用长焦防雨罩，机身眼罩加装防雾垫圈，快门速度固定在 **1/3200秒**，将雨丝彻底凝固成颗粒状水珠。
2. **高感光表现**：暗光暴雨下机身推入 ISO 2000-2500，搭配 100-400mm GM 在 320mm 焦段的优秀锐度，精准捕捉到了球员起脚瞬间的凶悍眼神与草坪积水的飞溅光影。`
  },
  {
    id: 'news-whitecaps-mls-next',
    title: 'Whitecaps FC 2 vs Tacoma Defiance: MLS Next Pro Sideline Diary & Long-Lens Spatial Isolation',
    titleZh: '白浪二队（WFC2）vs 塔科马反抗：MLS Next Pro 职业梯队边线纪实与超长焦空间压缩',
    titleFr: 'Whitecaps FC 2 vs Tacoma Defiance : Immersion MLS Next Pro au Bord du Terrain',
    summary: 'Covering MLS Next Pro development league action at historic Swangard Stadium. 400mm telephoto framing, tactical pressing, and an intense penalty shootout conclusion.',
    summaryZh: '本拿比斯旺格体育场边线实拍手记。近距离记录温哥华白浪二队与西雅图海湾人预备队的激烈角逐，探索 400mm 超长焦在职业足球场上的纵深空间压缩与人物神态捕捉。',
    summaryFr: 'Immersion photographique au Swangard Stadium lors du duel MLS Next Pro entre Vancouver et Tacoma.',
    category: 'sports',
    date: '2026-08-25',
    readTime: '4 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=85',
    tags: ['WhitecapsFC2', 'MLSNextPro', 'SwangardStadium', 'SoccerPhotography', 'Telephoto', 'AaronPeng'],
    likes: 139,
    featured: false,
    matchStats: {
      fixture: 'Whitecaps FC 2 vs Tacoma Defiance',
      stadium: 'Swangard Stadium (Burnaby, BC)',
      score: '2 - 2 (PK 5-4)',
      competition: 'MLS NEXT Pro Western Conference',
      keyMoment: 'Decisive penalty shootout save and bench eruption',
      keyMomentZh: '点球大战第5轮门将下地封堵，替补席全员冲入场内庆祝'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
        caption: 'Penalty shootout diving save with crowd in blurred background.',
        captionZh: '点球决胜关键扑救，400mm 长焦虚化背景看台烘托门将孤独专注。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 400mm · f/5.6 · 1/2500s · ISO 1000'
      }
    ],
    content: `Swangard Stadium offers rare proximity to the touchline, surrounded by dense Douglas firs. Using 400mm telephoto lenses allowed isolating the psychological tension between penalty taker and goalkeeper during the nail-biting shootout, documenting the raw developmental pathway into Major League Soccer.`,
    contentZh: `斯旺格体育场被茂密的常青森林环绕，自然景致与球场红跑道形成鲜明色彩对比。超长焦 400mm 能够以极浅景深捕捉点球大战中球员与门将之间无声的心理博弈，记录年轻新秀迈向 MLS 职业赛场的真实拼搏轨迹。`
  },
  {
    id: 'news-salish-sea-derby-preview',
    title: 'Pacific FC vs Vancouver FC: Salish Sea Derby Preview, Projected Lineups & Island Battle',
    titleZh: '【萨利什海德比】太平洋FC vs 温哥华FC：赛前深度全瞻、预计首发阵容与海岛客场实拍手记',
    titleFr: 'Pacific FC vs Vancouver FC : Aperçu du Derby de la Mer des Salish, XIs Projetés',
    summary: 'Everything you need to know ahead of the fiery BC Coastal clash at Starlight Stadium. Tactical matchup, projected starting XIs, key duels, and photographic field vantage points.',
    summaryZh: '不列颠哥伦比亚省沿海宿敌之战即将在星光体育场打响。深度解析双方战术变阵、伤停疑问、首发十一人预测以及海岛赛场特色长焦机位指南，方便后续随时排版编辑。',
    summaryFr: 'Toutes les clés du choc côtier de la CPL à Langford : analyses tactiques, compositions probables et conseils de prises de vue.',
    category: 'sports',
    date: '2026-09-12',
    readTime: '5 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=85',
    tags: ['SalishSeaDerby', 'PacificFC', 'VancouverFC', 'CPL', 'MatchPreview', 'AaronPeng'],
    likes: 218,
    featured: true,
    matchStats: {
      articleType: 'preview',
      fixture: 'Pacific FC vs Vancouver FC',
      stadium: 'Starlight Stadium (Langford, Vancouver Island)',
      score: 'Agg: 0 - 0 (Kickoff 16:00 PDT)',
      competition: 'Canadian Premier League (CPL) · Coastal Rivalry',
      keyMoment: 'Midfield press transition battle & Island ferry fan arrival',
      keyMomentZh: '中场高位逼抢攻防转换与温哥华岛渡轮远征球迷方阵助威',
      broadcast: 'OneSoccer, FuboTV Canada, Telus Optik TV Ch. 980',
      kickoffTime: 'Saturday, Sept 19 · 16:00 PDT (19:00 EDT)',
      homeTeam: 'Pacific FC (Tridents)',
      awayTeam: 'Vancouver FC (Eagles)',
      homeFormation: '4-3-3 Attacking',
      awayFormation: '3-4-1-2 Counter',
      projectedHomeXI: [
        'GK: Emil Gazdov (#1)',
        'RB: Kunle Dada-Luke (#13)',
        'CB: Thomas Meilleur-Giguère (#26)',
        'CB: Aly Ndom (#5)',
        'LB: Christian Greco-Taylor (#3)',
        'CM: Steffen Yeates (#8)',
        'CM: Sean Young (#11)',
        'AM: Marco Domínguez (#6)',
        'RW: Dario Zanatta (#10)',
        'ST: Ayman Sellouf (#7)',
        'LW: Josh Heard (C, (#9))'
      ],
      projectedAwayXI: [
        'GK: Callum Irving (C, (#1))',
        'CB: Rocco Romeo (#4)',
        'CB: Matteo Campagna (#3)',
        'CB: David Norman Jr. (#15)',
        'RWB: Paris Gee (#2)',
        'CM: Vasco Fry (#8)',
        'CM: Renan Garcia (#16)',
        'LWB: James Cameron (#23)',
        'AM: Gabriel Bitar (#10)',
        'ST: Alejandro Díaz (#9)',
        'ST: Moses Dyer (#11)'
      ],
      doubts: {
        home: ['Cedric Toussaint (Hamstring - 50%)', 'Paul Amedume (Illness - Questionable)'],
        away: ['Kembo Kibato (Ankle - Out)', 'Anthony White (Knee - Day-to-Day)']
      },
      prediction: 'Pacific FC 1 - 2 Vancouver FC (Away Win)'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Starlight Stadium pitchside floodlights reflecting off Vancouver Island turf.',
        captionZh: '星光体育场泛光灯打在温哥华岛草皮上，海风与球员专注的神情交织。',
        exif: 'Sony α7R V · FE 70-200mm f/2.8 GM II @ 135mm · f/2.8 · 1/2000s · ISO 1600'
      },
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        caption: 'Intense midfield aerial duel under afternoon coastal sunlight.',
        captionZh: '中场高空争顶对决，长焦镜头抓拍肌肉瞬间紧绷与阳光勾勒出的轮廓线。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 320mm · f/5.6 · 1/3200s · ISO 800'
      }
    ],
    content: `## The Coastal Battle Returns to Vancouver Island

The **Salish Sea Derby** remains one of the most electric rivalries in Canadian domestic soccer. As Vancouver FC makes the ferry crossing to Langford, both squads are locked in a dead-heat postseason positioning battle.

![Starlight Stadium Warmup](https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80)

### Key Tactical Matchups

| Sector | Pacific FC Tridents | Vancouver FC Eagles | Tactical Advantage |
| :--- | :--- | :--- | :--- |
| **Flanks** | Kunle Dada-Luke overlap | James Cameron recovery | Pacific width vs VFC counter |
| **Engine Room** | Sean Young distribution | Vasco Fry pressing | High-tempo ball progression |
| **Frontline** | Ayman Sellouf 1v1 dribbles | Alejandro Díaz poaching | Penalty box ruthlessness |

> "Derbies aren't won with tactical diagrams alone; they are won in the mud and the 50-50 challenges." — *Touchline Pitchside Dispatch*

![Midfield Challenge](https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80)

### Expected Match Dynamics
With Vancouver FC utilizing a back three to absorb early waves of Island pressure, quick transitions through Bitar to Díaz will be the decisive factor.`,
    contentZh: `## 萨利什海德比：海岛客场的硝烟与战术博弈

**萨利什海德比（Salish Sea Derby）** 是加拿大超级联赛（CPL）中最具地域张力与球迷热情的对决之一。温哥华FC横渡乔治亚海峡造访温哥华岛兰福德星光体育场，不仅是两座城市的荣耀争夺，更是季后赛卡位战的关键战役。

![星光体育场赛前热身](https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80)

### 核心战术对位对比表

| 对决区域 | 太平洋FC (Tridents) | 温哥华FC (Eagles) | 战术关键点 |
| :--- | :--- | :--- | :--- |
| **边路走廊** | 达达-卢克 高速套上突破 | 詹姆斯·卡梅隆 强硬回追拦截 | 边路防线纵深拉扯 |
| **中场枢纽** | 肖恩·杨 精准长传调度 | 瓦斯科·弗莱 绞杀型高位逼抢 | 二点球拼抢与节奏转换 |
| **禁区终结** | 塞卢夫 内切穿透射门 | 迪亚斯 致命抢点门前包抄 | 机会转化率与高压下冷静度 |

> “德比从来不仅是战术板上的排兵布阵，更是每一脚 50/50 五五开争抢中的血性与执着。” —— *Point Grey 现场摄影团队边线札记*

![中场对抗瞬间](https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80)

### 摄影机位实测建议
星光体育场南看台下方底线是捕捉海风夕阳与替补席情绪爆发的最佳视点，建议携带 70-200mm f/2.8 与 400mm 定焦双机位作业。`
  },
  {
    id: 'news-whitecaps-lafc-concacaf-report',
    title: 'Vancouver Whitecaps vs LAFC: Champions Cup Thriller, 400mm Lens Isolation & Electric Night',
    titleZh: '温哥华白浪 2-1 绝杀洛杉矶FC：中北美冠军杯四分之一决赛边线特稿与 400mm 超长焦强强对话',
    titleFr: 'Vancouver Whitecaps 2-1 LAFC : Soirée Magique en Coupe des Champions de la Concacaf',
    summary: 'Pitchside at BC Place for an epic continental clash under the open roof. How isolating Denis Bouanga and Ryan Gauld with 400mm f/2.8 captured the raw intensity of an 88th-minute winner.',
    summaryZh: 'BC Place 开顶夜赛纪实。在 32,000 名狂热球迷助威声中，温哥华白浪凭借第88分钟反击挑射 2-1 绝杀美职联劲旅洛杉矶FC。以 400mm 大光圈特写凝固苏超球星高尔德与布安加的眼神杀气。',
    summaryFr: 'Immersion au BC Place pour le quart de finale de Concacaf. Victoire 2-1 arrachée à la 88e minute sous le toit ouvert.',
    category: 'sports',
    date: '2026-09-08',
    readTime: '6 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    coverImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=85',
    tags: ['VancouverWhitecaps', 'LAFC', 'CONCACAF', 'BCPlace', 'Telephoto400mm', 'RyanGauld'],
    likes: 245,
    featured: false,
    matchStats: {
      articleType: 'report',
      fixture: 'Vancouver Whitecaps FC vs Los Angeles FC (LAFC)',
      stadium: 'BC Place Stadium (Vancouver, BC)',
      score: '2 - 1 (FT)',
      competition: 'CONCACAF Champions Cup · Quarterfinal Leg 1',
      keyMoment: '88th-minute lightning counterattack chip over Hugo Lloris into roof of the net',
      keyMomentZh: '第88分钟边路闪电反击，大禁区角轻巧挑射越过洛里指尖吊入球网绝杀',
      broadcast: 'Apple TV MLS Season Pass, OneSoccer, FS1',
      kickoffTime: 'Wednesday · 19:30 PDT',
      homeTeam: 'Vancouver Whitecaps FC',
      awayTeam: 'Los Angeles FC',
      homeFormation: '3-4-2-1 Compact',
      awayFormation: '4-3-3 Heavy Metal',
      projectedHomeXI: [
        'GK: Yohei Takaoka (#18)',
        'CB: Ranko Veselinović (#4)',
        'CB: Tristan Blackmon (#6)',
        'CB: Mathías Laborda (#2)',
        'RWB: Ali Ahmed (#22)',
        'CM: Andrés Cubas (#20)',
        'CM: Pedro Vite (#45)',
        'LWB: Sam Adekugbe (#3)',
        'AM: Ryan Gauld (C, (#25))',
        'AM: Fafà Picault (#11)',
        'ST: Brian White (#24)'
      ],
      projectedAwayXI: [
        'GK: Hugo Lloris (#1)',
        'RB: Sergi Palencia (#14)',
        'CB: Jesús Murillo (#3)',
        'CB: Aaron Long (#33)',
        'LB: Ryan Hollingshead (#24)',
        'CM: Timothy Tillman (#11)',
        'CM: Eduard Atuesta (#20)',
        'CM: Ilie Sánchez (C, (#6))',
        'RW: Cristian Olivera (#27)',
        'ST: Mateusz Bogusz (#19)',
        'LW: Denis Bouanga (#99)'
      ],
      prediction: 'Vancouver Whitecaps 2 - 1 LAFC (Confirmed Result)'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
        caption: 'BC Place retractable roof open under twilight sky during anthems.',
        captionZh: 'BC Place 标志性开合顶棚向黄昏夜空敞开，看台白色海洋声浪震天。',
        exif: 'Sony α7R V · FE 24-70mm f/2.8 GM II @ 28mm · f/4.0 · 1/500s · ISO 800'
      },
      {
        url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ryan Gauld curling celebration towards Southside supporters section.',
        captionZh: '绝杀后队长高尔德冲向南看台死忠球迷区激情滑跪庆祝。',
        exif: 'Sony α7R V · FE 400mm f/2.8 GM OSS · f/2.8 · 1/2500s · ISO 2000'
      }
    ],
    content: `## A Historic Night Under the Vancouver Stars

When the retractable roof of BC Place pulled back to reveal the cool Pacific evening, over 32,000 supporters erupted into an unbroken wall of sound. Tonight’s CONCACAF Champions Cup quarterfinal pitted Vancouver's disciplined tactical structure against LAFC's explosive firepower.

![Stadium Panorama](https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80)

### Match Timeline & Key Statistics

| Minute | Event | Description |
| :--- | :--- | :--- |
| **14'** | ⚽ Goal (VAN) | Brian White header off precision Ryan Gauld set-piece |
| **58'** | ⚽ Goal (LAFC) | Denis Bouanga blistering cutback strike into bottom corner |
| **88'** | ⚽ Goal (VAN) | Ryan Gauld delicate chip over onrushing Hugo Lloris |

> "In continental football, you don't get second chances. The telephoto lens must follow the captain’s vision before the pass even leaves his boot."

![Celebration](https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80)

### Photographic Insights
Shooting at 1/2500s under LED stadium lighting was critical to freeze the sweat drops flying from defenders' foreheads during high-speed duels.`,
    contentZh: `## 星空下的历史性胜利：BC Place 欧陆级对抗之夜

当 BC Place 体育场的可伸缩天顶缓缓拉开，凉爽的太平洋夜风吹入球场，三万两千名球迷的助威声化作震耳欲聋的声浪。今晚的中北美冠军杯四分之一决赛首回合，是一场纯粹的战术纪律与顶尖个人能力的硬碰硬较量。

![体育场全景](https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80)

### 比赛关键事件与数据复盘

| 比赛时间 | 事件 | 战况简述 |
| :--- | :--- | :--- |
| **第14分钟** | ⚽ 白浪进球 (1-0) | 高尔德开出精准角球，前锋布莱恩·怀特头球轰入球网顶角 |
| **第58分钟** | ⚽ 洛杉矶进球 (1-1) | 金靴布安加左路内切低射死角扳平比分 |
| **第88分钟** | ⚽ 白浪绝杀 (2-1) | 高尔德反击单刀轻巧挑射越过世界杯冠军门将洛里指尖破门 |

> “在洲际淘汰赛的赛场上，机会转瞬即逝。摄影师的长焦镜头必须比传球更早预判到队长的视野。” —— *现场记者观察*

![绝杀狂欢](https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80)

### 边线摄影实战技巧
使用 400mm f/2.8 超长焦镜头定格布安加高速变向突破时，将快门锁定在 1/2500 秒以彻底凝固草屑与飞溅的汗滴，ISO 设为 2000 以确保画面纯净通透。`
  },
  {
    id: 'news-ubc-thunderbirds-final-report',
    title: 'UBC Thunderbirds vs Alberta Golden Bears: Canada West Championship Extra-Time Drama',
    titleZh: 'UBC雷鸟男足 3-2 加时绝杀阿尔伯塔金熊：加西大学联赛总决赛全记录与金球狂欢',
    titleFr: 'UBC Thunderbirds 3-2 Alberta Golden Bears : Finale de Canada West en Prolongation',
    summary: 'Sensational extra-time thriller at Thunderbird Stadium. Golden Goal drama in the 114th minute sends UBC to the national championship tournament.',
    summaryZh: 'Point Grey 半岛雷鸟体育场落日余晖下的荡气回肠之战。双方在常规时间内战成 2-2 平，加时赛第114分钟UBC凭借角球后点凌空扫射绝杀阿尔伯塔大学，全场球迷冲入球场共同狂欢。',
    summaryFr: 'Finale haletante au Thunderbird Stadium conclue par un but en or à la 114e minute.',
    category: 'sports',
    date: '2026-09-04',
    readTime: '4 min read',
    author: 'Justin Zhang',
    authorGrade: 'Grade 11',
    authorRole: 'Optical & Darkroom Lead',
    coverImage: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1600&q=85',
    tags: ['UBCThunderbirds', 'USPORTS', 'CanadaWest', 'ThunderbirdStadium', 'Championship'],
    likes: 182,
    featured: false,
    matchStats: {
      articleType: 'report',
      fixture: 'UBC Thunderbirds vs Alberta Golden Bears',
      stadium: 'Thunderbird Stadium (Point Grey, Vancouver)',
      score: '3 - 2 (AET 114\')',
      competition: 'U SPORTS Canada West Men’s Soccer Final',
      keyMoment: '114th-minute back-post volley from corner kick leading to pitch invasion',
      keyMomentZh: '加时赛第114分钟角球开出，后点凌空扫射绝杀引爆全场球迷冲场狂欢',
      broadcast: 'Canada West TV / Telus Optik',
      kickoffTime: 'Friday · 17:00 PDT',
      homeTeam: 'UBC Thunderbirds',
      awayTeam: 'Alberta Golden Bears',
      prediction: 'UBC 3 - 2 Alberta (Extra Time Confirmed)'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80',
        caption: 'UBC Thunderbirds team lifting the Canada West Championship trophy.',
        captionZh: '终场哨响，UBC雷鸟全队高高举起加西大学男足冠军奖杯。',
        exif: 'Sony α7 IV · FE 24-70mm f/2.8 GM II @ 35mm · f/2.8 · 1/1250s · ISO 640'
      }
    ],
    content: `Thunderbird Stadium sits at the western edge of Point Grey, overlooking the waters of the Salish Sea. In the dying minutes of extra time, an acrobatic volley secured the Canada West title for UBC in front of a capacity crowd.`,
    contentZh: `雷鸟体育场坐落在 Point Grey 半岛的最西端，依山傍海。在长达 120 分钟的高强度体能与意志拉锯战后，加时赛第114分钟的后点凌空抽射改写了历史，为主场作战的 UBC 雷鸟队赢得了通往全国锦标赛的金色门票。`
  },
  {
    id: 'news-truenorth-cfm-vwfc-preview',
    title: 'CF Montréal vs. Vancouver Whitecaps in Canadian Championship Action: Preview, Projected XIs, Doubts and How to Watch',
    titleZh: '【加拿大锦标赛半决赛次回合】蒙特利尔CF vs 温哥华白浪：赛前深度全瞻、预计首发11人、伤停疑云与观赛指南',
    titleFr: 'CF Montréal c. Whitecaps de Vancouver en Championnat Canadien : Avant-match, XI Probables, Doutes et Diffusion',
    summary: 'True North Foot match preview: With the semi-final tie tied 1-1 after the first leg and no away-goal advantage in effect, CF Montréal host the Western Conference-leading Vancouver Whitecaps at Stade Saputo for a spot in the Voyageurs Cup Final against Forge FC.',
    summaryZh: 'True North Foot 战术前瞻：首回合总比分 1-1 战平且不设客场进球规则，蒙特利尔CF坐镇萨普托体育场迎战领跑西区的温哥华白浪。胜者将挺进加拿大锦标赛总决赛对阵弗吉FC（Forge FC），争夺象征加拿大最高荣誉的旅行者杯！',
    summaryFr: 'Avant-match complet style True North Foot : À égalité 1-1 après le match aller et sans la règle des buts à l’extérieur, le CF Montréal accueille les Whitecaps de Vancouver au Stade Saputo pour une place en finale face au Forge FC.',
    category: 'sports',
    date: '2026-09-16',
    readTime: '6 min read',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'True North Foot Contributor & Pitchside Lead',
    coverImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=85',
    tags: ['TrueNorthFoot', 'CanadianChampionship', 'CFMontreal', 'VWFC', 'VoyageursCup', 'MatchPreview', 'ProjectedXIs', 'RyanGauld', 'SonyAlpha', 'AaronPeng'],
    likes: 245,
    featured: false,
    matchStats: {
      fixture: 'CF Montréal vs Vancouver Whitecaps FC',
      stadium: 'Stade Saputo (Montréal, QC)',
      score: '1 - 1 (1st Leg Agg)',
      competition: 'Canadian Championship Semi-Final · 2nd Leg',
      broadcast: 'OneSoccer, FuboTV Canada, Telus Optik TV Ch. 980',
      kickoffTime: 'Wednesday, Sep 16, 2026 · 19:00 ET / 16:00 PT',
      homeTeam: 'CF Montréal',
      awayTeam: 'Vancouver Whitecaps FC',
      homeFormation: '4-3-3',
      awayFormation: '3-4-2-1',
      projectedHomeXI: [
        'Thomas Gillier (GK)',
        'Dawid Bugaj (RB)',
        'Jalen Neal (CB)',
        'Luca Petrasso (CB)',
        'Brayan Vera (LB)',
        'Matthew Longstaff (CM)',
        'Victor Loturi (CDM)',
        'Daniel Pereira (CM)',
        'Noah Streit (RW)',
        'Prince Owusu (ST/C)',
        'Daniel Ríos (LW)'
      ],
      projectedAwayXI: [
        'Yohei Takaoka (GK)',
        'Tristan Blackmon (CB)',
        'Tate Johnson (CB)',
        'Édier Ocampo (RWB)',
        'Andrés Cubas (CDM)',
        'Ralph Priso (CM)',
        'Oliver Larraz (LWB)',
        'Emmanuel Sabbi (RW)',
        'Ryan Gauld (AM/C)',
        'Pedro Vite (AM)',
        'Brian White (ST)'
      ],
      doubts: {
        home: ['Frankie Amaya (Out - Knee)', 'Josh-Duc Nteziryayo (Out - Muscle strain)'],
        away: ['Thomas Müller (Doubt - Knock)', 'Ranko Veselinović (Out - Ankle)', 'Belal Halbouni (Out - Hamstring)']
      },
      prediction: 'CF Montréal 1 - 2 Vancouver Whitecaps FC (Whitecaps advance to Final)',
      articleType: 'preview',
      keyMoment: 'Aggregated 1-1 tie with no away goals advantage sets up an all-or-nothing 90 minutes at Stade Saputo.',
      keyMomentZh: '首回合 1-1 战平且无客场进球规则，萨普托体育场迎来直接决战，胜者进军加拿大锦标赛总决赛'
    },
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
        caption: 'Stade Saputo floodlights illuminating the pitch ahead of the second-leg Canadian Championship clash.',
        captionZh: '蒙特利尔萨普托体育场夜幕下的泛光灯照亮决战场地。',
        exif: 'Sony α7R V · FE 24-70mm f/2.8 GM II @ 35mm · f/4.0 · 1/500s · ISO 1250'
      },
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ryan Gauld directing attacking channels from the midfield pocket.',
        captionZh: '白浪队队长瑞安·高尔德（Ryan Gauld）在中前场串联进攻线路。',
        exif: 'Sony α7R V · FE 100-400mm GM @ 300mm · f/5.0 · 1/2500s · ISO 2000'
      },
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        caption: 'Prince Owusu battling for aerial supremacy in the 18-yard box.',
        captionZh: '蒙特利尔进攻核心普林斯·奥乌苏在禁区内争抢高空落点。',
        exif: 'Sony α7M IV · FE 70-200mm f/2.8 GM II @ 200mm · f/2.8 · 1/3200s · ISO 1600'
      }
    ],
    content: `### 🍁 Match Overview & High Stakes

The 2026 Canadian Championship reaches its boiling point this Wednesday as **CF Montréal** and **Vancouver Whitecaps FC** lock horns in the second leg of their semi-final showdown at **Stade Saputo**. 

Following a tightly contested **1-1 draw in the first leg** at BC Place, the aggregate scoreline is dead level. Crucially, **the away goals rule is not in effect** for this year’s Canadian Championship edition. The equation for both sides is brutally simple: **win and advance to face Forge FC** in the final on October 21; draw after 90 minutes, and the tie will head straight into extra time and penalties.

---

### 📺 How to Watch & Match Details

| Detail | Information |
| :--- | :--- |
| **Competition** | 2026 Canadian Championship Semi-Final (Second Leg) |
| **Date & Time** | Wednesday, September 16, 2026 · 19:00 ET / 16:00 PT |
| **Venue** | Stade Saputo, Montréal, QC |
| **Broadcast (Canada)** | OneSoccer (Live Stream & On Demand), FuboTV Canada |
| **Cable Provider** | Telus Optik TV (Channel 980) |
| **First Leg Result** | 1 - 1 (Aggregate tied 1-1) |

![Stade Saputo Floodlights & Pitch Preparation](https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80)

---

### 📊 Team Form & Context

#### 🔵 CF Montréal: Cup Redemption Amid MLS Slump
CF Montréal enter this second leg in difficult domestic league form, having lost their last three consecutive MLS games—including a frustrating 1-0 defeat to the Colorado Rapids—sinking to the lower tier of the Eastern Conference. 

However, cup football operates on an entirely distinct psychological plane. With their MLS playoff hopes waning, Montréal manager and players recognize that the Voyageurs Cup is their primary path to silverware and a coveted berth in the Concacaf Champions Cup. As local media noted, Montréal has *"nothing to lose"*, making them a wounded and unpredictable animal in front of their raucous home faithful. Their front-line relies heavily on top scorer **Prince Owusu** (13 MLS goals) and target-man **Daniel Ríos**.

#### ⚪ Vancouver Whitecaps: Chasing a Historic 5-Peat
Vancouver Whitecaps continue to be the standard-bearers of Canadian cup football. While recent MLS fixtures have felt like a rollercoaster (a 3-1 loss to St. Louis followed by a commanding 3-0 rout of LA Galaxy and a narrow 2-1 defeat at Austin FC), Vanni Sartini’s men remain comfortably positioned at the upper summit of the Western Conference.

The Whitecaps are chasing an unprecedented **fifth consecutive Canadian Championship crown**. Despite facing a 4,500-kilometer cross-country trek and a three-hour time-zone differential, Vancouver enter as the away favorites, boasting the deepest and most balanced spine in Canadian soccer.

![Ryan Gauld Conducting Transition Channels in Midfield](https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80)

---

### ⚔️ Head-to-Head History

Across **81 all-time competitive clashes** between these two storied rivals:
- **CF Montréal**: 33 wins
- **Vancouver Whitecaps**: 29 wins
- **Draws**: 19

Yet the modern trend heavily favors the West Coast outfit. In their last 16 meetings across all competitions, Montréal has failed to defeat Vancouver since 2022, with the Whitecaps capturing 8 victories and securing 2 draws.

---

### 📋 Projected Starting XIs & Tactical Setups

#### CF Montréal Projected XI (4-3-3)
- **Goalkeeper**: Thomas Gillier
- **Defenders**: Dawid Bugaj (RB), Jalen Neal (CB), Luca Petrasso (CB), Brayan Vera (LB)
- **Midfielders**: Matthew Longstaff (CM), Victor Loturi (CDM), Daniel Pereira (CM)
- **Forwards**: Noah Streit (RW), Prince Owusu (ST/C), Daniel Ríos (LW)

#### Vancouver Whitecaps Projected XI (3-4-2-1)
- **Goalkeeper**: Yohei Takaoka
- **Defenders**: Tristan Blackmon (CB), Tate Johnson (CB), Édier Ocampo (RWB)
- **Midfielders**: Andrés Cubas (CDM), Ralph Priso (CM), Oliver Larraz (LWB), Emmanuel Sabbi (RW)
- **Attacking Midfielders**: Ryan Gauld (AM/C), Pedro Vite (AM)
- **Striker**: Brian White (ST)

![Prince Owusu and Brian White Aerial Battle inside the Penalty Box](https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80)

---

### 🚑 Team News & Injury Doubts

#### CF Montréal
- ❌ **Frankie Amaya**: Ruled out (Knee injury sustained in training)
- ❌ **Josh-Duc Nteziryayo**: Ruled out (Hamstring strain)

#### Vancouver Whitecaps FC
- ⚠️ **Thomas Müller**: Questionable (Minor knock in weekend training; game-time fitness test)
- ❌ **Ranko Veselinović**: Out (Ankle sprain)
- ❌ **Belal Halbouni**: Out (Hamstring recovery)
- ❌ **Kwasi Poku & Kenji Cabrera**: Unavailable for selection

---

### 🔑 Three Tactical Matchup Keys

1. **The Midfield Anchor Clash: Andrés Cubas vs. Victor Loturi**
   Paraguayan international Andrés Cubas ranks among the elite ball-winners in North American soccer. If Cubas suffocates Montréal's midfield distributor Loturi, the hosts will struggle to feed Owusu in dangerous half-spaces.
2. **Ryan Gauld's Line-Breaking Vision**
   Scottish playmaker Ryan Gauld is the orchestrator of Vancouver’s attack. Montréal’s backline must step up without overcommitting, as Gauld’s weighted balls over the top into Brian White’s stride have terrorized MLS defenses all season.
3. **Set-Piece Fragility vs. Aerial Prowess**
   Both teams scored from dead-ball deliveries in the first leg. Stade Saputo’s open wind dynamics frequently accentuate second-ball chaotic scrambles in the penalty area.

---

### 📷 Sideline Photography Notes (Aaron Peng · Point Grey Collective)

Shooting night matches under Stade Saputo's floodlights requires tactical technical preparation:
- **Optical Gear**: Sony α7R V paired with FE 100-400mm f/4.5-5.6 GM OSS for tracking cross-pitch counter-attacks, complemented by a secondary α7M IV with FE 70-200mm f/2.8 GM II for sideline duels and technical area emotion.
- **Exposure Target**: Shutter speed locked at **1/2500s** to freeze ball rotation and flying turf. Aperture wide open at f/2.8–f/4 with Auto-ISO capped at ISO 6400 to preserve shadow fidelity under directional floodlighting.
- **Anticipated Shots**: Gauld’s free-kick delivery mechanics and goalkeeper Yohei Takaoka’s low-angle dive reaction off snap headers.

---

### 🔮 Score Prediction & Outlook

Sportsbooks favor Vancouver as slight away favorites (-159). Montréal will undoubtedly bring ferocious emotional energy in the opening 20 minutes to disrupt Vancouver's rhythm. However, the Whitecaps' tactical maturity and unmatched cup pedigree should ultimately see them through a gritty encounter.

**Prediction: CF Montréal 1 - 2 Vancouver Whitecaps FC (Whitecaps advance 3-2 on aggregate)**`,
    contentZh: `### 🍁 比赛前瞻与赛事背景

2026赛季加拿大锦标赛（Canadian Championship，即象征至高荣誉的“旅行者杯”）半决赛次回合决战将于本周三在蒙特利尔**萨普托体育场（Stade Saputo）**打响！由**蒙特利尔CF**坐镇主场，迎战西区榜首劲旅**温哥华白浪（Vancouver Whitecaps FC）**。

在双方首回合于卑诗体育馆（BC Place）的较量中，两队战成 **1-1 平局**，总比分完全处于同一起跑线。极其关键的一点是：**本届加拿大锦标赛不采用客场进球优势规则**！这意味着双方的晋级形势无比简单纯粹——90分钟内获胜者直接挺进10月21日的大决赛对阵弗吉FC（Forge FC）；若战平则进入加时赛与点球决战。

---

### 📺 比赛信息与观赛转播指南

| 比赛要素 | 详细信息 |
| :--- | :--- |
| **对阵赛事** | 2026 加拿大锦标赛半决赛（次回合） |
| **比赛时间** | 2026年9月16日（周三） 19:00 ET（东部） / 16:00 PT（太平洋时间） |
| **比赛场馆** | 蒙特利尔 萨普托体育场 (Stade Saputo, Montréal, QC) |
| **加拿大本土转播** | OneSoccer（全网现场直播与点播）、FuboTV Canada |
| **有线电视专区** | Telus Optik TV（980频道） |
| **首回合比分** | 1 - 1（总比分目前持平 1-1） |

![蒙特利尔萨普托体育场赛前草皮与夜幕泛光灯全景](https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80)

---

### 📊 两队近况与心态博弈

#### 🔵 蒙特利尔CF：联赛泥潭中的杯赛自救
蒙特利尔CF近期在MLS美职联联赛中状态挣扎，遭遇了一波连续三场失利（包括上一轮0-1不敌科罗拉多急流），滑落至东区积分榜下半区。

然而，杯赛往往拥有截然不同的竞技逻辑。在联赛争夺季后赛席位前景渺茫的情况下，旅行者杯冠军以及随之而来的**中北美及加勒比海冠军杯（Concacaf Champions Cup）**参赛门票，成为了全队唯一的救赎机会。正如此前媒体评价：“蒙特利尔在这场较量中已经毫无顾虑（nothing to lose）”，背水一战的主场气势极为危险。进攻端，他们全力仰仗攻入13粒MLS进球的当家射手**普林斯·奥乌苏（Prince Owusu）**与抢点中锋**丹尼尔·里奥斯（Daniel Ríos）**。

#### ⚪ 温哥华白浪：冲击史无前例的五连冠神话
温哥华白浪堪称加拿大杯赛无可撼动的绝对霸主。尽管近期美职联赛程起伏如过山车（1-3不敌圣路易斯、3-0完胜洛杉矶银河、客场1-2惜败奥斯汀FC），但主帅萨尔蒂尼率领的球队依然稳坐美职联西区积分榜第一梯队。

白浪队正在全力追逐**加拿大锦标赛史无前例的五连冠（5-peat）**！尽管面临横跨三个时区、长达4500公里的长途远征考验，但凭借阵容深度和核心阵容的成熟度，温哥华白浪在赛前各大机构预测中依然被视为主场之外的有力晋级热门。

![白浪队长瑞安·高尔德（Ryan Gauld）在中前场的手术刀式控球](https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80)

---

### ⚔️ 历史交锋数据盘点

两支加拿大豪门在各项官方赛事中总计有过 **81 次激战**：
- **蒙特利尔CF 获胜**：33场
- **温哥华白浪 获胜**：29场
- **战平**：19场

但在近年的交战记录中，白浪队占据压倒性心理优势：在双方近16次全赛事对决中，蒙特利尔自2022年起未尝一胜，白浪队斩获了其中的8场胜利与2场平局。

---

### 📋 双方预计首发阵容 (Projected Starting XIs)

#### 蒙特利尔CF 预计首发 (4-3-3)
- **门将 (GK)**：托马斯·吉利尔 (Thomas Gillier)
- **后卫 (DF)**：布加伊 (Dawid Bugaj / 右卫)、尼尔 (Jalen Neal / 中卫)、佩特拉索 (Luca Petrasso / 中卫)、维拉 (Brayan Vera / 左卫)
- **中场 (MF)**：朗斯塔夫 (Matthew Longstaff)、洛图里 (Victor Loturi / 单后腰)、佩雷拉 (Daniel Pereira)
- **前锋 (FW)**：施特赖特 (Noah Streit / 右翼)、普林斯·奥乌苏 (Prince Owusu / 队长中锋)、丹尼尔·里奥斯 (Daniel Ríos / 左翼)

#### 温哥华白浪 预计首发 (3-4-2-1)
- **门将 (GK)**：高丘阳平 (Yohei Takaoka)
- **后卫 (DF)**：布莱克蒙 (Tristan Blackmon)、约翰逊 (Tate Johnson)、奥坎波 (Édier Ocampo / 边翼卫)
- **中场 (MF)**：库瓦斯 (Andrés Cubas / 防守铁闸)、普里索 (Ralph Priso)、拉拉兹 (Oliver Larraz)、萨比 (Emmanuel Sabbi)
- **攻击中场 (AM)**：瑞安·高尔德 (Ryan Gauld / 队长)、佩德罗·维特 (Pedro Vite)
- **中锋 (ST)**：布莱恩·怀特 (Brian White)

![两队锋线与后防在禁区内的剧烈高空争顶对决瞬间](https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80)

---

### 🚑 伤病疑云与出战存疑名单 (Doubts & Absences)

#### 蒙特利尔CF 伤停：
- ❌ **弗兰基·阿马亚 (Frankie Amaya)**：缺阵（训练中膝关节扭伤）
- ❌ **乔什-杜克·恩特齐里亚约 (Josh-Duc Nteziryayo)**：缺阵（大腿肌肉拉伤）

#### 温哥华白浪 伤停与疑点：
- ⚠️ **托马斯·穆勒 (Thomas Müller)**：出战存疑（周末合练受轻微撞击，赛前热身最后决定能否替补）
- ❌ **兰科·维塞利诺维奇 (Ranko Veselinović)**：缺阵（脚踝韧带扭伤）
- ❌ **贝拉尔·哈尔布尼 (Belal Halbouni)**：缺阵（腿筋伤势恢复中）
- ❌ **波库 (Kwasi Poku) & 卡布雷拉 (Kenji Cabrera)**：未进入杯赛大名单

---

### 🎯 决定胜负的三大战术对位钥匙

1. **中场铁闸阻截：库瓦斯 vs 洛图里**
   巴拉圭国脚安德烈斯·库瓦斯是整个北美大联盟首屈一指的抢断拦截机器。如果他能切断蒙特利尔中场向奥乌苏输送的半空间通道，主队的进攻节奏将陷入停滞。
2. **“苏格兰梅西”高尔德的传球视野**
   白浪队长瑞安·高尔德是整支球队的战术大脑。蒙特利尔必须谨防后防线过度压上后，被高尔德送出穿透性极强的过顶挑传，直接打入布莱恩·怀特的跑动线路。
3. **定位球与二次落点搏杀**
   双方首回合的进球均源自定位球战术。萨普托体育场的风向开阔，在禁区内争抢落点后的第二反应将直接左右最终生死。

---

### 📷 边线实战拍摄手记 (Aaron Peng · Point Grey 摄影俱乐部)

在萨普托体育场的泛光灯下记录高强度杯赛对抗，机位与参数设定建议：
- **机身与镜头**：主机 Sony α7R V 搭配 FE 100-400mm f/4.5-5.6 GM OSS，用于对角线球门后方捕捉进攻突防；副机 α7M IV 挂载 FE 70-200mm f/2.8 GM II，捕捉边线抢断与教练席战术肢体语言；
- **参数控制**：快门速度锁定在 **1/2500s ~ 1/3200s** 确保定格高速飞行的皮球与草屑；光圈全开，Auto-ISO 设在上限 6400 以保证球场光影细节；
- **焦点抓取**：密切关注高尔德主罚任意球时的脚弓触球瞬间，以及门将高丘阳平在门线前的低平球飞身扑救。

---

### 🔮 专家预测与比分展望

各主流体育机构给出温哥华白浪客胜赔率（-159），稍占上风。蒙特利尔主场势必会在开局前20分钟掀起狂攻狂澜，但白浪队在杯赛硬仗中展现出的从容与战术执行力，更有望帮助他们在客场化险为夷。

**预测比分：蒙特利尔CF 1 - 2 温哥华白浪（温哥华白浪总比分3-2晋级决赛）**`
  }
];

export const INITIAL_TUTORIAL_LESSONS: TutorialLesson[] = [
  {
    id: 'tut-shutter-01',
    category: 'shutter',
    level: 'Beginner',
    levelZh: '新手入门',
    title: 'Mastering Shutter Speed: From 1/3200s Sports Freezing to 30s Silky Motion',
    titleZh: '快门速度 (Shutter Speed) 深度指南：从 1/3200s 赛场定格到 30s 丝绢慢门',
    titleFr: 'Maîtriser la Vitesse d’Obturation : Du Sport à 1/3200s à la Pose Longue de 30s',
    subtitle: 'Understand exposure duration, motion dynamics, the reciprocal rule, and mechanical vs electronic shutter in action.',
    subtitleZh: '彻底掌握曝光时间、动体凝固与流动感控制、安全手持快门法则及电子/机械快门实战选型。',
    readTime: '6 min read',
    recommendedGear: 'Telephoto Lens (70-200mm / 100-400mm) + Tripod for long exposure',
    keyFormulas: [
      {
        label: 'Handheld Safe Shutter Rule',
        labelZh: '安全手持快门经验公式',
        formula: 'Minimum Shutter Speed ≥ 1 / (Focal Length × Crop Factor)',
        explanationZh: '例如使用 400mm 全画幅长焦镜头手持无防抖时，快门至少需 1/400s 才能避免手部微抖导致的模糊。开启机身五轴防抖后可适当降低2-3档。'
      },
      {
        label: 'Motion Freezing Factor',
        labelZh: '动体凝固速度梯级',
        formula: 'Fast Action (1/2000s+) > Sports Running (1/1000s) > Walk/Portraits (1/250s) > Silky Water (1s+)',
        explanationZh: '足球抽射/棒球击球必须 1/2000s - 1/3200s；人物普通跑动 1/1000s；人像静止 1/250s；摇摄拉丝 1/15s - 1/30s。'
      }
    ],
    quickTipsZh: [
      '⚡ 体育抓拍宁可提升 ISO 也要保住高速快门（糊片无法后期拯救，噪点可以用算法降噪）。',
      '⚡ 拍摄摇摄（Panning）时，保持身体躯干平稳旋转，快门设在 1/20s - 1/50s，对准运动员躯干连拍。',
      '⚡ 室内或泛光灯球场拍摄时，若发现照片有黑白横向条纹，请开启【防闪烁拍摄 (Anti-Flicker)】或微调快门避开电源频率倍数。',
      '⚡ 电子快门在拍摄超高速棒球挥棒或高尔夫击球时可能会产生“果冻效应（Rolling Shutter）”，若机身非全局快门/堆栈式传感器，建议切回机械快门。'
    ],
    quickTips: [
      'Prioritize shutter speed over low ISO in sports: motion blur is irreversible, while noise can be cleaned.',
      'For panning shots, rotate your hips smoothly with the subject at 1/20s to 1/50s.',
      'Enable Anti-Flicker shooting under 120Hz stadium lights to avoid dark banded frames.',
      'Use mechanical shutter for extreme fast bat swings to prevent rolling shutter distortion on non-stacked sensors.'
    ],
    detailedGuideZh: `### 一、什么是快门速度（Shutter Speed）？
快门速度本质上是相机感光元件（传感器或胶片）**暴露在光线下的持续时间长短**，通常以秒或几分之一秒表示（例如 1/3200s、1/1000s、1/250s、1/2s、30s）。

快门速度对照片具有双重决定性影响：
1. **控制进光量（Exposure Brightness）**：快门开启时间越长，进入传感器的光子越多，画面越亮；快门越快，画面越暗。
2. **控制动体渲染（Motion Rendering）**：是“绝对定格瞬间”还是“留下轨迹流动感”。

---

### 二、快门速度档位对照实战速查表

| 场景与题材 | 推荐快门速度 | 效果与注意事项 |
| :--- | :--- | :--- |
| **Vancouver FC 足球 / 棒球挥棒** | **1/2000s - 1/3200s** | 彻底凝固飞射的皮球、变形的球棒、飞溅的草屑与球员紧绷肌肉。 |
| **UBC 橄榄球冲阵 / 奔跑运动** | **1/1000s - 1/1600s** | 冻结运动员奔跑、跳跃与肢体碰撞。 |
| **校园活动抓拍 / 街头纪实** | **1/250s - 1/500s** | 保证手持走动拍摄时不虚焦，捕捉自然表情。 |
| **自然光人像静态摆拍** | **1/125s - 1/250s** | 配合大光圈，满足手持安全快门要求。 |
| **赛道摇摄 / 追焦拉丝 (Panning)** | **1/15s - 1/40s** | 相机随主体等速水平转动，主体清晰而背景呈动感速度线。 |
| **大温海岸慢门海浪 / 瀑布水丝** | **1s - 15s (需三脚架+ND镜)** | 海水雾化成绸缎质感，展现静谧氛围。 |
| **星空银河 / 城市夜景车流** | **15s - 25s / 30s** | 记录车灯光轨与微弱星光。 |

---

### 三、社团实战经验：体育拍摄快门避坑指南
1. **别依赖 A 档（光圈优先）拍比赛**：如果在阴天或日落比赛时使用 A 档，相机自动测光可能会把快门降到 1/500s 甚至更慢，导致运动员手脚全糊。**推荐使用 M 档 + 固定 1/2000s + Auto ISO**。
2. **长焦镜头的安全快门陷阱**：使用 100-400mm 变焦镜头拧到 400mm 端时，轻微的手震在画面上会被放大 8 倍。手持拍摄必须保证快门速度不低于 1/500s。`,
    detailedGuide: `Shutter speed measures how long the camera sensor is exposed to light. In sports photography at Vancouver FC and UBC fixtures, our core baseline is 1/2000s to 1/3200s to freeze muscle tension and ball dynamics completely.`,
    practicalScenariosZh: [
      {
        scenario: 'Vancouver FC 边线高速反击',
        recommendedSettings: '1/3200s · f/4.5 · Auto ISO · AF-C 人物跟踪',
        why: '足球比赛中脚部出球速度可达 100km/h，低于 1/2000s 会导致脚部或皮球产生拖影拉丝。'
      },
      {
        scenario: 'UBC 校园夜间路跑追焦摇摄',
        recommendedSettings: '1/25s · f/5.6 · ISO 200 · 单点对焦平滑摆动机身',
        why: '利用较慢快门让背景产生强烈速度拉丝感，突出跑步者的前进动势。'
      },
      {
        scenario: 'Point Grey 海崖夕阳慢门海浪',
        recommendedSettings: '5s · f/11 · ISO 100 · 三脚架 + ND64 减光镜',
        why: '延长曝光时间使潮汐浪花雾化成梦幻牛奶质感。'
      }
    ],
    interactiveSimulatorType: 'shutter'
  },
  {
    id: 'tut-iso-02',
    category: 'iso',
    level: 'Beginner',
    levelZh: '新手入门',
    title: 'Demystifying ISO: Signal Amplification, Noise Architecture & Dual Base ISO',
    titleZh: '感光度 (ISO) 深度指南：信号增益原理、噪点控制与双原生ISO实战',
    titleFr: 'Démystifier les ISO : Amplification du Signal, Bruit & Double ISO Natif',
    subtitle: 'Learn how sensor gain works, luminance vs chroma noise, and how to shoot clean action in low-light stadium fixtures.',
    subtitleZh: '理解传感器电信号增益本质、明度与色彩噪点区分、暗光球场高感策略与现代 RAW 宽容度保护。',
    readTime: '5 min read',
    recommendedGear: 'Full-frame Mirrorless / Low-noise CMOS Sensors',
    keyFormulas: [
      {
        label: 'Exposure Value Step (Stop)',
        labelZh: 'ISO 档位翻倍规律',
        formula: 'ISO 100 → 200 → 400 → 800 → 1600 → 3200 → 6400 (Every step = +1 EV Light Gain)',
        explanationZh: '每提升一档 ISO（例如从 800 到 1600），传感器对电信号的放大倍率翻倍，等同于进光量增加一倍，但底噪也会随之被放大。'
      },
      {
        label: 'Dual Base ISO Jump',
        labelZh: '双原生 ISO 跃迁机制',
        formula: 'Sony A7 IV: Base 1 = ISO 100, Base 2 = ISO 400 | A7S III: Base 1 = ISO 80, Base 2 = ISO 204800 / 12800',
        explanationZh: '在第二原生 ISO 档位时，电路切换至高增益低噪点通道，画面噪点比前一档（如 ISO 320）反而更干净，动态范围大幅回升！'
      }
    ],
    quickTipsZh: [
      '⚡ 噪点不可怕，可怕的是欠曝后强行提亮：在拍摄时宁可稍微“向右曝光（ETTR）”，也不要在后期强行拉高暗部曝光（会带出大量彩噪）。',
      '⚡ 明度噪点（Luminance Noise）类似细密胶片颗粒，通常保留质感无需抹除；色彩噪点（Chroma Noise）是红绿杂色色块，应在降噪中重点滤除。',
      '⚡ 球场夜战铁律：ISO 6400 + 清晰锐利的球员照片，永远优于 ISO 800 + 模糊虚晃的废片！'
    ],
    quickTips: [
      'Noise is better than motion blur: never sacrifice shutter speed to keep ISO low in action photography.',
      'Shoot ETTR (Expose to the Right) to minimize shadow noise in post-processing.',
      'Understand your camera\'s dual-base ISO steps to get cleaner images at higher sensitivities.'
    ],
    detailedGuideZh: `### 一、什么是 ISO（感光度）？
在数码摄影时代，**ISO 并不是改变传感器吸收光线的能力**（进光量完全由光圈和快门决定），而是**将传感器光电二极管产生的微弱电信号进行放大（Gain）的放大倍数**。

- **原生基础 ISO（如 ISO 100）**：传感器输出纯净信号，信噪比最高，动态范围最广（可达 14-15 档 EV），色彩最饱满。
- **高 ISO（如 ISO 3200 - 12800）**：在弱光环境下将微弱光信号强行放大数倍，不可避免地连同传感器底层的热噪声、读出噪声一同放大，从而在画面中产生颗粒感与杂色。

---

### 二、ISO 推荐设置与画质策略

| 环境光照条件 | 推荐 ISO 设置 | 适用场景 |
| :--- | :--- | :--- |
| **晴朗日光 / 海岸晴天** | **ISO 50 - 100** | 追求极限纯净度、超宽动态范围与风光风貌。 |
| **多云阴天 / 室内明亮窗边** | **ISO 200 - 400** | 保障足够快门速度同时维持细腻肤色与高解析力。 |
| **室内体育馆 / 校园礼堂演出** | **ISO 800 - 1600** | 配合 f/2.8 镜头维持 1/500s 抓拍快门。 |
| **Vancouver FC / UBC 泛光灯夜赛** | **ISO 2500 - 6400** | 强行支撑 1/2000s 高速快门，定格夜间激烈对抗。 |
| **微光星空 / 暗夜街头霓虹** | **ISO 3200 - 6400** | 配合大光圈镜头捕获微弱星辰。 |

---

### 三、什么是“双原生 ISO（Dual Base ISO）”？
索尼与现代全画幅传感器普遍搭载了双原生转换增益电路（Dual Gain Output）。
例如索尼 Alpha 系列机身，当 ISO 从 320 跨入 400（或从 640 跨入 800）时，硬件电路会自动切换到更低电容的高增益通道，此时**ISO 400 的信噪比和动态范围甚至比 ISO 320 还要更好**！掌握这个阶梯点，能让你的暗光夜赛画质大幅跃升。`,
    detailedGuide: `ISO represents sensor signal amplification gain. In high-speed night sporting events at UBC and Vancouver FC, we frequently leverage ISO 3200 to 6400 with modern denoising pipelines.`,
    practicalScenariosZh: [
      {
        scenario: '雷鸟球场雨夜橄榄球',
        recommendedSettings: 'ISO 3200 · 1/2000s · f/2.8',
        why: '即使球场有照明，由于要求 1/2000s 超短曝光，必须推高 ISO 至第二原生档位获取正确曝光。'
      },
      {
        scenario: 'Point Grey 214 暗房内操作抓拍',
        recommendedSettings: 'ISO 6400 · 1/125s · f/1.4',
        why: '暗房仅有微弱红色安全灯，超大光圈搭配高 ISO 记录胶片冲印匠人专注神态。'
      }
    ],
    interactiveSimulatorType: 'iso'
  },
  {
    id: 'tut-aperture-03',
    category: 'aperture',
    level: 'Beginner',
    levelZh: '新手入门',
    title: 'Aperture & Depth of Field: Optical Bokeh, Subject Isolation & Sharpness Sweet Spots',
    titleZh: '光圈与景深 (Aperture & DoF) 深度指南：虚化美学、主体剥离与镜头最佳锐度',
    titleFr: 'Ouverture & Profondeur de Champ : Bokeh, Isolation & Piqué Optique',
    subtitle: 'Decode f-numbers, understand background separation on sidelines, and avoid optical diffraction.',
    subtitleZh: '详解 f值倒数关系、景深三要素（光圈/焦距/物距）、长焦体育背景净化与衍射极限。',
    readTime: '5 min read',
    recommendedGear: 'Fast Prime (85mm f/1.2 / 35mm f/1.4) or Pro Zoom (70-200mm f/2.8)',
    keyFormulas: [
      {
        label: 'Aperture f-number definition',
        labelZh: '光圈 f 值物理定义',
        formula: 'f-number = Focal Length / Entrance Pupil Diameter',
        explanationZh: 'f值越小（如 f/1.4、f/2.8），物理通光孔径越大，通光量越高，景深越浅（背景虚化越强）。'
      },
      {
        label: 'Sharpness Sweet Spot',
        labelZh: '镜头最佳锐度光圈区间',
        formula: 'Sweet Spot ≈ Max Aperture stopped down by 2 to 3 stops (Typically f/5.6 - f/8)',
        explanationZh: '全开光圈时边缘暗角和色散较明显，收缩至 f/5.6-f/8 时中心与边缘解析力达到顶峰；超过 f/16 后因光线衍射（Diffraction）画质反而会软化。'
      }
    ],
    quickTipsZh: [
      '⚡ 体育拍摄中为何专业摄影师独爱 70-200mm f/2.8 与 400mm f/2.8？因为大光圈搭配超长焦能够将杂乱的广告牌与看台虚化成纯净背景，瞬间凸显运动员！',
      '⚡ 拍多人合影时切忌使用 f/1.4：过浅的景深会导致前排人清晰而后排人面部脱焦，至少应收缩至 f/4 - f/5.6。',
      '⚡ 风光慢门海浪推荐 f/8 - f/11，避免使用 f/22 以免光学衍射降低清晰度。'
    ],
    quickTips: [
      'Fast telephotos (f/2.8) clean up busy stadium sponsor boards into creamy backdrops.',
      'Stop down to f/4-f/5.6 for group photos to ensure all faces remain in focus.',
      'Avoid f/16-f/22 for landscapes due to optical diffraction softness.'
    ],
    detailedGuideZh: `### 一、什么是光圈（Aperture）？
光圈位于镜头内部，由多片光圈叶片组成，用于**调节进入相机的光束截面积大小**。

光圈用 **f 值** 表示（如 f/1.2、f/1.4、f/2.8、f/4、f/5.6、f/8、f/11、f/16）。注意：**f 值是一个分母，数值越小代表光圈开得越大！**

---

### 二、景深的三大决定因素
景深是指画面中焦点前后“清晰对焦范围”的纵深大小：
1. **光圈大小**：光圈越大（f值越小），景深越浅（虚化越强）；光圈越小，景深越深。
2. **镜头焦距**：焦距越长（如 400mm vs 24mm），长焦压缩感带来极其强烈的背景虚化。
3. **拍摄距离（物距与背景距离）**：相机离主体越近、且主体离背景越远，虚化越极致。`,
    detailedGuide: `Aperture controls both light gathering and depth of field. Wide apertures like f/2.8 on our 70-200mm lenses allow us to slice through background distractions on the sidelines.`,
    practicalScenariosZh: [
      {
        scenario: '球场边线球星单人特写',
        recommendedSettings: 'f/2.8 · 200mm · 1/2500s · ISO 400',
        why: '长焦大光圈把看台观众完全虚化，将所有视觉焦点凝聚在球员坚毅的眼神与汗珠上。'
      },
      {
        scenario: 'Point Grey 摄影社全员大合照',
        recommendedSettings: 'f/5.6 · 35mm · 1/200s · ISO 100',
        why: '中等光圈提供足够的景深覆盖多排学生，确保每个人面部毛孔均清晰可见。'
      }
    ],
    interactiveSimulatorType: 'aperture'
  },
  {
    id: 'tut-exposure-04',
    category: 'exposure',
    level: 'Intermediate',
    levelZh: '进阶实操',
    title: 'The Exposure Triangle & Metering Workflow: Balancing EV in Real Time',
    titleZh: '曝光三要素与测光实战：在赛场与多变光线中精准平衡 EV 曝光值',
    titleFr: 'Le Triangle d’Exposition & Modes de Mesure : Équilibrer l’EV en Temps Réel',
    subtitle: 'Master the interplay between Shutter, Aperture, and ISO; choose between Matrix, Spot, and Highlight-Weighted metering.',
    subtitleZh: '掌握快门、光圈与ISO的互易代换定律，精通多重测光、点测光与高光优先测光在球场白色球衣上的实战。',
    readTime: '6 min read',
    recommendedGear: 'Mirrorless EVF with Real-time Live Histogram & Zebra pattern',
    keyFormulas: [
      {
        label: 'Exposure Reciprocity Law',
        labelZh: '曝光互易律（等量代换原则）',
        formula: '1 Stop Shutter Faster (e.g. 1/1000s → 1/2000s) = Need 1 Stop Larger Aperture (f/4 → f/2.8) OR 1 Stop Higher ISO (400 → 800)',
        explanationZh: '无论如何改变参数，只要三要素的档位增减总和为零，画面的总进光亮度和曝光值（EV）就完全保持恒定。'
      }
    ],
    quickTipsZh: [
      '⚡ 开启机身电子取景器的【斑马线（Zebra Patterns）】设为 100+，当白色球衣或天空出现斜纹时即代表高光即将过曝。',
      '⚡ 开启【实时直方图（Live Histogram）】，确保直方图波形尽量靠右但最右端不贴墙（ETTR 最佳信噪比）。',
      '⚡ 面对白色球衣或黑色球衣球队时，矩阵测光容易被大面积深浅色误导，建议使用 M 档锁定曝光。'
    ],
    quickTips: [
      'Use 100+ zebra stripes in EVF to guard against blown-out stadium floodlights or white jerseys.',
      'Leverage live histograms for precise ETTR exposure balancing.',
      'Lock exposure in Manual mode when team jerseys bias matrix metering calculations.'
    ],
    detailedGuideZh: `### 一、曝光三要素的动态天平
曝光三要素（快门速度、光圈、ISO）就如同一个三脚架：
- **快门**：决定时间的切片（动与静）。
- **光圈**：决定光束的口径与空间深度（虚与实）。
- **ISO**：决定传感器的信号放大倍率（纯净与噪点）。

任何一者的变动，都可以通过另外两者的调整来维持总曝光恒定。

---

### 二、测光模式在赛事与活动中的选型指南
1. **多重测光 / 评价测光（Multi / Matrix Metering）**：对全画面明暗进行加权平均，适合风光与均匀光照场景。
2. **点测光（Spot Metering）**：仅测量画面中心（或对焦点位置）约 2% 的微小区域，在逆光舞台、聚光灯下的独唱表演者或强烈背光体育场极为关键。
3. **高光优先测光（Highlight-Weighted Metering）**：相机智能保护最亮区域不过曝，非常适合拍摄身穿全白球衣的足球运动员，防止球衣纹理死白丢失细节。`,
    detailedGuide: `The exposure triangle orchestrates shutter speed, aperture, and ISO in harmony. Using EVF histograms and zebra warnings allows instantaneous calibration.`,
    practicalScenariosZh: [
      {
        scenario: 'Vancouver FC 白色主场球衣烈日对决',
        recommendedSettings: 'M档 · 1/3200s · f/4 · ISO Auto · 开启高光优先测光',
        why: '保护白色球衣与面部高光不产生死白过曝，保留衣服褶皱质感。'
      }
    ],
    interactiveSimulatorType: 'exposure'
  },
  {
    id: 'tut-sports-05',
    category: 'sports_action',
    level: 'Advanced',
    levelZh: '专业大师',
    title: 'Sideline Sports Field Manual: Real-Time AF Tracking, Continuous Buffers & Venue Protocols',
    titleZh: '体育与动体摄影进阶实战：AF-C 实时追踪、连拍缓存管理与场边记者工作流',
    titleFr: 'Manuel de Terrain Sport : Suivi AF-C, Rafales & Protocoles en Bord de Touche',
    subtitle: 'From Vancouver FC to UBC Thunderbirds: tracking sensitivity, back-button focus, pre-capture, and sideline safety rules.',
    subtitleZh: '从温哥华FC到UBC雷鸟队：对焦灵敏度阻尼调节、AF-ON后背对焦、预拍摄缓存与赛场边线安全礼仪。',
    readTime: '7 min read',
    recommendedGear: 'Sony a7r6 / a7m5 / a6700 + FE 100-400mm / 200-600mm + Monopod + CFexpress Card',
    keyFormulas: [
      {
        label: 'Continuous Burst Rate & Buffer Math',
        labelZh: '高速连拍与卡速吞吐公式',
        formula: 'Sustained Burst Duration = Buffer Capacity / (Frame Rate - Write Speed / File Size)',
        explanationZh: '使用 CFexpress Type A 或 V90 SD 卡可实现 30fps 无限连拍不卡顿，避免在关键进球瞬间因缓存写满而漏拍。'
      }
    ],
    quickTipsZh: [
      '⚡ 场边拍摄永远双眼保持警惕：一只眼看取景器，另一只眼观察全场局势，避免被出界的高速皮球或飞铲球员撞伤！',
      '⚡ 使用独脚架（Monopod）承托 200-600mm 重炮镜头，能大幅缓解 90 分钟手持臂力疲劳并提高俯仰平稳度。',
      '⚡ 设定【AF-C 对焦灵敏度（Tracking Sensitivity）】为“锁定/迟钝（1-2档）”，防止传球时其他防守队员从镜头前掠过导致焦点瞬间被抢走。'
    ],
    quickTips: [
      'Always keep both eyes open on sidelines to anticipate errant balls or sliding players.',
      'Use a carbon monopod for 200-600mm setups to sustain stability across 90-minute fixtures.',
      'Set AF tracking sensitivity to "Locked-on" to prevent passing referee obstacles from stealing focus.'
    ],
    detailedGuideZh: `### 一、赛场摄影机身与对焦核心设置
1. **对焦模式**：坚决锁定 **AF-C（连续自动对焦）**。
2. **对焦区域**：推荐 **实时追踪：扩展点（Tracking: Expand Flexible Spot）** 或 **广域（Wide）**。
3. **主体识别**：锁定 **人物（Human）** 并开启眼部/面部优先。
4. **后背对焦（Back-Button Focus）**：将快门按键半按对焦取消，由机背的 **AF-ON 按键** 独立控制对焦，快门按键纯粹负责击发。这样在构图调整或等待时无需反复重新激活对焦。

---

### 二、温哥华各大体育场边线工作礼仪
1. **持证区域守则**：必须全程身着赛事官方媒体马甲（Media Bib），严禁进入草皮边线以内（保持在广告牌后方至少 1 米）。
2. **严禁闪光灯**：在任何职业与大学体育比赛中，场边绝对禁止使用机顶闪光灯或任何人工频闪光源，以免致盲运动员或干扰裁判视线。
3. **尊重换人与边裁跑动路线**：边线裁判经常在边线侧向折返跑，摄影师设备包与脚架不可阻挡其跑动视线。`,
    detailedGuide: `Mastering sideline action requires athletic anticipation, dialed-in AF-C tracking parameters, high-speed CFexpress pipelines, and adherence to stadium safety standards.`,
    practicalScenariosZh: [
      {
        scenario: 'Vancouver FC 边线高速防守反击',
        recommendedSettings: 'AF-C 实时追踪 · 连拍 Hi+ · 1/3200s · f/5.6 · 独脚架支撑',
        why: '保证在球员高速带球变向时焦点死死咬住眼部，连拍缓存无缝写入。'
      }
    ],
    interactiveSimulatorType: 'sports_action'
  }
];

// ==========================================
// PGPC 精选素材库 (Material Vault Items)
// ==========================================
export const INITIAL_MATERIALS: import('../types').MaterialVaultItem[] = [
  {
    id: 'mat-footage-01',
    title: 'Bo-Kaap Coastal Architecture 4K Log',
    titleZh: '大温海岸与复古街区晨光 4K S-Log3 样片',
    category: 'footage',
    categoryLabelZh: '视频样片',
    resolution: '4K UHD (3840×2160)',
    fps: '59.94 fps',
    colorProfile: 'Sony S-Log3 / S-Gamut3.Cine',
    lens: 'FE 24-70mm f/2.8 GM II',
    camera: 'Sony FX3 Cinema Line',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
    duration: '00:18',
    fileSize: '1.42 GB',
    format: 'ProRes 422 HQ 10-bit',
    tags: ['城市建筑', '广角慢运镜', 'S-Log3', '晨光黄金时刻', '59.94p'],
    downloads: 1420,
    author: 'Aaron Peng',
    descriptionZh: '使用 Sony FX3 + 24-70 GM II 拍摄的高画质晨光街区建筑推镜头。保留最大动态范围与阴影细节，色彩空间为 S-Gamut3.Cine，适合剪辑调色练习与商业配图。',
    description: '4K ProRes 422 HQ sample clip shot on Sony FX3 in S-Log3. Perfect for grading drills and dynamic range tests.',
    createdAt: '2026-08-28',
    isCommercialAllowed: true
  },
  {
    id: 'mat-footage-02',
    title: 'Stanley Park Forest Mist 120fps Slow-Mo',
    titleZh: '斯坦利公园针叶晨雾 120fps 4K 升格慢动作',
    category: 'footage',
    categoryLabelZh: '视频样片',
    resolution: '4K UHD (3840×2160)',
    fps: '120.00 fps (5x Slow)',
    colorProfile: 'Sony S-Log3 / S-Gamut3.Cine',
    lens: 'FE 70-200mm f/2.8 GM II',
    camera: 'Sony α7R V',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sun-rays-in-the-middle-of-the-fog-in-a-forest-42407-large.mp4',
    duration: '00:32',
    fileSize: '2.15 GB',
    format: 'All-Intra 10-bit 4:2:2',
    tags: ['自然风光', '丁达尔光束', '120fps升格', '长焦压缩感', '森林晨雾'],
    downloads: 2105,
    author: 'Evan Harrison',
    descriptionZh: '温哥华温带雨林丁达尔圣光高帧率升格视频，水雾颗粒清晰可见，可实现 5 倍顺滑慢动作渲染。',
    description: '120fps ultra-slow-motion clip capturing god rays through towering Douglas firs.',
    createdAt: '2026-08-25',
    isCommercialAllowed: true
  },
  {
    id: 'mat-footage-03',
    title: 'Vancouver FC Sideline Burst Action 4K',
    titleZh: 'Vancouver FC 边线高速攻防 4K 60p 现场原片',
    category: 'footage',
    categoryLabelZh: '视频样片',
    resolution: '4K DCI (4096×2160)',
    fps: '59.94 fps',
    colorProfile: 'Cine4 / Rec.709 Neutral',
    lens: 'FE 100-400mm f/4.5-5.6 GM OSS',
    camera: 'Sony α7M IV',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-match-in-a-stadium-at-night-41566-large.mp4',
    duration: '00:15',
    fileSize: '980 MB',
    format: 'XAVC S-I 4K',
    tags: ['体育竞技', '足球边线', '高速追焦', '100-400mm', '超长焦'],
    downloads: 1880,
    author: 'Aaron Peng',
    descriptionZh: '职业足球联赛边线持证拍摄的高速拼抢机位镜头，包含草皮飞溅与高速变向特写，适合快节奏剪辑与转场练习。',
    description: 'High-energy sideline footage with telephoto compression and rapid focus tracking.',
    createdAt: '2026-08-20',
    isCommercialAllowed: true
  },
  {
    id: 'mat-photo-01',
    title: 'Point Grey Natural Light Portrait RAW Master',
    titleZh: 'Point Grey 校园柔光人像 61MP 无损 RAW/DNG 原片包',
    category: 'photo',
    categoryLabelZh: '摄影原图',
    resolution: '61MP (9504×6336)',
    fps: 'Still RAW',
    colorProfile: '14-bit Uncompressed RAW (DNG)',
    lens: 'RF 85mm f/1.2 L USM',
    camera: 'Canon EOS R5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    duration: '1 Frame (Multi-Crop)',
    fileSize: '124 MB',
    format: 'Adobe DNG / Canon CR3',
    tags: ['人像摄影', '6100万像素', '自然逆光', '高宽容度', 'RAW修图练习'],
    downloads: 3410,
    author: 'Amber Hao',
    descriptionZh: '包含完整 14-bit 高动态范围的无损人像 RAW 文件。保留全部高光发丝与暗部皮肤纹理，专供 Lightroom / Capture One 人像精修调色练习。',
    description: 'Full 14-bit uncompressed RAW portrait file ready for professional grading.',
    createdAt: '2026-08-15',
    isCommercialAllowed: true
  },
  {
    id: 'mat-lut-01',
    title: 'PGPC Cine Master LUT Pack v4',
    titleZh: '影视飓风风格 · 「无限进步」电影感调色 LUT 预设包 (33 Cube)',
    category: 'lut',
    categoryLabelZh: 'LUTs与调色包',
    resolution: '33×33×33 3D LUT',
    fps: 'Universal',
    colorProfile: 'S-Log3 to Rec.709 & Neutral Clean Cine',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    duration: '4 Presets Suite',
    fileSize: '18.4 MB',
    format: '.CUBE 3D LUT Suite',
    tags: ['调色LUT', 'S-Log3还原', '无限进步风暴色调', '电影感青橙', '黑白胶片'],
    downloads: 5820,
    author: 'Point Grey Post Lab',
    descriptionZh: '由社团后期组历时 3 个月校验的电影级 LUT 预设组，包含：① Pure Clean（通透纯净人像还原） ② Sideline Gold（赛场高动态暖调） ③ Pacific Teal（太平洋冷青电影感） ④ Silver Gelatin（手工银盐单色）。支持 DaVinci Resolve, FCPX, PR, CapCut。',
    description: 'Custom-crafted 3D LUT collection for S-Log3 and standard Rec.709 cameras.',
    createdAt: '2026-08-10',
    isCommercialAllowed: true
  },
  {
    id: 'mat-sfx-01',
    title: 'Athletic Field & Cinematic Shutter SFX Master Pack',
    titleZh: '赛场拟音与单反机械快门 · 影视级无损音效包 (24-bit WAV)',
    category: 'sfx',
    categoryLabelZh: '声音音效',
    resolution: '24-bit / 48kHz WAV',
    fps: 'Audio Stream',
    colorProfile: 'Broadcast Stereo Soundscape',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    duration: '28 Sound Assets',
    fileSize: '315 MB',
    format: 'Broadcast WAV 24-bit 48kHz',
    tags: ['影视音效', '机械快门声', '球场欢呼', '草皮滑铲', '胶片过片声'],
    downloads: 4190,
    author: 'Justin Zhang',
    descriptionZh: '使用 Rode NTG5 枪麦与 Zoom F6 录制的 28 个原创高动态音效，包括：1/8000s 顶级全画幅单反机械快门连击、莱卡过片扳手齿轮声、职业足球重炮轰门破网声、看台澎湃声浪与环境底噪。',
    description: '28 pristine 24-bit/48kHz Foley & field recorded audio effects.',
    createdAt: '2026-08-05',
    isCommercialAllowed: true
  },
  {
    id: 'mat-pack-01',
    title: 'Varsity Matchday Sideline Graphics & Broadcast Kit',
    titleZh: '校园与职业赛事现场转播下三分条与计分牌包装工程',
    category: 'pack',
    categoryLabelZh: '赛事素材包',
    resolution: '4K UHD (3840×2160)',
    fps: '60.00 fps Alpha',
    colorProfile: 'ProRes 4444 Alpha Channel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    duration: 'MOGRT + Project',
    fileSize: '450 MB',
    format: 'Premiere MOGRT & DaVinci Macro',
    tags: ['动态图形', '下三分条', '计分牌', 'PR动态模板', 'Alpha透明通道'],
    downloads: 1940,
    author: 'Aaron Peng',
    descriptionZh: 'Point Grey 中学官方赛事视频包装套件。包含可自定义文字与队伍 LOGO 的动态比分板、换人提示条、进球全屏动画以及出场阵容展示卡。',
    description: 'Broadcast-quality MOGRT and motion graphics package for sports and event editors.',
    createdAt: '2026-07-28',
    isCommercialAllowed: true
  },
  {
    id: 'mat-template-01',
    title: '35mm Ilford HP5 Film Grain & Halation Overlay',
    titleZh: '35毫米手工暗房真实胶片颗粒与光晕叠加层',
    category: 'template',
    categoryLabelZh: '模板工程',
    resolution: '4K DCI (4096×2160)',
    fps: '24.00 fps Seamless Loop',
    colorProfile: 'Alpha Blending / Overlay',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    duration: '01:00 Seamless Loop',
    fileSize: '1.85 GB',
    format: 'ProRes 4444 Transparent',
    tags: ['胶片噪点', '暗房光晕', '35mm颗粒', '无缝循环', '复古质感'],
    downloads: 3670,
    author: 'Darkroom Collective',
    descriptionZh: '社团暗房手工冲印 Ilford HP5 Plus 胶片并通过工业级滚筒扫描仪 4K 采样的真实银盐颗粒噪点与齿孔边缘光晕。叠加混合模式设为【柔光/滤色】即可为现代数码视频注入纯正胶片质感。',
    description: 'Authentic 4K silver gelatin film grain scanned from real Ilford 35mm emulsion.',
    createdAt: '2026-07-15',
    isCommercialAllowed: true
  }
];

// ==========================================
// 飓风课堂 (Academy Courses: Photography & Videography)
// ==========================================
export const INITIAL_COURSES: import('../types').AcademyCourse[] = [
  // -------------------------------------------------------------
  // PHOTOGRAPHY TRACK (摄影基础与进阶)
  // -------------------------------------------------------------
  {
    id: 'course-photo-fundamentals',
    track: 'photography',
    titleZh: '摄影基础全能必修课：从零基础到掌控光影',
    title: 'Photography Fundamentals: Mastering Light, Exposure & Optics',
    subtitleZh: '相机工作原理、曝光三要素数学平衡与直方图科学读图',
    subtitle: 'Camera optics, exposure triangle mechanics & histogram mastery',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    instructorZh: 'Aaron Peng',
    instructor: 'Aaron Peng',
    instructorTitleZh: 'Point Grey 中学摄影社社长 · 职业赛事场边摄影师',
    instructorTitle: 'President, PGPC & Sideline Photographer',
    instructorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    totalLessons: 8,
    duration: '2小时45分钟',
    levelZh: '新手入门',
    level: 'Beginner',
    rating: 4.98,
    studentsCount: 3240,
    price: 0,
    overviewZh: '本课程为所有初入摄影之门的同学量身打造。摒弃死记硬背的参数教条，从光学的底层物理逻辑切入，深入拆解光圈、快门、感光度与机身测光系统的互动关系，帮助你建立属于自己的科学拍摄思维。',
    overview: 'A complete foundational photography curriculum designed to demystify camera mechanics, exposure physics, and optical depth.',
    tags: ['曝光三要素', '相机原理', '直方图', '景深计算', '对焦模式'],
    lessons: [
      {
        id: 'photo-01-01',
        lessonNumber: 1,
        titleZh: '第1课：相机的本质——小孔成像与现代 CMOS 传感器',
        title: 'Lesson 1: The Anatomy of Modern CMOS & Optical Mechanics',
        duration: '18:24',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-model-41555-large.mp4',
        keyPointsZh: [
          '数码传感器与传统银盐胶片的感光机制异同',
          '全画幅（Full Frame）与 APS-C / M43 画幅裁切系数（Crop Factor）的实际影响',
          'RAW 格式的无损宽容度与 JPEG 的机内压缩区别'
        ],
        articleContentZh: `### 📸 一、相机的底层物理机制
相机并非神圣的黑盒，而是一个严密的**光子捕获与量化转换器**。

1. **光圈（Aperture）**：控制单位时间内进入镜头的光子密度，同时利用光线折射锥角决定画面的景深（Depth of Field）。
2. **快门（Shutter）**：控制光线打在传感器上的持续时间（从 1/8000s 的高速定格到数秒的长曝光流光）。
3. **感光度（ISO）**：对传感器像素输出的模拟电信号进行硬件与数码增益放大。

---

### 💡 二、为什么必须拍摄 RAW 格式？
JPEG 是机内经过 8-bit 量化、锐化和色调曲线压缩后的不可逆结果；而 RAW 文件忠实记录了传感器每个像素单元（Bayer 滤镜阵列）未被处理的原始光子计数（通常为 14-bit 或 16-bit）。
- 8-bit JPEG：仅包含 256 级亮度阶梯；
- 14-bit RAW：包含 **16,384 级** 细腻亮度信息！
在面对大反差场景时，RAW 可以从死黑死白中拉回数档宝贵的细节。`,
        attachedMaterialIds: ['mat-photo-01', 'mat-lut-01']
      },
      {
        id: 'photo-01-02',
        lessonNumber: 2,
        titleZh: '第2课：曝光三要素的动态平衡与互易律',
        title: 'Lesson 2: The Exposure Triangle & Reciprocity Law',
        duration: '22:15',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-camera-lens-41560-large.mp4',
        keyPointsZh: [
          'EV（曝光值）的数学公式推导与向右曝光（ETTR）理念',
          '安全快门法则：手持拍摄时的焦距倒数定律',
          '双原生 ISO（Dual-Base ISO）的工作机制与信噪比最佳区'
        ],
        articleContentZh: `### ⚖️ 一、曝光平衡公式
曝光量可以用以下公式精确表述：
$$\\text{EV} = \\log_2\\left(\\frac{N^2}{t}\\right) - \\log_2\\left(\\frac{\\text{ISO}}{100}\\right)$$
其中 $N$ 为光圈 $f$ 值，$t$ 为快门时间（秒）。

#### 常见场景实战平衡策略：
1. **体育高速抓拍**：快门速度拥有绝对最高优先级（不低于 1/2000s），使用最大可用光圈（如 f/2.8），让 ISO 浮动保底；
2. **风光慢门**：使用三脚架与基准 ISO 100，使用镜头最佳解析力光圈（f/5.6 - f/8），让快门时间自由延长；
3. **暗光人像**：光圈全开（f/1.4 - f/1.8），快门保持在 1/125s - 1/250s，ISO 限制在第二原生基准附近。`,
        attachedMaterialIds: ['mat-footage-03']
      },
      {
        id: 'photo-01-03',
        lessonNumber: 3,
        titleZh: '第3课：直方图与高动态范围（HDR）科学读图',
        title: 'Lesson 3: Reading Histograms & Mastering Dynamic Range',
        duration: '19:40',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-looking-at-camera-screen-41562-large.mp4',
        keyPointsZh: [
          '如何通过直方图判断欠曝、过曝与中间调分布',
          '高光溢出报警（Zebra 斑马线）的设置与使用',
          '现代全画幅 15 档动态范围的极限榨取技巧'
        ],
        articleContentZh: `### 📊 一、直方图读图准则
永远不要仅依赖相机背面的液晶屏亮度来判断曝光！屏幕亮度会随着室外强光或暗处环境产生巨大视觉偏差，**直方图才是唯一真理**。
- **左侧碰壁**：暗部细节死黑截断（Clipping Shadow），噪点拉起后出现彩色色噪；
- **右侧碰壁**：高光细节死白溢出（Blown Highlight），无法通过后期挽救；
- **向右曝光原则（ETTR）**：在保证高光不溢出的前提下，尽可能让像素信息分布在直方图右侧偏亮区域，以获取最高的信噪比。`,
        attachedMaterialIds: ['mat-photo-01']
      }
    ]
  },
  {
    id: 'course-photo-portrait',
    track: 'photography',
    titleZh: '自然光与环境人像实操：记录真实情绪与光影温度',
    title: 'Natural Light Portraiture: Framing Human Emotion & Environment',
    subtitleZh: '顺光、侧逆光与环境反光利用，黄金时刻人像构图与情绪引导',
    subtitle: 'Harnessing golden hour, rim lighting, and authentic human expression',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    instructorZh: 'Amber Hao',
    instructor: 'Amber Hao',
    instructorTitleZh: 'Point Grey 中学资深人像摄影师 · 12年级策展人',
    instructorTitle: 'Lead Portraitist & Curator (Gr. 12)',
    instructorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    totalLessons: 6,
    duration: '2小时10分钟',
    levelZh: '进阶实操',
    level: 'Intermediate',
    rating: 4.96,
    studentsCount: 2480,
    price: 0,
    overviewZh: '人像摄影的核心永远在于“人”本身。本课程将带你走出死板的摆拍套路，学会观察自然光线在大气与环境中的微妙漫射，利用 85mm / 50mm 黄金人像焦段，在校园、街道与海滨捕捉自然流淌的人物情绪。',
    overview: 'An inspiring workshop on natural light portraiture, environmental framing, and capturing unscripted human vulnerability.',
    tags: ['人像摄影', '自然光', '黄金时刻', '模特引导', '肤色调色'],
    lessons: [
      {
        id: 'photo-02-01',
        lessonNumber: 1,
        titleZh: '第1课：光线的品质与方向——硬光、柔光与漫反射',
        title: 'Lesson 1: Light Quality & Directionality in the Field',
        duration: '21:05',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-model-41555-large.mp4',
        keyPointsZh: [
          '光源面积与光质软硬的关系',
          '阴天与树荫天然柔光箱的妙用',
          '侧逆光（Rim Light）勾勒人物发丝轮廓'
        ],
        articleContentZh: `### ☀️ 一、光线性质的决定因素
1. **点光源 vs 面光源**：发光体相对于被摄物体的视面积越大，光线过渡越柔和，阴影边缘越模糊；
2. **黄金时刻（Golden Hour）**：日落前 1 小时与日出后 1 小时，太阳光穿过更厚的大气层，色温偏暖（约 3200K - 4000K），呈现绝佳的金色发丝光；
3. **蓝调时刻（Blue Hour）**：太阳落入地平线后的 20 分钟，天空呈现深邃纯净的宝蓝色，与城市暖色灯光形成迷人的冷暖对比。`,
        attachedMaterialIds: ['mat-photo-01', 'mat-lut-01']
      }
    ]
  },

  // -------------------------------------------------------------
  // VIDEOGRAPHY TRACK (摄像与影视制作 - 专业影视视听语言)
  // -------------------------------------------------------------
  {
    id: 'course-video-cinematic',
    track: 'videography',
    titleZh: '电影感摄像与视听语言必修课：从设备认知到180°快门与S-Log3',
    title: 'Cinematic Videography: 180° Shutter, S-Log3 Workflow & Visual Grammar',
    subtitleZh: '快门角度原理、Log曲线科学曝光还原、电影运镜轴线与声画对位',
    subtitle: 'Mastering 180-degree shutter rule, Log grading pipelines, and cinematic movement',
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    instructorZh: 'Justin Zhang & Aaron Peng',
    instructor: 'Justin Zhang & Aaron Peng',
    instructorTitleZh: '影视制作组长 & 视觉总监',
    instructorTitle: 'Video Lead & Creative Director',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    totalLessons: 10,
    duration: '3小时50分钟',
    levelZh: '进阶实操',
    level: 'Intermediate',
    rating: 4.99,
    studentsCount: 4560,
    price: 0,
    overviewZh: '致敬影视飓风严苛的工业级视听标准！本课程全方位解析视频创作的核心底层逻辑：为什么电影看起来有“电影感”？如何科学运用 180° 快门角度？如何精准曝光 S-Log3 / C-Log 并在达芬奇/PR 中实现无损色彩还原？带你拍出质感爆棚的动态画面。',
    overview: 'A deep dive into cinematic filmmaking standards, Log exposure workflows, motion cadence, and professional post-production grading.',
    tags: ['180度快门', 'S-Log3曝光', '电影运镜', '升格慢动作', '达芬奇调色'],
    lessons: [
      {
        id: 'video-01-01',
        lessonNumber: 1,
        titleZh: '第1课：什么是电影感？——180°快门角度与动态模糊原理',
        title: 'Lesson 1: The Anatomy of Cinematic Motion: 180° Shutter Rule',
        duration: '25:30',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cameraman-recording-video-in-a-studio-41558-large.mp4',
        keyPointsZh: [
          '快门速度与帧率（Frame Rate）的严格对应关系',
          '快门过快产生的“生硬卡顿感（Soap Opera Effect / Staccato）”',
          'ND 减光镜（可调 ND / 磁吸 ND）在强光下锁定 180° 快门的不可或缺性'
        ],
        articleContentZh: `### 🎬 一、180° 快门角度法则 (The 180-Degree Rule)
在胶片电影摄影机时代，快门是一个旋转的半圆金属遮光盘（180度）。
因此，快门时间恒等于：
$$\\text{快门速度} = \\frac{1}{2 \\times \\text{帧率}}$$

- **24 fps（电影标准）**：快门必须固定在 **1/48s 或 1/50s**；
- **60 fps（流畅动作）**：快门必须固定在 **1/120s 或 1/125s**；
- **120 fps（升格慢动作）**：快门必须固定在 **1/240s 或 1/250s**。

#### 为什么不能随便拉高快门？
在晴天室外拍摄时，如果为了降低画面亮度而盲目将快门拉到 1/2000s，人物走动或背景移动将完全丧失人眼生理习惯的自然动态模糊（Motion Blur），画面会呈现极度廉价的刺眼抖动感！
**解决方案**：永远在镜头前加装高质量 **ND 滤镜（如 ND8 - ND64 或可调 ND）**，将进光量压暗，从而在任何艳阳天下都能死死锁定 1/50s 电影快门。`,
        attachedMaterialIds: ['mat-footage-01', 'mat-footage-02']
      },
      {
        id: 'video-01-02',
        lessonNumber: 2,
        titleZh: '第2课：Log 曲线科学曝光与还原 LUT 完整工作流',
        title: 'Lesson 2: S-Log3 Scientific Exposure & Rec.709 Transform',
        duration: '28:45',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-color-grading-a-video-in-a-dark-room-41561-large.mp4',
        keyPointsZh: [
          '对数曲线（Logarithm Curve）如何将 15 档高动态压缩存储',
          'S-Log3 的“向右曝光 +1.7EV 至 +2.0EV”实战法则',
          '使用 33-Cube 官方还原 LUT 与达芬奇色彩管理（Color Space Transform）'
        ],
        articleContentZh: `### 🌈 一、为什么要用 Log 模式拍摄？
常规 Rec.709 色彩空间只能容纳大约 6-8 档动态范围，天空和阴影极易同时爆掉。
而 Sony S-Log3 或 Canon C-Log3 通过对数数学变换，将传感器的全动态范围完整压缩进 10-bit 色深容器中。直出画面虽然看起来“发灰”，但后期拥有无与伦比的调色宽容度！

---

### 🎯 二、S-Log3 科学曝光准则：
1. **基准 ISO**：开启机身的第一原生 ISO 800 或第二原生 ISO 3200（如 FX3/α7S III）；
2. **MM 测光表指示**：建议让机内测光指示维持在 **+1.7EV ~ +2.0EV** 之间；
3. **中性灰 18% 卡测试**：18% 灰卡在 S-Log3 监视器伪色彩（False Color）上应准确落在 **41% IRE**，白卡应落在 **61% IRE**；
4. **后期还原**：在达芬奇中使用 CST（色彩空间转换）将 Input Color Space 设为 S-Gamut3.Cine / S-Log3，Output 设为 Rec.709 / Gamma 2.4。`,
        attachedMaterialIds: ['mat-lut-01', 'mat-footage-01']
      }
    ]
  },
  {
    id: 'course-video-audio-post',
    track: 'videography',
    titleZh: '影视录音与剪辑节奏全能课：让画面拥有呼吸感与生命力',
    title: 'Audio Field Recording & Editing Rhythm: Breathing Life into Motion',
    subtitleZh: '指向性麦克风收音实操、声画对位、分镜脚本与剪辑蒙太奇思维',
    subtitle: 'Shotgun mic techniques, Foley sound design, and narrative editing rhythm',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    instructorZh: 'Justin Zhang',
    instructor: 'Justin Zhang',
    instructorTitleZh: '社团音频工程师与后期剪辑总监',
    instructorTitle: 'Audio Engineer & Post Supervisor',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    totalLessons: 7,
    duration: '2小时30分钟',
    levelZh: '进阶实操',
    level: 'Intermediate',
    rating: 4.95,
    studentsCount: 1980,
    price: 0,
    overviewZh: '“声音决定了视频一半的质感”。从现场枪麦挑杆、无线领夹麦的隐藏佩戴，到后期音效（SFX）的精细铺设、环境氛围底噪渲染与剪辑点的呼吸停顿，全面掌握让观众欲罢不能的视听魔法。',
    overview: 'Audio is 50% of the cinematic experience. Master field recording, boom ops, and rhythm-driven narrative editing.',
    tags: ['影视录音', '枪麦收音', '剪辑节奏', '音效铺底', 'PR剪辑'],
    lessons: [
      {
        id: 'video-02-01',
        lessonNumber: 1,
        titleZh: '第1课：现场录音实战——超心型枪麦与无线麦克风配置',
        title: 'Lesson 1: Pro Audio Field Setup: Supercardioid Shotguns & Lavs',
        duration: '19:15',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-recording-podcast-in-studio-41563-large.mp4',
        keyPointsZh: [
          '麦克风指向性图解（心型、超心型、全向型）',
          '挑杆麦克风最佳拾音距离（头部上方 30-45 厘米角度）',
          '电平控制：人声峰值控制在 -12dB 至 -6dB 安全区'
        ],
        articleContentZh: `### 🎙️ 一、好声音的黄金法则：距离永远大于一切
世界上最昂贵的 5 万元话筒，放在 3 米开外录音，音质也远远不如一支 500 元的话筒放在距离嘴部 25 厘米的位置！
- **信噪比（SNR）**：声音强度随着距离的平方反比迅速衰减（$1/r^2$），距离缩短一半，声音信号相对环境杂音强 4 倍！
- **室内混响回避**：在没有吸音处理的普通房间，严禁使用干涉管枪麦（Interference Tube Shotgun），应使用小振膜超心型麦克风，以避免墙壁反射声在干涉管内产生梳状滤波失真。`,
        attachedMaterialIds: ['mat-sfx-01', 'mat-pack-01']
      }
    ]
  }
];
