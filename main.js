 
$(function(){var pp;
fetch('https://restcountries.eu/rest/v2/all')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
	var html="";
	myJson.forEach(function(lent){
		html+='<option value=\"'+lent.name+'\">'+lent.name+'</option>';
	}),
	html1='<option value=" ">Countries</option>';
	document.getElementById("country").innerHTML=html1 + html;
  })

 });

 
/************ variables globales*************/
var BD=[];//Array donde se guarada los datos ingresados (base de datos)
/*********************Funciones******/

function validarFormulario(){
 
		var txtName = document.getElementById('name').value;
		var txtSurname = document.getElementById('surname').value;
		var indiceSeleccionado = document.getElementById('country').selectedIndex;
		var txtBirth = document.getElementById('birth').value;
		var bday=txtBirth.split("/");
		var month=parseInt(bday[0]);
		var day=parseInt(bday[1]);
		var year = parseInt(bday[2]);
 
		var validar = false;
 
		//Test campo obligatorio
		if(txtName == null || txtName.length == 0 || /^\s+$/.test(txtName)){
			alert('Please complete the name field');
			return false;
		}
 		
 		//Test campo obligatorio
		if(txtSurname == null || txtSurname.length == 0 || /^\s+$/.test(txtSurname)){
			alert('Please complete the surname field');
			return false;
		}
 
		//Test comboBox
		if(indiceSeleccionado == " " || indiceSeleccionado == 0){
			alert('Select a country');
			return false;
		}

		//Test fecha
		if(txtBirth == null || txtBirth.length == 0 || txtBirth.length<10 || txtBirth.length>10 || month>12 ||month==0 || day==0|| day>31 || year>2018){
			alert('Please complete the field correctly (month/day/year)');
			return false;
		}		
		return true;

	}


// Funcion que guarda los datos en un Json y envia datos a la tabla
	 function crearDatos(){
	 	
	 	var txtName = document.getElementById('name').value;//Toma el valor de nombre
		var txtSurname = document.getElementById('surname').value;//Toma el valor de apellido

		//Toma el valor del Select
		var lista = document.getElementById('country');
		var indiceSeleccionado = lista.selectedIndex;
		var opcionSeleccionada = lista.options[indiceSeleccionado];
		var textoSeleccionado = opcionSeleccionada.text;

		//Toma el string de Birthday
		var txtBirth = document.getElementById('birth').value;

		// Convierte la fecha de cumpleaños en un array y calcula la edad en base a la fecha actual
		var bday=txtBirth.split("/");//Quita la "/" y convierte los datos en una array
		var year = parseInt(bday[2]);//Convierte el año en número
 		var actDate = new Date();//Toma la fecha actual
		var actYear= actDate.getFullYear();// Toma el año actual
		var calculo = actYear - year;//Calcula la edad 

		//Crea Json con datos ingresados
   		var obj={"name":txtName, "surname":txtSurname, "country":textoSeleccionado, "birthday":txtBirth, bday};
			BD.push(obj);
			console.log(BD);

		//Inserta datos a la tabla realizando reccoriendo con MAP el Json
		var html=BD.map(function(param){
	 		return '<tr class="fila"><td class="nom">'+param.name+' '+param.surname+'</td><td class="cont">'+param.country+'</td><td>'+param.birthday+'</td></tr>'
	 	}).join("");
	 	document.getElementById("table-body").innerHTML = html;

	 	//Muestra el saludo
	 	var ley = "Hello "+txtName+" "+txtSurname+" from "+textoSeleccionado+" on "+bday[1]+" of "+ bday[0]+ " you will have "+ calculo;
		document.getElementById("leyend").innerHTML = ley;
	 	
	};

//Funcion para mostrar saludo al hacer click sobre fila en la tabla
	
	 function greeting(param){
	 	//Toma los datos de la fila seleccionada
	 	var nom= param.getElementsByTagName("td")[0].innerHTML;
	 	var con= param.getElementsByTagName("td")[1].innerHTML;
	 	var fec= param.getElementsByTagName("td")[2].innerHTML;

	 	//Convierte en array la fecha de cumpleaños
	 	var bday=fec.split("/");

	 	//Realiza el calculo de la edad en base a la fecha de cumpleaños
		var year = parseInt(bday[2]);
 		var actDate = new Date();
		var actYear= actDate.getFullYear();
		var calculo = actYear - year;

		//Crea el saludo en base a datos de la fila
	 	var leye = "Hello "+nom+" from "+con+" on "+bday[1]+" of "+ bday[0]+ " you will have "+ calculo;
		document.getElementById("leyend").innerHTML = leye;

	 }

	
