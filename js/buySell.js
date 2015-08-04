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
	
	var listOption = null;
	
	// If share name is changed
	$('#shareName').change(function() {
		var index = 0;
		var val = $('#shareName').val();
		for(var i = 0; listOption && i < listOption.length; i++) {
			if(listOption[i].sharename === val) {
				$("#shareId").val(listOption[i].shareid);
				break;
			} else {
				$("#shareId").val(0);
			}
		}
		$("#shareId").change();
	});
	
	// This is keyup
	$('#shareName').keyup(function() {
		delay(function() {
			$.ajax({url: "./getShareOptions.php?shareNameInput=" + $('#shareName').val(),
				success: function(result) {
					if(result && result.length) {
						//console.log(result);
						listOption = JSON.parse(result);
						var str = "";
						for(var i = 0 ; listOption && i < listOption.length; i++) {
							str += '<option value="' + listOption[i].sharename + '" />'; // Storing options in variable
				   		}
				   		$("#shareList").html(str);
					}
				}
			  },2000);
		});
	});
	
	$('#shareId').change(function() {
		showQtyAvailable(this.value);
		showMarketPrice(this.value);
	});
	
	$('input[name=market]:radio').change(function () {
		if($('#marketPrimary').is(':checked')) {
			$('#bidOrder').prop("checked", true);
			$('input[name=order]:radio').attr('disabled',true);
		} else {
			$('input[name=order]:radio').attr('disabled',false);
			$('#bidOrder').attr('disabled',true);
			$('#buyOrder').prop("checked", true);
		}
	});

	$('input[name=order]:radio').change(function () {
		if($('#sellOrder').is(':checked')) {
			showQtyAvailable($('#shareId').val());
			$('#qtyAvailable').attr('class','shown');
		} else {
			$('#qtyAvailable').attr('class','hidden');
		}
	});
	
});

function showMarketPrice(str) {
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
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();
