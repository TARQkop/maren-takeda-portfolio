/**
 * All copy and photo references for the site.
 *
 * Persona: Maren Takeda — ceramic artist, Porto. Entirely fictional.
 * Every photograph is a real Unsplash photo id taken from Unsplash search
 * pages (see lib/images.ts). No image is reused anywhere on the site.
 */

export const person = {
  name: "Maren Takeda",
  first: "Maren",
  role: "Ceramic Artist",
  studio: "Estúdio Cinza",
  city: "Porto, Portugal",
  email: "hello@marentakeda.example",
  availability: "Booking commissions for Spring 2027",
  tagline: "Vessels that learn your hands.",
  intro:
    "I throw, glaze and wood-fire tableware and sculptural vessels from river clay dug along the Douro. Each piece is made to be used until it has a story.",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "Are.na", href: "https://www.are.na/" },
  ],
} as const;

export const nav = [
  { id: "home", label: "Home", n: "01" },
  { id: "about", label: "About", n: "02" },
  { id: "work", label: "Work", n: "03" },
  { id: "expertise", label: "Expertise", n: "04" },
  { id: "experience", label: "Experience", n: "05" },
  { id: "contact", label: "Contact", n: "06" },
] as const;

export const images = {
  hero: {
    id: "1595351298020-038700609878",
    alt: "Maren shaping a vessel on the pottery wheel, tools and bowls within reach",
  },
  aboutMain: {
    id: "1771523350747-638a89667c8f",
    alt: "Clay-covered hands drawing up the wall of a freshly thrown pot",
  },
  aboutSecondary: {
    id: "1590605095243-072811dbe64c",
    alt: "A pale, unglazed clay pot held in both hands",
  },
  experience: {
    id: "1769425105591-428948f6e2f2",
    alt: "A collection of vintage ceramic pots and vases on display",
  },
  experienceSecondary: {
    id: "1685270066088-27bb10a18088",
    alt: "Vases and plates arranged on a studio shelf",
  },
  contact: {
    id: "1781433869241-1aec734207d2",
    alt: "Two light pottery vessels resting on a rustic wooden table",
  },
} as const;

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  medium: string;
  size: string;
  summary: string;
  story: string;
  image: { id: string; alt: string };
  /** desktop grid placement (md+). Literal class names so Tailwind can see them. */
  layout: string;
  ratio: string;
};

