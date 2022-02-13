"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

let venPrice;
let ethPrice;
let venQuantity;
let buyCoin = "ETH";
let childs=[];
let ethLastPrice = 0;
/**
 * Setup the orchestra
 */
async function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  // if(location.protocol !== 'https:') {
  //   // https://ethereum.stackexchange.com/a/62217/620
  //   const alert = document.querySelector("#alert-error-https");
  //   alert.style.display = "block";
  //   document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  //   return;
  // }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: "pk_test_391E26A3B43A3350"
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

	await onConnect();
	
	await initmarket();
  console.log("Web3Modal instance is", web3Modal);
 
}
async function initmarket(){
	var wss_path = "wss://stream.binance.com:9443";
	var wss_path =wss_path+"/stream?streams=ethusdt@ticker";
	var ws = new WebSocket(wss_path);
	var coinlist=['BTC','ETH','BNB','XRP','ADA','DOGE'];
	var coinimages=['btc.svg','eth.svg','bnb.svg','xrp.svg','ada.svg','doge.svg'];
	$("#main3 a").remove();
	for(let i =0;i<coinlist.length;i++){
		var html = '<a href="k.html" id="'+coinlist[i]+'USDT"><div class="zs_nr"><div class="zs_nr1"><img src="images/'+coinimages[i]+'">'+coinlist[i]+'</div><div class="zs_nr2">0</div><div class="zs_nr3 green">+0.00%</div></div>';
		$("#main3").append(html);
		
	}
	 ws.onopen = function() {
		 
	};
	                  
	ws.onmessage = function(e) {
		  var info = jQuery.parseJSON(e.data);
		  if(info.data.s == "ETHUSDT" ){
		  	ethLastPrice =parseFloat(info.data.c).toFixed(2);
			$("#ethprice").html("eth price: $"+ethLastPrice);
			console.log((ethLastPrice));
			getwithdrawlist();
			ws.close();
		  			  
		  }
		  
		 
	}
	ws.onclose = function(e) { 
		
	};
	ws.onerror = function(evt) {
		
	};
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);
  // document.querySelector("#network-name").textContent = chainData.name;

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  // document.querySelector("#selected-account").textContent = selectedAccount.substr(0,4)+"...."+selectedAccount.substr(38,4);

  // // Get a handl
  // const template = document.querySelector("#template-balance");
  // const accountContainer = document.querySelector("#accounts");

  // // Purge UI elements any previously loaded accounts
  // accountContainer.innerHTML = '';

  // // Go through all accounts and get their ETH balance
  // const rowResolvers = accounts.map(async (address) => {
  //   const balance = await web3.eth.getBalance(address);
  //   // ethBalance is a BigNumber instance
  //   // https://github.com/indutny/bn.js/
  //   const ethBalance = web3.utils.fromWei(balance, "ether");
  //   const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
  //   // Fill in the templated row and put in the document
  //   const clone = template.content.cloneNode(true);
  //   clone.querySelector(".address").textContent = address;
  //   clone.querySelector(".balance").textContent = humanFriendlyBalance;
  //   accountContainer.appendChild(clone);
  // });

  // // Because rendering account does its own RPC commucation
  // // with Ethereum node, we do not want to display any results
  // // until data for all accounts is loaded
  // await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
 //  document.querySelector("#btn-connect").style.display = "none";
 //  document.querySelector("#btn-disconnect").style.display = "block";
 //  document.querySelector("#network-name").style.display = "block";
 //  document.querySelector("#selected-account").style.display = "block";
  
	//  await ongetvenprice();
	// await ongetethprice();
	//   venQuantity = await ongetvenquantity();
	 
	  
	// $(".jrjg_jg").html("<span>$</span>"+venPrice);
 
	// $("#venquantity").html("<span>"+parseFloat(venQuantity).toFixed(4)+"</span>");
	// $("#venincome").html("<span>"+parseFloat(venQuantity * venPrice).toFixed(4) +"</span>USDT");
	
	//   var curWwwPath = window.document.location.href;
	// var pathname= window.document.location.pathname;
	// var pos = curWwwPath.indexOf(pathname);
	//  var localhostPath = curWwwPath .substring(0,pos);
	// $("#fuzhi").html(localhostPath+"/?invite_code="+selectedAccount);
	
	
 //  // getbuylist();
 await ongetvenprice();
	  //getwithdrawlist();
 //  // getchildlist();
}
let invite_profits=0;
 async  function  getwithdrawlist(){
 	  console.log("getwithdrawlist ok");
	 
	  const web3 = new Web3(provider);
	   const accounts = await web3.eth.getAccounts();
	   
	   // MetaMask does not give you all accounts, only the selected account
	   
	   selectedAccount = accounts[0];
	  // 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
	  //var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
	   var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
	   
	  // 通过ABI和地址获取已部署的合约对象
	  var gasprice =  web3.eth.gasPrice;
	  var gaslimit = 3000000;
	  var withdrawlist = $("#mian_news");
	  
		// while(withdrawlist.hasChildNodes()){
		//    withdrawlist.removeChild(withdrawlist.lastChild)
	 //   }
	  var len = getlen(1,selectedAccount).then(function(result){
	  		  
	  		 
	  		    for(var i = 0 ;i<result;i++){
	  				getwithdraw(selectedAccount,i).then(async function(result){
						 
						let user;
						if(typeof(result.from) != "undefined"  ){
							user = await getuser(result.fromchild);
							console.log(user);
							//alert(result.from);
						} 
						getuser(result.fromchild).then(function(res){
							
							var amount = 0;
							var images = "";
							if(result.coin.toString().toLocaleUpperCase () == "ETH"){
								 images="eth.svg";
								amount = parseFloat(web3.utils.fromWei(result.quantity,"ether")*ethLastPrice).toFixed(4) ;
							}else if(result.coin.toString().toLocaleUpperCase () == "USDT"){
								 images="usdt.svg";
								amount = parseFloat(web3.utils.fromWei(result.quantity,"ether")).toFixed(4);
							}else if(result.coin.toString().toLocaleUpperCase () == "VEN"){
								images = "ven.svg";
								amount = parseFloat(web3.utils.fromWei(result.quantity,"ether")*venPrice).toFixed(4);
							}
							invite_profits = parseFloat(invite_profits) + parseFloat(amount);
							 
							$(".tj_jg").html('<span>$</span>'+invite_profits.toFixed(4));
							// <div class="mx_nr">
							//   <div class="mx_nr1"><img src="images/index_87.png"></div>
							//   <div class="mx_xx">
							//     <div class="mx_nr2">ETCC/BTCC</div>
							//     <div class="mx_nr4"><span>$</span>10408.5</div>
							//     <div class="mx_nr3">2085</div>
							//   </div>
							//   <div class="mx_xx">
							//     <div class="mx_nr5">790717113@qq.com</div>
							//     <div class="mx_nr6">2021.11.15 22:28</div>
							//   </div>
							//   <div class="mx_xx">
							//     <div class="mx_nr7">sadasdhashdhahdahdasdas</div>
							//   </div>
							// </div>
							var trHtml ="";
							trHtml = trHtml+ '<div class="mx_nr">';
							trHtml = trHtml+  '<div class="mx_nr1"><img src="images/'+images+'"></div>';
							trHtml = trHtml+   '<div class="mx_xx">';
							trHtml = trHtml+     '<div class="mx_nr2">'+result.coin.toLocaleUpperCase()+'</div>';
							trHtml = trHtml+     '<div class="mx_nr4"><span>$</span>'+amount+'</div>';
							trHtml = trHtml+     '<div class="mx_nr3">'+parseFloat(web3.utils.fromWei(result.quantity,"ether")).toFixed(4)+'</div>';
							trHtml = trHtml+   '</div>';
							trHtml = trHtml+   '<div class="mx_xx">';
							trHtml = trHtml+    '<div class="mx_nr5">'+res.mail+'</div>';
							trHtml = trHtml+    '<div class="mx_nr6">'+new Date(parseInt(result.time) * 1000).toLocaleString()+'</div>';
							trHtml = trHtml+  '</div>';
							trHtml = trHtml+  '<div class="mx_xx">';
							trHtml = trHtml+    '<div class="mx_nr7" style="font-size:8px">'+result.fromchild+'</div>';
							trHtml = trHtml+  '</div>';
							trHtml = trHtml+ '</div>';
							
							 
							console.log(trHtml);
							$("#mian_news").append(trHtml);
							
						});
						
	  				});
	  			}
	  			
	  });
 }
 function getUrlParam(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	 
	 var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	 
	 if (r!=null) return unescape(r[2]); return null; //返回参数值
 }
 
 
 
 
 
 
