import { useState, useEffect, useRef, useCallback } from "react";
import logoImg from "./logo.png";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const CATEGORIES = [
  {
    title: "Эрэлттэй",
    movies: [
      { id: 1, title: "Сүүдрийн Эзэнт Гүрэн", year: 2026, rating: "8.7", genre: "Шинжлэх Ухаан", duration: "2ц 14м", match: "98%", maturity: "16+", price: 8500, img: "https://picsum.photos/seed/shadow1/400/225", backdrop: "https://picsum.photos/seed/shadow1bg/1200/600", desc: "Хагарсан галактикт ганц жанжин дайтагч бүлэглэлүүдийг нэгтгэж, бүх ертөнцийг залгих хүчний эсрэг тулалдана." },
      { id: 2, title: "Сүүлчийн Дохио", year: 2025, rating: "9.1", genre: "Триллер", duration: "1ц 52м", match: "95%", maturity: "18+", price: 9500, img: "https://picsum.photos/seed/signal2/400/225", backdrop: "https://picsum.photos/seed/signal2bg/1200/600", desc: "Нууц шифр тайлагч сансрын гүнээс ирсэн нууцлаг дохиог барьж авснаар хүн төрөлхтний ертөнцийг ойлгох ойлголтыг өөрчилнө." },
      { id: 3, title: "Цусан Давалгаа", year: 2026, rating: "8.3", genre: "Экшн", duration: "2ц 01м", match: "92%", maturity: "16+", price: 7500, img: "https://picsum.photos/seed/crimson3/400/225", backdrop: "https://picsum.photos/seed/crimson3bg/1200/600", desc: "Элит баг Нео Токиогийн неон гэрэлтэй гудамжинд цаг хугацааны эсрэг тулалдаж, кибер халдлагаас сэргийлнэ." },
      { id: 4, title: "Маргаашийн Цуурай", year: 2025, rating: "8.9", genre: "Драм", duration: "2ц 22м", match: "97%", maturity: "12+", price: 8000, img: "https://picsum.photos/seed/echo4/400/225", backdrop: "https://picsum.photos/seed/echo4bg/1200/600", desc: "Нэгэн эх ирээдүйн өөртэйгөө харилцах боломжтой болж, хувь заяа болон эрх чөлөөний тухай боломжгүй сонголтуудтай тулгарна." },
      { id: 5, title: "Төмөр Чононууд", year: 2026, rating: "7.8", genre: "Экшн", duration: "1ц 48м", match: "88%", maturity: "16+", price: 7000, img: "https://picsum.photos/seed/iron5/400/225", backdrop: "https://picsum.photos/seed/iron5bg/1200/600", desc: "Хуучин тусгай хүчний цэргүүд дайсны шугамын цаана сүүлчийн даалгаврыг гүйцэтгэхээр дахин нэгдэнэ." },
      { id: 6, title: "Неон Мөрөөдөл", year: 2025, rating: "8.5", genre: "Шинжлэх Ухаан", duration: "2ц 10м", match: "94%", maturity: "16+", price: 8500, img: "https://picsum.photos/seed/neon6/400/225", backdrop: "https://picsum.photos/seed/neon6bg/1200/600", desc: "2089 онд мөрөөдлийг бичиж, зарах боломжтой болсон. Нэг мөрөөдөл худалдаачин соёл иргэншлийг устгах хар дарсан зүүд олж мэднэ." },
      { id: 31, title: "Галт Шугам", year: 2026, rating: "8.0", genre: "Экшн", duration: "1ц 56м", match: "90%", maturity: "16+", price: 7500, img: "https://picsum.photos/seed/fireline31/400/225", backdrop: "https://picsum.photos/seed/fireline31bg/1200/600", desc: "Галт тэрэг дээр болсон барьцааны нөхцөл байдалд нэг зорчигч бүх зорчигчдыг аврахаар шийднэ." },
      { id: 32, title: "Хөлдөө Ертөнц", year: 2025, rating: "8.8", genre: "Шинжлэх Ухаан", duration: "2ц 20м", match: "96%", maturity: "12+", price: 9000, img: "https://picsum.photos/seed/frozen32/400/225", backdrop: "https://picsum.photos/seed/frozen32bg/1200/600", desc: "Мөсөн галавт дэлхий хөлдөж, амьд үлдэгсэд газар доорх хотуудад амьдрана." },
    ],
  },
  {
    title: "Flimix дээр Түгээмэл",
    movies: [
      { id: 7, title: "Хөндий Дэлхий", year: 2026, rating: "8.1", genre: "Адал Явдал", duration: "2ц 30м", match: "91%", maturity: "12+", price: 8000, img: "https://picsum.photos/seed/hollow7/400/225", backdrop: "https://picsum.photos/seed/hollow7bg/1200/600", desc: "Экспедицийн баг дэлхийн хальсан доор амьд экосистем олж мэдэх боловч тэд анхны олж мэдэгчид биш байв." },
      { id: 8, title: "Хорт Протокол", year: 2025, rating: "7.9", genre: "Триллер", duration: "1ц 55м", match: "89%", maturity: "18+", price: 7500, img: "https://picsum.photos/seed/venom8/400/225", backdrop: "https://picsum.photos/seed/venom8bg/1200/600", desc: "Тэрслүү эрдэмтэн био-зэвсэг суллаж, зөвхөн нэрээ алдсан вирус судлаач цаг тухайд нь эмчилгээ бүтээж чадна." },
      { id: 9, title: "Одны Унал", year: 2026, rating: "9.0", genre: "Шинжлэх Ухаан", duration: "2ц 18м", match: "96%", maturity: "12+", price: 9500, img: "https://picsum.photos/seed/star9/400/225", backdrop: "https://picsum.photos/seed/star9bg/1200/600", desc: "Оддууд нууцлаг байдлаар харанхуйлж эхлэхэд залуу одон орон судлаач сансрын үзэгдлийг ойлгох түлхүүрийг атгана." },
      { id: 10, title: "Цусан Цэх", year: 2025, rating: "8.6", genre: "Вестерн", duration: "2ц 45м", match: "93%", maturity: "18+", price: 8500, img: "https://picsum.photos/seed/blood10/400/225", backdrop: "https://picsum.photos/seed/blood10bg/1200/600", desc: "1850-аад оны Америкийн хатуу ширүүн хил нутгаар дайн тулааны бүлэг хууль бусчуудыг дагасан догшин түүх." },
      { id: 11, title: "Квант Хагарал", year: 2026, rating: "8.4", genre: "Шинжлэх Ухаан", duration: "2ц 05м", match: "90%", maturity: "16+", price: 8000, img: "https://picsum.photos/seed/quantum11/400/225", backdrop: "https://picsum.photos/seed/quantum11bg/1200/600", desc: "Физикч санамсаргүйгээр цаг хугацааг хагалж, зэрэгцээ бодит байдлуудыг бий болгосноор сүйрлийн үр дагавартай мөргөлдөнө." },
      { id: 12, title: "Архитектор", year: 2025, rating: "8.8", genre: "Нууцлаг", duration: "2ц 12м", match: "95%", maturity: "16+", price: 9000, img: "https://picsum.photos/seed/arch12/400/225", backdrop: "https://picsum.photos/seed/arch12bg/1200/600", desc: "Авьяаслаг архитектор өөрийн зохиосон барилгууд физикийн хуулийг зөрчсөн боломжгүй орон зай бий болгож байгааг мэдэрнэ." },
      { id: 33, title: "Далайн Гүн", year: 2026, rating: "8.2", genre: "Адал Явдал", duration: "2ц 05м", match: "91%", maturity: "12+", price: 7500, img: "https://picsum.photos/seed/deepsea33/400/225", backdrop: "https://picsum.photos/seed/deepsea33bg/1200/600", desc: "Далайн ёроолд шинэ амьдралын хэлбэр олдож, хүн төрөлхтний ирээдүйг өөрчилнө." },
      { id: 34, title: "Салхины Дуу", year: 2025, rating: "8.7", genre: "Драм", duration: "2ц 15м", match: "94%", maturity: "12+", price: 8000, img: "https://picsum.photos/seed/windvoice34/400/225", backdrop: "https://picsum.photos/seed/windvoice34bg/1200/600", desc: "Монгол тал нутагт өсч торнисон залуу хөгжимчин дэлхийн тайзнаа гарна." },
    ],
  },
  {
    title: "Экшн & Адал Явдал",
    movies: [
      { id: 13, title: "Тэрслүү Агент", year: 2026, rating: "7.7", genre: "Экшн", duration: "1ц 58м", match: "87%", maturity: "16+", price: 7000, img: "https://picsum.photos/seed/rogue13/400/225", backdrop: "https://picsum.photos/seed/rogue13bg/1200/600", desc: "Шатаагдсан тагнуулч засгийн газрын дээд түвшинд хүрсэн хуйвалдааныг ил болгохоор далд орно." },
      { id: 14, title: "Уур Хилэнгийн Зам 2099", year: 2025, rating: "8.2", genre: "Экшн", duration: "2ц 08м", match: "91%", maturity: "18+", price: 8500, img: "https://picsum.photos/seed/fury14/400/225", backdrop: "https://picsum.photos/seed/fury14bg/1200/600", desc: "Апокалипсын дараах цөлд өрсөлдөгч бүлэглэлүүд сүүлчийн мэдэгдэж буй усны эх үүсвэрийн төлөө тулалдана." },
      { id: 15, title: "Аянгын Цохилт", year: 2026, rating: "7.5", genre: "Экшн", duration: "1ц 45м", match: "85%", maturity: "12+", price: 6500, img: "https://picsum.photos/seed/thunder15/400/225", backdrop: "https://picsum.photos/seed/thunder15bg/1200/600", desc: "Шуурга нэхэгч аянгыг сүүдэрт корпораци зэвсэг болгон ашиглаж байгааг олж мэднэ." },
      { id: 16, title: "Оргил Махчин", year: 2025, rating: "8.0", genre: "Адал Явдал", duration: "2ц 20м", match: "90%", maturity: "16+", price: 8000, img: "https://picsum.photos/seed/apex16/400/225", backdrop: "https://picsum.photos/seed/apex16bg/1200/600", desc: "Амазоны гүнд судалгааны баг эволюцийн мартсан зүйлтэй тулгарна — тэр тэднийг агнаж байна." },
      { id: 17, title: "Хар Тэнгэр", year: 2026, rating: "8.3", genre: "Экшн", duration: "2ц 15м", match: "92%", maturity: "18+", price: 8500, img: "https://picsum.photos/seed/blackh17/400/225", backdrop: "https://picsum.photos/seed/blackh17bg/1200/600", desc: "Шумбагч хөлгийн баг Марианы хонхорын ёроолд живсэн харийн хөлөг олж мэднэ." },
      { id: 18, title: "Түймэр", year: 2025, rating: "7.6", genre: "Адал Явдал", duration: "1ц 50м", match: "86%", maturity: "12+", price: 7000, img: "https://picsum.photos/seed/wild18/400/225", backdrop: "https://picsum.photos/seed/wild18bg/1200/600", desc: "Зоригтой гал сөнөөгч багаа түүхэн дэх хамгийн том ойн түймрийн зүрхэнд удирдана." },
      { id: 35, title: "Зэвсэгт Бүсгүй", year: 2026, rating: "8.1", genre: "Экшн", duration: "1ц 52м", match: "89%", maturity: "16+", price: 7500, img: "https://picsum.photos/seed/armedw35/400/225", backdrop: "https://picsum.photos/seed/armedw35bg/1200/600", desc: "Хуучин цэргийн эмэгтэй хүүхдээ аврахын тулд бүх зүйлийг дайрна." },
      { id: 36, title: "Нисэгчийн Зам", year: 2025, rating: "7.9", genre: "Адал Явдал", duration: "2ц 10м", match: "88%", maturity: "12+", price: 7500, img: "https://picsum.photos/seed/pilot36/400/225", backdrop: "https://picsum.photos/seed/pilot36bg/1200/600", desc: "Нисгэгч хүнгүй арал дээр суулт хийж, амьд үлдэхийн тулд тэмцэнэ." },
    ],
  },
  {
    title: "Шилдэг Үнэлгээтэй",
    movies: [
      { id: 19, title: "Хоорондын Чимээгүй Байдал", year: 2026, rating: "9.3", genre: "Драм", duration: "2ц 35м", match: "99%", maturity: "16+", price: 10000, img: "https://picsum.photos/seed/silence19/400/225", backdrop: "https://picsum.photos/seed/silence19bg/1200/600", desc: "Хоёр зууралдсан ах дүү хүүхэд насны гэртээ эргэн ирж, арван жилийн хэлэгдээгүй үнэн, булагдсан дурсамжтай нүүр тулна." },
      { id: 20, title: "Шөнийн Нар", year: 2025, rating: "9.2", genre: "Романтик", duration: "2ц 02м", match: "97%", maturity: "12+", price: 9500, img: "https://picsum.photos/seed/midnight20/400/225", backdrop: "https://picsum.photos/seed/midnight20bg/1200/600", desc: "Нар хэзээ ч жаргадаггүй хойд туйлын бүсэд хоёр танихгүй хүн хамгийн гайхалтай зуны турш хайрыг олно." },
      { id: 21, title: "Улаан Код", year: 2026, rating: "9.0", genre: "Триллер", duration: "2ц 10м", match: "96%", maturity: "18+", price: 9500, img: "https://picsum.photos/seed/code21/400/225", backdrop: "https://picsum.photos/seed/code21bg/1200/600", desc: "Эмнэлгийн сувилагч 7-р тасгийн өвчтөнүүд адилхан боломжгүй эмнэлгийн гажиг байгааг олж мэднэ." },
      { id: 22, title: "Таталцлын Хөндий", year: 2025, rating: "8.9", genre: "Уран Зөгнөлт", duration: "2ц 25м", match: "95%", maturity: "12+", price: 8500, img: "https://picsum.photos/seed/gravity22/400/225", backdrop: "https://picsum.photos/seed/gravity22bg/1200/600", desc: "Жижиг уулын хот таталцал хил хязгаар дотроо өөрөөр ажилладгийг олж мэдэж, эрдэмтэд болон эмх замбараагүй байдлыг татна." },
      { id: 23, title: "Гэрээ", year: 2026, rating: "9.1", genre: "Драм", duration: "2ц 40м", match: "98%", maturity: "16+", price: 10000, img: "https://picsum.photos/seed/covenant23/400/225", backdrop: "https://picsum.photos/seed/covenant23bg/1200/600", desc: "Дайны ахмад амь насыг нь аварсан орчуулагчтай арван жил, тивүүдийг дамнасан гайхалтай нөхөрлөл үүсгэнэ." },
      { id: 24, title: "Сүнсний Утас", year: 2025, rating: "8.8", genre: "Нууцлаг", duration: "1ц 55м", match: "94%", maturity: "16+", price: 9000, img: "https://picsum.photos/seed/phantom24/400/225", backdrop: "https://picsum.photos/seed/phantom24bg/1200/600", desc: "Нэрт загвар зохион бүтээгч эртний хувцсанд нэхэгдсэн ирээдүйн үйл явдлыг таамаглах нууц мессежүүдийг олж мэднэ." },
      { id: 37, title: "Эцгийн Амлалт", year: 2026, rating: "9.2", genre: "Драм", duration: "2ц 30м", match: "98%", maturity: "12+", price: 9500, img: "https://picsum.photos/seed/father37/400/225", backdrop: "https://picsum.photos/seed/father37bg/1200/600", desc: "Эцэг хүүгийнхээ ирээдүйн төлөө бүх зүйлийг золиослоно." },
      { id: 38, title: "Мөнх Цэцэг", year: 2025, rating: "9.0", genre: "Романтик", duration: "2ц 08м", match: "96%", maturity: "12+", price: 8500, img: "https://picsum.photos/seed/flower38/400/225", backdrop: "https://picsum.photos/seed/flower38bg/1200/600", desc: "100 жилд нэг удаа цэцэглэдэг цэцгийг эрж хоёр хайрлагч адал явдалд ордог." },
    ],
  },
  {
    title: "Шинжлэх Ухаан & Уран Зөгнөлт",
    movies: [
      { id: 25, title: "Манан Үүл", year: 2026, rating: "8.6", genre: "Шинжлэх Ухаан", duration: "2ц 30м", match: "93%", maturity: "12+", price: 8500, img: "https://picsum.photos/seed/nebula25/400/225", backdrop: "https://picsum.photos/seed/nebula25bg/1200/600", desc: "Хүн төрөлхтний анхны колоничлогч хөлөг зорьсон газартаа хүрэхэд гариг аль хэдийн оршин суугчидтай байв." },
      { id: 26, title: "Луугийн Амьсгал", year: 2025, rating: "8.4", genre: "Уран Зөгнөлт", duration: "2ц 50м", match: "91%", maturity: "12+", price: 8000, img: "https://picsum.photos/seed/dragon26/400/225", backdrop: "https://picsum.photos/seed/dragon26bg/1200/600", desc: "Сүүлчийн луу унагч эртний дайснуудтай холбоо тогтоож, эхний харанхуйн эргэн ирэлтээс сэргийлнэ." },
      { id: 27, title: "Онцгой Цэг", year: 2026, rating: "8.9", genre: "Шинжлэх Ухаан", duration: "2ц 15м", match: "96%", maturity: "16+", price: 9500, img: "https://picsum.photos/seed/singular27/400/225", backdrop: "https://picsum.photos/seed/singular27bg/1200/600", desc: "Хиймэл оюун ухаан ухамсартай болоход програмист амьдралын шинэ хэлбэрийн хувь заяаг шийдэх ёстой болно." },
      { id: 28, title: "Шидэт", year: 2025, rating: "7.8", genre: "Уран Зөгнөлт", duration: "2ц 05м", match: "88%", maturity: "12+", price: 7000, img: "https://picsum.photos/seed/enchant28/400/225", backdrop: "https://picsum.photos/seed/enchant28bg/1200/600", desc: "Номын санч эртний номон дахь түүхүүд бодит байдлыг дахин бичиж байгааг олж мэднэ." },
      { id: 29, title: "Хоосон Орон Зайн Аялагч", year: 2026, rating: "8.7", genre: "Шинжлэх Ухаан", duration: "2ц 20м", match: "94%", maturity: "16+", price: 9000, img: "https://picsum.photos/seed/void29/400/225", backdrop: "https://picsum.photos/seed/void29bg/1200/600", desc: "Сансрын цэрэг хэмжээсүүдийн хооронд шилжих чадвартай боловч шилжилт бүр түүний дурсамжийн нэг хэсгийг авна." },
      { id: 30, title: "Хаадын Хаант Улс", year: 2025, rating: "8.1", genre: "Уран Зөгнөлт", duration: "2ц 40м", match: "89%", maturity: "16+", price: 8000, img: "https://picsum.photos/seed/realm30/400/225", backdrop: "https://picsum.photos/seed/realm30bg/1200/600", desc: "Таван хаант улс зуу зууны өрсөлдөөнийг даван туулж, амьдыг чулуу болгох шидэт тахлын эсрэг тэмцэнэ." },
      { id: 39, title: "Цаг Хугацааны Нугалаа", year: 2026, rating: "8.5", genre: "Шинжлэх Ухаан", duration: "2ц 12м", match: "93%", maturity: "16+", price: 8500, img: "https://picsum.photos/seed/timefold39/400/225", backdrop: "https://picsum.photos/seed/timefold39bg/1200/600", desc: "Цаг хугацааг нугалах туршилт буруу болж, судлаачид өнгөрсөнд гацна." },
      { id: 40, title: "Сансрын Хил", year: 2025, rating: "8.3", genre: "Шинжлэх Ухаан", duration: "2ц 25м", match: "91%", maturity: "12+", price: 8000, img: "https://picsum.photos/seed/spaceborder40/400/225", backdrop: "https://picsum.photos/seed/spaceborder40bg/1200/600", desc: "Сансрын станцын багийнхан хар нүхний ойролцоо гайхалтай юм олж мэднэ." },
    ],
  },
];

