#!/usr/bin/env node

const glob = require('glob')
const chalk = require('chalk')
const _ = require('lodash')

const CHUNK_SIZE = 3
const CHUNK = process.env.CONTAINER_ID || 1

console.log(chalk.cyan('Getting all cypress tests'))

glob('cypress/integration/**/*.spec.js', function (err, files) {
  if (!files.length) {
    console.log(chalk.red('Could not find any matching files!'))
    return
  }
  console.log(chalk.green(`Found ${files.length} files`))
  const chunkSize = Math.ceil(files.length / CHUNK_SIZE)
  const chunks = _.chunk(files, chunkSize)

  console.log(chalk.green(`Setting chunk ${CHUNK}`))
  console.log(`::set-env name=CYPRESS_SPEC::${chunks[CHUNK - 1].join(',')}`)
})
