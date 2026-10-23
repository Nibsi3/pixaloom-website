import { rescuePackages } from './ai-rescue';

const buildBudgets = ['R10k-R25k', 'R25k-R50k', 'R50k-R100k', 'R100k+', 'Need guidance'];

export function contactBudgetOptions(service: string): readonly string[] {
  if (!service) return [];
  if (service === 'AI rescue enquiry') {
    return [...rescuePackages.map(item => `${item.name} — ${item.price.startsWith('From ') ? item.price : `From ${item.price}`}`), 'Need guidance'];
  }
  if (service === 'SEO and content' || service === 'Website care') return ['Need guidance'];
  return buildBudgets;
}

export function contactBudgetHelp(service: string): string {
  if (!service) return 'Choose a service to see the relevant budget options.';
  if (service === 'AI rescue enquiry') return 'Quick Fix covers one defined problem; Ship It covers an agreed launch; Full Rescue starts with assessment of connected issues. Package suitability and scope are confirmed after review. Hosting, domains and third-party charges are separate.';
  if (service === 'SEO and content' || service === 'Website care') return 'This service is quoted after an assessment. Choose Need guidance and describe the work in your brief.';
  return 'Share your available budget, even if it is below a custom build allowance. Focused custom websites are planned at R35,000–R55,000, ecommerce from R60,000 and custom apps from R80,000, before optional work, VAT where applicable and recurring costs. We will discuss what fits your scope.';
}
