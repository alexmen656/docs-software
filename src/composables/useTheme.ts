import { computed, onMounted } from 'vue'
import config from '@/config.json'

type ColorShade = '300' | '400' | '500' | '600' | '700'

const colorMap: Record<string, Record<ColorShade, string>> = {
  red: {
    '300': '#fca5a5',
    '400': '#f87171',
    '500': '#ef4444',
    '600': '#dc2626',
    '700': '#b91c1c',
  },
  blue: {
    '300': '#93c5fd',
    '400': '#60a5fa',
    '500': '#3b82f6',
    '600': '#2563eb',
    '700': '#1d4ed8',
  },
  green: {
    '300': '#86efac',
    '400': '#4ade80',
    '500': '#22c55e',
    '600': '#16a34a',
    '700': '#15803d',
  },
  purple: {
    '300': '#d8b4fe',
    '400': '#c084fc',
    '500': '#a855f7',
    '600': '#9333ea',
    '700': '#7e22ce',
  },
  orange: {
    '300': '#fdba74',
    '400': '#fb923c',
    '500': '#f97316',
    '600': '#ea580c',
    '700': '#c2410c',
  },
  pink: {
    '300': '#f9a8d4',
    '400': '#f472b6',
    '500': '#ec4899',
    '600': '#db2777',
    '700': '#be185d',
  },
}

export const useTheme = () => {
  const primaryColor = computed(() => config.theme.primaryColor)

  const getColorValue = (shade: ColorShade) => {
    const color = primaryColor.value
    const colors = colorMap[color] || colorMap['red']
    return colors?.[shade] || '#ef4444'
  }

  const setCSSVariables = (source="default") => {
    console.log(`[useTheme][setCSSVariables] from ${source}`)
    const root = document.documentElement
    const color = primaryColor.value
    const colors = colorMap[color] || colorMap['red']

    if (colors) {
      root.style.setProperty('--color-primary-300', colors['300'])
      root.style.setProperty('--color-primary-400', colors['400'])
      root.style.setProperty('--color-primary-500', colors['500'])
      root.style.setProperty('--color-primary-600', colors['600'])
      root.style.setProperty('--color-primary-700', colors['700'])
    }
  }

  if (typeof document !== 'undefined') {
    setCSSVariables()
  }

  const primaryStyles = computed(() => ({
    text: { color: getColorValue('500') },
    textDark: { color: getColorValue('400') },
    bg: { backgroundColor: getColorValue('500') },
    bgHover: { backgroundColor: getColorValue('600') },
    border: { borderColor: getColorValue('500') },
    ring: { '--tw-ring-color': getColorValue('500') } as any,
  }))

  return {
    primaryColor,
    primaryStyles,
    getColorValue,
    setCSSVariables,
  }
}
