import { useState, useEffect, useRef } from "react";

import logoImg from "./logo.png";
const LOGO_URL = logoImg;

const CATEGORIES = [
  {
    title: "Эрэлттэй",
    movies: [
      { id: 1, title: "Сүүдрийн Эзэнт Гүрэн", year: 2026, rating: "8.7", genre: "Шинжлэх Ухаан", duration: "2ц 14м", match: "98%", maturity: "16+", img: "https://picsum.photos/seed/shadow1/400/225", backdrop: "https://picsum.photos/seed/shadow1bg/1200/600", desc: "Хагарсан галактикт ганц жанжин дайтагч бүлэглэлүүдийг нэгтгэж, бүх ертөнцийг залгих хүчний эсрэг тулалдана." },
      { id: 2, title: "Сүүлчийн Дохио", year: 2025, rating: "9.1", genre: "Триллер", duration: "1ц 52м", match: "95%", maturity: "18+", img: "https://picsum.photos/seed/signal2/400/225", backdrop: "https://picsum.photos/seed/signal2bg/1200/600", desc: "Нууц шифр тайлагч сансрын гүнээс ирсэн нууцлаг дохиог барьж авснаар хүн төрөлхтний ертөнцийг ойлгох ойлголтыг өөрчилнө." },
      { id: 3, title: "Цусан Давалгаа", year: 2026, rating: "8.3", genre: "Экшн", duration: "2ц 01м", match: "92%", maturity: "16+", img: "https://picsum.photos/seed/crimson3/400/225", backdrop: "https://picsum.photos/seed/crimson3bg/1200/600", desc: "Элит баг Нео Токиогийн неон гэрэлтэй гудамжинд цаг хугацааны эсрэг тулалдаж, кибер халдлагаас сэргийлнэ." },
      { id: 4, title: "Маргаашийн Цуурай", year: 2025, rating: "8.9", genre: "Драм", duration: "2ц 22м", match: "97%", maturity: "12+", img: "https://picsum.photos/seed/echo4/400/225", backdrop: "https://picsum.photos/seed/echo4bg/1200/600", desc: "Нэгэн эх ирээдүйн өөртэйгөө харилцах боломжтой болж, хувь заяа болон эрх чөлөөний тухай боломжгүй сонголтуудтай тулгарна." },
      { id: 5, title: "Төмөр Чононууд", year: 2026, rating: "7.8", genre: "Экшн", duration: "1ц 48м", match: "88%", maturity: "16+", img: "https://picsum.photos/seed/iron5/400/225", backdrop: "https://picsum.photos/seed/iron5bg/1200/600", desc: "Хуучин тусгай хүчний цэргүүд дайсны шугамын цаана сүүлчийн даалгаврыг гүйцэтгэхээр дахин нэгдэнэ." },
      { id: 6, title: "Неон Мөрөөдөл", year: 2025, rating: "8.5", genre: "Шинжлэх Ухаан", duration: "2ц 10м", match: "94%", maturity: "16+", img: "https://picsum.photos/seed/neon6/400/225", backdrop: "https://picsum.photos/seed/neon6bg/1200/600", desc: "2089 онд мөрөөдлийг бичиж, зарах боломжтой болсон. Нэг мөрөөдөл худалдаачин соёл иргэншлийг устгах хар дарсан зүүд олж мэднэ." },
    ],
  },
  {
    title: "Flimix дээр Түгээмэл",
    movies: [
      { id: 7, title: "Хөндий Дэлхий", year: 2026, rating: "8.1", genre: "Адал Явдал", duration: "2ц 30м", match: "91%", maturity: "12+", img: "https://picsum.photos/seed/hollow7/400/225", backdrop: "https://picsum.photos/seed/hollow7bg/1200/600", desc: "Экспедицийн баг дэлхийн хальсан доор амьд экосистем олж мэдэх боловч тэд анхны олж мэдэгчид биш байв." },
      { id: 8, title: "Хорт Протокол", year: 2025, rating: "7.9", genre: "Триллер", duration: "1ц 55м", match: "89%", maturity: "18+", img: "https://picsum.photos/seed/venom8/400/225", backdrop: "https://picsum.photos/seed/venom8bg/1200/600", desc: "Тэрслүү эрдэмтэн био-зэвсэг суллаж, зөвхөн нэрээ алдсан вирус судлаач цаг тухайд нь эмчилгээ бүтээж чадна." },
      { id: 9, title: "Одны Унал", year: 2026, rating: "9.0", genre: "Шинжлэх Ухаан", duration: "2ц 18м", match: "96%", maturity: "12+", img: "https://picsum.photos/seed/star9/400/225", backdrop: "https://picsum.photos/seed/star9bg/1200/600", desc: "Оддууд нууцлаг байдлаар харанхуйлж эхлэхэд залуу одон орон судлаач сансрын үзэгдлийг ойлгох түлхүүрийг атгана." },
      { id: 10, title: "Цусан Цэх", year: 2025, rating: "8.6", genre: "Вестерн", duration: "2ц 45м", match: "93%", maturity: "18+", img: "https://picsum.photos/seed/blood10/400/225", backdrop: "https://picsum.photos/seed/blood10bg/1200/600", desc: "1850-аад оны Америкийн хатуу ширүүн хил нутгаар дайн тулааны бүлэг хууль бусчуудыг дагасан догшин түүх." },
      { id: 11, title: "Квант Хагарал", year: 2026, rating: "8.4", genre: "Шинжлэх Ухаан", duration: "2ц 05м", match: "90%", maturity: "16+", img: "https://picsum.photos/seed/quantum11/400/225", backdrop: "https://picsum.photos/seed/quantum11bg/1200/600", desc: "Физикч санамсаргүйгээр цаг хугацааг хагалж, зэрэгцээ бодит байдлуудыг бий болгосноор сүйрлийн үр дагавартай мөргөлдөнө." },
      { id: 12, title: "Архитектор", year: 2025, rating: "8.8", genre: "Нууцлаг", duration: "2ц 12м", match: "95%", maturity: "16+", img: "https://picsum.photos/seed/arch12/400/225", backdrop: "https://picsum.photos/seed/arch12bg/1200/600", desc: "Авьяаслаг архитектор өөрийн зохиосон барилгууд физикийн хуулийг зөрчсөн боломжгүй орон зай бий болгож байгааг мэдэрнэ." },
    ],
  },
  {
    title: "Экшн & Адал Явдал",
    movies: [
      { id: 13, title: "Тэрслүү Агент", year: 2026, rating: "7.7", genre: "Экшн", duration: "1ц 58м", match: "87%", maturity: "16+", img: "https://picsum.photos/seed/rogue13/400/225", backdrop: "https://picsum.photos/seed/rogue13bg/1200/600", desc: "Шатаагдсан тагнуулч засгийн газрын дээд түвшинд хүрсэн хуйвалдааныг ил болгохоор далд орно." },
      { id: 14, title: "Уур Хилэнгийн Зам 2099", year: 2025, rating: "8.2", genre: "Экшн", duration: "2ц 08м", match: "91%", maturity: "18+", img: "https://picsum.photos/seed/fury14/400/225", backdrop: "https://picsum.photos/seed/fury14bg/1200/600", desc: "Апокалипсын дараах цөлд өрсөлдөгч бүлэглэлүүд сүүлчийн мэдэгдэж буй усны эх үүсвэрийн төлөө тулалдана." },
      { id: 15, title: "Аянгын Цохилт", year: 2026, rating: "7.5", genre: "Экшн", duration: "1ц 45м", match: "85%", maturity: "12+", img: "https://picsum.photos/seed/thunder15/400/225", backdrop: "https://picsum.photos/seed/thunder15bg/1200/600", desc: "Шуурга нэхэгч аянгыг сүүдэрт корпораци зэвсэг болгон ашиглаж байгааг олж мэднэ." },
      { id: 16, title: "Оргил Махчин", year: 2025, rating: "8.0", genre: "Адал Явдал", duration: "2ц 20м", match: "90%", maturity: "16+", img: "https://picsum.photos/seed/apex16/400/225", backdrop: "https://picsum.photos/seed/apex16bg/1200/600", desc: "Амазоны гүнд судалгааны баг эволюцийн мартсан зүйлтэй тулгарна — тэр тэднийг агнаж байна." },
      { id: 17, title: "Хар Тэнгэр", year: 2026, rating: "8.3", genre: "Экшн", duration: "2ц 15м", match: "92%", maturity: "18+", img: "https://picsum.photos/seed/blackh17/400/225", backdrop: "https://picsum.photos/seed/blackh17bg/1200/600", desc: "Шумбагч хөлгийн баг Марианы хонхорын ёроолд живсэн харийн хөлөг олж мэднэ." },
      { id: 18, title: "Түймэр", year: 2025, rating: "7.6", genre: "Адал Явдал", duration: "1ц 50м", match: "86%", maturity: "12+", img: "https://picsum.photos/seed/wild18/400/225", backdrop: "https://picsum.photos/seed/wild18bg/1200/600", desc: "Зоригтой гал сөнөөгч багаа түүхэн дэх хамгийн том ойн түймрийн зүрхэнд удирдана." },
    ],
  },
  {
    title: "Шилдэг Үнэлгээтэй",
    movies: [
      { id: 19, title: "Хоорондын Чимээгүй Байдал", year: 2026, rating: "9.3", genre: "Драм", duration: "2ц 35м", match: "99%", maturity: "16+", img: "https://picsum.photos/seed/silence19/400/225", backdrop: "https://picsum.photos/seed/silence19bg/1200/600", desc: "Хоёр зууралдсан ах дүү хүүхэд насны гэртээ эргэн ирж, арван жилийн хэлэгдээгүй үнэн, булагдсан дурсамжтай нүүр тулна." },
      { id: 20, title: "Шөнийн Нар", year: 2025, rating: "9.2", genre: "Романтик", duration: "2ц 02м", match: "97%", maturity: "12+", img: "https://picsum.photos/seed/midnight20/400/225", backdrop: "https://picsum.photos/seed/midnight20bg/1200/600", desc: "Нар хэзээ ч жаргадаггүй хойд туйлын бүсэд хоёр танихгүй хүн хамгийн гайхалтай зуны турш хайрыг олно." },
      { id: 21, title: "Улаан Код", year: 2026, rating: "9.0", genre: "Триллер", duration: "2ц 10м", match: "96%", maturity: "18+", img: "https://picsum.photos/seed/code21/400/225", backdrop: "https://picsum.photos/seed/code21bg/1200/600", desc: "Эмнэлгийн сувилагч 7-р тасгийн өвчтөнүүд адилхан боломжгүй эмнэлгийн гажиг байгааг олж мэднэ." },
      { id: 22, title: "Таталцлын Хөндий", year: 2025, rating: "8.9", genre: "Уран Зөгнөлт", duration: "2ц 25м", match: "95%", maturity: "12+", img: "https://picsum.photos/seed/gravity22/400/225", backdrop: "https://picsum.photos/seed/gravity22bg/1200/600", desc: "Жижиг уулын хот таталцал хил хязгаар дотроо өөрөөр ажилладгийг олж мэдэж, эрдэмтэд болон эмх замбараагүй байдлыг татна." },
      { id: 23, title: "Гэрээ", year: 2026, rating: "9.1", genre: "Драм", duration: "2ц 40м", match: "98%", maturity: "16+", img: "https://picsum.photos/seed/covenant23/400/225", backdrop: "https://picsum.photos/seed/covenant23bg/1200/600", desc: "Дайны ахмад амь насыг нь аварсан орчуулагчтай арван жил, тивүүдийг дамнасан гайхалтай нөхөрлөл үүсгэнэ." },
      { id: 24, title: "Сүнсний Утас", year: 2025, rating: "8.8", genre: "Нууцлаг", duration: "1ц 55м", match: "94%", maturity: "16+", img: "https://picsum.photos/seed/phantom24/400/225", backdrop: "https://picsum.photos/seed/phantom24bg/1200/600", desc: "Нэрт загвар зохион бүтээгч эртний хувцсанд нэхэгдсэн ирээдүйн үйл явдлыг таамаглах нууц мессежүүдийг олж мэднэ." },
    ],
  },
  {
    title: "Шинжлэх Ухаан & Уран Зөгнөлт",
    movies: [
      { id: 25, title: "Манан Үүл", year: 2026, rating: "8.6", genre: "Шинжлэх Ухаан", duration: "2ц 30м", match: "93%", maturity: "12+", img: "https://picsum.photos/seed/nebula25/400/225", backdrop: "https://picsum.photos/seed/nebula25bg/1200/600", desc: "Хүн төрөлхтний анхны колоничлогч хөлөг зорьсон газартаа хүрэхэд гариг аль хэдийн оршин суугчидтай байв." },
      { id: 26, title: "Луугийн Амьсгал", year: 2025, rating: "8.4", genre: "Уран Зөгнөлт", duration: "2ц 50м", match: "91%", maturity: "12+", img: "https://picsum.photos/seed/dragon26/400/225", backdrop: "https://picsum.photos/seed/dragon26bg/1200/600", desc: "Сүүлчийн луу унагч эртний дайснуудтай холбоо тогтоож, эхний харанхуйн эргэн ирэлтээс сэргийлнэ." },
      { id: 27, title: "Онцгой Цэг", year: 2026, rating: "8.9", genre: "Шинжлэх Ухаан", duration: "2ц 15м", match: "96%", maturity: "16+", img: "https://picsum.photos/seed/singular27/400/225", backdrop: "https://picsum.photos/seed/singular27bg/1200/600", desc: "Хиймэл оюун ухаан ухамсартай болоход програмист амьдралын шинэ хэлбэрийн хувь заяаг шийдэх ёстой болно." },
      { id: 28, title: "Шидэт", year: 2025, rating: "7.8", genre: "Уран Зөгнөлт", duration: "2ц 05м", match: "88%", maturity: "12+", img: "https://picsum.photos/seed/enchant28/400/225", backdrop: "https://picsum.photos/seed/enchant28bg/1200/600", desc: "Номын санч эртний номон дахь түүхүүд бодит байдлыг дахин бичиж байгааг олж мэднэ." },
      { id: 29, title: "Хоосон Орон Зайн Аялагч", year: 2026, rating: "8.7", genre: "Шинжлэх Ухаан", duration: "2ц 20м", match: "94%", maturity: "16+", img: "https://picsum.photos/seed/void29/400/225", backdrop: "https://picsum.photos/seed/void29bg/1200/600", desc: "Сансрын цэрэг хэмжээсүүдийн хооронд шилжих чадвартай боловч шилжилт бүр түүний дурсамжийн нэг хэсгийг авна." },
      { id: 30, title: "Хаадын Хаант Улс", year: 2025, rating: "8.1", genre: "Уран Зөгнөлт", duration: "2ц 40м", match: "89%", maturity: "16+", img: "https://picsum.photos/seed/realm30/400/225", backdrop: "https://picsum.photos/seed/realm30bg/1200/600", desc: "Таван хаант улс зуу зууны өрсөлдөөнийг даван туулж, амьдыг чулуу болгох шидэт тахлын эсрэг тэмцэнэ." },
    ],
  },
];

