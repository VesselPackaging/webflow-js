var time = Date.now();
console.log("start time");
console.log(time);
var a;
var b;
var c;
var d=1;
var e;
var f;
var alertStatus;
var g = "eng";

function setOnClick(target,func,arg=''){
	document.getElementById(target).addEventListener("click", function(){window[func](arg)});
}

window.onload = function(e){
	var clickArray = [
		['updateButton','initLocation',''],
		['languageButton','swapLanguage',''],
		['locationVAN','locationSelect','VAN'],
		['locationCGY','locationSelect','CGY'],
		['locationMISS','locationSelect','MISS'],
		['returnButton','resetLocation',''],
		['serviceButtonWH','serviceSelect','warehouse'],
		['serviceButtonMC','serviceSelect','mobileCanning'],
		['serviceButtonLB','serviceSelect','labels'],
		['companySubmitButton','companyInfoValidate','wf-form-companyInfo'],
		['formAlertButton','ToggleDisplay','formAlertWrapper'],
		['suppliesButton','ToggleDisplay','whSupplies'],
		['whBlankButton','warehouseSelect','Blank Cans'],
		['whSsButton','warehouseSelect','Shrink Sleeve'],
		['whPslButton','warehouseSelect','PSL'],
		['whSuppliesButton','warehouseSelect','Supplies Only'],
		['whSubmitButton','formValidateSubmit','wf-form-warehouseForm'],
		['mcAddBrandButton','addMcBrand',''],
		['mcDelBrandButton','deleteRow',''],
		['mcSubmitButton','mcFormValidateSubmit','wf-form-mobileCanningForm'],
		['newOrderButton','addNewOrder',''],
		['newSkuButton','addNewSku',''],
    ['repEmail','ToggleDisplay2','contactForm']
	];
		
	document.getElementById('whCanSize').addEventListener("change", function(){addCanStats()});
	document.getElementById('whCanSize').addEventListener("change", function(){ToggleInput('whPalletFormat')});
	document.getElementById('whCanSize').addEventListener("change", function(){buildOptionsPallets()});
	document.getElementById('whPalletFormat').addEventListener("change", function(){whUpdateLayerQty()});
	document.getElementById('whPalletFormat').addEventListener("change", function(){ToggleInput('whPalletCount')});
	document.getElementById('whPalletFormat').addEventListener("change", function(){ToggleInput('whLayerCount')});
	
	document.getElementById('whLayerCount').addEventListener("change", function(){whUpdatePalletQty()});
	document.getElementById('whPalletCount').addEventListener("change", function(){whUpdateLayerQty()});
	
	document.getElementById('whLabelInStock').addEventListener("change", function(){ToggleInputRev('whLabelSupplier')});
	document.getElementById('whLabelInStock').addEventListener("change", function(){ToggleInputRev('whLabelDate')});
	
	document.getElementById('whCanningLine').addEventListener("change", function(){ToggleInput('whCanningManufacturer')});
	document.getElementById('whCanningManufacturer').addEventListener("change", function(){toggleCanManufacturer(event)});
	
	document.getElementById('whIncising').addEventListener("change", function(){ToggleInput('whEndCount')});
	document.getElementById('whIncising').addEventListener("change", function(){ToggleSleeveQTY()});
	document.getElementById('whIncising').addEventListener("change", function(){EndsCalc(event)});
	document.getElementById('whEndCount').addEventListener("change", function(){EndsCalc(event)});
  document.getElementById('whPakTechCount').addEventListener("change", function(){PakCalc(event)});
  document.getElementById('whTrayCount').addEventListener("change", function(){TraysCalc(event)});
	document.getElementById('whPakTech').addEventListener("change", function(){ToggleInput('whPakTechCount')});
	document.getElementById('whTray').addEventListener("change", function(){ToggleInput('whTrayCount')});
	
	document.getElementById('labelReorderButton').addEventListener("click", function(){labelOrder('Reorder')});
	document.getElementById('labelNewOrderButton').addEventListener("click", function(){labelOrder('New')});
	document.getElementById('labelUpdateArtButton').addEventListener("click", function(){labelOrder('Modified')});
	document.getElementById('labelCalcButton').addEventListener("click", function(){ToggleDisplay('labelCalculator')});
	document.getElementById('labelAvgOrder').addEventListener("change", function(){labelCalc()});
	document.getElementById('labelAvgOrder').addEventListener("change",function(){minMaxValidate(event)});
	document.getElementById('labelFreqNum').addEventListener("change", function(){labelCalc()});
	document.getElementById('labelType').addEventListener("change", function(){TogglePSLOptions(event)});
	document.getElementById('labelCanSize').addEventListener("change", function(){TogglePSLSize(event)});
	document.getElementById('labelCanSize').addEventListener("change", function(){ToggleInput('labelPSLLength')});

	document.getElementById('labelCalcSubmit').addEventListener("click", function(){labelCalcUpdateOrder()});
	document.getElementById('labelToggleUpload').addEventListener("click", function(){labelUploadTrigger()});
	document.getElementById('labelSubmitButton').addEventListener("click", function(){formValidateSubmit('wf-form-labelOrderForm')});
	
	document.getElementById('mcLayers1').addEventListener("change", function(){mcVolCalc(event)});
	document.getElementById('mcTray').addEventListener("change", function(){ToggleInput('mcTrayType')});
	document.getElementById('mcPakTech').addEventListener("change", function(){ToggleInput('mcPakTechType')});
	document.getElementById('mcPakTech').addEventListener("change", function(){ToggleInput('mcPaktechBoxes')});
	document.getElementById('mcEndsProvided').addEventListener("change", function(){ToggleIncising(event)});
	
	document.getElementById('mcLabelsInStock').addEventListener("change", function(){ToggleInputRev('mcLabelSupplier')});
	document.getElementById('mcLabelsInStock').addEventListener("change", function(){ToggleInputRev('mcLabelArrive')});
	
	document.getElementById('formAlertWrapper').setAttribute("style","z-index:9999");
	
	document.getElementById('warehouseTC').addEventListener("click",function(){toggleTC(event)});
	document.getElementById('labelTC').addEventListener("click",function(){toggleTC(event)});
	document.getElementById('mcTC').addEventListener("click",function(){toggleTC(event)});
	document.getElementById('mcWildYeast').addEventListener("click",function(){toggleTC(event)});
	
	clickArray.forEach(function(val,ind){
	setOnClick(clickArray[ind][0],clickArray[ind][1],clickArray[ind][2]);
	});
	
console.log(Number(Date.now()-time));
Show('updateButton');
Hide('loadingTag');
  setTimeout(function(){ fadeIn('updateButton');}, 100);

addValidation('wf-form-companyInfo');
addValidation('wf-form-warehouseForm');
addValidation('wf-form-mobileCanningForm');
addValidation('wf-form-labelOrderForm');
initStatus();
}

