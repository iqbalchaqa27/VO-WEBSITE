export type Post = {
  slug: string
  title: string
  date: string
  author: string
  image: string
  content: string
}

export const posts: Post[] = [
  {
    slug: "bakti-sosial-ramadhan-2025",
    title: "Bakti Sosial Ramadhan 2025",
    date: "2025-03-12",
    author: "Admin IKAQ",
    image: "/kegiatan-sosial.jpg",
    content:
      "Alhamdulillah, IKAQ JABODETABEK menyelenggarakan bakti sosial Ramadhan berupa santunan untuk yatim dan dhuafa. Kegiatan ini melibatkan relawan dari berbagai wilayah Jabodetabek.",
  },
  {
    slug: "kajian-bulanan-april",
    title: "Kajian Bulanan April",
    date: "2025-04-05",
    author: "Bidang Keagamaan",
    image: "/kajian-keagamaan.jpg",
    content:
      "Kajian rutin bulanan menghadirkan penceramah Ust. Ahmad dengan tema “Amal Jariyah dan Peran Alumni”. Acara berlangsung khidmat dan interaktif.",
  },
  {
    slug: "rapat-kerja-tahunan",
    title: "Rapat Kerja Tahunan",
    date: "2025-02-20",
    author: "Sekretariat",
    image: "/rapat-kerja.jpg",
    content:
      "Rapat kerja membahas program sosial, pendidikan, dan pemberdayaan anggota untuk satu tahun ke depan, dengan fokus kolaborasi lintas bidang.",
  },
  {
    slug: "pelatihan-kepemimpinan-alumni",
    title: "Pelatihan Kepemimpinan Alumni",
    date: "2025-05-01",
    author: "Bidang SDM",
    image: "/pelatihan-alumni.jpg",
    content:
      "Pelatihan leadership untuk meningkatkan kapasitas kepemimpinan anggota, mencakup komunikasi efektif dan manajemen program sosial.",
  },
]

export type Member = {
  name: string
  role: string
  photo: string
}

export const structure: Member[] = [
  { name: "Ahmad Fauzi", role: "Ketua", photo: "/ketua.jpg" },
  { name: "Nur Aisyah", role: "Sekretaris", photo: "/sekretaris.jpg" },
  { name: "Budi Santoso", role: "Bendahara", photo: "/bendahara.jpg" },
  { name: "Siti Rahma", role: "Bidang Sosial", photo: "/bidang-sosial.jpg" },
  { name: "Rizky Hidayat", role: "Bidang Keagamaan", photo: "/bidang-keagamaan.jpg" },
  { name: "Dewi Lestari", role: "Bidang Pendidikan", photo: "/bidang-pendidikan.jpg" },
]
