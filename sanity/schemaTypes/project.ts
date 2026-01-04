import { defineField, defineType } from 'sanity'
import { FolderKanban } from 'lucide-react'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    icon: FolderKanban,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: ['Web', 'Mobile', 'Web & Mobile'],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'feature',
                    fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'desc', type: 'string' })
                    ]
                })
            ],
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'string',
        }),
        defineField({
            name: 'desktopImg',
            title: 'Desktop Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'mobileImg',
            title: 'Mobile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'hideDesktop',
            title: 'Hide Desktop Frame?',
            type: 'boolean',
            initialValue: false
        })
    ],
})
