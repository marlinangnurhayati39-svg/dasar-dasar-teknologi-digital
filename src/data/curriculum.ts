import { BadgeInfo, IllustrationId } from '../types';

export const WORLD_IMAGES = {
  hero: '/src/assets/images/hero_digi_robot_1794553468320.jpg',
  world1: '/src/assets/images/world_digital_tech_1794553469176.jpg',
  world2: '/src/assets/images/world_computer_system_1794553469757.jpg',
  world3: '/src/assets/images/world_digital_safety_1794553469900.jpg',
  trophy: '/src/assets/images/digi_trophy_hero_1794553470109.jpg',
};

export const BADGES: BadgeInfo[] = [
  {
    id: 'detektif_teknologi',
    title: 'Detektif Teknologi',
    subtitle: 'Menyelesaikan Dunia 1: Mengenal Teknologi Digital',
    worldId: 'world-1',
    accentColor: 'blue',
  },
  {
    id: 'ahli_komputer',
    title: 'Ahli Komputer',
    subtitle: 'Menyelesaikan Dunia 2: Mengenal Sistem Komputer',
    worldId: 'world-2',
    accentColor: 'purple',
  },
  {
    id: 'pahlawan_keamanan',
    title: 'Pahlawan Keamanan Digital',
    subtitle: 'Menyelesaikan Dunia 3: Pahlawan Keamanan Digital',
    worldId: 'world-3',
    accentColor: 'emerald',
  },
];

// ==========================================
// DUNIA 1: MENGENAL TEKNOLOGI DIGITAL
// ==========================================

export interface ExampleCard {
  id: string;
  name: string;
  description: string;
  illustration: IllustrationId;
}

export const WORLD1_DEVICES: ExampleCard[] = [
  {
    id: 'smartphone',
    name: 'Smartphone (Telepon Pintar)',
    description: 'Dipakai untuk menelepon, berkirim pesan, foto, dan membuka aplikasi belajar.',
    illustration: 'smartphone',
  },
  {
    id: 'komputer',
    name: 'Komputer Meja',
    description: 'Komputer lengkap dengan layar besar, keyboard, mouse, dan CPU di ruang belajar atau lab.',
    illustration: 'computer',
  },
  {
    id: 'laptop',
    name: 'Laptop',
    description: 'Komputer lipat yang praktis dibawa ke mana-mana untuk mengetik dan belajar.',
    illustration: 'laptop',
  },
  {
    id: 'tablet',
    name: 'Tablet',
    description: 'Perangkat layar sentuh berukuran lebih besar dari HP untuk membaca dan menggambar.',
    illustration: 'tablet',
  },
  {
    id: 'kamera',
    name: 'Kamera Digital',
    description: 'Alat elektronik untuk mengambil foto dan merekam video secara digital.',
    illustration: 'camera',
  },
  {
    id: 'tv',
    name: 'Televisi Digital',
    description: 'Menayangkan acara edukasi, berita, dan gambar yang jernih dengan sinyal digital.',
    illustration: 'tv',
  },
  {
    id: 'atm',
    name: 'Mesin ATM',
    description: 'Mesin komputer otomatis di bank yang membantu mengambil uang atau mengecek saldo.',
    illustration: 'atm',
  },
];

export const WORLD1_INFO_EXAMPLES: ExampleCard[] = [
  {
    id: 'cuaca',
    name: 'Berita Cuaca',
    description: 'Memberi tahu apakah hari ini akan cerah, berawan, atau turun hujan.',
    illustration: 'weather_news',
  },
  {
    id: 'jadwal',
    name: 'Jadwal Pelajaran',
    description: 'Membantu kita tahu pelajaran apa yang harus disiapkan setiap hari sekolah.',
    illustration: 'schedule',
  },
  {
    id: 'foto',
    name: 'Foto Keluarga',
    description: 'Menyimpan kenangan indah bersama keluarga dalam bentuk gambar digital.',
    illustration: 'family_photo',
  },
  {
    id: 'pesan',
    name: 'Pesan dari Guru',
    description: 'Berisi pengumuman tugas atau informasi penting dari Bapak dan Ibu Guru.',
    illustration: 'teacher_msg',
  },
  {
    id: 'video',
    name: 'Video Pembelajaran',
    description: 'Menjelaskan materi pelajaran lewat gambar bergerak dan suara yang menarik.',
    illustration: 'learning_video',
  },
];

export const WORLD1_BENEFITS = [
  {
    title: 'Membantu Belajar',
    detail: 'Kita bisa membaca buku digital, menonton video pelajaran, dan berlatih kuis interaktif.',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
  },
  {
    title: 'Memudahkan Komunikasi',
    detail: 'Bisa menyapa saudara atau bertanya tugas kepada guru dan teman meskipun berjauhan.',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  },
  {
    title: 'Mencari Informasi',
    detail: 'Cepat menemukan pengetahuan baru tentang sains, sejarah, hingga berita cuaca.',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
  },
  {
    title: 'Membantu Pekerjaan',
    detail: 'Membuat dokumen, menghitung angka, dan membuat presentasi menjadi lebih cepat dan rapi.',
    color: 'bg-purple-50 border-purple-200 text-purple-900',
  },
  {
    title: 'Menyimpan Foto & Dokumen',
    detail: 'Foto kenangan, gambar karya seni, dan tugas sekolah tersimpan rapi dan tidak mudah hilang.',
    color: 'bg-orange-50 border-orange-200 text-orange-900',
  },
];