export const projects: Project[] = [
  {
    slug: "hollow-hours",
    title: "Hollow Hours",
    year: "2025",
    category: "Sculptural vessels",
    medium: "Douro river clay, wood-ash glaze, anagama fired",
    size: "12 floor vessels, 60–110 cm",
    summary:
      "Twelve monumental vessels, one for each hour of a night shift at the kiln.",
    story:
      "During a four-day anagama firing I counted the hours I stayed awake feeding the fire, then made one vessel for each. Walls are paper-thin at the shoulder and thick at the foot, so the pots feel as though they are exhaling. Ash drifted across the surfaces and settled in a grey-green skin that no glaze recipe could repeat.",
    image: {
      id: "1738858363202-dd019dadce76",
      alt: "A large grey ceramic vase standing on a tiled floor",
    },
    layout: "md:col-span-7",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
  },
  {
    slug: "salt-and-ash",
    title: "Salt & Ash Table",
    year: "2024",
    category: "Restaurant tableware",
    medium: "Stoneware, salt-fired, matte ash glaze",
    size: "320 pieces, 6 forms",
    summary:
      "A full dinner service for a twelve-seat tasting room, made to be handled.",
    story:
      "The chef asked for plates that would make guests slow down. I developed a rim that cups the thumb and a glaze that turns from bone to honey where the sauce pools. After a year of service the plates have begun to patina, which is exactly the point.",
    image: {
      id: "1740478949628-ff562c3c3923",
      alt: "A neat stack of white ceramic dishes on a table",
    },
    layout: "md:col-span-5 md:mt-48",
    ratio: "aspect-[4/5]",
  },
  {
    slug: "tidewater-cups",
    title: "Tidewater Cups",
    year: "2024",
    category: "Everyday ware",
    medium: "Porcelain-blend stoneware, celadon glaze",
    size: "Edition of 240, 8 cm",
    summary:
      "Small cups pressed with the pattern of the tide on Matosinhos beach.",
    story:
      "Each cup is thrown, then rolled over a plaster cast of rippled wet sand. No two ripples line up. They sell out in a morning, and the waiting list is the only advertising the studio has ever needed.",
    image: {
      id: "1740478949627-155c907b3ca0",
      alt: "A group of small ceramic cups arranged on a table",
    },
    layout: "md:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    slug: "field-notes",
    title: "Field Notes — Jugs",
    year: "2023",
    category: "Studio pottery",
    medium: "Earthenware, slip trailing, clear lead-free glaze",
    size: "Series of 30, 18–34 cm",
    summary:
      "Thirty jugs inspired by water carriers from northern Portuguese villages.",
    story:
      "I spent a summer sketching the jugs still used in kitchens across Trás-os-Montes, then translated each handle and lip into my own forms. Slip lines are drawn freehand in a single breath, so every jug carries the rhythm of that moment.",
    image: {
      id: "1769203905448-0ba060069e6f",
      alt: "An earthenware jug with a handle resting on draped fabric",
    },
    layout: "md:col-span-7 md:mt-24",
    ratio: "aspect-[4/5] md:aspect-[5/6]",
  },
  {
    slug: "stone-garden",
    title: "Stone Garden",
    year: "2022",
    category: "Installation",
    medium: "Unglazed stoneware, burnished",
    size: "41 vessels, site-specific",
    summary:
      "An installation of unglazed vessels placed on a bed of crushed slate.",
    story:
      "Made for a courtyard commission, the vessels are burnished with river stones until they hold light like skin. In the evening the courtyard fills with warm reflected light, and visitors tend to lower their voices without being asked.",
    image: {
      id: "1771627278991-8922851b9435",
      alt: "Several clay jugs and bottles standing on a stone surface",
    },
    layout: "md:col-span-6",
    ratio: "aspect-[4/5]",
  },
  {
    slug: "moon-bowls",
    title: "Moon Bowls",
    year: "2021",
    category: "Tableware",
    medium: "Stoneware, white crawl glaze",
    size: "Nested set of 9",
    summary:
      "Nine nesting bowls that grow from tea-cup to serving bowl, like moon phases.",
    story:
      "My first collection to sell internationally. The crackled white glaze is a controlled accident: it pulls away from the clay in the kiln, leaving a map of tiny continents. The nested set arrives in a single linen wrap so it can be given as one gift.",
    image: {
      id: "1642355779808-4285b3987239",
      alt: "A stack of white ceramic bowls on a table",
    },
    layout: "md:col-span-6 md:mt-32",
    ratio: "aspect-[4/5]",
  },
];

export const expertise = [
  {
    n: "01",
    title: "Wheel & Form",
    blurb:
      "Throwing is where everything is decided: weight, proportion, how a lip feels against a mouth.",
    details: [
      "Pieces from 6 g espresso cups to 14 kg floor vessels",
      "Hand-built additions: lugs, spouts, lids that really fit",
      "Edition work with ±1 mm tolerances",
    ],
    image: {
      id: "1753164725848-471a8abbb6f5",
      alt: "A potter shaping a clay vase on a spinning wheel",
    },
  },
  {
    n: "02",
    title: "Glaze & Surface",
    blurb:
      "I mix every glaze from raw materials: local ash, feldspar, iron and a lot of testing.",
    details: [
      "Wood-ash, shino, celadon and crawl glaze families",
      "Colour-matching to a restaurant's palette or brand",
      "Food-safe, dishwasher-tested finishes",
    ],
    image: {
      id: "1673339065013-f8411fb93848",
      alt: "A person painting glaze onto a bowl with a brush",
    },
  },
  {
    n: "03",
    title: "Tableware for Restaurants",
    blurb:
      "Plates are the last part of the cook's sentence. I help chefs finish it.",
    details: [
      "Tasting-menu services of 60 to 500 pieces",
      "Prototypes tested during real service",
      "Replacement programme, so a chip never means a gap",
    ],
    image: {
      id: "1612870199268-d33b7e0bd9b0",
      alt: "White ceramic mugs lined up on a pale wooden shelf",
    },
  },
  {
    n: "04",
    title: "Sculptural Vessels",
    blurb:
      "Larger works for homes, lobbies and gardens, made to hold space rather than water.",
    details: [
      "Commissions for architects and interior designers",
      "Site visits, scale mock-ups and installation",
      "Wood-fired in the anagama at Quinta do Forno",
    ],
    image: {
      id: "1726491079206-36a02e6c9cbb",
      alt: "A close-up of a ceramic vase on a table",
    },
  },
  {
    n: "05",
    title: "Workshops & Residencies",
    blurb:
      "Teaching keeps me honest. Small groups, real clay, no pottery-wheel selfies required.",
    details: [
      "Weekend intensives of 6 people at Estúdio Cinza",
      "Guest residencies and masterclasses abroad",
      "Private sessions for chefs and designers",
    ],
    image: {
      id: "1572725394982-fbee32027b77",
      alt: "A person moulding clay by hand",
    },
  },
] as const;

