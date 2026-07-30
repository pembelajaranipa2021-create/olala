import { Question } from '../types/zakat';

export const LEVEL_PRIZES = [
  { level: 1, prize: 100000, label: 'Rp 100.000 Poin', safe: false },
  { level: 2, prize: 250000, label: 'Rp 250.000 Poin', safe: false },
  { level: 3, prize: 500000, label: 'Rp 500.000 Poin', safe: false },
  { level: 4, prize: 1000000, label: 'Rp 1.000.000 Poin', safe: false },
  { level: 5, prize: 2500000, label: 'Rp 2.500.000 Poin (Aman 1 🛡️)', safe: true },
  { level: 6, prize: 5000000, label: 'Rp 5.000.000 Poin', safe: false },
  { level: 7, prize: 10000000, label: 'Rp 10.000.000 Poin', safe: false },
  { level: 8, prize: 20000000, label: 'Rp 20.000.000 Poin', safe: false },
  { level: 9, prize: 35000000, label: 'Rp 35.000.000 Poin', safe: false },
  { level: 10, prize: 50000000, label: 'Rp 50.000.000 Poin (Aman 2 🛡️)', safe: true },
  { level: 11, prize: 75000000, label: 'Rp 75.000.000 Poin', safe: false },
  { level: 12, prize: 100000000, label: 'Rp 100.000.000 Poin', safe: false },
  { level: 13, prize: 150000000, label: 'Rp 150.000.000 Poin', safe: false },
  { level: 14, prize: 200000000, label: 'Rp 200.000.000 Poin', safe: false },
  { level: 15, prize: 250000000, label: 'Rp 250.000.000 Poin (Aman 3 🛡️)', safe: true },
  { level: 16, prize: 300000000, label: 'Rp 300.000.000 Poin', safe: false },
  { level: 17, prize: 350000000, label: 'Rp 350.000.000 Poin', safe: false },
  { level: 18, prize: 400000000, label: 'Rp 400.000.000 Poin', safe: false },
  { level: 19, prize: 450000000, label: 'Rp 450.000.000 Poin', safe: false },
  { level: 20, prize: 500000000, label: 'Rp 500.000.000 Poin (Aman 4 🛡️)', safe: true },
  { level: 21, prize: 600000000, label: 'Rp 600.000.000 Poin', safe: false },
  { level: 22, prize: 700000000, label: 'Rp 700.000.000 Poin', safe: false },
  { level: 23, prize: 800000000, label: 'Rp 800.000.000 Poin', safe: false },
  { level: 24, prize: 850000000, label: 'Rp 850.000.000 Poin', safe: false },
  { level: 25, prize: 900000000, label: 'Rp 900.000.000 Poin (Aman 5 🛡️)', safe: true },
  { level: 26, prize: 925000000, label: 'Rp 925.000.000 Poin', safe: false },
  { level: 27, prize: 950000000, label: 'Rp 950.000.000 Poin', safe: false },
  { level: 28, prize: 975000000, label: 'Rp 975.000.000 Poin', safe: false },
  { level: 29, prize: 990000000, label: 'Rp 990.000.000 Poin', safe: false },
  { level: 30, prize: 1000000000, label: 'Rp 1 MILIAR POIN PAHLAWAN ZAKAT 👑 (Aman 6 🛡️)', safe: true },
];

