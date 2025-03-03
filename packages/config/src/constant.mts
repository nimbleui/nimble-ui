import url from 'url';
import path from 'path';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const rootDir = path.resolve(dirname, '../../../');
