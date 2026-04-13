/**
 * ============================================================
 *  RESTAURANT TEMPLATE — CONFIG FILE
 *  Edit this file to customize the website for each client.
 *  All components read from here — nothing else needs changing.
 * ============================================================
 */

export type DietaryTag = "vegan" | "vegetarian" | "spicy" | "glutenFree" | "chefSpecial";
export type GalleryCategory = "all" | "interior" | "food" | "events";
export type ReviewSource = "google" | "tripadvisor";
export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  currency: string;
  dietary: DietaryTag[];
  pairsWith: string[];          // item names that pair well (upsell)
  image: string;
  featured?: boolean;
}

export interface MenuCategory {
  id: string;
  category: string;
  categoryAr: string;
  items: MenuItem[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  altAr: string;
  category: GalleryCategory;
  width?: number;
  height?: number;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  textAr?: string;
  source: ReviewSource;
  date?: string;
}

export interface DayHours {
  open: string;    // "HH:MM" 24h format
  close: string;   // "HH:MM" 24h format — use "00:00" for midnight, "02:00" for 2 AM next day
  closed?: boolean;
}

export interface HolidayOverride {
  date: string;   // "YYYY-MM-DD"
  label: string;
  labelAr: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

const restaurant = {
  // ── Identity ────────────────────────────────────────────
  name: "Ember & Stone",
  nameAr: "إمبر وستون",
  tagline: "Where Fire Meets Flavor",
  taglineAr: "حيث تلتقي النار بالنكهة",
  cuisine: "Modern Mediterranean",
  cuisineAr: "متوسطي عصري",
  city: "Abu Dhabi",
  cityAr: "أبوظبي",

  // ── Contact ─────────────────────────────────────────────
  phone: "+971-2-555-0199",
  whatsapp: "+97125550199",           // digits only for wa.me link
  email: "hello@emberandstone.ae",

  // ── Location ────────────────────────────────────────────
  address: "Level 2, Al Maryah Island, Abu Dhabi, UAE",
  addressAr: "الطابق الثاني، جزيرة الماريه، أبوظبي، الإمارات",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.9623!2d54.3773!3d24.4961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI5JzQ2LjAiTiA1NMKwMjInMzguMyJF!5e0!3m2!1sen!2sae!4v1700000000000",

  // ── Social ──────────────────────────────────────────────
  instagramHandle: "@emberandstone.ae",
  social: {
    instagram: "https://instagram.com/emberandstone.ae",
    facebook:  "https://facebook.com/emberandstone",
    tiktok:    "https://tiktok.com/@emberandstone.ae",
  } as SocialLinks,

  // ── Media ───────────────────────────────────────────────
  heroVideo: "/video/hero.mp4",
  heroFallbackImage: "/images/hero-fallback.jpg",
  logo: "/images/logo.svg",
  logoAlt: "Ember & Stone",

  // ── Reservations ───────────────────────────────────────
  // Set openTableId to a real OpenTable restaurant ID to show their widget instead of the custom form
  openTableId: null as string | null,

  // ── Operating Hours ────────────────────────────────────
  hours: {
    monday:    { open: "12:00", close: "23:00" },
    tuesday:   { open: "12:00", close: "23:00" },
    wednesday: { open: "12:00", close: "23:00" },
    thursday:  { open: "12:00", close: "23:30" },
    friday:    { open: "12:00", close: "00:30" },
    saturday:  { open: "12:00", close: "00:30" },
    sunday:    { open: "12:00", close: "23:00" },
  } as Record<DayOfWeek, DayHours>,

  holidayOverrides: [
    {
      date: "2024-12-31",
      label: "New Year's Eve — Special Hours",
      labelAr: "ليلة رأس السنة — ساعات خاصة",
      open: "18:00",
      close: "03:00",
    },
    {
      date: "2024-12-25",
      label: "Christmas Day",
      labelAr: "عيد الميلاد",
      open: "13:00",
      close: "23:00",
    },
  ] as HolidayOverride[],

  // ── Menu ───────────────────────────────────────────────
  menu: [
    {
      id: "appetizers",
      category: "Appetizers",
      categoryAr: "المقبلات",
      items: [
        {
          id: "burrata",
          name: "Heirloom Burrata",
          nameAr: "بوراتا الإرث",
          description: "Creamy burrata with roasted heirloom tomatoes, aged balsamic, and fresh basil oil.",
          descriptionAr: "بوراتا كريمية مع طماطم إرثية مشوية، وخل بلسميك معتق، وزيت الريحان الطازج.",
          price: 78,
          currency: "AED",
          dietary: ["vegetarian", "glutenFree"] as DietaryTag[],
          pairsWith: ["Saffron Arancini", "Ember Flatbread"],
          image: "/images/menu/burrata.jpg",
          featured: true,
        },
        {
          id: "arancini",
          name: "Saffron Arancini",
          nameAr: "أرانشيني الزعفران",
          description: "Crispy risotto balls with saffron and mozzarella, served with roasted pepper aioli.",
          descriptionAr: "كرات ريزوتو مقرمشة بالزعفران والموزاريلا، مع صلصة الفلفل المشوي.",
          price: 65,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: ["Heirloom Burrata"],
          image: "/images/menu/arancini.jpg",
        },
        {
          id: "octopus",
          name: "Charred Octopus",
          nameAr: "أخطبوط مشوي على الفحم",
          description: "Wood-fire grilled octopus, smoked paprika potato, capers, and herb vinaigrette.",
          descriptionAr: "أخطبوط مشوي على نار الخشب، بطاطا بالفلفل المدخن، كبر، ومرق الأعشاب.",
          price: 92,
          currency: "AED",
          dietary: ["glutenFree"] as DietaryTag[],
          pairsWith: ["Stone Bass Crudo"],
          image: "/images/menu/octopus.jpg",
          featured: true,
        },
        {
          id: "flatbread",
          name: "Ember Flatbread",
          nameAr: "خبز الفطير من إمبر",
          description: "Stone-baked flatbread with truffle, fontina, roasted garlic, and crispy sage.",
          descriptionAr: "خبز مسطح مخبوز على حجر مع الكمأة، وجبن فونتينا، وثوم مشوي، ومريمية مقرمشة.",
          price: 55,
          currency: "AED",
          dietary: ["vegetarian", "chefSpecial"] as DietaryTag[],
          pairsWith: ["Heirloom Burrata", "Saffron Arancini"],
          image: "/images/menu/flatbread.jpg",
        },
      ],
    },
    {
      id: "mains",
      category: "Mains",
      categoryAr: "الأطباق الرئيسية",
      items: [
        {
          id: "wagyu",
          name: "Wagyu Striploin",
          nameAr: "سترلوين واغيو",
          description: "250g A4 Wagyu striploin, truffle butter, roasted bone marrow, and ember-roasted vegetables.",
          descriptionAr: "٢٥٠ جرام سترلوين واغيو A4 مع زبدة الكمأة، ونخاع العظم المشوي، والخضار المشوي على الجمر.",
          price: 285,
          currency: "AED",
          dietary: ["glutenFree", "chefSpecial"] as DietaryTag[],
          pairsWith: ["Truffle Mac & Cheese", "Roasted Heirloom Carrots"],
          image: "/images/menu/wagyu.jpg",
          featured: true,
        },
        {
          id: "seabass",
          name: "Stone Bass Crudo",
          nameAr: "كرودو سمك الشيم",
          description: "Line-caught stone bass, pomelo ponzu, compressed cucumber, and ikura.",
          descriptionAr: "سمك شيم طازج، بونزو البوميلو، خيار مضغوط، وإيكورا.",
          price: 165,
          currency: "AED",
          dietary: ["glutenFree"] as DietaryTag[],
          pairsWith: ["Saffron Arancini", "Charred Octopus"],
          image: "/images/menu/seabass.jpg",
          featured: true,
        },
        {
          id: "lamb",
          name: "Slow-Roasted Lamb Shoulder",
          nameAr: "كتف الخروف المشوي ببطء",
          description: "12-hour slow-roasted lamb with pomegranate harissa, labneh, and warm pita.",
          descriptionAr: "كتف خروف مشوي لـ١٢ ساعة مع هريسة الرمان، لبنة، وخبز البيتا الدافئ.",
          price: 178,
          currency: "AED",
          dietary: ["spicy"] as DietaryTag[],
          pairsWith: ["Roasted Heirloom Carrots", "Ember Flatbread"],
          image: "/images/menu/lamb.jpg",
        },
        {
          id: "mushroom-pasta",
          name: "Wild Mushroom Tagliatelle",
          nameAr: "تاليولاتيلي الفطر البري",
          description: "Hand-rolled pasta, wild mushroom ragù, aged pecorino, and black truffle.",
          descriptionAr: "معكرونة محلية الصنع، راغو الفطر البري، بيكورينو معتق، وكمأة سوداء.",
          price: 125,
          currency: "AED",
          dietary: ["vegetarian", "chefSpecial"] as DietaryTag[],
          pairsWith: ["Heirloom Burrata", "Ember Flatbread"],
          image: "/images/menu/pasta.jpg",
          featured: true,
        },
      ],
    },
    {
      id: "sides",
      category: "Sides",
      categoryAr: "الأطباق الجانبية",
      items: [
        {
          id: "truffle-mac",
          name: "Truffle Mac & Cheese",
          nameAr: "مكرونة بالجبن والكمأة",
          description: "Aged cheddar béchamel, black truffle, crispy pancetta crumbs.",
          descriptionAr: "بيشاميل الشيدر المعتق، كمأة سوداء، فتات البانشيتا المقرمشة.",
          price: 48,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: ["Wagyu Striploin"],
          image: "/images/menu/mac.jpg",
        },
        {
          id: "carrots",
          name: "Roasted Heirloom Carrots",
          nameAr: "جزر إرثي مشوي",
          description: "Glazed with miso honey, toasted hazelnuts, and dill yogurt.",
          descriptionAr: "مزجج بعسل الميزو، مع البندق المحمص، وزبادي الشبت.",
          price: 38,
          currency: "AED",
          dietary: ["vegan", "glutenFree"] as DietaryTag[],
          pairsWith: ["Wagyu Striploin", "Slow-Roasted Lamb Shoulder"],
          image: "/images/menu/carrots.jpg",
        },
      ],
    },
    {
      id: "desserts",
      category: "Desserts",
      categoryAr: "الحلويات",
      items: [
        {
          id: "chocolate",
          name: "Dark Chocolate Lava",
          nameAr: "كيكة الشوكولاتة الداكنة المنصهرة",
          description: "Valrhona 70% lava cake, salted caramel ice cream, and spiced cocoa tuile.",
          descriptionAr: "كيك بفالرونا ٧٠٪، آيس كريم الكراميل المملح، وتويلي الكاكاو بالتوابل.",
          price: 62,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: [],
          image: "/images/menu/chocolate.jpg",
          featured: true,
        },
        {
          id: "baklava",
          name: "Pistachio Baklava Cheesecake",
          nameAr: "تشيز كيك البقلاوة بالفستق",
          description: "Levantine-inspired cheesecake with pistachio baklava crust and rose water cream.",
          descriptionAr: "تشيز كيك مستوحى من بلاد الشام مع قاعدة بقلاوة الفستق وكريمة ماء الورد.",
          price: 58,
          currency: "AED",
          dietary: ["vegetarian", "chefSpecial"] as DietaryTag[],
          pairsWith: [],
          image: "/images/menu/baklava.jpg",
          featured: true,
        },
      ],
    },
    {
      id: "drinks",
      category: "Drinks",
      categoryAr: "المشروبات",
      items: [
        {
          id: "lemonade",
          name: "Ember Lemonade",
          nameAr: "ليمونادة إمبر",
          description: "House-pressed lemon, rose water, basil, and sparkling water.",
          descriptionAr: "عصير ليمون طازج، ماء الورد، ريحان، وماء فوار.",
          price: 32,
          currency: "AED",
          dietary: ["vegan", "glutenFree"] as DietaryTag[],
          pairsWith: [],
          image: "/images/menu/lemonade.jpg",
        },
        {
          id: "arabic-coffee",
          name: "Arabic Coffee",
          nameAr: "قهوة عربية",
          description: "Traditional qahwa with cardamom, saffron, and dates.",
          descriptionAr: "قهوة عربية تقليدية مع الهيل والزعفران والتمر.",
          price: 28,
          currency: "AED",
          dietary: ["vegan", "glutenFree"] as DietaryTag[],
          pairsWith: ["Pistachio Baklava Cheesecake"],
          image: "/images/menu/coffee.jpg",
        },
      ],
    },
  ] as MenuCategory[],

  // ── Gallery ────────────────────────────────────────────
  gallery: [
    { src: "/images/gallery/interior-1.jpg", alt: "Dining Room", altAr: "قاعة الطعام", category: "interior" as GalleryCategory },
    { src: "/images/gallery/interior-2.jpg", alt: "The Bar", altAr: "البار", category: "interior" as GalleryCategory },
    { src: "/images/gallery/interior-3.jpg", alt: "Private Dining", altAr: "الطعام الخاص", category: "interior" as GalleryCategory },
    { src: "/images/gallery/food-1.jpg",     alt: "Wagyu Striploin", altAr: "سترلوين واغيو", category: "food" as GalleryCategory },
    { src: "/images/gallery/food-2.jpg",     alt: "Charred Octopus", altAr: "أخطبوط مشوي", category: "food" as GalleryCategory },
    { src: "/images/gallery/food-3.jpg",     alt: "Heirloom Burrata", altAr: "بوراتا الإرث", category: "food" as GalleryCategory },
    { src: "/images/gallery/food-4.jpg",     alt: "Pistachio Baklava Cheesecake", altAr: "تشيز كيك البقلاوة", category: "food" as GalleryCategory },
    { src: "/images/gallery/food-5.jpg",     alt: "Dark Chocolate Lava", altAr: "كيكة الشوكولاتة", category: "food" as GalleryCategory },
    { src: "/images/gallery/events-1.jpg",   alt: "Private Event", altAr: "مناسبة خاصة", category: "events" as GalleryCategory },
    { src: "/images/gallery/events-2.jpg",   alt: "Corporate Dinner", altAr: "عشاء شركات", category: "events" as GalleryCategory },
  ] as GalleryImage[],

  // ── Reviews ────────────────────────────────────────────
  reviews: [
    {
      author: "Sarah Al-Rashid",
      rating: 5,
      text: "An extraordinary dining experience. The Wagyu striploin was perfectly cooked and the ambiance is truly world-class. Easily the best restaurant in Abu Dhabi.",
      textAr: "تجربة طعام استثنائية. كان سترلوين واغيو مطهوًا بشكل مثالي والأجواء على مستوى عالمي. بلا شك أفضل مطعم في أبوظبي.",
      source: "google" as ReviewSource,
      date: "December 2024",
    },
    {
      author: "James Worthington",
      rating: 5,
      text: "The slow-roasted lamb shoulder melted in my mouth. Staff were attentive without being intrusive. We'll be back for every special occasion.",
      source: "tripadvisor" as ReviewSource,
      date: "November 2024",
    },
    {
      author: "Fatima Hassan",
      rating: 5,
      text: "The pistachio baklava cheesecake is a work of art. Beautifully balanced between Lebanese tradition and modern technique.",
      textAr: "تشيز كيك البقلاوة بالفستق تحفة فنية. توازن جميل بين التراث اللبناني والأسلوب العصري.",
      source: "google" as ReviewSource,
      date: "November 2024",
    },
  ] as Review[],

  // ── About ───────────────────────────────────────────────
  about: {
    headline: "A Love Letter to the Mediterranean",
    headlineAr: "رسالة حب إلى البحر الأبيض المتوسط",
    story: `Ember & Stone was born from a single obsession: fire. Executive Chef Marco Elia spent years traveling the coastlines of Lebanon, Greece, and Spain, learning how a live flame transforms the simplest ingredients into something transcendent.\n\nIn 2021, he brought that obsession to Abu Dhabi — pairing the bold, sun-drenched flavors of the Mediterranean with the finest local and regional produce. Every dish at Ember & Stone is a conversation between ancient technique and modern ambition.`,
    storyAr: `وُلد مطعم إمبر وستون من هوس واحد: النار. أمضى الشيف التنفيذي ماركو إيليا سنوات في التجوال على طول سواحل لبنان واليونان وإسبانيا، يتعلم كيف تحوّل اللهب الحي أبسط المكونات إلى شيء استثنائي.\n\nفي عام ٢٠٢١، أحضر هذا الشغف إلى أبوظبي — جامعًا بين النكهات الجريئة المشمسة للبحر الأبيض المتوسط وأجود المنتجات المحلية والإقليمية. كل طبق في إمبر وستون هو حوار بين التقنية القديمة والطموح الحديث.`,
    chefName: "Chef Marco Elia",
    chefTitle: "Executive Chef & Founder",
    chefTitleAr: "الشيف التنفيذي والمؤسس",
    chefImage: "/images/chef.jpg",
    openedYear: "2021",
    awardsLabel: "Featured in",
    awards: ["Time Out Dubai", "Michelin Guide UAE", "Condé Nast Traveller"],
  },

  // ── SEO ────────────────────────────────────────────────
  seo: {
    titleEn: "Best Modern Mediterranean Restaurant in Abu Dhabi | Ember & Stone",
    titleAr: "أفضل مطعم متوسطي عصري في أبوظبي | إمبر وستون",
    description:
      "Ember & Stone — Modern Mediterranean dining in Abu Dhabi. Live-fire cooking, premium ingredients, and an unforgettable atmosphere on Al Maryah Island. Book your table today.",
    descriptionAr:
      "إمبر وستون — مطعم متوسطي عصري في أبوظبي. طهي على اللهب الحي، مكونات فاخرة، وأجواء لا تُنسى في جزيرة الماريه. احجز طاولتك اليوم.",
    keywords: ["restaurant Abu Dhabi", "Mediterranean restaurant UAE", "fine dining Abu Dhabi", "best restaurant Al Maryah Island"],
  },
} as const;

export default restaurant;
export type RestaurantConfig = typeof restaurant;
