var adDiv;
var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);

		if(parent.test_previews){startAd();} //only for test
		
    } else {
        startAd();
    }
}

function startAd() {
    adDiv = document.getElementById("ad");
    addEventListeners();

    if (isIOS) {
        centerWebkitVideoControls();
    }
	
	EB.expand( { panelName: "userPanel1", actionType: "Auto" } );
	EB.expand( { panelName: "userPanel2", actionType: "Auto" } );	
}

function addEventListeners() {
    document.getElementById("clickthrough-button").addEventListener("click", clickthrough);
}



function clickthrough() {
    EB.clickthrough();
}

window.addEventListener("load", initEB);







