import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
    darkMode: ['class'],
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			bg: {
  				'700': '#21262d',
  				'800': '#161b22',
  				'850': '#0f1520',
  				'900': '#0d1117'
  			},
  			fg: {
  				'100': '#f0f6fc',
  				'200': '#c9d1d9',
  				'300': '#8b949e'
  			},
  			accent: {
  				'500': '#2f81f7',
  				'600': '#1f6feb',
  				'700': '#0b58d0',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			success: {
  				'500': '#3fb950'
  			},
  			warn: {
  				'500': '#d29922'
  			},
  			danger: {
  				'500': '#f85149'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			glow: '0 0 0 1px rgba(47,129,247,0.45), 0 10px 30px rgba(0,0,0,0.45)'
  		},
  		backgroundImage: {
  			'grid-fade': 'radial-gradient(ellipse at top, rgba(47,129,247,0.12), transparent 55%), radial-gradient(ellipse at bottom, rgba(47,129,247,0.10), transparent 55%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindAnimate],
};

export default config;
