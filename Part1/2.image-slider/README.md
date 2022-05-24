<h1 align="center">이미지 슬라이드</h1>

![thumbnail](./README.assets/thumbnail.png)

## 주요 기능 및 구현

### 슬라이드 버튼

![슬라이드버튼](./README.assets/슬라이드버튼.gif)

- 슬라이드 컨테이너 너비 : 값 고정(1000px) + `overflow: hidden`
- 슬라이드
  - 총 너비 : 이미지 갯수 * 슬라이드 컨테이너 너비
  - 버튼 클릭 시 `left` 속성을 이용
    ```
      ❗️ 초기 CSS left값 (left: 0) 을 주지 않을 경우

      left: auto 로 인식하기 때문에 javascript로 left값을 변경 시 transition이 먹히지 않는다.
    ```

### 인디케이터

![인디케이터](./README.assets/인디케이터.gif)

- 이벤트 버블링 이용
- nth-child

### 자동 슬라이드

![자동슬라이드](./README.assets/자동슬라이드.gif)

```
❗️ setTimeout, setInterval

두 함수 모두 id를 리턴한다.
clearTimeout(id), clearInterval(id) 을 통해 콜백을 취소할 수 있다.
```

- `setInterval`
  - 3초마다 자동 슬라이드가 되도록 구현
  - 슬라이드 버튼 클릭 시 `clearInterval` 을 통해 초기화 후, 다시 실행하도록 구현
