fs = require('fs')

try {
  const terminalOutput = fs.readFileSync('./Day_7/day7data.txt', 'utf8')
  const terminalOutputList = terminalOutput.split(/\n/)

  const filesystem = parseFilesystem(terminalOutputList)
  const [totalRootDir, totalCount, allDirectories] = getSumDirectoriesSizes(
    filesystem['/']
  )
  const sizeOfDirToDelete = getSizeOfDirToDelete(allDirectories, totalRootDir)

  console.log('totalSumOfSmallDirectories: ', totalCount)
  console.log('dirToDelete: ', sizeOfDirToDelete)
} catch (err) {
  console.log(err)
}

// Helper Functions
function getSizeOfDirToDelete(allDirectories, totalRootDir) {
  const TOTAL_DISK_SPACE = 70000000
  const NEEDED_SPACE = 30000000
  const freeSpace = TOTAL_DISK_SPACE - totalRootDir

  const directories = allDirectories.sort((dirA, dirB) => dirA - dirB)
  for (let index = 0; index < directories.length; index++) {
    const dir = directories[index]
    if (freeSpace + dir >= NEEDED_SPACE) return dir
  }
}

function getSumDirectoriesSizes(directories) {
  let totalRootDir = 0
  let totalCount = 0
  const allDirectories = []

  function getSumDirSize(dir) {
    if (!dir.hasOwnProperty('size')) return 0

    let count = 0
    for (const [key, value] of Object.entries(dir)) {
      if (key === 'parentDir') continue
      const size = getSumDirSize(value)
      count += key === 'size' ? value : size
    }

    if (count <= 100_000) totalCount += count
    if (count > 0) allDirectories.push(count)

    return count
  }

  for (const [key, value] of Object.entries(directories)) {
    if (key === 'parentDir') continue
    const size = getSumDirSize(value)
    totalRootDir += key === 'size' ? value : size
  }

  return [totalRootDir, totalCount, allDirectories]
}

function parseFilesystem(terminalOutputList) {
  const INITIAL_SIZE = 0
  const FILESYSTEM = {}
  let currentDir = FILESYSTEM

  const addNewFile = (fileSize) => {
    currentDir.size += fileSize
  }

  const initDirectory = (dir) => {
    if (!currentDir.hasOwnProperty(dir))
      currentDir[dir] = { size: INITIAL_SIZE }
  }

  const changeDirectory = (cdArg) => {
    if (cdArg === '..') {
      currentDir = currentDir.parentDir
    } else {
      initDirectory(cdArg)
      currentDir[cdArg].parentDir = currentDir
      currentDir = currentDir[cdArg]
    }
  }

  terminalOutputList.forEach((row) => {
    const rowList = row.split(' ')
    if (rowList[0] === '$' && rowList[1] === 'cd') {
      changeDirectory(rowList[2])
    } else if (rowList[0] === 'dir') {
      initDirectory(rowList[1])
    } else if (!isNaN(rowList[0])) {
      addNewFile(parseInt(rowList[0]))
    }
  })

  return FILESYSTEM
}
