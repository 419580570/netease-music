import { get } from "../axios";

export function getCarouselData() {
  return get("homepage/block/page", {
    refresh: true,
  });
}

export function getRecommendData(data: any) {
  return get("personalized", {
    limit: data.limit,
  });
}
