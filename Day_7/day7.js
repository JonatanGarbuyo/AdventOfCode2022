fs = require('fs')

try {
  const terminalOutput = fs.readFileSync('./Day_7/day7data.txt', 'utf8')
  const terminalOutputList = terminalOutput.split(/\n/)

  const filesystem = parseFilesystem(terminalOutputList)
  const [totalRootDir, totalCount, allDirectories] = getSumDirectoriesSizes(
    filesystem['/']
  )
  const dirToDelete = getDirToDelete(allDirectories, totalRootDir)

  console.log('totalSumOfSmallDirectories: ', totalCount)
  console.log('dirToDelete: ', dirToDelete)
} catch (err) {
  console.log(err)
}

// Helper Functions
function getDirToDelete(allDirectories, totalRootDir) {
  const totalDiskSpace = 70000000
  const neededSpace = 30000000
  let freeSpace = totalDiskSpace - totalRootDir
  console.log('freeSpace: ', totalDiskSpace - totalRootDir)

  const directories = allDirectories.sort((dirA, dirB) => dirA - dirB)
  for (let index = 0; index < directories.length; index++) {
    const dir = directories[index]
    if (freeSpace + dir >= neededSpace) return dir
  }
}

function getSumDirectoriesSizes(directories) {
  let totalRootDir = 0
  let totalCount = 0
  const directoriesToDelete = []

  function getSumDirSize(dir) {
    if (!dir.hasOwnProperty('size')) return 0

    let count = 0
    for (const [key, value] of Object.entries(dir)) {
      if (key === 'size') {
        count += value
        continue
      }
      if (key === 'parentDir' || typeof value !== 'object') continue
      const size = getSumDirSize(value)
      count += size
    }

    if (count <= 100_000) totalCount += count
    if (count > 0) directoriesToDelete.push(count)

    return count
  }

  for (const [key, value] of Object.entries(directories)) {
    if (key === 'size') {
      totalRootDir += value
      continue
    }
    if (key === 'parentDir' || typeof value !== 'object') continue
    const size = getSumDirSize(value)
    totalRootDir += size
  }

  return [totalRootDir, totalCount, directoriesToDelete]
}

function parseFilesystem(terminalOutputList) {
  const sizeInit = 0
  const filesystem = {}
  let currentDir = filesystem

  const addNewFile = (newfile, fileSize) => {
    // currentDir[newfile] = fileSize
    currentDir.size += fileSize
  }

  const initDirectory = (dir) => {
    if (!currentDir.hasOwnProperty(dir)) currentDir[dir] = { size: sizeInit }
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
      addNewFile(rowList[1], parseInt(rowList[0]))
    }
  })

  return filesystem
}
