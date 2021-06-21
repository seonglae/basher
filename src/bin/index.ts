#!/usr/bin/env node

import { Command, Option } from 'commander'
import basher from '../index'

const consola = require('consola')
const { version, description }: { version: string; description: string } = require('../../package.json')
const program = new Command()

async function main() {
  // set version
  program.version(version, '-v, --version').description(description)

  // make options
  const boolOption = new Option('-b, --bool', 'bool option example').default(false)
  const stringOption = new Option('-s, --string <input>', 'string option example').default('')

  // Run file command
  program
    .command('run <command>')
    .alias('r')
    .description('Basher Run')
    .addOption(boolOption)
    .addOption(stringOption)
    .action(async (command: string, options: { bool: boolean; string: string }): Promise<void> => {
      basher.run()
      consola.info(command, options)
    })

  program.parse(process.argv)
}

main().catch((e: Error) => consola.error(e))