const FEATURED = CATEGORIES[0].movies[1];

function PlayIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function InfoIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function PlusIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ThumbIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function ChevronLeft({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CloseIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function VolumeIcon({ size = 22, muted }) {
  return muted ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function SearchIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BellIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function StarIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Row Component ─── */
function MovieRow({ category, onSelect }) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div style={{ marginBottom: 40, position: "relative" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#e5e5e5", margin: "0 0 12px 56px", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em" }}>
        {category.title}
      </h2>
      <div style={{ position: "relative" }}>
        {canScrollLeft && (
          <button onClick={() => scroll(-1)} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 52, zIndex: 10, background: "linear-gradient(to right, rgba(10,6,20,0.9), transparent)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.8}>
            <ChevronLeft />
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll(1)} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 52, zIndex: 10, background: "linear-gradient(to left, rgba(10,6,20,0.9), transparent)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.8}>
            <ChevronRight />
          </button>
        )}
        <div ref={rowRef} style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", padding: "0 56px", scrollSnapType: "x mandatory" }}>
          {category.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MovieCard({ movie, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(movie)}
      style={{
        minWidth: 240, maxWidth: 240, cursor: "pointer", scrollSnapAlign: "start",
        borderRadius: 6, overflow: "hidden", position: "relative",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        zIndex: hovered ? 5 : 1,
        transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s",
        boxShadow: hovered ? "0 12px 40px rgba(138,43,226,0.35)" : "none",
      }}
    >
      <img src={movie.img} alt={movie.title} style={{ width: "100%", height: 135, objectFit: "cover", display: "block" }} loading="lazy" />
      {hovered && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(10,6,20,0.95))",
          padding: "30px 12px 12px",
        }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <button style={{ width: 30, height: 30, borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a0614" }}>
              <PlayIcon size={16} />
            </button>
            <button style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <PlusIcon size={14} />
            </button>
            <button style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <ThumbIcon size={14} />
            </button>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e5e5e5", fontFamily: "'Outfit', sans-serif" }}>{movie.title}</div>
          <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#aaa", marginTop: 2, fontFamily: "'Outfit', sans-serif" }}>
            <span style={{ color: "#7B2FBE" }}>{movie.match}</span>
            <span>{movie.maturity}</span>
            <span>{movie.duration}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Modal ─── */
function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.25s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "90%", maxWidth: 850, maxHeight: "90vh", overflowY: "auto",
        background: "#181024", borderRadius: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(138,43,226,0.15)",
        scrollbarWidth: "none",
      }}>
        {/* Backdrop */}
        <div style={{ position: "relative", width: "100%", height: 400 }}>
          <img src={movie.backdrop} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #181024 5%, transparent 50%)" }} />
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%",
            background: "rgba(10,6,20,0.7)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
          }}>
            <CloseIcon size={20} />
          </button>
          <div style={{ position: "absolute", bottom: 30, left: 36 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "'Outfit', sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{movie.title}</h1>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 28px",
                background: "#fff", color: "#0a0614", border: "none", borderRadius: 4,
                fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
              }}>
                <PlayIcon size={22} /> Тоглуулах
              </button>
              <button style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.4)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              }}>
                <PlusIcon size={20} />
              </button>
              <button style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.4)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              }}>
                <ThumbIcon size={20} />
              </button>
            </div>
          </div>
        </div>
        {/* Info */}
        <div style={{ padding: "0 36px 36px", fontFamily: "'Outfit', sans-serif" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ color: "#7B2FBE", fontWeight: 700, fontSize: 15 }}>{movie.match} Тохирол</span>
            <span style={{ color: "#aaa", fontSize: 14 }}>{movie.year}</span>
            <span style={{ padding: "2px 6px", border: "1px solid #555", borderRadius: 3, fontSize: 12, color: "#aaa" }}>{movie.maturity}</span>
            <span style={{ color: "#aaa", fontSize: 14 }}>{movie.duration}</span>
            <span style={{ padding: "2px 6px", border: "1px solid #555", borderRadius: 3, fontSize: 12, color: "#aaa" }}>HD</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            <span style={{ display: "flex", alignItems: "center", color: "#f5c518" }}><StarIcon /> </span>
            <span style={{ color: "#f5c518", fontWeight: 700, fontSize: 15 }}>{movie.rating}</span>
            <span style={{ color: "#777", fontSize: 14 }}>/10</span>
          </div>
          <p style={{ color: "#d2d2d2", fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 550 }}>
            {movie.desc}
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 24, fontSize: 13, color: "#888" }}>
            <div><span style={{ color: "#555" }}>Төрөл: </span><span style={{ color: "#bbb" }}>{movie.genre}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function FlimixApp() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [muted, setMuted] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCategories = searchQuery.trim()
    ? CATEGORIES.map(cat => ({
        ...cat,
        movies: cat.movies.filter(m =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genre.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.movies.length > 0)
    : CATEGORIES;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0614",
      color: "#fff",
      fontFamily: "'Outfit', sans-serif",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        body { background: #0a0614; overflow-x: hidden; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroText { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>

      {/* ─── Navbar ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", height: 68,
        background: scrolled ? "rgba(10,6,20,0.95)" : "linear-gradient(180deg, rgba(10,6,20,0.8) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <img src={LOGO_URL} alt="Flimix" style={{ height: 40 }} />
          <div style={{ display: "flex", gap: 22 }}>
            {["Нүүр", "ТВ Цуврал", "Кино", "Шинэ & Түгээмэл", "Миний Жагсаалт"].map((item, i) => (
              <a key={i} href="#" onClick={e => e.preventDefault()} style={{
                color: i === 0 ? "#fff" : "#b3b3b3", textDecoration: "none", fontSize: 14, fontWeight: i === 0 ? 600 : 400,
                transition: "color 0.2s", letterSpacing: "0.01em",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#e0b0ff"}
              onMouseLeave={e => e.currentTarget.style.color = i === 0 ? "#fff" : "#b3b3b3"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <button onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center" }}>
              <SearchIcon />
            </button>
            {searchOpen && (
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Нэр, төрөл..."
                style={{
                  position: "absolute", right: 0, top: -4, width: 240, height: 34,
                  background: "rgba(10,6,20,0.9)", border: "1px solid rgba(138,43,226,0.5)",
                  borderRadius: 4, padding: "0 12px 0 36px", color: "#fff", fontSize: 14,
                  fontFamily: "'Outfit', sans-serif", outline: "none",
                }}
              />
            )}
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex" }}>
            <BellIcon />
          </button>
          <div style={{
            width: 32, height: 32, borderRadius: 4,
            background: "linear-gradient(135deg, #7B2FBE, #c471ed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>
            F
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <div style={{ position: "relative", height: "85vh", minHeight: 500 }}>
        <img src={FEATURED.backdrop} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,6,20,0.9) 0%, rgba(10,6,20,0.4) 50%, rgba(10,6,20,0.1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0614 0%, transparent 40%)" }} />

        <div style={{
          position: "absolute", bottom: "18%", left: 56,
          animation: loaded ? "heroText 0.8s ease forwards" : "none",
          opacity: loaded ? 1 : 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <img src={LOGO_URL} alt="F" style={{ height: 22 }} />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 3, color: "#c471ed", textTransform: "uppercase" }}>Эх Бүтээл</span>
          </div>
          <h1 style={{
            fontSize: 56, fontWeight: 800, lineHeight: 1.05, maxWidth: 600,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            background: "linear-gradient(135deg, #fff 60%, #c471ed)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 16,
          }}>
            {FEATURED.title}
          </h1>
          <p style={{
            fontSize: 16, color: "#ccc", maxWidth: 450, lineHeight: 1.5,
            textShadow: "0 1px 8px rgba(0,0,0,0.6)", marginBottom: 24,
          }}>
            {FEATURED.desc}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 10, padding: "12px 32px",
              background: "#fff", color: "#0a0614", border: "none", borderRadius: 4,
              fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e0e0e0"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              <PlayIcon size={24} /> Тоглуулах
            </button>
            <button
              onClick={() => setSelectedMovie(FEATURED)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 28px",
                background: "rgba(138,43,226,0.35)", color: "#fff", border: "none", borderRadius: 4,
                fontSize: 17, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                backdropFilter: "blur(4px)", transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(138,43,226,0.55)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(138,43,226,0.35)"}
            >
              <InfoIcon size={20} /> Дэлгэрэнгүй
            </button>
          </div>
        </div>

        {/* Mute button */}
        <button onClick={() => setMuted(!muted)} style={{
          position: "absolute", bottom: "18%", right: 56,
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
        }}>
          <VolumeIcon muted={muted} />
        </button>

        {/* Maturity */}
        <div style={{
          position: "absolute", bottom: "18%", right: 110,
          padding: "4px 14px", background: "rgba(10,6,20,0.6)",
          borderLeft: "3px solid rgba(138,43,226,0.7)", fontSize: 14, color: "#ccc",
        }}>
          {FEATURED.maturity}
        </div>
      </div>

      {/* ─── Rows ─── */}
      <div style={{ position: "relative", zIndex: 2, marginTop: -80 }}>
        {filteredCategories.map((cat, i) => (
          <MovieRow key={i} category={cat} onSelect={setSelectedMovie} />
        ))}
        {filteredCategories.length === 0 && searchQuery && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#777", fontSize: 18 }}>
            "{searchQuery}" хайлтаар илэрц олдсонгүй
          </div>
        )}
      </div>

      {/* ─── Footer ─── */}
      <footer style={{
        padding: "60px 56px 40px", marginTop: 40,
        borderTop: "1px solid rgba(138,43,226,0.15)",
      }}>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 30 }}>
          {["Түгээмэл Асуулт", "Тусламжийн Төв", "Хаяг", "Медиа Төв", "Хөрөнгө Оруулагч", "Ажлын Байр", "Үйлчилгээний Нөхцөл", "Нууцлал", "Тохиргоо", "Холбоо Барих"].map((item, i) => (
            <a key={i} href="#" onClick={e => e.preventDefault()} style={{ color: "#555", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c471ed"}
              onMouseLeave={e => e.currentTarget.style.color = "#555"}
            >{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_URL} alt="Flimix" style={{ height: 24, opacity: 0.5 }} />
          <span style={{ color: "#333", fontSize: 12 }}>&copy; 2026 Flimix, Inc.</span>
        </div>
      </footer>

      {/* ─── Modal ─── */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}