function initStatus(){
	document.getElementById('labelTC').value="";
	var disableArray=["whPalletFormat",
					"whEndCount",
					"whPakTechCount",
					"whTrayCount",
					"whLabelSupplier",
					"whLabelDate",
					"whPalletCount",
					"whLayerCount",
					"whCanningManufacturer",
					"whOtherManufacturer",
					"whEndCalc",
					"labelHorValue",
					"labelCalcOutput",
					"labelsPSLOptionsDiv",
					"labelPSLLength",
					"mcTrayType",
					"mcPakTechType",
					"mcPaktechBoxes",
					"mcLabelSupplier",
					"mcLabelArrive",
					"mcIncising"];
	var hideArray=["brandNameDiv",
				   "labelTypeDiv",
				   "labelCanSizeDiv",
				   "supplierDiv",
				   "labelQtyDiv",
				   "labelToggleUploadDiv",
				   "uploadStatus",
				   "labelSubmitButton"];
	var HFArray=["warehouseCanOrder",
				"suppliesButtonDiv",
				"whSupplies",
				"warehouseShippingDetails",
				"whShipping"];
	disableArray.forEach(function(val,ind){
	document.getElementById(disableArray[ind]).disabled = true;
	});				
	hideArray.forEach(function(val,ind){
	document.getElementById(hideArray[ind]).classList.add('hide');
	document.getElementById(hideArray[ind]).classList.remove('show');
	});
	HFArray.forEach(function(val,ind){
	document.getElementById(HFArray[ind]).classList.add('hide','fadeout');
	document.getElementById(HFArray[ind]).classList.remove('show','fadein');
	});
	document.getElementById('warehouseOrderTypeDiv').classList.remove('hide');
  $('.w-checkbox-input').removeClass('w--redirected-checked');
}

function resetLocation(){
	Show('locationSelection');
	fadeOut('serviceSelectionWrap');
	fadeOut('companyInfoWrap');
	fadeOut('labelOrderWrap');
	fadeOut('mobileCanningWrap');
	fadeOut('warehouseWrap');
	fadeOut('resetRow');
	setTimeout(function(){ fadeIn('locationSelection') }, 300);
	setTimeout(function(){ Hide('serviceSelectionWrap');
						   Hide('companyInfoWrap');
						   Hide('labelOrderWrap');
						   Hide('mobileCanningWrap');
						   Hide('warehouseWrap');
						   Hide('resetRow'); }, 300);
  
	Show('warehouseOrderTypeDiv');
	Hide('warehouseLabelOrder');
	Hide('warehouseCanOrder');
	Hide('warehouseShippingDetails');
	Hide('whSupplies');
	Hide('suppliesButtonDiv');
	Hide('whShipping');
	Hide('resultDiv');
	Hide('uploadLabel');
	Hide('labelSubmitButton');
	Hide('labelsPODiv');
	Hide('labelsPSLOptionsDiv');
	fadeOut('warehouseLabelOrder');
	fadeOut('warehouseCanOrder');
	fadeOut('whSupplies');
	fadeOut('warehouseShippingDetails');
	fadeOut('suppliesButtonDiv');
	fadeOut('whShipping');
	fadeOut('resultDiv');
  
  try{
 		document.getElementById('warehouseTC').value="";
		document.getElementById('mcWildYeast').value="";
		document.getElementById('mcTC').value="";
		document.getElementById('labelTC').value="";
		document.getElementById('warehouseTC').checked=false;
		document.getElementById('mcWildYeast').checked=false;
		document.getElementById('mcTC').checked=false;
		document.getElementById('labelTC').checked=false;
		document.getElementById("wf-form-mobileCanningForm").reset();
		document.getElementById("wf-form-warehouseForm").reset();
		document.getElementById("wf-form-labelOrderForm").reset();
		$('.w-checkbox-input').removeClass('w--redirected-checked');
    
}
  catch(err){}
  
}

