#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')
const _ = require('lodash')

const CHUNK_SIZE = 3

console.log(chalk.cyan('Getting all cypress tests'))

glob('cypress/integration/**/*.spec.js', function (err, files) {
  if (!files.length) {
    console.log(chalk.red('Could not find any matching files!'))
    return
  }
  console.log(chalk.green(`Found ${files.length} files`))
  const chunkSize = Math.ceil(files.length / CHUNK_SIZE)
  const chunks = _.chunk(files, chunkSize)

  fs.writeFile('test-chunks.json', JSON.stringify(chunks, null, 2), err => {
    if (err) throw err

    console.log(
      chalk.green(`Outputted ${chunks.length} chunks in test-chunks.json`),
    )
  })
})
