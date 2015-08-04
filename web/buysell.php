<div id="small-dialog" class="mfp-hide sign_up">
	<h1>Trading Window</h1>
	<form width="100%">
		Market
		<input type="radio" name="market" value="primary" id="marketPrimary">Primary
		<input type="radio" name="market" value="secondary" id="marketSecondary" checked>Secondary<br />
		Order Type
		<input type="radio" name="order" value="buy" id="buyOrder" checked>Buy
		<input type="radio" name="order" value="sell" id="sellOrder">Sell
		<input type="radio" name="order" value="bid" id="bidOrder" disabled>Bid
		<br />
		<select>
			<option value="" disabled selected>Category</option>
			<option value="celebrity">Celebrity</option>
			<option value="college">College</option>
		</select><br />
		<input id="shareName" type="text" placeholder="Share Name" list="shareList" />
		<datalist id="shareList">
		</datalist>
		<input id="shareId" type="hidden" placeholder="" disabled />
		<div id="qtyAvailable"></div>
		<div id="marketPrice"></div>
		<input type="text" placeholder="Qty to Trade" /><br />
		<input type="text" placeholder="Quote Price per Share" /><br />
		<input type="submit" name="placeOrder" value="Place Order" />
	</form>
</div>

<script src="./js/buySell.js" type="text/javascript"></script>