function locationSelect(province){
	a=province;
  	document.getElementById('labelTC').value="";
	var za = document.getElementById('locationTitle');
	var zaFr = document.getElementById('locationTitleFr');
	//var zb = document.getElementById('repEmail');
	
	fadeOut('locationSelection');
	setTimeout(function(){ Hide('locationSelection') }, 300);
  
	Show('serviceSelectionWrap');
	Show('resetRow');
	setTimeout(function(){ fadeIn('serviceSelectionWrap');
						   fadeIn('resetRow')	}, 300);				   
  za.innerHTML = locations[a].name;
  zaFr.innerHTML = locations[a].name;
  //zb.setAttribute("onclick" , "location.href='mailto:"+locations[a].salesEmail+"'")
 
  document.getElementById('warehouseLeadTime').innerHTML = document.getElementById("leadTime_warehouse_"+a).innerHTML;
  document.getElementById('mobileCanningLeadTime').innerHTML = document.getElementById("leadTime_mobileCanning_"+a).innerHTML;
  document.getElementById('labelLeadTime').innerHTML = document.getElementById("leadTime_labels_"+a).innerHTML;
  
  	try{removeAll(labelCanSize);}
	catch(err){}
	buildOptions(locations[a].warehouse.canFormats,'labelCanSize');

}

function serviceSelect(service){
	GetMinDate(service);
	fadeOut('serviceSelectionWrap');
	setTimeout(function(){ Hide('serviceSelectionWrap') }, 300);
  
	Show('companyInfoWrap');
	setTimeout(function(){ fadeIn('companyInfoWrap') }, 300);
	b=service;
	
	var za = document.getElementById('locationTitle');
	var zaFr = document.getElementById('locationTitleFr');
	
	
	if(b=='warehouse'){
		za.insertAdjacentHTML( 'beforeend', " > Label application & supplies ");
		zaFr.insertAdjacentHTML( 'beforeend', " > Application d'étiquettes & fournitures");}
		
	if(b=='mobileCanning'){
		za.insertAdjacentHTML( 'beforeend', " > Mobile canning");
		zaFr.insertAdjacentHTML( 'beforeend', " > Mise en cannette mobile");}
	if(b=='labels'){
		za.insertAdjacentHTML( 'beforeend', " > Label ordering");
		zaFr.insertAdjacentHTML( 'beforeend', " > Commander des étiquettes");}
}

function showServiceForm(){
	copyCompanyInfo(b);
	GetMinDate(b);
	fadeOut('companyInfoWrap');
	setTimeout(function(){ Hide('companyInfoWrap') }, 300);
	
	if(b=="labels"){
		Show('labelOrderWrap');
		setTimeout(function(){ fadeIn('labelOrderWrap') }, 300);
	}
	
	if(b=="mobileCanning"){
		Show('mobileCanningWrap');
		if(a=="MISS"){document.getElementById('mcIncising').disabled=false;}
		else{document.getElementById('mcIncising').disabled=true;}
		
		var za = locations[a].mobileCanning;
		var zb = locations[a].warehouse;
		setTimeout(function(){
			fadeIn('mobileCanningWrap');
			removeAll(mcSize1);
			removeAll(mcLabel1);
			removeAll(mcIncising);
			removeAll(mcTrayType);
			removeAll(mcPakTechType);
			buildOptions(za.canFormats,"mcSize1");
			buildOptions(za.labelTypes,"mcLabel1");
			buildOptions(zb.end.types,"mcIncising");
			buildOptions(za.trayTypes,"mcTrayType");
			buildOptions(za.paktechTypes,"mcPakTechType");
			}, 300);
	}
	
	if(b=="warehouse"){
		var zb = locations[a].warehouse;
		document.getElementById('whTrayCount').value="";
		document.getElementById('whTrayCount').max = zb.tray.max;
		$("label[for='whTrayCount']").html(zb.tray.format+' ('+zb.tray.units+')*');
		
		Show('warehouseWrap');
		setTimeout(function(){
			fadeIn('warehouseWrap');
			removeAll(whCanSize);
			removeAll(whIncising);
			removeAll(whTray);
			removeAll(whPakTech);
			buildOptions(zb.end.types,"whIncising");
			buildOptions(zb.tray.types,"whTray");
			buildOptions(zb.canFormats,"whCanSize");
			buildOptions(zb.paktechTypes,"whPakTech");
		},300);
	} 
}

function labelOrder(type){
	c=type;
	var za = document.getElementById('wf-form-labelOrderForm');
	za.action = "https://hooks.zapier.com/hooks/catch/4099777/bdkx6oi/silent/"
	document.getElementById('labelChanges').required = false;
	Show('brandNameDiv');
	Show('labelTypeDiv');
	Show('labelCanSizeDiv');
	Show('labelsButtonRow');
	Show('labelsPODiv');
	Show('labelToggleUploadDiv');
	setTimeout(function(){
		fadeIn('labelsButtonRow');
	},300);
		
	switch(type){
  	case 'Reorder':
        Show('labelQtyDiv');
		Show('supplierDiv');
        Hide('changesDiv');
        Hide('uploadLabel');
		Hide('labelSubmitButton');
    	break;
    case 'New':
        Show('labelQtyDiv');
        Hide('changesDiv');
		Hide('supplierDiv');
		Hide('labelSubmitButton');
		Hide('uploadLabel');
    	break;
     case 'Modified':
        Show('changesDiv');
		Show('supplierDiv');
        Show('labelQtyDiv');
		Hide('labelSubmitButton');
		Hide('uploadLabel');
		document.getElementById('labelChanges').required = true;
     	break;
  }
  document.getElementById('labelBrandName').value ='';
  document.getElementById('labelsOrderType').value = c;
  document.getElementById('labelsOfficeLocation').value = a;
  
}

function buildOptions(srcArray,target){
	console.log("builOptions target: "+target);
	var za = document.createElement("option");
		za.value = "";
		za.innerHTML = "Please select / Sélectionner une";
		za.value="";
		document.getElementById(target).appendChild(za);
	for(var i=0; i<srcArray.length; i++){
		var za = document.createElement("option");
		za.value = srcArray[i];
		za.innerHTML = srcArray[i];
		document.getElementById(target).appendChild(za);
	}
}

