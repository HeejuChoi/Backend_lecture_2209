/*** 프로젝트 진행할 땐 DB 따로 만들어서 할 것, 다른 DB건들지 않도록 조심하기 ***/

/** 데이터 갱신 **/
/*
UPDATE 테이블명
	SET 필드명= 바꿀 값[, 필드명=값, 필드명=값, ...]
	WHERE 조건;
*/

/* 광주의 k를 g로 변경해보기 */
UPDATE city 
	SET NAME='Gwangju', distirct='Gwangju'  /* 등호 옆에 띄어쓰기는 하지말기 */
	WHERE id=2336;  /* where 안쓰면 모든 내용이 변경되기 때문에 꼭 써줘야함 *//* 고유한 값(key)으로 주로 바꿈 ex) id */
	
SELECT * FROM city WHERE NAME='Gwangju'; /* 잘 바뀌었는지 확인 */

/* 전라남도에 있는 인구를 20만으로 변경하기 */
UPDATE city                                      
	SET population='200000'                      
	WHERE district='Chollanam';                  
                                                 
SELECT * FROM city WHERE district LIKE 'Cholla%';


/** 데이터 삽입 **/
/*
INSERT INTO 테이블명
  (필드명)                    # 필드명을 사용하면 일부 필드만 데이터 추가 
                              # 사용하지 않으면 모든 필드를 데이터 추가
VALUES (필드명에 대한 값)
*/
/* auto_increment : 해당 속성이면 추가될 때 알아서 1씩 증가, ex) id */

/* 지역을 추가해보자 */
INSERT INTO city 
	(NAME, countrycode, district, population)
	VALUES ('Haenam', 'KOR', 'Chollanam', 100000);
	
SELECT * FROM city WHERE district LIKE 'Cholla%';

INSERT INTO city 
	VALUES (DEFAULT, 'Jangsung', 'KOR', 'Chollanam', 100000);  /* 알아서 입력해달라고 Default 쓸 수도 있음 */
	
SELECT * FROM city WHERE district LIKE 'Chollanam';


/* 기존 테이블의 데이터로 데이터 삽입 */
UPDATE city, (SELECT * FROM city WHERE district='Chollanam') b  /* 가상의 b라는 테이블 만들기 */
	SET city.population=b.population+50000 /* 인구에 5만 더하기 */
	WHERE city.id=b.id; 

SELECT * FROM city WHERE district LIKE 'Chollanam';


/** 데이터 삭제 **/
/*
DELETE FROM 테이블명
    WHERE 조건
*/
DELETE FROM citycopy            /* 앞에서 citycopy 테이블 만들어둔 상태 */
	WHERE countrycode='AFG';    
	                            
SELECT * FROM citycopy LIMIT 10;


/** 테이블 생성 **/
/* 미리 어떻게 만들건지 생각해놔야함 */
/* 
CREATE TABLE 테이블명 (
    필드명 데이터타입 [NOT NULL] [KEY] [DEFAULT 값] [Extra],
    필드명 데이터타입 [NOT NULL] [KEY] [DEFAULT 값] [Extra],
    ...
) [Extra]

    /* 필드명, 데이터타입만 꼭 들어가고 나머지는 옵션  / NOT NULL : 공백 허용 안함 / KEY : primary key인지 아닌지 세팅할 수 있음 * / 
*/

/* 기아타이거즈 테이블을 만들어보자 */
/* (id, 선수명, 백넘버, 포지션) */
CREATE TABLE tigers (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	player VARCHAR(10) NOT NULL, /* 이름이라 타입을 VARCHAR 로 함 / 10글자까지 */
	backNO INT,
	POSITION VARCHAR(10)
	);
	
DESC tigers;

/* 기아타이거즈 선수 데이터를 넣어보자 */
INSERT INTO tigers
	(id, player, backNO, POSITION)
	VALUES (DEFAULT, '양현종', 54, '투수'),  /* 여러 값 쓸 땐 VALUES 한 번만 선언하면 됨 */
	(DEFAULT, '이의리', 48, '투수'),
	(DEFAULT, '박동원', 10, '포수'),
	(DEFAULT, '김선빈', 3, '내야수'),
	(DEFAULT, '박찬호', 1, '내야수'),
	(DEFAULT, '나성범', 47, '외야수'),
	(DEFAULT, '소크라테스', 30, '외야수');
	
SELECT * FROM tigers;





/** 테이블의 모든 데이터 삭제 **/
TRUNCATE TABLE 테이블명;

/** 테이블 명 변경 **/
RENAME TABLE 테이블명 TO 바꿀 테이블명;

/* 그냥 삭제하고 다시만들면 되지만 ALTER TABLE로 해보기 */
ALTER TABLE tigers
	CHANGE `POSITION` `position` VARCHAR(10);
		
SELECT * FROM tigers;

/** 테이블 변경 **/
ALTER TABLE tigers
	ADD isdeleted INT DEFAULT 0;
	
SELECT * FROM tigers;

/** isDeletd=0인거 찾기 **/
SELECT * FROM tigers; 
	WHERE isDeleted=0;

/** DB 만들어서 테이블 만들기 **/
CREATE TABLE gis.test (
	id INT PRIMARY KEY AUTO_INCREMENT, 
	NAME VARCHAR(10)
) AUTO_INCREMENT=100; /*auto_increment를 100부터 시작하고 싶다 */



/** view? **/
CREATE VIEW largeCity
	AS SELECT * FROM city
	WHERE population>=7000000 WITH CHECK OPTION;  /* population은 with checkoption이라 범위 밑으로 내려가면 안바뀜 */

