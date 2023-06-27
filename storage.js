//time functions to test for execution duration
var time = Date.now();
console.log("start time");
console.log(time);

//array of global variables to track the location, service and other details when moving from 1 screen to the next, or when moving through the breadcrumb
//these are done with shorthand to help against Webflow's length limit
var a; //location province
var b; //service
var f; //calculated lead time offset (numeric based on selected service)
var alertStatus; //null or 1 based on the valdiation function
var g = "eng"; //language selector

let boost; //the number of days added on for all-in-one options

//Pair of functions to mass add on-click or change conditions to buttons or fields
//Both work with 2 or 3 variables passed to them [target],[function],[function arguments]. Function arguments are optional and only required if the function expects them
function setOnClick(target,func,arg=''){
	console.log(target);
	document.getElementById(target).addEventListener("click", function(){window[func](arg)});
}

function setOnChange(target,func,arg=''){
	console.log(target);
	document.getElementById(target).addEventListener("change", function(){window[func](arg)});
}

//primary startup function when the page is first loaded. Adds onClick and onChange functionality 
window.onload = function(e){
	styleManualRequest();
	var clickArray = [
		['updateButton','initLocation',''],
		['languageButton','swapLanguage',''],
		['locationVAN','locationSelect','VAN'],
		['locationCGY','locationSelect','CGY'],
		['locationMISS','locationSelect','MISS'],
        ['serviceButtonIN','serviceSelect','inbound'],
		['serviceButtonOUT','serviceSelect','outbound'],
		['companySubmitButton','companyInfoValidate','wf-form-companyInfo'],
		['formAlertButton','ToggleDisplay','formAlertWrapper'],
		['suppliesButton','ToggleDisplay','whSupplies'],
		['whSubmitButton','formValidateSubmit','wf-form-warehouseForm'],
		['mcDelBrandButton','deleteRow',''],
		['home','ToggleBreadCrumb','a'],
		['homeFr','ToggleBreadCrumb','a'],
		['locationTitle','ToggleBreadCrumb','b'],
		['locationTitleFr','ToggleBreadCrumb','b'],
		['serviceTitle','ToggleBreadCrumb','c'],
		['serviceTitleFr','ToggleBreadCrumb','c'],
		['labelServiceTitle','ToggleBreadCrumb','d'],
		['labelServiceTitleFr','ToggleBreadCrumb','d'],
		['subServiceTitle','ToggleBreadCrumb','d'],
		['subServiceTitleFr','ToggleBreadCrumb','d'],
		['repEmail','ToggleFTLBlankContactForm',''],
		['manualButton','ToggleDisplay2','manualOrderPopup'],
    ['closeCustomButton','ToggleDisplay2','manualOrderPopup'],
    ['customOrderButton','ManualRequest','']		
	];

	var changeArray = [
		['whCanSize','addCanStats',''],
		['whCanSize','ToggleInput','whPalletFormat'],
		['whCanSize','buildOptionsPallets','whPalletFormat'],
		['whCanSize','ToggleInput','labelPSLLength'],
		// ['whCanSize','buildLabelSizes',''],
		['whPalletFormat','whUpdateLayerQty',''],
		['whPalletFormat','ToggleInput','whPalletCount'],
		['whPalletFormat','ToggleInput','whLayerCount'],
		['whLayerCount','whUpdatePalletQty',''],
		['whPalletCount','whUpdateLayerQty',''],
		['whIncising','ToggleInput','whEndCount'],
		['whIncising','ToggleSleeveQTY',''],
		['whIncising','EndsCalc',''],
		['whEndCount','EndsCalc',''],
	];
	//Calls to the above helper functions
	clickArray.forEach(function(val,ind){
		try{setOnClick(clickArray[ind][0],clickArray[ind][1],clickArray[ind][2]);}
		catch(err){console.log(err)}
	});

	changeArray.forEach(function(val,ind){
		try{setOnChange(changeArray[ind][0],changeArray[ind][1],changeArray[ind][2]);}
		catch(err){console.log(err)}
	});

	//these on-change listeners need to pass the [event] argument which can't be done using the above onCilck/onChange helper functions
	document.getElementById('warehouseTC').addEventListener("click",function(){toggleTC(event)});
	document.getElementById('formAlertWrapper').setAttribute("style","z-index:9999");
	console.log(Number(Date.now()-time));

	//functions to switch the form from loading mode, to running mode
	Show('updateButton');
	Hide('loadingTag');
	  setTimeout(function(){ fadeIn('updateButton');}, 100);

	//the validation script is added to each of the order forms.
	addValidation('wf-form-companyInfo');
	addValidation('wf-form-warehouseForm');
	initStatus(); //calls the form initialization function which resets the forms to their defaults. Also used when adding a new product, or changing location.
}

