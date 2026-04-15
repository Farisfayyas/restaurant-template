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
  pairsWith: string[];
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
  open: string;
  close: string;
  closed?: boolean;
}

export interface HolidayOverride {
  date: string;
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

// Unsplash base URL helper — swap IDs easily
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fit=crop&auto=format`;

const restaurant = {
  // ── Identity ────────────────────────────────────────────
  name: "Café 302",
  nameAr: "كافيه 302",
  tagline: "Urban Lifestyle Café",
  taglineAr: "كافيه أسلوب حياة عصري",
  cuisine: "International Café",
  cuisineAr: "كافيه عالمي",
  city: "Abu Dhabi",
  cityAr: "أبوظبي",

  // ── Contact ─────────────────────────────────────────────
  phone: "+971-2-610-6666",
  whatsapp: "+97126106666",
  email: "cafe302.almaha@rotana.com",

  // ── Location ────────────────────────────────────────────
  address: "Al Maha Arjaan by Rotana, Hamdan Street, Al Markaziya, Abu Dhabi, UAE",
  addressAr: "الماها أرجان بروتانا، شارع حمدان، المركزية، أبوظبي، الإمارات",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.9623!2d54.3773!3d24.4961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI5JzQ2LjAiTiA1NMKwMjInMzguMyJF!5e0!3m2!1sen!2sae!4v1700000000000",

  // ── Social ──────────────────────────────────────────────
  instagramHandle: "@cafe302",
  social: {
    instagram: "https://instagram.com/cafe302",
    facebook:  "https://facebook.com/cafe302dubai",
    tiktok:    undefined,
  } as SocialLinks,

  // ── Media ───────────────────────────────────────────────
  heroVideo: "https://videos.pexels.com/video-files/1793151/1793151-sd_640_360_30fps.mp4",
  heroFallbackImage: u("1495474472287-4d71bcdd2085", 1600), // verified café interior
  logo: "/images/logo.svg",
  logoAlt: "Café 302",

  // ── Reservations ───────────────────────────────────────
  openTableId: null as string | null,

  // ── Operating Hours ────────────────────────────────────
  hours: {
    monday:    { open: "06:00", close: "23:00" },
    tuesday:   { open: "06:00", close: "23:00" },
    wednesday: { open: "06:00", close: "23:00" },
    thursday:  { open: "06:00", close: "23:00" },
    friday:    { open: "06:00", close: "23:00" },
    saturday:  { open: "06:00", close: "23:00" },
    sunday:    { open: "06:00", close: "23:00" },
  } as Record<DayOfWeek, DayHours>,

  holidayOverrides: [] as HolidayOverride[],

  // ── Menu ───────────────────────────────────────────────
  menu: [
    {
      id: "breakfast",
      category: "Breakfast",
      categoryAr: "الإفطار",
      items: [
        {
          id: "eggs-benny",
          name: "Eggs Benedict",
          nameAr: "بيض بنيديكت",
          description: "Poached eggs on toasted English muffin with smoked salmon, hollandaise sauce, and capers.",
          descriptionAr: "بيض مسلوق على كعكة إنجليزية محمصة مع السالمون المدخن وصلصة هولانديز والكبر.",
          price: 69,
          currency: "AED",
          dietary: ["chefSpecial"] as DietaryTag[],
          pairsWith: ["Café Latte", "Fresh Orange Juice"],
          image: u("1608039829572-78524f79c4c7"),
          featured: true,
        },
        {
          id: "avocado-toast",
          name: "Avocado Toast",
          nameAr: "توست الأفوكادو",
          description: "Smashed avocado on sourdough with poached egg, cherry tomatoes, and dukkah.",
          descriptionAr: "أفوكادو مهروس على خبز العجين المخمر مع بيض مسلوق وطماطم كرزية ودقة.",
          price: 58,
          currency: "AED",
          dietary: ["vegetarian", "chefSpecial"] as DietaryTag[],
          pairsWith: ["The Defender Juice", "Cappuccino"],
          image: u("1455619452474-d2be8b1e70cd"),
          featured: true,
        },
        {
          id: "shakshuka",
          name: "Specialty Shakshuka",
          nameAr: "شكشوكة مميزة",
          description: "Eggs baked in a rich spiced tomato and pepper sauce with feta, served with warm bread.",
          descriptionAr: "بيض مخبوز في صلصة طماطم وفلفل غنية بالتوابل مع الجبن الفيتا وخبز دافئ.",
          price: 55,
          currency: "AED",
          dietary: ["vegetarian", "spicy"] as DietaryTag[],
          pairsWith: ["Arabic Coffee", "Fresh Orange Juice"],
          image: u("1590330297626-d7aff25a0431"),
          featured: true,
        },
        {
          id: "pancakes",
          name: "Blueberry Pancakes",
          nameAr: "فطائر التوت الأزرق",
          description: "Fluffy buttermilk pancakes stacked high with fresh blueberries, maple syrup, and whipped cream.",
          descriptionAr: "فطائر رقيقة بالبتر ميلك مع توت أزرق طازج وشراب قيقب وكريمة مخفوقة.",
          price: 52,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: ["Café Latte"],
          image: u("1528207776546-365bb710ee93"),
        },
        {
          id: "superfood-bowl",
          name: "Superfood Bowl",
          nameAr: "طبق السوبرفود",
          description: "Customisable bowl of acai or pitaya base with granola, seasonal fruits, honey, and chia seeds.",
          descriptionAr: "طبق قابل للتخصيص بقاعدة أساي أو بيتايا مع جرانولا وفواكه موسمية وعسل وبذور شيا.",
          price: 62,
          currency: "AED",
          dietary: ["vegan", "glutenFree"] as DietaryTag[],
          pairsWith: ["The Defender Juice", "Detox Juice"],
          image: u("1590080875515-8a3a8dc5735e"),
        },
      ],
    },
    {
      id: "mains",
      category: "Mains",
      categoryAr: "الأطباق الرئيسية",
      items: [
        {
          id: "sliders",
          name: "Cheeseburger Sliders",
          nameAr: "ميني برجر بالجبن",
          description: "Three mini beef patties with aged cheddar, caramelised onion, pickles, and house sauce.",
          descriptionAr: "ثلاث كفتة لحم صغيرة مع شيدر معتق وبصل مكرمل ومخلل وصلصة البيت.",
          price: 75,
          currency: "AED",
          dietary: [] as DietaryTag[],
          pairsWith: ["Fresh Lemonade", "Café Latte"],
          image: u("1550547660-d9450f859349"),
          featured: true,
        },
        {
          id: "portobello-burger",
          name: "Portobello Black Bean Burger",
          nameAr: "برجر بورتوبيلو واللوبيا السوداء",
          description: "Grilled portobello mushroom and black bean patty, avocado, rocket, and smoky chipotle mayo.",
          descriptionAr: "باتي فطر بورتوبيلو واللوبيا السوداء المشوي مع أفوكادو وجرجير ومايونيز تشيبوتل مدخن.",
          price: 68,
          currency: "AED",
          dietary: ["vegan"] as DietaryTag[],
          pairsWith: ["Detox Juice"],
          image: u("1512621776951-a57141f2eefd"),
          featured: true,
        },
        {
          id: "caesar-salad",
          name: "Caesar Salad",
          nameAr: "سلطة قيصر",
          description: "Crisp romaine lettuce, shaved parmesan, house-made Caesar dressing, and croutons.",
          descriptionAr: "خس روماني مقرمش، بارميزان مبشور، صلصة قيصر محلية الصنع، وكروتون.",
          price: 58,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: ["Cappuccino"],
          image: u("1546069901-ba9599a7e63c"),
        },
        {
          id: "pasta",
          name: "Spaghetti Aglio e Olio",
          nameAr: "سباغيتي أوليو",
          description: "Al dente spaghetti tossed with garlic, extra virgin olive oil, chilli, and fresh parsley.",
          descriptionAr: "سباغيتي طازجة مع ثوم وزيت زيتون بكر وفلفل حار وبقدونس طازج.",
          price: 65,
          currency: "AED",
          dietary: ["vegetarian", "spicy"] as DietaryTag[],
          pairsWith: ["Fresh Lemonade"],
          image: u("1563379926898-05f4575a45d8"),
        },
      ],
    },
    {
      id: "asian",
      category: "Asian Specials",
      categoryAr: "الأطباق الآسيوية",
      items: [
        {
          id: "gyoza",
          name: "Chicken Gyoza",
          nameAr: "كيوزا الدجاج",
          description: "Pan-fried Japanese dumplings filled with seasoned chicken, ginger, and cabbage. Served with ponzu dipping sauce.",
          descriptionAr: "زلابية يابانية مقلية محشوة بالدجاج المتبل والزنجبيل والملفوف. تقدم مع صلصة البونزو.",
          price: 52,
          currency: "AED",
          dietary: [] as DietaryTag[],
          pairsWith: ["Korean BBQ Beef", "Prawn Tempura"],
          image: u("1567620905732-2d1ec7ab7445"),
          featured: true,
        },
        {
          id: "tempura",
          name: "Prawn Tempura",
          nameAr: "تمبورا الروبيان",
          description: "Light and crispy battered tiger prawns served with a sweet chilli dipping sauce and pickled daikon.",
          descriptionAr: "روبيان مقلي بعجينة خفيفة مقرمشة مع صلصة تشيلي حلوة وفجل مخلل.",
          price: 68,
          currency: "AED",
          dietary: [] as DietaryTag[],
          pairsWith: ["Chicken Gyoza"],
          image: u("1529193591184-b1d58069ecdd"),
        },
        {
          id: "bbq-beef",
          name: "Korean BBQ Beef",
          nameAr: "لحم البقر الكوري BBQ",
          description: "Marinated short rib beef with gochujang glaze, steamed jasmine rice, and pickled kimchi.",
          descriptionAr: "ضلوع لحم بقر متبلة مع صقيل جوتشوجانج وأرز ياسمين مطهو على البخار وكيمتشي مخلل.",
          price: 85,
          currency: "AED",
          dietary: ["spicy", "chefSpecial"] as DietaryTag[],
          pairsWith: ["Chicken Gyoza"],
          image: u("1498654896293-37aacf113fd9"),
        },
      ],
    },
    {
      id: "drinks",
      category: "Drinks",
      categoryAr: "المشروبات",
      items: [
        {
          id: "latte",
          name: "Café Latte",
          nameAr: "لاتيه",
          description: "A double shot of freshly ground espresso with velvety steamed milk and delicate latte art.",
          descriptionAr: "جرعة مزدوجة من الإسبريسو المطحون طازجاً مع حليب مبخر ناعم وفن اللاتيه.",
          price: 22,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: ["The Crookie", "Blueberry Pancakes"],
          image: u("1509042239860-f550ce710b93"),
        },
        {
          id: "cappuccino",
          name: "Cappuccino",
          nameAr: "كابتشينو",
          description: "Classic Italian cappuccino — equal parts espresso, steamed milk, and velvety foam.",
          descriptionAr: "كابتشينو إيطالي كلاسيكي — أجزاء متساوية من الإسبريسو والحليب المبخر والرغوة الناعمة.",
          price: 20,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: ["Carrot Cake"],
          image: u("1534422298391-e4f8c172dddb"),
        },
        {
          id: "defender-juice",
          name: "The Defender",
          nameAr: "المدافع",
          description: "Freshly pressed pomegranate, pineapple, grapefruit, and carrot. A powerful immunity booster.",
          descriptionAr: "عصير رمان وأناناس وجريب فروت وجزر معصور طازجاً. معزز قوي للمناعة.",
          price: 32,
          currency: "AED",
          dietary: ["vegan", "glutenFree"] as DietaryTag[],
          pairsWith: ["Superfood Bowl", "Avocado Toast"],
          image: u("1547592180-85f173990554"),
          featured: true,
        },
        {
          id: "detox-juice",
          name: "Detox Juice",
          nameAr: "عصير ديتوكس",
          description: "Carrot, celery, cucumber, beetroot, apple, and lemon. Cleanse and energise.",
          descriptionAr: "جزر وكرفس وخيار وشمندر وتفاح وليمون. نظف وانتعش.",
          price: 32,
          currency: "AED",
          dietary: ["vegan", "glutenFree"] as DietaryTag[],
          pairsWith: ["Superfood Bowl"],
          image: u("1547592180-85f173990554"),
        },
      ],
    },
    {
      id: "desserts",
      category: "Desserts & Pastries",
      categoryAr: "الحلويات والمعجنات",
      items: [
        {
          id: "crookie",
          name: "The Crookie",
          nameAr: "الكروكي",
          description: "Our signature viral pastry — a buttery croissant filled with peanut butter chocolate chip cookie dough.",
          descriptionAr: "معجنتنا الفيروسية المميزة — كرواسان زبداني محشو بعجينة الكوكيز بزبدة الفول السوداني والشوكولاتة.",
          price: 28,
          currency: "AED",
          dietary: ["vegetarian", "chefSpecial"] as DietaryTag[],
          pairsWith: ["Café Latte", "Cappuccino"],
          image: u("1555507036-ab1f4038808a"),
          featured: true,
        },
        {
          id: "carrot-cake",
          name: "Carrot Cake",
          nameAr: "كيكة الجزر",
          description: "Moist three-layer carrot cake with cream cheese frosting, toasted walnuts, and a hint of cinnamon.",
          descriptionAr: "كيكة جزر ثلاثية الطبقات رطبة مع كريمة الجبن والجوز المحمص ولمسة من القرفة.",
          price: 35,
          currency: "AED",
          dietary: ["vegetarian"] as DietaryTag[],
          pairsWith: ["Cappuccino", "Café Latte"],
          image: u("1482049016688-2d3e1b311543"),
          featured: true,
        },
        {
          id: "acai-bowl",
          name: "Açaí Smoothie Bowl",
          nameAr: "طبق سموذي الأساي",
          description: "Thick blended açaí topped with banana, strawberry, granola, coconut flakes, and honey drizzle.",
          descriptionAr: "أساي مخلوط كثيف مع الموز والفراولة والجرانولا ورقائق جوز الهند والعسل.",
          price: 45,
          currency: "AED",
          dietary: ["vegan", "glutenFree"] as DietaryTag[],
          pairsWith: ["The Defender Juice"],
          image: u("1590080875515-8a3a8dc5735e"),
        },
      ],
    },
  ] as MenuCategory[],

  // ── Gallery ────────────────────────────────────────────
  gallery: [
    { src: u("1495474472287-4d71bcdd2085", 1200), alt: "Café Interior", altAr: "داخل المقهى", category: "interior" as GalleryCategory },
    { src: u("1555396273-367ea4eb4db5", 1200), alt: "Outdoor Seating", altAr: "الجلوس في الهواء الطلق", category: "interior" as GalleryCategory },
    { src: u("1571115177098-24ec42ed204d", 1200), alt: "Café Ambiance", altAr: "أجواء المقهى", category: "interior" as GalleryCategory },
    { src: u("1608039829572-78524f79c4c7", 1200), alt: "Eggs Benedict", altAr: "بيض بنيديكت", category: "food" as GalleryCategory },
    { src: u("1455619452474-d2be8b1e70cd", 1200), alt: "Avocado Toast", altAr: "توست الأفوكادو", category: "food" as GalleryCategory },
    { src: u("1590330297626-d7aff25a0431", 1200), alt: "Shakshuka", altAr: "شكشوكة", category: "food" as GalleryCategory },
    { src: u("1528207776546-365bb710ee93", 1200), alt: "Pancakes", altAr: "فطائر", category: "food" as GalleryCategory },
    { src: u("1550547660-d9450f859349", 1200), alt: "Cheeseburger Sliders", altAr: "برجر بالجبن", category: "food" as GalleryCategory },
    { src: u("1509042239860-f550ce710b93", 1200), alt: "Specialty Coffee", altAr: "قهوة مميزة", category: "food" as GalleryCategory },
    { src: u("1414235077428-338989a2e8c0", 1200), alt: "Private Dining Event", altAr: "حدث طعام خاص", category: "events" as GalleryCategory },
    { src: u("1547592180-85f173990554", 1200), alt: "Team Brunch", altAr: "برانش الفريق", category: "events" as GalleryCategory },
  ] as GalleryImage[],

  // ── Reviews ────────────────────────────────────────────
  reviews: [
    {
      author: "Nour Al Khalidi",
      rating: 5,
      text: "Café 302 is my go-to spot in Abu Dhabi. The avocado toast and eggs benedict are perfect every single time. Love the calm, cozy vibe — it never feels rushed.",
      textAr: "كافيه 302 هو مكاني المفضل في أبوظبي. توست الأفوكادو وبيض بنيديكت مثاليان في كل مرة. أحب الأجواء الهادئة والمريحة.",
      source: "google" as ReviewSource,
      date: "March 2025",
    },
    {
      author: "James Whitfield",
      rating: 5,
      text: "Best breakfast in Abu Dhabi — hands down. The Crookie is absolutely insane and the coffee is on another level. Staff are warm and welcoming every visit.",
      source: "tripadvisor" as ReviewSource,
      date: "February 2025",
    },
    {
      author: "Mariam Al Hashemi",
      rating: 5,
      text: "Finally a café that takes vegan and gluten-free options seriously without compromising on taste. The superfood bowl and detox juice are my weekly ritual!",
      textAr: "أخيراً مقهى يأخذ خيارات النباتيين وخالي الغلوتين بجدية دون المساومة على الطعم. طبق السوبرفود وعصير الديتوكس هما روتيني الأسبوعي!",
      source: "google" as ReviewSource,
      date: "January 2025",
    },
  ] as Review[],

  // ── About ───────────────────────────────────────────────
  about: {
    headline: "An Urban Oasis in the Heart of Abu Dhabi",
    headlineAr: "واحة حضرية في قلب أبوظبي",
    story: `Café 302 was born from the belief that great food and great coffee should be accessible every day — not just on special occasions. Nestled inside Al Maha Arjaan by Rotana on Hamdan Street, it quickly became one of Abu Dhabi's most beloved lifestyle cafés.\n\nWith a focus on wholesome ingredients, Café 302 caters to every lifestyle — from hearty full breakfasts to vegan superfood bowls and keto-friendly plates. The café's warm, urban aesthetic and award-winning hospitality make every visit feel like a breath of fresh air in the city.`,
    storyAr: `وُلد كافيه 302 من الاعتقاد بأن الطعام الرائع والقهوة الرائعة يجب أن يكونا متاحَين كل يوم — وليس في المناسبات الخاصة فقط. يقع داخل الماها أرجان بروتانا في شارع حمدان، وسرعان ما أصبح أحد أكثر كافيهات أبوظبي المحبوبة.\n\nمع التركيز على المكونات الصحية، يلبي كافيه 302 كل أسلوب حياة — من وجبات الإفطار الكاملة إلى أطباق السوبرفود النباتية والأطباق الملائمة لنظام الكيتو.`,
    chefName: "Café 302 Culinary Team",
    chefTitle: "Award-Winning Urban Café by Rotana",
    chefTitleAr: "كافيه حضري حائز على جوائز من روتانا",
    chefImage: u("1495474472287-4d71bcdd2085"),
    openedYear: "2015",
    awardsLabel: "As seen in",
    awards: ["Time Out Abu Dhabi", "Rotana Award Winner", "TripAdvisor Travellers' Choice"],
  },

  // ── SEO ────────────────────────────────────────────────
  seo: {
    titleEn: "Café 302 Abu Dhabi — Urban Lifestyle Café | Al Maha Arjaan by Rotana",
    titleAr: "كافيه 302 أبوظبي — كافيه أسلوب حياة عصري | الماها أرجان بروتانا",
    description:
      "Café 302 — Abu Dhabi's award-winning urban lifestyle café. Vegan, keto & gluten-free friendly. Breakfast, brunch, Asian specials & specialty coffee on Hamdan Street.",
    descriptionAr:
      "كافيه 302 — مقهى أسلوب الحياة الحضري الحائز على جوائز في أبوظبي. خيارات نباتية وكيتو وخالي من الغلوتين. إفطار وبرانش وأطباق آسيوية وقهوة مميزة في شارع حمدان.",
    keywords: [
      "Café 302 Abu Dhabi",
      "café Abu Dhabi",
      "urban lifestyle café UAE",
      "vegan café Abu Dhabi",
      "breakfast Abu Dhabi Hamdan Street",
    ],
  },
} as const;

export default restaurant;
export type RestaurantConfig = typeof restaurant;