function buildOptionsPallets(){
	removeAll(whPalletFormat);
	var canSize = document.getElementById('whCanSize').value;
	var srcArray = locations[a].warehouse.cans[canSize].labelType[e].palletOptions;
	var za = document.createElement("option");
		za.value = "";
		za.innerHTML = "Please select / Sélectionner une";
		za.value="";
		document.getElementById('whPalletFormat').appendChild(za);
	for(var i=0; i<srcArray.length; i++){
		var za = document.createElement("option");
		za.value = srcArray[i][1];
		za.innerHTML = srcArray[i][0]+" ("+srcArray[i][1]+" layers/couches)";
		document.getElementById('whPalletFormat').appendChild(za);
	}
	document.getElementById('whPalletCount').value="";
	document.getElementById('whLayerCount').value="";
	document.getElementById('whCanCount').innerHTML="";
}

function removeAll(target) {
    while (target.options.length > 0) {
        target.remove(0);
    }
}

function warehouseSelect(service){
	GetMinDate(service);
	var zz = document.getElementById('whDunnage');
	zz.disabled = false;
	var za = document.getElementById('locationTitle');
	var zaFr = document.getElementById('locationTitleFr');
	switch (service){
		case "Blank Cans":
			za.insertAdjacentHTML( 'beforeend', " > Blank cans");
			zaFr.insertAdjacentHTML( 'beforeend', " > Vierges");
			ToggleDisplay('warehouseCanOrder');
			Hide('whBrandDiv');
			Hide('runAllLabelsDiv');
			zz.disabled = true;
			break;
		case "PSL":
			za.insertAdjacentHTML( 'beforeend', " > PSL");
			zaFr.insertAdjacentHTML( 'beforeend', " > EAC");
			ToggleDisplay('warehouseCanOrder');
			ToggleDisplay('warehouseLabelOrder');
			Show('whBrandDiv');
			Show('runAllLabelsDiv');
			break;
		case "Shrink Sleeve":
			za.insertAdjacentHTML( 'beforeend', " > Shrink sleeves");
			zaFr.insertAdjacentHTML( 'beforeend', " > Manchons rétractables");
			ToggleDisplay('warehouseCanOrder');
			ToggleDisplay('warehouseLabelOrder');
			Show('whBrandDiv');
			Show('runAllLabelsDiv');
			break;
		case "Supplies Only":
			za.insertAdjacentHTML( 'beforeend', " > Supplies only");
			zaFr.insertAdjacentHTML( 'beforeend', " > Fournitures seulement");
			ToggleDisplay('whSupplies');
			break;
		default:;
	}
	document.getElementById('warehouseOrderType').value = service;
	e = service;
	Hide('warehouseOrderTypeDiv');
	ToggleDisplay('warehouseShippingDetails');
	ToggleDisplay('suppliesButtonDiv');
	ToggleDisplay('whShipping');
}

function ToggleDisplay(target){
	var za = document.getElementById(target);
	if(za.classList.contains('hide')){
		za.classList.remove('hide');
		za.classList.add('show');
		setTimeout(function(){ 
			fadeIn(za.id);
		}, 200);
	}
	else{
		fadeOut(za.id);
		setTimeout(function(){ 
			za.classList.add('hide');
			za.classList.remove('show');
		}, 200);
	}
}

function labelCalc(){
	var freq = document.getElementById('labelFreqNum').value;
	var avg = document.getElementById('labelAvgOrder').value;
	var hor = document.getElementById('labelHorizon').value;
	var min = document.getElementById('labelQty').min;
	document.getElementById('labelHorValue').innerHTML = hor+" months";
	if(Math.abs((Math.ceil(((avg/freq)*hor)/1000))*1000)>250000){
		document.getElementById('labelCalcOutput').innerHTML = "250000";
	}
	else{
		if(Math.abs((Math.ceil(((avg/freq)*hor)/1000))*1000)<min){
			document.getElementById('labelCalcOutput').innerHTML = min;
		}
		else{document.getElementById('labelCalcOutput').innerHTML = Math.abs((Math.ceil(((avg/freq)*hor)/1000))*1000);}
	}
	
}


function labelCalcUpdateOrder(){
	document.getElementById('labelQty').value = document.getElementById('labelCalcOutput').innerHTML;
	ToggleDisplay('labelCalculator');
}

function formSubmit(target){
	Hide('labelOrderWrap');
	Hide('mobileCanningWrap');
	Hide('warehouseWrap');
	Hide('resetRow');
	setTimeout(function(){ 
		fadeOut('labelOrderWrap');
		fadeOut('mobileCanningWrap');
		fadeOut('warehouseWrap');
		fadeOut('resetRow');
	},300);
	
	setTimeout(function(){
		document.getElementById(target).submit();
		ToggleDisplay('resultDiv');
	},500);
}

function ToggleIncising(event){
	if(event.target.value == 'true'){
		if(a=="MISS"){
			document.getElementById('mcIncising').disabled=false;}
		else{
			document.getElementById('mcIncising').disabled=true;
	}	
}
else{
	document.getElementById('mcIncising').disabled = true;
}
}


function addCanStats(){
	var za = document.getElementById('whCanSize').value;
	document.getElementById('whLayerCount').min = Number(locations[a].warehouse.cans[za].labelType[e].min);
}

