import { createClient } from 'next-sanity';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env.local');

try {
    const envFile = await fs.readFile(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            process.env[key] = val;
        }
    });
} catch (e) {
    console.log('Could not load .env.local via manual parse (might be missing), trying process.env directly');
}

// Config
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;

if (!projectId || !token) {
    console.error('Missing projectId or token. Check .env.local');
    console.log('projectId:', projectId);
    console.log('token:', token ? '***' : 'missing');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-01-01',
});

console.log(`Connected to Sanity project: ${projectId}`);

// Data Definition
const projectsToSeed = [
    {
        title: 'Community',
        headline: 'Community Platform',
        description: 'A robust community engagement platform designed to foster connection and collaboration.',
        type: 'Web',
        desktopImgPath: 'public/projects/community-desktop.png',
        mobileImgPath: null,
        tags: ['Next.js', 'React', 'Community']
    },
    {
        title: 'Dockiship',
        headline: 'Logistics Solution',
        description: 'Streamlining shipping and logistics with intelligent tracking and management.',
        type: 'Web',
        desktopImgPath: 'public/projects/dockiship-desktop.png',
        mobileImgPath: null,
        tags: ['Logistics', 'Dashboard', 'Web App']
    },
    {
        title: 'Magnet',
        headline: 'Attraction & Marketing',
        description: 'Digital marketing and lead generation platform for modern businesses.',
        type: 'Web',
        desktopImgPath: 'public/projects/magnet-desktop.png',
        mobileImgPath: null,
        tags: ['Marketing', 'SaaS', 'Web']
    },
    {
        title: 'Nutrilife',
        headline: 'Health & Nutrition',
        description: 'Mobile companion for tracking nutrition, health goals, and wellness habits.',
        type: 'Mobile',
        desktopImgPath: null,
        mobileImgPath: 'public/projects/nutrilife-mobile.png',
        tags: ['Health', 'Mobile App', 'Wellness']
    },
    {
        title: 'OWS',
        headline: 'Omni Web Systems',
        description: 'Comprehensive web and mobile solution for enterprise system management.',
        type: 'Web & Mobile',
        desktopImgPath: 'public/projects/ows-desktop.png',
        mobileImgPath: 'public/projects/ows-mobile.png',
        tags: ['Enterprise', 'Cross-Platform', 'System']
    },
    {
        title: 'Restro',
        headline: 'Restaurant Management',
        description: 'All-in-one POS and management system for the hospitality industry.',
        type: 'Web',
        desktopImgPath: 'public/projects/restro-desktop.png',
        mobileImgPath: null,
        tags: ['Hospitality', 'POS', 'Web']
    }
];

async function uploadImage(filePath) {
    if (!filePath) return null;
    try {
        const absolutePath = path.resolve(__dirname, '..', filePath);
        const buffer = await fs.readFile(absolutePath);
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(filePath)
        });
        console.log(`Uploaded ${filePath} -> ${asset._id}`);
        return asset._id;
    } catch (err) {
        console.error(`Failed to upload ${filePath}:`, err.message);
        return null;
    }
}

async function seed() {
    console.log('Starting seed process...');

    for (const p of projectsToSeed) {
        console.log(`Processing ${p.title}...`);

        // Upload Images
        let desktopAssetId = null;
        let mobileAssetId = null;

        if (p.desktopImgPath) {
            desktopAssetId = await uploadImage(p.desktopImgPath);
        }
        if (p.mobileImgPath) {
            mobileAssetId = await uploadImage(p.mobileImgPath);
        }

        // Create Document
        const doc = {
            _type: 'project',
            title: p.title,
            headline: p.headline,
            description: p.description,
            type: p.type,
            techStack: p.tags.join(', '),
            features: [], // Empty for now
        };

        if (desktopAssetId) {
            doc.desktopImg = {
                _type: 'image',
                asset: { _type: 'reference', _ref: desktopAssetId }
            };
        }

        if (mobileAssetId) {
            doc.mobileImg = {
                _type: 'image',
                asset: { _type: 'reference', _ref: mobileAssetId }
            };
        }

        const res = await client.create(doc);
        console.log(`Created document for ${p.title}: ${res._id}`);
    }

    console.log('Done!');
}

seed().catch(err => console.error(err));
