export interface KamusItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  nisabFormula: string;
  kadar: string;
  details: string[];
  example: string;
}

export const KAMUS_ZAKAT_LIST: KamusItem[] = [
  {
    id: 'fitrah',
    title: 'Zakat Fitrah',
    category: 'Jiwa / Bahan Pokok',
    icon: '🌾',
    summary: 'Zakat wajib bagi setiap jiwa muslim pada bulan Ramadhan hingga menjelang Shalat Idul Fitri.',
    nisabFormula: 'Setiap jiwa muslim (Bayi hingga Lansia)',
    kadar: '2,5 kg / 3,5 Liter beras per orang',
    details: [
      'Wajib ditunaikan sejak awal Ramadhan hingga sebelum Khutbah Idul Fitri.',
      'Bisa diganti dalam bentuk uang tunai seharga beras 2,5 kg / 3,5 liter.',
      'Bertujuan mensucikan jiwa dan membahagiakan kaum fakir miskin saat hari raya.'
    ],
    example: 'Keluarga dengan 4 anggota = 4 × 2,5 kg = 10 kg beras (atau 4 × Rp 35.000 = Rp 140.000).'
  },
  {
    id: 'emas',
    title: 'Zakat Emas & Perak',
    category: 'Zakat Maal (Harta)',
    icon: '🪙',
    summary: 'Zakat atas tabungan emas atau perak murni yang disimpan selama 1 tahun (haul).',
    nisabFormula: 'Nisab Emas = 85 gram | Nisab Perak = 595 gram',
    kadar: '2,5% dari total gram / nilai simpanan',
    details: [
      'Hanya berlaku untuk emas/perak simpanan atau investasi (bukan perhiasan yang dipakai sehari-hari secara wajar).',
      'Syarat kepemilikan genap 1 tahun Hijriah (Haul).'
    ],
    example: 'Punya 100 gram emas murni simpanan > 1 tahun. Zakat = 2,5% × 100 gram = 2,5 gram emas.'
  },
  {
    id: 'profesi',
    title: 'Zakat Profesi & Penghasilan',
    category: 'Zakat Maal (Hasil Kerja)',
    icon: '💼',
    summary: 'Zakat yang dikeluarkan dari pendapatan rutin (gaji, honorium, dokter, guru, arsitek, dll).',
    nisabFormula: 'Setara 85 gram emas per tahun (atau ~Rp 7-8 juta per bulan)',
    kadar: '2,5% dari pendapatan bersih per bulan',
    details: [
      'Dapat dibayarkan setiap bulan saat menerima gaji atau diakumulasi 1 tahun.',
      'Membantu meratakan kesejahteraan dari mereka yang berpenghasilan cukup.'
    ],
    example: 'Gaji bersih Rp 10.000.000 per bulan. Zakat = 2,5% × Rp 10.000.000 = Rp 250.000 / bulan.'
  },
  {
    id: 'pertanian',
    title: 'Zakat Pertanian & Hasil Panen',
    category: 'Zakat Maal (Tanaman)',
    icon: '🌱',
    summary: 'Zakat dari hasil panen makanan pokok seperti padi, gandum, jagung saat masa panen.',
    nisabFormula: '5 Wasaq (Setara 653 kg gabah atau 520 kg beras)',
    kadar: '10% (Air hujan/Alami) ATAU 5% (Irigasi berbayar/mesin)',
    details: [
      'Dibayarkan setiap kali panen (tidak menunggu 1 tahun).',
      'Jika diairi secara alami (air hujan/sungai): 10%.',
      'Jika diairi dengan biaya irigasi/pompa: 5%.'
    ],
    example: 'Panen 1.000 kg padi pakai irigasi pompa (5%). Zakat = 5% × 1.000 kg = 50 kg padi.'
  },
  {
    id: 'peternakan',
    title: 'Zakat Peternakan',
    category: 'Zakat Maal (Hewan)',
    icon: '🐑',
    summary: 'Zakat atas hewan ternak yang digembalakan di padang rumput bebas selama 1 tahun.',
    nisabFormula: 'Kambing: 40 ekor | Sapi/Kerbau: 30 ekor',
    kadar: 'Kambing 40-120 ekor = 1 ekor kambing | Sapi 30-39 ekor = 1 ekor sapi 1 thn',
    details: [
      'Hewan ternak digembalakan bebas (bukan diberi makan ternak berbayar khusus).',
      'Sudah dipelihara selama 1 tahun penuh.'
    ],
    example: 'Peternak memiliki 50 ekor kambing. Zakatnya = 1 ekor kambing betina.'
  },
  {
    id: 'asnaf',
    title: '8 Asnaf (Golongan Penerima Zakat)',
    category: 'Penerima Zakat (Mustahik)',
    icon: '🤝',
    summary: 'Berdasarkan Quran Surah At-Taubah ayat 60, ada 8 golongan yang berhak menerima zakat.',
    nisabFormula: 'Mustahik Zakat',
    kadar: 'Penerima Berhak',
    details: [
      '1. Fakir: Hampir tidak punya apa-apa untuk bertahan hidup.',
      '2. Miskin: Memiliki penghasilan tapi tidak cukup untuk kebutuhan pokok.',
      '3. Amil: Pengurus/panitia pengelola dana zakat resmi.',
      '4. Muallaf: Orang yang baru masuk Islam untuk menguatkan iman.',
      '5. Riqab: Hamba sahaya / memerdekakan budak.',
      '6. Gharim: Orang yang terjerat hutang untuk kebutuhan hidup halal.',
      '7. Fisabilillah: Orang yang berjuang di jalan Allah (pendidikan, dakwah).',
      '8. Ibnu Sabil: Musafir yang kehabisan bekal dalam perjalanan kebaikan.'
    ],
    example: 'Menyalurkan zakat fitrah kepada keluarga miskin di sekitar rumah atau melalui lembaga amil zakat.'
  }
];
