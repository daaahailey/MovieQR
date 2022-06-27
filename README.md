# Movie QR

## Live Demo(라이브 데모) - [MovieQR](https://movie-qr.vercel.app/)

\*로그인은 이메일 입력 후, 전달받은 <strong>링크</strong>로 온 <u>인증버튼</u>을 클릭해야 합니다.

    Movie QR is where you can share your favourite quotes from movies you like and also share your thoughts. Current working features are as described down below but more functions will be available in the future since it is still under development.
    Movie QR은 좋아하는 영화의 명대사나 영화에 대한 각자의 의견을 공유할 수 있는 앱입니다. 하단의 기능들은 현재 까지 구현되어 있는 기능들이며, 계속하여 개발중이므로 다른 기능들 또한 추가될 예정 입니다.

# Built with (사용기술)

- Frontend: Next.js, Emotion

- Backend: Hasura(GraphQL engine on Heroku)

- Deploy: Vercel

- Movie information is fetched from [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) (영화 상세정보들은 TMBD API를 사용해 불러왔습니다)

# Features (구현 기능)

    - Sign In/Out (로그인/로그아웃)
    - Search (검색)
        - Movie search by title (영화 검색)
        - Quote search by word (명대사 검색)
    - Dynamic Pages - movie detail pages by movie (다이내믹 페이지 - 영화별 상세 페이지)
        - Read detailed movie information (영화 상세 정보 불러오기)
        - Watch Trailer (트레일러 비디오 보기)
        - Quote / Review Board (명대사/리뷰 게시판)
    - Quote (명대사)
        - CRUD(Create(작성) / Read(읽기) / Update(수정) / Delete(삭제))
        - Load more button (five quotes are displayed by default and it loads more quotes when "load more" button gets clicked. 명대사 리스트 5개씩 로드 - 버튼 클릭시 추가 로드)
        
        
# GIF Preview

## Search movie
![movie-qr_search](https://user-images.githubusercontent.com/56154510/176017783-f46206e2-161b-4366-bef7-0dfb45f22768.gif)

## Sign In / Sign Out
![movie-qr_login_logout](https://user-images.githubusercontent.com/56154510/176018316-eeac2778-8bbb-4a3f-b96a-ab68805bec1f.gif)

## Movie detail page
![movie-qr_slider](https://user-images.githubusercontent.com/56154510/176018575-23df99b6-7944-47c9-b984-b56927fee555.gif)

## Watch trailer
![movie-qr_trailer](https://user-images.githubusercontent.com/56154510/176018466-236242ec-992c-4312-902f-969197db1a3d.gif)

## CRUD - Write quote / Edit quote / Delete quote (from movie detail page)
![movie-qr_create](https://user-images.githubusercontent.com/56154510/176020127-627e4346-e036-4096-a8df-0bd32bccdc57.gif)
![movie-qr_update_](https://user-images.githubusercontent.com/56154510/176021595-0aa88894-88d0-4751-a69d-1fb1eb4f664e.gif)
![movie-qr_delete](https://user-images.githubusercontent.com/56154510/176020386-5ea17a08-b349-4438-88d5-aee7e0e522fc.gif)

## Quote page / Load More / Search quote, etc
![movie-qr_quote-page](https://user-images.githubusercontent.com/56154510/176020464-0b66e332-8001-40c4-915e-8a62f0403ca5.gif)