function whUpdatePalletQty(){
	var zb = document.getElementById('whLayerCount');
	if(zb.value > Number(zb.max)){
		zb.value = zb.max;
	}
	document.getElementById('whPalletCount').value = Math.ceil(Number(zb.value)/Number(document.getElementById('whPalletFormat').value));
	var za = document.getElementById('whCanSize').value;
	var canFactor = Number(locations[a].warehouse.cans[za].layerFactor);
	var layerQty = document.getElementById('whPalletFormat').value;
	document.getElementById('whLabelCanCount').value = Number(zb.value)*canFactor;
	document.getElementById('whCanCount').innerHTML = Number(zb.value)*canFactor;
	if(e == "Blank Cans"){
		whUpdateLayerQty()};
}

function whUpdateLayerQty(){
	var zb = document.getElementById('whPalletCount');
	if(zb.value > Number(zb.max)){
		zb.value = zb.max;
	}
	document.getElementById('whLayerCount').value = Number(zb.value)*Number(document.getElementById('whPalletFormat').value);
	var za = document.getElementById('whCanSize').value;
	var canFactor = Number(locations[a].warehouse.cans[za].layerFactor);
	var layerQty = document.getElementById('whPalletFormat').value;
	document.getElementById('whLabelCanCount').value = Number(document.getElementById('whLayerCount').value)*canFactor;
	document.getElementById('whCanCount').innerHTML = Number(document.getElementById('whLayerCount').value)*canFactor;
}

