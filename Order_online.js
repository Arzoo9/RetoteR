var proj4_data;

$(document).ready(function () {
	alert("working");
	 var cart = new shopping_cart("jadrn043");	
	   
	 proj4_data = new Array();

	$.ajax({
		url:"http://jadran.sdsu.edu/perl/jadrn043/get_product.cgi", 
		success: function(response){			
		storeData(response);		
		display_chocolate();
			},
		error: function(response) {
               		alert("Can't able to fetch data from database please refresh page."); 
                }
	});

	function display_chocolate(){
		//alert("Insde Display");
		var cartArray = cart.getCartArray();     
		var tempString = "";
		alert(cartArray.length);
		alert(proj4_data.length);
		for (var i=0; i<cartArray.length; i++) {
			for (var j = 0; j < proj4_data.length; j++) {
				if (proj4_data[j][0] == cartArray[i][0]) {
					
						tempString += "<table class=\"Items_Display\"><tr><td class=\"Chocolate_Name\" colspan=\"2\">"+ proj4_data[j][2] + "</td></tr>";

    	  	  			tempString += "<tr><td rowspan=\"3\" width=\"60%\"><center><img src=\"/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0]+".jpg\" alt=\""+proj4_data[j][2]+"\""+ " width=\"70%\"  /></center></td><td>$"+ proj4_data[j][6] +" </td></tr>";

    				 tempString += "<tr><td><select name='checkbox' value='"cartArray[i][1]"'><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5 </option><option value=\"6\">6</option><optionvalue=\"7\">7</option><option value=\"8\">8 </option><option value=\"9\">9</option><option value=\"10\">10 </option></select></td></tr><tr><td class=\"button\"><input type='button' value='Remove' name='"+ proj4_data[j][0] + "' /></td></tr></table>";
				 }
			}
		}
	 	var handle = document.getElementById('cart');
	        handle.innerHTML = tempString;

	}

	function storeData(response) {
		var tempArray = explodeArray(response,';');
	       for(var i=0; i < tempArray.length; i++) {
        		innerArray = explodeArray(tempArray[i],'|');
        		proj4_data[i] = innerArray;
        	}	
	}

	function explodeArray(item,delimiter) {
		tempArray=new Array(1);
		var Count=0;
		var tempString=new String(item);

		while (tempString.indexOf(delimiter)>0) {
			tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
			tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
			Count=Count+1
		}

		tempArray[Count]=tempString;
		return tempArray;
	}

        
  $('#cart').on('click',$('input[type="button"]'), function(e) {
        if($(e.target).val() != 'Remove'){return}; 
        var sku = $(e.target).attr("name");
        alert(sku);
        cart.delete(sku);
        alert("Delay");
        display_chocolate();
     });
   });