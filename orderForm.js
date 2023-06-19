//time functions to test for execution duration
const time = Date.now();
console.log("start time");
console.log(time);

//array of global variables to track the location, service and other details when moving from 1 screen to the next, or when moving through the breadcrumb
//these are done with shorthand to help against Webflow's length limit
let a; //location province
let b; //service
let bb; //legacy variable
let c; //label order type (new, reorder, update)
let d=1; //mobile canning product counter. Starts at 1, and goes to 6.
let e; //label type (PSL or Shrink Sleeve)
let f; //calculated lead time offset (numeric based on selected service)
let alertStatus; //null or 1 based on the valdiation function
let g = "eng"; //language selector
let h = ''; //legacy ordering selector (if blank, then new system)

//Pair of functions to mass add on-click or change conditions to buttons or fields
//Both work with 2 or 3 variables passed to them [target],[function],[function arguments]. Function arguments are optional and only required if the function expects them
const setOnClick = (target, func, arg='') => {
    console.log(target);
    document.getElementById(target).addEventListener("click", () => window[func](arg));
};

const setOnChange = (target, func, arg='') => {
    console.log(target);
    document.getElementById(target).addEventListener("change", () => window[func](arg));
};


// Primary startup function when the page is first loaded. Adds onClick and onChange functionality
window.onload = (e) => {
	styleManualRequest();
	const clickArray = [
	  ['updateButton', 'initLocation', ''],
	  ['languageButton', 'swapLanguage', ''],
	  ['locationVAN', 'locationSelect', 'VAN'],
	  ['locationCGY', 'locationSelect', 'CGY'],
	  ['locationMISS', 'locationSelect', 'MISS'],
	  ['serviceButtonAIO', 'serviceSelect', 'allInOne'],
	  ['serviceButtonLB', 'serviceSelect', 'labels'],
	  ['serviceButtonLA', 'serviceSelect', 'application'],
	  ['serviceButtonWH', 'serviceSelect', 'warehouse'],
	  ['serviceButtonSP', 'serviceSelect', 'supplies'],
	  ['serviceButtonMC', 'serviceSelect', 'mobileCanning'],
	  ['companySubmitButton', 'companyInfoValidate', 'wf-form-companyInfo'],
	  ['formAlertButton', 'ToggleDisplay', 'formAlertWrapper'],
	  ['suppliesButton', 'ToggleDisplay', 'whSupplies'],
	  ['whSubmitButton', 'formValidateSubmit', 'wf-form-warehouseForm'],
	  ['mcAddBrandButton', 'addMcBrand', ''],
	  ['mcDelBrandButton', 'deleteRow', ''],
	  ['mcSubmitButton', 'mcFormValidateSubmit', 'wf-form-mobileCanningForm'],
	  ['newOrderButton', 'addNewOrder', ''],
	  ['newSkuButton', 'addNewSku', ''],
	  ['labelOrderButtonPSL', 'labelOrderType', 'PSL'],
	  ['labelOrderButtonSS', 'labelOrderType', 'Shrink Sleeve'],
	  ['labelOrderButtonPSLLegacy', 'LegacyOrder', 'PSL'],
	  ['labelOrderButtonSSLegacy', 'LegacyOrder', 'Shrink Sleeve'],
	  ['labelsOnlyOrderButtonSS', 'labelOrderType', 'SS Label'],
	  ['labelsOnlyOrderButtonPSL', 'labelOrderType', 'PSL Label'],
	  ['labelOrderButtonExisting', 'labelOrder', 'reorder'],
	  ['labelOrderButtonNew', 'labelOrder', 'new'],
	  //['labelOrderButtonArtwork','labelOrder','artwork'],
	  ['labelOrderDigital', 'printType', 'digital'],
	  ['labelOrderFlexo', 'printType', 'flexo'],
	  ['labelToggleUpload', 'labelUploadTrigger', ''],
	  ['home', 'ToggleBreadCrumb', 'a'],
	  ['homeFr', 'ToggleBreadCrumb', 'a'],
	  ['locationTitle', 'ToggleBreadCrumb', 'b'],
	  ['locationTitleFr', 'ToggleBreadCrumb', 'b'],
	  ['serviceTitle', 'ToggleBreadCrumb', 'c'],
	  ['serviceTitleFr', 'ToggleBreadCrumb', 'c'],
	  ['labelServiceTitle', 'ToggleBreadCrumb', 'd'],
	  ['labelServiceTitleFr', 'ToggleBreadCrumb', 'd'],
	  ['subServiceTitle', 'ToggleBreadCrumb', 'd'],
	  ['subServiceTitleFr', 'ToggleBreadCrumb', 'd'],
	  ['repEmail', 'ToggleFTLBlankContactForm', ''],
	  ['manualButton', 'ToggleDisplay2', 'manualOrderPopup'],
	  ['closeCustomButton', 'ToggleDisplay2', 'manualOrderPopup'],
	  ['customOrderButton', 'ManualRequest', '']
	];
  
	const changeArray = [
	  ['whCanSize', 'addCanStats', ''],
	  ['whCanSize', 'ToggleInput', 'whPalletFormat'],
	  ['whCanSize', 'buildOptionsPallets', 'whPalletFormat'],
	  ['whCanSize', 'ToggleInput', 'labelPSLLength'],
	  ['whCanSize', 'buildLabelSizes', ''],
	  ['whPalletFormat', 'whUpdateLayerQty', ''],
	  ['whPalletFormat', 'ToggleInput', 'whPalletCount'],
	  ['whPalletFormat', 'ToggleInput', 'whLayerCount'],
	  ['whLayerCount', 'whUpdatePalletQty', ''],
	  ['whPalletCount', 'whUpdateLayerQty', ''],
	  ['whIncising', 'ToggleInput', 'whEndCount'],
	  ['whIncising', 'ToggleSleeveQTY', ''],
	  ['whIncising', 'EndsCalc', ''],
	  ['whEndCount', 'EndsCalc', ''],
	  ['whPakTech', 'ToggleInput', 'whPakTechCount'],
	  ['whTray', 'ToggleInput', 'whTrayCount'],
	  ['mcTray', 'ToggleInput', 'mcTrayType'],
	  ['mcPakTech', 'ToggleInput', 'mcPakTechType'],
	  ['mcPakTech', 'ToggleInput', 'mcPaktechBoxes'],
	  ['mcEndsProvided', 'ToggleIncising', ''],
	  ['mcLabelsInStock', 'ToggleInputRev', 'mcLabelSupplier'],
	  ['mcLabelsInStock', 'ToggleInputRev', 'mcLabelArrive']
	];
  
	// Calls to the above helper functions
	clickArray.forEach(([elementId, funcName, param]) => {
	  try {
		setOnClick(elementId, funcName, param);
	  } catch (err) {
		console.log(err);
	  }
	});
  
	changeArray.forEach(([elementId, funcName, param]) => {
	  try {
		setOnChange(elementId, funcName, param);
	  } catch (err) {
		console.log(err);
	  }
	});
  
	// These onChange listeners need to pass the [event] argument which can't be done using the above setOnClick/setOnChange helper functions
	document.getElementById('mcLayers1').addEventListener("change", (event) => {
	  mcVolCalc(event);
	});
	document.getElementById('mcSize1').addEventListener("change", (event) => {
	  mcVolCalc(event);
	});
	document.getElementById('mcLayers1').addEventListener("change", (event) => {
	  minMaxValidate(event);
	});
	document.getElementById('warehouseTC').addEventListener("click", (event) => {
	  toggleTC(event);
	});
	document.getElementById('mcTC').addEventListener("click", (event) => {
	  toggleTC(event);
	});
	document.getElementById('mcWildYeast').addEventListener("click", (event) => {
	  toggleTC(event);
	});
  
	document.getElementById('formAlertWrapper').setAttribute("style", "z-index:9999");
	console.log(Number(Date.now() - time));
  
	// Functions to switch the form from loading mode to running mode
	Show('updateButton');
	Hide('loadingTag');
	setTimeout(() => {
	  fadeIn('updateButton');
	}, 100);
  
	// The validation script is added to each of the order forms.
	addValidation('wf-form-companyInfo');
	addValidation('wf-form-warehouseForm');
	addValidation('wf-form-mobileCanningForm');
	initStatus(); // Calls the form initialization function which resets the forms to their defaults. Also used when adding a new product or changing location.
  }
  
  // Resets the order forms with the exception of the company information form
  // Disables some fields and resets values for input fields
  function initStatus() {
	console.log("initStatus started");
	console.log(Number(Date.now() - time));
	try {
	  document.getElementById("wf-form-mobileCanningForm").reset();
	  document.getElementById("wf-form-warehouseForm").reset();
	} catch (err) {}
	const disableArray = [
	  "whPalletFormat",
	  "whEndCount",
	  "whPakTechCount",
	  "whTrayCount",
	  "whPalletCount",
	  "whLayerCount",
	  "whEndCalc",
	  "labelPSLLength",
	  "mcTrayType",
	  "mcPakTechType",
	  "mcPaktechBoxes",
	  "mcLabelSupplier",
	  "mcLabelArrive",
	  "mcIncising"
	];
  
	disableArray.forEach((elementId) => {
	  document.getElementById(elementId).disabled = true;
	});
	console.log(Number(Date.now() - time));
	console.log("initStatus finished");
  }
  

