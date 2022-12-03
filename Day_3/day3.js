fs = require('fs')

function getPriority(char = '') {
  const code = `${char}`.charCodeAt()
  return code > 96 ? code - 96 : code - 38
}

function getSumOfPriorities(rucksacksList) {
  return rucksacksList.reduce((sum, rucksack) => {
    const halfRuck = rucksack.length / 2
    const first = rucksack.slice(0, halfRuck)
    const second = rucksack.slice(halfRuck, undefined)

    const item = first.split('').filter((char) => second.includes(char))
    return sum + getPriority(item)
  }, 0)
}

function getSumOfbadgesPriorities(rucksacksList) {
  let sum = 0

  for (let i = 0; i < rucksacksList.length; i += 3) {
    const rucksacksItemsList = rucksacksList.slice(i, i + 3)
    const firstRucksacksItemsList = rucksacksItemsList[0].split('')

    const badge = firstRucksacksItemsList.filter(
      (item) =>
        rucksacksItemsList[1].includes(item) &&
        rucksacksItemsList[2].includes(item)
    )
    sum += getPriority(badge)
  }

  return sum
}

try {
  const rucksacks = fs.readFileSync('./day3data.txt', 'utf8')
  const rucksacksList = rucksacks.split(/\n/)

  const sumOfPriorities = getSumOfPriorities(rucksacksList)
  const sumOfbadgesPriorities = getSumOfbadgesPriorities(rucksacksList)

  console.log(sumOfPriorities)
  console.log(sumOfbadgesPriorities)
} catch (err) {
  console.log(err)
}
