import { OverviewPage } from '../pages/overviewPage';
import { json, useLoaderData } from '@remix-run/react';
import { loadProjects } from '../server/projectController.server';


export const loader = async () => {
  return json({
    projects: await loadProjects()
  })
}

export default function Index() {

  const {projects} = useLoaderData<typeof loader>();

  return <OverviewPage projects={projects} />;
}
