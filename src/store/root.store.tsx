import React, { createContext, useContext } from 'react'
import { TimerStore } from './timer.store'

export class RootStore {
  timerStore: TimerStore

  constructor() {
    this.timerStore = new TimerStore(this)
  }
}

export const rootStore = new RootStore()

if (process.env.NODE_ENV === 'development') {
  Object.assign(window, { rootStore })
}

export const StoreContext = createContext<RootStore>(rootStore)

export interface StoreProviderProps {
  children?: React.ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

export const useStores = () => useContext<RootStore>(StoreContext)
