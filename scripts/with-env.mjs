#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import process from 'node:process'
import dotenv from 'dotenv'

const [, , envFile, separator, ...commandParts] = process.argv

if (!envFile || separator !== '--' || commandParts.length === 0) {
  console.error('Usage: node scripts/with-env.mjs <env-file> -- <command>')
  process.exit(2)
}

if (!existsSync(envFile)) {
  console.error(`Environment file not found: ${envFile}`)
  process.exit(1)
}

const result = dotenv.config({ path: envFile })

if (result.error) {
  console.error(`Failed to load environment file: ${envFile}`)
  console.error(result.error.message)
  process.exit(1)
}

const [command, ...args] = commandParts

const child = spawn(command, args, {
  env: process.env,
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})

child.on('error', (error) => {
  console.error(`Failed to start command: ${command}`)
  console.error(error.message)
  process.exit(1)
})