// Game 1: Detektif Teknologi (8 soal)
export interface Game1Question {
  id: string;
  illustration: IllustrationId;
  clue: string;
  correctName: string;
  options: string[];
  explanation: string;
}

export const GAME1_QUESTIONS: Game1Question[] = [
  {
    id: 'g1-1',
    illustration: 'laptop',
    clue: 'Komputer lipat yang ringan dan mudah dibawa ke sekolah.',
    correctName: 'Laptop',
    options: ['Laptop', 'Mesin ATM', 'Kamera Digital', 'Speaker'],
    explanation: 'Ini adalah Laptop! Laptop bisa dilipat dan memiliki baterai sehingga mudah dibawa.',
  },
  {
    id: 'g1-2',
    illustration: 'smartphone',
    clue: 'Alat genggam layar sentuh untuk menelepon dan mengirim pesan.',
    correctName: 'Telepon Pintar (Smartphone)',
    options: ['Televisi Digital', 'Telepon Pintar (Smartphone)', 'Printer', 'Kamera Digital'],
    explanation: 'Ini adalah Telepon Pintar (Smartphone) yang muat di saku dan punya banyak aplikasi.',
  },
  {
    id: 'g1-3',
    illustration: 'camera',
    clue: 'Alat khusus dengan lensa untuk memotret gambar yang tajam.',
    correctName: 'Kamera Digital',
    options: ['Tablet', 'Kamera Digital', 'Laptop', 'Mesin ATM'],
    explanation: 'Ini adalah Kamera Digital! Kamera ini menyimpan foto dalam bentuk file digital.',
  },
  {
    id: 'g1-4',
    illustration: 'tablet',
    clue: 'Perangkat layar sentuh datar yang lebih lebar dari telepon pintar.',
    correctName: 'Tablet',
    options: ['Komputer Meja', 'Tablet', 'Televisi Digital', 'Mikrofon'],
    explanation: 'Ini adalah Tablet! Layarnya lebar sehingga nyaman untuk menggambar dan membaca.',
  },
  {
    id: 'g1-5',
    illustration: 'atm',
    clue: 'Mesin otomatis di bank yang melayani pengambilan uang tunai.',
    correctName: 'Mesin ATM',
    options: ['Mesin ATM', 'Printer', 'Laptop', 'Telepon Pintar (Smartphone)'],
    explanation: 'Ini adalah Mesin ATM! ATM juga merupakan teknologi digital untuk transaksi perbankan.',
  },
  {
    id: 'g1-6',
    illustration: 'tv',
    clue: 'Layar besar di rumah yang menayangkan siaran gambar dan suara jernih.',
    correctName: 'Televisi Digital',
    options: ['Kamera Digital', 'Televisi Digital', 'Tablet', 'Keyboard'],
    explanation: 'Ini adalah Televisi Digital yang menayangkan tayangan menggunakan sinyal digital.',
  },
  {
    id: 'g1-7',
    illustration: 'computer',
    clue: 'Perangkat meja lengkap yang terdiri dari monitor, CPU, keyboard, dan mouse.',
    correctName: 'Komputer Meja',
    options: ['Komputer Meja', 'Mesin ATM', 'Tablet', 'Kamera Digital'],
    explanation: 'Ini adalah Komputer Meja (Desktop) yang biasa ada di laboratorium komputer sekolah.',
  },
  {
    id: 'g1-8',
    illustration: 'learning_video',
    clue: 'Contoh informasi edukatif berupa gambar bergerak dan suara di layar.',
    correctName: 'Video Pembelajaran',
    options: ['Berita Cuaca', 'Video Pembelajaran', 'Mesin ATM', 'Foto Keluarga'],
    explanation: 'Ini adalah Video Pembelajaran! Video membantu kita memahami pelajaran dengan seru.',
  },
];

// Game 2: Teknologi atau Bukan? (10 soal)
export interface Game2Question {
  id: string;
  name: string;
  illustration: IllustrationId;
  isDigital: boolean;
  explanation: string;
}

export const GAME2_QUESTIONS: Game2Question[] = [
  {
    id: 'g2-1',
    name: 'Laptop',
    illustration: 'laptop',
    isDigital: true,
    explanation: 'Benar! Laptop adalah teknologi digital karena mengolah data dan informasi secara elektronik.',
  },
  {
    id: 'g2-2',
    name: 'Buku Tulis Kertas',
    illustration: 'book',
    isDigital: false,
    explanation: 'Buku tulis terbuat dari kertas dan tidak menggunakan listrik atau sistem elektronik digital.',
  },
  {
    id: 'g2-3',
    name: 'Smartphone',
    illustration: 'smartphone',
    isDigital: true,
    explanation: 'Smartphone adalah teknologi digital untuk mengirim pesan, foto, dan mencari informasi.',
  },
  {
    id: 'g2-4',
    name: 'Sepeda Kayuh',
    illustration: 'bicycle',
    isDigital: false,
    explanation: 'Sepeda kayuh adalah alat transportasi mekanis, bukan perangkat teknologi digital.',
  },
  {
    id: 'g2-5',
    name: 'Kamera Digital',
    illustration: 'camera',
    isDigital: true,
    explanation: 'Kamera digital menyimpan gambar secara elektronik di kartu memori.',
  },
  {
    id: 'g2-6',
    name: 'Pensil Kayu',
    illustration: 'pencil',
    isDigital: false,
    explanation: 'Pensil kayu adalah alat tulis biasa, bukan perangkat elektronik digital.',
  },
  {
    id: 'g2-7',
    name: 'Mesin ATM',
    illustration: 'atm',
    isDigital: true,
    explanation: 'Mesin ATM memakai komputer di dalamnya untuk memproses transaksi secara digital.',
  },
  {
    id: 'g2-8',
    name: 'Bola Sepak',
    illustration: 'soccer_ball',
    isDigital: false,
    explanation: 'Bola sepak adalah alat olahraga biasa dan bukan teknologi digital.',
  },
  {
    id: 'g2-9',
    name: 'Tablet',
    illustration: 'tablet',
    isDigital: true,
    explanation: 'Tablet adalah perangkat layar sentuh elektronik untuk belajar dan berkarya secara digital.',
  },
  {
    id: 'g2-10',
    name: 'Kursi Kayu',
    illustration: 'wooden_chair',
    isDigital: false,
    explanation: 'Kursi kayu adalah perabot ruangan dan tidak mengolah informasi digital.',
  },
];

