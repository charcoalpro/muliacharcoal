/**
 * People — single source of truth for every named individual on the site.
 *
 * Each entry has a `displayIn` array of tags that drive which surface(s)
 * render the person:
 *
 *   'owner'              — registered company owner; surfaces in /about
 *                          owner card and Organization JSON-LD founder.
 *                          Exactly one person should carry this.
 *   'executive'          — director / consultant; Footer + About schema.
 *   'operations'         — operations head / manager; /about operations grid.
 *   'contact-team'       — sales / export-desk member; /contact team grid.
 *   'whatsapp-director'  — director-intro WhatsApp preset / LocalBusiness.
 *   'whatsapp-sales'     — sales-general WhatsApp preset.
 *
 * Use `getOwner()`, `getExecutives()`, `getOperations()`, `getContactTeam()`,
 * `getDirector()`, `getSales()` (in `helpers.ts`) instead of filtering by hand.
 * Cards whose `name` starts with `TODO_PLACEHOLDER` must be skipped at render
 * time so placeholder strings never ship.
 */

import type { DisplayTag, Person } from './types';

export const people: Person[] = [
  // Wilson Gosalim — owner, director, primary WhatsApp contact, sales team.
  {
    name: 'Wilson Gosalim',
    role: 'Owner & Director',
    bio: null,
    email: 'wilson@muliacharcoal.com',
    phone: {
      display: '+62 821 287 68 545',
      e164: '+6282128768545',
    },
    whatsapp: {
      e164Digits: '6282128768545',
      display: '+62 821 287 68 545',
      preset:
        'Hello Mr. Gosalim — I am a wholesale buyer interested in your coconut shisha charcoal. Could we discuss specifications and pricing?',
    },
    linkedin: null,
    photo: '/team/wilson-gosalim.jpg',
    languages: ['English', 'Bahasa Indonesia'],
    displayIn: ['owner', 'executive', 'contact-team', 'whatsapp-director'] as DisplayTag[],
  },

  // Sales Manager placeholder — fills the dedicated WhatsApp-sales route
  // until a real rep is hired.
  {
    name: 'TODO_PLACEHOLDER_SALES_MANAGER',
    role: 'Sales Manager',
    email: 'sales@muliacharcoal.com',
    phone: {
      display: '+62 800 0000 0002',
      e164: '+6280000000002',
    },
    whatsapp: {
      e164Digits: '6280000000002',
      display: '+62 800 0000 0002',
      preset:
        'Hello, I am interested in placing a wholesale order for coconut shisha charcoal. Please share your latest price list and MOQ.',
    },
    photo: '/team/sales-manager.jpg',
    languages: ['English', 'Mandarin', 'Bahasa Indonesia'],
    displayIn: ['contact-team', 'whatsapp-sales'] as DisplayTag[],
  },

  // Export Coordinator placeholder.
  {
    name: 'TODO_PLACEHOLDER_EXPORT_COORDINATOR',
    role: 'Export Coordinator',
    email: 'export.ops@muliacharcoal.com',
    phone: {
      display: '+62 800 0000 0003',
      e164: '+6280000000003',
    },
    whatsapp: {
      e164Digits: '6280000000003',
      display: '+62 800 0000 0003',
      preset:
        'Hello, I have a question about export documentation and shipping for your coconut shisha charcoal. Could you assist?',
    },
    photo: '/team/export-coordinator.jpg',
    languages: ['English', 'Bahasa Indonesia', 'Arabic'],
    displayIn: ['contact-team'] as DisplayTag[],
  },

  // Other directors and the consultant — executive-only entries.
  { name: 'Henry Gosalim', role: 'Director', displayIn: ['executive'] as DisplayTag[] },
  { name: 'Gatot Wibowo', role: 'Director', displayIn: ['executive'] as DisplayTag[] },
  {
    name: 'Greg Ryabtsev',
    role: 'Charcoal Expert / Consultant',
    displayIn: ['executive'] as DisplayTag[],
  },

  // Operations roster — seven heads-of-department, all placeholder until
  // management confirms. Each row is hidden until `name` is real.
  {
    name: 'TODO_PLACEHOLDER_OPS_DIRECTOR',
    role: 'Operational Director',
    email: null,
    phone: null,
    displayIn: ['operations'] as DisplayTag[],
  },
  {
    name: 'TODO_PLACEHOLDER_QC_MANAGER',
    role: 'Quality Control Manager',
    email: null,
    phone: null,
    displayIn: ['operations'] as DisplayTag[],
  },
  {
    name: 'TODO_PLACEHOLDER_HEAD_FINANCE',
    role: 'Head of Finance',
    email: null,
    phone: null,
    displayIn: ['operations'] as DisplayTag[],
  },
  {
    name: 'TODO_PLACEHOLDER_HEAD_WAREHOUSE',
    role: 'Head of Warehouse',
    email: null,
    phone: null,
    displayIn: ['operations'] as DisplayTag[],
  },
  {
    name: 'TODO_PLACEHOLDER_HEAD_PACKAGING',
    role: 'Head of Packaging',
    email: null,
    phone: null,
    displayIn: ['operations'] as DisplayTag[],
  },
  {
    name: 'TODO_PLACEHOLDER_HEAD_CRUSHER',
    role: 'Head of Crusher Operations',
    email: null,
    phone: null,
    displayIn: ['operations'] as DisplayTag[],
  },
  {
    name: 'TODO_PLACEHOLDER_HEAD_LOGISTICS',
    role: 'Head of Logistics',
    email: null,
    phone: null,
    displayIn: ['operations'] as DisplayTag[],
  },
];
