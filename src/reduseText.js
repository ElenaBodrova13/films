function reduseText(text) {
  const newArr = text.split(' ').slice(0, 20)

  const newText = newArr.join(' ')
  return `${newText}...`
}
export default reduseText