// Select the target element
const whCanCountElement = document.getElementById('whCanCount');

// Create a new MutationObserver
const observer = new MutationObserver(function (mutationsList) {
	for (let mutation of mutationsList) {
	  if (mutation.type === 'childList' || mutation.type === 'characterData') {
		const canQty = parseInt(whCanCountElement.textContent);
		boost = ai1_leadtime_boost(canQty);
  
		// Update the minimum dates with the new boost value
		GetMinDate(e);
	  }
	}
  });

// Configuration options for the observer
const observerConfig = {
  childList: true,
  characterData: true,
  subtree: true,
};

// Start observing the target element
observer.observe(whCanCountElement, observerConfig);


//adds leadtime if allInOne - new art = 5 -- digital = 5 -- flexo = 15
const ai1_leadtime_boost = (canQty) => {
    return (canQty > 15000 ? 15 : 5) + (c === 'new' ? 5 : 0);
  };

//resets the order forms with the exception of the company information form
//disables some fields and resets values for input fields
function initStatus(){
	console.log("initStatus started");
	console.log(Number(Date.now()-time));
	try{document.getElementById("wf-form-mobileCanningForm").reset();
		document.getElementById("wf-form-warehouseForm").reset();}
	catch(err){} 
	var disableArray=[
                    // "whPalletFormat",
					// "whEndCount",
					// "whPakTechCount",
					// "whTrayCount",
					// "whPalletCount",
					// "whLayerCount",
					// "whEndCalc",
					// "labelPSLLength"
                ];

	disableArray.forEach(function(val,ind){
		document.getElementById(disableArray[ind]).disabled = true;
		});				
	console.log(Number(Date.now()-time));
	console.log("initStatus finished");
}

//Reset location field. The other half of the restarting or resetting form function. Hides, and shows fields based on their initial settings rather than visibility settings 
//based on user actions or choices
function resetLocation(){
	Show('locationSelection');
	Show('whCanQtyFormatDiv');
	Show('whShipping');
	Show('brandNameDiv');
	Show('suppliesButtonDiv');
	fadeOut('serviceSelectionWrap');
	fadeOut('companyInfoWrap');
	fadeOut('labelTypeWrap');
	fadeOut('labelOrderTypeWrap');
	fadeOut('labelPrintTypeWrap');
	fadeOut('warehouseWrap');
	fadeOut('resetRow');
	fadeOut('manualButton');
	setTimeout(function(){ fadeIn('locationSelection') }, 300);
	setTimeout(function(){ Hide('serviceSelectionWrap');
						   Hide('companyInfoWrap');
						   Hide('labelTypeWrap');
						   Hide('labelOrderTypeWrap');
						   Hide('labelPrintTypeWrap');
						   Hide('warehouseWrap');
						   Hide('resetRow');
						   Hide('manualButton');
               Hide('manualwhSubmitButton');
						    }, 300);
	Hide('whSupplies');
	Hide('resultDiv');
	Hide('eoNumberDiv');
	Hide('changesDiv');
	Hide('numberOfLabels');
	fadeOut('whSupplies');
	fadeOut('resultDiv');
	document.getElementById('whCanCount').innerHTML="";
	try{
		document.getElementById('serviceTitle').innerHTML = "";
		document.getElementById('labelServiceTitle').innerHTML = "";
		document.getElementById('subServiceTitle').innerHTML = "";
		document.getElementById('serviceTitleFr').innerHTML = "";
		document.getElementById('labelServiceTitleFr').innerHTML = "";
		document.getElementById('subServiceTitleFr').innerHTML = "";
		}
	catch(err){};
  	document.getElementById('warehouseTC').checked = false;
	document.getElementById('mcTC').checked = false;
	document.getElementById('mcWildYeast').checked = false;
	document.getElementById('warehouseTC').value = "";
	document.getElementById('mcTC').value = "";
	document.getElementById('mcWildYeast').value = "";
	$('.w-checkbox-input').removeClass('w--redirected-checked');
}

//annoying helper function to check if a checkbox in Webflow is actually checked or not. Webflow doesn't use proper checkboxes so normal checks don't work reliably.
function toggleTC(event){
	console.log(event.target.id);
	if(event.target.value=="true"){
		event.target.value ='';
		event.target.checked = false;
	}
	else{
		event.target.value="true";
		event.target.checked = true;
	}
}

