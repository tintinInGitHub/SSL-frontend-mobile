const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
};

export const getVideoId = (url) => {
  if (!url) return "";
  //   if (url.indexOf("https://youtu.be/" > -1)) {
  //     return url.replaceAll("https://youtu.be/", "");
  //   }
  if (url.indexOf("v=") == -1) {
    return "";
  }
  if (url && isValidUrl(url)) {
    let paramString = url?.split("?")[1];
    let param_arr = paramString?.split("&");
    let vId;
    for (let i = 0; i < param_arr?.length; i++) {
      let pair = param_arr[i]?.split("=");
      if (pair[0] == "v") {
        vId = pair[1];
        break;
      }
    }
    return vId;
  }
  //   return url;
};
