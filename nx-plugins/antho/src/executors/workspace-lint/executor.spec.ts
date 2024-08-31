import { WorkspaceLintExecutorSchema } from './schema';
import executor from './executor';

const options: WorkspaceLintExecutorSchema = {};

describe('WorkspaceLint Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