UPDATE largecity SET countrycode='GBR' WHERE id=206;
SELECT * FROM largecity; /* 206의 city가 변경되어 있음 */


/** **/

/* 화타 */


/** 날짜 더하기/빼기 **/

/** D-Day **/
SELECT TO_DAYS('2022-11-17') - TO_DAYS(NOW)   /*수정 필요*/

/** 요일: 1 - 일요일, 2 - 월 ... **/
SELECT DAYOFWEEK(dt) FROM dateTable;

/* 여기 위까지 피피티에 있으니 수정하고 다시 해보기 */


/** 테이블 조인(join) **/
/* 걸그룹, 노래 테이블 및 데이터 입력 */
CREATE TABLE girl_group (
    gid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    debut DATE NOT NULL,
    hit_song_id INT							/* foreign key(외래키) */
) AUTO_INCREMENT=1001;

CREATE TABLE song (
    sid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32) NOT NULL,
    lyrics VARCHAR(32)
) AUTO_INCREMENT=101;

INSERT INTO song (title, lyrics)
/* 	VALUES ('Tell Me', 'tell me tell me tetetete tel me'),
	('Gee', 'GEE GEE GEE GEE GEE BABY BABY'),
	('미스터', '이름이 뭐야 미스터'),
	('Abracadabra', '이러다 미쳐 내가 여리여리'),
	('8282', 'Give me a call Baby baby'), ('기대해', '기대해'),
	('I Don\'t care', '다른 여자들의 다리를'),
	('Bad Girl Good Girl', '앞에선 한 마디 말도'), ('피노키오', '뉴예삐오'),
	('별빛달빛', '너는 내 별빛 내 마음의 별빛'),
	('A', 'A 워오우 워오우워 우우우'),
	('나혼자', '나 혼자 밥을 먹고 나 혼자 영화 보고'), ('LUV', '설레이나요 '),
	('짧은치마', '짧은 치마를 입고 내가 길을 걸으면'),
	('위아래', '위 아래 위위 아래'), ('Dumb Dumb', '너 땜에 하루종일'); */

INSERT INTO girl_group (name, debut)
	VALUES ('원더걸스', '2007-02-10'),
	('소녀시대', '2007-08-02'), ('카라', '2009-07-30'),
	('브라운아이드걸스', '2008-01-17'), ('다비치', '2009-02-27'),
	('2NE1', '2009-07-08'), ('f(x)', '2011-04-20'),
	('시크릿', '2011-01-06'), ('레인보우', '2010-08-12'),
	('애프터 스쿨', '2009-11-25'), ('포미닛', '2009-08-28');

INSERT INTO girl_group (name, debut, hit_song_id)
	VALUES ('원더걸스', '2007-02-10', 101),
	('소녀시대', '2007-08-02', 102), ('카라', '2009-07-30', 103),
	('브라운아이드걸스', '2008-01-17', 104), ('다비치', '2009-02-27', 105),
	('2NE1', '2009-07-08', 106), ('f(x)', '2011-04-20', 108),
	('시크릿', '2011-01-06', 109), ('레인보우', '2010-08-12', 110),
	('애프터 스쿨', '2009-11-25', 120), ('포미닛', '2009-08-28', 121);


/* INNER JOIN */
/* 걸그룹 song 테이블, girl_group 테이블 합치기 */
/* select (내가 뽑고싶은 정보) from (테이블) join (조인할 테이블) on (조건) */
SELECT girl_group.name, girl_group.debut, song.title, song.lyrics 
    FROM girl_group /* 왼쪽이 될 테이블을 먼저 from 뒤에 작성 */
	JOIN song  /* Right */
    ON girl_group.hit_song_id=song.sid; 

/* LEFT OUTER JOIN */

/* RIGHT OUTER JOIN */
SELECT song.sid, girl_group.name, girl_group.debut, song.title, song.lyrics 
	FROM girl_group 
	RIGHT OUTER JOIN song ON girl_group.hit_song_id=song.sid;

/* FULL OUTER JOIN */
/* 지원하는 곳도 있고 안하는 곳도 있다 / mySQL에서는 LEFT, RIGHT를 UNION해서 써라 */


/* 데뷔일자가 빠른 5개 걸그룹의 히트송은? (그룹명, 곡명, 데뷔일자) */
SELECT girl_group.name, song.title, girl_group.debut
	FROM girl_group 
	JOIN song 
	ON girl_group.hit_song_id=song.sid
	ORDER BY girl_group.debut
	LIMIT 5;

/* 2007년도에 데뷔한 걸그룹은? */
SELECT NAME, debut FROM girl_group                                
	WHERE debut BETWEEN DATE('2007-01-01') AND DATE('2007-12-31'); /* DATE랑 괄호 빼도 작동은 됨 하지만 이게 정석 */

/* 2009년도에 데뷔한 걸그룹의 히트송은? (걸그룹명, 데뷔일, 히트송, 순서대로) */
SELECT girl_group.name, girl_group.debut, song.title 
	FROM girl_group
	JOIN song
	ON girl_group.hit_song_id=song.sid
	WHERE girl_group.debut BETWEEN DATE('2009-01-01') AND DATE('2009-12-31')
	ORDER BY girl_group.debut;
	
SELECT g.name, g.debut, s.title  /* 위랑 동일함 */
	FROM girl_group AS g
	JOIN song AS s 
	ON g.hit_song_id=s.sid
	WHERE g.debut BETWEEN DATE('2009-01-01') AND DATE('2009-12-31')
	ORDER BY g.debut;
	
