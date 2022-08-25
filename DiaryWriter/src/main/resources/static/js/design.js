var currentTab = 0; // Current tab is set to be the first tab (0)
// Display the current tab
var baseurl = "http://localhost:8080/";

function login() {
	console.log("here");
	document.getElementById('welcome').style.display = "none";
	var xhr = new XMLHttpRequest();
	var url = baseurl + "login";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	document.getElementById("dHead").value="";
	document.getElementById("w3review").value="";
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json.data.emailId);
			document.getElementById("login").style.display = "none";
			document.getElementById("diarylogin").style.display = "block";
			//openPage('Home', this, 'seagreen');
			document.getElementById("welcome").innerHTML = "Welcome " + json.data.displayName + " !";
			document.getElementById("welcome").style.display = "block";
			localStorage.setItem("userId", json.data.emailId);
			localStorage.setItem("token", json.token);
            document.getElementById("cDiary").style.display="block";
            document.getElementById("Home").style.display = "block";
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
				var tdh = document.createElement("TD");
				tdh.innerHTML="<b>Date</b>";
				tr.appendChild(tdh);
				var tdh1 = document.createElement("TD");
				tdh1.innerHTML="<b>Diary Header</b>";
				tr.appendChild(tdh1);
                table.appendChild(thead);

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
	var divContainer=document.getElementById("diaryList");	
	document.getElementById("login").style.display = "block";
	document.getElementById("diarylogin").style.display = "none";
	localStorage.setItem("token", "");
	localStorage.setItem("userId", "");
	divContainer.innerHTML = "";
	document.getElementById("cDiary").style.display="block";
	document.getElementById("vDiary").style.display="none";
	document.getElementById("vDiaryById").style.display="none";
	document.getElementById("dHeadv").value="";
    document.getElementById("w3reviewV").innerHTML="";
}

function getDiaryById(id) {
	document.getElementById("dHeadv").value="";
    document.getElementById("w3reviewV").innerHTML="";
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
	document.getElementById("dHeadv").value="";
    document.getElementById("w3reviewV").innerHTML="";
	document.getElementById("cDiary").style.display="none";
	document.getElementById("vDiary").style.display="block";
	document.getElementById("vDiaryById").style.display="none";
}

function backToSave(){
	document.getElementById("dHeadv").value="";
    document.getElementById("w3reviewV").innerHTML="";
	document.getElementById("cDiary").style.display="block";
	document.getElementById("vDiary").style.display="none";
	document.getElementById("vDiaryById").style.display="none";
}

function register() {
	var xhr = new XMLHttpRequest();
	var url = baseurl + "insertuser";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 201) {
			var json = JSON.parse(xhr.responseText);
			alert("User registration successful");
			window.location.href = "/";
			document.getElementById("username").value="";
			document.getElementById("password").value="";
			document.getElementById("firstName").value="";
			document.getElementById("lastName").value="";
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
		"passWord": document.getElementById("password").value,
		"firstName":document.getElementById("firstName").value,
		"lastName":document.getElementById("lastName").value,
		"displayName":document.getElementById("firstName").value+" "+document.getElementById("lastName").value,
		"userStatus":"A"
	});
	xhr.send(data);
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
}