// Reset location field. The other half of the restarting or resetting form function. Hides, and shows fields based on their initial settings rather than visibility settings 
// based on user actions or choices
const resetLocation = () => {
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
	fadeOut('mobileCanningWrap');
	fadeOut('warehouseWrap');
	fadeOut('resetRow');
	fadeOut('manualButton');
	setTimeout(() => {
	  fadeIn('locationSelection');
	}, 300);
	setTimeout(() => {
	  Hide('serviceSelectionWrap');
	  Hide('companyInfoWrap');
	  Hide('labelTypeWrap');
	  Hide('labelOrderTypeWrap');
	  Hide('labelPrintTypeWrap');
	  Hide('mobileCanningWrap');
	  Hide('warehouseWrap');
	  Hide('resetRow');
	  Hide('manualButton');
	  Hide('manualwhSubmitButton');
	}, 300);
	Hide('whSupplies');
	Hide('resultDiv');
	Hide('uploadLabel');
	Hide('eoNumberDiv');
	Hide('changesDiv');
	Hide('labelsPSLOptionsDiv');
	fadeOut('whSupplies');
	fadeOut('resultDiv');
	document.getElementById('whCanCount').innerHTML = "";
	try {
	  document.getElementById('serviceTitle').innerHTML = "";
	  document.getElementById('labelServiceTitle').innerHTML = "";
	  document.getElementById('subServiceTitle').innerHTML = "";
	  document.getElementById('serviceTitleFr').innerHTML = "";
	  document.getElementById('labelServiceTitleFr').innerHTML = "";
	  document.getElementById('subServiceTitleFr').innerHTML = "";
	} catch (err) {}
	document.getElementById('warehouseTC').checked = false;
	document.getElementById('mcTC').checked = false;
	document.getElementById('mcWildYeast').checked = false;
	document.getElementById('warehouseTC').value = "";
	document.getElementById('mcTC').value = "";
	document.getElementById('mcWildYeast').value = "";
	$('.w-checkbox-input').removeClass('w--redirected-checked');
  };
  
  // Annoying helper function to check if a checkbox in Webflow is actually checked or not. Webflow doesn't use proper checkboxes, so normal checks don't work reliably.
  const toggleTC = (event) => {
	console.log(event.target.id);
	if (event.target.value == "true") {
	  event.target.value = '';
	  event.target.checked = false;
	} else {
	  event.target.value = "true";
	  event.target.checked = true;
	}
  };
  
  // Function that calls the general "Contact Us" form but updates some fields with the company information
  const toggleFTLBlankContactForm = () => {
	ToggleDisplay2('contactForm');
	document.getElementById('first_name_popup').value = document.getElementById('contactName').value;
	document.getElementById('email_popup').value = document.getElementById('contactEmail').value;
	document.getElementById('company_popup').value = document.getElementById('companyName').value;
	document.getElementById('phone_popup').value = document.getElementById('contactPhone').value;
	document.getElementById('blankCans-FTL').checked = true;
  };
  
  // Breadcrumb function. This works by moving the order process back to the start without resetting the forms, and then using the global variables to rapidly rebuild where the user left off
  // Cases A-D refer to which block of the crumb someone clicks on
  // A returns to location selection
  // B returns to service selection
  // C resets the service sub selection
  // D returns to the label order type selection menu
  const toggleBreadCrumb = (crumb) => {
	switch (crumb) {
	  case 'a':
		resetLocation();
		h = '';
		break;
	  case 'b':
		resetLocation();
		h = '';
		setTimeout(() => {
		  locationSelect(a);
		  companyInfoValidate('wf-form-companyInfo');
		}, 300);
		break;
	  case 'c':
		resetLocation();
		h = '';
		setTimeout(() => {
		  locationSelect(a);
		  serviceSelect(b);
		}, 300);
		break;
	  case 'd':
		resetLocation();
		setTimeout(() => {
		  locationSelect(a);
		  serviceSelect(b);
		  if (h !== '') {
			h = '';
		  } else {
			labelOrderType(e);
		  }
		}, 300);
		break;
	}
  };
  
