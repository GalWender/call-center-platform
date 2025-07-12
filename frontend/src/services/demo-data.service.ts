import { callService } from './call.service';
import { suggestedTaskService } from './suggested-task.service';
import { tagService } from './tag.service';
import { taskService } from './task.service';

import type { NewTask } from '../types/task';
import { TaskStatus } from '../types/task';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSubset<T>(arr: T[], min: number, max?: number): T[] {
  const count = getRandomInt(min, max ?? arr.length);
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function createTags(): Promise<string[]> {
  const tagNames = [
    'Billing',
    'Technical',
    'Sales',
    'Onboarding',
    'Account',
    'Bug',
    'Feature Request',
    'Refund',
    'Cancellation',
    'Feedback',
    'Partnership',
    'Security',
    'API',
    'Mobile',
    'Desktop',
    'Usability',
  ];

  const docs = await Promise.all(tagNames.map(name => tagService.add({ name })));
  return docs.map(t => t._id);
}

async function createTasks(tagIds: string[]): Promise<NewTask[]> {
  const titles = [
    'Reset customer password',
    'Verify billing address',
    'Follow-up on feature request',
    'Escalate outage report',
    'Prepare onboarding email',
    'Schedule demo call',
    'Process refund',
    'Update knowledge base article',
    'Investigate login issue',
    'Review account for suspicious activity',
    'Generate sales report for Q3',
    'Draft partnership proposal',
    'Test new mobile app build',
    'Replicate reported UI bug',
    'Cancel customer subscription',
    'Document API endpoint changes',
  ];

  const tasks = await Promise.all(
    titles.map(title =>
      taskService.add({
        title,
        status: TaskStatus.OPEN,
        tagIds: getRandomSubset(tagIds, 1, 3),
      })
    )
  );
  return tasks.map(({ _id, ...rest }) => rest);
}

async function createSuggestedTasks(tagIds: string[]): Promise<void> {
  const titles = [
    'Send follow-up email',
    'Offer discount coupon',
    'Collect customer feedback',
    'Share troubleshooting guide',
    'Offer screen-share session',
    'Escalate to Tier 2 support',
    'Create a bug report ticket',
    'Log a feature request for the product team',
    'Provide a link to the relevant FAQ page',
    'Schedule a follow-up call for next week',
    'Update user account details with new info',
    'Send a summary of the call to the customer',
    'Add an internal note to the customer profile',
    'Check for recent system-wide outages',
    'Walk the customer through the onboarding tutorial',
    'Confirm issue resolution with customer',
    'Send customer satisfaction survey (CSAT)',
    'Update CRM with call outcome',
    'Check knowledge base for related articles',
    'Offer a credit to the customer account',
  ];

  await Promise.all(
    titles.map(title => suggestedTaskService.add({ title, tagIds: getRandomSubset(tagIds, 1, 3) }))
  );
}

async function createCalls(tagIds: string[], tasks: NewTask[]): Promise<void> {
  const subjects = [
    'Customer cannot login',
    'Invoice discrepancy',
    'Request for new feature integration',
    'Account cancellation inquiry',
    'Bug report: page crashes',
    'Difficulty updating payment method',
    'Unable to reset password',
    'Unexpected charge on account',
    'Mobile app crashes on launch',
    'Feature X not working as expected',
    'Question about pricing tiers',
    'Need help with onboarding steps',
    'Subscription upgrade request',
    'Data export assistance needed',
    'Integrations setup guidance',
    'Report latency issue during calls',
    'Security concern about account access',
    'How to use advanced search filters',
    'Request for API documentation clarification',
    'Complaint about support response time',
    'Feedback on new UI update',
    'Inquiry about service level agreement (SLA)',
    'Request to speak with a manager',
    'Problem with email notifications',
    'User profile information is incorrect',
    'Billing cycle clarification',
    'Free trial extension request',
    'Competitor comparison question',
    'How to add a new team member',
    'System is slow/unresponsive',
    'Video conferencing quality issues',
    'Positive feedback about recent feature',
    'Question about data privacy policy',
    'Request for a product demo for a colleague',
    'Difficulty finding a specific setting',
    'Audio echo during a call',
    'Cancelling a scheduled report',
    'Inquiry about enterprise plan features',
    'User interface is confusing',
    'Request to delete account data',
    'Payment failed for monthly subscription',
  ];

  await Promise.all(
    subjects.map(subject =>
      callService.add({
        subject,
        tagIds: getRandomSubset(tagIds, 1, 3),
        tasks: getRandomSubset(tasks, 1, 4),
      })
    )
  );
}

export async function seedDemoData(): Promise<void> {
  console.info('[Seeder] Starting demo data generation…');
  const tagIds = await createTags();
  console.info(`[Seeder] Created ${tagIds.length} tags.`);

  const tasks = await createTasks(tagIds);
  console.info(`[Seeder] Created ${tasks.length} tasks.`);

  await createSuggestedTasks(tagIds);
  console.info('[Seeder] Created suggested tasks.');

  await createCalls(tagIds, tasks);
  console.info('[Seeder] Created calls with embedded tasks.');

  console.info('[Seeder] Demo data generation complete ✔');
}

// @ts-ignore
if (typeof window !== 'undefined') window.seedDemoData = seedDemoData;