//Breadcrumb function. This works by moving the order process back to the start without resetting the forms, and then using the global variables to rapidly rebuild where the user left off
//Cases A-D refer to which block of the crumb someon clicks on
//	A returns to location selection
//	B returns to service selection
// 	C resets the service sub selection
//	D returns to the label order type selection menu
function ToggleBreadCrumb(crumb){
	switch(crumb){
		case 'a' :
			resetLocation();
		break;
		case 'b' :
			resetLocation();
			setTimeout(function(){
				locationSelect(a);
				companyInfoValidate('wf-form-companyInfo');
				}, 300);
		break;
		case 'c' :
			resetLocation();
			setTimeout(function(){
				locationSelect(a);
				serviceSelect(b);
				}, 300);

		break;
		case 'd' :
			resetLocation();
			setTimeout(function(){
				locationSelect(a);
				serviceSelect(b);
				}, 300);
		break;
	}

}

//This block largely controls the service selection workflow starting from selecting the location
function locationSelect(province){
	a=province;
	document.getElementById('uploadOfficeLocation').value=a;
	fadeOut('locationSelection');
	setTimeout(function(){ Hide('locationSelection');
		}, 300);
	Show('companyInfoWrap'); //show the company info form. Company info details are further down and include email validation
	Show('resetRow'); 		 //show the breadcrumb block
	setTimeout(function(){ 
		fadeIn('companyInfoWrap');
		fadeIn('resetRow');		}, 300);

  document.getElementById('locationTitle').innerHTML = locations[a].name;
  document.getElementById('locationTitleFr').innerHTML = locations[a].name;

  //clears and rebulds the can size formats to ensure there are no carry over from an earlier order
  //resets the terms and conditions checkboxes
	try{removeAll(whCanSize);}
	catch(err){}
	buildOptions(locations[a].warehouse.canFormats,'whCanSize');
	document.getElementById('warehouseTC').value="";
}

//initial service selection script
function serviceSelect(service){
	b=service;

	var za = document.getElementById('serviceTitle');
	var zaFr = document.getElementById('serviceTitleFr');
	//Sets the breadcrumb text based on selection. French language support might be unneccesary
	if(b=='inbound'){
		za.innerHTML = "> Store My Cans";
		zaFr.innerHTML = "> Stocker Mes Canettes";}
	if(b=='outbound'){
		za.innerHTML = "> Pull my Cans";
		zaFr.innerHTML = "> Tire mes canettes";
	}
	showServiceForm();
}

//called by the serviceSelect function
function showServiceForm(){
	//takes the company information and copies it to hidden fields that are sent to zapier
	copyCompanyInfo(b); 		
	//get lead times based on the service selection
		if(b == "supplies" || b == "inbound" || b == "outbound"){
		GetMinDate('warehouse');
	}
	else{GetMinDate(b);}
	fadeOut('serviceSelectionWrap');
	setTimeout(function(){ Hide('serviceSelectionWrap') }, 300);

	fadeOut('companyInfoWrap');
	setTimeout(function(){ 
		Hide('companyInfoWrap');
		 }, 300);
	var zb = locations[a].warehouse;

	//branching logic based on if someone selects warehouse orders, or supplies only
	//
	if(b=="warehouse" || b=="supplies"){
		Hide('labelToggleUploadDiv');
		Hide('brandNameDiv');
		Hide('labelToggleUpload');
		Show('whSubmitButton');
		document.getElementById('wf-form-warehouseForm').action = "https://hooks.zapier.com/hooks/catch/4099777/b7qj5jw,b7lymnu/silent/";
		document.getElementById('whTrayCount').value="";
		document.getElementById('whTrayCount').max = zb.tray.max;
		$("label[for='whTrayCount']").html(zb.tray.format+' ('+zb.tray.units+')*');

		if(b=="inbound"){
			e="Blank Cans";
			Show('whCanFormatDiv');
			Show('whCanQtyFormatDiv');
		}
		else{
			e="outbound";
			Hide('whCanFormatDiv');
			Hide('whCanQtyFormatDiv');
			ToggleDisplay('whSupplies');
		}
		Show('warehouseWrap');
		Show('manualButton');
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
			fadeIn('manualButton');
		},300);

	}
}


//Helper function to build the select field options based on the JSON settings for each location
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

//Helper function to build the pallet format options 
//This works a little differently as the visibile text uses Eng/Fr support and includes the layer count in the customer facing select box
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

//Helper function to remove all options from a select box
function removeAll(target) {
    while (target.options.length > 0) {
        target.remove(0);
    }
}