// Function to toggle legacy ordering when selected
const legacyOrder = (type) => {
	h = 'Legacy';
	labelOrderType(type);
  };
  
  // This block largely controls the service selection workflow starting from selecting the location
  const locationSelect = (province) => {
	a = province;
	document.getElementById('uploadOfficeLocation').value = a;
	fadeOut('locationSelection');
	setTimeout(() => {
	  Hide('locationSelection');
	}, 300);
	Show('companyInfoWrap'); // Show the company info form. Company info details are further down and include email validation
	Show('resetRow'); // Show the breadcrumb block
	setTimeout(() => {
	  fadeIn('companyInfoWrap');
	  fadeIn('resetRow');
	}, 300);
  
	document.getElementById('locationTitle').innerHTML = locations[a].name;
	document.getElementById('locationTitleFr').innerHTML = locations[a].name;
  
	// Sets the lead times for the services. Takes data from the first page, and then moves it. This functionality might become deprecated
	document.getElementById('warehouseLeadTime').innerHTML = document.getElementById(`leadTime_warehouse_${a}`).innerHTML;
	document.getElementById('mobileCanningLeadTime').innerHTML = document.getElementById(`leadTime_mobileCanning_${a}`).innerHTML;
	document.getElementById('labelLeadTime').innerHTML = document.getElementById(`leadTime_labels_${a}`).innerHTML;
	document.getElementById('suppliesLeadTime').innerHTML = document.getElementById(`leadTime_warehouse_${a}`).innerHTML;
  
	// Clears and rebuilds the can size formats to ensure there are no carry over from an earlier order
	// Resets the terms and conditions checkboxes
	try {
	  removeAll(whCanSize);
	} catch (err) {}
	buildOptions(locations[a].warehouse.canFormats, 'whCanSize');
	document.getElementById('warehouseTC').value = "";
	document.getElementById('mcWildYeast').value = "";
	document.getElementById('mcTC').value = "";
  };
  
  // Initial service selection script
  const serviceSelect = (service) => {
	b = service;
	const za = document.getElementById('serviceTitle');
	const zaFr = document.getElementById('serviceTitleFr');
	// Sets the breadcrumb text based on selection. French language support might be unnecessary
	if (b == 'allInOne') {
	  za.innerHTML = "> Cans + Labels";
	  zaFr.innerHTML = "> Cannettes vierges";
	}
	if (b == 'labels') {
	  za.innerHTML = "> Label Order";
	  zaFr.innerHTML = "> Cannettes décorées";
	  h = "Legacy";
	}
	if (b == 'application') {
	  za.innerHTML = "> Label Application";
	  zaFr.innerHTML = "> Cannettes décorées";
	}
	if (b == 'warehouse') {
	  za.innerHTML = "> Blank cans";
	  zaFr.innerHTML = "> Cannettes vierges";
	}
	if (b == "supplies") {
	  za.innerHTML = "> Supplies Only";
	  zaFr.innerHTML = "> Supplies Seulement";
	}
	if (b == 'mobileCanning') {
	  za.innerHTML = "> Mobile canning";
	  zaFr.innerHTML = "> Mise en cannette mobile";
	}
	showServiceForm();
  };
  

  const showServiceForm = () => {
	copyCompanyInfo(b);
  
	if (b === "supplies") {
	  GetMinDate('warehouse');
	} else {
	  GetMinDate(b);
	}
  
	fadeOut('serviceSelectionWrap');
	setTimeout(() => {
	  Hide('serviceSelectionWrap');
	}, 300);
  
	fadeOut('companyInfoWrap');
	setTimeout(() => {
	  Hide('companyInfoWrap');
	}, 300);
  
	const za = locations[a].mobileCanning;
	const zb = locations[a].warehouse;
  
	if (b === "mobileCanning") {
	  Show('mobileCanningWrap');
	  if (a === "MISS") {
		document.getElementById('mcIncising').disabled = false;
	  } else {
		document.getElementById('mcIncising').disabled = true;
	  }
  
	  setTimeout(() => {
		fadeIn('mobileCanningWrap');
		removeAll(mcSize1);
		removeAll(mcLabel1);
		removeAll(mcIncising);
		removeAll(mcTrayType);
		removeAll(mcPakTechType);
		buildOptions(za.canFormats, "mcSize1");
		buildOptions(za.labelTypes, "mcLabel1");
		buildOptions(zb.end.types, "mcIncising");
		buildOptions(za.trayTypes, "mcTrayType");
		buildOptions(za.paktechTypes, "mcPakTechType");
	  }, 300);
	}
  
	if (b === "warehouse" || b === "supplies") {
	  Hide('labelToggleUploadDiv');
	  Hide('brandNameDiv');
	  Hide('labelToggleUpload');
	  Show('whSubmitButton');
	  document.getElementById('wf-form-warehouseForm').action = "https://hooks.zapier.com/hooks/catch/4099777/b7qj5jw,b7lymnu/silent/";
	  document.getElementById('whTrayCount').value = "";
	  document.getElementById('whTrayCount').max = zb.tray.max;
	  $("label[for='whTrayCount']").html(zb.tray.format + ' (' + zb.tray.units + ')*');
  
	  if (b === "warehouse") {
		e = "Blank Cans";
		Show('whCanFormatDiv');
		Show('whCanQtyFormatDiv');
	  } else {
		e = "Supplies Only";
		Hide('whCanFormatDiv');
		Hide('whCanQtyFormatDiv');
		ToggleDisplay('whSupplies');
	  }
  
	  document.getElementById('uploadOrderType').value = e;
	  Show('warehouseWrap');
	  Show('manualButton');
  
	  setTimeout(() => {
		fadeIn('warehouseWrap');
		removeAll(whCanSize);
		removeAll(whIncising);
		removeAll(whTray);
		removeAll(whPakTech);
		buildOptions(zb.end.types, "whIncising");
		buildOptions(zb.tray.types, "whTray");
		buildOptions(zb.canFormats, "whCanSize");
		buildOptions(zb.paktechTypes, "whPakTech");
		fadeIn('manualButton');
	  }, 300);
	}
  
	if (b === "allInOne") {
	  Show('labelTypeWrap');
	  Show('allInOneLabels');
	  Hide('legacyLabels');
  
	  setTimeout(() => {
		fadeIn('labelTypeWrap');
		fadeIn('allInOneLabels');
		fadeOut('legacyLabels');
	  }, 300);
  
	  removeAll(whCanSize);
	  removeAll(whIncising);
	  removeAll(whTray);
	  removeAll(whPakTech);
	  buildOptions(zb.end.types, "whIncising");
	  buildOptions(zb.tray.types, "whTray");
	  buildOptions(zb.canFormats, "whCanSize");
	  buildOptions(zb.paktechTypes, "whPakTech");
	}
  
	if (b === "application") {
	  Show('labelTypeWrap');
	  Show('legacyLabels');
	  Hide('allInOneLabels');
  
	  setTimeout(() => {
		fadeIn('labelTypeWrap');
		fadeIn('legacyLabels');
		fadeOut('allInOneLabels');
	  }, 300);
  
	  removeAll(whCanSize);
	  removeAll(whIncising);
	  removeAll(whTray);
	  removeAll(whPakTech);
	  buildOptions(zb.end.types, "whIncising");
	  buildOptions(zb.tray.types, "whTray");
	  buildOptions(zb.canFormats, "whCanSize");
	  buildOptions(zb.paktechTypes, "whPakTech");
	}
  
	if (b === 'labels') {
	  Show('labelOrderTypeWrap');
  
	  setTimeout(() => {
		fadeIn('labelOrderTypeWrap');
	  }, 300);
	}
  };
  
