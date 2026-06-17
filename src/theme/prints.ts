// Print asset references and usage definitions
// Prints are stored in /public/prints/ and referenced from CSS/JS

export const prints = {
  // Print 1: Blue/yellow flowers and green leaves on pink (Competitors section)
  floralPastel: {
    src: '/prints/IG_feed_w_22_1_1.jpg',
    description: 'Blue/yellow flowers and green leaves on pink',
    colors: ['#F4C2D4', '#8BABD4', '#E8D87A', '#6B8E23', '#1A1A2E'],
  },
  // Print 2: Pink/maroon floral (bold graphic style)
  floralRose: {
    src: '/prints/IG_feed_w_22_1_2.jpg',
    description: 'Pink/maroon bold floral',
    colors: ['#8B455D', '#D291BC', '#F5F0E6'],
  },
  // Print 3: Horizontal color bands (abstract minimalist)
  colorBands: {
    src: '/prints/IG_feed_w_22_1_3.jpg',
    description: 'Horizontal color bands (rose/mauve/ochre/yellow-green)',
    colors: ['#F9F5E8', '#C99A9A', '#C78BA7', '#B8860B', '#D4C22A', '#E6C35A'],
  },
  // Print 4: Hand-drawn grid (geometric sketchy)
  gridSketch: {
    src: '/prints/IG_feed_w_22_1_4.jpg',
    description: 'Hand-drawn grid on off-white',
    colors: ['#F5F0EB', '#1A1A1A'],
  },
  // Print 5: Påskblomma on olive green (classic Marimekko)
  paskblomma: {
    src: '/prints/IG_feed_w_22_1_5.jpg',
    description: 'Påskblomma flowers on olive green',
    colors: ['#6B8E23', '#F5F0E6', '#F4B1C2'],
  },
  // Print 6: Cream/mustard flowers on dark background
  darkFloral: {
    src: '/prints/IG_feed_w_22_1_6.jpg',
    description: 'Cream/mustard flowers on dark/black',
    colors: ['#1A1A1A', '#F5F0E6', '#C49A4D', '#7A7A5A'],
  },
  // Print 7: Blue/yellow flowers on pink background
  lineFloral: {
    src: '/prints/IG_feed_w_22_1_7.jpg',
    description: 'Blue/yellow flowers and green leaves on pink',
    colors: ['#F4D7E0', '#5B7DB1', '#E8C94A', '#8AB472', '#1A1A2E'],
  },
} as const

export type PrintKey = keyof typeof prints
