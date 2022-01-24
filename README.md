# 원티드 상단 영역 클론 코딩

## 구현 목록

1. 상단 GNB (Global Navigation Bar)
2. 라이브러리를 사용하지 않고 캐러셀(슬라이드) 만들기
3. 반응형(Responsive Web) 구현

## 배포 주소

https://optimistic-bose-4e9ed9.netlify.app

## 실행 방법

1. 오른쪽 상단 Code → Download Zip을 누릅니다.

2. 다운받은 파일의 압축을 풉니다.

3. 터미널로 압축을 푼 폴더로 들어가서 react-create-app을 설치합니다.

   `npm install`

4. 그 이후 `npm run start`를 터미널에 입력하면 인터넷 브라우저가 뜨며 페이지를 볼 수 있습니다.

   (브라우저가 뜨지 않는 경우 : http://localhost:3000 를 주소창에 입력해서 들어가세요.)

5. 터미널에서 'Ctrl + C'를 누르면 실행이 종료됩니다.

## 컴포넌트 설명

1. NavBar.js

   최상단 네비게이션 바

   - 반응형 구현

     ![ScreenRecorderProject8](https://user-images.githubusercontent.com/90027202/149947780-42c7ad63-ff4b-4e97-9dd8-2224d0771cc3.gif)

2. Slider.js

   배너가 이동하는 캐러셀

   - 버튼 클릭으로 좌우 이동 가능

   ![main_mini](https://user-images.githubusercontent.com/90027202/149716716-e5485055-291e-45b3-a41a-2801d2b6ffa5.gif)

   - 슬라이드 터치로 좌우 이동 가능

     ![mobile](https://user-images.githubusercontent.com/90027202/149771043-54b99a41-0728-409f-ae15-8e159466c2e6.gif)