// branching logic for decorated can orders
function labelOrderType(type) {
	let e = type;
	document.getElementById('uploadOrderType').value = e;
	GetMinDate(type);
	const za = document.getElementById('labelServiceTitle');
	const zaFr = document.getElementById('labelServiceTitleFr');
  
	fadeOut('labelTypeWrap');
	setTimeout(() => {
	  Hide('labelTypeWrap');
	}, 300);
	
	if (b == 'application') {
	  za.innerHTML = `> Legacy: ${e} application`;
	  zaFr.innerHTML = `> Legacy: ${e} application`;
	  document.getElementById('wf-form-warehouseForm').action = "https://hooks.zapier.com/hooks/catch/4099777/b7qj5jw,b7lymnu/silent/";
	  Hide('labelsPSLOptionsDiv');
	  Show('brandNameDiv');
	  Hide('labelToggleUploadDiv');
	  Show('warehouseWrap');
	  Show('manualButton');
	  setTimeout(() => {
		fadeIn('warehouseWrap');
		fadeIn('manualButton');
	  }, 300);
	} else {
	  if (e == 'PSL' || e == 'PSL Label') {
		Show('labelsPSLOptionsDiv');
		document.getElementById("labelPSLMaterial").selectedIndex = "0";
		document.getElementById("labelPSLFinish").selectedIndex = "0";
		za.innerHTML = " > PSL";
		zaFr.innerHTML = " > EAC";
	  }
	  if (e == 'Shrink Sleeve' || e == 'SS Label') {
		za.innerHTML = "> Shrink sleeves";
		zaFr.innerHTML = "> Manchons rétractables";
		Hide('labelsPSLOptionsDiv');
	  }
	  Show('labelOrderTypeWrap');
	  setTimeout(() => {
		fadeIn('labelOrderTypeWrap');
	  }, 300);
	  Show('brandNameDiv');
	}
  }
  
  // For non-legacy label orders only, allows the specification of a new SKU or updated SKU
  function labelOrder(type) {
	let c = type;
	document.getElementById('uploadLabelType').value = c;
	const za = document.getElementById('subServiceTitle');
	const zaFr = document.getElementById('subServiceTitleFr');
	document.getElementById('labelChanges').required = false;
  
	switch (type) {
	  case 'reorder':
		za.innerHTML = "> Existing SKU";
		zaFr.innerHTML = "> USG existante";
		Show('whCanQtyFormatDiv');
		Hide('changesDiv');
		Hide('uploadLabel');
		Show('whSubmitButton');
		Hide('labelToggleUploadDiv');
		document.getElementById('wf-form-warehouseForm').action = "https://hooks.zapier.com/hooks/catch/4099777/b7qj5jw,b7lymnu,3bugk51/silent/";
		break;
	  case 'new':
		za.innerHTML = "> New/updated SKU";
		zaFr.innerHTML = "> Nouvelle/mettre à jour USG";
		Show('whCanQtyFormatDiv');
		Show('changesDiv');
		Show('labelToggleUploadDiv');
		Hide('whSubmitButton');
		Hide('uploadLabel');
		document.getElementById('wf-form-warehouseForm').action = 'https://hooks.zapier.com/hooks/catch/4099777/b7qj5jw,b7lymnu,3bugk51/silent/';
		break;
	  case 'artwork':
		Hide('whShipping');
		za.innerHTML = "> Artwork submission";
		zaFr.innerHTML = "> Soumission des oeuvres";
		Show('labelToggleUploadDiv');
		Hide('whCanQtyFormatDiv');
		Hide('whSubmitButton');
		Hide('uploadLabel');
		Hide('suppliesButtonDiv');
		document.getElementById('wf-form-warehouseForm').action = 'https://hooks.zapier.com/hooks/catch/4099777/bhd4z3a/silent/';
		break;
	}
  
	document.getElementById('labelBrandName').value = '';
  
	fadeOut('labelOrderTypeWrap');
	setTimeout(() => {
	  Hide('labelOrderTypeWrap');
	}, 300);
  
	Show('warehouseWrap');
	Show('manualButton');
	setTimeout(() => {
	  fadeIn('warehouseWrap');
	  fadeIn('manualButton');
	}, 300);
  }
  
  // Helper function to build the select field options based on the JSON settings for each location
  function buildOptions(srcArray, target) {
	console.log("builOptions target: " + target);
	const za = document.createElement("option");
	za.value = "";
	za.innerHTML = "Please select / Sélectionner une";
	za.value = "";
	document.getElementById(target).appendChild(za);
	for (let i = 0; i < srcArray.length; i++) {
	  const za = document.createElement("option");
	  za.value = srcArray[i];
	  za.innerHTML = srcArray[i];
	  document.getElementById(target).appendChild(za);
	}
  }
  
  // Helper function to build the pallet format options
  // This works a little differently as the visible text uses Eng/Fr support and includes the layer count in the customer facing select box
  function buildOptionsPallets() {
	removeAll(whPalletFormat);
	const canSize = document.getElementById('whCanSize').value;
	const srcArray = locations[a].warehouse.cans[canSize].labelType[e].palletOptions;
  
	const za = document.createElement("option");
	za.value = "";
	za.innerHTML = "Please select / Sélectionner une";
	za.value = "";
	document.getElementById('whPalletFormat').appendChild(za);
	
	for (let i = 0; i < srcArray.length; i++) {
	  const za = document.createElement("option");
	  za.value = srcArray[i][1];
	  za.innerHTML = srcArray[i][0] + " (" + srcArray[i][1] + " layers/couches)";
	  document.getElementById('whPalletFormat').appendChild(za);
	}
	
	document.getElementById('whPalletCount').value = "";
	document.getElementById('whLayerCount').value = "";
	document.getElementById('whCanCount').innerHTML = "";
  }
  