export const ZAKAT_QUESTIONS_BANK: Question[] = [
  // ================= LEVEL 1 =================
  {
    id: 'q1_1',
    level: 1,
    prize: 100000,
    prizeLabel: 'Rp 100.000 Poin',
    category: 'konsep',
    questionText: 'Secara bahasa, kata "Zakat" dalam agama Islam memiliki arti...',
    options: ['Tumbuh, Suci, dan Bersih', 'Membeli dan Menjual', 'Menabung di Bank', 'Meminjam uang kepada teman'],
    correctAnswerIndex: 0,
    explanation: 'Secara bahasa, Zakat berarti "Suci", "Tumbuh", dan "Penuh Berkah". Mengeluarkan zakat menyucikan harta dan jiwa.',
    hintUstadz: 'Ingat anak-anak, zakat artinya membersihkan dan menyucikan harta agar makin berkah!'
  },
  {
    id: 'q1_2',
    level: 1,
    prize: 100000,
    prizeLabel: 'Rp 100.000 Poin',
    category: 'konsep',
    questionText: 'Memberikan sebagian harta tertentu kepada orang yang berhak menerimanya sesuai hukum Islam dinamakan...',
    options: ['Zakat', 'Pajak', 'Arisan', 'Pinjaman'],
    correctAnswerIndex: 0,
    explanation: 'Zakat adalah kadar harta tertentu yang wajib dikeluarkan oleh seorang muslim kepada yang berhak menerimanya.',
    hintUstadz: 'Ibadah kewajiban harta rukun Islam ketiga dinamakan Zakat!'
  },
  {
    id: 'q1_3',
    level: 1,
    prize: 100000,
    prizeLabel: 'Rp 100.000 Poin',
    category: 'konsep',
    questionText: 'Apakah hukum mengeluarkan zakat bagi seorang muslim yang sudah memenuhi syarat wajib zakat?',
    options: ['Wajib (Fardhu)', 'Sunnah Muakkad', 'Harus Bayar Denda', 'Makruh'],
    correctAnswerIndex: 0,
    explanation: 'Membayar zakat hukumnya Fardhu Ain (Wajib) bagi setiap muslim yang memenuhi kriteria.',
    hintUstadz: 'Zakat termasuk rukun Islam, hukumnya wajib dilaksanakan!'
  },

  // ================= LEVEL 2 =================
  {
    id: 'q2_1',
    level: 2,
    prize: 250000,
    prizeLabel: 'Rp 250.000 Poin',
    category: 'konsep',
    questionText: 'Membayar Zakat merupakan rukun Islam yang ke-...',
    options: ['Rukun Islam ke-3', 'Rukun Islam ke-1', 'Rukun Islam ke-5', 'Rukun Islam ke-2'],
    correctAnswerIndex: 0,
    explanation: 'Rukun Islam ada 5: 1. Syahadat, 2. Shalat, 3. Zakat, 4. Puasa, 5. Haji bagi yang mampu.',
    hintUstadz: 'Urutan Rukun Islam: Syahadat, Shalat, Zakat, Puasa, Haji!'
  },
  {
    id: 'q2_2',
    level: 2,
    prize: 250000,
    prizeLabel: 'Rp 250.000 Poin',
    category: 'konsep',
    questionText: 'Dalam Al-Qur\'an, perintah mendirikan Shalat sering digandengkan bersama perintah...',
    options: ['Tunaikan Zakat', 'Pergi Berperang', 'Membeli Tanah', 'Membangun Istana'],
    correctAnswerIndex: 0,
    explanation: 'Ayat Al-Qur\'an sangat sering menyebut: "Aqiimush shalaata wa aatuz zakah" (Dirikan shalat dan tunaikan zakat).',
    hintUstadz: 'Di Al-Qur\'an selalu bergandengan: Dirikan Shalat & Tunaikan Zakat!'
  },
  {
    id: 'q2_3',
    level: 2,
    prize: 250000,
    prizeLabel: 'Rp 250.000 Poin',
    category: 'konsep',
    questionText: 'Apakah dampak utama jika kita rajin menunaikan zakat dari harta kita?',
    options: ['Harta menjadi suci, berkah, dan jiwa tenteram', 'Harta langsung habis tak tersisa', 'Menjadi sombong di depan orang', 'Mendapat piala bergilir'],
    correctAnswerIndex: 0,
    explanation: 'Zakat menyucikan harta dari keharaman dan menumbuhkan keberkahan serta rasa empati kepada sesama.',
    hintUstadz: 'Zakat tidak mengurangi harta, malah membersihkan dan menambah keberkahan!'
  },

  // ================= LEVEL 3 =================
  {
    id: 'q3_1',
    level: 3,
    prize: 500000,
    prizeLabel: 'Rp 500.000 Poin',
    category: 'fitrah',
    questionText: 'Zakat yang wajib dikeluarkan oleh setiap muslim di bulan Ramadhan sampai sebelum shalat Idul Fitri disebut...',
    options: ['Zakat Fitrah', 'Zakat Maal', 'Zakat Perdagangan', 'Zakat Profesi'],
    correctAnswerIndex: 0,
    explanation: 'Zakat Fitrah adalah zakat jiwa yang dikeluarkan pada bulan Ramadhan untuk mensucikan diri dan membahagiakan fakir miskin di hari raya.',
    hintUstadz: 'Zakat ini dibayarkan menjelang Idul Fitri pakai beras atau makanan pokok.'
  },
  {
    id: 'q3_2',
    level: 3,
    prize: 500000,
    prizeLabel: 'Rp 500.000 Poin',
    category: 'fitrah',
    questionText: 'Kapan batas akhir waktu utama pembayaran Zakat Fitrah yang sah?',
    options: ['Sebelum pelaksanaan Shalat Idul Fitri', 'Setelah shalat Idul Adha', 'Di pertengahan bulan Muharram', 'Saat malam Idul Adha'],
    correctAnswerIndex: 0,
    explanation: 'Batas akhir pembayaran zakat fitrah adalah sebelum khotbah/shalat Idul Fitri ditegakkan.',
    hintUstadz: 'Harus dibayar sebelum imam dan jemaah shalat Idul Fitri dimulai!'
  },
  {
    id: 'q3_3',
    level: 3,
    prize: 500000,
    prizeLabel: 'Rp 500.000 Poin',
    category: 'fitrah',
    questionText: 'Siapa sajakah yang wajib membayar zakat fitrah pada bulan Ramadhan?',
    options: ['Seluruh umat Islam, baik bayi, anak-anak, maupun dewasa', 'Hanya orang dewasa yang bekerja', 'Hanya para kakek dan nenek', 'Hanya para pejabat negara'],
    correctAnswerIndex: 0,
    explanation: 'Zakat Fitrah wajib atas setiap jiwa (fardhu \'ala kulli muslimin) bayi baru lahir sebelum tenggelam matahari akhir Ramadhan hingga lansia.',
    hintUstadz: 'Setiap jiwa muslim wajib zakat fitrah, termasuk bayi yang lahir sebelum malam Idul Fitri!'
  },

  // ================= LEVEL 4 =================
  {
    id: 'q4_1',
    level: 4,
    prize: 1000000,
    prizeLabel: 'Rp 1.000.000 Poin',
    category: 'fitrah',
    questionText: 'Berapakah standar takaran Zakat Fitrah berupa makanan pokok (beras) untuk 1 orang muslim?',
    options: ['2,5 kg / 3,5 liter', '1 kg / 1 liter', '10 kg / 12 liter', '5 kg / 7 liter'],
    correctAnswerIndex: 0,
    explanation: 'Setiap jiwa muslim wajib membayar Zakat Fitrah sebanyak 1 Sha’ atau setara 2,5 kg / 3,5 liter beras.',
    hintUstadz: 'Standard Baznas dan mayoritas ulama Indonesia adalah 2,5 kg atau 3,5 liter beras per orang.'
  },
  {
    id: 'q4_2',
    level: 4,
    prize: 1000000,
    prizeLabel: 'Rp 1.000.000 Poin',
    category: 'fitrah',
    questionText: 'Jenis makanan yang dikeluarkan untuk Zakat Fitrah di suatu daerah adalah...',
    options: ['Makanan pokok masyarakat setempat (seperti beras/gandum)', 'Minuman bersoda', 'Daging sapi segar', 'Buah-buahan impor'],
    correctAnswerIndex: 0,
    explanation: 'Zakat fitrah mengunakan makanan pokok setempat seperti beras di Indonesia, gandum di Timur Tengah, atau kurma/sagu.',
    hintUstadz: 'Di Indonesia makanan pokoknya adalah beras!'
  },
  {
    id: 'q4_3',
    level: 4,
    prize: 1000000,
    prizeLabel: 'Rp 1.000.000 Poin',
    category: 'fitrah',
    questionText: 'Menurut keputusan Fatwa MUI dan BAZNAS, Zakat Fitrah dapat digantikan dengan uang senilai...',
    options: ['Harga beras makanan pokok setara 2,5 kg per jiwa', 'Harga 1 unit sepeda motor', 'Rp 1.000 per orang', 'Harga 1 gram emas'],
    correctAnswerIndex: 0,
    explanation: 'Jika membayar pakai uang, nilainya disesuaikan dengan harga beras 2,5 kg di daerah setempat.',
    hintUstadz: 'Uang disesuaikan harga beras 2,5 kg di pasar daerahmu!'
  },

  // ================= LEVEL 5 - Safe Checkpoint 1 =================
  {
    id: 'q5_1',
    level: 5,
    prize: 2500000,
    prizeLabel: 'Rp 2.500.000 Poin (Aman 🛡️)',
    category: 'fitrah',
    questionText: 'Keluarga Pak Ahmad terdiri dari Ayah, Ibu, dan 3 anak. Berapa total beras zakat fitrah yang harus dikeluarkan keluarga Pak Ahmad?',
    options: ['12,5 kg beras', '7,5 kg beras', '10 kg beras', '15 kg beras'],
    correctAnswerIndex: 0,
    explanation: 'Total anggota keluarga = 5 orang. Zakat fitrah per orang = 2,5 kg. Maka 5 x 2,5 kg = 12,5 kg beras!',
    hasCalculator: true,
    calculatorPreset: {
      type: 'fitrah',
      defaultValues: { jumlahOrang: 5, berasPerOrang: 2.5 },
      unitText: 'kg beras',
      targetFormulaExplanation: 'Jumlah Anggota Keluarga (5) × 2,5 kg = 12,5 kg beras'
    },
    hintUstadz: 'Hitung jumlah anggota keluarga: Pak Ahmad + Ibu + 3 anak = 5 orang. Lalu kalikan 2,5 kg!'
  },
  {
    id: 'q5_2',
    level: 5,
    prize: 2500000,
    prizeLabel: 'Rp 2.500.000 Poin (Aman 🛡️)',
    category: 'fitrah',
    questionText: 'Ibu Rahma menanggung zakat fitrah untuk 6 anggota keluarganya. Berapa kg total beras zakat yang harus disiapkan?',
    options: ['15 kg beras', '12 kg beras', '18 kg beras', '20 kg beras'],
    correctAnswerIndex: 0,
    explanation: '6 orang × 2,5 kg = 15 kg beras.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'fitrah',
      defaultValues: { jumlahOrang: 6, berasPerOrang: 2.5 },
      unitText: 'kg beras',
      targetFormulaExplanation: '6 orang × 2,5 kg = 15 kg beras'
    },
    hintUstadz: 'Kalikan 6 orang dengan 2,5 kg per orang!'
  },
  {
    id: 'q5_3',
    level: 5,
    prize: 2500000,
    prizeLabel: 'Rp 2.500.000 Poin (Aman 🛡️)',
    category: 'fitrah',
    questionText: 'Pak Ali tinggal bersama istri dan 2 anaknya (total 4 jiwa). Berapa total beras zakat fitrah keluarganya?',
    options: ['10 kg beras', '8 kg beras', '12 kg beras', '14 kg beras'],
    correctAnswerIndex: 0,
    explanation: '4 orang × 2,5 kg = 10 kg beras.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'fitrah',
      defaultValues: { jumlahOrang: 4, berasPerOrang: 2.5 },
      unitText: 'kg beras',
      targetFormulaExplanation: '4 orang × 2,5 kg = 10 kg beras'
    },
    hintUstadz: '4 jiwa dikali 2,5 kg sama dengan 10 kg beras!'
  },

  // ================= LEVEL 6 =================
  {
    id: 'q6_1',
    level: 6,
    prize: 5000000,
    prizeLabel: 'Rp 5.000.000 Poin',
    category: 'konsep',
    questionText: 'Batas minimal jumlah harta simpanan yang menyebabkan harta tersebut wajib dizakati disebut...',
    options: ['Nisab', 'Haul', 'Muzakki', 'Mustahik'],
    correctAnswerIndex: 0,
    explanation: 'Nisab adalah batas minimum jumlah harta wajib zakat. Jika harta sudah mencapai nisab dan berumur 1 tahun (haul), wajib dizakati!',
    hintUstadz: 'Nisab adalah ambang batas minimal harta simpanan!'
  },
  {
    id: 'q6_2',
    level: 6,
    prize: 5000000,
    prizeLabel: 'Rp 5.000.000 Poin',
    category: 'konsep',
    questionText: 'Jangka waktu minimal kepemilikan harta simpanan selama satu tahun Hijriah dalam syarat zakat dinamakan...',
    options: ['Haul', 'Nisab', 'Meqat', 'Hijrah'],
    correctAnswerIndex: 0,
    explanation: 'Haul adalah batasan waktu kepemilikan harta selama 1 tahun penuh (tahun Hijriah).',
    hintUstadz: 'Haul berarti berumur 1 tahun kepemilikan!'
  },
  {
    id: 'q6_3',
    level: 6,
    prize: 5000000,
    prizeLabel: 'Rp 5.000.000 Poin',
    category: 'konsep',
    questionText: 'Harta yang disimpan untuk zakat maal haruslah "Al-Milkus Tamm". Apakah arti dari istilah tersebut?',
    options: ['Kepemilikan utuh/sempurna atas harta tersebut', 'Harta hasil meminjam dari bank', 'Harta milik bersama satu kampung', 'Harta yang ditemukan di jalanan'],
    correctAnswerIndex: 0,
    explanation: 'Al-Milkus Tamm berarti harta tersebut sepenuhnya milik pribadi sah dan tidak tersangkut hutang/sengketa.',
    hintUstadz: 'Milik sempurna artinya milik sendiri sepenuhnya secara sah!'
  },

  // ================= LEVEL 7 =================
  {
    id: 'q7_1',
    level: 7,
    prize: 10000000,
    prizeLabel: 'Rp 10.000.000 Poin',
    category: 'asnaf',
    questionText: 'Berdasarkan Surah At-Taubah ayat 60, ada berapa golongan (asnaf) yang berhak menerima harta zakat?',
    options: ['8 Golongan', '5 Golongan', '10 Golongan', '12 Golongan'],
    correctAnswerIndex: 0,
    explanation: 'Ada 8 Asnaf (golongan penerima zakat): Fakir, Miskin, Amil, Muallaf, Riqab, Gharim, Fisabilillah, dan Ibnus Sabil.',
    hintUstadz: 'Surah At-Taubah ayat 60 menyebutkan tepat 8 golongan penerima zakat!'
  },
  {
    id: 'q7_2',
    level: 7,
    prize: 10000000,
    prizeLabel: 'Rp 10.000.000 Poin',
    category: 'asnaf',
    questionText: 'Orang yang tidak memiliki harta dan tidak mempunyai pekerjaan sama sekali untuk memenuhi kebutuhan hidup disebut golongan...',
    options: ['Fakir', 'Miskin', 'Amil', 'Gharim'],
    correctAnswerIndex: 0,
    explanation: 'Fakir adalah orang yang amat sengsara hidupnya, tidak mempunyai harta dan tenaga untuk memenuhi kehidupan pokok.',
    hintUstadz: 'Fakir kondisinya lebih kekurangan daripada Miskin!'
  },
  {
    id: 'q7_3',
    level: 7,
    prize: 10000000,
    prizeLabel: 'Rp 10.000.000 Poin',
    category: 'asnaf',
    questionText: 'Orang yang memiliki sedikit penghasilan tetapi masih belum cukup untuk memenuhi kebutuhan sehari-harinya disebut...',
    options: ['Miskin', 'Fakir', 'Muallaf', 'Riqab'],
    correctAnswerIndex: 0,
    explanation: 'Miskin adalah orang yang memiliki penghasilan namun belum mencukupi kebutuhan dasar hidupnya.',
    hintUstadz: 'Miskin punya kerjaan/pemasukan tapi hasilnya kurang mencukupi!'
  },

  // ================= LEVEL 8 =================
  {
    id: 'q8_1',
    level: 8,
    prize: 20000000,
    prizeLabel: 'Rp 20.000.000 Poin',
    category: 'asnaf',
    questionText: 'Petugas atau panitia resmi yang diberi tugas mengumpulkan dan mendistribusikan zakat disebut...',
    options: ['Amil Zakat', 'Muzakki', 'Gharim', 'Mustahik'],
    correctAnswerIndex: 0,
    explanation: 'Amil Zakat adalah orang atau pengurus lembaga resmi yang bertugas mengelola, mencatat, dan menyalurkan dana zakat.',
    hintUstadz: 'Amil adalah pengurus/panitia resmi pengelola zakat!'
  },
  {
    id: 'q8_2',
    level: 8,
    prize: 20000000,
    prizeLabel: 'Rp 20.000.000 Poin',
    category: 'asnaf',
    questionText: 'Di Indonesia, lembaga resmi pemerintah yang bertugas mengelola dan menyalurkan zakat secara nasional adalah...',
    options: ['BAZNAS (Badan Amil Zakat Nasional)', 'BMKG', 'BPJS Kesehatan', 'KPU'],
    correctAnswerIndex: 0,
    explanation: 'BAZNAS adalah badan resmi pemerintah mengelola zakat secara profesional di seluruh Indonesia.',
    hintUstadz: 'BAZNAS adalah Badan Amil Zakat Nasional!'
  },
  {
    id: 'q8_3',
    level: 8,
    prize: 20000000,
    prizeLabel: 'Rp 20.000.000 Poin',
    category: 'asnaf',
    questionText: 'Orang yang mengeluarkan atau membayar zakat disebut ..., sedangkan penerima zakat disebut ...',
    options: ['Muzakki ; Mustahik', 'Mustahik ; Muzakki', 'Amil ; Gharim', 'Munfiq ; Mukhlis'],
    correctAnswerIndex: 0,
    explanation: 'Muzakki = Orang bayar zakat. Mustahik = Orang yang berhak menerima zakat.',
    hintUstadz: 'Pembayar = Muzakki. Penerima = Mustahik.'
  },

  // ================= LEVEL 9 =================
  {
    id: 'q9_1',
    level: 9,
    prize: 35000000,
    prizeLabel: 'Rp 35.000.000 Poin',
    category: 'emas_perak',
    questionText: 'Berapakah nisab minimal kepemilikan emas murni yang telah disimpan selama 1 tahun agar wajib dikeluarkan zakatnya?',
    options: ['85 gram', '50 gram', '100 gram', '200 gram'],
    correctAnswerIndex: 0,
    explanation: 'Nisab emas murni adalah 85 gram. Jika emas simpanan telah mencapai/melebihi 85 gram dan tersimpan 1 tahun, wajib dizakati 2,5%.',
    hintUstadz: 'Nisab emas murni adalah 85 gram emas!'
  },
  {
    id: 'q9_2',
    level: 9,
    prize: 35000000,
    prizeLabel: 'Rp 35.000.000 Poin',
    category: 'emas_perak',
    questionText: 'Berapakah persentase (kadar) Zakat Emas dan Perak yang wajib dikeluarkan dari simpanan yang memenuhi nisab?',
    options: ['2,5%', '5%', '10%', '20%'],
    correctAnswerIndex: 0,
    explanation: 'Kadar zakat simpanan emas, perak, uang, dan tabungan adalah 2,5%.',
    hintUstadz: 'Persentase zakat emas dan perak adalah 2,5%!'
  },
  {
    id: 'q9_3',
    level: 9,
    prize: 35000000,
    prizeLabel: 'Rp 35.000.000 Poin',
    category: 'emas_perak',
    questionText: 'Apakah perhiasan emas yang dipakai sehari-hari dalam batas kewajaran wajib dikeluarkan zakatnya menurut jumhur ulama?',
    options: ['Tidak wajib jika dipakai rutin dalam batas wajar', 'Sangat wajib 50%', 'Wajib bayar denda', 'Wajib diserahkan ke toko'],
    correctAnswerIndex: 0,
    explanation: 'Perhiasan emas yang biasa dipakai wanita secara wajar tidak wajib zakat, kecuali jika disimpan sebagai investasi/melebihi batas wajar.',
    hintUstadz: 'Perhiasan yang dipakai rutin tidak wajib zakat, yang wajib adalah emas simpanan/tabungan!'
  },

  // ================= LEVEL 10 - Safe Checkpoint 2 =================
  {
    id: 'q10_1',
    level: 10,
    prize: 50000000,
    prizeLabel: 'Rp 50.000.000 Poin (Aman 🛡️)',
    category: 'emas_perak',
    questionText: 'Ibu Siti memiliki simpanan emas murni sebanyak 100 gram yang telah disimpan selama 1 tahun. Berapa zakat emas yang wajib dikeluarkan Ibu Siti?',
    options: ['2,5 gram emas', '1,5 gram emas', '5 gram emas', '8,5 gram emas'],
    correctAnswerIndex: 0,
    explanation: 'Karena 100 gram melebihi nisab (85 gram), zakatnya adalah 2,5% × 100 gram = 2,5 gram emas.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'emas',
      defaultValues: { gramEmas: 100, kadarPercent: 2.5 },
      unitText: 'gram emas',
      targetFormulaExplanation: '2,5% × 100 gram = 2,5 gram emas'
    },
    hintUstadz: 'Kadar zakat emas adalah 2,5%. Kalikan 100 gram dengan 2,5%!'
  },
  {
    id: 'q10_2',
    level: 10,
    prize: 50000000,
    prizeLabel: 'Rp 50.000.000 Poin (Aman 🛡️)',
    category: 'emas_perak',
    questionText: 'Pak Usman menyimpan emas batangan sebanyak 200 gram selama 1 tahun. Berapa gram zakat emas Pak Usman?',
    options: ['5 gram emas', '2,5 gram emas', '10 gram emas', '15 gram emas'],
    correctAnswerIndex: 0,
    explanation: '2,5% × 200 gram = 5 gram emas.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'emas',
      defaultValues: { gramEmas: 200, kadarPercent: 2.5 },
      unitText: 'gram emas',
      targetFormulaExplanation: '2,5% × 200 gram = 5 gram emas'
    },
    hintUstadz: '2,5% dikali 200 gram emas hasilnya 5 gram!'
  },
  {
    id: 'q10_3',
    level: 10,
    prize: 50000000,
    prizeLabel: 'Rp 50.000.000 Poin (Aman 🛡️)',
    category: 'emas_perak',
    questionText: 'Pak Hendra memiliki simpanan 120 gram emas murni. Jika emas tersebut dikonversi uang Rp 1.000.000/gram (total Rp 120 Juta), berapa rupiah zakatnya?',
    options: ['Rp 3.000.000', 'Rp 2.000.000', 'Rp 5.000.000', 'Rp 6.000.000'],
    correctAnswerIndex: 0,
    explanation: '2,5% × Rp 120.000.000 = Rp 3.000.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'emas',
      defaultValues: { gramEmas: 120000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 120.000.000 = Rp 3.000.000'
    },
    hintUstadz: 'Kalikan total nilai Rp 120 Juta dengan 2,5%!'
  },

  // ================= LEVEL 11 =================
  {
    id: 'q11_1',
    level: 11,
    prize: 75000000,
    prizeLabel: 'Rp 75.000.000 Poin',
    category: 'fitrah',
    questionText: 'Harga beras di daerah Budi adalah Rp 14.000 per kg. Jika Budi membayar zakat fitrah dengan uang untuk 4 anggota keluarganya (2,5 kg per orang), berapa total uang zakatnya?',
    options: ['Rp 140.000', 'Rp 100.000', 'Rp 120.000', 'Rp 160.000'],
    correctAnswerIndex: 0,
    explanation: 'Total beras = 4 orang x 2,5 kg = 10 kg beras. Total uang = 10 kg x Rp 14.000 = Rp 140.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'fitrah',
      defaultValues: { jumlahOrang: 4, berasPerOrang: 2.5, hargaPerKg: 14000 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '4 orang × 2,5 kg × Rp 14.000 = Rp 140.000'
    },
    hintUstadz: 'Hitung total beras dulu (4 × 2,5 kg = 10 kg), lalu kalikan harga per kg Rp 14.000!'
  },
  {
    id: 'q11_2',
    level: 11,
    prize: 75000000,
    prizeLabel: 'Rp 75.000.000 Poin',
    category: 'fitrah',
    questionText: 'Harga beras di kota A adalah Rp 12.000 per kg. Keluarga Pak Doni ada 5 orang (2,5 kg beras per orang). Berapa total uang zakat fitrahnya?',
    options: ['Rp 150.000', 'Rp 120.000', 'Rp 180.000', 'Rp 200.000'],
    correctAnswerIndex: 0,
    explanation: 'Total beras = 5 x 2,5 kg = 12,5 kg. Total uang = 12,5 kg x Rp 12.000 = Rp 150.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'fitrah',
      defaultValues: { jumlahOrang: 5, berasPerOrang: 2.5, hargaPerKg: 12000 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '5 orang × 2,5 kg × Rp 12.000 = Rp 150.000'
    },
    hintUstadz: '5 jiwa × 2,5 kg = 12,5 kg beras. Dikali Rp 12.000 = Rp 150.000!'
  },
  {
    id: 'q11_3',
    level: 11,
    prize: 75000000,
    prizeLabel: 'Rp 75.000.000 Poin',
    category: 'fitrah',
    questionText: 'Jika harga beras di pasaran adalah Rp 16.000 per kg, berapa nilai zakat fitrah dengan uang untuk 1 orang (2,5 kg beras)?',
    options: ['Rp 40.000', 'Rp 30.000', 'Rp 50.000', 'Rp 35.000'],
    correctAnswerIndex: 0,
    explanation: '2,5 kg × Rp 16.000 = Rp 40.000 per orang.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'fitrah',
      defaultValues: { jumlahOrang: 1, berasPerOrang: 2.5, hargaPerKg: 16000 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '1 orang × 2,5 kg × Rp 16.000 = Rp 40.000'
    },
    hintUstadz: '2,5 kg dikali Rp 16.000 hasilnya Rp 40.000!'
  },

  // ================= LEVEL 12 =================
  {
    id: 'q12_1',
    level: 12,
    prize: 100000000,
    prizeLabel: 'Rp 100.000.000 Poin',
    category: 'profesi',
    questionText: 'Berapa persen kadar zakat profesi / zakat penghasilan yang wajib dikeluarkan dari gaji bersih bulanan?',
    options: ['2,5%', '1%', '5%', '10%'],
    correctAnswerIndex: 0,
    explanation: 'Kadar zakat profesi adalah 2,5% dari penghasilan bersih bulanan jika sudah mencapai nisab bulanan.',
    hintUstadz: 'Zakat profesi dianalogikan dengan zakat emas/uang yaitu sebesar 2,5%.'
  },
  {
    id: 'q12_2',
    level: 12,
    prize: 100000000,
    prizeLabel: 'Rp 100.000.000 Poin',
    category: 'profesi',
    questionText: 'Nisab zakat profesi per tahun disepadankan dengan nilai harga emas murni seberat...',
    options: ['85 gram emas', '50 gram emas', '200 gram perak', '653 kg padi'],
    correctAnswerIndex: 0,
    explanation: 'Nisab zakat profesi dianalogikan dengan nisab emas yaitu 85 gram emas per tahun (atau sekitar 7,08 gram per bulan).',
    hintUstadz: 'Nisab profesi dianalogikan dengan emas 85 gram per tahun!'
  },
  {
    id: 'q12_3',
    level: 12,
    prize: 100000000,
    prizeLabel: 'Rp 100.000.000 Poin',
    category: 'profesi',
    questionText: 'Siapa sajakah yang dapat dikategorikan wajib menunaikan Zakat Profesi?',
    options: ['Pekerja/Profesional berpenghasilan halal yang melebihi nisab', 'Pengangguran tanpa pemasukan', 'Anak sekolah SD', 'Pedagang yang gulung tikar'],
    correctAnswerIndex: 0,
    explanation: 'Zakat profesi wajib bagi dokter, insinyur, PNS, karyawan, seniman, dll yang gajinya mencapai nisab.',
    hintUstadz: 'Setiap pekerja berpenghasilan melebihi nisab wajib zakat profesi!'
  },

  // ================= LEVEL 13 =================
  {
    id: 'q13_1',
    level: 13,
    prize: 150000000,
    prizeLabel: 'Rp 150.000.000 Poin',
    category: 'profesi',
    questionText: 'Kakak Roni bekerja sebagai dokter dan berpenghasilan bersih Rp 10.000.000 per bulan (sudah mencapai nisab). Berapa zakat profesi yang dikeluarkan tiap bulannya?',
    options: ['Rp 250.000', 'Rp 150.000', 'Rp 200.000', 'Rp 500.000'],
    correctAnswerIndex: 0,
    explanation: 'Zakat profesi bertarif 2,5%. Maka: 2,5% × Rp 10.000.000 = Rp 250.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'profesi',
      defaultValues: { penghasilan: 10000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 10.000.000 = Rp 250.000'
    },
    hintUstadz: 'Kadar zakat profesi adalah 2,5% dari total penghasilan bersih per bulan.'
  },
  {
    id: 'q13_2',
    level: 13,
    prize: 150000000,
    prizeLabel: 'Rp 150.000.000 Poin',
    category: 'profesi',
    questionText: 'Ibu Anita seorang manajer bergaji bersih Rp 20.000.000 per bulan. Berapa nilai Zakat Profesi bulanan Ibu Anita?',
    options: ['Rp 500.000', 'Rp 250.000', 'Rp 750.000', 'Rp 1.000.000'],
    correctAnswerIndex: 0,
    explanation: '2,5% × Rp 20.000.000 = Rp 500.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'profesi',
      defaultValues: { penghasilan: 20000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 20.000.000 = Rp 500.000'
    },
    hintUstadz: '2,5% dikali Rp 20 Juta = Rp 500.000!'
  },
  {
    id: 'q13_3',
    level: 13,
    prize: 150000000,
    prizeLabel: 'Rp 150.000.000 Poin',
    category: 'profesi',
    questionText: 'Pak Budi berpenghasilan Rp 12.000.000 per bulan. Berapa zakat penghasilan yang dibayarkan setiap bulannya?',
    options: ['Rp 300.000', 'Rp 200.000', 'Rp 400.000', 'Rp 600.000'],
    correctAnswerIndex: 0,
    explanation: '2,5% × Rp 12.000.000 = Rp 300.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'profesi',
      defaultValues: { penghasilan: 12000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 12.000.000 = Rp 300.000'
    },
    hintUstadz: 'Kalikan Rp 12 Juta dengan 2,5%!'
  },

  // ================= LEVEL 14 =================
  {
    id: 'q14_1',
    level: 14,
    prize: 200000000,
    prizeLabel: 'Rp 200.000.000 Poin',
    category: 'pertanian',
    questionText: 'Pak Tani memanen gabah 1.000 kg (melebihi nisab 653 kg). Sawah Pak Tani diairi hanya menggunakan AIR HUJAN (alami tanpa biaya). Berapa % zakat pertaniannya?',
    options: ['10%', '2,5%', '5%', '20%'],
    correctAnswerIndex: 0,
    explanation: 'Zakat pertanian dengan pengairan alami (air hujan/sungai) kadarnya 10%. Jika menggunakan irigasi berbayar/mesin pompa, kadarnya 5%.',
    hintUstadz: 'Prinsipnya: Jika alami (tanpa biaya air), zakatnya lebih besar yaitu 10%. Jika beli air/pompa, zakatnya 5%.'
  },
  {
    id: 'q14_2',
    level: 14,
    prize: 200000000,
    prizeLabel: 'Rp 200.000.000 Poin',
    category: 'pertanian',
    questionText: 'Berapakah nisab minimal hasil panen pertanian makanan pokok (seperti gabah/padi bersih) agar wajib dikeluarkan zakatnya?',
    options: ['5 Wasaq (setara 653 kg gabah / 520 kg beras)', '100 kg beras', '1.000 kg beras', '10 kg beras'],
    correctAnswerIndex: 0,
    explanation: 'Nisab pertanian adalah 5 Wasaq atau setara 653 kg gabah kering giling (atau 520 kg beras).',
    hintUstadz: 'Nisab hasil panen pertanian adalah 5 Wasaq atau setara 653 kg gabah!'
  },
  {
    id: 'q14_3',
    level: 14,
    prize: 200000000,
    prizeLabel: 'Rp 200.000.000 Poin',
    category: 'pertanian',
    questionText: 'Kapan waktu pembayaran Zakat Pertanian dilakukan oleh para petani?',
    options: ['Setiap kali selesai panen (tanpa menunggu 1 tahun/haul)', 'Setiap bulan Ramadhan', 'Setiap tanggal 1 Januari', 'Setiap 10 tahun sekali'],
    correctAnswerIndex: 0,
    explanation: 'Sesuai Surah Al-An\'am ayat 141: "wa aatuu haqqahu yauma hishaadih" (tunaikanlah haknya pada hari memetik/panennya).',
    hintUstadz: 'Zakat pertanian dibayar langsung setiap kali selesai panen!'
  },

  // ================= LEVEL 15 - Safe Checkpoint 3 =================
  {
    id: 'q15_1',
    level: 15,
    prize: 250000000,
    prizeLabel: 'Rp 250.000.000 Poin (Aman 🛡️)',
    category: 'pertanian',
    questionText: 'Pak Hasan memanen 2.000 kg padi dengan pengairan mesin irigasi berbayar (kadar 5%). Berapa kg padi yang wajib dijadikan zakat?',
    options: ['100 kg padi', '50 kg padi', '150 kg padi', '200 kg padi'],
    correctAnswerIndex: 0,
    explanation: 'Kadar zakat irigasi berbayar = 5%. Zakat = 5% × 2.000 kg = 100 kg padi.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'pertanian',
      defaultValues: { hasilPanenKg: 2000, kadarPercent: 5 },
      unitText: 'kg padi',
      targetFormulaExplanation: '5% × 2.000 kg = 100 kg padi'
    },
    hintUstadz: 'Irigasi berbayar = 5%. Maka 5% dari 2.000 kg adalah 100 kg.'
  },
  {
    id: 'q15_2',
    level: 15,
    prize: 250000000,
    prizeLabel: 'Rp 250.000.000 Poin (Aman 🛡️)',
    category: 'pertanian',
    questionText: 'Pak Karta memanen 1.000 kg padi dari sawah tadah hujan alami (kadar 10%). Berapa kg padi zakat yang harus diserahkan?',
    options: ['100 kg padi', '50 kg padi', '200 kg padi', '80 kg padi'],
    correctAnswerIndex: 0,
    explanation: '10% × 1.000 kg = 100 kg padi.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'pertanian',
      defaultValues: { hasilPanenKg: 1000, kadarPercent: 10 },
      unitText: 'kg padi',
      targetFormulaExplanation: '10% × 1.000 kg = 100 kg padi'
    },
    hintUstadz: 'Pengairan alami air hujan = 10%. Maka 10% dari 1.000 kg = 100 kg!'
  },
  {
    id: 'q15_3',
    level: 15,
    prize: 250000000,
    prizeLabel: 'Rp 250.000.000 Poin (Aman 🛡️)',
    category: 'pertanian',
    questionText: 'Pak Syukur memanen 3.000 kg gabah dengan irigasi berbiaya solar pompa (kadar 5%). Berapa kg zakat gabahnya?',
    options: ['150 kg gabah', '300 kg gabah', '100 kg gabah', '200 kg gabah'],
    correctAnswerIndex: 0,
    explanation: '5% × 3.000 kg = 150 kg gabah.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'pertanian',
      defaultValues: { hasilPanenKg: 3000, kadarPercent: 5 },
      unitText: 'kg gabah',
      targetFormulaExplanation: '5% × 3.000 kg = 150 kg gabah'
    },
    hintUstadz: '5% dikali 3.000 kg sama dengan 150 kg!'
  },

  // ================= LEVEL 16 =================
  {
    id: 'q16_1',
    level: 16,
    prize: 300000000,
    prizeLabel: 'Rp 300.000.000 Poin',
    category: 'peternakan',
    questionText: 'Berapakah nisab minimal kepemilikan kambing/domba agar pemiliknya wajib mengeluarkan zakat peternakan?',
    options: ['40 ekor kambing', '10 ekor kambing', '20 ekor kambing', '100 ekor kambing'],
    correctAnswerIndex: 0,
    explanation: 'Nisab kambing adalah 40 ekor. Jika peternak memiliki 40 - 120 ekor kambing selama 1 tahun, zakatnya adalah 1 ekor kambing betina.',
    hintUstadz: 'Nisab kambing dimulai dari 40 ekor kambing!'
  },
  {
    id: 'q16_2',
    level: 16,
    prize: 300000000,
    prizeLabel: 'Rp 300.000.000 Poin',
    category: 'peternakan',
    questionText: 'Jika seorang peternak memiliki 50 ekor kambing yang digembalakan alami selama 1 tahun, berapa ekor kambing zakatnya?',
    options: ['1 ekor kambing', '2 ekor kambing', '3 ekor kambing', '5 ekor kambing'],
    correctAnswerIndex: 0,
    explanation: 'Jumlah kambing 40 hingga 120 ekor zakatnya adalah 1 ekor kambing (umur minimal 1-2 tahun).',
    hintUstadz: 'Antara 40-120 ekor kambing zakatnya cukup 1 ekor kambing!'
  },
  {
    id: 'q16_3',
    level: 16,
    prize: 300000000,
    prizeLabel: 'Rp 300.000.000 Poin',
    category: 'peternakan',
    questionText: 'Syarat hewan ternak (kambing/sapi) wajib zakat adalah Sa\'imah. Apakah arti Sa\'imah?',
    options: ['Hewan ternak yang digembalakan di padang rumput bebas tanpa dibeli rumputnya', 'Hewan yang dikandangkan dan dibeli pakan komersial mahal', 'Hewan yang dipakai untuk membajak sawah tiap hari', 'Hewan yang sedang sakit'],
    correctAnswerIndex: 0,
    explanation: 'Sa\'imah berarti ternak tersebut digembalakan mencari makan sendiri di alam tanpa biaya pakan beli.',
    hintUstadz: 'Sa\'imah artinya digembalakan makan rumput bebas di padang terbuka!'
  },

  // ================= LEVEL 17 =================
  {
    id: 'q17_1',
    level: 17,
    prize: 350000000,
    prizeLabel: 'Rp 350.000.000 Poin',
    category: 'peternakan',
    questionText: 'Berapakah nisab minimal kepemilikan sapi atau kerbau yang diternak agar wajib dikeluarkan zakatnya?',
    options: ['30 ekor sapi', '5 ekor sapi', '10 ekor sapi', '50 ekor sapi'],
    correctAnswerIndex: 0,
    explanation: 'Nisab sapi/kerbau adalah 30 ekor. Jika memiliki 30 ekor sapi selama 1 tahun, wajib dikeluarkan zakat 1 ekor sapi berumur 1 tahun (Tabi\').',
    hintUstadz: 'Nisab sapi adalah 30 ekor!'
  },
  {
    id: 'q17_2',
    level: 17,
    prize: 350000000,
    prizeLabel: 'Rp 350.000.000 Poin',
    category: 'peternakan',
    questionText: 'Jika seseorang memiliki 30 ekor sapi ternak selama 1 tahun, jenis zakat hewan sapi apakah yang dikeluarkan?',
    options: ['1 ekor sapi jantan/betina umur 1 tahun (Tabi\')', '1 ekor unta betina', '10 ekor kambing', '5 ekor kerbau'],
    correctAnswerIndex: 0,
    explanation: 'Setiap 30 ekor sapi zakatnya adalah 1 ekor Tabi\' (sapi jantan/betina berumur 1 tahun).',
    hintUstadz: 'Zakat 30 ekor sapi adalah 1 ekor sapi Tabi\' (umur 1 tahun)!'
  },
  {
    id: 'q17_3',
    level: 17,
    prize: 350000000,
    prizeLabel: 'Rp 350.000.000 Poin',
    category: 'peternakan',
    questionText: 'Berapakah nisab unta bagi peternak di daerah gurun pasir agar mulai wajib zakat?',
    options: ['5 ekor unta', '1 ekor unta', '20 ekor unta', '50 ekor unta'],
    correctAnswerIndex: 0,
    explanation: 'Nisab unta adalah 5 ekor. Zakat untuk 5 ekor unta adalah 1 ekor kambing.',
    hintUstadz: 'Nisab unta dimulai dari 5 ekor unta!'
  },

  // ================= LEVEL 18 =================
  {
    id: 'q18_1',
    level: 18,
    prize: 400000000,
    prizeLabel: 'Rp 400.000.000 Poin',
    category: 'asnaf',
    questionText: 'Seseorang yang memiliki hutang untuk memenuhi kebutuhan pokok yang halal dan tidak sanggup melunasinya disebut golongan...',
    options: ['Gharim', 'Ibnu Sabil', 'Riqab', 'Muallaf'],
    correctAnswerIndex: 0,
    explanation: 'Gharim adalah orang yang memiliki hutang untuk kebaikan/kebutuhan pokok dan tidak mampu melunasinya.',
    hintUstadz: 'Gharim artinya orang yang terjerat hutang halal yang mendesak.'
  },
  {
    id: 'q18_2',
    level: 18,
    prize: 400000000,
    prizeLabel: 'Rp 400.000.000 Poin',
    category: 'asnaf',
    questionText: 'Hutang seperti apakah yang diperbolehkan dibantu pelunasannya dari dana zakat golongan Gharim?',
    options: ['Hutang untuk berobat/makan/kebutuhan hidup halal', 'Hutang akibat judi online', 'Hutang membeli mobil mewah foya-foya', 'Hutang taruhan olahraga'],
    correctAnswerIndex: 0,
    explanation: 'Gharim yang berhak menerima zakat hanya untuk hutang kebutuhan pokok yang halal, bukan untuk maksiat/foya-foya.',
    hintUstadz: 'Hutang yang dibantu haruslah untuk kebaikan dan kebutuhan halal!'
  },
  {
    id: 'q18_3',
    level: 18,
    prize: 400000000,
    prizeLabel: 'Rp 400.000.000 Poin',
    category: 'asnaf',
    questionText: 'Manakah di bawah ini contoh perbuatan yang TERMELALUIRAN bagi penerima zakat Gharim?',
    options: ['Pak Ahmad yang berhutang biaya operasi anaknya dan tidak bisa bayar', 'Seorang pemuda yang hutang beli gadget mahal demi gengsi', 'Pengusaha yang sengaja kabur dari hutang bank', 'Orang kaya yang pura-pura miskin'],
    correctAnswerIndex: 0,
    explanation: 'Pak Ahmad berhutang untuk biaya pengobatan anak (halal & mendesak) sehingga sangat berhak menerima zakat Gharim.',
    hintUstadz: 'Hutang pengobatan medis keluarga adalah contoh utama kriteria Gharim!'
  },

  // ================= LEVEL 19 =================
  {
    id: 'q19_1',
    level: 19,
    prize: 450000000,
    prizeLabel: 'Rp 450.000.000 Poin',
    category: 'asnaf',
    questionText: 'Orang yang baru masuk Islam dan imannya masih perlu dikuatkan serta dilembutkan hatinya disebut...',
    options: ['Muallaf', 'Fakir', 'Amil', 'Fisabilillah'],
    correctAnswerIndex: 0,
    explanation: 'Muallaf adalah orang yang baru memeluk agama Islam atau orang yang hatinya ditarik agar mantap beriman.',
    hintUstadz: 'Muallaf berhak menerima zakat untuk memantapkan keimanannya.'
  },
  {
    id: 'q19_2',
    level: 19,
    prize: 450000000,
    prizeLabel: 'Rp 450.000.000 Poin',
    category: 'asnaf',
    questionText: 'Tujuan utama pemberian zakat kepada golongan Muallaf adalah untuk...',
    options: ['Menguatkan keimanan dan membantu penyesuaian hidup dalam Islam', 'Membeli perhiasan mahal', 'Membiayai pesta pora', 'Membeli rumah di luar negeri'],
    correctAnswerIndex: 0,
    explanation: 'Bantuan zakat memberikan perlindungan ekonomi dan mental bagi muallaf yang mungkin diasingkan keluarganya.',
    hintUstadz: 'Zakat menguatkan iman saudara baru kita yang baru masuk Islam!'
  },
  {
    id: 'q19_3',
    level: 19,
    prize: 450000000,
    prizeLabel: 'Rp 450.000.000 Poin',
    category: 'asnaf',
    questionText: 'Apakah seorang Muallaf berhak menerima bantuan zakat meskipun ia tadinya orang yang berkecukupan?',
    options: ['Berhak, untuk melunakkan dan meneguhkan hatinya dalam keislaman', 'Sama sekali tidak berhak', 'Harus bayar denda', 'Hanya boleh dapat makanan sisa'],
    correctAnswerIndex: 0,
    explanation: 'Muallaf memiliki bagian khusus dalam Asnaf delapan untuk kebaikan pembinaan syiar Islam.',
    hintUstadz: 'Muallaf termasuk salah satu dari 8 Asnaf yang disebutkan langsung di At-Taubah 60!'
  },

  // ================= LEVEL 20 - Safe Checkpoint 4 =================
  {
    id: 'q20_1',
    level: 20,
    prize: 500000000,
    prizeLabel: 'Rp 500.000.000 Poin (Aman 🛡️)',
    category: 'emas_perak',
    questionText: 'Berapakah nisab minimal untuk perak murni yang wajib dizakati setelah tersimpan selama 1 tahun (haul)?',
    options: ['595 gram perak', '85 gram perak', '200 gram perak', '1.000 gram perak'],
    correctAnswerIndex: 0,
    explanation: 'Nisab perak adalah 200 dirham atau setara dengan 595 gram perak murni, dengan kadar zakat 2,5%.',
    hintUstadz: 'Ingat! Nisab emas = 85 gram, sedangkan nisab perak = 595 gram!'
  },
  {
    id: 'q20_2',
    level: 20,
    prize: 500000000,
    prizeLabel: 'Rp 500.000.000 Poin (Aman 🛡️)',
    category: 'emas_perak',
    questionText: 'Ibu Maya menyimpan perak murni seberat 600 gram selama 1 tahun (melebihi nisab 595gr). Berapa zakat perak yang dikeluarkan?',
    options: ['15 gram perak', '10 gram perak', '25 gram perak', '30 gram perak'],
    correctAnswerIndex: 0,
    explanation: '2,5% × 600 gram = 15 gram perak murni.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'emas',
      defaultValues: { gramEmas: 600, kadarPercent: 2.5 },
      unitText: 'gram perak',
      targetFormulaExplanation: '2,5% × 600 gram = 15 gram perak'
    },
    hintUstadz: '2,5% dikali 600 gram hasilnya 15 gram perak!'
  },
  {
    id: 'q20_3',
    level: 20,
    prize: 500000000,
    prizeLabel: 'Rp 500.000.000 Poin (Aman 🛡️)',
    category: 'emas_perak',
    questionText: 'Pak Farhan memiliki tabungan uang tunai senilai Rp 100 Juta selama 1 tahun (melebihi nisab emas 85gr). Berapa zakat uangnya?',
    options: ['Rp 2.500.000', 'Rp 1.000.000', 'Rp 5.000.000', 'Rp 10.000.000'],
    correctAnswerIndex: 0,
    explanation: '2,5% × Rp 100.000.000 = Rp 2.500.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'profesi',
      defaultValues: { penghasilan: 100000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 100.000.000 = Rp 2.500.000'
    },
    hintUstadz: 'Tabungan tunai disamakan dengan zakat emas yaitu 2,5%!'
  },

  // ================= LEVEL 21 =================
  {
    id: 'q21_1',
    level: 21,
    prize: 600000000,
    prizeLabel: 'Rp 600.000.000 Poin',
    category: 'perdagangan',
    questionText: 'Pemilik toko kelontong memiliki modal dagang + keuntungan bersih senilai Rp 100.000.000 dalam 1 tahun. Berapa zakat perusahaannya?',
    options: ['Rp 2.500.000', 'Rp 1.000.000', 'Rp 2.000.000', 'Rp 5.000.000'],
    correctAnswerIndex: 0,
    explanation: 'Zakat Perdagangan disamakan dengan zakat emas (kadar 2,5%). Maka: 2,5% × Rp 100.000.000 = Rp 2.500.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'emas',
      defaultValues: { gramEmas: 100000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 100.000.000 = Rp 2.500.000'
    },
    hintUstadz: 'Hitung 2,5% dari total nilai aset dagang Rp 100.000.000.'
  },
  {
    id: 'q21_2',
    level: 21,
    prize: 600000000,
    prizeLabel: 'Rp 600.000.000 Poin',
    category: 'perdagangan',
    questionText: 'Bagaimanakah cara menghitung total Aset Zakat Perdagangan pada akhir tahun (haul)?',
    options: ['(Modal Berputar + Keuntungan + Piutang Lancar) dikurangi Hutang Jatuh Tempo', 'Hanya menghitung barang yang tidak laku', 'Menghitung nilai bangunan toko', 'Menghitung gaji seluruh pegawai'],
    correctAnswerIndex: 0,
    explanation: 'Rumus Zakat Dagang: (Modal barang + Uang kas + Piutang) - Hutang jangka pendek = Aset Bersih × 2,5%.',
    hintUstadz: 'Modal lancar + Untung + Piutang minus hutang jatuh tempo!'
  },
  {
    id: 'q21_3',
    level: 21,
    prize: 600000000,
    prizeLabel: 'Rp 600.000.000 Poin',
    category: 'perdagangan',
    questionText: 'Minimarket Pak Hadi memiliki aset dagang bersih Rp 200 Juta dalam 1 tahun. Berapa rupiah zakat perusahaannya?',
    options: ['Rp 5.000.000', 'Rp 2.500.000', 'Rp 10.000.000', 'Rp 15.000.000'],
    correctAnswerIndex: 0,
    explanation: '2,5% × Rp 200.000.000 = Rp 5.000.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'emas',
      defaultValues: { gramEmas: 200000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 200.000.000 = Rp 5.000.000'
    },
    hintUstadz: '2,5% dikali Rp 200 Juta sama dengan Rp 5 Juta!'
  },

  // ================= LEVEL 22 =================
  {
    id: 'q22_1',
    level: 22,
    prize: 700000000,
    prizeLabel: 'Rp 700.000.000 Poin',
    category: 'asnaf',
    questionText: 'Musafir (orang yang dalam perjalanan jauh yang halal) lalu kehabisan bekal dan ongkos pulang disebut...',
    options: ['Ibnu Sabil', 'Riqab', 'Gharim', 'Fakir'],
    correctAnswerIndex: 0,
    explanation: 'Ibnu Sabil adalah musafir yang kehabisan biaya perjalanan halal sehingga berhak mendapat zakat agar bisa melanjutkan perjalanan atau pulang.',
    hintUstadz: 'Ibnu Sabil berarti musafir kehabisan bekal perjalanan halal.'
  },
  {
    id: 'q22_2',
    level: 22,
    prize: 700000000,
    prizeLabel: 'Rp 700.000.000 Poin',
    category: 'asnaf',
    questionText: 'Apakah syarat utama agar seorang musafir berhak dibantu dari dana zakat golongan Ibnu Sabil?',
    options: ['Perjalanan yang dilakukan bukan untuk tujuan maksiat/kejahatan', 'Perjalanan untuk liburan foya-foya', 'Musafir yang kabur dari buronan polisi', 'Orang yang sengaja buang uang'],
    correctAnswerIndex: 0,
    explanation: 'Syarat Ibnu Sabil adalah perjalanannya dalam ketaatan/kebaikan yang mubah, bukan perjalanan maksiat.',
    hintUstadz: 'Perjalanannya harus halal dan dalam kebaikan!'
  },
  {
    id: 'q22_3',
    level: 22,
    prize: 700000000,
    prizeLabel: 'Rp 700.000.000 Poin',
    category: 'asnaf',
    questionText: 'Manakah contoh kejadian Ibnu Sabil di zaman modern sekarang ini?',
    options: ['Mahasiswa menuntut ilmu di luar negeri yang terhenti beasiswanya & dompetnya hilang', 'Wisatawan judi yang kehabisan uang di casino', 'Pengendara yang sengaja tidak mau isi bensin', 'Turis kaya yang lupa bawa kartu kredit'],
    correctAnswerIndex: 0,
    explanation: 'Mahasiswa perantau menuntut ilmu kehabisan bekal adalah contoh nyata Ibnu Sabil modern.',
    hintUstadz: 'Pelajar perantau yang kehabisan bekal adalah contoh Ibnu Sabil!'
  },

  // ================= LEVEL 23 =================
  {
    id: 'q23_1',
    level: 23,
    prize: 800000000,
    prizeLabel: 'Rp 800.000.000 Poin',
    category: 'asnaf',
    questionText: 'Golongan "Riqab" dalam surah At-Taubah ayat 60 merujuk pada...',
    options: ['Hamba sahaya / budak yang ingin memerdekakan diri', 'Orang gila di jalanan', 'Anak yatim piatu', 'Para ulama dan pendakwah'],
    correctAnswerIndex: 0,
    explanation: 'Riqab adalah hamba sahaya / budak yang dibantu dari dana zakat agar bisa memerdekakan dirinya.',
    hintUstadz: 'Riqab = Pembebasan budak atau hamba sahaya.'
  },
  {
    id: 'q23_2',
    level: 23,
    prize: 800000000,
    prizeLabel: 'Rp 800.000.000 Poin',
    category: 'asnaf',
    questionText: 'Dalam konteks kontemporer modern, sebagian ulama memasukkan pencegahan Human Trafficking (perdagangan manusia) ke dalam makna...',
    options: ['Riqab (Pembebasan dari perbudakan modern)', 'Gharim', 'Amil', 'Ibnu Sabil'],
    correctAnswerIndex: 0,
    explanation: 'Melindungi dan membebaskan korban perbudakan/trafficking modern sejalan dengan spirit Riqab.',
    hintUstadz: 'Spirit Riqab adalah membebaskan manusia dari cengkeraman perbudakan!'
  },
  {
    id: 'q23_3',
    level: 23,
    prize: 800000000,
    prizeLabel: 'Rp 800.000.000 Poin',
    category: 'asnaf',
    questionText: 'Hikmah terbesar disyariatkannya asnaf Riqab dalam Islam adalah...',
    options: ['Mewujudkan kemerdekaan dan mengangkat harkat martabat manusia', 'Menjadikan manusia semakin tertindas', 'Menumpuk kekayaan penguasa', 'Membuat perbudakan makin merajalela'],
    correctAnswerIndex: 0,
    explanation: 'Islam secara bertahap menghapus perbudakan dan menjunjung tinggi kemerdekaan hak asasi manusia.',
    hintUstadz: 'Islam sangat menjunjung tinggi kemerdekaan setiap manusia!'
  },

  // ================= LEVEL 24 =================
  {
    id: 'q24_1',
    level: 24,
    prize: 850000000,
    prizeLabel: 'Rp 850.000.000 Poin',
    category: 'konsep',
    questionText: 'Zakat atas barang temuan harta karun (Rikaz) wajib dikeluarkan zakatnya sebesar berapa persen tanpa mensyaratkan haul?',
    options: ['20% (Seperlima / Khumus)', '2,5%', '5%', '10%'],
    correctAnswerIndex: 0,
    explanation: 'Harta karun (Rikaz) yang ditemukan wajib dikeluarkan zakatnya langsung sebesar 20% (1/5 atau Khumus) tanpa perlu menunggu 1 tahun (haul).',
    hintUstadz: 'Harta karun temuan (Rikaz) zakatnya adalah 20% (khumus) saat ditemukan!'
  },
  {
    id: 'q24_2',
    level: 24,
    prize: 850000000,
    prizeLabel: 'Rp 850.000.000 Poin',
    category: 'konsep',
    questionText: 'Apakah perbedaan Zakat Rikaz (harta karun) dibanding zakat-zakat simpanan lainnya?',
    options: ['Wajib dikeluarkan seketika saat ditemukan tanpa menunggu 1 tahun (haul)', 'Wajib ditunggu 10 tahun', 'Harus dibakar di lapangan', 'Hanya berlaku untuk emas palsu'],
    correctAnswerIndex: 0,
    explanation: 'Zakat Rikaz tidak ada syarat haul. Begitu harta karun terpendam ditemukan, langsung dikeluarkan 20%.',
    hintUstadz: 'Begitu menemukan harta karun, zakat 20% langsung dibayar saat itu juga!'
  },
  {
    id: 'q24_3',
    level: 24,
    prize: 850000000,
    prizeLabel: 'Rp 850.000.000 Poin',
    category: 'konsep',
    questionText: 'Pak Tejo tidak sengaja menemukan peti harta karun kuno senilai Rp 500.000.000 di pekarangannya. Berapa rupiah Zakat Rikaz yang wajib dikeluarkan?',
    options: ['Rp 100.000.000', 'Rp 12.500.000', 'Rp 25.000.000', 'Rp 50.000.000'],
    correctAnswerIndex: 0,
    explanation: '20% × Rp 500.000.000 = Rp 100.000.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'pertanian',
      defaultValues: { hasilPanenKg: 500000000, kadarPercent: 20 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '20% × Rp 500.000.000 = Rp 100.000.000'
    },
    hintUstadz: '20% (seperlima) dari Rp 500 Juta adalah Rp 100 Juta!'
  },

  // ================= LEVEL 25 - Safe Checkpoint 5 =================
  {
    id: 'q25_1',
    level: 25,
    prize: 900000000,
    prizeLabel: 'Rp 900.000.000 Poin (Aman 🛡️)',
    category: 'konsep',
    questionText: 'Orang yang berkewajiban membayar zakat dinamakan ..., sedangkan orang yang berhak menerima zakat dinamakan ...',
    options: ['Muzakki ; Mustahik', 'Mustahik ; Muzakki', 'Amil ; Gharim', 'Munfiq ; Mukhlis'],
    correctAnswerIndex: 0,
    explanation: 'Muzakki = Orang yang mengeluarkan/membayar zakat. Mustahik = Orang yang berhak menerima zakat.',
    hintUstadz: 'Ingat kuncinya: Muzakki (Pembayar) dan Mustahik (Penerima).'
  },
  {
    id: 'q25_2',
    level: 25,
    prize: 900000000,
    prizeLabel: 'Rp 900.000.000 Poin (Aman 🛡️)',
    category: 'konsep',
    questionText: 'Berikut adalah daftar orang yang TIDAK BOLEH (Haram) menerima zakat dari seorang Muzakki, KECUALI...',
    options: ['Orang Fakir dan Miskin', 'Orang tua kandung / Anak kandung sang Muzakki', 'Orang non-muslim yang memusuhi Islam', 'Orang kaya raya yang mampu'],
    correctAnswerIndex: 0,
    explanation: 'Zakat haram diberikan kepada keluarga kandung jalur atas/bawah (orang tua/anak) dan orang kaya. Fakir miskin justru penerima utama.',
    hintUstadz: 'Fakir dan miskin adalah golongan utama penerima zakat!'
  },
  {
    id: 'q25_3',
    level: 25,
    prize: 900000000,
    prizeLabel: 'Rp 900.000.000 Poin (Aman 🛡️)',
    category: 'konsep',
    questionText: 'Mengapa seorang anak TIDAK BOLEH memberikan zakat harta maal kepada orang tua kandungnya sendiri?',
    options: ['Karena menafkahi orang tua kandung adalah kewajiban nafkah rutin anak, bukan dari zakat', 'Karena orang tua tidak suka uang', 'Karena zakat hanya untuk anak bayi', 'Karena zakat harus dibuang ke laut'],
    correctAnswerIndex: 0,
    explanation: 'Nafkah kepada orang tua adalah kewajiban anak (Nafaqah). Zakat adalah untuk pihak luar di luar tanggungan nafkah wajib.',
    hintUstadz: 'Nafkah orang tua adalah kewajiban anak dari harta biasa, bukan diambilkan dari zakat!'
  },

  // ================= LEVEL 26 =================
  {
    id: 'q26_1',
    level: 26,
    prize: 925000000,
    prizeLabel: 'Rp 925.000.000 Poin',
    category: 'konsep',
    questionText: 'Di bawah ini manakah yang BUKAN merupakan syarat wajib seseorang mengeluarkan Zakat Maal?',
    options: ['Sudah Pernah Pergi Haji', 'Beragama Islam', 'Mencapai Nisab & Haul', 'Milik Sempurna (Al-Milkus Tamm)'],
    correctAnswerIndex: 0,
    explanation: 'Syarat wajib zakat maal adalah Islam, merdeka, milik sempurna, mencapai nisab, dan genap haul 1 tahun. Pergi haji bukanlah syarat zakat.',
    hintUstadz: 'Pergi haji adalah rukun Islam ke-5 dan bukan syarat wajib mengeluarkan zakat.'
  },
  {
    id: 'q26_2',
    level: 26,
    prize: 925000000,
    prizeLabel: 'Rp 925.000.000 Poin',
    category: 'konsep',
    questionText: 'Apakah perbedan Zakat Maal dan Zakat Fitrah yang paling mencolok?',
    options: ['Zakat Maal membersihkan Harta Simpanan, sedangkan Zakat Fitrah menyucikan Jiwa di Ramadhan', 'Zakat Maal hanya untuk bayi, Zakat Fitrah untuk tentara', 'Zakat Fitrah harus bernilai Rp 1 Miliar', 'Zakat Maal hukumnya haram'],
    correctAnswerIndex: 0,
    explanation: 'Zakat Maal berkaitan dengan kepemilikan harta (property/wealth), sedangkan Zakat Fitrah berkaitan dengan pembersihan jiwa manusia di Ramadhan.',
    hintUstadz: 'Zakat Maal = Zakat Harta. Zakat Fitrah = Zakat Jiwa!'
  },
  {
    id: 'q26_3',
    level: 26,
    prize: 925000000,
    prizeLabel: 'Rp 925.000.000 Poin',
    category: 'konsep',
    questionText: 'Apabila seseorang meninggal dunia dan meninggalkan hutang zakat maal yang belum dibayar semasa hidupnya, maka...',
    options: ['Wajib dilunasi dari harta warisannya sebelum dibagikan kepada ahli waris', 'Zakatnya otomatis gugur', 'Keluarganya dipenjara', 'Harta warisan harus dibakar'],
    correctAnswerIndex: 0,
    explanation: 'Hutang zakat adalah hak Allah dan sesama yang wajib dilunasi terlebih dahulu dari harta peninggalan jenazah.',
    hintUstadz: 'Hutang zakat harus dilunasi dari warisan sebelum dibagikan!'
  },

  // ================= LEVEL 27 =================
  {
    id: 'q27_1',
    level: 27,
    prize: 950000000,
    prizeLabel: 'Rp 950.000.000 Poin',
    category: 'konsep',
    questionText: 'Apakah perbedaan mendasar antara Zakat dan Sedekah Sunnah?',
    options: [
      'Zakat hukumnya Wajib & ada aturan nisab/kadarnya, sedangkan Sedekah hukumnya Sunnah & bebas nominalnya',
      'Zakat hanya boleh memakai uang, sedangkan sedekah wajib memakai emas',
      'Sedekah hukumnya wajib, sedangkan zakat hukumnya makruh',
      'Zakat tidak perlu ikhlas, sedangkan sedekah wajib ikhlas'
    ],
    correctAnswerIndex: 0,
    explanation: 'Zakat adalah ibadah wajib dengan takaran nisab dan kadar yang ditentukan syariat, sedangkan sedekah adalah pemberian sukarela kapan saja.',
    hintUstadz: 'Zakat = Wajib terikat nisab. Sedekah = Sukarela sunnah kapanpun.'
  },
  {
    id: 'q27_2',
    level: 27,
    prize: 950000000,
    prizeLabel: 'Rp 950.000.000 Poin',
    category: 'konsep',
    questionText: 'Istilah "Infaq" dalam ajaran Islam mencakup pengeluaran harta untuk kebaikan yang sifatnya...',
    options: ['Wajib (seperti zakat) maupun Sunnah (seperti donasi kebaikan)', 'Hanya untuk membeli baju baru', 'Hanya untuk membakar sampah', 'Hanya untuk denda kejahatan'],
    correctAnswerIndex: 0,
    explanation: 'Infaq secara umum berarti membelanjakan harta di jalan Allah, baik infaq wajib (zakat) maupun infaq sunnah.',
    hintUstadz: 'Infaq adalah mengeluarkan harta untuk kebaikan jalan Allah!'
  },
  {
    id: 'q27_3',
    level: 27,
    prize: 950000000,
    prizeLabel: 'Rp 950.000.000 Poin',
    category: 'konsep',
    questionText: 'Sebutkan salah satu keutamaan tersirat orang yang gemar bersedekah dan menunaikan zakat!',
    options: ['Menolak bala, memperluas rezeki, dan menghapus dosa', 'Menjadi orang paling sombong', 'Menjadikan badan cepat lelah', 'Membuat harta langsung musnah'],
    correctAnswerIndex: 0,
    explanation: 'Rasulullah SAW bersabda: "Sedekah itu dapat memadamkan dosa sebagaimana air memadamkan api."',
    hintUstadz: 'Sedekah dan zakat melapangkan rezeki dan pemadam dosa!'
  },

  // ================= LEVEL 28 =================
  {
    id: 'q28_1',
    level: 28,
    prize: 975000000,
    prizeLabel: 'Rp 975.000.000 Poin',
    category: 'profesi',
    questionText: 'Pak Rudi memiliki deposito bank senilai Rp 200.000.000 yang mengendap selama 1 tahun (Nisab Rp 85.000.000). Berapa zakat uang tabungan Pak Rudi?',
    options: ['Rp 5.000.000', 'Rp 2.000.000', 'Rp 10.000.000', 'Rp 20.000.000'],
    correctAnswerIndex: 0,
    explanation: 'Zakat tabungan/uang disamakan dengan kadar zakat emas yaitu 2,5%. Maka: 2,5% × Rp 200.000.000 = Rp 5.000.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'profesi',
      defaultValues: { penghasilan: 200000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 200.000.000 = Rp 5.000.000'
    },
    hintUstadz: 'Kalikan total tabungan Rp 200 Juta dengan 2,5%!'
  },
  {
    id: 'q28_2',
    level: 28,
    prize: 975000000,
    prizeLabel: 'Rp 975.000.000 Poin',
    category: 'profesi',
    questionText: 'Ibu Linda mempunyai reksadana/saham senilai Rp 400.000.000 selama 1 tahun. Berapa zakat investasi saham Ibu Linda?',
    options: ['Rp 10.000.000', 'Rp 5.000.000', 'Rp 15.000.000', 'Rp 20.000.000'],
    correctAnswerIndex: 0,
    explanation: '2,5% × Rp 400.000.000 = Rp 10.000.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'profesi',
      defaultValues: { penghasilan: 400000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 400.000.000 = Rp 10.000.000'
    },
    hintUstadz: '2,5% dari Rp 400 Juta adalah Rp 10 Juta!'
  },
  {
    id: 'q28_3',
    level: 28,
    prize: 975000000,
    prizeLabel: 'Rp 975.000.000 Poin',
    category: 'profesi',
    questionText: 'Pak Jaya memiliki tabungan giro di bank senilai Rp 300.000.000 selama 1 tahun. Berapa zakat uang gironya?',
    options: ['Rp 7.500.000', 'Rp 3.000.000', 'Rp 5.000.000', 'Rp 15.000.000'],
    correctAnswerIndex: 0,
    explanation: '2,5% × Rp 300.000.000 = Rp 7.500.000.',
    hasCalculator: true,
    calculatorPreset: {
      type: 'profesi',
      defaultValues: { penghasilan: 300000000, kadarPercent: 2.5 },
      unitText: 'Rupiah',
      targetFormulaExplanation: '2,5% × Rp 300.000.000 = Rp 7.500.000'
    },
    hintUstadz: '2,5% dikali Rp 300 Juta = Rp 7,5 Juta!'
  },

  // ================= LEVEL 29 =================
  {
    id: 'q29_1',
    level: 29,
    prize: 990000000,
    prizeLabel: 'Rp 990.000.000 Poin',
    category: 'asnaf',
    questionText: 'Orang yang berjuang dan berdakwah di jalan Allah SWT untuk menegakkan agama Islam dinamakan golongan...',
    options: ['Fisabilillah', 'Amil', 'Ibnu Sabil', 'Gharim'],
    correctAnswerIndex: 0,
    explanation: 'Fisabilillah adalah orang atau lembaga yang berjuang di jalan Allah untuk kemaslahatan dakwah Islam dan pendidikan ummat.',
    hintUstadz: 'Fi Sabilillah bermakna "di jalan Allah SWT".'
  },
  {
    id: 'q29_2',
    level: 29,
    prize: 990000000,
    prizeLabel: 'Rp 990.000.000 Poin',
    category: 'asnaf',
    questionText: 'Manakah contoh peruntukan dana zakat untuk golongan Fisabilillah di era modern sekarang?',
    options: ['Pembangunan pondok pesantren, sekolah Islam gratis, dan sarana dakwah', 'Membeli tiket konser hiburan', 'Membangun klub malam', 'Membuat arena balap liar'],
    correctAnswerIndex: 0,
    explanation: 'Pendanaan dakwah, pendidikan Islam gratis, dan penyebaran Al-Qur\'an merupakan bagian dari kebaikan Fisabilillah.',
    hintUstadz: 'Pendidikan Islam gratis dan syiar dakwah termasuk Fisabilillah!'
  },
  {
    id: 'q29_3',
    level: 29,
    prize: 990000000,
    prizeLabel: 'Rp 990.000.000 Poin',
    category: 'asnaf',
    questionText: 'Apakah para ustadz/guru ngaji di pelosok desa yang berdakwah tanpa gaji berhak menerima bagian zakat Fisabilillah?',
    options: ['Sangat berhak untuk menunjang perjuangan dakwah mereka', 'Sama sekali tidak berhak', 'Hanya boleh dapat batu', 'Harus membayar pajak'],
    correctAnswerIndex: 0,
    explanation: 'Guru ngaji dan dai di daerah terpencil tergolong pejuang Fi Sabilillah yang sangat patut didukung.',
    hintUstadz: 'Guru ngaji & dai pelosok sangat berhak didukung dana zakat Fisabilillah!'
  },

  // ================= LEVEL 30 - GRAND JACKPOT LEVEL 30 👑 =================
  {
    id: 'q30_1',
    level: 30,
    prize: 1000000000,
    prizeLabel: 'Rp 1 MILIAR POIN PAHLAWAN ZAKAT 👑',
    category: 'konsep',
    questionText: 'Pak Usman seorang dermawan memiliki: 1) Emas 100 gram (zakat 2,5 gr), 2) Tabungan Rp 200 Juta (zakat Rp 5 Juta), dan 3) Zakat Fitrah 4 jiwa @ 2,5 kg (10 kg). Manakah pernyataan Zakat Pak Usman yang PALING TEPAT?',
    options: [
      'Pak Usman wajib bayar Zakat Emas 2,5gr + Zakat Tabungan Rp 5 Juta + Zakat Fitrah 10 kg beras',
      'Pak Usman hanya wajib bayar zakat fitrah saja',
      'Pak Usman bebas zakat karena sudah dermawan',
      'Zakat Emas dan Tabungan Pak Usman tidak perlu dibayar jika belum 10 tahun'
    ],
    correctAnswerIndex: 0,
    explanation: 'Selamat! Pak Usman wajib mengeluarkan Zakat Maal (Emas 2,5gr + Tabungan Rp 5 Juta) serta Zakat Fitrah (10 kg beras) untuk keluarganya. Selamat Anda berhasil menaklukkan 30 Level Kuis Zakat dan menjadi PAHLAWAN ZAKAT NUSANTARA!',
    hasCalculator: true,
    calculatorPreset: {
      type: 'fitrah',
      defaultValues: { jumlahOrang: 4, berasPerOrang: 2.5 },
      unitText: 'Lengkap',
      targetFormulaExplanation: 'Emas: 100gr × 2,5% = 2,5gr | Tabungan: 200Juta × 2,5% = 5Juta | Fitrah: 4 × 2,5kg = 10kg'
    },
    hintUstadz: 'Gabungkan pemahamanmu: Zakat Maal (Emas + Tabungan) dan Zakat Fitrah keluarga wajib dikeluarkan semua!'
  },
  {
    id: 'q30_2',
    level: 30,
    prize: 1000000000,
    prizeLabel: 'Rp 1 MILIAR POIN PAHLAWAN ZAKAT 👑',
    category: 'konsep',
    questionText: 'Manakah dari hikmah berikut yang MERANGKUM secara utuh nilai ibadah Zakat bagi individu, sesama manusia, dan agama Islam?',
    options: [
      'Menyucikan harta & jiwa individu, mengentaskan kemiskinan sesama, serta memperkuat syiar keislaman',
      'Membuat orang miskin makin malas bekerja',
      'Membuat harta orang kaya menjadi habis tanpa bekas',
      'Hanya sekadar formalitas tahunan tanpa dampak'
    ],
    correctAnswerIndex: 0,
    explanation: 'Maha Suci Allah! Zakat memiliki dimensi keimanan spiritual, keadilan sosial ekonomi, serta keberkahan keumatan yang luar biasa. Selamat Anda menjadi PAHLAWAN ZAKAT NUSANTARA!',
    hintUstadz: 'Zakat mencakup pembersihan jiwa pribadi, kepedulian sosial, dan kekuatan ummat Islam!'
  },
  {
    id: 'q30_3',
    level: 30,
    prize: 1000000000,
    prizeLabel: 'Rp 1 MILIAR POIN PAHLAWAN ZAKAT 👑',
    category: 'konsep',
    questionText: 'Seorang pengusaha sukses memiliki penghasilan tahunan Rp 1 Miliar dan tabungan emas 500 gram. Tindakan terbaiknya dalam menunaikan zakat sesuai syariat adalah...',
    options: [
      'Menghitung dan menyerahkan Zakat Profesi & Zakat Emas melalui lembaga amil zakat resmi BAZNAS',
      'Menyimpan uang di bank tanpa membayar zakat',
      'Membagikan zakat berupa permen secara sembarangan di jalanan',
      'Menunda pembayaran zakat sampai 20 tahun kemudian'
    ],
    correctAnswerIndex: 0,
    explanation: 'Luar biasa! Menghitung zakat secara akurat dan menyalurkannya lewat lembaga resmi Amil Zakat (seperti BAZNAS) menjamin zakat tepat sasaran kepada 8 Asnaf. Selamat Anda berhasil menjadi PAHLAWAN ZAKAT NUSANTARA!',
    hintUstadz: 'Salurkan zakat melalui lembaga resmi agar tepat sasaran kepada 8 Asnaf!'
  }
];

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getQuestionsForGameSession(): Question[] {
  // Select one randomized question per level (1 to 30)
  const selected: Question[] = [];
  
  for (let lvl = 1; lvl <= 30; lvl++) {
    const candidates = ZAKAT_QUESTIONS_BANK.filter(q => q.level === lvl);
    if (candidates.length > 0) {
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      
      // Deep clone question & shuffle options so the position of correct answer changes randomly!
      const correctAnswerText = chosen.options[chosen.correctAnswerIndex];
      const shuffledOptions = shuffleArray(chosen.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
      
      selected.push({
        ...chosen,
        options: [shuffledOptions[0], shuffledOptions[1], shuffledOptions[2], shuffledOptions[3]],
        correctAnswerIndex: newCorrectIndex
      });
    }
  }
  
  return selected;
}
