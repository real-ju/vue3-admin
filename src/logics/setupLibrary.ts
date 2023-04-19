import type { App } from 'vue';

import { setupDayjs } from './lib/dayjs';
import { setupNProgress } from './lib/nprogress';

export function setupLibrary(app: App) {
  setupDayjs();
  setupNProgress();
}
