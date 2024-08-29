import { ActionFunction } from '@remix-run/node';
import { schema } from '@home-dashboard/dashboard-content';
import * as fs from 'node:fs/promises';

const storageFileName = 'cells.json';

async function getCellsData(): Promise<any[]> {
  try {
    const fileContent = await fs.readFile(storageFileName, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();

  const parseResult = schema.safeParse(body);
  if (!parseResult.success) {
    return new Response(JSON.stringify(parseResult.error), { status: 400 });
  }

  const cells = await getCellsData();

  cells.push(parseResult.data);

  await fs.writeFile(storageFileName, JSON.stringify(cells));

  return new Response(JSON.stringify(parseResult.data), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
