const generateBtn = document.getElementById('generate-pass-btn'),
passOutLbl = document.getElementById('pass-out-lbl'),
copyBtn = document.querySelector('.bi-files');

const alphabetEnVowels = "yuoiea";
const alphabetEnCons = "zxwvtsrqpnmlkjhgfdcb";
let passMaxLength = 12;

const rndNumberGen = () => {
	let rndNumber = new Uint8Array(1);
	while (rndNumber[0] > passMaxLength || rndNumber[0] == 0 || rndNumber[0] < 8) {
		window.crypto.getRandomValues(rndNumber);
	}
	return rndNumber[0];
}

const fillHtml = pass => {
	passOutLbl.innerHTML = pass;
}

const filterPass = pass => {
	let repeatedWordsCount;
	for (let i = 0; i < pass.length; ++i){
		if (pass[i] == pass[i + 2] && i + 2 != passMaxLength) {
			repeatedWordsCount += 1;
		}
		if (pass[i] == 'y' && pass[i + 2] == 'y' && i + 2 != passMaxLength) return false;
	}
	if (repeatedWordsCount >= 3) return false;
	else return true;
}

const generatePass = () => {
	let pass = "";
	while (pass.length < rndNumberGen()){
		pass += alphabetEnCons[Math.floor(Math.random() * alphabetEnCons.length)] + alphabetEnVowels[Math.floor(Math.random() * alphabetEnVowels.length)];
	}
	if (filterPass(pass)) fillHtml(pass);
	else generatePass();
}

generateBtn.addEventListener('click', () => {
	generatePass();
});

const ui_copyDone = () => {
  let contentSaved = passOutLbl.innerHTML;
  passOutLbl.innerHTML = 'Скопирова<span style="color: red;">но</span>';
  setTimeout(function() {
    passOutLbl.innerHTML = contentSaved;
  }, 1500);
}

const copyToClipboard = () => {
	
  let area = document.createElement('textarea');
  document.body.appendChild(area);  
  area.value = passOutLbl.innerText;
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

copyBtn.addEventListener('click', () => {
	if(passOutLbl.innerHTML == '&nbsp;' || passOutLbl.innerHTML == "Field is empty") {
		passOutLbl.innerHTML = "Field is empty";
		setTimeout(function() {
			passOutLbl.innerHTML = '&nbsp;';
		}, 1500)
		return;
	}
	else if(passOutLbl.innerHTML == 'Скопирова<span style="color: red;">но</span>') return;
	copyToClipboard();
	ui_copyDone();
});

const ui_lengthChanged = () => {
	passLengthUI = document.getElementById('pass-length-view');
	passMaxLength = document.getElementById('pass-length').value;
	passLengthUI.innerHTML = passMaxLength;
}