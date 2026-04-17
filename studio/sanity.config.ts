import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
    name: 'imadi-studio',
    title: 'IMADI Innovations',
    projectId,
    dataset,
    plugins: [
        structureTool(),
        visionTool(),
    ],
    schema: {
        types: schemaTypes,
    },
})
