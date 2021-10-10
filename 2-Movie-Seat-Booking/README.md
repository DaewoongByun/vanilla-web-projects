# 설계

## 데이터

movies: [{name: , price, isSelected},{name: , price, isSelected},{name: , price, isSelected}]

seats: [

[0,0,0,0,0,0,0,0],

[0,0,0,0,0,0,0,0],

[0,0,0,0,0,0,0,0],

[0,0,0,0,0,0,0,0],

[0,0,0,0,0,0,0,0],

[0,0,0,0,0,0,0,0],

]

// 0 : 선택 안함

// 1 : 선택

// 2 : 예약됨

totalPrice: 0

selectCount: 0 // 내가 선택한 좌석 수

## 함수

changeMovie(index) // 영화 선택

	- movies[index].isSelected를 true로 바꿈, 나머지는 false
	- render totalPrice 
	- localStorage 저장

clickSeat(r, c) // 좌석 선택

	- seats(r)(c)를 1로 바꿈
	- render seat 
	- render totalPrice 
	- localStorage 저장

getTotalPrice() // 가격 계산

save() // localStorage에 데이터 저장

load() // localStorage에서 데이터 불러오기



# 후기

- localStorage에 저장하고 불러오려면 데이터 기반으로 해야할 것 같았다. 그래서 이벤트가 발생했을 때 데이터를 변경하고 변경되어야 할 element의 html을 변경(re-rendering)하는 방법으로 구현했다. 관리해야할 데이터가 많아진다면 연관이 있는 데이터들끼리 묶고 js파일을 따로 관리하는 것이 보기에 좋을것 같다.

