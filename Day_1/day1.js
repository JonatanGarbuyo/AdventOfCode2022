fs = require('fs')

try {
  const elvesAndCalories = fs.readFileSync('./day1data.txt', 'utf8')
  const elvesAndCaloriesList = elvesAndCalories
    .split(/\n\n/)
    .map((user) => user.replace(/\s|\n]/g, ','))

  const elvesByCaloriesList = elvesAndCaloriesList
    .map((elf) =>
      elf.split(',').reduce((prev, curr) => {
        return prev + parseInt(curr)
      }, 0)
    )
    .sort((a, b) => b - a)

  const topElf = elvesByCaloriesList[0]
  const topThreeElvesTotalCalories = elvesByCaloriesList
    .slice(0, 3)
    .reduce((prev, curr) => prev + curr, 0)

  console.log('topElf:', topElf)
  console.log('topThreeElvesTotalCalories:', topThreeElvesTotalCalories)
} catch (err) {
  console.log(err)
}
