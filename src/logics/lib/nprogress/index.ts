import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function setupNProgress() {
  NProgress.configure({ showSpinner: false });
}
