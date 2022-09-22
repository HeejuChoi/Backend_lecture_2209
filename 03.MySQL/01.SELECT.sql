/* 데이터 조작 언어(DML: Data Manipulation Language)
 */

USE world;      /* 대문자로 된 부분은 키워드라 소문자로 써도 변경됨 # world 같은 소문자로된건 table명 DB명 등  */
SHOW TABLES;
DESC city;      /*  comment */

/* SELECT문을 JS에서 쓸 때 SQL에서 한 번 돌려보고 넣는게 좋다. */

/* 
SQL에서 주석은 #
실행은 F9
* 은 전부를 의미
데이터는 대소문자 구분을 함 
 */

/* 
SELECT 필드명 FROM 테이블명
    WHERE 조건
    ORDER BY 필드명 순서
    LIMIT 숫자 OFFSET 숫자    -> ex) 몇 개 건너뛰고 부터 가지고와라 
    GROUP BY 필드명
    HAVING 그룹 조건
    JOIN 테이블명 
    ON 조인 조건;
 */

SELECT * FROM city;                              /*  *는 모든 것 / city는 table명 / SELECT는 자주나오니 알아둘 것  */
SELECT * FROM city WHERE countrycode='KOR';      /* 필드명에 대소문자 구별은 안함 */ 
SELECT * FROM city WHERE District='Kwangju';     /* 광주 찾아줌 */
SELECT `Name`, Population FROM city WHERE CountryCode='KOR';  /* ``를 쓰면 필드명을 기존 필드명으로 가능 / NAME은 키워드일 가능성이 있어서 처음엔 대문자로 출력됨 */ 

SELECT `name`, population FROM city WHERE countrycode='KOR' AND population>1000000; /* sql =은 js ==이랑 동일 */
SELECT distinct district FROM city WHERE countrycode='KOR'; /* 유니크한 district를 찾고 싶으면 앞에 distinct를 붙임, 안하면 다나옴, distinct : 중복제거 */
SELECT * FROM city WHERE district='Kwangju'                 /* 호남지역 도시 */
	OR district='Chollabuk' OR district='Chollanam';

SELECT * FROM city WHERE countrycode='KOR'    /* 한국의 100만보다 큰 도시중에 인구수가 짝수인 도시 */
	AND population>1000000 AND population%2=0; 

SELECT * FROM city WHERE countrycode='KOR' /* 한국의 100만보다 크고 200만보다 작은 도시 */
	AND population>1000000 AND population<2000000;
SELECT * FROM city WHERE countrycode='KOR' 
	AND population BETWEEN 1000000 AND 2000000;

SELECT * FROM city WHERE countrycode='KOR'      /* 전라남북도의도시 */ /* like: 문자열 패턴 검색 , 부분일치 검색 때 %를 씀 */
	AND district LIKE 'Cholla%';

SELECT * FROM city WHERE population>8000000 ORDER BY population DESC; /* 인구수가 800만 이상의 도시를 인구수의 내림차순으로 조회 */

SELECT * FROM city WHERE district='Chollanam' ORDER BY NAME; /* 전라남도에 있는 도시 내림차순으로 */

SELECT * FROM city WHERE countrycode='KOR'   /* 한국의 도시를 district과 Name 오름차순 */ 
	ORDER BY district, NAME;

/* 한국의 도시를 district는 오름차순, 인구수는 내림차순 */
/* 광역시도별로 도시 인구수가 많은 것부터 보여줘라 */
SELECT * FROM city WHERE countrycode='KOR' 
	ORDER BY district, population DESC;
  
/* 함수 */
SELECT COUNT(*) FROM city WHERE countrycode='KOR';   /* count(*) - 건수 */
SELECT SUM(population) FROM city WHERE countrycode='KOR'; /* SUM(population) - 인구수 합 */
SELECT AVG(population) FROM city WHERE countrycode='KOR'; /* AVG(population) - 인구수 평균 */
SELECT AVG(population) AS average FROM city WHERE countrycode='KOR'; /* Aliasing /  이름이 average로 변경됨 */
SELECT MAX(population) FROM city WHERE countrycode='KOR';
SELECT MIN(population) FROM city WHERE countrycode='KOR';
SELECT avg(population), MAX(population), min(population) FROM city WHERE countrycode='KOR'; /* 여러개를 묶어서 한 번에 조회할 수 있다. */

