// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  chat: icon('ic_chat'),
  test: icon('ic_test_test'),
  // analytics: icon('ic_analytics'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'ChatGPT',
    items: [
      // { title: '聊天', path: PATH_DASHBOARD.chat, icon: ICONS.chat },
      { title: '聊天', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: '页面2', path: PATH_DASHBOARD.two, icon: ICONS.test },
      // { title: 'Three', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
    ],
  },
  {
    subheader: 'API',
    items: [{ title: 'ChatGPT', path: PATH_DASHBOARD.chatgpt, icon: ICONS.test }],

    // children: [
    //   { title: 'ChatGPT', path: PATH_DASHBOARD.chatgpt, icon: ICONS.test },
    //   { title: 'ChatGPT', path: PATH_DASHBOARD.chatgpt, icon: ICONS.test },
    // ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  // items: [
  //   {
  //     title: 'user',
  //     path: PATH_DASHBOARD.user.root,
  //     icon: ICONS.user,
  //     children: [
  //       { title: 'Four', path: PATH_DASHBOARD.user.four },
  //       { title: 'Five', path: PATH_DASHBOARD.user.five },
  //       { title: 'Six', path: PATH_DASHBOARD.user.six },
  //     ],
  //   },
  // ],
  // },
];

export default navConfig;
