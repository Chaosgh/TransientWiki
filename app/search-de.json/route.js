import { getSearchIndex } from '../../src/wiki/content';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(getSearchIndex('de'));
}
