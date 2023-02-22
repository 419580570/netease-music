import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/Home/index.vue"),
    children: [
      {
        path: "/",
        redirect: "/discover",
      },
      {
        path: "/discover",
        component: () => import("@/views/discover/index.vue"),
        redirect: "/discover/recommend",
        children: [
          {
            path: "/discover/recommend",
            component: () =>
              import("@/views/discover/childRoutes/recommend/index.vue"),
          },
          {
            path: "/discover/customized",
            component: () =>
              import("@/views/discover/childRoutes/customized.vue"),
          },
          {
            path: "/discover/playlist",
            component: () =>
              import("@/views/discover/childRoutes/playlist.vue"),
            // redirect: "/discover/playlist/playlists",
            // children: [
            //   {
            //     path: "/discover/playlist/playlists",
            //     component: Playlists,
            //   },
            //   {
            //     path: "/discover/playlist/bestplaylist/:id",
            //     component: BestPlaylist,
            //   },
            // ],
          },
          {
            path: "/discover/rankinglist",
            component: () =>
              import("@/views/discover/childRoutes/rankinglist.vue"),
          },
          {
            path: "/discover/singer",
            component: () => import("@/views/discover/childRoutes/singer.vue"),
          },
          {
            path: "/discover/latestmusic",
            component: () =>
              import("@/views/discover/childRoutes/latestmusic.vue"),
            // redirect: "/discover/latestmusic/newsong",
            // children: [
            //   {
            //     path: "/discover/latestmusic/newsong",
            //     component: NewSong,
            //   },
            //   {
            //     path: "/discover/latestmusic/newalbum",
            //     component: NewAlbum,
            //   },
            // ],
          },
        ],
      },
      {
        path: "/broadcast",
        component: () => import("@/views/broadcast/index.vue"),
      },
      {
        path: "/video",
        component: () => import("@/views/video/index.vue"),
      },
      {
        path: "/interest",
        component: () => import("@/views/interest/index.vue"),
      },
      {
        path: "/live",
        component: () => import("@/views/live/index.vue"),
      },
      {
        path: "/private",
        component: () => import("@/views/private/index.vue"),
      },
      {
        path: "/songlist/:id",
        component: () => import("@/views/songlist/index.vue"),
        children: [
          {
            path: "",
            name: "list",
            component: () => import("@/views/songlist/list.vue"),
          },
          {
            path: "",
            name: "comment",
            component: () => import("@/views/songlist/comment.vue"),
          },
          {
            path: "",
            name: "collector",
            component: () => import("@/views/songlist/collector.vue"),
          },
        ],
      },
      {
        path: "/search/:keyword",
        component: () => import("@/views/search/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    redirect: "/login/qrcode",
    children: [
      {
        path: "/login/qrcode",
        component: () => import("@/views/Login/index.vue"),
      },
      {
        path: "/login/phonenumber",
        component: () => import("@/views/Login/loginPhone.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