function isVisible(e) {
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

function formValidator(target){
	var za = document.getElementById(target);
	var fields = document[za.name].elements;
	alertStatus = 0;
	for(var i=0;i<fields.length;i++){
		if(isVisible(fields[i])== true){
			if(fields[i].required == true){
				if(fields[i].disabled== false){
					if(fields[i].value==""){
						alertStatus=1;
						console.log(fields[i].id);
					}
					else{}
				}	
				else{}
			}
			else{}
		}
		else{}
	}
	if(alertStatus==1){
		var aa = document.getElementById("formAlertWrapper").style;
		aa.position = 'fixed';
		aa.width = '100%';
		aa.height = '100%';
		ToggleDisplay("formAlertWrapper");
	}
	return false;
}

function companyInfoValidate(target){
	formValidator(target);
	ValidateFormEmail('contactEmail');
	if(alertStatus == 0){
		showServiceForm();}
		return false;
}

function formValidateSubmit(target){
	formValidator(target);
	if(alertStatus == 0){
		formSubmit(target);}
	return false;	
}

function mcFormValidateSubmit(target){
	combineMCBrands();
	setTimeout(function(){ 
			formValidateSubmit(target);
		}, 200);
}

function initLocation(){
	console.log('init location');
	ToggleDisplay('updateDivWarapper');
	ToggleDisplay('locationSelection');
	Hide('leadDiv_VAN');
	Hide('leadDiv_CGY');
	Hide('leadDiv_MISS');
	$( ".french" ).toggleClass("hidden")
}

function copyCompanyInfo(service){
	var companyArray=["companyName","contactName","contactEmail","contactPhone"];
		companyArray.forEach(function(val,ind){
			try{
				document.getElementById(service+companyArray[ind]).value = document.getElementById(companyArray[ind]).value;
			}
			catch(err){console.log(err);}
		});
		if(a=='CGY'){document.getElementById(service+'Location').value='orders.calgary@vesselpackaging.com';}
		if(a=='VAN'){document.getElementById(service+'Location').value='orders.vancouver@vesselpackaging.com';}
		if(a=='MISS'){document.getElementById(service+'Location').value='orders.east@vesselpackaging.com';}
		document.getElementById(service+'OrderDate').value = new Date().toLocaleDateString('en-UK');
}

function addValidation(target){
	var elements = document.forms[document.getElementById(target).name].elements;
	for (i=0; i<elements.length; i++){
		if(elements[i].tagName == "INPUT" && elements[i].type!="range" && elements[i].type=="number"){
			console.log(elements[i].id);
			elements[i].addEventListener("change",function(){minMaxValidate(event)});
		}
		if(elements[i].tagName == "INPUT" && elements[i].type == "email"){
			elements[i].addEventListener("change",function(){ValidateEmail(event)});
		}
		if(elements[i].classList.contains('datepicker')==true){
			try{
			elements[i].addEventListener("change",function(){ValidateDate(event)});
			elements[i].maxlength = '10';}
			catch(err){}
		}
	}
}

function ToggleInput(field){
	if(event.target.value!= ""){
		if(event.target.value != "no" && event.target.value != 'false' ){
			document.getElementById(field).disabled = false;
		}
		else{
			document.getElementById(field).disabled = true;
		}
	}
	else{
		document.getElementById(field).disabled = true;
	}
}

function ToggleInputRev(field){
	if(event.target.value==""){
		document.getElementById(field).disabled = true;
	}
	else{
		if(event.target.value == "no" || event.target.value == 'false'){
			document.getElementById(field).disabled = false;
		}
		else{document.getElementById(field).disabled = true;}
	}
}

function addMcBrand(){
	if(d<6){
		d+=1;
		var za = document.getElementById('mcBrandsTable');
		var zy = locations[a].mobileCanning;
			

		var zc = document.createElement('input');
			zc.id = "mcBrand"+d;
			zc.name = "mcBrand"+d;
			zc.minlength = "3";
			zc.title = "Product or brand name";
			zc.placeholder = "My biere";
			zc.classList.add('text-field','w-input');
			zc.required = true;
		var zd = document.createElement('label');
			zd.setAttribute("for", zc.id);
			zd.innerHTML="Product/Produit*";
			zd.classList.add('field-label');
			zd.id='mcBrandLabel'+d;			
		var zz = document.createElement("div");
			zz.id = zc.id+"div";
			zz.classList.add('table20p');
			zz.appendChild(zd);
			zz.appendChild(zc);
			za.appendChild(zz);

		var zc = document.createElement('select');
			zc.id = "mcLabel"+d;
			zc.name = "mcLabel"+d;
			zc.classList.add('text-field','w-select');
			zc.required = true;
		var zd = document.createElement('label');
			zd.setAttribute("for", zc.id);
			zd.innerHTML="Label/Étiquette*";
			zd.classList.add('field-label');
			zd.id='mcLabelLabel'+d;
		var zz = document.createElement("div");
			zz.id = zc.id+"div";
			zz.classList.add('table20p');
			zz.appendChild(zd);
			zz.appendChild(zc);
		za.appendChild(zz);
		buildOptions(zy.labelTypes,zc.id);
		

		var zc = document.createElement('select');
			zc.id = "mcSize"+d;
			zc.name = "mcSize"+d;
			zc.classList.add('text-field','w-select');
			zc.required = true;
		var zd = document.createElement('label');
			zd.setAttribute("for", zc.id);
			zd.innerHTML="Size / Format*";
			zd.classList.add('field-label');
			zd.id='mcSizeLabel'+d;
		var zz = document.createElement("div");
			zz.id = zc.id+"div";
			zz.classList.add('table20p');
			zz.appendChild(zd);
			zz.appendChild(zc);
		za.appendChild(zz);
		buildOptions(zy.canFormats,zc.id);
		

		var zc = document.createElement('input');
			zc.id = "mcLayers"+d;
			zc.name = "mcLayers"+d;
			zc.min = "0";
			zc.step = "1";
			zc.max = "100";
			zc.placeholder = "6";
			zc.classList.add('text-field','w-input');
			zc.type="number";
			zc.required = true;
			zc.addEventListener("change",function(){minMaxValidate(event)});
			zc.addEventListener("change", function(){mcVolCalc(event)});
		var zd = document.createElement('label');
			zd.setAttribute("for", zc.id);
			zd.innerHTML="Can layers*";
			zd.classList.add('field-label');	
			zd.id='mcLayerLabel'+d;
			zc.required = true;
		var zz = document.createElement("div");
			zz.id = zc.id+"div";
			zz.classList.add('table20p');
			zz.appendChild(zd);
			zz.appendChild(zc);
			za.appendChild(zz);
		

		var zzc = document.createTextNode('');
		var zzb = document.createElement('h4');
			zzb.classList.add('w-input','text-field');
			zzb.style.marginTop ="0";
			zzb.id="mcVol"+d;                                                                          
		zzb.appendChild(zzc);
		var zzd = document.createElement('label');
			zzd.setAttribute("for", zzb.id);
			zzd.innerHTML="Volume(généré)";
			zzd.classList.add('field-label');
			
		var zza = document.createElement("div");
			zza.id = zzb.id+"div";
			zza.classList.add('table20p');
			zza.appendChild(zzd);
			zza.appendChild(zzb);
		za.appendChild(zza);	
		
	}
}
function deleteRow(){
	if(d > 1 ){
		document.getElementById('mcLayers'+d+'div').remove();
		document.getElementById('mcBrand'+d+'div').remove();
		document.getElementById('mcSize'+d+'div').remove();
		document.getElementById('mcLabel'+d+'div').remove();
		document.getElementById('mcVol'+d+'div').remove();
		d-=1;
	}
}

function combineMCBrands(){
	var string="";
	for(var i=1 ; i<d+1 ; i++){
		string += document.getElementById('mcLayers'+i).value+" layers of "+document.getElementById('mcBrand'+i).value+" - "+document.getElementById('mcSize'+i).value+" - "+document.getElementById('mcLabel'+i).value+"<br>";
	}
	document.getElementById('mcCombinedBrands').value = string;
	var string="";
	for(var i=1 ; i<d+1 ; i++){
		string += document.getElementById('mcLayers'+i).value+" layers of "+document.getElementById('mcBrand'+i).value+" - "+document.getElementById('mcSize'+i).value+" - "+document.getElementById('mcLabel'+i).value+". ";
	}
	document.getElementById('mcCombinedBrandSheet').value = string;
	
}

function labelUploadTrigger(){
	formValidator('wf-form-labelOrderForm');
	if(alertStatus==0){
		if(c=="Reorder"){
			
			Show('uploadLabel');
			Hide('labelToggleUploadDiv');
			Show('labelSubmitButton');
		}
		else{
			Show('uploadLabel');
			Hide('labelToggleUploadDiv');
		}
	}
	else{
		Hide('uploadLabel'); 
	}
}
function toggleTC(event){
	console.log(event.target.id);
	if(event.target.value!="true"){
		event.target.value ='true';
		event.target.checked = true;
	}
	else{
		event.target.value="";
		event.target.checked = false;
	}
}

document.addEventListener('DOMContentLoaded', function() {
    var trayInputField = document.getElementById('whTrayCalc');
    trayInputField.disabled = true;

    var pakInputField = document.getElementById('whPakCalc');
    pakInputField.disabled = true;
});


function TraysCalc(event){
	var za = document.getElementById('whTray');
	var zb = document.getElementById('whTrayCount');
	var zc = document.getElementById('whTrayCalc');
  if(a=="MISS"){
  	zc.value = zb.value * 24;
  }else{
  	zc.value = zb.value * 50 * 24;
  }
}

function PakCalc(event) {
  var za = document.getElementById('whPakTech');
  var zb = document.getElementById('whPakTechCount');
  var zc = document.getElementById('whPakCalc');

  var multiplier = 0;
  if (za.value === "4pk Black (788/box)" || za.value === "4pk White (788/box)") {
    multiplier = 3152;
  } else if (za.value === "6pk Black (510/box)" || za.value === "6pk White (510/box)") {
    multiplier = 3060;
  }

  zc.value = zb.value * multiplier;
}


function toggleCanManufacturer(event){
	if(event.target.value=="Other"){
		document.getElementById("whOtherManufacturer").disabled = false;
	}
	else{document.getElementById("whOtherManufacturer").disabled = true;}
}

function toggleLabelArrival(event){
	if(event.target.value=="false"){
		document.getElementById("whLabelSupplier").disabled = false;
		document.getElementById("whLabelDate").disabled = false;
	}
	else{
		document.getElementById("whLabelSupplier").disabled = false;
		document.getElementById("whLabelDate").disabled = false;}
}

function GetMinDate(service){
var whLead = document.getElementById("leadTime_warehouse_"+a).innerHTML.match(/(\d+)/g);
	var labelLead = document.getElementById("leadTime_labels_"+a).innerHTML.match(/(\d+)/g);
	var mcLead = document.getElementById("leadTime_mobileCanning_"+a).innerHTML.match(/(\d+)/g);
	var leadstring;
switch (service) {
  case "warehouse":
  case "Blank Cans":
    leadstring = whLead[0];
    break;
  case "PSL":
    leadstring = labelLead[0];
    break;
  case "Shrink Sleeve":
    leadstring = labelLead[2];
    break;
  case "Printed":
    leadstring = whLead[1];
    break;
  case "mobileCanning":
    leadstring = mcLead[0];
    break;
}
	var leadtime = Number(leadstring);
	f = leadtime;
	$("#mcDate").datepicker("option", "minDate", leadtime);
	$("#whShippingDate").datepicker("option", "minDate", leadtime);
	$("#mcLabelArrive").datepicker("option", "minDate", 0);
	$("#whLabelDate").datepicker("option", "minDate", 0);		
}
function addNewOrder(){
	document.getElementById("wf-form-warehouseForm").reset();
	document.getElementById("wf-form-mobileCanningForm").reset();
	document.getElementById("wf-form-labelOrderForm").reset();
	Hide('uploadLabel');
	Hide('labelSubmitButton');
	initStatus();
	ToggleDisplay('resultDiv');
	locationSelect(a);
	for(var i = 6; i>1; i-=1){
		deleteRow();
	}
}

function minMaxValidate(event){
	var val = event.target.value;
	var current = $("label[for='" + event.target.id + "']").html();
	if(val < Number(event.target.min)){
		event.target.disabled = true;
		event.target.value = event.target.min;
		$("label[for='" + event.target.id + "']").html("<span style='color:red'>Minimum "+event.target.min+"</span>");
	}
	else{
		if(val > Number(event.target.max)){
			event.target.disabled = true;
			event.target.value = event.target.max;
			$("label[for='" + event.target.id + "']").html("<span style='color:red'>Maximum "+event.target.max+"</span>");
		}
		else{
			if(event.target.step != '' &&  val%event.target.step != 0){
				event.target.disabled = true;
				event.target.value = Math.ceil(val/event.target.step)*Number(event.target.step);
				$("label[for='" + event.target.id + "']").html("<span style='color:red'>Rounded to nearest / Arrondi au plus proche "+event.target.step+"</span>");
			}
		}
	}
	setTimeout(function(){ 
			$("label[for='" + event.target.id + "']").html(current);
			event.target.disabled = false;
		}, 1500);
}

function ValidateEmail(event){
	var current = $("label[for='" + event.target.id + "']").html();
	if(event.target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)!=null){
	console.log('match not null');
	}
	else{
		event.target.disabled = true;
		$("label[for='" + event.target.id + "']").html("<span style='color:red'>Please enter a valid email</span>");
		setTimeout(function(){ 
			$("label[for='" + event.target.id + "']").html(current);
			event.target.disabled = false;
			event.target.value='';
		}, 1500);
	}
}

