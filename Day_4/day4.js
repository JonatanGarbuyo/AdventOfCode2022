fs = require('fs')

function isPairOverlapping(pair) {
  const [first, second] = pair.split(',')
  const firstPair = first.split('-')
  const secondPair = second.split('-')

  const firstContainsSecond =
    parseInt(firstPair[0]) <= parseInt(secondPair[0]) &&
    parseInt(firstPair[1]) >= parseInt(secondPair[1])
  const secondContainsFirst =
    parseInt(secondPair[0]) <= parseInt(firstPair[0]) &&
    parseInt(secondPair[1]) >= parseInt(firstPair[1])

  return firstContainsSecond || secondContainsFirst
}

function isPairOverlappingAtAll(pair) {
  const [first, second] = pair.split(',')
  const firstPair = first.split('-')
  const secondPair = second.split('-')

  const firstContainsSecond =
    parseInt(firstPair[1]) <= parseInt(secondPair[1]) &&
    parseInt(firstPair[1]) >= parseInt(secondPair[0])
  const secondContainsFirst =
    parseInt(secondPair[1]) <= parseInt(firstPair[1]) &&
    parseInt(secondPair[1]) >= parseInt(firstPair[0])

  return firstContainsSecond || secondContainsFirst
}

function getAssignmentPairsRepetition(pairsList) {
  return pairsList.filter(isPairOverlapping).length
}
function getAssignmentPairsOverlapping(pairsList) {
  return pairsList.filter(isPairOverlappingAtAll).length
}

try {
  const assignmentPairs = fs.readFileSync('./Day_4/day4data.txt', 'utf8')
  const assignmentPairsList = assignmentPairs.split(/\n/)
  const sumOfPairsRepetition = getAssignmentPairsRepetition(assignmentPairsList)
  const sumOfPairsOverlapping =
    getAssignmentPairsOverlapping(assignmentPairsList)

  console.log(sumOfPairsRepetition)
  console.log(sumOfPairsOverlapping)
} catch (err) {
  console.log(err)
}
