fs = require('fs')

function getStartOfPacketindex(dataString) {
  const startOfPacketSize = 4
  let startOfPacketindex = 0
  let index = startOfPacketSize

  while (index++ < dataString.length) {
    const element = new Set(dataString.slice(index - startOfPacketSize, index))
    if (element.size === startOfPacketSize) {
      startOfPacketindex = index
      break
    }
  }
  return startOfPacketindex
}

function getStartOfMessageIndex(dataString) {
  let startOfMessageIndex = 0
  const startOfMessageSize = 14
  let index = startOfMessageSize

  while (index++ < dataString.length) {
    const element = new Set(dataString.slice(index - startOfMessageSize, index))
    if (element.size === startOfMessageSize) {
      startOfMessageIndex = index
      break
    }
  }
  return startOfMessageIndex
}

try {
  const datastream = fs.readFileSync('./Day_6/day6data.txt', 'utf8')

  const startOfPacketindex = getStartOfPacketindex(datastream)
  const startOfMessageIndex = getStartOfMessageIndex(datastream)

  console.log('startOfPacketindex: ', startOfPacketindex)
  console.log('startOfMessageIndex: ', startOfMessageIndex)
} catch (err) {
  console.log(err)
}
