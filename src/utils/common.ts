export const generateStringKey = (function () {
  const generator = (function* () {
    let value = 0
    while (true) {
      yield `key_${(value += 1)}`
    }
  })()
  return function () {
    return generator.next().value
  }
})()

export function sleep(ms?: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms)
  })
}