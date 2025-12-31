import { CollectionConfig } from 'payload/types';

const Variants: CollectionConfig = {
  slug: 'variants',
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Size', value: 'size' },
        { label: 'Material', value: 'material' },
        { label: 'Color', value: 'color' },
      ],
      required: true,
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
        },
      ],
      required: true,
    },
    {
      name: 'priceAdjustment',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'leadTimeDays',
      type: 'number',
      defaultValue: 0,
    },
  ],
};

export default Variants;