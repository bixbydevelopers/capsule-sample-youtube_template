<p align="Center">
  <img src="https://bixbydevelopers.com/dev/docs-assets/resources/dev-guide/bixby_logo_github-11221940070278028369.png">
  <br/>
  <h1 align="Center">Bixby Youtube Template Capsule</h1>
</p>

## YouTube 캡슐 완성하기 

아래 순서를 따라가면서 자신만의 YouTube 캡슐을 완성하세요~


## 한번 실행해 보세요. 

[시뮬레이터 사용법](https://bixbydevelopers.com/dev/docs/dev-guide/developers/ide.simulator) :

`[g:VideoPunchOut] 리스트 보여줘`


### 아래 순서를 따라가면서 자신만의 YouTube 캡슐을 완성하세요~

1.	YouTube RSS Feed URL 추가 입력
  -	현재 코드상 총 6개까지 입력 가능하니 아래 방법으로 추가하시기 바랍니다. (최대 개수는 변경 가능)
  -	하나의 RSS Feed URL 당 최대 15개의 동영상만 제공하고 있으니 이 점을 참고하여 추가 필요

  아래 코드에서 url 에 아래 channel id, playlist id 입력하는 방법으로 입력하시면 됩니다. 

```js
  code\getVideoLists.js

  module.exports.function = function getVideoLists() {
    let url = ["https://www.youtube.com/feeds/videos.xml?channel_id={channel id}", 
              "https://www.youtube.com/feeds/videos.xml?playlist_id={playlist id}", 
              "https://www.youtube.com/feeds/videos.xml?playlist_id={playlist id}", 
              "https://www.youtube.com/feeds/videos.xml?playlist_id={playlist id}", 
              "undefined", 
              "undefined"]; 
    let count = 4; // 위 url 갯수에 맞추어 url 갯수 업데이트 필요
```

```js
< channel id로 입력하는 방법 > 
  -	https://www.youtube.com/feeds/videos.xml?channel_id={channel id}
  -	{channel id} 부분에 아래 내용을 입력한다. 

  -	유튜브 채널의 채널 URL이 아래와 같은 형식으로 구성되어 있다. channel/ 뒤에 있는 채널 ID를 입력
  -	https://www.youtube.com/channel/{channel id}
  -	https://www.youtube.com/channel/UCkDAwuCKUcY1qn-hgNv0kLw

  -	https://www.youtube.com/feeds/videos.xml?channel_id=UCkDAwuCKUcY1qn-hgNv0kLw
```

```js
< Playlist id로 입력하는 방법 > 
  -	https://www.youtube.com/feeds/videos.xml?playlist_id={playlist id}
  -	{playlist id} 부분에 아래 내용을 입력한다. 

  -	유튜브 채널의 재생목록에서 목록 하나에 대해 모두 재생을 선택할 경우 해당 재생 목록을 모두 재생할 수 있는 화면으로 전환되는데 이 때 list= 뒤에 있는 playlist id를 입력
  -	https://www.youtube.com/... … …&list={playlist id}
  -	https://www.youtube.com/watch?v=9KemTdFqb_E&list=PL7PfK8Mp1rLFluD6Y03sCuJcbeHuPcBHZ

  -	https://www.youtube.com/feeds/videos.xml?playlist_id=PL7PfK8Mp1rLFluD6Y03sCuJcbeHuPcBHZ
```
 

2. 동영상 보여지는 리스트 변경하기 
 ```js
 	\resources\base\views\VideoSelect.view.bxb
 ```
  -	compound-card와 thumbnail-card 중 원하는 스타일로 변경하고자 한다면 아래 부분만 수정 진행
 ```js
	// layout-macro (results-compound-card) { // resources\base\layouts\Results_Compound_Card.layout.bxb
	layout-macro (results-thumbnail-card) { // resources\base\layouts\Results_Thumbnail_Card.layout.bxb
 ```

3.	logo, default 이미지 변경하기
 ```js
 	\assets\images\logo.png
 	\assets\images\default.png
 ```
 
  -	상단의 “YouTube 채널로 이동”을 아래 2가지 스타일로 가능 
  -	image-card와 cell-card 중 원하는 스타일로 변경하고자 한다면 아래 부분만 수정 진행
  -	resources\base\layouts\Results_Compound_Card.layout.bxb
  -	resources\base\layouts\Results_Thumbnail_Card.layout.bxb 
 
 ```js
image-card {
	aspect-ratio (21:9)

	image-url ("images/default.png")
	title-area {
		halign (End)
		slot1 {
			text {
				style (Title_M)
				value ("#{value(results.authorname)}")
			}
		}
		slot2 {
			single-line {
				text {
					style (Title_XS)
					color (Blue)
					value ("YouTube 채널로 이동")
				}
			}								
		}							
	}
}
  // cell-card {
  //   slot1 {
  //     image {
  //       url ("images/default.png")
  //       shape (Square)
  //     }
  //   }
  //   slot2 {
  //     content {
  //       order (PrimarySecondary)
  //       primary ("#{value(results.authorname)}")
  //       secondary ("YouTube 채널로 이동")
  //     }
  //   }
  // }    
 
 ```
 
4.	capsule-info.bxb 파일 수정 필요
  -	\resources\ko-KR\ 폴더
  - [Create Your capsule-info.bxb File](https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.prep-marketplace#create-your-capsule-infobxb-file) 
    참고하여 아래 변경 필요

 ```js
// https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.prep-marketplace#create-your-capsule-infobxb-file
capsule-info {
  display-name (채널명)
  developer-name (유튜버 이름)
  icon-asset (images/logo.png)
  description (유튜브 채널의 동영상을 보고 재생할 수 있는 캡슐입니다.)
  website-url (https://www.youtube.com/channel/channel_id)
  privacy-policy-url () // 개인정보 처리방침 생성 -> 웹에 게시 -> url 정보 여기에 작성 필요 
  
  dispatch-name (채널명)
  dispatch-aliases {
    alias (채널명유사1)
    alias (채널명유사2)
    alias (채널명유사3)
  }
  search-keywords{
    keyword (채널명유사1)
    keyword (채널명유사2) 
    keyword (채널명유사3)
  }
}
 ```


5.	channel.hints.bxb 파일 수정 필요
  -	\resources\ko-KR\ 폴더 
  -	[Provide Hints for Bixby](https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.prep-marketplace#provide-hints-for-bixby) 
	참고하여 각 캡슐에 맞게 변경 필요

```js
// https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.prep-marketplace#provide-hints-for-bixby
hints {
  uncategorized {
    hint (채널명에서 리스트 보여줘)
    hint (채널명에서 동영상 보여줘)
    hint (채널명에서 뭐가 있어)
  }
}
```

 
6.	legal.bxb 파일 수정 필요
  -	캡슐 root 폴더 
  -	[Provide Legal Agreements](https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.prep-marketplace#provide-legal-agreements)
  - [Privacy Policy Guidelines (KR)](https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.privacy-policy-kr)
  -	참고하여 아래 변경 필요

```js
// https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.prep-marketplace#provide-legal-agreements
legal {
  country-documents {
    store-country (KR)
    privacy-policy { // 개인정보 처리 방침
      url() // 개인정보 처리방침 생성 -> 웹에 게시 -> url 정보 여기에 작성 필요 
    }    
  }
}
```
 
7.	MarketPlace submit 하기
-	[Working with the Marketplace](https://bixbydevelopers.com/dev/docs/dev-guide/developers/deploying.can-submission) 
	참고하여 진행 

```js
Public Submission
-	Bixby Studio 에서 Submissions 버튼을 통해 진행
-	Create New Submission
-	Public 탭 선택 
-	Submission 하고자 하는 캡슐 선택 
-	Description 작성 : 버전 정보 및 수정 내역 간단하게 작성
-	Submit Capsules 버튼 눌러 submit 진행
```


---

## Additional Resources

### Bixby에 대한 모든 것
* [Bixby Developer Center](http://bixbydevelopers.com) - Bixby 캡슐을 시작하기 위한 모든 것이 있습니다.
* [Bixby Developer Portal](https://bixby.developer.samsung.com/) - Bixby 최신 소식과 이벤트 정보들을 확인하실 수 있습니다.

### Guides & Best Practices
* [Quick Start Guide](https://bixbydevelopers.com/dev/docs/get-started/quick-start) - Bixby의 첫 캡슐을 만들어보세요.
* [Design Guides](https://bixbydevelopers.com/dev/docs/dev-guide/design-guides) - Bixby 캡슐을 디자인하기 위한 Best practices들을 배워보세요.
* [Developer Guides](https://bixbydevelopers.com/dev/docs/dev-guide/developers) - Bixby 캡슐을 만들기 위하여 필요한 A-Z를 배울 수 있습니다.
* [SW Expert Academy](https://swexpertacademy.com/main/learn/course/subjectList.do?courseId=BIXBY_CAPSULE) - Bixby 캡슐 개발을 위한 강의들을 보실 수 있습니다.

### Video Guides
* [Samsung Developer Youtube](https://www.youtube.com/user/SMInnov8) - Bixby 개발과 관련된 영상들을 확인하실 수 있습니다.
* [Bixby Developer Day Korea 2019](https://www.youtube.com/watch?v=Ty1ahLX7FlM&list=PL7PfK8Mp1rLE89RvwBh2IdCD3h6uAvgGm) - Bixby Developer Day Korea 2019에서 진행되었던 세션들을 만나보실 수 있습니다.
* [Bixby Developer Day Korea 2018](https://www.youtube.com/playlist?list=PL7PfK8Mp1rLH0vLvT0yv5VXh_3x2bCUHl) - Bixby Developer Day Korea 2018에서 진행되었던 세션들을 만나보실 수 있습니다.


### 도움이 필요하신가요?
* Bixby 커뮤니티에 참여하세요! [Bixby Developers Korea Slack](https://join.slack.com/t/bixbydeveloperskorea/shared_invite/enQtNTY2Mjc1NjUzNjA1LTYzOWYwZWE4MjExNTg4ZWUyNDg4OWViNDRiOWUyMjg0Yzg5NWI5N2NlNGU4Nzg4ZThiZGI0ZGEzZGY1OGE1MjI)
* 기능을 추가하고 싶으신가요? [Support Community](https://support.bixbydevelopers.com/hc/en-us/community/topics/360000183273-Feature-Requests)에 기능을 건의하여 주세요. 동일한 내용을 다른 분들이 이미 올렸다면, Vote 기능을 통해 추천을 해 주세요.
* 기술적인 지원이 필요하신가요? support@bixbydevelopers.com으로 이메일을 통하여 질문하여 주시거나 또는 [Stack Overflow](https://stackoverflow.com/questions/tagged/bixby)에 “bixby” 태그와 함께 질문하여 주세요.

