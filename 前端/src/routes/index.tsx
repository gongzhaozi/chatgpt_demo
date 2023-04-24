import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  LoginPage,
  Page404,
  ChatPage,
  PageTwo,
  ChatGPT,
  // PageSix,
  // PageFour,
  // PageFive,
  // PageThree,
} from './elements';

// ----------------------------------------------------------------------
// 设置导航位置

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // { path: 'chat', element: <ChatPage /> },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'two', element: <PageTwo /> },
        // { path: 'three', element: <PageThree /> },
        {
          path: 'api',
          children: [{ path: 'chatgpt', element: <ChatGPT /> }],
        },
        // {
        //   path: 'user',
        //   children: [
        //     { element: <Navigate to="/dashboard/user/four" replace />, index: true },
        //     { path: 'four', element: <PageFour /> },
        //     { path: 'five', element: <PageFive /> },
        //     { path: 'six', element: <PageSix /> },
        //   ],
        // },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
