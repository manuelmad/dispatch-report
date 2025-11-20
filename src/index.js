// Evento para que al tocar el input file, se quite el archivo anterior
document.querySelector("#file").addEventListener("mousedown", () => {
	document.querySelector("#file").value = "";
});

let result;

// Evento para importar el archivo excel
document.querySelector("#file").addEventListener("change", function () {
	// Obtener el array de archivos cargados
	let filesArray = document.querySelector("#file").files;
	console.log(filesArray);
	// Obtener el archivo seleccionado
	let file = document.querySelector("#file").files[0];

	// Separar el nombre del archivo por punto (.) para obtener su tipo
	let type = file.name.split('.');

	// Mostrar un alert en caso de que el archivo no sea un excel y detener la función
	if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
		alert ('Solo puede seleccionar un archivo de Excel (.xls, .xlsx) para importar');
		return false;
	}

	const reader = new FileReader();
	reader.readAsBinaryString(file);
	reader.onload = (e) => {
		const data = e.target.result;
		const zzexcel = window.XLS.read(data, {
			type: 'binary'
 		});

		// const result = []; Lo saqué de la función para usarlo luego para crear una tabla
		
		// Limpio la variable result para que no se dupliquen sus elementos cada vez que cargamos un nuevo archivo
		result = [];
        
		// Código para recorrer las hojas del excel e ir agregado sus contenidos en el array "result"
		for (let i = 0; i < zzexcel.SheetNames.length; i++) {
			const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
			result.push(...newData);
		}
		console.log('result', result);
	}
});