export const skills = [
  "Wood firing",
  "Salt glazing",
  "Ash glaze chemistry",
  "Kiln design",
  "Wheel throwing",
  "Slip trailing",
  "Burnishing",
  "Mould making",
  "Clay body formulation",
  "Studio teaching",
] as const;

export const process = [
  { n: "I", title: "Conversation", text: "We talk about how the piece will live, who will hold it and what it should survive." },
  { n: "II", title: "Test tiles", text: "I send glaze and clay samples so you can handle the real material before we begin." },
  { n: "III", title: "Throw & dry", text: "Forms are thrown, trimmed and slowly dried. Rushing here is how pots crack later." },
  { n: "IV", title: "Fire & deliver", text: "Bisque, glaze, then the long firing. Everything is packed by hand and delivered or installed." },
] as const;

export const timeline = [
  {
    years: "2023 — Now",
    kind: "Studio",
    title: "Founder, Estúdio Cinza",
    place: "Porto",
    text: "Opened my own studio in a former tile warehouse. Two assistants, one gas kiln, and a shared wood kiln forty minutes up the river. Supplies tableware to eleven restaurants across Portugal and Spain.",
  },
  {
    years: "2020 — 2022",
    kind: "Residency",
    title: "Artist in Residence, Quinta do Forno",
    place: "Douro Valley",
    text: "Built and fired a two-chamber anagama with a group of five makers, and began digging and refining local clay. This is where the Hollow Hours technique was born.",
  },
  {
    years: "2016 — 2019",
    kind: "Apprenticeship",
    title: "Apprentice Potter",
    place: "Mashiko, Japan",
    text: "Three years in my grandfather's village workshop, wedging clay for the first year and not touching a glaze until the second. I returned fluent in patience and in Japanese kiln superstitions.",
  },
  {
    years: "2012 — 2016",
    kind: "Education",
    title: "BA in Ceramic Design",
    place: "Faculdade de Belas-Artes, Porto",
    text: "Graduated with distinction. Thesis on Portuguese salt-glaze traditions and the people who still keep them alive.",
  },
  {
    years: "2010 — 2012",
    kind: "Early work",
    title: "Restoration Assistant",
    place: "Azulejo workshop, Lisbon",
    text: "Spent two years beside my mother's team, repairing eighteenth-century tiles. It taught me how to look at a surface for an hour before touching it.",
  },
] as const;

export const stats = [
  { value: 86, suffix: "", label: "Wood firings completed" },
  { value: 14, suffix: "", label: "Solo & group exhibitions" },
  { value: 11, suffix: "", label: "Restaurants served" },
  { value: 4200, suffix: "+", label: "Pieces made for use" },
] as const;

export const achievements = [
  { year: "2025", text: "Finalist, Atlântico Contemporary Craft Prize" },
  { year: "2024", text: "Solo exhibition “Hollow Hours”, Porto" },
  { year: "2023", text: "Featured in the Slow Tables ceramics annual" },
  { year: "2022", text: "Young Maker Award, Iberian Ceramics Fair" },
] as const;

export const enquiryTypes = [
  "Restaurant tableware",
  "Sculptural commission",
  "Workshop or residency",
  "Something else",
] as const;