//I can't readily recall why I have this sectioned out as a separate function. I think this was added after the fact, but we are using hardcoded PSL values now
const buildLabelSizes = () => {
	//removeAll(labelPSLLength);
	//const canSize = document.getElementById('whCanSize').value;
	//buildOptions(labelOptions['PSL'].labelSizes[canSize],'labelPSLLength');
  };
  
  //Helper function to remove all options from a select box
  const removeAll = (target) => {
	while (target.options.length > 0) {
	  target.remove(0);
	}
  };
  
  //Onclick function to enable/disable the incising field
  //Allows incising selection for mobile canning for Mississauga only
  const ToggleIncising = () => {
	if (document.getElementById('mcEndsProvided').value === 'true') {
	  if (a === 'MISS') {
		document.getElementById('mcIncising').disabled = false;
	  } else {
		document.getElementById('mcIncising').disabled = true;
	  }
	} else {
	  document.getElementById('mcIncising').disabled = true;
	}
  };
  
  //Sets the minimum, and maximum layer quantities based on can size
  const addCanStats = () => {
	const za = document.getElementById('whCanSize').value;
	const zb = document.getElementById('whLayerCount');
	zb.min = Number(locations[a].warehouse.cans[za].labelType[e].min);
	zb.max = Number(locations[a].warehouse.cans[za].labelType[e].max);
  };
  
  //Function to calculate pallet quantity based on can size and layer count
  //Works in tandem with the below function to allow a user to adjust pallets or layers
  const whUpdatePalletQty = () => {
	const zb = document.getElementById('whLayerCount');
	if (zb.value > Number(zb.max)) {
	  zb.value = zb.max;
	}
	document.getElementById('whPalletCount').value = Math.ceil(Number(zb.value) / Number(document.getElementById('whPalletFormat').value));
	const za = document.getElementById('whCanSize').value;
	const canFactor = Number(locations[a].warehouse.cans[za].layerFactor);
	const layerQty = document.getElementById('whPalletFormat').value;
	document.getElementById('whLabelCanCount').value = Number(zb.value) * canFactor;
	document.getElementById('whCanCount').innerHTML = Number(zb.value) * canFactor;
	if (e === 'Blank Cans' || e === 'Printed') {
	  whUpdateLayerQty();
	}
  };
  
  //Function to calculate layer quantity based on can size and pallet count
  //Works in tandem with the above function to allow a user to adjust pallets or layers
  const whUpdateLayerQty = () => {
	const zb = document.getElementById('whPalletCount');
	if (zb.value > Number(zb.max)) {
	  zb.value = zb.max;
	}
	document.getElementById('whLayerCount').value = Number(zb.value) * Number(document.getElementById('whPalletFormat').value);
	const za = document.getElementById('whCanSize').value;
	const canFactor = Number(locations[a].warehouse.cans[za].layerFactor);
	const layerQty = document.getElementById('whPalletFormat').value;
	document.getElementById('whLabelCanCount').value = Number(document.getElementById('whLayerCount').value) * canFactor;
	document.getElementById('whCanCount').innerHTML = Number(document.getElementById('whLayerCount').value) * canFactor;
  };
  
  //Helper function to check if a field or object is visible or not
  const isVisible = (e) => {
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  };
  
  //Form validator function
  //Called by the formValidateSubmit function
  //Checks each field on a form to see if the field is visible -> required -> disabled -> has a value that isn't null -> and if it's a checkbox
  //Returns alertStatus =1, and procs the alert popup
  const formValidator = (target) => {
	const za = document.getElementById(target);
	const fields = document[za.name].elements;
	let alertStatus = 0;
	for (let i = 0; i < fields.length; i++) {
	  if (isVisible(fields[i]) === true) {
		if (fields[i].required === true) {
		  if (fields[i].disabled === false) {
			if (fields[i].value === "") {
			  if (fields[i].type === "checkbox") {
				if (fields[i].checked === false) {
				  alertStatus = 1;
				}
			  }
			  alertStatus = 1;
			} else {
			}
		  } else {
		  }
		} else {
		}
	  } else {
	  }
	}
	if (alertStatus === 1) {
	  const aa = document.getElementById("formAlertWrapper");
	  aa.style.position = 'fixed';
	  aa.style.width = '100%';
	  aa.style.height = '100%';
	  ToggleDisplay("formAlertWrapper");
	}
	return false;
  };
  
//helper function to handle the company info validation
//Calls the form validator and the email validation script
const companyInfoValidate = (target) => {
  formValidator(target);
  ValidateFormEmail('contactEmail');
  if (alertStatus === 0) {
    fadeOut('companyInfoWrap');
    setTimeout(() => { Hide('companyInfoWrap') }, 300);
    Show('serviceSelectionWrap');
    setTimeout(() => { fadeIn('serviceSelectionWrap') }, 300);
  }
  return false;
};

//Function that is tied to the submit or next button on a form
//Calls the form validator and if it passes, allows the user to submit or move on
const formValidateSubmit = (target) => {
  formValidator(target);
  if (alertStatus === 0) {
    formSubmit(target);
  }
  return false;
};

//Function that is tied to the submit the mobile canning form
//Calls the form validator and if it passes, allows the user to submit or move on
//Calls the combine mobile canning brands function which mashes the separate beers and quantities into 1 string
const mcFormValidateSubmit = (target) => {
  combineMCBrands();
  setTimeout(() => {
    formValidateSubmit(target);
  }, 200);
};

//
const initLocation = () => {
  console.log('init location');
  ToggleDisplay('updateDivWarapper');
  ToggleDisplay('locationSelection');
  Hide('leadDiv_VAN');
  Hide('leadDiv_CGY');
  Hide('leadDiv_MISS');
  $(".french").toggleClass("hidden");
};

//Copies the company info to hidden fields on the warehouse and mobile canning forms so that it can be submitted smoothly with the order data
const copyCompanyInfo = (service) => {
  const companyArray = ["companyName", "contactName", "contactEmail", "contactPhone"];
  companyArray.forEach((val, ind) => {
    if (document.getElementById(companyArray[ind]).value != null) {
      document.getElementById('upload' + companyArray[ind]).value = document.getElementById(companyArray[ind]).value;
    }
  });
  if (a == 'CGY') { document.getElementById('uploadLocation').value = 'orders.calgary@vesselpackaging.com'; }
  if (a == 'VAN') { document.getElementById('uploadLocation').value = 'orders.vancouver@vesselpackaging.com'; }
  if (a == 'MISS') { document.getElementById('uploadLocation').value = 'orders.east@vesselpackaging.com'; }
  document.getElementById('uploadOrderDate').value = new Date().toLocaleDateString('en-UK');
};

