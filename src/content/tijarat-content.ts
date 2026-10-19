/** Supported by work/project-research/products-education-wellness.json, T01–T09. */
export const tijaratProduct = {
  description:
    'Tijarat connects billing, stock, customer balances, supplier activity and reports in one business workspace. Local-first sales entry and background synchronization support the working day when connectivity is interrupted.',
  features: [
    'Invoices, discounts and split payments',
    'Products, variants and stock movement',
    'Customer balances and supplier activity',
    'Sales, stock, expense and payment reports',
    'Local-first billing with background synchronization',
    'Staff permissions and store assignments',
  ],
  eyebrow: 'BUSINESS SOFTWARE FOR RETAIL & WHOLESALE',
}

export const tijaratFeatureCards = [
  {
    title: 'Billing with the details in view',
    description:
      'Select products, variants and units, review discounts and charges, and record split payments or the remaining customer balance.',
  },
  {
    title: 'Sales and stock together',
    description:
      'Keep invoices connected to stock movements, payment records and customer balances, with quotations and orders for work beyond the counter.',
  },
  {
    title: 'Reports for the working day',
    description:
      'Review sales, current and low stock, receivables, supplier payables, purchases, expenses and cash movements in dedicated report views.',
  },
  {
    title: 'Access and continuity',
    description:
      'Assign staff permissions and stores. Core billing keeps local records and queues changes for background cloud synchronization.',
  },
]

export const tijaratImageCaption =
  'Tijarat invoicing interface from the existing public product material; layout may differ by version.'

/** Preserve headings, links and other editor-controlled fields outside this update. */
export function withTijaratProductContent<T extends Record<string, any>>(
  current: T,
  image: string | number,
  logo: string | number,
) {
  return {
    ...current,
    name: 'Tijarat',
    description: tijaratProduct.description,
    image,
    logo,
    composition: 'single',
    imageCaption: tijaratImageCaption,
    secondaryImages: [],
    features: tijaratProduct.features.map((text, index) => ({
      ...(current.features?.[index] || {}),
      text,
    })),
  }
}
