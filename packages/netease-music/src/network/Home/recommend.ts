import { get } from "../axios";

export function getCarouselData() {
  return get("/banner");
}

export function getRecommendData(limit: number) {
  return get("personalized", {
    limit,
  });
}

export function getDailyRecommend() {
  return get("/recommend/resource");
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
