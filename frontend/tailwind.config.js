/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        green: {
          100: '#EFFCEB',
          200: '#CEF5C5',
          300: '#ABEE9E',
          400: '#83E676',
          500: '#6DE161',
          600: '#52DD4B',
          700: '#43A73C',
          800: '#34752E',
          900: '#2C5D26',
          1000: '#24461F',
          1100: '#1B3018',
          1200: '#121B0F',
        },
        yellow: {
          100: '#FFF9EA',
          200: '#FFF4D5',
          300: '#FFE9AA',
          400: '#FFE495',
          500: '#FFD969',
          600: '#FFD031',
          700: '#DFB630',
          800: '#C19D2C',
          900: '#866D24',
          1000: '#50411A',
          1100: '#362D15',
          1200: '#1F1A0D',
        },
        darkgray: {
          100: '#E2E3E2',
          200: '#C6C7C6',
          300: '#ABACAB',
          400: '#909190',
          500: '#505150',
          600: '#454645',
          700: '#3A3B3A',
          800: '#2F312F',
          900: '#252725',
          1000: '#1B1D1B',
          1100: '#191B19',
          1200: '#171817',
        },
        teal: {
          100: '#D2F4EA',
          200: '#A6E9D5',
          300: '#79DFC1',
          400: '#4DD4AC',
          500: '#20C997',
          600: '#1AA179',
          700: '#13795B',
          800: '#0D503C',
          900: '#06281E',
        },
        orange: {
          100: '#FFF4E6',
          200: '#FFE0B5',
          300: '#FFCB84',
          400: '#FFB652',
          500: '#FFA200',
          600: '#C17C11',
          700: '#875714',
          800: '#503512',
          900: '#201609',
        },
        blue: {
          100: '#E7F1FF',
          200: '#9EC5FE',
          300: '#6EA8FE',
          400: '#3D8BFD',
          500: '#0D6EFD',
          600: '#0A58CA',
          700: '#084298',
          800: '#052C65',
          900: '#031633',
        },
        red: {
          100: '#F8D7DA',
          200: '#F1AEB5',
          300: '#EA868F',
          400: '#E35D6A',
          500: '#DC3545',
          600: '#B02A37',
          700: '#842029',
          800: '#58151C',
          900: '#2C0B0E',
        },
        primary: {
          100: '#EFFCEB',
          200: '#CEF5C5',
          300: '#ABEE9E',
          400: '#83E676',
          500: '#6DE161',
          600: '#52DD4B',
          700: '#43A73C',
          800: '#34752E',
          900: '#2C5D26',
          1000: '#24461F',
          1100: '#1B3018',
          1200: '#121B0F',
        },
        secondary: {
          100: '#FFF9EA',
          200: '#FFF4D5',
          300: '#FFE9AA',
          400: '#FFE495',
          500: '#FFD969',
          600: '#FFD031',
          700: '#DFB630',
          800: '#C19D2C',
          900: '#866D24',
          1000: '#50411A',
          1100: '#362D15',
          1200: '#1F1A0D',
        },
        neutral: {
          100: '#E2E3E2',
          200: '#C6C7C6',
          300: '#ABACAB',
          400: '#909190',
          500: '#505150',
          600: '#454645',
          700: '#3A3B3A',
          800: '#2F312F',
          900: '#252725',
          1000: '#1B1D1B',
          1100: '#191B19',
          1200: '#171817',
        },
        success: {
          100: '#D2F4EA',
          200: '#A6E9D5',
          300: '#79DFC1',
          400: '#4DD4AC',
          500: '#20C997',
          600: '#1AA179',
          700: '#13795B',
          800: '#0D503C',
          900: '#06281E',
        },
        warning: {
          100: '#FFF4E6',
          200: '#FFE0B5',
          300: '#FFCB84',
          400: '#FFB652',
          500: '#FFA200',
          600: '#C17C11',
          700: '#875714',
          800: '#503512',
          900: '#201609',
        },
        info: {
          100: '#E7F1FF',
          200: '#9EC5FE',
          300: '#6EA8FE',
          400: '#3D8BFD',
          500: '#0D6EFD',
          600: '#0A58CA',
          700: '#084298',
          800: '#052C65',
          900: '#031633',
        },
        error: {
          100: '#F8D7DA',
          200: '#F1AEB5',
          300: '#EA868F',
          400: '#E35D6A',
          500: '#DC3545',
          600: '#B02A37',
          700: '#842029',
          800: '#58151C',
          900: '#2C0B0E',
        },
        accent: {
          success: 'var(--success-500)',
          warning: 'var(--warning-500)',
          info: 'var(--info-500)',
          error: 'var(--error-500)',
        },

        fontSize: {
          '13': '13px',
          '14': '14px',
          '15': '15px',
          '16': '16px',
          '18': '18px',
          '20': '20px',
          '22': '22px',
          '24': '24px',
          '28': '28px',
          '32': '32px',
          '36': '36px',
          '40': '40px',
          '48': '48px',
          '56': '56px',
          '64': '64px',
        },
        
        lineHeight: {
          xs: '16px',      // For very small text
          sm: '18px',      // For small text
          md: '20px',      // For medium text
          lg: '24px',      // For larger text
          xl: '28px',      // For extra-large text
          '2xl': '32px',   // For very large text
          '3xl': '36px',   // For huge text
          '4xl': '40px',   // Extra large text
          '5xl': '56px',   // Extremely large text
          '6xl': '64px',   // Maximum large text
        },
        borderRadius: {
          n: '0px',        // No rounding
          xs: '4px',       // Slight rounding
          sm: '6px',       // Small rounded corners
          md: '8px',       // Standard rounding
          l: '12px',       // Larger rounding
          xl: '16px',      // Extra large rounding
          '2xl': '20px',   // Extra extra large rounding
          '3xl': '24px',   // Very large rounding
          f: '32px',       // Maximum rounding for larger elements
          mx: '36px',      // Maximum large rounding
          r: '9999px',     // Extreme rounding for special cases
        },
        opacity: {
          oc: '1',         // Fully opaque
          hi: '0.9',       // Very high opacity
          mh: '0.8',       // Medium-high opacity
          m: '0.7',        // Medium opacity
          ml: '0.5',       // Medium-low opacity
          lo: '0.3',       // Low opacity
          vl: '0.2',       // Very low opacity
          tr: '0.1',       // Nearly transparent
          in: '0',         // Fully transparent
        },
        gap: {
          n: '0px',        // No gap
          '2xs': '2px',    // Extra extra small gap
          xs: '4px',       // Extra small gap
          s: '6px',        // Small gap
          m: '8px',        // Medium gap
          xm: '10px',      // Large gap
          '2xm': '12px',   // Extra large gap
          l: '14px',       // Extra extra large gap
          xl: '16px',      // Extra extra extra large gap
          '2xl': '18px',   // Extra extra extra extra large gap
          '3xl': '20px',   // Extra extra extra extra extra large gap
          '4xl': '24px',   // Extra extra extra extra extra extra large gap
          '5xl': '28px',   // Extra extra extra extra extra extra extra large gap
          '6xl': '32px',   // Extra extra extra extra extra extra extra extra large gap
          '7xl': '36px',   // Extra extra extra extra extra extra extra extra extra large gap
          '8xl': '40px',   // Extra extra extra extra extra extra extra extra extra extra large gap
          '9xl': '48px',   // Extra extra extra extra extra extra extra extra extra extra extra large gap
          '10xl': '56px',  // Extra extra extra extra extra extra extra extra extra extra extra extra large gap
          '11xl': '64px',  // Extra extra extra extra extra extra extra extra extra extra extra extra extra large gap
        },
        
        lightgreen: {
          DEFAULT: '#252724', // Dark greenish-gray
        },
        darkgreen: {
          DEFAULT: '#1b1d1a', // Very dark greenish-gray
        },
        stone: {
          DEFAULT: '#2f312e', // Dark grayish-green
        },
        txtcolor: {
          DEFAULT: '#ababab', // Light gray
        },
      },
    },
  },
  plugins: [],
}