//Adds basic validation to fields based on their min/max values and checks the values on change to see if they are valid or not
//Validation is added to all fields and uses the minMaxValidate function
const addValidation = (target) => {
  const elements = document.forms[document.getElementById(target).name].elements;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].tagName == "INPUT" && elements[i].type != "range" && elements[i].type == "number") {
      console.log(elements[i].id);
      elements[i].addEventListener("change", (event) => { minMaxValidate(event) });
    }
    if (elements[i].tagName == "INPUT" && elements[i].type == "email") {
      elements[i].addEventListener("change", (event) => { ValidateEmail(event) });
    }
    if (elements[i].classList.contains('datepicker') === true) {
      try {
        //elements[i].setAttribute("onkeydown", "return false");
        elements[i].addEventListener("change", (event) => { ValidateDate(event) });
        elements[i].maxlength = '10';
      }
      catch (err) { }
    }
  }
};

//Handy helper function that toggles a field from enabled to disabled and back if a select field is switched to yes
const ToggleInput = (field) => {
  if (event.target.value != "") {
    if (event.target.value != "no" && event.target.value != 'false') {
      document.getElementById(field).disabled = false;
    }
    else {
      document.getElementById(field).disabled = true;
    }
  }
  else {
    document.getElementById(field).disabled = true;
  }
};

// Handy helper function that toggles a field from enabled to disabled and back if a select field is switched to no
const ToggleInputRev = (field) => {
	if (event.target.value == "") {
	  document.getElementById(field).disabled = true;
	} else {
	  if (event.target.value == "no" || event.target.value == 'false') {
		document.getElementById(field).disabled = false;
	  } else {
		document.getElementById(field).disabled = true;
	  }
	}
  };
  
  // Functions to add and remove a product line from the mobile canning product list
  const addMcBrand = () => {
	if (d < 6) {
	  d += 1;
	  const za = document.getElementById('mcBrandsTable');
	  const zy = locations[a].mobileCanning;
  
	  // Brand column
	  const zc = document.createElement('input');
	  zc.id = `mcBrand${d}`;
	  zc.name = `mcBrand${d}`;
	  zc.minlength = "3";
	  zc.title = "Product or brand name";
	  zc.placeholder = "My biere";
	  zc.classList.add('text-field', 'w-input');
	  zc.required = true;
	  const zd = document.createElement('label');
	  zd.setAttribute("for", zc.id);
	  zd.innerHTML = "Product/Produit*";
	  zd.classList.add('field-label');
	  zd.id = `mcBrandLabel${d}`;
	  const zz = document.createElement("div");
	  zz.id = `${zc.id}div`;
	  zz.classList.add('table20p');
	  zz.appendChild(zd);
	  zz.appendChild(zc);
	  za.appendChild(zz);
  
	  // Label type
	  const zcLabel = document.createElement('select');
	  zcLabel.id = `mcLabel${d}`;
	  zcLabel.name = `mcLabel${d}`;
	  zcLabel.classList.add('text-field', 'w-select');
	  zcLabel.required = true;
	  const zdLabel = document.createElement('label');
	  zdLabel.setAttribute("for", zcLabel.id);
	  zdLabel.innerHTML = "Label/Étiquette*";
	  zdLabel.classList.add('field-label');
	  zdLabel.id = `mcLabelLabel${d}`;
	  const zzLabel = document.createElement("div");
	  zzLabel.id = `${zcLabel.id}div`;
	  zzLabel.classList.add('table20p');
	  zzLabel.appendChild(zdLabel);
	  zzLabel.appendChild(zcLabel);
	  za.appendChild(zzLabel);
	  buildOptions(zy.labelTypes, zcLabel.id);
  
	  // Can size
	  const zcSize = document.createElement('select');
	  zcSize.id = `mcSize${d}`;
	  zcSize.name = `mcSize${d}`;
	  zcSize.classList.add('text-field', 'w-select');
	  zcSize.required = true;
	  zcSize.addEventListener("change", (event) => { mcVolCalc(event) });
	  const zdSize = document.createElement('label');
	  zdSize.setAttribute("for", zcSize.id);
	  zdSize.innerHTML = "Size / Format*";
	  zdSize.classList.add('field-label');
	  zdSize.id = `mcSizeLabel${d}`;
	  const zzSize = document.createElement("div");
	  zzSize.id = `${zcSize.id}div`;
	  zzSize.classList.add('table20p');
	  zzSize.appendChild(zdSize);
	  zzSize.appendChild(zcSize);
	  za.appendChild(zzSize);
	  buildOptions(zy.canFormats, zcSize.id);
  
	  // Layers column
	  const zcLayers = document.createElement('input');
	  zcLayers.id = `mcLayers${d}`;
	  zcLayers.name = `mcLayers${d}`;
	  zcLayers.min = "0";
	  zcLayers.step = "1";
	  zcLayers.max = "100";
	  zcLayers.placeholder = "6";
	  zcLayers.classList.add('text-field', 'w-input');
	  zcLayers.type = "number";
	  zcLayers.required = true;
	  zcLayers.addEventListener("change", (event) => { minMaxValidate(event) });
	  zcLayers.addEventListener("change", (event) => { mcVolCalc(event) });
	  const zdLayers = document.createElement('label');
	  zdLayers.setAttribute("for", zcLayers.id);
	  zdLayers.innerHTML = "Can layers*";
	  zdLayers.classList.add('field-label');
	  zdLayers.id = `mcLayerLabel${d}`;
	  const zzLayers = document.createElement("div");
	  zzLayers.id = `${zcLayers.id}div`;
	  zzLayers.classList.add('table20p');
	  zzLayers.appendChild(zdLayers);
	  zzLayers.appendChild(zcLayers);
	  za.appendChild(zzLayers);
  
	  // Need to add another column for the calculated volumes column
	  const zzc = document.createTextNode('');
	  const zzb = document.createElement('h4');
	  zzb.classList.add('w-input', 'text-field');
	  zzb.style.marginTop = "0";
	  zzb.id = `mcVol${d}`;
	  zzb.appendChild(zzc);
	  const zzd = document.createElement('label');
	  zzd.setAttribute("for", zzb.id);
	  zzd.innerHTML = "Volume(généré)";
	  zzd.classList.add('field-label');
	  const zza = document.createElement("div");
	  zza.id = `${zzb.id}div`;
	  zza.classList.add('table20p');
	  zza.appendChild(zzd);
	  zza.appendChild(zzb);
	  za.appendChild(zza);
	}
  };
  
  const deleteRow = () => {
	if (d > 1) {
	  document.getElementById(`mcLayers${d}div`).remove();
	  document.getElementById(`mcBrand${d}div`).remove();
	  document.getElementById(`mcSize${d}div`).remove();
	  document.getElementById(`mcLabel${d}div`).remove();
	  document.getElementById(`mcVol${d}div`).remove();
	  d -= 1;
	}
  };
  
  // Helper function that concatenates all the mobile canning product information into one long string
  const combineMCBrands = () => {
	let string = "";
	for (let i = 1; i < d + 1; i++) {
	  string += `${document.getElementById(`mcLayers${i}`).value} layers of ${document.getElementById(`mcBrand${i}`).value} - ${document.getElementById(`mcSize${i}`).value} - ${document.getElementById(`mcLabel${i}`).value}<br>`;
	}
	document.getElementById('mcCombinedBrands').value = string;
	string = "";
	for (let i = 1; i < d + 1; i++) {
	  string += `${document.getElementById(`mcLayers${i}`).value} layers of ${document.getElementById(`mcBrand${i}`).value} - ${document.getElementById(`mcSize${i}`).value} - ${document.getElementById(`mcLabel${i}`).value}. `;
	}
	document.getElementById('mcCombinedBrandSheet').value = string;
  };
  
  // Helper function to toggle the visibility and opacity of an object based on whether it contains the hide or show class
  const ToggleDisplay = (target) => {
	const za = document.getElementById(target);
	if (za.classList.contains('hide')) {
	  za.classList.remove('hide');
	  za.classList.add('show');
	  setTimeout(() => {
		fadeIn(za.id);
	  }, 200);
	} else {
	  fadeOut(za.id);
	  setTimeout(() => {
		za.classList.add('hide');
		za.classList.remove('show');
	  }, 200);
	}
  };
  