// ==========================================
// DUNIA 2: MENGENAL SISTEM KOMPUTER
// ==========================================

export interface ComputerItem {
  id: string;
  name: string;
  category: 'hardware' | 'software';
  illustration: IllustrationId;
  shortFunction: string;
}

export const HARDWARE_ITEMS: ComputerItem[] = [
  {
    id: 'monitor',
    name: 'Monitor',
    category: 'hardware',
    illustration: 'monitor',
    shortFunction: 'Menampilkan gambar, video, dan tulisan dari komputer.',
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    category: 'hardware',
    illustration: 'keyboard',
    shortFunction: 'Memasukkan huruf, angka, dan simbol saat mengetik.',
  },
  {
    id: 'mouse',
    name: 'Mouse',
    category: 'hardware',
    illustration: 'mouse',
    shortFunction: 'Menggerakkan penunjuk (pointer) dan memilih menu di layar.',
  },
  {
    id: 'cpu',
    name: 'CPU',
    category: 'hardware',
    illustration: 'cpu',
    shortFunction: 'Tempat komponen utama komputer yang memproses semua data.',
  },
  {
    id: 'speaker',
    name: 'Speaker',
    category: 'hardware',
    illustration: 'speaker',
    shortFunction: 'Mengeluarkan suara musik, video, atau efek audio.',
  },
  {
    id: 'printer',
    name: 'Printer',
    category: 'hardware',
    illustration: 'printer',
    shortFunction: 'Mencetak dokumen tulisan dan gambar ke atas kertas.',
  },
  {
    id: 'webcam',
    name: 'Webcam',
    category: 'hardware',
    illustration: 'webcam',
    shortFunction: 'Mengambil gambar atau merekam video wajah saat belajar daring.',
  },
  {
    id: 'microphone',
    name: 'Mikrofon',
    category: 'hardware',
    illustration: 'microphone',
    shortFunction: 'Menangkap suara kita agar bisa direkam atau didengar di komputer.',
  },
];

export const SOFTWARE_ITEMS: ComputerItem[] = [
  {
    id: 'windows',
    name: 'Windows',
    category: 'software',
    illustration: 'windows',
    shortFunction: 'Sistem operasi utama yang mengatur seluruh kerja komputer.',
  },
  {
    id: 'word',
    name: 'Microsoft Word',
    category: 'software',
    illustration: 'word',
    shortFunction: 'Aplikasi untuk menulis cerita, karangan, dan dokumen.',
  },
  {
    id: 'powerpoint',
    name: 'Microsoft PowerPoint',
    category: 'software',
    illustration: 'powerpoint',
    shortFunction: 'Aplikasi untuk membuat slide presentasi yang menarik.',
  },
  {
    id: 'paint',
    name: 'Paint',
    category: 'software',
    illustration: 'paint',
    shortFunction: 'Aplikasi seru untuk menggambar dan mewarnai di komputer.',
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    category: 'software',
    illustration: 'chrome',
    shortFunction: 'Aplikasi peramban (browser) untuk menjelajahi internet.',
  },
  {
    id: 'calculator',
    name: 'Kalkulator',
    category: 'software',
    illustration: 'calculator',
    shortFunction: 'Aplikasi untuk menghitung penjumlahan, pengurangan, kali, dan bagi.',
  },
];

// Game 3: 12 exact objects specified in prompt
export const GAME3_SORT_ITEMS: ComputerItem[] = [
  HARDWARE_ITEMS.find((i) => i.id === 'monitor')!,
  HARDWARE_ITEMS.find((i) => i.id === 'mouse')!,
  HARDWARE_ITEMS.find((i) => i.id === 'keyboard')!,
  HARDWARE_ITEMS.find((i) => i.id === 'printer')!,
  HARDWARE_ITEMS.find((i) => i.id === 'speaker')!,
  HARDWARE_ITEMS.find((i) => i.id === 'webcam')!,
  SOFTWARE_ITEMS.find((i) => i.id === 'word')!,
  SOFTWARE_ITEMS.find((i) => i.id === 'paint')!,
  SOFTWARE_ITEMS.find((i) => i.id === 'windows')!,
  SOFTWARE_ITEMS.find((i) => i.id === 'chrome')!,
  SOFTWARE_ITEMS.find((i) => i.id === 'powerpoint')!,
  SOFTWARE_ITEMS.find((i) => i.id === 'calculator')!,
];