const PLANS = [
  { id: "basic", name: "Суурь", price: "9,900₮", period: "/сар", color: "#6B7280", features: ["SD чанар (480p)", "1 төхөөрөмж", "Зар сурталчилгаатай", "Сарын 20 кино"], popular: false },
  { id: "standard", name: "Стандарт", price: "16,900₮", period: "/сар", color: "#7B2FBE", features: ["Full HD чанар (1080p)", "2 төхөөрөмж нэгэн зэрэг", "Зар сурталчилгаагүй", "Хязгааргүй кино", "Татаж авах боломж"], popular: true },
  { id: "premium", name: "Премиум", price: "24,900₮", period: "/сар", color: "#c471ed", features: ["4K Ultra HD + HDR", "4 төхөөрөмж нэгэн зэрэг", "Зар сурталчилгаагүй", "Хязгааргүй кино", "Татаж авах боломж", "Dolby Atmos дуу", "Эхний 7 хоног үнэгүй"], popular: false },
];

const FEATURED = CATEGORIES[0].movies[1];

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */
const Icon = ({ d, size = 20, fill = "none", stroke = "currentColor", sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{typeof d === "string" ? <path d={d} /> : d}</svg>
);

const PlayIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PlusIcon = ({ size = 20 }) => <Icon size={size} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
const CheckIcon = ({ size = 20 }) => <Icon size={size} d="M20 6L9 17l-5-5" />;
const ThumbIcon = ({ size = 20 }) => <Icon size={size} d={<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>} />;
const CloseIcon = ({ size = 24 }) => <Icon size={size} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />;
const SearchIcon = ({ size = 20 }) => <Icon size={size} d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;
const BellIcon = ({ size = 20 }) => <Icon size={size} d={<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>} />;
const ChevLeft = ({ size = 32 }) => <Icon size={size} d="M15 18l-6-6 6-6" sw={2.5} />;
const ChevRight = ({ size = 32 }) => <Icon size={size} d="M9 18l6-6-6-6" sw={2.5} />;
const StarIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const UserIcon = ({ size = 20 }) => <Icon size={size} d={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const EyeIcon = ({ size = 20 }) => <Icon size={size} d={<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>} />;
const EyeOffIcon = ({ size = 20 }) => <Icon size={size} d={<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>} />;
const VolumeIcon = ({ size = 22, muted }) => muted
  ? <Icon size={size} d={<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></>} />
  : <Icon size={size} d={<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></>} />;
const TagIcon = ({ size = 18 }) => <Icon size={size} d={<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>} />;
const HeartIcon = ({ size = 20, filled }) => filled
  ? <svg width={size} height={size} viewBox="0 0 24 24" fill="#e74c3c" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  : <Icon size={size} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;

/* ═══════════════════════════════════════════
   STYLES (shared)
   ═══════════════════════════════════════════ */
const btnCircle = (sz = 36) => ({
  width: sz, height: sz, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.08)", cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center", color: "#fff", transition: "all 0.2s",
});

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  ::-webkit-scrollbar{display:none}
  body{background:#0a0614;overflow-x:hidden;font-family:'Outfit',sans-serif}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
  @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
  input:-webkit-autofill{-webkit-box-shadow:0 0 0 30px #1a1028 inset!important;-webkit-text-fill-color:#fff!important}
`;

/* ═══════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════ */
function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!email.includes("@")) { setError("Зөв имэйл оруулна уу"); return; }
    if (pass.length < 4) { setError("Нууц үг хамгийн багадаа 4 тэмдэгт"); return; }
    if (isRegister && !name.trim()) { setError("Нэрээ оруулна уу"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ email, name: name || email.split("@")[0] }); }, 1200);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff",
    fontSize: 15, fontFamily: "'Outfit',sans-serif", outline: "none", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top, #1a0a2e 0%, #0a0614 60%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Outfit',sans-serif" }}>
      <style>{globalCSS}</style>
      <div style={{ position: "absolute", top: 30, left: 40 }}>
        <img src={logoImg} alt="Flimix" style={{ height: 44 }} />
      </div>
      <div style={{
        width: "100%", maxWidth: 420, padding: "48px 40px", borderRadius: 16,
        background: "rgba(20,12,35,0.85)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(138,43,226,0.15)", boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(138,43,226,0.08)",
        animation: "slideUp 0.5s ease",
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
          {isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 32 }}>
          {isRegister ? "Flimix-д тавтай морил" : "Та буцаад ирлээ!"}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {isRegister && (
            <input placeholder="Нэр" value={name} onChange={e => setName(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(138,43,226,0.6)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
          )}
          <input placeholder="Имэйл хаяг" type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(138,43,226,0.6)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
          <div style={{ position: "relative" }}>
            <input placeholder="Нууц үг" type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} style={{ ...inputStyle, paddingRight: 46 }} onFocus={e => e.target.style.borderColor = "rgba(138,43,226,0.6)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
            <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888" }}>
              {showPass ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>

        {error && <p style={{ color: "#e74c3c", fontSize: 13, marginTop: 12 }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: "100%", padding: "14px", marginTop: 24, borderRadius: 8, border: "none",
          background: loading ? "#555" : "linear-gradient(135deg, #7B2FBE, #c471ed)",
          color: "#fff", fontSize: 16, fontWeight: 700, cursor: loading ? "wait" : "pointer",
          fontFamily: "'Outfit',sans-serif", transition: "all 0.2s",
          boxShadow: "0 4px 20px rgba(138,43,226,0.3)",
        }}>
          {loading ? "Түр хүлээнэ үү..." : isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}
        </button>

        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
          <span style={{ color: "#888", fontSize: 14 }}>
            {isRegister ? "Бүртгэлтэй юу? " : "Шинэ хэрэглэгч? "}
          </span>
          <button onClick={() => { setIsRegister(!isRegister); setError(""); }} style={{ background: "none", border: "none", color: "#c471ed", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
            {isRegister ? "Нэвтрэх" : "Бүртгүүлэх"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOVIE ROW (Slider)
   ═══════════════════════════════════════════ */
function MovieRow({ category, onSelect, myList, toggleList, toggleLike, likes }) {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const check = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [check]);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth - 100), behavior: "smooth" });
  };

  const arrowStyle = (side) => ({
    position: "absolute", [side]: 0, top: 0, bottom: 0, width: 56, zIndex: 10,
    background: side === "left" ? "linear-gradient(to right, rgba(10,6,20,0.95), transparent)" : "linear-gradient(to left, rgba(10,6,20,0.95), transparent)",
    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
    opacity: 0, transition: "opacity 0.3s",
  });

  return (
    <div style={{ marginBottom: 44, position: "relative" }}
      onMouseEnter={e => { e.currentTarget.querySelectorAll('.row-arrow').forEach(a => a.style.opacity = '1'); }}
      onMouseLeave={e => { e.currentTarget.querySelectorAll('.row-arrow').forEach(a => a.style.opacity = '0'); }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#e5e5e5", margin: "0 0 14px 56px", letterSpacing: "0.01em" }}>{category.title}</h2>
      <div style={{ position: "relative" }}>
        {showLeft && <button className="row-arrow" onClick={() => scroll(-1)} style={arrowStyle("left")}><ChevLeft /></button>}
        {showRight && <button className="row-arrow" onClick={() => scroll(1)} style={arrowStyle("right")}><ChevRight /></button>}
        <div ref={rowRef} style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", padding: "8px 56px", scrollSnapType: "x mandatory" }}>
          {category.movies.map(m => (
            <MovieCard key={m.id} movie={m} onSelect={onSelect} inList={myList.has(m.id)} toggleList={toggleList} liked={likes.has(m.id)} toggleLike={toggleLike} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOVIE CARD
   ═══════════════════════════════════════════ */
function MovieCard({ movie, onSelect, inList, toggleList, liked, toggleLike }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 250, maxWidth: 250, cursor: "pointer", scrollSnapAlign: "start", borderRadius: 8,
        overflow: "hidden", position: "relative", flexShrink: 0,
        transform: hovered ? "scale(1.12)" : "scale(1)", zIndex: hovered ? 10 : 1,
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
        boxShadow: hovered ? "0 16px 48px rgba(138,43,226,0.4)" : "0 2px 8px rgba(0,0,0,0.3)",
      }}>
      <div onClick={() => onSelect(movie)}>
        <img src={movie.img} alt={movie.title} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} loading="lazy" />
      </div>
      {hovered && (
        <div style={{
          background: "#1a1028", padding: "12px 14px",
          borderTop: "2px solid rgba(138,43,226,0.5)",
        }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            <button onClick={() => onSelect(movie)} style={{ ...btnCircle(32), background: "#fff", color: "#0a0614", border: "none" }}><PlayIcon size={16} /></button>
            <button onClick={(e) => { e.stopPropagation(); toggleList(movie.id); }} style={{ ...btnCircle(32), borderColor: inList ? "#7B2FBE" : undefined, background: inList ? "rgba(123,47,190,0.3)" : undefined }}>
              {inList ? <CheckIcon size={14} /> : <PlusIcon size={14} />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); toggleLike(movie.id); }} style={{ ...btnCircle(32), borderColor: liked ? "#e74c3c" : undefined }}>
              <HeartIcon size={14} filled={liked} />
            </button>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e5e5e5" }}>{movie.title}</div>
          <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#999", marginTop: 3, alignItems: "center" }}>
            <span style={{ color: "#7B2FBE", fontWeight: 600 }}>{movie.match}</span>
            <span style={{ padding: "1px 4px", border: "1px solid #555", borderRadius: 2, fontSize: 10 }}>{movie.maturity}</span>
            <span>{movie.duration}</span>
          </div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
            <TagIcon size={12} />
            <span style={{ color: "#c471ed", fontWeight: 600 }}>{movie.price.toLocaleString()}₮</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIDEO PLAYER
   ═══════════════════════════════════════════ */
function VideoPlayer({ movie, onClose }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(p => p >= 100 ? (setPlaying(false), 100) : p + 0.15), 100);
    return () => clearInterval(iv);
  }, [playing]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "#000", animation: "fadeIn 0.3s" }}>
      <img src={movie.backdrop} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
      {/* Center Play/Pause */}
      <button onClick={() => setPlaying(!playing)} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: "50%", background: "rgba(138,43,226,0.5)", backdropFilter: "blur(10px)", border: "2px solid rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all 0.2s" }}>
        {playing
          ? <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          : <PlayIcon size={36} />}
      </button>
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{movie.title}</div>
        <button onClick={onClose} style={{ ...btnCircle(40), background: "rgba(255,255,255,0.1)" }}><CloseIcon size={20} /></button>
      </div>
      {/* Bottom controls */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px 30px 24px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
        {/* Progress bar */}
        <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, cursor: "pointer", marginBottom: 16 }} onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProgress((e.clientX - r.left) / r.width * 100); }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #7B2FBE, #c471ed)", borderRadius: 2, transition: "width 0.1s linear" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button onClick={() => setPlaying(!playing)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
              {playing ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <PlayIcon size={22} />}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setVolume(v => v > 0 ? 0 : 80)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
                <VolumeIcon size={20} muted={volume === 0} />
              </button>
              <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(+e.target.value)} style={{ width: 80, accentColor: "#7B2FBE" }} />
            </div>
            <span style={{ fontSize: 13, color: "#aaa" }}>{Math.floor(progress * 1.12)}:00 / 1:52:00</span>
          </div>
          <span style={{ fontSize: 13, color: "#888" }}>HD</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOVIE MODAL
   ═══════════════════════════════════════════ */
function MovieModal({ movie, onClose, onPlay, inList, toggleList, liked, toggleLike }) {
  if (!movie) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.25s" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "90%", maxWidth: 850, maxHeight: "90vh", overflowY: "auto", background: "#181024", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(138,43,226,0.15)", scrollbarWidth: "none" }}>
        <div style={{ position: "relative", width: "100%", height: 400 }}>
          <img src={movie.backdrop} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #181024 5%, transparent 50%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, ...btnCircle(36), background: "rgba(10,6,20,0.7)" }}><CloseIcon size={20} /></button>
          <div style={{ position: "absolute", bottom: 30, left: 36 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{movie.title}</h1>
            <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center" }}>
              <button onClick={() => onPlay(movie)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 28px", background: "#fff", color: "#0a0614", border: "none", borderRadius: 4, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                <PlayIcon size={22} /> Тоглуулах
              </button>
              <button onClick={() => toggleList(movie.id)} style={{ ...btnCircle(42), background: inList ? "rgba(123,47,190,0.4)" : undefined, borderColor: inList ? "#7B2FBE" : undefined }}>
                {inList ? <CheckIcon size={20} /> : <PlusIcon size={20} />}
              </button>
              <button onClick={() => toggleLike(movie.id)} style={{ ...btnCircle(42), borderColor: liked ? "#e74c3c" : undefined }}>
                <HeartIcon size={20} filled={liked} />
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "0 36px 36px" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ color: "#7B2FBE", fontWeight: 700, fontSize: 15 }}>{movie.match} Тохирол</span>
            <span style={{ color: "#aaa", fontSize: 14 }}>{movie.year}</span>
            <span style={{ padding: "2px 6px", border: "1px solid #555", borderRadius: 3, fontSize: 12, color: "#aaa" }}>{movie.maturity}</span>
            <span style={{ color: "#aaa", fontSize: 14 }}>{movie.duration}</span>
            <span style={{ padding: "2px 6px", border: "1px solid #555", borderRadius: 3, fontSize: 12, color: "#aaa" }}>HD</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "center" }}>
            <StarIcon /> <span style={{ color: "#f5c518", fontWeight: 700, fontSize: 15 }}>{movie.rating}</span><span style={{ color: "#777", fontSize: 14 }}>/10</span>
          </div>
          <p style={{ color: "#d2d2d2", fontSize: 15, lineHeight: 1.6, maxWidth: 550 }}>{movie.desc}</p>
          <div style={{ marginTop: 20, display: "flex", gap: 24, fontSize: 13, color: "#888", flexWrap: "wrap" }}>
            <div><span style={{ color: "#555" }}>Төрөл: </span><span style={{ color: "#bbb" }}>{movie.genre}</span></div>
          </div>
          {/* Price section */}
          <div style={{ marginTop: 24, padding: "20px 24px", background: "rgba(138,43,226,0.08)", borderRadius: 10, border: "1px solid rgba(138,43,226,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Ганц кино түрээс</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#c471ed" }}>{movie.price.toLocaleString()}₮</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>48 цагийн хандалт</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Эсвэл багц авбал</div>
                <div style={{ fontSize: 14, color: "#7B2FBE", fontWeight: 600 }}>Бүх кино хязгааргүй</div>
                <div style={{ fontSize: 12, color: "#666" }}>Сарын 9,900₮-с эхлэн</div>
              </div>
            </div>
            <button onClick={() => onPlay(movie)} style={{
              width: "100%", padding: "12px", marginTop: 16, borderRadius: 8, border: "none",
              background: "linear-gradient(135deg, #7B2FBE, #c471ed)", color: "#fff",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif",
            }}>
              {movie.price.toLocaleString()}₮ төлж үзэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRICING PAGE
   ═══════════════════════════════════════════ */
function PricingPage({ onBack }) {
  const [selected, setSelected] = useState("standard");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0614", padding: "100px 20px 60px", fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 50px" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12, background: "linear-gradient(135deg, #fff 50%, #c471ed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Багц сонгох
        </h1>
        <p style={{ color: "#888", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
          Өөрт тохирох багцаа сонгоод хязгааргүй кино, цуврал үзээрэй
        </p>
      </div>

      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", maxWidth: 1000, margin: "0 auto" }}>
        {PLANS.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)} style={{
            flex: "1 1 280px", maxWidth: 320, padding: plan.popular ? "3px" : 0,
            borderRadius: 18, cursor: "pointer",
            background: plan.popular ? "linear-gradient(135deg, #7B2FBE, #c471ed)" : "transparent",
            transition: "transform 0.3s", transform: selected === plan.id ? "scale(1.04)" : "scale(1)",
          }}>
            <div style={{
              padding: "36px 28px", borderRadius: plan.popular ? 16 : 18, height: "100%",
              background: "#140c23", border: plan.popular ? "none" : `1px solid ${selected === plan.id ? "rgba(138,43,226,0.5)" : "rgba(255,255,255,0.06)"}`,
              position: "relative",
            }}>
              {plan.popular && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 20, background: "linear-gradient(135deg, #7B2FBE, #c471ed)", fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                  Хамгийн түгээмэл
                </div>
              )}
              <div style={{ fontSize: 18, fontWeight: 700, color: plan.color, marginBottom: 8, marginTop: plan.popular ? 8 : 0 }}>{plan.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: "#888" }}>{plan.period}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "#ccc" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${plan.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <button style={{
                width: "100%", padding: "14px", marginTop: 28, borderRadius: 10, border: "none",
                background: selected === plan.id ? `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` : "rgba(255,255,255,0.06)",
                color: selected === plan.id ? "#fff" : "#aaa",
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif",
                transition: "all 0.2s",
              }}>
                {selected === plan.id ? "Багц авах" : "Сонгох"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Individual movie pricing */}
      <div style={{ maxWidth: 700, margin: "60px auto 0", textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Ганц кино түрээслэх</h2>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>Багц авахгүйгээр хүссэн киногоо тус тусад нь түрээслэх боломжтой</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[{ label: "Шинэ кино", range: "8,500₮ – 10,000₮", desc: "48 цагийн хандалт" }, { label: "Каталог кино", range: "5,000₮ – 7,500₮", desc: "48 цагийн хандалт" }, { label: "Эрт хандалт", range: "12,500₮ – 15,000₮", desc: "Кинотеатрт гарахаас өмнө" }].map((item, i) => (
            <div key={i} style={{ flex: "1 1 180px", maxWidth: 220, padding: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#c471ed", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{item.range}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NOTIFICATION DROPDOWN
   ═══════════════════════════════════════════ */
function NotifDropdown({ show }) {
  if (!show) return null;
  const notifs = [
    { text: "\"Сүүлчийн Дохио\" шинээр нэмэгдлээ!", time: "2 цагийн өмнө" },
    { text: "Премиум багц 30% хямдарлаа", time: "5 цагийн өмнө" },
    { text: "\"Одны Унал\" маргааш гарна", time: "Өчигдөр" },
  ];
  return (
    <div style={{ position: "absolute", top: 50, right: 0, width: 320, background: "rgba(24,16,36,0.97)", backdropFilter: "blur(12px)", borderRadius: 10, border: "1px solid rgba(138,43,226,0.2)", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", overflow: "hidden", animation: "fadeIn 0.2s", zIndex: 200 }}>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 14, fontWeight: 700, color: "#fff" }}>Мэдэгдэл</div>
      {notifs.map((n, i) => (
        <div key={i} style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(138,43,226,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <div style={{ fontSize: 13, color: "#ddd" }}>{n.text}</div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>{n.time}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════ */
function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", padding: "12px 28px", background: "rgba(138,43,226,0.9)", backdropFilter: "blur(10px)", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 600, zIndex: 3000, animation: "slideUp 0.3s ease", boxShadow: "0 8px 24px rgba(138,43,226,0.3)" }}>
      {message}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function FlimixApp() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [muted, setMuted] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [myList, setMyList] = useState(new Set());
  const [likes, setLikes] = useState(new Set());
  const [showNotif, setShowNotif] = useState(false);
  const [toast, setToast] = useState({ msg: "", show: false });

  const showToast = (msg) => { setToast({ msg, show: true }); setTimeout(() => setToast({ msg: "", show: false }), 2000); };

  const toggleList = (id) => {
    setMyList(prev => { const n = new Set(prev); if (n.has(id)) { n.delete(id); showToast("Жагсаалтаас хасагдлаа"); } else { n.add(id); showToast("Миний жагсаалтад нэмэгдлээ ✓"); } return n; });
  };
  const toggleLike = (id) => {
    setLikes(prev => { const n = new Set(prev); if (n.has(id)) { n.delete(id); } else { n.add(id); showToast("Таалагдлаа ♥"); } return n; });
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!user) return <><style>{globalCSS}</style><LoginPage onLogin={setUser} /></>;
  if (playingMovie) return <><style>{globalCSS}</style><VideoPlayer movie={playingMovie} onClose={() => setPlayingMovie(null)} /></>;

  const allMovies = CATEGORIES.flatMap(c => c.movies);
  const myListMovies = allMovies.filter(m => myList.has(m.id));

  const filteredCategories = searchQuery.trim()
    ? CATEGORIES.map(c => ({ ...c, movies: c.movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.genre.toLowerCase().includes(searchQuery.toLowerCase())) })).filter(c => c.movies.length > 0)
    : CATEGORIES;

  const NAV_ITEMS = [
    { key: "home", label: "Нүүр" },
    { key: "movies", label: "Кино" },
    { key: "mylist", label: "Миний Жагсаалт" },
    { key: "pricing", label: "Үнийн Мэдээлэл" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0614", color: "#fff", fontFamily: "'Outfit',sans-serif" }}>
      <style>{globalCSS}</style>

      {/* ─── Navbar ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", height: 68,
        background: scrolled ? "rgba(10,6,20,0.95)" : "linear-gradient(180deg, rgba(10,6,20,0.8) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.35s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <img src={logoImg} alt="Flimix" style={{ height: 40, cursor: "pointer" }} onClick={() => { setPage("home"); setSearchQuery(""); }} />
          <div style={{ display: "flex", gap: 24 }}>
            {NAV_ITEMS.map(item => (
              <a key={item.key} href="#" onClick={e => { e.preventDefault(); setPage(item.key); setSearchQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ color: page === item.key ? "#fff" : "#b3b3b3", textDecoration: "none", fontSize: 14, fontWeight: page === item.key ? 600 : 400, transition: "color 0.2s", position: "relative" }}
                onMouseEnter={e => e.currentTarget.style.color = "#e0b0ff"}
                onMouseLeave={e => e.currentTarget.style.color = page === item.key ? "#fff" : "#b3b3b3"}
              >
                {item.label}
                {page === item.key && <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: "#7B2FBE", borderRadius: 1 }} />}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {searchOpen && (
              <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Нэр, төрөл хайх..." onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                style={{ width: 220, height: 34, background: "rgba(10,6,20,0.9)", border: "1px solid rgba(138,43,226,0.5)", borderRadius: 4, padding: "0 12px 0 36px", color: "#fff", fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: "none", marginRight: 4 }} />
            )}
            <button onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", position: searchOpen ? "absolute" : "relative", left: searchOpen ? 8 : undefined }}>
              <SearchIcon />
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowNotif(!showNotif)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", position: "relative" }}>
              <BellIcon />
              <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#e74c3c" }} />
            </button>
            <NotifDropdown show={showNotif} />
          </div>
          <div onClick={() => showToast(`Сайн уу, ${user.name}!`)} style={{ width: 34, height: 34, borderRadius: 6, background: "linear-gradient(135deg, #7B2FBE, #c471ed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </nav>

      {/* ─── Pricing Page ─── */}
      {page === "pricing" && <PricingPage />}

      {/* ─── My List Page ─── */}
      {page === "mylist" && (
        <div style={{ paddingTop: 100, minHeight: "80vh" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 56px 30px" }}>Миний Жагсаалт</h1>
          {myListMovies.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#666" }}>
              <PlusIcon size={48} />
              <p style={{ marginTop: 16, fontSize: 16 }}>Жагсаалт хоосон байна</p>
              <p style={{ fontSize: 14, color: "#555", marginTop: 4 }}>Кино дээрх + товчийг дарж нэмээрэй</p>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "0 56px" }}>
              {myListMovies.map(m => <MovieCard key={m.id} movie={m} onSelect={setSelectedMovie} inList={true} toggleList={toggleList} liked={likes.has(m.id)} toggleLike={toggleLike} />)}
            </div>
          )}
        </div>
      )}

      {/* ─── Home / Movies ─── */}
      {(page === "home" || page === "movies") && (
        <>
          {/* Hero */}
          <div style={{ position: "relative", height: "85vh", minHeight: 500 }}>
            <img src={FEATURED.backdrop} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,6,20,0.9) 0%, rgba(10,6,20,0.4) 50%, rgba(10,6,20,0.1) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0614 0%, transparent 40%)" }} />
            <div style={{ position: "absolute", bottom: "18%", left: 56, animation: "slideUp 0.8s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <img src={logoImg} alt="" style={{ height: 22 }} />
                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 3, color: "#c471ed", textTransform: "uppercase" }}>Эх Бүтээл</span>
              </div>
              <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.05, maxWidth: 600, textShadow: "0 4px 30px rgba(0,0,0,0.5)", background: "linear-gradient(135deg, #fff 60%, #c471ed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 16 }}>
                {FEATURED.title}
              </h1>
              <p style={{ fontSize: 16, color: "#ccc", maxWidth: 450, lineHeight: 1.5, marginBottom: 24 }}>{FEATURED.desc}</p>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button onClick={() => setPlayingMovie(FEATURED)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 32px", background: "#fff", color: "#0a0614", border: "none", borderRadius: 4, fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                  <PlayIcon size={24} /> Тоглуулах
                </button>
                <button onClick={() => setSelectedMovie(FEATURED)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 28px", background: "rgba(138,43,226,0.35)", color: "#fff", border: "none", borderRadius: 4, fontSize: 17, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", backdropFilter: "blur(4px)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> Дэлгэрэнгүй
                </button>
              </div>
            </div>
            <button onClick={() => setMuted(!muted)} style={{ position: "absolute", bottom: "18%", right: 56, ...btnCircle(42), background: "rgba(255,255,255,0.08)" }}>
              <VolumeIcon muted={muted} />
            </button>
            <div style={{ position: "absolute", bottom: "18%", right: 110, padding: "4px 14px", background: "rgba(10,6,20,0.6)", borderLeft: "3px solid rgba(138,43,226,0.7)", fontSize: 14, color: "#ccc" }}>{FEATURED.maturity}</div>
          </div>

          {/* Rows */}
          <div style={{ position: "relative", zIndex: 2, marginTop: -80 }}>
            {filteredCategories.map((cat, i) => (
              <MovieRow key={i} category={cat} onSelect={setSelectedMovie} myList={myList} toggleList={toggleList} likes={likes} toggleLike={toggleLike} />
            ))}
            {filteredCategories.length === 0 && searchQuery && (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#777", fontSize: 18 }}>
                "{searchQuery}" хайлтаар илэрц олдсонгүй
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <footer style={{ padding: "60px 56px 40px", marginTop: 40, borderTop: "1px solid rgba(138,43,226,0.15)" }}>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 30 }}>
          {["Түгээмэл Асуулт", "Тусламжийн Төв", "Хаяг", "Холбоо Барих", "Нууцлал", "Үйлчилгээний Нөхцөл"].map((item, i) => (
            <a key={i} href="#" onClick={e => e.preventDefault()} style={{ color: "#555", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c471ed"}
              onMouseLeave={e => e.currentTarget.style.color = "#555"}
            >{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logoImg} alt="Flimix" style={{ height: 24, opacity: 0.5 }} />
          <span style={{ color: "#333", fontSize: 12 }}>© 2026 Flimix, Inc.</span>
        </div>
      </footer>

      {/* Modal & Toast */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} onPlay={(m) => { setSelectedMovie(null); setPlayingMovie(m); }}
        inList={selectedMovie ? myList.has(selectedMovie.id) : false} toggleList={toggleList}
        liked={selectedMovie ? likes.has(selectedMovie.id) : false} toggleLike={toggleLike} />
      <Toast message={toast.msg} show={toast.show} />

      {/* Close notif on click outside */}
      {showNotif && <div onClick={() => setShowNotif(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />}
    </div>
  );
}
