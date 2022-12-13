import { songListDetailData } from "@/types";
import { ComputedRef, InjectionKey } from "vue";

export const key = Symbol() as InjectionKey<ComputedRef<songListDetailData>>;
