
//------------call to main----------

function doAction(action, target, params){
	var data = new Object();
	data.action=action;
	data.target=target;
	data.params=params;
	window.top.postMessage( data, "*" );
}


//----------communication router for received data from main----------

function router(event){
	if(event.data.action){
		switch (event.data.action){
			case "synced":
				window.synced();	
			break;
			case "callFunctionInPanel":
				window[event.data.params[0]](event.data.params[1]);
			break;
		}
	}
}



//----------methods-------------

window.onload=function(){
	doAction("addToSync");
}


function callFunctionInPanel(target, func, params){
	doAction("callFunctionInPanel", target, [func, params]);
}

function expandPanel(panelName, interactionType){
	if(window.location.protocol=="file:"){
		doAction("expandPanel", null, [panelName, interactionType]);
	}else{
		EB.expand({panelName: panelName, actionType: interactionType});
	}
}

function collapsePanel(panelName, interactionType){
	if(window.location.protocol=="file:"){
		doAction("collapsePanel", null, [panelName, interactionType]);
	}else{
		EB.collapse({panelName: panelName, actionType: interactionType});
	}
}



//----------listen to messages----------

window.addEventListener("message", router, false);