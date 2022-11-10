# GAMEDUO

## 🎮 보스레이드 PVE 컨텐츠 서비스

<br>

## 🧰 서비스 기능

### 1. 유저 생성

- 중복되지 않는 userId 생성
- 생성된 userId 응답

### 2. 유저 조회

- 해당 유저의 보스레이드 총 점수와 참여기록 응답
- 예외처리
  - 유저 존재 유무 확인
  - 존재하는 유저의 레이드 기록 유무 확인

### 3. 보스레이드 상태 조회

- 보스 레이드 입장 가능 여부 상태 canEnter로 응답
  - 보스레이드 진행시 userId 함께 응답
- 입장 가능 조건
  - 한번에 한 명의 유저만 보스레이드 진행 가능
  - 아무도 보스레이드를 시작한 기록이 없다면 시작 가능
  - 시작한 기록이 있다면 마지막으로 시작한 유저가 보스레이드를 종료했거나, 시작한 시간으로부터 레이드 제한시간만큼 경과시 시작 가능

### 4. 보스레이드 시작

- 보스레이드 시작시 중복되지 않는 raidRecordId 생성
- 레이드 시작 가능 여부 isEntered로 응답
- 예외처리
  - 정의된 level 외 입장 불가능

### 5. 보스레이드 종료

- 레이드 level에 따른 score 반영
- 예외처리
  - userId와 raidRecordId로 레이드 유무 확인
  - status로 진행 여부 확인
  - 시작 시간으로부터 레이드 제한시간이 지났다면 레이드 실패 처리

### 6. 보스레이드 랭킹 조회

- 보스레이드 랭킹 정보 topRankerInfoList와 해당 유저의 랭킹 및 점수 myRankingInfo으로 조회
  - totalScore 내림차순으로 랭킹 정보 조회
- 예외처리
  - 랭킹 기록 유무 확인
  - 유저 존재 유무 확인
  - 존재하는 유저의 레이드 기록 유무 확인

\*\* 랭킹 기능은 [GET] {{BASE_URL}}/bossRaid/topRankerList/:userId 으로 구현했습니다.

<br>

## 🎨 ERD

<img width="500" alt="스크린샷 2022-09-21 오전 1 12 46" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d2dbe505-3f1a-4d69-8ad4-098ee5708818/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221110T090749Z&X-Amz-Expires=86400&X-Amz-Signature=f05e24d018fa978bddd868d85c6c2807b85b9129a3c45de89e49e1ba1dfd4623&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject">

<br>

## 📜 API DOCS

[포스트맨 API DOCS](https://documenter.getpostman.com/view/23066446/2s8YemtZ8A)

<br>

## 💻 적용 기술

- 사용언어 : Javascript
- 런타임 환경 : Node.js
- 프레임워크 : Express
- ORM : Sequelize
- 데이터베이스 : MySQL
