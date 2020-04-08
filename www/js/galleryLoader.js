var cur = 2;
var maint = document.getElementById('maintextp');
var pos = 704;
var itemCount = 8
	 
function load(docnum, num) {

		var xhttp = new XMLHttpRequest();	

		var responseType = "text";

		if(document.getElementById('eng').lang == "en"){

			xhttp.open("GET", docnum + ".ejson", true);
		}else{
			xhttp.open("GET", docnum + ".json", true);
		}
		xhttp.send();

		xhttp.onreadystatechange = function() {

    		if (this.readyState === XMLHttpRequest.DONE) {

    			var arr = this.responseText.split(",");
  				var name = arr[3];
  				var price = arr[5];
  				var descuf = arr[7];

  				var descf = descuf.replace(";", ",");
  				var imgpath = arr[9];
  				if(num != 0){
					document.getElementById("head" + num.toString()).innerHTML = name;
	  				document.getElementById("desc" + num.toString()).innerHTML = descf;
	  				try{
	  					document.getElementById("price" + num.toString()).innerHTML = price;
	  				}catch{
	  					//console.log("Element not present!");
					}
	  				document.getElementById("pic" + num.toString()).src = imgpath;
	  				if(document.getElementById('eng').lang == "bg"){
						document.getElementById("link").href = "/bg/item.html?item=" + cur;
					}else{
						document.getElementById("link").href = "/en/item.html?item=" + cur;
					}
				}else{

					document.getElementById("descr").innerHTML = name;
	  				document.getElementById("desc").innerHTML = descf;
	  				try{
	  					document.getElementById("price").innerHTML = "Цена: " + price + "лв.";
	  				}catch{
	  					//console.log("Element not present!");
					}
	  				document.getElementById("pic").src = imgpath;

	  				try{
	  					if(document.getElementById('eng').lang == "bg"){
	  						document.getElementById('order').href = "/bg/order.html?product=" + name;
							document.getElementById('flag').href = "/en/item.html?item=" + cur;
						}else{
							console.log(name);
							document.getElementById('order').href = "/en/order.html?product=" + name;
							document.getElementById('flag').href = "/bg/item.html?item=" + cur;
						}
					}catch{

					
					}
				
				}

    		}
 	
	}		
}

function inc(left){
	if(left){
		if(cur-1 < 1){
			cur = itemCount;
		}else{
			cur--;
		}
	}else{
		if(cur+1 > itemCount){
			cur = 1;
		}else{
			cur++;
		}	
	}
}

function afterL(){
	load(cur,  2); 
	maint.animate({scrollLeft: pos+=704}, 0);	
	
}

function syncScrollLeft(callback){
	inc(true);	
	load(cur, 1);
	maint.animate({scrollLeft: pos-=704}, 500);
	setTimeout(function(){
		callback();
	}, 490);
}

function afterR(){

	load(cur, 2); 
	maint.animate({scrollLeft: pos-=704}, 0);
			
}

function syncScrollRight(callback){
	inc(false);
	load(cur, 3);
	maint.animate({scrollLeft: pos+=704}, 500);
	setTimeout(function(){
		callback();
	}, 410);
	
}