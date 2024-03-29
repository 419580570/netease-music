import { Ref } from "vue";

export function useObserve(
  lyricRefs: Ref<HTMLElement[]>,
  hoverLyric: Ref<string>,
  lyricRoot: Ref<HTMLElement | null>
) {
  let io: IntersectionObserver;

  /* 取消监听 */
  const stopObserve = () => {
    lyricRefs.value.forEach(item => {
      io.unobserve(item);
    });
  };

  /* 监听每句歌词是否处于中线附近 */
  const addObserve = () => {
    nextTick(() => {
      io = new IntersectionObserver(
        entrys => {
          entrys.forEach(lyric => {
            if (!lyric.isIntersecting) return;
            const time = (lyric.target as HTMLElement).dataset.time;
            if (!time) return;
            hoverLyric.value = time;
          });
        },
        {
          /* 以lyricRoot为监视根节点，监视范围在中线附近 */
          root: lyricRoot.value,
          rootMargin: `-49.5% 0px -49.5% 0px`,
        }
      );
      lyricRefs.value.forEach(item => {
        io.observe(item);
      });
    });
  };

  return {
    stopObserve,
    addObserve,
  };
}
