const debounce = (fn, debounceTime) => {
  let timer
  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, debounceTime)
  }
}

export default debounce