function ValidateFormEmail(field){
	var target = document.getElementById(field);
	var current = $("label[for='" + target.id + "']").html();
	if(target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)!=null){
	console.log('match not null');
	}
	else{
		alertStatus = 1;
	}
}

function ValidateDate(event){
	var currentMonth = new Date().getMonth()+1;
	var currentYear = new Date().getFullYear();
	var currentDate = new Date().getDate();
	var monthVal;
	var dateVal;
	var yearVal;
	var validStatus=0;
	var current = $("label[for='" + event.target.id + "']").html();
	
	if (event.target.value.match(/\d{2}-\d{2}-\d{4}/)!=null){
		if(event.target.value.match(/\d\d\d\d/g)[0]>=currentYear && event.target.value.match(/\d\d\d\d/g)[0]<=currentYear+1){
			yearVal = event.target.value.match(/\d\d\d\d/g)[0];
		}
			else{
				yearVal = currentYear;
			}
		if(Number(event.target.value.match(/\d\d/g)[1])<=12){
				monthVal = event.target.value.match(/\d\d/g)[1];
			}
			else{
				monthVal = 12;
				validStatus=1;
				}
	
		if(Number(event.target.value.match(/\d\d/g)[0]) <= Number(daysInMonth(monthVal,yearVal))){
				dateVal = event.target.value.match(/\d\d/g)[0];
			}
			else{
				dateVal = daysInMonth(monthVal,yearVal);
				validStatus=1;
			}		
		
		if(event.target.id=="whLabelDate" || event.target.id=="mcLabelArrive"){
			if(yearVal==currentYear && Number(monthVal)<=Number(currentMonth) && dateVal<(Number(currentDate))){
				event.target.value = Number(currentDate).toString().padStart(2, '0')+"-"+currentMonth.toString().padStart(2, '0')+"-"+yearVal;
				event.target.disabled = true;
					$("label[for='" + event.target.id + "']").html("<span style='color:red'>Date must be after today</span>");
					setTimeout(function(){ 
						$("label[for='" + event.target.id + "']").html(current);
						event.target.disabled = false;
					}, 1500);
			}
				else{
					event.target.value = dateVal+"-"+monthVal+"-"+yearVal;
					if(validStatus==1){
						event.target.disabled = true;
					$("label[for='" + event.target.id + "']").html("<span style='color:red'>Invalid date</span>");
					setTimeout(function(){ 
						$("label[for='" + event.target.id + "']").html(current);
						event.target.disabled = false;
						event.target.value='';
					}, 1500);
					validStatus=0;
					}
				}
		}
		else{
			if(yearVal==currentYear && Number(monthVal)<=Number(currentMonth) && dateVal<(Number(currentDate)+f*1)){
				event.target.value = Number(currentDate+f*1).toString().padStart(2, '0')+"-"+currentMonth.toString().padStart(2, '0')+"-"+yearVal;
				event.target.disabled = true;
					$("label[for='" + event.target.id + "']").html("<span style='color:red'>Before minimum lead time</span>");
					setTimeout(function(){ 
						$("label[for='" + event.target.id + "']").html(current);
						event.target.disabled = false;
					}, 1500);
			}
				else{
					event.target.value = dateVal+"-"+monthVal+"-"+yearVal;
					if(validStatus==1){
						event.target.disabled = true;
					$("label[for='" + event.target.id + "']").html("<span style='color:red'>Invalid date</span>");
					setTimeout(function(){ 
						$("label[for='" + event.target.id + "']").html(current);
						event.target.disabled = false;
						event.target.value='';
					}, 1500);
					validStatus=0;
					}
				}
			}
			
		}
	else { // bad input
		event.target.disabled = true;
		$("label[for='" + event.target.id + "']").html("<span style='color:red'>Please use DD-MM-YYYY format</span>");
		setTimeout(function(){ 
			$("label[for='" + event.target.id + "']").html(current);
			event.target.disabled = false;
			event.target.value='';
		}, 1500);
	}
}
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function TogglePSLOptions(event){
	if(event.target.value=="PSL"){
		Show('labelsPSLOptionsDiv');
	}
	else{
		Hide('labelsPSLOptionsDiv');
		document.getElementById("labelPSLMaterial").selectedIndex = "0";
		document.getElementById("labelPSLFinish").selectedIndex = "0";
		document.getElementById("labelPSLLength").selectedIndex = "0";
	}
}

