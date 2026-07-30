export interface MateriChapter {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  dalil?: {
    arabic: string;
    translation: string;
    source: string;
  };
  keyPoints: string[];
  nisabRule?: string;
  formula?: string;
  example: string;
}

export const MATERI_ZAKAT_LIST: MateriChapter[] = [
  {
    id: 'pengertian-zakat',
    title: 'Pengertian & Keutamaan Zakat',
    category: 'Dasar Islam',
    icon: '🕌',
    summary: 'Zakat secara bahasa artinya tumbuh, suci, dan berkah. Dalam Islam, Zakat adalah mengeluarkan sebagian harta yang telah mencapai nisab kepada orang yang berhak menerima (8 Asnaf).',
    dalil: {
      arabic: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
      translation: 'Dan laksanakanlah shalat serta tunaikanlah zakat.',
      source: 'QS. Al-Baqarah: 43'
    },
    keyPoints: [
      'Zakat merupakan Rukun Islam ke-3.',
      'Menyucikan jiwa dan membersihkan harta dari sifat kikir & tamak.',
      'Membantu saudara muslim yang membutuhkan agar sejahtera bersama.',
      'Harta yang dizakati tidak akan berkurang, melainkan Allah akan melipatgandakan keberkahannya.'
    ],
    example: 'Seperti menyiram tanaman, zakat membersihkan harta kita agar tumbuh subur dan penuh berkah.'
  },
  {
    id: 'zakat-fitrah',
    title: 'Zakat Fitrah (Pembersih Jiwa)',
    category: 'Zakat Fitrah',
    icon: '🌾',
    summary: 'Zakat Fitrah adalah zakat wajib yang dikeluarkan setiap muslim pada bulan Ramadan sebelum Shalat Idul Fitri sebagai pembersih diri dan memberi makan fakir miskin.',
    dalil: {
      arabic: 'فَرَضَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ زَكَاةَ الْفِطْرِ صَاعًا مِنْ تَمْرٍ أَوْ صَاعًا مِنْ شَعِيرٍ',
      translation: 'Rasulullah SAW mewajibkan zakat fitrah sebanyak satu sha makanan pokok.',
      source: 'HR. Bukhari & Muslim'
    },
    nisabRule: 'Wajib bagi setiap jiwa muslim yang hidup di bulan Ramadan dan memiliki kelebihan makanan.',
    formula: '2,5 kg atau 3,5 liter beras / makanan pokok per jiwa.',
    keyPoints: [
      'Bisa dibayar dengan makanan pokok (beras, gandum, kurma) atau uang senilai harga beras tersebut.',
      'Waktu utama pembayaran: sejak awal Ramadan hingga sebelum Shalat Idul Fitri.',
      'Dapat dibayarkan untuk seluruh anggota keluarga yang menjadi tanggungan.'
    ],
    example: 'Jika dalam 1 rumah ada 4 anggota keluarga, maka Zakat Fitrahnya = 4 × 2,5 kg = 10 kg beras.'
  },
  {
    id: 'zakat-emas-perak',
    title: 'Zakat Emas & Perak (Zakat Mal)',
    category: 'Zakat Mal',
    icon: '💰',
    summary: 'Zakat Emas dan Perak ditaati jika simpanan emas telah mencapai Nisab (85 gram) dan disimpan selama 1 tahun penuh (Haul).',
    nisabRule: 'Nisab Emas = 85 gram emas murni (Perak = 595 gram). Haul = 1 tahun.',
    formula: '2.5% × Total Nilai Emas yang dimiliki.',
    keyPoints: [
      'Emas perhiasan yang dipakai sehari-hari dalam batas wajar tidak dikenakan zakat.',
      'Emas batangan atau tabungan simpanan wajib dizakati jika sudah 85 gram.',
      'Jika harga emas Rp 1.000.000/gram, maka nisabnya adalah Rp 85.000.000.'
    ],
    example: 'Jika kamu menyimpan 100 gram emas selama 1 tahun, kadar zakatnya = 2.5% × 100 gram = 2.5 gram emas (atau senilai uangnya).'
  },
  {
    id: 'zakat-profesi',
    title: 'Zakat Profesi & Penghasilan',
    category: 'Zakat Mal',
    icon: '💼',
    summary: 'Zakat Profesi dikeluarkan dari pendapatan atau gaji pekerjaan halal (dokter, guru, insinyur, pengusaha) saat menerima gaji.',
    nisabRule: 'Nisab per tahun setara 85 gram emas (atau sekitar Rp 7.000.000 - Rp 8.000.000 per bulan).',
    formula: '2.5% × Pendapatan / Gaji Bersih.',
    keyPoints: [
      'Bisa dibayarkan setiap bulan saat gajian (Zakat Penghasilan Rutin).',
      'Menggunakan acuan Fatwa MUI No. 3 Tahun 2003.',
      'Membuat penghasilan kerja terasa jauh lebih tenang dan penuh keberkahan.'
    ],
    example: 'Gaji per bulan Rp 10.000.000 (di atas nisab bulanan Rp 7.083.333). Zakatnya = 2.5% × Rp 10.000.000 = Rp 250.000.'
  },
  {
    id: 'zakat-pertanian',
    title: 'Zakat Pertanian & Hasil Bumi',
    category: 'Zakat Hasil Bumi',
    icon: '🌽',
    summary: 'Zakat Hasil Pertanian dikeluarkan setiap kali panen dari tanaman makanan pokok seperti padi, gandum, jagung, dan sejenisnya.',
    nisabRule: '5 Wasaq = 653 kg gabah kering panen (atau setara 520 kg beras).',
    formula: '5% (jika irigasi berbayar/pompa) OR 10% (jika pengairan alami air hujan/sungai).',
    keyPoints: [
      'Zakat pertanian tidak menunggu haul 1 tahun, melainkan dikeluarkan LANGSUNG saat panen.',
      'Persentase zakat lebih kecil (5%) jika petani mengeluarkan biaya irigasi.',
      'Persentase zakat lebih besar (10%) jika pengairan dari air hujan gratis.'
    ],
    example: 'Panen padi 1.000 kg beras (air hujan). Kadarnya 10% × 1.000 kg = 100 kg beras zakat.'
  },
  {
    id: '8-asnaf',
    title: '8 Golongan Penerima Zakat (8 Asnaf)',
    category: 'Penerima Zakat',
    icon: '👥',
    summary: 'Allah SWT menetapkan secara khusus 8 golongan manusia yang berhak menerima penyaluran zakat dalam Al-Qur\'an surat At-Taubah ayat 60.',
    dalil: {
      arabic: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ',
      translation: 'Sesungguhnya zakat itu hanyalah untuk orang-orang fakir, orang miskin, amil zakat, mualaf, hamba sahaya, gharimin, fi sabilillah, dan ibnu sabil.',
      source: 'QS. At-Taubah: 60'
    },
    keyPoints: [
      '1. Fakir (sangat tidak punya harta & penghasilan).',
      '2. Miskin (punya penghasilan tapi tidak cukup untuk kebutuhan dasar).',
      '3. Amil (petugas pengelola & penyalur zakat).',
      '4. Mualaf (orang yang baru masuk Islam).',
      '5. Riqab (memerdekakan hamba sahaya / budak).',
      '6. Gharimin (orang yang terlilit hutang untuk kebaikan).',
      '7. Fi Sabilillah (orang yang berjuang di jalan Allah).',
      '8. Ibnu Sabil (musafir yang kehabisan bekal dalam perjalanan baik).'
    ],
    example: 'Zakat disalurkan oleh Amil resmi kepada keluarga fakir miskin untuk bantuan sekolah dan makanan.'
  }
];
