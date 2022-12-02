import utils from "./util";
export function useSlideColor(storageKey: string, currentPick: any, profile: any) {
  const { addStorage, getStorage } = utils();
  const ctcolor = ref(Number(getStorage(storageKey)));
  const percent = ref(0);

  const slide = (e: MouseEvent) => {
    if (!e.target) return;
    ctcolor.value = Number(getStorage(storageKey));
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    addStorage("color-pick", "custom");
    !profile.isLogin && (profile.profile.avatarUrl = `/src/assets/img/avatar-ofRed.png`)
    currentPick.value = "custom";
  };

  const handleUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
    addStorage(storageKey, String(value.value));
  };

  const handleMove = (e: MouseEvent) => {
    ctcolor.value += e.movementX * 0.8;
  };

  // onMounted(() => {
  //   ctcolor.value = Number(getStorage(storageKey));
  // });

  const value = computed(() => {
    if (ctcolor.value <= -7) {
      percent.value = 0;
      return -7;
    } else if (ctcolor.value >= 227) {
      percent.value = 1;
      return 227;
    }
    percent.value = Number(((ctcolor.value + 7) / 234).toFixed(4));
    return ctcolor.value;
  });

  return {
    value,
    slide,
    percent,
  };
}
