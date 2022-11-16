import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from './useMediaQuery'

export type ColorMode = 'light' | 'dark' | 'system'

export type PaletteMode = 'light' | 'dark'

export interface ColorModeContextType {
  colorMode: ColorMode

  setColorMode: (colorMode: ColorMode) => void
}

export interface ColorModeStorage {
  getColorMode: () => ColorMode | null | undefined

  setColorMode: (colorMode: ColorMode) => void
}

export const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: 'system',
  setColorMode() {}
})

export const useColorMode = () => useContext(ColorModeContext)

export interface ThemeProviderProps {
  defaultColorMode?: ColorMode

  colorModeStorage?: ColorModeStorage

  children?: React.ReactNode
}

export interface Theme {
  colorMode: 'light' | 'dark'
}

export const ThemeContext = createContext<Theme>({ colorMode: 'light' })

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ defaultColorMode, colorModeStorage, children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>(colorModeStorage?.getColorMode() || defaultColorMode || 'system')
  const matches = useMediaQuery('(prefers-color-scheme: dark)')

  const colorModeContextValue = useMemo(
    () => ({
      colorMode,
      setColorMode(colorMode: ColorMode) {
        setColorMode(colorMode)
        colorModeStorage?.setColorMode(colorMode)
      }
    }),
    [colorMode, colorModeStorage]
  )

  const theme = useMemo<Theme>(() => {
    const mode = colorMode === 'system' ? (matches ? 'dark' : 'light') : colorMode
    return {
      colorMode: mode
    }
  }, [colorMode, matches])

  useEffect(() => {
    if (theme.colorMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ColorModeContext.Provider value={colorModeContextValue}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ColorModeContext.Provider>
  )
}

ThemeProvider.defaultProps = {
  defaultColorMode: 'system',
  colorModeStorage: {
    getColorMode() {
      const colorMode = localStorage.getItem('colorMode')
      if (!colorMode) {
        return null
      }
      if (colorMode === 'light' || colorMode === 'dark' || colorMode === 'system') {
        return colorMode
      }
      return null
    },
    setColorMode(colorMode: ColorMode) {
      localStorage.setItem('colorMode', colorMode)
    }
  }
}
