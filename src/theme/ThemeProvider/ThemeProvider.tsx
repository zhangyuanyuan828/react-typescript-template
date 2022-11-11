import { createTheme, PaletteMode, ThemeOptions, ThemeProvider as MuiThemeProvider, useMediaQuery, useTheme, colors } from '@mui/material'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type ColorMode = PaletteMode | 'system'

export interface ColorModeStorage {
  getColorMode: () => ColorMode | null | undefined

  setColorMode: (colorMode: ColorMode) => void
}

export interface ThemeProviderProps {
  defaultColorMode?: ColorMode

  colorModeStorage?: ColorModeStorage

  children?: React.ReactNode
}

export interface ColorModeContextType {
  colorMode: ColorMode

  setColorMode: (colorMode: ColorMode) => void
}

export const ColorModeConxtext = createContext<ColorModeContextType>({
  colorMode: 'system',
  setColorMode: (colorMode: ColorMode) => {}
})

export const ColorModeProvider = ColorModeConxtext.Provider

export const useColorMode = () => useContext(ColorModeConxtext)

export const usePaletteMode = () => {
  return useTheme().palette.mode
}

export const useColorModeValue = <TLight, TDark>(light: TLight, dark: TDark) => {
  return usePaletteMode() === 'light' ? light : dark
}

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    text: {
      primary: 'rgba(0, 0, 0, 0.75)',
      secondary: 'rgba(0, 0, 0, 0.65)'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: '#8c8c8c7a',
            borderRadius: 999
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            borderRadius: 999
          }
        },
        '.app-region-drag': {
          WebkitAppRegion: 'drag'
        },
        '.app-region-no-drag': {
          WebkitAppRegion: 'no-drag'
        }
      }
    }
  }
}

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      paper: colors.grey[900],
      default: colors.grey[900]
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.8)'
    },
    primary: {
      light: colors.blue[600],
      main: colors.blue[700],
      dark: colors.blue[800]
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: '#d9d9d94c',
            borderRadius: 999
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            borderRadius: 999
          }
        },
        '.app-region-drag': {
          WebkitAppRegion: 'drag'
        },
        '.app-region-no-drag': {
          WebkitAppRegion: 'no-drag'
        }
      }
    }
  }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ defaultColorMode, colorModeStorage, children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>(colorModeStorage?.getColorMode() || 'system')
  const matches = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    setColorMode(colorModeStorage?.getColorMode() || defaultColorMode || 'system')
  }, [defaultColorMode, colorModeStorage])

  const colorModeProviderValue = useMemo(() => {
    return {
      colorMode,
      setColorMode(colorMode: ColorMode) {
        setColorMode(colorMode)
        colorModeStorage?.setColorMode(colorMode)
      }
    }
  }, [colorMode, colorModeStorage])

  const themeProviderValue = useMemo(() => {
    const mode = colorMode === 'system' ? (matches ? 'dark' : 'light') : colorMode
    return createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions)
  }, [colorMode, matches])

  return (
    <ColorModeProvider value={colorModeProviderValue}>
      <MuiThemeProvider theme={themeProviderValue}>{children}</MuiThemeProvider>
    </ColorModeProvider>
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
