import { Ref } from "vue";

export default function useImgLoad(ImgLoad: Ref<HTMLElement | undefined>) {
  let isLoad = ref<boolean>(true);

  onMounted(() => {
    ImgLoad.value!.onload = () => {
      isLoad.value = false;
    };
  });

  return {
    isLoad,
  };
}