// Helper function to toggle the submitting or form information and hiding the associated forms, then showing the result div
const formSubmit = (target) => {
	Hide('mobileCanningWrap');
	Hide('warehouseWrap');
	Hide('resetRow');
	setTimeout(() => {
	  fadeOut('mobileCanningWrap');
	  fadeOut('warehouseWrap');
	  fadeOut('resetRow');
	}, 300);
  
	setTimeout(() => {
	  document.getElementById(target).submit();
	  ToggleDisplay('resultDiv');
	}, 500);
  };
  
  // Function that triggers whether the upload button and associated information should be shown on the order form once all the necessary information has been added
  const labelUploadTrigger = () => {
	formValidator('wf-form-warehouseForm');
	if (alertStatus == 0) {
	  if (c == "reorder") {
		Hide('uploadLabel');
		Show('whSubmitButton');
	  } else {
		Show('uploadLabel');
		Hide('labelToggleUploadDiv');
	  }
	} else {
	  Hide('uploadLabel');
	}
  };
  
  // Helper function to calculate the time horizon for orders based on the service and location
  // Sets the minimum time of the date picker
  const GetMinDate = (service) => {
	const whLead = document.getElementById("leadTime_warehouse_" + a).innerHTML.match(/(\d+)/g);
	const labelLead = document.getElementById("leadTime_labels_" + a).innerHTML.match(/(\d+)/g);
	const mcLead = document.getElementById("leadTime_mobileCanning_" + a).innerHTML.match(/(\d+)/g);
	console.log("lead times " + whLead);
	let leadstring;
	switch (service) {
	  case "warehouse":
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
	const leadtime = Number(leadstring);
	f = leadtime;
	$("#mcDate").datepicker("option", "minDate", leadtime);
	$("#whShippingDate").datepicker("option", "minDate", leadtime);
  };
  
  // Validation helper function
  // Checks the entered or updated value of a field against its min/max value and if it is outside the accepted range, overwrites the label with a warning before resetting the field value
  const minMaxValidate = (event) => {
	const val = event.target.value;
	const current = $("label[for='" + event.target.id + "']").html();
	if (val < Number(event.target.min)) {
	  event.target.disabled = true;
	  event.target.value = event.target.min;
	  $("label[for='" + event.target.id + "']").html("<span style='color:red'>Minimum " + event.target.min + "</span>");
	} else {
	  if (val > Number(event.target.max)) {
		event.target.disabled = true;
		event.target.value = event.target.max;
		$("label[for='" + event.target.id + "']").html("<span style='color:red'>Maximum " + event.target.max + "</span>");
	  } else {
		if (event.target.step !== '' && val % event.target.step !== 0) {
		  event.target.disabled = true;
		  event.target.value = Math.ceil(val / event.target.step) * Number(event.target.step);
		  $("label[for='" + event.target.id + "']").html("<span style='color:red'>Rounded to nearest / Arrondi au plus proche " + event.target.step + "</span>");
		}
	  }
	}
	setTimeout(() => {
	  $("label[for='" + event.target.id + "']").html(current);
	  event.target.disabled = false;
	}, 1500);
  };
  
  // Separate email validation script cause emails are hard and annoying to validate
  const ValidateEmail = (event) => {
	const current = $("label[for='" + event.target.id + "']").html();
	if (event.target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
	  console.log('match not null');
	} else {
	  event.target.disabled = true;
	  $("label[for='" + event.target.id + "']").html("<span style='color:red'>Please enter a valid email</span>");
	  setTimeout(() => {
		$("label[for='" + event.target.id + "']").html(current);
		event.target.disabled = false;
		event.target.value = '';
	  }, 1500);
	}
  };
  
  // Similar to the proper validate email field, however doesn't do the active alert
  const ValidateFormEmail = (field) => {
	const target = document.getElementById(field);
	const current = $("label[for='" + target.id + "']").html();
	if (target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
	  console.log('match not null');
	} else {
	  alertStatus = 1;
	}
  };
  

// Very complicated function to validate a date. This is annoyingly long and complicated due to the variations in how web browsers and operating systems handle date time
// A lot of this functionality is in case Safari users manually enter a date into the date selection field. For some reason, their browser doesn't allow disabled fields?
// Operates like the date selector but will throw an error if the date is before the minimum time horizon or if someone enters a date in a stupid or American format
const validateDate = (event) => {
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	const currentDate = new Date().getDate();
	let monthVal;
	let dateVal;
	let yearVal;
	let validStatus = 0;
	const current = $("label[for='" + event.target.id + "']").html();
  
	if (event.target.value.match(/\d{2}-\d{2}-\d{4}/) !== null) {
	  if (event.target.value.match(/\d\d\d\d/g)[0] >= currentYear && event.target.value.match(/\d\d\d\d/g)[0] <= currentYear + 1) {
		yearVal = event.target.value.match(/\d\d\d\d/g)[0];
	  } else {
		yearVal = currentYear;
	  }
	  if (Number(event.target.value.match(/\d\d/g)[1]) <= 12) {
		monthVal = event.target.value.match(/\d\d/g)[1];
	  } else {
		monthVal = 12;
		validStatus = 1;
	  }
  
	  if (Number(event.target.value.match(/\d\d/g)[0]) <= Number(daysInMonth(monthVal, yearVal))) {
		dateVal = event.target.value.match(/\d\d/g)[0];
	  } else {
		dateVal = daysInMonth(monthVal, yearVal);
		validStatus = 1;
	  }
  
	  if (event.target.id === "whLabelDate" || event.target.id === "mcLabelArrive") {
		if (yearVal === currentYear && Number(monthVal) <= Number(currentMonth) && dateVal < Number(currentDate)) {
		  event.target.value = Number(currentDate).toString().padStart(2, '0') + "-" + currentMonth.toString().padStart(2, '0') + "-" + yearVal;
		  event.target.disabled = true;
		  $("label[for='" + event.target.id + "']").html("<span style='color:red'>Date must be after today</span>");
		  setTimeout(() => {
			$("label[for='" + event.target.id + "']").html(current);
			event.target.disabled = false;
		  }, 1500);
		} else {
		  event.target.value = dateVal + "-" + monthVal + "-" + yearVal;
		  if (validStatus === 1) {
			event.target.disabled = true;
			$("label[for='" + event.target.id + "']").html("<span style='color:red'>Invalid date</span>");
			setTimeout(() => {
			  $("label[for='" + event.target.id + "']").html(current);
			  event.target.disabled = false;
			  event.target.value = '';
			}, 1500);
			validStatus = 0;
		  }
		}
	  } else {
		if (yearVal === currentYear && Number(monthVal) <= Number(currentMonth) && dateVal < (Number(currentDate) + f * 1)) {
		  event.target.value = Number(currentDate + f * 1).toString().padStart(2, '0') + "-" + currentMonth.toString().padStart(2, '0') + "-" + yearVal;
		  event.target.disabled = true;
		  $("label[for='" + event.target.id + "']").html("<span style='color:red'>Before minimum lead time</span>");
		  setTimeout(() => {
			$("label[for='" + event.target.id + "']").html(current);
			event.target.disabled = false;
		  }, 1500);
		} else {
		  event.target.value = dateVal + "-" + monthVal + "-" + yearVal;
		  if (validStatus === 1) {
			event.target.disabled = true;
			$("label[for='" + event.target.id + "']").html("<span style='color:red'>Invalid date</span>");
			setTimeout(() => {
			  $("label[for='" + event.target.id + "']").html(current);
			  event.target.disabled = false;
			  event.target.value = '';
			}, 1500);
			validStatus = 0;
		  }
		}
	  }
  
	} else { // bad input
	  event.target.disabled = true;
	  $("label[for='" + event.target.id + "']").html("<span style='color:red'>Please use DD-MM-YYYY format</span>");
	  setTimeout(() => {
		$("label[for='" + event.target.id + "']").html(current);
		event.target.disabled = false;
		event.target.value = '';
	  }, 1500);
	}
  };
  
  // Helper function for the above nightmare
  const daysInMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
  };
  
  // Helper function to handle a user selecting to add a new order. Calls the functions to reset the form back to the service selection screen
  const addNewOrder = () => {
	for (let i = 6; i > 1; i -= 1) {
	  deleteRow();
	}
	resetLocation();
	initStatus();
	Show('resetRow');
	setTimeout(() => {
	  locationSelect(a);
  
	  companyInfoValidate('wf-form-companyInfo');
	  fadeIn('resetRow');
	}, 300);
  };
  
