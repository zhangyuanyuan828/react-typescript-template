import { makeAutoObservable } from 'mobx'
import { RootStore } from './root.store'

export class TimerStore {
  rootStore: RootStore

  seconds: number = 0

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, { rootStore: false }, { deep: false })
  }

  increase() {
    this.seconds++
  }
}