// Game 4: Tebak Fungsi Perangkat (12 soal >= 10 minimal)
export interface Game4Question {
  id: string;
  question: string;
  illustration: IllustrationId;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const GAME4_QUESTIONS: Game4Question[] = [
  {
    id: 'g4-1',
    question: 'Alat apakah yang digunakan untuk mengetik huruf, angka, dan simbol?',
    illustration: 'keyboard',
    options: ['Monitor', 'Keyboard', 'Speaker'],
    correctAnswer: 'Keyboard',
    explanation: 'Keyboard memiliki banyak tombol huruf dan angka untuk mengetik di komputer.',
  },
  {
    id: 'g4-2',
    question: 'Perangkat keras mana yang berfungsi menampilkan gambar dan tulisan di layar?',
    illustration: 'monitor',
    options: ['Monitor', 'Mouse', 'Mikrofon'],
    correctAnswer: 'Monitor',
    explanation: 'Monitor menampilkan seluruh gambar, tulisan, dan video agar bisa kita lihat.',
  },
  {
    id: 'g4-3',
    question: 'Alat apakah yang digerakkan dengan tangan untuk memilih menu dan mengarahkan kursor?',
    illustration: 'mouse',
    options: ['Printer', 'Keyboard', 'Mouse'],
    correctAnswer: 'Mouse',
    explanation: 'Mouse menggerakkan penunjuk (pointer) di layar sehingga kita mudah mengeklik menu.',
  },
  {
    id: 'g4-4',
    question: 'Perangkat keras apakah yang bertugas memproses semua data di dalam komputer?',
    illustration: 'cpu',
    options: ['CPU', 'Speaker', 'Webcam'],
    correctAnswer: 'CPU',
    explanation: 'CPU berisi komponen utama otak komputer yang memproses semua perintah dan data.',
  },
  {
    id: 'g4-5',
    question: 'Jika ingin mendengarkan lagu atau suara video pembelajaran, alat apa yang digunakan?',
    illustration: 'speaker',
    options: ['Printer', 'Speaker', 'Keyboard'],
    correctAnswer: 'Speaker',
    explanation: 'Speaker mengubah sinyal dari komputer menjadi suara yang bisa kita dengar.',
  },
  {
    id: 'g4-6',
    question: 'Alat apa yang kita pakai untuk mencetak tugas karangan ke atas kertas?',
    illustration: 'printer',
    options: ['Webcam', 'Monitor', 'Printer'],
    correctAnswer: 'Printer',
    explanation: 'Printer mencetak tulisan dan gambar dari komputer menjadi lembaran kertas.',
  },
  {
    id: 'g4-7',
    question: 'Saat kelas daring, kamera kecil apa yang digunakan agar wajah kita terlihat?',
    illustration: 'webcam',
    options: ['Webcam', 'Mouse', 'CPU'],
    correctAnswer: 'Webcam',
    explanation: 'Webcam mengambil gambar dan video secara langsung di depan komputer.',
  },
  {
    id: 'g4-8',
    question: 'Alat apa yang menangkap suara kita saat bernyanyi atau berbicara di komputer?',
    illustration: 'microphone',
    options: ['Speaker', 'Mikrofon', 'Monitor'],
    correctAnswer: 'Mikrofon',
    explanation: 'Mikrofon menangkap suara dari luar untuk masuk ke dalam komputer.',
  },
  {
    id: 'g4-9',
    question: 'Aplikasi apakah yang dipakai untuk menggambar dan mewarnai di komputer?',
    illustration: 'paint',
    options: ['Paint', 'Kalkulator', 'Google Chrome'],
    correctAnswer: 'Paint',
    explanation: 'Paint adalah perangkat lunak yang punya kuas dan warna untuk menggambar.',
  },
  {
    id: 'g4-10',
    question: 'Software apakah yang membantu kita menulis dokumen cerita atau laporan?',
    illustration: 'word',
    options: ['Windows', 'Microsoft Word', 'Paint'],
    correctAnswer: 'Microsoft Word',
    explanation: 'Microsoft Word adalah aplikasi pengolah kata untuk mengetik dan merapikan dokumen.',
  },
  {
    id: 'g4-11',
    question: 'Aplikasi apa yang digunakan untuk membuka situs web dan menjelajahi internet?',
    illustration: 'chrome',
    options: ['Google Chrome', 'Microsoft PowerPoint', 'Kalkulator'],
    correctAnswer: 'Google Chrome',
    explanation: 'Google Chrome adalah peramban (browser) untuk membuka halaman internet.',
  },
  {
    id: 'g4-12',
    question: 'Perangkat lunak apa yang berfungsi sebagai sistem operasi utama pengatur komputer?',
    illustration: 'windows',
    options: ['Paint', 'Windows', 'Printer'],
    correctAnswer: 'Windows',
    explanation: 'Windows adalah sistem operasi (software utama) yang menghidupkan dan mengatur aplikasi.',
  },
];

// ==========================================
// DUNIA 3: PAHLAWAN KEAMANAN DIGITAL
// ==========================================

export const PERSONAL_INFO_ITEMS = [
  { label: 'Nama Lengkap', detail: 'Contohnya nama lengkap resmi yang ada di kartu pelajar atau akta.' },
  { label: 'Alamat Rumah', detail: 'Jalan, nomor rumah, dan lingkungan tempat tinggalmu.' },
  { label: 'Nomor Telepon', detail: 'Nomor HP milikmu atau milik orang tuamu.' },
  { label: 'Tanggal Lahir', detail: 'Hari, bulan, dan tahun kelahiranmu.' },
  { label: 'Nama Sekolah', detail: 'Tempat kamu belajar setiap hari.' },
  { label: 'Kata Sandi', detail: 'Kunci rahasia untuk masuk ke akun belajarmu.' },
  { label: 'Foto Pribadi', detail: 'Foto dirimu atau keluargamu yang bersifat pribadi.' },
];

export const SAFETY_REASONS = [
  {
    title: 'Tidak Disalahgunakan Orang Lain',
    detail: 'Agar data dirimu tidak dipakai oleh orang tak dikenal untuk hal yang merugikan.',
  },
  {
    title: 'Tidak Digunakan untuk Menipu',
    detail: 'Penipu sering mencari nomor telepon atau alamat untuk mengelabui anak-anak dan orang tua.',
  },
  {
    title: 'Akun Digital Tetap Aman',
    detail: 'Dengan menjaga kata sandi, tidak ada orang lain yang bisa masuk dan merusak akun belajarmu.',
  },
  {
    title: 'Terhindar dari Orang Asing Berniat Buruk',
    detail: 'Menjaga privasi membuat kita selalu terlindungi saat berselancar di internet.',
  },
];

export const SAFETY_RULES = [
  'Jangan membagikan kata sandi kepada orang lain.',
  'Gunakan kata sandi yang kuat (gabungan huruf dan angka yang mudah kamu ingat, tapi sulit ditebak orang lain).',
  'Jangan sembarangan memberikan alamat rumah di internet.',
  'Jangan membagikan nomor telepon kepada orang asing.',
  'Jangan mengklik tautan (link) yang mencurigakan atau aneh.',
  'Mintalah bantuan orang tua atau guru jika menemukan sesuatu yang mencurigakan.',
  'Selalu keluar (log out) dari akun setelah menggunakan komputer bersama di sekolah.',
];

export interface SafetySituation {
  id: string;
  situation: string;
  illustration: IllustrationId;
  isSafe: boolean;
  action: string;
}

export const SAFETY_SITUATIONS: SafetySituation[] = [
  {
    id: 'sit-1',
    situation: 'Orang asing di game online meminta kata sandi akunmu.',
    illustration: 'stranger_chat',
    isSafe: false,
    action: 'Tindakan tepat: Tolak, jangan pernah beri kata sandi, dan laporkan ke orang tua atau guru!',
  },
  {
    id: 'sit-2',
    situation: 'Teman mengajak membagikan alamat rumahmu di kolom komentar publik.',
    illustration: 'personal_id',
    isSafe: false,
    action: 'Tindakan tepat: Jangan bagikan alamat rumah di internet agar tetap aman.',
  },
  {
    id: 'sit-3',
    situation: 'Muncul pesan hadiah gratis dengan tautan (link) tidak dikenal.',
    illustration: 'gift_scam',
    isSafe: false,
    action: 'Tindakan tepat: Jangan diklik! Tutup pesan itu dan tanyakan kepada orang tua atau guru.',
  },
  {
    id: 'sit-4',
    situation: 'Guru memberikan tautan pembelajaran resmi di kelas.',
    illustration: 'teacher_link',
    isSafe: true,
    action: 'Tindakan tepat: Aman dibuka karena berasal langsung dari gurumu untuk kegiatan belajar.',
  },
  {
    id: 'sit-5',
    situation: 'Orang tidak dikenal di internet meminta foto pribadimu.',
    illustration: 'shield_lock',
    isSafe: false,
    action: 'Tindakan tepat: Jangan kirim foto pribadi kepada orang asing dan segera beri tahu orang tua!',
  },
];

// Game 5: Detektif Keamanan Digital - "MISI MENYELAMATKAN DATA PRIBADI" (10 tantangan)
export interface Game5Challenge {
  id: string;
  title: string;
  story: string;
  illustration: IllustrationId;
  options: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
}

export const GAME5_CHALLENGES: Game5Challenge[] = [
  {
    id: 'g5-1',
    title: 'Tantangan 1: Pesan dari Orang Asing',
    story: 'DIGI menemukan pesan dari orang yang tidak dikenal yang meminta kata sandimu agar bisa mengirim hadiah.',
    illustration: 'stranger_chat',
    options: [
      { label: 'A', text: 'Memberikan kata sandi dengan cepat.' },
      { label: 'B', text: 'Mengabaikannya dan memberi tahu orang tua atau guru.' },
      { label: 'C', text: 'Mengirimkan kata sandi kepada teman sekelas.' },
    ],
    correctLabel: 'B',
    explanation: 'Hebat! Kata sandi adalah rahasia pribadi. Jangan pernah diberikan kepada siapa pun selain orang tua jika perlu.',
  },
  {
    id: 'g5-2',
    title: 'Tantangan 2: Hadiah Gratis Misterius',
    story: 'Kamu mendapatkan pesan hadiah gratis dari nomor tidak dikenal yang memintamu mengisi alamat rumah.',
    illustration: 'gift_scam',
    options: [
      { label: 'A', text: 'Langsung memberikan alamat rumah lengkap.' },
      { label: 'B', text: 'Membuka semua tautan di dalam pesan itu.' },
      { label: 'C', text: 'Tidak memberikan informasi dan bertanya kepada orang tua atau guru.' },
    ],
    correctLabel: 'C',
    explanation: 'Tepat! Pesan hadiah gratis dari nomor asing sering menjadi jebakan untuk mencuri data pribadi.',
  },
  {
    id: 'g5-3',
    title: 'Tantangan 3: Permintaan Teman',
    story: 'Seorang teman memintamu menyebutkan kata sandi akun belajarmu supaya dia bisa ikut memakai akunmu.',
    illustration: 'password_key',
    options: [
      { label: 'A', text: 'Memberikannya supaya dianggap teman baik.' },
      { label: 'B', text: 'Menjaga kata sandi dan menjelaskan bahwa kata sandi bersifat pribadi.' },
      { label: 'C', text: 'Menuliskannya di papan tulis kelas.' },
    ],
    correctLabel: 'B',
    explanation: 'Benar! Teman yang baik pasti mengerti bahwa kata sandi setiap orang bersifat pribadi.',
  },
  {
    id: 'g5-4',
    title: 'Tantangan 4: Selesai Pakai Komputer Sekolah',
    story: 'Bel istirahat berbunyi! Kamu baru selesai memakai komputer di laboratorium sekolah dengan akun belajarmu.',
    illustration: 'shared_pc',
    options: [
      { label: 'A', text: 'Langsung keluar ruangan dan membiarkan akun tetap terbuka.' },
      { label: 'B', text: 'Selalu keluar (log out) dari akun sebelum meninggalkan komputer.' },
      { label: 'C', text: 'Menyimpan kata sandi di layar komputer bersama.' },
    ],
    correctLabel: 'B',
    explanation: 'Pintar! Selalu log out setelah memakai komputer bersama agar akunmu tidak dibuka orang lain.',
  },
  {
    id: 'g5-5',
    title: 'Tantangan 5: Tautan Pembelajaran Resmi',
    story: 'Ibu Guru membagikan tautan materi belajar resmi di grup belajar kelas sekolah.',
    illustration: 'teacher_link',
    options: [
      { label: 'A', text: 'Membuka tautan tersebut dengan tenang karena resmi dari guru.' },
      { label: 'B', text: 'Mengirimkan nomor telepon orang tua ke semua orang.' },
      { label: 'C', text: 'Mematikan komputer karena takut.' },
    ],
    correctLabel: 'A',
    explanation: 'Benar! Tautan resmi dari guru di kelas aman digunakan untuk belajar.',
  },
  {
    id: 'g5-6',
    title: 'Tantangan 6: Permintaan Foto Pribadi',
    story: 'Saat bermain game online, ada pemain tidak dikenal yang memintamu mengirimkan foto pribadimu.',
    illustration: 'shield_lock',
    options: [
      { label: 'A', text: 'Mengirimkan foto terbaikmu supaya dia senang.' },
      { label: 'B', text: 'Menolak dengan tegas, tidak mengirim foto, dan lapor ke orang tua.' },
      { label: 'C', text: 'Mengirimkan alamat sekolah saja.' },
    ],
    correctLabel: 'B',
    explanation: 'Tepat sekali! Jangan pernah mengirim foto pribadi kepada orang asing di internet.',
  },
  {
    id: 'g5-7',
    title: 'Tantangan 7: Membuat Kata Sandi Baru',
    story: 'Kamu diminta membuat kata sandi baru untuk akun aplikasi perpustakaan digital sekolah.',
    illustration: 'password_key',
    options: [
      { label: 'A', text: 'Memakai kata sandi yang mudah ditebak seperti "123456".' },
      { label: 'B', text: 'Memakai nama lengkap dan tanggal lahirmu.' },
      { label: 'C', text: 'Membuat kata sandi kuat gabungan huruf dan angka yang sulit ditebak.' },
    ],
    correctLabel: 'C',
    explanation: 'Bagus! Kata sandi yang kuat melindungi akun kita agar tidak mudah dibobol orang lain.',
  },
  {
    id: 'g5-8',
    title: 'Tantangan 8: Komentar di Video',
    story: 'Kamu menonton video edukasi seru, lalu melihat seseorang berkomentar: "Tulis nomor HP dan alamatmu di sini!"',
    illustration: 'personal_id',
    options: [
      { label: 'A', text: 'Menulis nomor telepon dan alamat di kolom komentar.' },
      { label: 'B', text: 'Tidak menulis data pribadi apa pun di kolom komentar umum.' },
      { label: 'C', text: 'Menulis tanggal lahir dan nama lengkap saja.' },
    ],
    correctLabel: 'B',
    explanation: 'Hebat! Kolom komentar bisa dibaca siapa saja, jadi jangan pernah menaruh data pribadi di sana.',
  },
  {
    id: 'g5-9',
    title: 'Tantangan 9: Layar Peringatan Aneh',
    story: 'Tiba-tiba muncul kotak bertuliskan "Komputermu rusak! Klik tombol ini sekarang!" saat browsing.',
    illustration: 'gift_scam',
    options: [
      { label: 'A', text: 'Langsung mengklik tombol itu berkali-kali.' },
      { label: 'B', text: 'Tidak mengklik tautan mencurigakan dan segera panggil orang tua atau guru.' },
      { label: 'C', text: 'Memasukkan kata sandi akun agar cepat hilang.' },
    ],
    correctLabel: 'B',
    explanation: 'Cerdas! Jangan panik atau asal klik kotak mencurigakan; segera minta bantuan orang dewasa.',
  },
  {
    id: 'g5-10',
    title: 'Tantangan 10: Mengisi Formulir Game',
    story: 'Sebuah permainan meminta nama panggilan untuk papan skor. Mana yang paling aman diisi?',
    illustration: 'shield_lock',
    options: [
      { label: 'A', text: 'Menulis nama panggilan keren saja, seperti "Bintang4".' },
      { label: 'B', text: 'Menulis nama lengkap, alamat rumah, dan nomor telepon.' },
      { label: 'C', text: 'Menulis kata sandi akun belajar.' },
    ],
    correctLabel: 'A',
    explanation: 'Sempurna! Pakai nama panggilan saja tanpa mencantumkan alamat, nomor telepon, atau kata sandi!',
  },
];

// ==========================================
// KUIS AKHIR: KUIS PETUALANGAN DIGITAL (15 SOAL)
// 5 Teknologi Digital + 5 Hardware/Software + 5 Keamanan Digital
// ==========================================

export interface FinalQuizQuestion {
  id: string;
  category: 'Teknologi Digital' | 'Hardware & Software' | 'Keamanan Digital';
  question: string;
  illustration: IllustrationId;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const FINAL_QUIZ_QUESTIONS: FinalQuizQuestion[] = [
  // 5 Soal Teknologi Digital
  {
    id: 'fq-1',
    category: 'Teknologi Digital',
    question: 'Apa yang dimaksud dengan teknologi digital?',
    illustration: 'laptop',
    options: [
      'Teknologi yang membantu membuat, menyimpan, mengolah, dan menyampaikan informasi dengan perangkat elektronik',
      'Alat olahraga yang dipakai di lapangan sekolah',
      'Benda yang terbuat dari kayu dan kertas saja',
      'Alat musik tradisional tanpa listrik',
    ],
    correctAnswer:
      'Teknologi yang membantu membuat, menyimpan, mengolah, dan menyampaikan informasi dengan perangkat elektronik',
    explanation: 'Teknologi digital memakai perangkat elektronik untuk mengolah dan menyampaikan informasi.',
  },
  {
    id: 'fq-2',
    category: 'Teknologi Digital',
    question: 'Manakah di bawah ini yang BUKAN contoh perangkat teknologi digital?',
    illustration: 'book',
    options: ['Smartphone', 'Buku tulis kertas', 'Kamera digital', 'Mesin ATM'],
    correctAnswer: 'Buku tulis kertas',
    explanation: 'Buku tulis kertas bukan perangkat elektronik digital, sedangkan smartphone, kamera digital, dan mesin ATM adalah teknologi digital.',
  },
  {
    id: 'fq-3',
    category: 'Teknologi Digital',
    question: 'Apa yang dimaksud dengan informasi?',
    illustration: 'weather_news',
    options: [
      'Sesuatu yang memberikan pengetahuan atau kabar kepada kita',
      'Kabel listrik yang terpasang di dinding',
      'Benda keras yang tidak bisa disentuh',
      'Tempat menyimpan pensil di tas',
    ],
    correctAnswer: 'Sesuatu yang memberikan pengetahuan atau kabar kepada kita',
    explanation: 'Informasi memberi kita pengetahuan atau kabar, misalnya berita cuaca, jadwal pelajaran, dan pesan guru.',
  },
  {
    id: 'fq-4',
    category: 'Teknologi Digital',
    question: 'Manakah yang termasuk contoh informasi dalam kehidupan sehari-hari?',
    illustration: 'schedule',
    options: [
      'Jadwal pelajaran dan berita cuaca',
      'Meja belajar dan kursi kayu',
      'Sepatu sekolah dan topi',
      'Penghapus karet dan penggaris',
    ],
    correctAnswer: 'Jadwal pelajaran dan berita cuaca',
    explanation: 'Jadwal pelajaran dan berita cuaca memberi kabar dan pengetahuan yang berguna bagi kita.',
  },
  {
    id: 'fq-5',
    category: 'Teknologi Digital',
    question: 'Salah satu manfaat teknologi digital bagi siswa kelas 4 SD adalah...',
    illustration: 'learning_video',
    options: [
      'Membantu belajar lewat video pembelajaran dan kuis interaktif',
      'Membuat kita lupa waktu istirahat',
      'Menggantikan semua tugas dengan meniru milik teman',
      'Membuat buku pelajaran tidak berguna sama sekali',
    ],
    correctAnswer: 'Membantu belajar lewat video pembelajaran dan kuis interaktif',
    explanation: 'Teknologi digital sangat bermanfaat untuk membantu kita belajar, berkomunikasi, dan mencari informasi positif.',
  },

  // 5 Soal Hardware dan Software
  {
    id: 'fq-6',
    category: 'Hardware & Software',
    question: 'Bagian komputer yang dapat dilihat dan disentuh secara langsung disebut...',
    illustration: 'monitor',
    options: ['Software', 'Hardware', 'Aplikasi', 'Internet'],
    correctAnswer: 'Hardware',
    explanation: 'Hardware (perangkat keras) adalah bagian fisik komputer yang dapat dilihat dan disentuh, seperti monitor dan keyboard.',
  },
  {
    id: 'fq-7',
    category: 'Hardware & Software',
    question: 'Manakah yang merupakan contoh perangkat lunak (software)?',
    illustration: 'paint',
    options: ['Mouse', 'Printer', 'Paint', 'Webcam'],
    correctAnswer: 'Paint',
    explanation: 'Paint adalah program/aplikasi untuk menggambar di komputer, sehingga termasuk software.',
  },
  {
    id: 'fq-8',
    category: 'Hardware & Software',
    question: 'Perangkat keras yang berfungsi untuk mencetak dokumen dan gambar ke kertas adalah...',
    illustration: 'printer',
    options: ['Printer', 'Speaker', 'Mikrofon', 'CPU'],
    correctAnswer: 'Printer',
    explanation: 'Printer mencetak tulisan maupun gambar dari komputer ke atas kertas.',
  },
  {
    id: 'fq-9',
    category: 'Hardware & Software',
    question: 'Program aplikasi Google Chrome digunakan untuk...',
    illustration: 'chrome',
    options: [
      'Menjelajahi internet dan membuka situs web',
      'Mencetak kertas tugas sekolah',
      'Mengeraskan suara musik di ruangan',
      'Menangkap gambar wajah seperti kamera',
    ],
    correctAnswer: 'Menjelajahi internet dan membuka situs web',
    explanation: 'Google Chrome adalah software peramban (browser) untuk menjelajahi internet.',
  },
  {
    id: 'fq-10',
    category: 'Hardware & Software',
    question: 'Mengapa hardware dan software saling membutuhkan dalam sistem komputer?',
    illustration: 'windows',
    options: [
      'Agar komputer bisa bekerja bersama menjalankan tugas dengan baik',
      'Supaya komputer menjadi lebih berat saat dibawa',
      'Karena hardware hanya bisa menyala tanpa program apa pun',
      'Agar kabel komputer tidak perlu dipasang',
    ],
    correctAnswer: 'Agar komputer bisa bekerja bersama menjalankan tugas dengan baik',
    explanation: 'Hardware tanpa software tidak tahu harus melakukan apa, dan software butuh hardware agar bisa dijalankan.',
  },

  // 5 Soal Keamanan Informasi Pribadi
  {
    id: 'fq-11',
    category: 'Keamanan Digital',
    question: 'Manakah yang termasuk informasi pribadi yang harus kita jaga?',
    illustration: 'personal_id',
    options: [
      'Nama lengkap, alamat rumah, nomor telepon, dan kata sandi',
      'Warna kesukaan dan nama buah favorit',
      'Judul lagu anak-anak yang terkenal',
      'Nama hari dalam seminggu',
    ],
    correctAnswer: 'Nama lengkap, alamat rumah, nomor telepon, dan kata sandi',
    explanation: 'Informasi pribadi meliputi nama lengkap, alamat rumah, nomor telepon, tanggal lahir, nama sekolah, kata sandi, dan foto pribadi.',
  },
  {
    id: 'fq-12',
    category: 'Keamanan Digital',
    question: 'Jika ada orang asing di internet meminta kata sandimu, apa yang harus kamu lakukan?',
    illustration: 'stranger_chat',
    options: [
      'Menolaknya, tidak membagikan kata sandi, dan memberi tahu orang tua atau guru',
      'Memberikan kata sandi agar dia mau berteman',
      'Mengirimkan kata sandi lewat pesan singkat',
      'Menulis kata sandi di status media sosial',
    ],
    correctAnswer: 'Menolaknya, tidak membagikan kata sandi, dan memberi tahu orang tua atau guru',
    explanation: 'Kata sandi bersifat rahasia! Segera lapor ke orang tua atau guru jika ada yang memintanya.',
  },
  {
    id: 'fq-13',
    category: 'Keamanan Digital',
    question: 'Mengapa kita tidak boleh sembarangan mengklik tautan (link) hadiah gratis dari nomor asing?',
    illustration: 'gift_scam',
    options: [
      'Karena bisa menjadi penipuan atau jebakan untuk mencuri data pribadi',
      'Karena tautan itu pasti berisi PR matematika',
      'Karena komputer akan langsung berubah warna',
      'Karena hadiahnya terlalu besar untuk layar monitor',
    ],
    correctAnswer: 'Karena bisa menjadi penipuan atau jebakan untuk mencuri data pribadi',
    explanation: 'Tautan mencurigakan sering digunakan untuk menipu atau mencuri informasi pribadi kita.',
  },
  {
    id: 'fq-14',
    category: 'Keamanan Digital',
    question: 'Apa yang harus dilakukan setelah selesai memakai akun di komputer bersama sekolah?',
    illustration: 'shared_pc',
    options: [
      'Selalu keluar (log out) dari akun kita',
      'Membiarkan akun tetap terbuka untuk teman berikutnya',
      'Menuliskan kata sandi di meja komputer',
      'Mematikan monitor saja tanpa keluar akun',
    ],
    correctAnswer: 'Selalu keluar (log out) dari akun kita',
    explanation: 'Keluar (log out) dari akun mencegah orang lain membuka atau mengubah data akunmu.',
  },
  {
    id: 'fq-15',
    category: 'Keamanan Digital',
    question: 'Bagaimana ciri kata sandi yang baik untuk melindungi akun belajarmu?',
    illustration: 'password_key',
    options: [
      'Kuat, gabungan huruf dan angka, serta tidak dibagikan ke orang lain',
      'Berupa angka berurutan seperti 123456',
      'Sama dengan nama panggilan sendiri agar mudah ditebak',
      'Ditulis di kertas lalu ditempel di tas sekolah',
    ],
    correctAnswer: 'Kuat, gabungan huruf dan angka, serta tidak dibagikan ke orang lain',
    explanation: 'Kata sandi yang kuat dan dijaga kerahasiaannya membuat akun digital kita selalu aman.',
  },
];