// Helper function to handle a user selecting to add a new sku. Calls the functions to reset the form back to the service sub-selection
const addNewSku = () => {
	for (let i = 6; i > 1; i -= 1) {
	  deleteRow();
	}
	resetLocation();
	initStatus();
	Show('resetRow');
	setTimeout(() => {
	  locationSelect(a);
	  companyInfoValidate('wf-form-companyInfo');
	  serviceSelect(b);
	  if (b === "labels") {
		labelOrderType(e);
		labelOrder(c);
	  }
	  fadeIn('resetRow');
	}, 300);
  };
  
  // Function to toggle the placeholder text of Lids based on the incising selection
  const toggleSleeveQTY = (event) => {
	const za = document.getElementById('whIncising');
	const zb = document.getElementById('whEndCount');
	if (za.value.match(/200/g) >= 1) {
	  zb.placeholder = "600 per sleeve/manchon";
	} else if (za.disabled === false) {
	  zb.placeholder = "580 per sleeve/manchon";
	}
  };
  
  // Function to calculate and display the total number of lids
  const endsCalc = () => {
	const za = document.getElementById('whIncising');
	const zb = document.getElementById('whEndCount');
	const zc = document.getElementById('whEndCalc');
	if (za.value.match(/200/g) >= 1) {
	  zc.value = zb.value * 600;
	} else {
	  zc.value = zb.value * 580;
	}
  };
  
  // Helper function to calculate the total estimated mobile canning volume
  const mcVolCalc = (event) => {
	console.log(event.target.id);
	const row = event.target.id.match(/[0-9]/)[0];
	const layerCount = Number(document.getElementById("mcLayers" + row).value);
	const canType = document.getElementById("mcSize" + row).value;
	const canVolume = Number(locations[a].warehouse.cans[canType].volume);
	const layerFactor = Number(locations[a].warehouse.cans[canType].layerFactor);
	const estVolume = layerCount * canVolume * layerFactor;
	document.getElementById("mcVol" + row).innerHTML = Math.round(estVolume / 10) / 10;
	document.getElementById("hidden_mcVol" + row).value = Math.round(estVolume) / 100;
  };
  
  // Unused language toggle function to switch the visibility of English and French tagged objects
  const swapLanguage = (event) => {
	$(".english").toggleClass("hidden");
	$(".french").toggleClass("hidden");
  };
  
  // Helper function to allow manual requests
  // Disables form validation and instructs the user to complete as many details as possible
  // Changes the Zapier webhook as well
  const manualRequest = () => {
	ToggleDisplay2('manualOrderPopup');
	Hide('manualButton');
	const za = document.getElementById('whComments');
	za.scrollIntoView({ behavior: "smooth", block: "center" });
	Show('manualwhSubmitButton');
	Hide('whSubmitButton');
	setOnClick('manualwhSubmitButton', 'formSubmit', 'wf-form-warehouseForm');
	document.getElementById('wf-form-warehouseForm').action = 'https://hooks.zapier.com/hooks/catch/4099777/332scho/silent/';
  };
  
  const styleManualRequest = () => {
	const zb = document.getElementById('manualOrderPopup');
	zb.style.position = "fixed";
	zb.style.top = "0";
	zb.style.background = "#231f20";
	zb.style.width = "100%";
	zb.style.height = "100%";
  };
  