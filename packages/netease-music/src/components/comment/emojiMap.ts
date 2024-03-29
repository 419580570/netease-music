export const EmojiMap: Record<string, string> = {
  亲: "362",
  亲亲: "363",
  便便: "89",
  兔子: "459",
  公鸡: "461",
  发怒: "115",
  口罩: "351",
  可爱: "85",
  吐舌: "348",
  呆: "352",
  呲牙: "343",
  哀伤: "342",
  嘴唇: "367",
  大哭: "357",
  大笑: "86",
  奸笑: "341",
  小鸡: "450",
  幽灵: "116",
  开心: "360",
  弱: "372",
  强: "13",
  心碎: "34",
  怒: "361",
  惊恐: "96",
  惶恐: "354",
  憨笑: "359",
  拜: "14",
  撇嘴: "353",
  星星: "309",
  晕: "355",
  汗: "97",
  流感: "358",
  流泪: "356",
  爱心: "33",
  爱意: "106",
  牵手: "379",
  狗: "81",
  猪: "100",
  猫: "78",
  生气: "314",
  生病: "350",
  痛苦: "346",
  皱眉: "87",
  示爱: "376",
  禁止: "374",
  色: "95",
  跳舞: "380",
  这边: "262",
  钟情: "303",
  鬼脸: "94",
  圣诞: "411",
  外星: "101",
  钻石: "52",
  礼物: "107",
  男孩: "0",
  女孩: "1",
  蛋糕: "337",
  "18": "186",
  圈: "312",
  叉: "313",
};

export function parseEmoji(lyric: string) {
  return lyric?.replace(/\[(.*?)\]/g, (_, lyc: string) => {
    const res = EmojiMap[lyc];
    if (!res) return "";
    return `<img class="emoji" src="http://s1.music.126.net/style/web2/emt/emoji_${res}.png"/>`;
  });
}
