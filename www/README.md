-Уебсайт "KP Industries" (official version 2.0.1)

Съдържание на файла:

1. Описание на частите на уебсайта
	- Сървърна
	- Клиентска
2. Описание на взаимодействията
3. Използвани технологии

----------------------------------

1.(
	1.1 За сървърната част съм създал HTTP сървър, който слуша за заявки, подадени от сайта. Оригинално бях започнал с Express, но стигнах до извода, че чрез http-server имам повече контрол, а и ще навлезна повече в нещата, започвайки от по-лесното. В сървърната част има проста функция, която зарежда статично уебсайта от директорията, която му задаваме. Имаме определени ограничения, зададени при нея, за да не се сблъсква с GET и POST заявките, които ще ни трябват. След това, имаме разпределителите на заявки. Общо в уебсайта имаме 3(4) места, от които изпращане специфични заявки, било то за MongoDB или AJAX ъпдайтване на страницата. Работим с база данни Монго, където имаме колекции(релации) за ревюта, поръчки и продуктите, които предлагаме. Чрез POST заявки, добавяме ревюта и поръчки към базата данни. Чрез GET заявката показваме ревютата към съответните продукти, за които те се отнасят.
	
	1.2 Уебсайта се състои от 8 страници на 2 езика всяка. Основната ни динамична фунционалност се намира в стъраници "Продукти" и страницата за отделните продукти. В страница продукти   (Галерия) виждаме динамично зареждане на продукти в <table> елемент, които създават илюзията за безкрайно дълъг списък. Реално, елементите са 3. В страницата за отделните артикули, съдържанието се определя чрез заявка до базата данни, в зависимост от origin-a на заявката. Имаме 3 основни .js файла, които комуникират със сървъра чрез xHTTP заявки. galleryLoader обработва страницата с галерията и продуктите, reviewLoader отговаря за динамичните ревюта при всеки продукт, a orderReceiver - за подаването на поръчка до уебсайта. CSS кода е посан изцчло на ръка, и следва преправяне, разбира се с интеграция на малко повече JS за естетика.
)

2.(
	Чрез xHTTP заявките подаваме към сървъра данни, които той обработва и според типа на заявката изпълнява действието. Чрез клюяови думи ("json", "order", "review") насочваме сървъра към домейна от данни, към който трябва да се обърне, след което той ъпдейтва базата данни, или но връща това, което сме поръчали. Страницата item.html е скрита от основния сайтмап и е дъостъпна само чрез галерията от продукти, за улеснение на потребителя и разработчика
)
3.(
	- Езици: "HTML", CSS, JavaScript
	- Asynchronous JavaSript and XML(AJAX)
	- NodeJS сървър
	- MongoDB база данни
	- Мноого експериментиране с модули за Node чрез npm
	- json конверсии за връщане на обекти ит базата данни
	Dependancies: Node.js, npm mongodb, MongoDB Compass
)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Website "KPIndustries" (Official Version 2.0.1)

Contents

1. Website Parts:
	- Server
	- Client
2. Interactions
3. Technologies used

-----------------------------

1.(
	1.1 For the server part I have created an HTTP server that listens for requests submitted by the site. I had originally started with Express, but I came to the conclusion that through http-server I have more control, and I will get more into things, starting with the easier. The server part has a simple function that statically loads the website from the directory we assign to it. We have certain restrictions set for it so that it does not collide with the GET and POST requests that we will need.Then, we have the request allocators. In total, we have 3 (4) places on the website from which to send specific requests, whether for MongoDB or AJAX page updates. We work with the Mongo database, where we have collections (relationships) for reviews, orders and the products we offer. Through POST requests, we add reviews and orders to the database. Through the GET request we show the reviews for the respective products to which they refer.
	
	1.2 The website consists of 8 pages in 2 languages ​​each. Our main dynamic functionality is located in the "Products" pages and the page for the individual products. In the products page (Gallery) we see dynamic loading of products in a <table> element, which creates the illusion of an infinitely long list. Actually, the elements are 3. In the page for the individual items, the content is determined by a query to the database, depending on the origin of the query.We have 3 main .js files that communicate with the server via xHTTP requests. galleryLoader processes the gallery and product page, reviewLoader is responsible for the dynamic reviews of each product, and orderReceiver - for placing an order on the website. The CSS code is set entirely by hand, and underwent a remake, of course with the integration of a little more JS for aesthetics.
)

2.(
	Through xHTTP requests we submit to the server data, which it processes and according to the type of request performs the action. Using key words ("json", "order", "review") we direct the server to the domain of data to be accessed, after which it updates the database, or returns what we have ordered. The item.html page is hidden from the main site map and is accessible only through the product gallery, for the convenience of the user and the developer.
)

3.(
	- Languages: "HTML", CSS, JavaScript
	- Asynchronous JavaSript and XML (AJAX)
	- NodeJS server
	- MongoDB database
	- Lots of experimenting with Node modules via npm
	- json conversions to return objects to the database
	Dependancies: Node.js, npm mongodb, MongoDB Compass
)
	

