fs = require('fs')

try {
  const treesData = fs.readFileSync('./Day_8/day8data.txt', 'utf8')
  const treeList = treesData
    .split(/\n/)
    .map((row) => row.split('').map((num) => parseInt(num)))
  const visibleTrees = getVisibleTrees(treeList)
  const maxScenicScore = getMaxScenicScore(treeList)

  console.log('visibleTrees: ', visibleTrees)
  console.log('maxScenicScore: ', maxScenicScore)
} catch (err) {
  console.log(err)
}

//  Helper Functions
function getMaxScenicScore(treeList) {
  let maxScenicScore = treeList[0].length * 2 + treeList.length * 2 - 4

  for (let i = 1; i < treeList.length - 1; i++) {
    const row = treeList[i]
    for (let j = 1; j < row.length - 1; j++) {
      const tree = row[j]
      const treeMaxScenicScore = getTreeMaxScenicScore(i, j, treeList)
      maxScenicScore = Math.max(treeMaxScenicScore, maxScenicScore)
    }
  }
  return maxScenicScore
}

function getTreeMaxScenicScore(row, col, array) {
  const tree = array[row][col]

  // check previous trees
  let lScore = 0
  for (let i = col - 1; i >= 0; i--) {
    const prevTree = array[row][i]
    if (tree <= prevTree) {
      lScore++
      break
    }
    lScore++
  }

  // check next trees
  let rScore = 0
  for (let i = col + 1; i < array[row].length; i++) {
    const nextTree = array[row][i]
    if (tree <= nextTree) {
      rScore++
      break
    }
    rScore++
  }

  // check upper trees
  let upScore = 0
  for (let i = row - 1; i >= 0; i--) {
    const prevTree = array[i][col]
    if (tree <= prevTree) {
      upScore++
      break
    }
    upScore++
  }

  // check next trees
  let dScore = 0
  for (let i = row + 1; i < array.length; i++) {
    const nextTree = array[i][col]
    if (tree <= nextTree) {
      dScore++
      break
    }
    dScore++
  }

  return lScore * rScore * upScore * dScore
}

function getVisibleTrees(treeList) {
  let visibleTrees = treeList[0].length * 2 + treeList.length * 2 - 4

  for (let i = 1; i < treeList.length - 1; i++) {
    const row = treeList[i]
    for (let j = 1; j < row.length - 1; j++) {
      const tree = row[j]
      if (isTreeVisibleinRow(j, row) || isTreeVisibleinColumn(i, j, treeList)) {
        visibleTrees++
      }
    }
  }
  return visibleTrees
}

function isTreeVisibleinRow(index, array) {
  const tree = array[index]
  let isVisible = true

  // check previous trees
  for (let i = index - 1; i >= 0; i--) {
    const prevTree = array[i]
    if (tree <= prevTree) {
      isVisible = false
      break
    }
  }
  if (isVisible) return true

  // check next trees
  isVisible = true
  for (let i = index + 1; i < array.length; i++) {
    const nextTree = array[i]
    if (tree <= nextTree) {
      isVisible = false
      break
    }
  }

  return isVisible
}

function isTreeVisibleinColumn(row, col, array) {
  const tree = array[row][col]
  let isVisible = true

  // check previous trees
  for (let i = row - 1; i >= 0; i--) {
    const prevTree = array[i][col]
    if (tree <= prevTree) {
      isVisible = false
      break
    }
  }
  if (isVisible) return true

  // check next trees
  isVisible = true
  for (let i = row + 1; i < array.length; i++) {
    const nextTree = array[i][col]
    if (tree <= nextTree) {
      isVisible = false
      break
    }
  }

  return isVisible
}
