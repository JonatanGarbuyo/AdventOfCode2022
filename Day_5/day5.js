fs = require('fs')

function getProceduresList(procedure) {
  return procedure.split(/\n/).map((row) => {
    const rowArr = row.split(' ')
    return {
      crateIndex: parseInt(rowArr[1]) - 1,
      fromStackIndex: parseInt(rowArr[3]) - 1,
      toStackIndex: parseInt(rowArr[5]) - 1,
    }
  })
}

function getCratesStacks(crates) {
  const cratesRows = crates.split(/\n/)
  const stacks = cratesRows.map(() => [])

  cratesRows.forEach((row, index) => {
    if (index < cratesRows.length - 1) {
      for (let i = 0, k = 0; i <= cratesRows.length; i++, k += 4) {
        const crate = row.slice(k, k + 3).replace('   ', '')

        if (crate) stacks[i].push(crate)
      }
    }
  })
  return stacks
}

function getOrderedCratesStacks(cratesStacks, procedures) {
  const stacks = JSON.parse(JSON.stringify(cratesStacks))
  procedures.forEach((procedure) => {
    const { crateIndex, fromStackIndex, toStackIndex } = procedure

    for (let index = 0; index <= crateIndex; index++) {
      stacks[toStackIndex].unshift(stacks[fromStackIndex][0])
      stacks[fromStackIndex].splice(0, 1)
    }
  })
  return stacks
}

function getOrderedCratesStacksCrateMover9001(cratesStacks, procedures) {
  const stacks = JSON.parse(JSON.stringify(cratesStacks))
  procedures.forEach((procedure) => {
    const { crateIndex, fromStackIndex, toStackIndex } = procedure
    const craneCargo = stacks[fromStackIndex].slice(0, crateIndex + 1)
    stacks[fromStackIndex].splice(0, crateIndex + 1)
    const currStack = stacks[toStackIndex]
    stacks[toStackIndex] = craneCargo.concat(currStack)
  })
  return stacks
}

try {
  const cratesAndProcedure = fs.readFileSync('./Day_5/day5data.txt', 'utf8')
  const [crates, procedure] = cratesAndProcedure.split(/\n\n/)
  const procedures = getProceduresList(procedure)
  const cratesStacks = getCratesStacks(crates)
  const orderedCratesStacks = getOrderedCratesStacks(cratesStacks, procedures)
  const orderedCratesStacks2 = getOrderedCratesStacksCrateMover9001(
    cratesStacks,
    procedures
  )

  orderedCratesStacks.forEach((stack) => console.log(stack[0][1]))
  console.log('####')
  orderedCratesStacks2.forEach((stack) => console.log(stack[0][1]))
} catch (err) {
  console.log(err)
}
