var currentTab = 0; // Current tab is set to be the first tab (0)
// Display the current tab
var baseurl = "http://localhost:8080/";

function showTab(n) {
	console.log(n);
	// This function will display the specified tab of the form...
	var x = document.getElementsByClassName("tab");

	//... and fix the Previous/Next buttons:
	if (n == 0) {
		document.getElementById("prevBtn").style.display = "none";
	} else {
		document.getElementById("prevBtn").style.display = "inline";
		x[n].style.display = "block";
	}
	if (n == (x.length - 1)) {
		document.getElementById("nextBtn").innerHTML = "Submit";
	} else {
		document.getElementById("nextBtn").innerHTML = "Next";
	}
	//... and run a function that will display the correct step indicator:
	fixStepIndicator(n)
}

function nextPrev(n) {
	// This function will figure out which tab to display
	var x = document.getElementsByClassName("tab");
	// Exit the function if any field in the current tab is invalid:
	if (n == 1 && !validateForm()) return false;
	// Hide the current tab:
	x[currentTab].style.display = "none";
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;
	// if you have reached the end of the form...
	if (currentTab >= x.length) {
		// ... the form gets submitted:
		document.getElementById("regForm").submit();
		return false;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);
}

function validateForm() {
	// This function deals with validation of the form fields
	var x, y, i, valid = true;
	x = document.getElementsByClassName("tab");
	y = x[currentTab].getElementsByTagName("input");
	// A loop that checks every input field in the current tab:
	for (i = 0; i < y.length; i++) {
		// If a field is empty...
		if (y[i].value == "") {
			// add an "invalid" class to the field:
			y[i].className += " invalid";
			// and set the current valid status to false
			valid = false;
		}
	}
	// If the valid status is true, mark the step as finished and valid:
	if (valid) {
		document.getElementsByClassName("step")[currentTab].className += " finish";
	}
	return valid; // return the valid status
}

function fixStepIndicator(n) {
	// This function removes the "active" class of all steps...
	var i, x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	//... and adds the "active" class on the current step:
	x[n].className += " active";
}


function openPage(pageName, elmnt, color) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}
	document.getElementById(pageName).style.display = "block";

}



function login() {
	console.log("here");
	document.getElementById('welcome').style.display = "none";
	var xhr = new XMLHttpRequest();
	var url = baseurl + "login";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json.data.emailId);
			document.getElementById("login").style.display = "none";
			document.getElementById("kafkalogin").style.display = "block";
			openPage('Home', this, 'seagreen');
			document.getElementById("welcome").innerHTML = "Welcome " + json.data.displayName + " !";
			document.getElementById("welcome").style.display = "block";
			localStorage.setItem("userId", json.data.emailId);
			localStorage.setItem("token", json.token);

		} else if (xhr.readyState === 4 && (xhr.status === 401 || xhr.status === 403)) {
			var json = JSON.parse(xhr.responseText);
			alert(json.errors);
		} else if (xhr.readyState === 4) {
			var json = JSON.parse(xhr.responseText);
			alert("Please try after sometime.");
		}
	};
	var data = JSON.stringify({
		"emailId": document.getElementById("username").value,
		"passWord": document.getElementById("password").value
	});
	xhr.send(data);
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
}


function saveDiary() {
	var userId = localStorage.getItem("userId");
	var token = localStorage.getItem("token");
	var diaryHeader=document.getElementById("dHead").value;
	var diaryvalue=document.getElementById("w3review").value;
	if (diaryHeader != '' && diaryvalue != '') {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", baseurl + "createDiary", true);
		xhttp.setRequestHeader("Authorization",  "Bearer "+token);
	    xhttp.setRequestHeader("Content-Type", "application/json");
	//xhttp.setRequestHeader("accept", "*/*");
	
	
	var data = JSON.stringify({
			"diaryContent": diaryvalue,
			"heading": diaryHeader,
			"userId":userId,
			"status":'A'
		});
		xhttp.send(data);
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === 4 && xhttp.status === 201) {
				alert("Diary saved");
			} else if (xhttp.readyState === 4 && (xhttp.status === 401 || xhttp.status === 403)) {
				var json = JSON.parse(xhttp.responseText);
				alert(json.errors);
			} else if (xhttp.readyState === 4) {
				var json = JSON.parse(xhttp.responseText);
				alert("Please try after sometime.");
			}
		};
		

	} else {
		document.getElementById("published").innerHTML = "<b>Please select a cluster</b>";
		alert("Please Enter header and diary content");
	}



}

