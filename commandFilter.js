var defaultUnitLimit = 5,
	filterAtRun = true,
	cookieTimeout =  60*60*24*365,
	unitLimit = 0,
	targetVillage = [],
	originVillage = [],
	commTabHTML = "",
	selectionHTML = '<table class="vis"> <tr> <th colspan="2">Filter outgoing commands</th> </tr> <tr> <td>Troop count:</td> <td> <input id="unitLimit" type="text" name="filters[troop_count]" value="" placeholder='+getCookie("command_filter_default")+' /> </td> </tr> <tr> <td>Target village:</td> <td> <input id="villTarget" type="text" name="filters[target_name]" value="" /> </td> </tr> <tr> <td>Origin village:</td> <td> <input id="villOrigin" type="text" name="filters[origin_name]" value="" /> </td> </tr> <!-- will use non-standard input for command icons --> <tr> <td colspan="2" class="center"> <input id="filterBtn" type="submit" value="Save &amp; reload" class="btn" onClick="filter()"/> </td> </tr> </table>';

function getCookie(cookie)
{
	try{
		var c = document.cookie.split('; ').find(row => row.startsWith(cookie+'=')).split('=')[1];
		return !!c ? c : false;
	}
	catch(err){
		return false;
	}
}

function setCookie(cookie, val){
	if(true){//!getCookie(cookie)){
		var d = new Date();
	    d.setTime(d.getTime() + cookieTimeout);
	    var expires = 'expires='+ d.toUTCString();
		document.cookie = cookie + "=" + val;// + ";" + "expires=" + expires;

	}
}

String.prototype.format = function () 
{
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

function insertHTML()
{
	document.getElementsByClassName("vis")[1].insertAdjacentHTML('afterend', selectionHTML.format(defaultUnitLimit));
	return;
};

function restore()
{
	document.getElementById('commands_table').tBodies[0].innerHTML = commTabHTML;
	return;
};

function filter()
{
	restore();
	let unitStr = document.getElementById("unitLimit").value;
	unitLimit = unitStr == '' ? defaultUnitLimit : parseInt(unitStr);
	if(getCookie) unitLimit;
	setCookie("command_filter_default", unitLimit);
	var commTab = document.getElementById('commands_table').tBodies[0];
	var rows = commTab.getElementsByTagName('tr');
	for(var i = rows.length-1; i >= 1; i--){
		let total = 0;
		let vals = rows[i].getElementsByTagName('td');
		for(var j = 3; j < vals.length; j++){
			total += parseInt(vals[j].innerText);
		};
		if(total < unitLimit){
			commTab.deleteRow(i);
		};
	};
	commTab = document.getElementById('commands_table').tBodies[0];
	var newrows = commTab.getElementsByTagName('tr');
	newrows[0].getElementsByTagName('th')[0].innerText = 'Command ('+((newrows.length) - 1)+')';

	var targetVillage = document.getElementById('villTarget').value;
	var targetVillages = document.getElementsByClassName('quickedit-content');
	var commTab2 = document.getElementById('commands_table').tBodies[0];
	if(targetVillage != ''){
		for(var i = targetVillages.length-1; i >= 1; i--){
			if(targetVillages[i].innerText.match(targetVillage)){
				
			}
			else{
				commTab2.deleteRow(i);
			}
		};
	};
};

(function()
{
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);

	if((game_data.screen != 'overview_villages') || (urlParams.get('mode') != 'commands')){
		alert("please run the script from the commands overview!");
		return;
	};
	commTabHTML = document.getElementById('commands_table').tBodies[0].innerHTML;
	insertHTML();

	var input = document.getElementById('unitLimit');
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("filterBtn").click();
		};
	});
	if(filterAtRun){
		filter();
	}
})();

/*
<table class="vis">
            <tr>
                <th colspan="2">Filter outgoing commands</th>
            </tr>
                                            <tr>
                    <td>Troop count:</td>
                    <td>
                        <input id="unitLimit"
                            type="text"
                            name="filters[troop_count]"
                            value=""
                            placeholder="5"
                                                    />
                                            </td>
                </tr>
                                            <tr>
                    <td>Target village:</td>
                    <td>
                        <input id="villTarget"
                            type="text"
                            name="filters[target_name]"
                            value=""
                                                    />
                                            </td>
                </tr>
                                            <tr>
                    <td>Origin village:</td>
                    <td>
                        <input id="villOrigin"
                            type="text"
                            name="filters[origin_name]"
                            value=""
                                                    />
                                            </td>
                </tr>
                                         
				 <!-- will use non-standard input for command icons -->
                                            <tr>               

                 <td colspan="2" class="center">
                    <input id="filterBtn" type="submit" value="Save &amp; reload" class="btn" onClick="filter()"/>
                </td>
            </tr>
        </table>

*/