var http = require('http')
var dates = require('dates')
var console = require('console')
module.exports.function = function getVideoLists() {
  let url = ["https://www.youtube.com/feeds/videos.xml?channel_id=UCkDAwuCKUcY1qn-hgNv0kLw", 
             "https://www.youtube.com/feeds/videos.xml?playlist_id=PL7PfK8Mp1rLE89RvwBh2IdCD3h6uAvgGm",
             "https://www.youtube.com/feeds/videos.xml?playlist_id=PL7PfK8Mp1rLHfo34qdadoAEUdL3Ns-HSx",
             "https://www.youtube.com/feeds/videos.xml?playlist_id=PL7PfK8Mp1rLFluD6Y03sCuJcbeHuPcBHZ",
             "undefined", 
             "undefined"]; 
  let count = 4; // 위 url 갯수에 맞추어 url 갯수 업데이트 필요

  let first = []; 
  let result = [];
  let results = [];
  var curTime = dates.ZonedDateTime.now();
  for (var i=0; i<count; i++) {
    if (url[i] != "undefined") {
        let response = http.getUrl(url[i], {
          format: "xmljs",
          cacheTime: 0,
        });
        // console.debug('response', response);

        if (i == 0) {
          first.push({
            authorname: response.feed.author.name,
            uri: response.feed.entry[0].author.uri
          })
          // console.log("first", first);
          results = [].concat(first);
        }

        let items = [].concat(response.feed.entry);
        result = items.map((item, index) => {
          return {
            playlisttitle: response.feed.title,
            uri: item.author.uri,
            linkhref: item.link["@href"],
            published: comparedTime(curTime, dates.ZonedDateTime.parseDateTime(item.published)),
            title: item.title,
            videoid: item["yt:videoId"],
            thumbnail: item["media:group"]["media:thumbnail"]["@url"],
            views: view(item["media:group"]["media:community"]["media:statistics"]["@views"])
          }
        })
        
        results = results.concat(result);
        // console.debug('results', results);
    }
  }

  return results;
}

function comparedTime(curTime, videoTime) {
  var eDate = new Date(curTime);
  var sDate = new Date(videoTime);
  if ((eDate - sDate) / (1000) < 60) {
    return Math.floor((eDate - sDate) / (1000)) + "초 전"
  } else if ((eDate - sDate) / (60 * 1000) < 60) {
    return Math.floor((eDate - sDate) / (60 * 1000)) + "분 전"
  } else if ((eDate - sDate) / (60 * 60 * 1000) < 24) {
    return Math.floor((eDate - sDate) / (60 * 60 * 1000)) + "시간 전"
  } else if ((eDate - sDate) / (24 * 60 * 60 * 1000) < 7) {
    return Math.floor((eDate - sDate) / (24 * 60 * 60 * 1000)) + "일 전"
  } else if ((eDate - sDate) / (24 * 60 * 60 * 1000) < 30) {
    return Math.floor((eDate - sDate) / (7 * 24 * 60 * 60 * 1000)) + "주 전"
  } else if ((eDate - sDate) / (30 * 24 * 60 * 60 * 1000) < 13) {
    return Math.floor((eDate - sDate) / (30 * 24 * 60 * 60 * 1000)) + "개월 전"
  } else {
    return Math.floor((eDate - sDate) / (365 * 24 * 60 * 60 * 1000)) + "년 전"
  }
}

function view(num) {
  var viewCheck;
  if (num.length < 4) {
    viewResult = num + "회"
  } else if (num.length < 5) { // 천
    if (num.length == 4 && num.substr(1, 1) > 0) {
      viewResult = num.replace(num, num.substr(0, 1) + "." + num.substr(1, 1)) + "천회"
    } else {
      viewResult = num.substr(0, num.length - 3) + "천회"
    }
  } else if (num.length < 9) { // 만
    if (num.length == 5 && num.substr(1, 1) > 0) {
      viewResult = num.replace(num, num.substr(0, 1) + "." + num.substr(1, 1)) + "만회"
    } else {
      viewResult = num.substr(0, num.length - 4) + "만회"
    }
  } else if (num.length < 13) { // 억
    if (num.length == 9 && num.substr(1, 1) > 0) {
      viewResult = num.replace(num, num.substr(0, 1) + "." + num.substr(1, 1)) + "억회"
    } else {
      viewResult = num.substr(0, num.length - 8) + "억회"
    }
  }
  return viewResult;
}