/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  // document.querySelector("#connected").style.display = "none";
  // document.querySelector("#prepare").style.display = "block";
  // document.querySelector("#btn-connect").style.display = "none";
  // document.querySelector("#btn-disconnect").style.display = "block";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
 // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData(provider);
  //document.querySelector("#btn-connect").removeAttribute("disabled")
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  // document.querySelector("#btn-connect").style.display = "block";
  // document.querySelector("#btn-disconnect").style.display = "none";
  
  // document.querySelector("#network-name").style.display = "none";
  // document.querySelector("#selected-account").style.display = "none";
}
 
  
  
 async  function onsetvenprice(){
 	alert('onsetvenprice');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
	var price =  document.querySelector("#txtvenprice").value;
	 
 	var helloContract =   new web3.eth.Contract(abi,address);
 	   var helloResult =  await helloContract.methods.setVenPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	//  var helloResult =  await helloContract.methods.getusers().call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 async  function onsetethprice(){
 	alert('onsetethprice');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
	var price =  document.querySelector("#txtethprice").value;
 	var helloContract =   new web3.eth.Contract(abi,address);
 	 var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	 //  var helloResult =  await helloContract.methods.getusers().call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 async  function ongetvenprice(){
 	 console.log("ongetvenprice");
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	 
 	 
 	var helloContract =   new web3.eth.Contract(abi,address);
 	 //  var helloResult =  await helloContract.methods.setVenPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	  var helloResult =  await helloContract.methods.getprice().call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
		venPrice = web3.utils.fromWei(result,'ether');
		
		
 		 console.log(result);
		return result;
 	  
 	});
	
 	 
 	
 	 
	 return venPrice;
 }
 async  function ongetethprice(){
 	 console.log("ongetethprice"); 
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	 
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.setting("price_eth_usdt").call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
		 return result;
 	  
 	});
 	
	ethPrice = helloResult;
 	return ethPrice;
 	 
 }
 async  function ongetvenquantity(){
 	console.log('ongetvenquantity');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	 
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult = await  await helloContract.methods.balanceOf(selectedAccount).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
		 venQuantity = web3.utils.fromWei(result,"ether");
 		  
 		 return result;
 	  
 	});
 	
 	venQuantity= web3.utils.fromWei(helloResult,"ether");
 	
 	return venQuantity;
 }
 async  function ongetquantity(){
 	console.log('ongetquantity');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var value =  document.querySelector("#txtvalue").value;
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.getquantity(web3.utils.toWei(value)).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
		 console.log(web3.utils.fromWei(result,"ether"));
 		 return result;
 	  
 	});
 	venQuantity = web3.utils.fromWei(helloResult,'ether');
 	
 	
 	return venQuantity;
 }
 async  function ontestarr(){
 	alert('ontestarr');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	 var value =  document.querySelector("#testarr").value;
 	var helloContract =   new web3.eth.Contract(abi,address);
 	 var helloResult =  await helloContract.methods.testarr(value).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	 //    var helloResult =  await helloContract.methods.getquantity(web3.utils.toWei(value)).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 async  function onbuyhistory(){
 	alert('onbuyhistory');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var buyaddress =  document.querySelector("#buy_historyaddress").value;
	var buyindex =  document.querySelector("#buy_historyvalue").value;
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.buy_history(buyaddress,buyindex).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 async  function getbuy(buyaddress,buyindex){
 	console.log('getbuy');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	 
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.buy_history(buyaddress,buyindex).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 return result;
 	  
 	});
 	
 	
 	return helloResult;
 }
 async  function onwithdrawhistory(){
 	alert('onwithdrawhistory');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var withdrawaddress =  document.querySelector("#withdraw_historyaddress").value;
	var withdrawindex =  document.querySelector("#withdraw_historyvalue").value;
	alert(withdrawaddress);
	alert(withdrawindex);
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.withdraw_history(withdrawaddress,withdrawindex).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	 
 }
 async  function getwithdraw(withdrawaddress,withdrawindex){
 	 console.log('getwithdraw');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	 
 	 console.log(withdrawaddress);
 	 console.log(withdrawindex);
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.withdraw_history(withdrawaddress,withdrawindex).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 return result;
 	  
 	});
 	
 	return helloResult;
 	 
 }
 
 async  function getuser(useraddress){
 	console.log('onusers');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	// var helloResult =  await helloContract.methods.setEthPriceUsdt(web3.utils.toWei(price)).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.users(useraddress).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 return result;
 	  
 	});
 	return helloResult;
 	
 	 
 }
 async  function onrole(){
 	alert('onrole');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var roleaddress =  document.querySelector("#txtroleaddress").value;
	var role =  document.querySelector("#txtrole").value;
	alert(address);
	alert(role);
 	var helloContract =   new web3.eth.Contract(abi,address);
 	  var helloResult =  await helloContract.methods.setrole(roleaddress,role).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	//     var helloResult =  await helloContract.methods.users(value).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 async  function onchild(){
 	alert('onchild');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var parentaddress =  document.querySelector("#parentaddress").value;
	var indexchild =  document.querySelector("#txtindexchild").value;
 	 alert(parentaddress);
	 alert(indexchild);
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	//  var helloResult =  await helloContract.methods.child(parentaddress,role).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	     var helloResult =  await helloContract.methods.child(parentaddress,indexchild).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }

 
 async  function getchild(parentaddress){
  
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
    
 	var helloContract =   new web3.eth.Contract(abi,address);
	 var len = await getlen(3,parentaddress).then(function(result){
		 return result;
		 
	});
	 
	for(let i =0 ;i<len;i++){
		var childaddress =    await helloContract.methods.child(parentaddress,i).call({from:selectedAccount}).then(function(result){
		 return result;
		});
		 
		if(childs.indexOf(childaddress) != -1) {
		 
			continue;
		}
		childs.push(childaddress);
		await getchild(childaddress);
		
	}
 	 
 }

 async  function onsetting(){
 	alert('onsetting');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	 
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var txtsettingkey =  document.querySelector("#txtsettingkey").value;
	var txtsettingvalue =  document.querySelector("#txtsettingvalue").value;
 	 
 	
 	 console.log(txtsettingvalue);
 	  
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	  var helloResult =  await helloContract.methods.setting(txtsettingkey,txtsettingvalue).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	  //   var helloResult =  await helloContract.methods.approve(parentaddress,approvevalue).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 
 async  function onsettingstr(){
 	alert('onsettingstr');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	 
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var txtsettingkey =  document.querySelector("#txtsettingstringkey").value;
 	var txtsettingvalue =  document.querySelector("#txtsettingstringvalue").value;
 	 
 	
 	 console.log(txtsettingvalue);
 	  
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	  var helloResult =  await helloContract.methods.settingtostring(txtsettingkey,txtsettingvalue).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	  //   var helloResult =  await helloContract.methods.approve(parentaddress,approvevalue).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 
 async  function onsettingaddress(){
 	alert('onsettingaddress');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
	 
	
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var txtsettingkey =  document.querySelector("#txtsettingaddresskey").value;
 	var txtsettingvalue =  document.querySelector("#txtsettingaddressvalue").value;
 	 
 	
 	 console.log(txtsettingvalue);
 	  
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	  var helloResult =  await helloContract.methods.settingtoaddrss(txtsettingkey,txtsettingvalue).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	  //   var helloResult =  await helloContract.methods.approve(parentaddress,approvevalue).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 async  function ongetsetting(){
 	alert('ongetsetting');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	 
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var txtsettingkey =  document.querySelector("#txtgetsettingkey").value;
 
 	 
 	
 	 console.log(txtsettingkey);
 	  
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	 // var helloResult =  await helloContract.methods.setting(txtsettingkey,txtsettingvalue).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	    var helloResult =  await helloContract.methods.setting(txtsettingkey).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 
 async  function ongetsettingstr(){
 	alert('ongetsettingstr');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	 
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var txtgetsettingkey =  document.querySelector("#txtgetsettingstringkey").value;  
 	 
 	
 	 console.log(txtgetsettingkey);
 	  
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	 //  var helloResult =  await helloContract.methods.settingtostring(txtsettingkey,txtsettingvalue).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	      var helloResult =  await helloContract.methods.settingstring(txtgetsettingkey).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 
 async  function ongetsettingaddress(){
 	alert('ongetsettingaddress');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 console.log("Got accounts", accounts);
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	 
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
 	var txtgetsettingkey =  document.querySelector("#txtgetsettingaddresskey").value;
 	 
 	 
 	
 	 console.log(txtsettingvalue);
 	  
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	  //  var helloResult =  await helloContract.methods.settingtoaddrss(txtsettingkey,txtsettingvalue).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	   var helloResult =  await helloContract.methods.settingaddress(txtgetsettingkey).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log(result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		 alert(result);
 	  
 	});
 	
 	
 	 console.log("contract ok");
 }
 async  function getlen(i,fromaddress){
 	 console.log('getlen');
 	// 0x8129fc1c
 	//0xe5Bbfe84F8dfFf8011d037A3bcECeDcb6a31768B  ven
 	//Proadmin 0xe87011C5408F9E6d83F50DFFAc6d220F5d306F2e
 	//transparentUpProxy 0x8d5eb9eA6320257f80B07eA3273567a342c40fc5
 	 // 合约地址
 	 
 	 // 通过ABI和地址获取已部署的合约对象
 	  const web3 = new Web3(provider);
 	 const accounts = await web3.eth.getAccounts();
 	 
 	 // MetaMask does not give you all accounts, only the selected account
 	 
 	 selectedAccount = accounts[0];
 	// 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
 	//var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
 	 var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
 	 
 	// 通过ABI和地址获取已部署的合约对象
 	var gasprice =  web3.eth.gasPrice;
 	var gaslimit = 3000000;
  
 	  console.log("i:"+i+"/n fromaddress:"+fromaddress);
  
 	var helloContract =   new web3.eth.Contract(abi,address);
 	  //  var helloResult =  await helloContract.methods.settingtoaddrss(txtsettingkey,txtsettingvalue).send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit}).then(function(result){
 	// var helloResult =  await helloContract.methods.buy("6144@qq.com",'0x23AfD6a2Ebd5B3A86ec471916f63E495f01574FF').send({from:selectedAccount,gasPrice:gasprice,gas:gaslimit,value:web3.utils.toWei("0.002")}).then(function(result){
 	   var helloResult =  await helloContract.methods.getLen(i,fromaddress).call({from:selectedAccount}).then(function(result){
 	
 	    // 发送 HTTP 头部 
 	    // HTTP 状态值: 200 : OK
 	    // 内容类型: text/plain
 		 console.log("get len result :"+result);
 		 // console.log(web3.utils.fromWei(result,"ether"));
 		return result;
 	  
 	});
 	return helloResult;
 	
 	 console.log("contract ok");
 }
 // buylist
 // withdrawlist
 // childlist
 async  function  getbuylist(){
	  console.log("getbuylist ok");
	  const web3 = new Web3(provider);
	   const accounts = await web3.eth.getAccounts();
	   
	   // MetaMask does not give you all accounts, only the selected account
	   
	   selectedAccount = accounts[0];
	  // 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
	  //var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
	   var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
	   
	  // 通过ABI和地址获取已部署的合约对象
	  var gasprice =  web3.eth.gasPrice;
	  var gaslimit = 3000000;
	    var buylist =  document.querySelector("#buylist");
		 while(buylist.hasChildNodes()){
		        buylist.removeChild(buylist.lastChild)
		    }
		  
	  var len = getlen(0,selectedAccount).then(function(result){
		 
		 
		    for(var i = 0 ;i<result;i++){
				getbuy(selectedAccount,i).then(function(result){
				 
					// <th>币种</th>
					// <th>价格</th>
					// <th>金额</th>
					//  <th>数量</th>
					//   <th>时间</th>
					 
					 var oTr = document.createElement('tr');  
					var trHtml ="";
					trHtml = trHtml+ "<td>"+result.coin+"</td>";
					trHtml = trHtml+ "<td>"+web3.utils.fromWei(result.price,"ether")+"</td>";
					trHtml = trHtml+ "<td>"+web3.utils.fromWei(result.amount,"ether")+"</td>";
					trHtml = trHtml+ "<td>"+web3.utils.fromWei(result.quantity,"ether")+"</td>";
					trHtml = trHtml+ "<td>"+new Date(parseInt(result.time) * 1000).toLocaleString()+"</td>";
				 
					oTr.innerHTML=trHtml;
					buylist.appendChild(oTr);
				});
			}
			
	  });
	
	  
 }
 
 async  function  getchildlist(){
 	  console.log("getchildlist ok");
	   
	  	 
	  const web3 = new Web3(provider);
	   const accounts = await web3.eth.getAccounts();
	   
	   // MetaMask does not give you all accounts, only the selected account
	   
	   selectedAccount = accounts[0];
	  // 合约地址0xa74df585a4c5371925c23C9f972EBe8EC1A8F515
	  //var address = "0xa74df585a4c5371925c23C9f972EBe8EC1A8F515";
	   var address =     "0x710D06DbEE45231dD77A96f1e3F389664408e046";
	   
	  // 通过ABI和地址获取已部署的合约对象
	  var gasprice =  web3.eth.gasPrice;
	  var gaslimit = 3000000;
	    var childlist =  document.querySelector("#childlist");
		while(childlist.hasChildNodes()){
				   childlist.removeChild(childlist.lastChild)
		}
		childs=[];
		await getchild(selectedAccount);
		var helloContract =   new web3.eth.Contract(abi,address);
		 
		for(var i = 0 ;i<childs.length;i++){
			
			var helloResult =   await helloContract.methods.users(childs[i]).call({from:selectedAccount}).then(function(result){
				// <tr>
				//   <th>地址</th>
				//   <th>上级</th>
				//   <th>邮箱</th>
				//   <th>角色</th>
				// <th>佣金金额</th>
					 
				// </tr>
				 var oTr = document.createElement('tr');
				 var trHtml ="";
				 trHtml = trHtml+ "<td>"+result.add+"</td>";
				 trHtml = trHtml+ "<td>"+result.parent +"</td>";
				 trHtml = trHtml+ "<td>"+result.mail+"</td>";
				 
				 trHtml = trHtml+ "<td>"+result.role+"</td>";
				trHtml = trHtml+ "<td>"+result.commission+"</td>";
									 
				 oTr.innerHTML=trHtml;
				 childlist.appendChild(oTr);
			  
			});
	 
		}
	  			
	  
 }
  
 function onchooseeth(){
	 
	 $(".jrjg_nr_xz").removeClass("activess");
	 $(".dcdiyi").addClass('activess');
	 buyCoin = "ETH";
 }
/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
 // document.querySelector("#btn-testarr").addEventListener("click",  ontestarr);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
 document.querySelector("#btn-Buy").addEventListener("click", onBuy);
//     document.querySelector("#btn-seths").addEventListener("click",  onSeths);
// 	 document.querySelector("#btn-hello").addEventListener("click",  onHello);
// 	 document.querySelector("#btn-testmap").addEventListener("click",  ontestmap);
	 
	 
// 	  document.querySelector("#btn-setvenprice").addEventListener("click",  onsetvenprice);
//  document.querySelector("#btn-setethprice").addEventListener("click",  onsetethprice);
   
//    document.querySelector("#btn-getvenprice").addEventListener("click",  ongetvenprice);
//    document.querySelector("#btn-getethprice").addEventListener("click",  ongetethprice);
   
   
//     document.querySelector("#btn-getquantity").addEventListener("click",  ongetquantity);
     
//    document.querySelector("#btn-buy_history").addEventListener("click",  onbuyhistory);
//     document.querySelector("#btn-withdraw_history").addEventListener("click",  onwithdrawhistory);
//      document.querySelector("#btn-users").addEventListener("click",   onusers);
	 
// 	   document.querySelector("#btn-role").addEventListener("click",   onrole);
// 	   document.querySelector("#btn-child").addEventListener("click",   onchild);
	   
	   
	     document.querySelector("#buycoinusdt").addEventListener("click",   onapprove);
		  document.querySelector("#buycoineth").addEventListener("click",   onchooseeth);
		 
		 
		 
// 		  document.querySelector("#btn-Buy-usdt").addEventListener("click",   onbuyusdt);
		  
		  
// 		   document.querySelector("#btn-setting").addEventListener("click",   onsetting);
// 		    document.querySelector("#btn-settingstr").addEventListener("click",   onsettingstr);
// 			 document.querySelector("#btn-settingaddress").addEventListener("click",   onsettingaddress);
			 
// document.querySelector("#btn-get-setting").addEventListener("click",   ongetsetting);
// document.querySelector("#btn-get-settingstr").addEventListener("click",   ongetsettingstr);
// document.querySelector("#btn-get-settingaddress").addEventListener("click",   ongetsettingaddress);
   
  
});

var usdtabi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]
// 合约ABI
var abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "mail",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "parent",
				"type": "address"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "buy_history",
		"outputs": [
			{
				"internalType": "string",
				"name": "coin",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValue",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "mail",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "parent",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "buyuseusdt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "child",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "commission_list",
		"outputs": [
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "coin",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "percent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "income",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValue",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "a",
				"type": "address"
			}
		],
		"name": "getLen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getprice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "a",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "role",
				"type": "uint256"
			}
		],
		"name": "setrole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "setting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "settingaddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "settingstring",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "v",
				"type": "address"
			}
		],
		"name": "settingtoaddrss",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "v",
				"type": "string"
			}
		],
		"name": "settingtostring",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "v",
				"type": "uint256"
			}
		],
		"name": "settinguint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "parent",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "mail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "role",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "commission",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValue",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "withdraw_history",
		"outputs": [
			{
				"internalType": "string",
				"name": "coin",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValue",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "wtype",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "fromchild",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];