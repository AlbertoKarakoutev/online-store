var b1 = 'You need a design?';
b1 = b1.bold();
var p1 = ' You have the best idea you’ve ever had in your life, but don’t know how to make that idea a reality? Well, this may be your lucky day, because K.P. Industries will realize your thought in the plane of a CAD file as quickly as 3 days or less. \n';
var b2 = 'CAD files';
b2 = b2.bold();
var p2 = ' are computer-aided design files which are made on exceedingly sophisticated computer programs. These programs, although difficult to work with, have brought ease to the engineering industries. With a perfect interface and amazing precision, we here at K.P. Industries are able to design the perfect sketch for you. It doesn’t matter if you require the design of your new kitchen or a replacement for a broken part in your car. There isn’t a thing that we can’t design. \n';
var b3 = 'We founded ';
b3 = b3.bold();
var p3 = 'in 2017 and because of that we are working hard in order to display our services and high quality work. Before opening our business to the world we spent months of preparation and planning. Our team at K.P. Industries is a great working collective of young, open-minded people who are ready to face any challenge. The idea for K.P. Industries started from John Smith who wanted to help people design their future. He started using CAD programs in 2015. A year later, he wanted to show people that digital designing and sketching is the future of product making. He claims that people can never find the exact thing they want in a store that sells mass produced products and that this is quite a problem due to different people and their already bought items and properties. Everybody wants their desks to fit in the room and their new engine part to fit perfectly on the engine block and sometimes it’s challenging to find that perfect part on the market. Of course, if you pay a great amount of money, everything can be possible, but John’s idea is to design those projects for the least amount of money.';
var total = b1.concat(p1, b2, p2, b3, p3);
function disp(){
	document.getElementById("morep").innerHTML = total;
}