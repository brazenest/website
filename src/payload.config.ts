import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Ventures } from './collections/Ventures'
import { CaseStudies } from './collections/CaseStudies'
import { Films } from './collections/Films'
import { Posts } from './collections/Posts'
import { SiteMeta } from './globals/SiteMeta'
import { About } from './globals/About'
import { Resume } from './globals/Resume'
import { BlogCategories } from './globals/BlogCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Ventures, CaseStudies, Films, Posts],
  globals: [SiteMeta, About, BlogCategories, Resume],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  sharp,
})
