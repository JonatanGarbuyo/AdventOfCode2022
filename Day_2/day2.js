fs = require('fs')

const WINNING_POINTS = 6
const DRAW_POINTS = 3
const OPPONENT_OPTIONS = {
  A: 1, //"Rock",
  B: 2, //"Paper",
  C: 3, //"Scissors"
}
const MY_OPTIONS = {
  X: 1, //"Rock",
  Y: 2, //"Paper",
  Z: 3, //"Scissors"
}

function calculateFirstStrategyScore(roundsList) {
  return roundsList.reduce((acc, round) => {
    let [opponentOption, myOption] = round.split(' ')
    let opponentPlay = OPPONENT_OPTIONS[opponentOption]
    let myPlay = MY_OPTIONS[myOption]
    let play = opponentPlay - myPlay

    if (play === -2 || play == 1) {
      return acc + myPlay
    } else if (play === 2 || play === -1) {
      return acc + myPlay + WINNING_POINTS
    } else {
      return acc + myPlay + DRAW_POINTS
    }
  }, 0)
}

function getLosingChoice(opponentOption) {
  switch (opponentOption) {
    case 'A':
      return 3
    case 'B':
      return 1
    case 'C':
      return 2
  }
}
function getWinningChoice(opponentOption) {
  switch (opponentOption) {
    case 'A':
      return 2
    case 'B':
      return 3
    case 'C':
      return 1
  }
}

function calculateAlternateStrategyScore(roundsList) {
  return roundsList.reduce((acc, round) => {
    let [opponentOption, myOption] = round.split(' ')
    let opponentPlay = OPPONENT_OPTIONS[opponentOption]

    switch (myOption) {
      case 'X':
        return acc + 0 + getLosingChoice(opponentOption)
      case 'Y':
        return acc + DRAW_POINTS + opponentPlay
      case 'Z':
        return acc + WINNING_POINTS + getWinningChoice(opponentOption)
    }
    return 0
  }, 0)
}

try {
  // const strategy = `A Y\nB X\nC Z`;
  const strategy = fs.readFileSync('./day2data.txt', 'utf8')
  const roundsList = strategy.split(/\n/)
  const totalScore = calculateFirstStrategyScore(roundsList)
  const totalScore2 = calculateAlternateStrategyScore(roundsList)

  console.log('totalScore:', totalScore)
  console.log('totalScore2:', totalScore2)
} catch (err) {
  console.log(err)
}