/* 광역시도별 인구수를 내림차순으로 */
SELECT district, SUM(population) FROM city WHERE countrycode='KOR'
	GROUP BY district ORDER BY SUM(population) DESC;


/* 전라남도의 도시 */
SELECT GROUP_CONCAT(NAME) FROM city WHERE district='Chollanam'; 
/* 한국의 광역시도 */
SELECT GROUP_CONCAT(DISTINCT district) FROM city WHERE countrycode='KOR'; 
/* 광역시도별 도시의 갯수 */
SELECT district, COUNT(*) FROM city WHERE countrycode='KOR'  /* 이렇게 하면 두서없이 나옴 */
	GROUP BY district;
/* 광역시도별 도시의 갯수가 많은 순서로 */
SELECT district, COUNT(*) FROM city WHERE countrycode='KOR' /* 도시이름을 ABC 순으로 해라 */
	GROUP BY district ORDER BY COUNT(*) DESC, district;                                     /* ORDER BY 에서 DESC: 내림차순 (Default는 ASC(오름차순)) */
/* 광역시도별 도시의 갯수가 다섯 개 이상인 경우만 */
SELECT district, COUNT(*) FROM city WHERE countrycode='KOR'
	GROUP BY district HAVING COUNT(*)>=5;
/* 광역시도별 도시의 갯수 다섯 개 이상을 내림차순으로 정렬 */
SELECT district, COUNT(*) FROM city WHERE countrycode='KOR'
	GROUP BY district HAVING COUNT(*)>=5 ORDER BY COUNT(*) DESC;
/* 도시의 갯수가 100개 이상인 국가를 도시갯수 내림차순으로 정렬 */
SELECT countrycode, COUNT(*) FROM city 
	GROUP BY countrycode HAVING COUNT(*)>=100 ORDER BY COUNT(*) DESC;
/* 도시의 갯수가 많은 상위 5개 국가 코드 */  /* Python에서 df.head() 사용했던 것 처럼 LIMIT 사용 */
SELECT countrycode, COUNT(*) FROM city 
	GROUP BY countrycode ORDER BY COUNT(*) DESC
	LIMIT 5;
/* 도시의 인구가 많은 10개 국가 코드 */
SELECT countrycode, SUM(population) FROM city
	GROUP BY countrycode ORDER BY SUM(population) DESC
	LIMIT 10;
/* 도시의 인구가 많은 10개 국가 코드(6~10위) */
SELECT countrycode, SUM(population) FROM city
	GROUP BY countrycode ORDER BY SUM(population) DESC
	LIMIT 5 OFFSET 5; /* 5개를 건너 뛴 후 부터 5개 */


/* 테이블 조인 -> 두개의 테이블을 섞는 것 */
/* INNER JOIN -> 가장 기본적인 형태(교집합만 꺼내겠다.) */
/* 도시의 인구가 많은 국가(6~10위) */
SELECT country.name, SUM(population) FROM city  /* country table에 있는 name을 가져와라 */
	INNER JOIN country ON city.CountryCode=country.Code  /* city에 있는 countrycode와 country에 있는 code가 같으면 가져와라*/
	GROUP BY countrycode ORDER BY SUM(population) DESC
	LIMIT 5 OFFSET 5;
/* 인구가 많은 전세계 도시 TOP 10의 국가명, 도시명, 인구수 */
SELECT country.name, city.Name, city.Population FROM city
	JOIN country ON city.CountryCode=country.Code   /* INNER JOIN에 INNER 빼도 됨 */
	ORDER BY city.population DESC
	LIMIT 10;

