var fbId;
// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
		testAPI();
		fbId();
		$("#menu ul li:nth-child(2)").removeClass("hidden");
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
		$("#menu ul li:nth-child(2)").addClass("hidden");
		//document.getElementById('fbName').innerHTML = 'Go to hell';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '796575760464147',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

// Get fbId
function fbId() {
	FB.api('/me', function(response) {
		console.log(response);
		document.getElementById('fbName').innerHTML = response.name;
		fbId = response.id;
		//document.getElementById('fbId').innerHTML = fbId;
		var cash = showCash(fbId);
		document.getElementById('cash').innerHTML = cash;
		var portfolio = showPortfolio(fbId);
		document.getElementById('portfolio').innerHTML = portfolio;
		var valuation = showValuation(fbId);
		document.getElementById('valuation').innerHTML = valuation;
		//$.post('getFbId.php', {variable: fbId});
		//window.location.href = "getFbId.php?fbId=" + fbId;
		//$.ajax({url: "./getFbId.php?fbId=" + fbId, success: function(result) {} });
		//$.ajax({url: "./getFbId.php", type: "GET", data: {jsVarFbId: fbId}, success: function(data) {console.log("success");} });
	});
}

function showCash(str) {
    if (str == "") {
        document.getElementById("cash").innerHTML = "";
        return;
    } else { 
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttpCash = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttpCash = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttpCash.onreadystatechange = function() {
            if (xmlhttpCash.readyState == 4 && xmlhttpCash.status == 200) {
                document.getElementById("cash").innerHTML = xmlhttpCash.responseText;
            }
        }
        xmlhttpCash.open("GET","getCash.php?fbId="+str,true);
        xmlhttpCash.send();
    }
}

function showPortfolio(str) {
    if (str == "") {
        document.getElementById("portfolio").innerHTML = "";
        return;
    } else { 
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttpPortfolio = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttpPortfolio = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttpPortfolio.onreadystatechange = function() {
            if (xmlhttpPortfolio.readyState == 4 && xmlhttpPortfolio.status == 200) {
                document.getElementById("portfolio").innerHTML = xmlhttpPortfolio.responseText;
            }
        }
        xmlhttpPortfolio.open("GET","getPortfolio.php?fbId="+str,true);
        xmlhttpPortfolio.send();
    }
}

function showValuation(str) {
    if (str == "") {
        document.getElementById("valuation").innerHTML = "";
        return;
    } else { 
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttpValuation = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttpValuation = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttpValuation.onreadystatechange = function() {
            if (xmlhttpValuation.readyState == 4 && xmlhttpValuation.status == 200) {
                document.getElementById("valuation").innerHTML = xmlhttpValuation.responseText;
            }
        }
        xmlhttpValuation.open("GET","getValuation.php?fbId="+str,true);
        xmlhttpValuation.send();
    }
}

function showQtyAvailable(str) {
	if (str > 0 && $('#sellOrder').is(':checked')) {
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttpQtyAvailable = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttpQtyAvailable = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttpQtyAvailable.onreadystatechange = function() {
			if (xmlhttpQtyAvailable.readyState == 4 && xmlhttpQtyAvailable.status == 200) {
				document.getElementById("qtyAvailable").innerHTML = xmlhttpQtyAvailable.responseText;
			}
		}
		xmlhttpQtyAvailable.open("GET","getQtyAvailable.php?shareId="+str+"&jsVarFbId="+fbId,true);
		xmlhttpQtyAvailable.send();
	} else {
		document.getElementById("qtyAvailable").innerHTML = "";
		return;
	}
}

function showMarketPrice(str) {
    if (str == "") {
        document.getElementById("marketPrice").innerHTML = "";
        return;
    } else { 
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttpMarketPrice = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttpMarketPrice = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttpPortfolio.onreadystatechange = function() {
            if (xmlhttpMarketPrice.readyState == 4 && xmlhttpMarketPrice.status == 200) {
                document.getElementById("marketPrice").innerHTML = xmlhttpMarketPrice.responseText;
            }
        }
        xmlhttpMarketPrice.open("GET","getMarketPrice.php?shareId="+str,true);
        xmlhttpMarketPrice.send();
    }
}
