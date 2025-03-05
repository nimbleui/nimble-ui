import {defineViteConfig} from '@nimble-ui/config';

export default defineViteConfig({
  test: {
    environment: 'jsdom',
  },
});