function TogglePSLSize(event){
	removeAll(labelPSLLength);
	switch (event.target.value){
		case "355ml Sleek":
			buildOptions(['5.437" x 7"'],"labelPSLLength");
		break;
		case "355ml STD":
			buildOptions(['3.5" x 7.5"','3.5" x 8"'],"labelPSLLength");
		break;
		case "473ml STD":
			buildOptions(['5" x 7.5"','5" x 8"'],"labelPSLLength");
		break;
		case "250ml Slim":
			buildOptions(['4.4375" x 6.5"'],"labelPSLLength");
		break;
	}
}
function addNewSku(){
	document.getElementById("wf-form-warehouseForm").reset();
	document.getElementById("wf-form-mobileCanningForm").reset();
	document.getElementById("wf-form-labelOrderForm").reset();
	Hide('uploadLabel');
	Hide('labelSubmitButton');
	initStatus();
	ToggleDisplay('resultDiv');
	showServiceForm();
	ToggleDisplay('resetRow');
	for(var i = 6; i>1; i-=1){
		deleteRow();
	}
}

function ToggleSleeveQTY(event){
	var za = document.getElementById('whIncising');
	var zb = document.getElementById('whEndCount');
	if(za.value.match(/200/g)>=1){
		zb.placeholder = "600 per sleeve/manchon";
	}
	else if(za.disabled == false){
		zb.placeholder = "580 per sleeve/manchon";
	}
}

function EndsCalc(event){
	var za = document.getElementById('whIncising');
	var zb = document.getElementById('whEndCount');
	var zc = document.getElementById('whEndCalc');
	if(za.value.match(/200/g)>=1){
		zc.value = zb.value*600;
	}
	else{
		zc.value = zb.value*580;
	}
}

function mcVolCalc(event){
	console.log(event);
	var row = event.target.id.match(/[0-9]/)[0];
	console.log(row);
	var layerCount = Number(event.target.value);
	console.log(layerCount);
	var canType = document.getElementById("mcSize"+row).value;
	var canVolume = Number(locations[a].warehouse.cans[canType].volume);
	var layerFactor = Number(locations[a].warehouse.cans[canType].layerFactor);
	console.log(layerFactor);
	var estVolume = layerCount*canVolume*layerFactor;
	document.getElementById("mcVol"+row).innerHTML = Math.round(estVolume);
	document.getElementById("hidden_mcVol"+row).value = Math.round(estVolume)/100;
}

function swapLanguage(event){


$( ".english" ).toggleClass("hidden")
$( ".french" ).toggleClass("hidden")
}

// apply email validation to the copacker email field
var coPackEmail = document.getElementById('whCopackEmail');
coPackEmail.addEventListener('input', ValidateEmail);