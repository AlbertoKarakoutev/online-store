function loadReview(item) {

		var xhttp = new XMLHttpRequest();	

		str = item.toString();

		var responseType = "text";
		xhttp.open("GET", str + ".reviews", true);
		xhttp.send();

		xhttp.onreadystatechange = function() {

    		if (this.readyState === XMLHttpRequest.DONE) { 
    			
    			var res = this.responseText.split(",");
    			console.log(res);

    			for(var i = 0; i < 6; i++){
    				if(10*i<res.length){
    					console.log(res[7]);
    					document.getElementById('rev' + (i+1).toString()).innerHTML = "<b>(" + res[i*10 + 7] + "/5) " + res[i*10 + 5] + "<i> by " + res[i*10 + 3] + "</i></b>";
    					document.getElementById('rev' + (i+1).toString()).style.border = "1px solid black";
    				}else{
    					break;
    				}

    			}
            }

    		
    	}
	}