function viewDiaries() {
	document.getElementById("cDiary").style.display="none";
	document.getElementById("vDiary").style.display="block";
	document.getElementById("vDiaryById").style.display="none";
	var userId = localStorage.getItem("userId");
	var token = localStorage.getItem("token");
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", baseurl + "getDiaryByUser/"+userId, true);
		xhttp.setRequestHeader("Authorization",  "Bearer "+token);
	    xhttp.setRequestHeader("Content-Type", "application/json");
	//xhttp.setRequestHeader("accept", "*/*");
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === 4 && xhttp.status === 200) {
				var json = JSON.parse(xhttp.responseText);
				if (json.length > 0) {
					var table = document.createElement("table");
				table.className ="table table-hover";
				var thead=document.createElement("thead");
				var tr = thead.insertRow(-1);


				var tbody=document.createElement("tbody");	
				for (var i = 0; i < json.length; i++) {
					var tr1 = tbody.insertRow(-1);
					
					var td = document.createElement("TD");
					var txt=document.createTextNode(new Date(json[i].date).toLocaleDateString());
					td.setAttribute('onclick',"getDiaryById('"+json[i].diaryId+"')");
					td.appendChild(txt);
					tr1.appendChild(td);
					var td1 = document.createElement("TD");
					var txt=document.createTextNode(json[i].heading);
					td1.appendChild(txt);
					tr1.appendChild(td1);
					
				}
				tbody.appendChild(tr1);
				table.appendChild(tbody);	
				var divContainer=document.getElementById("diaryList");				
				divContainer.innerHTML = "";
				divContainer.appendChild(table);
				}

			} else if (xhttp.readyState === 4 && (xhttp.status === 401 || xhttp.status === 403)) {
				var json = JSON.parse(xhttp.responseText);
				alert(json.errors);
			} else if (xhttp.readyState === 4) {
				var json = JSON.parse(xhttp.responseText);
				alert("Please try after sometime.");
			}
		};
		



}


function logout() {
	document.getElementById("login").style.display = "block";
	document.getElementById("kafkalogin").style.display = "none";
	localStorage.setItem("accountId", "");
	document.getElementById("published").innerHTML = "";
	document.getElementById("w3reviewFile").value = "";
	document.getElementById("w3reviewSub").value = "";
	document.getElementById("consumed").innerHTML = "";
	rempveTopics();
}

function getDiaryById(id) {
	document.getElementById("cDiary").style.display="none";
	document.getElementById("vDiary").style.display="none";
	document.getElementById("vDiaryById").style.display="block";
	var token = localStorage.getItem("token");
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", baseurl + "getDiaryById/"+id, true);
		xhttp.setRequestHeader("Authorization",  "Bearer "+token);
	    xhttp.setRequestHeader("Content-Type", "application/json");
	//xhttp.setRequestHeader("accept", "*/*");
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === 4 && xhttp.status === 200) {
				var json = JSON.parse(xhttp.responseText);
				document.getElementById("dHeadv").value=new Date(json.date).toLocaleDateString()+"-"+json.heading;
				document.getElementById("w3reviewV").innerHTML=json.diaryContent;

			} else if (xhttp.readyState === 4 && (xhttp.status === 401 || xhttp.status === 403)) {
				var json = JSON.parse(xhttp.responseText);
				alert(json.errors);
			} else if (xhttp.readyState === 4) {
				var json = JSON.parse(xhttp.responseText);
				alert("Please try after sometime.");
			}
		};
		



}

function back(){
	document.getElementById("cDiary").style.display="none";
	document.getElementById("vDiary").style.display="block";
	document.getElementById("vDiaryById").style.display="none";
}

function backToSave(){
	document.getElementById("cDiary").style.display="block";
	document.getElementById("vDiary").style.display="none";
	document.getElementById("vDiaryById").style.display="none";
}