//Onclick function to enable/disable the incising field
//Allows incising selection for mobile canning for Mississauga only
function ToggleIncising(){
	if(document.getElementById('mcEndsProvided').value == 'true'){
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



//Sets the minimum, and maximum layer quantities based on can size
function addCanStats(){
	var za = document.getElementById('whCanSize').value;
	var zb = document.getElementById('whLayerCount');
	zb.min = Number(locations[a].warehouse.cans[za].labelType[e].min);
	zb.max = Number(locations[a].warehouse.cans[za].labelType[e].max);

}

//Function to calculate pallet quantity based on can size and layer count
//Works in tandem with the below function to allow a user to adjust pallets or layers
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
	if(e == "Blank Cans" || e == "Printed"){
		whUpdateLayerQty();}
}

//Function to calculate layer quantity based on can size and pallet count
//Works in tandem with the above function to allow a user to adjust pallets or layers
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

//Helper function to check if a field or object is visible or not
function isVisible(e) {
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

//Form validator function
//Called by the formValidateSubmit function
//Checks each field on a form to see if the field is visible -> required -> disabled -> has a value that isn't null -> and if it's a checkbox
//Returns alertStatus =1, and procs the alert popup
function formValidator(target){
	var za = document.getElementById(target);
	var fields = document[za.name].elements;
	alertStatus = 0;
	for(var i=0;i<fields.length;i++){
		if(isVisible(fields[i])== true){
			if(fields[i].required == true){
				if(fields[i].disabled== false){
					if(fields[i].value==""){
						if(fields[i].type == "checkbox"){
							if(fields[i].checked == false){
								alertStatus=1;
								}
							}
						alertStatus=1;
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
		var aa = document.getElementById("formAlertWrapper");
		aa.style.position = 'fixed';
		aa.style.width = '100%';
		aa.style.height = '100%';
		ToggleDisplay("formAlertWrapper");
	}
	return false;
}

//helper function to handle the company info validation
//Calls the form validator and the email validation script
function companyInfoValidate(target){
	formValidator(target);
	ValidateFormEmail('contactEmail');
	if(alertStatus == 0){
		fadeOut('companyInfoWrap');
		setTimeout(function(){ Hide('companyInfoWrap') }, 300);
        console.log("It worked here");
		Show('serviceSelectionWrap');
		setTimeout(function(){ fadeIn('serviceSelectionWrap');}, 300);
	}
		return false;
}

//Function that is tied to the submit or next button on a form
//Calls the form validator and if it passes, allows the user to submit or move on
function formValidateSubmit(target){
	formValidator(target);
	if(alertStatus == 0){
		formSubmit(target);}
	return false;	
}


//
function initLocation(){
	console.log('init location');
	ToggleDisplay('updateDivWarapper');
	ToggleDisplay('locationSelection');
	Hide('leadDiv_VAN');
	Hide('leadDiv_CGY');
	Hide('leadDiv_MISS');
	$( ".french" ).toggleClass("hidden");
}

//Copies the company info to hidden fields on the warehouse and mobile canning forms so that it can be submitted smoothly with the order data
function copyCompanyInfo(service){
	var companyArray=["companyName","contactName","contactEmail","contactPhone"];
		companyArray.forEach(function(val,ind){
			if(document.getElementById(companyArray[ind]).value !=null){
				document.getElementById('upload'+companyArray[ind]).value = document.getElementById(companyArray[ind]).value;
			}
		});
		if(a=='CGY'){document.getElementById('uploadLocation').value='orders.calgary@vesselpackaging.com';}
		if(a=='VAN'){document.getElementById('uploadLocation').value='orders.vancouver@vesselpackaging.com';}
		if(a=='MISS'){document.getElementById('uploadLocation').value='orders.east@vesselpackaging.com';}
		document.getElementById('uploadOrderDate').value = new Date().toLocaleDateString('en-UK');
}

//Adds basic validation to fields based on their min/max values and checks the values on change to see if they are valid or not
//Validation is added to all fields and uses the minMaxValidate function
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
			try{//elements[i].setAttribute("onkeydown", "return false");
			elements[i].addEventListener("change",function(){ValidateDate(event)});
			elements[i].maxlength = '10';}
			catch(err){}
		}
	}
}

//Handy helper function that toggles a field from enabled to disabled and back if a select field is switched to yes
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

//Helper function to toggle the visibility and opacity of an object based on whether it contains the hide or show class
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
//Helper function to toggle the submitting or form information and hiding the associated forms, then showing the result div
function formSubmit(target){
	Hide('mobileCanningWrap');
	Hide('warehouseWrap');
	Hide('resetRow');
	setTimeout(function(){ 
		fadeOut('mobileCanningWrap');
		fadeOut('warehouseWrap');
		fadeOut('resetRow');
	},300);

	setTimeout(function(){
		document.getElementById(target).submit();
		ToggleDisplay('resultDiv');
	},500);
}

//Helper function to calculate the time horizon for orders based on the service and location
//Sets the minimum time of the date picker
function GetMinDate(service) {
	const getLeadTime = (elementId, index) => {
	  const leadTimeMatch = document.getElementById(elementId).innerHTML.match(/(\d+)/g);
	  return leadTimeMatch ? Number(leadTimeMatch[index]) : 0;
	};
  
	let leadtime;
	switch (service) {
	  case 'warehouse':
		leadtime = getLeadTime('leadTime_warehouse_' + a, 0);
		break;
	  case 'PSL':
		leadtime = getLeadTime('leadTime_labels_' + a, 0) + ((c === 'new' || c === 'reorder') ? boost : 0);
		break;
	  case 'Shrink Sleeve':
		leadtime = getLeadTime('leadTime_labels_' + a, 2) + ((c === 'new' || c === 'reorder') ? boost : 0);
		break;
	  case 'Printed':
		leadtime = getLeadTime('leadTime_warehouse_' + a, 1);
		break;
	  case 'mobileCanning':
		leadtime = getLeadTime('leadTime_mobileCanning_' + a, 0);
		break;
	  default:
		leadtime = 0;
		break;
	}
	f = leadtime;
	console.log(f);
	$("#mcDate").datepicker("option", "minDate", leadtime);
	$("#whShippingDate").datepicker("option", "minDate", leadtime);
  }
  

//Validation helper function
//Checks the entered or updated value of a field against its min/max value and if it is outside the accepted range, overwrites the label with a warning before resetting the field value
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

//Separate email validation script cause emails are hard and annoying to validate
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

//Similar to the proper validate email field, however doesn't do the active alert
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

//Very complicated function to validate a date. This is anonying long and complicated due to the variations in how web browsers and operating systems handle date time
//A lot of this functionality is in-case Safari users manually enter a date into the date selection field. For some reason their browser doesn't allow disabled fields?
//Operates like the date selector, but will throw an error if the date is before the minimum time horizon, or if someone enters a date in a stupid or american format
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

//helper function for the above nightmare
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

//Helper function to handle a user selecting to add a new order. Calls the functions to reset the form back to the service selection screen
function addNewOrder(){
	for(var i = 6; i>1; i-=1){
		deleteRow();
	}
	resetLocation();
	initStatus();
	Show('resetRow');
	setTimeout(function(){
		locationSelect(a);

		companyInfoValidate('wf-form-companyInfo');
		fadeIn('resetRow');
	}, 300);

}

//Function to toggle the placeholder text of Lids based on the incising selection
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

//Function to calculate and display the total number of lids
function EndsCalc(){
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

//Helper function to calculate the total estimated mobile canning volume
function mcVolCalc(event){
	console.log(event.target.id);
	var row = event.target.id.match(/[0-9]/)[0];
	var layerCount = Number(document.getElementById("mcLayers"+row).value);
	var canType = document.getElementById("mcSize"+row).value;
	var canVolume = Number(locations[a].warehouse.cans[canType].volume);
	var layerFactor = Number(locations[a].warehouse.cans[canType].layerFactor);
	var estVolume = layerCount*canVolume*layerFactor;
	document.getElementById("mcVol"+row).innerHTML = Math.round(estVolume/10)/10;
	document.getElementById("hidden_mcVol"+row).value = Math.round(estVolume)/100;
}

//Unused language toggle function to switch the visibility of english and french tagged objects
function swapLanguage(event){
$( ".english" ).toggleClass("hidden");
$( ".french" ).toggleClass("hidden");
}

//Helper function to allow manual requests
//Disables form validation and instructs the user to complete as much details as possible
//Changes the zapier webhook as well
function ManualRequest(){
	ToggleDisplay2('manualOrderPopup');
  Hide('manualButton');
	var za = document.getElementById('whComments');
	za.scrollIntoView({ behavior: "smooth", block: "center"});
  Show('manualwhSubmitButton');
  Hide('whSubmitButton');
	setOnClick('manualwhSubmitButton','formSubmit','wf-form-warehouseForm');
  document.getElementById('wf-form-warehouseForm').action = 'https://hooks.zapier.com/hooks/catch/4099777/332scho/silent/';
}
function styleManualRequest(){
  var zb = document.getElementById('manualOrderPopup');
	zb.style.position = "fixed";
  zb.style.top = "0";
  zb.style.background = "#231f20";
  zb.style.width = "100%";
  zb.style.height = "100%";}