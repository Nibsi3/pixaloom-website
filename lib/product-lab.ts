export type LabProject = {
  name: string;
  code: string;
  category: string;
  status: 'Selected work' | 'Case study';
  description: string;
  href?: string;
  accent: string;
};

export const labProjects: LabProject[] = [
  {
    name: 'Drive',
    code: 'PX–01',
    category: 'Cloud workspace',
    status: 'Selected work',
    description: 'A calmer, more focused way for teams to organise, find and move their working files.',
    accent: '#8796b8',
  },
  {
    name: 'Quote Scanner',
    code: 'PX–02',
    category: 'Document intelligence',
    status: 'Selected work',
    description: 'A practical document workflow that turns supplier quotes into clear, comparable information.',
    accent: '#ff7557',
  },
  {
    name: 'Illumi',
    code: 'PX–03',
    category: 'Finance platform',
    status: 'Selected work',
    description: 'Invoicing, payments and lightweight finance tools designed around small-business reality.',
    href: '/work/illumi',
    accent: '#8ba0ff',
  },
  {
    name: 'TrakCare Scanner',
    code: 'PX–04',
    category: 'Healthcare utility',
    status: 'Case study',
    description: 'A fast barcode workflow that removes repetitive capture from healthcare operations.',
    href: '/work/trakcare-barcode-scanner',
    accent: '#efbcff',
  },
  {
    name: 'Slip a Tip',
    code: 'PX–05',
    category: 'Payments platform',
    status: 'Case study',
    description: 'A digital tipping product designed for simple guest payments and transparent team distribution.',
    href: '/work/slip-a-tip',
    accent: '#ffcf4f',
  },
  {
    name: 'NexAI',
    code: 'PX–06',
    category: 'AI infrastructure',
    status: 'Case study',
    description: 'Backend systems and AI workflows built to make advanced automation feel straightforward.',
    href: '/work/nexai',
    accent: '#65ddd1',
  },
];
