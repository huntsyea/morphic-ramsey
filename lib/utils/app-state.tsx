'use client'

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect
} from 'react'
import { usePathname } from 'next/navigation'

const AppStateContext = createContext<
  | {
      isGenerating: boolean
      setIsGenerating: (value: boolean) => void
    }
  | undefined
>(undefined)

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const pathname = usePathname()

  // Reset state when navigating to home
  useEffect(() => {
    if (pathname === '/') {
      setIsGenerating(false)
    }
  }, [pathname])

  return (
    <AppStateContext.Provider value={{ isGenerating, setIsGenerating }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
