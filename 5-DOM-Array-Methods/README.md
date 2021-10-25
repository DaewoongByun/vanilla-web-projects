# 후기

자바스크립트의 array 함수들을 사용했다.
그중에 사람들의 자산을 두배로 늘리는 버튼이 있다.

```javascript
twice: function () {
    this.personList.forEach((person) => {
      person.wealth = person.wealth * 2;
    });
    this.render();
  },
```

다음과 같이 코드를 작성했는데 이게 될까 싶었다.
자바스크립트에서 call by value와 call by reference에 대한 이해가 부족하다고 생각해서 공부해보기로했다.
https://velog.io/@daewoong123/javascript-call-by-value-call-by-reference
