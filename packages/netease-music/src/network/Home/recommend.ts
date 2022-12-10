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

export function getPrivatecontent() {
  return get("personalized/privatecontent");
}

export function geNewSong() {
  return get("top/song");
}

export function getrcMV() {
  return get("personalized/mv");
}
