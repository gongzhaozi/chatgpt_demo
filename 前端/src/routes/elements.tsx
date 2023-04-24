import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------
// 设置网页文件的位置

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));

export const ChatPage = Loadable(lazy(() => import('../pages/dashboard/ChatPage')));
export const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
export const ChatGPT = Loadable(lazy(() => import('../pages/api/ChatGPT')));
// export const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
// export const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
// export const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
// export const PageSix = Loadable(lazy(() => import('../pages/PageSix')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
