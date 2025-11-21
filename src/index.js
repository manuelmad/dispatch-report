// Event to delete previous file when pressing the input file
document.querySelector("#file").addEventListener("mousedown", () => {
	document.querySelector("#file").value = "";
});

// Variable to save the info from excel
let result = [];

// Event to import excel file
document.querySelector("#file").addEventListener("change", function () {
	// Getting uploaded files
	let filesArray = document.querySelector("#file").files;
	console.log(filesArray);
	// Getting the only file
	let file = document.querySelector("#file").files[0];

	// Spliting file's name by "." to get its extension
	let type = file.name.split('.');

	// Show an alert in case the file is not an excel file. Stop function
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
		
		// Clear variable
		result = [];
        
		// Reading excel sheets and adding their content in "result" array
		for (let i = 0; i < zzexcel.SheetNames.length; i++) {
			const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
			result.push(...newData);
		}
		console.log('result', result);
	}
});

const guide_container = document.getElementById('guide_container');

const guide_btn = document.getElementById('guide_btn');
guide_btn.addEventListener('click', createGuide);

function createGuide() {
	guide_container.innerHTML = '';
	let productInfo = [];
	result.forEach(element => {
		const p = document.createElement('p');
		const span = document.createElement('span');
		span.innerHTML = element['Cliente Nombre'];
		p.appendChild(span);
		guide_container.appendChild(p);
	});

	console.log(productInfo);
	
}