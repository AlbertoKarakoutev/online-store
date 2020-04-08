function sendOrder(_name, _surname, _desc, _addr, _mobile, _email) {

		var xhttp = new XMLHttpRequest();	

		var responseType = "text";

		var name = document.getElementById(_name).value;
		var surname = document.getElementById(_surname).value;
		var desc = document.getElementById(_desc).value;
		var addr = document.getElementById(_addr).value;
		var mobile = document.getElementById(_mobile).value;
		var email = document.getElementById(_email).value;

		console.log(name);

		xhttp.open("POST", name + surname + ".order", true);
		xhttp.send("fname:" + name + ";lname:" + surname + ";desc:" + desc + ";addres:" + addr + ";mobile:" + mobile + ";email:" + email);

		xhttp.onreadystatechange = function() {

    		if (this.readyState === XMLHttpRequest.DONE) {
    			alert("Your order has been received!");
    		}
    	}
    }
