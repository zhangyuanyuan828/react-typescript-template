import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string, defaultState?: boolean) => {
  const [matches, setMatches] = useState<boolean>(defaultState === undefined ? matchMedia(query).matches : defaultState)

  useEffect(() => {
    const media = matchMedia(query)
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    setMatches(media.matches)
    media.addEventListener('change', handleMediaChange)
    return () => {
      media.removeEventListener('change', handleMediaChange)
    }
  }, [query])

  return matches
}
