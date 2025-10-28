function resetNames() {
	document.getElementById("name1").value = null;
	document.getElementById("name2").value = null;
	document.getElementById("result").innerHTML = null;
}
		
function resetNumbers() {
	document.getElementById("num1").value = null;
	document.getElementById("num2").value = null;
	document.getElementById("result2").innerHTML = null;
}

function compareNames()
{
	let name1 = document.getElementById("name1").value.toUpperCase();
	let name2 = document.getElementById("name2").value.toUpperCase();
	
	if (name1 == "" || name2 == "")
		{
			document.getElementById("result").innerHTML = "Invalid input";
			return;
		}
	if (name1 == name2) 
		{document.getElementById("result").innerHTML = "Same";}
	else {
		document.getElementById("result").innerHTML = "Different";
	}
}

function compareNumbers()
{
	let num1 = document.getElementById("num1").value;
	let num2 = document.getElementById("num2").value;
	
	if (num1 == "" || num2 == "")
		{
			document.getElementById("result2").innerHTML = "Invalid input";
			return;
		}
		
	num1 = Number(num1);
	num2 = Number(num2);
	
	if (Number.isInteger(num1) && Number.isInteger(num2)) {
		if (num1 == num2) 
			{document.getElementById("result2").innerHTML = "Equal";}
		else {
				if (num1 > num2) {
					document.getElementById("result2").innerHTML = String(num1);
				}
				else {
					document.getElementById("result2").innerHTML = String(num2);
				}
			
		}
	}
	else {
		document.getElementById("result2").innerHTML = "Invalid input";
		return;
	}
	
	
}