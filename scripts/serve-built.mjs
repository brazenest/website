#!/usr/bin/env node
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const distDir = join(process.cwd(), 'dist')
const entry = readdirSync(distDir).find((file) =>
  /^entry\.fastify-.*\.js$/.test(file),
)

if (!entry) {
  console.error('No Fastify server entry found in dist/. Run the production build first.')
  process.exit(1)
}

await import(pathToFileURL(join(distDir, entry)).href)
