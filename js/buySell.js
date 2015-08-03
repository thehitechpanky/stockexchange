$(document).ready(function() {
	$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',
		
		fixedContentPos: false,
		fixedBgPos: true,
		
		overflowY: 'auto',
		
		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	$('#shareId').change(function() {
		showQtyAvailable(this.value);
		showMarketPrice(this.value);
	});
	
	$('input[name=order]:radio').change(function () {
		if($('#sellOrder').is(':checked')) {
			$('#marketSecondary').prop("checked", true);
			$('input[name=market]:radio').attr('disabled',true);
		} else {
			$('input[name=market]:radio').attr('disabled',false);
		}
	});
	
});

function showMarketPrice(str) {
    if (str > 0) {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttpMarketPrice = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttpMarketPrice = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttpMarketPrice.onreadystatechange = function() {
            if (xmlhttpMarketPrice.readyState == 4 && xmlhttpMarketPrice.status == 200) {
                document.getElementById("marketPrice").innerHTML = xmlhttpMarketPrice.responseText;
            }
        }
        xmlhttpMarketPrice.open("GET","getMarketPrice.php?shareId="+str,true);
        xmlhttpMarketPrice.send();
    } else { 
       document.getElementById("marketPrice").innerHTML = "";
       return; 
    }
}
