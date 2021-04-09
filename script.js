const generateBtn = document.getElementById('generate-pass-btn'),
passOutLbl = document.getElementById('pass-out-lbl'),
copyBtn = document.querySelector('.bi-files'),
diffCaseCheckbox = document.querySelector('.diff-case-checkbox'),
rndNumsCheckbox = document.getElementById('rnd-nums-checkbox'),
rndYearsRadio = document.querySelector('.generator__choose-years'),
rndNumsRadio = document.querySelector('.generator__choose-random')

const alphabetEnVowels = "yuoiea";
const alphabetEnCons = "zxwvtsrqpnmlkjhgfdcb";
let passLengthSelected = 12;

const rndNumberGen = (maxLength, minLength = -1) => {
	let rndNumber;
	if (maxLength > 255) { rndNumber = new Uint16Array(1); }
	else { rndNumber = new Uint8Array(1); }
	rndNumber[0] = maxLength;
	if (minLength == -1){
		while (rndNumber[0] >= maxLength) {
			window.crypto.getRandomValues(rndNumber);
		}
	}
	else{
		while (rndNumber[0] >= maxLength || rndNumber[0] < minLength) {
			window.crypto.getRandomValues(rndNumber);
		}
	}
	return rndNumber[0];
}

const fillHtml = pass => {
	passOutLbl.innerHTML = pass;
}

const filterPass = pass => {
	let repeatedWordsCount;
	for (let i = 0; i < pass.length; ++i){
		if (pass[i] == pass[i + 2] && i + 2 != passLengthSelected) {
			repeatedWordsCount += 1;
		}
		if (pass[i] == 'y' && pass[i + 2] == 'y' && i + 2 != passLengthSelected) return false;
	}
	if (repeatedWordsCount >= 3) return false;
	else return true;
}

const generatePass = () => {
	let pass = "";
	for (let i = 0; pass.length != passLengthSelected; ++i){
		if(diffCaseCheckbox.checked == true && i == 0){
			pass += alphabetEnCons[rndNumberGen(alphabetEnCons.length)].toUpperCase() + alphabetEnVowels[rndNumberGen(alphabetEnVowels.length)];
			continue;
		}
		if(rndNumsCheckbox.checked == true){
			if (rndYearsRadio.checked == true && pass.length + 4 == passLengthSelected){
				pass += rndNumberGen(2022, 1901);
				break;
			}
			else if(rndNumsRadio.checked == true){
				let amountToEnd;
				for(;;){
					amountToEnd = rndNumberGen(7,1);
					if (amountToEnd % 2 == 0) {break};
				}
				if (passLengthSelected - pass.length == 2) { amountToEnd = 2; }
				if (pass.length + amountToEnd == passLengthSelected) {
					let temp = amountToEnd;
					let rank = 1;
					for (let i = 0; i < temp - 1; ++i){
						amountToEnd *= 10;
						rank *= 10;
					}
					if (amountToEnd <= 65535) { pass +=  rndNumberGen(amountToEnd, rank);}
					else {
						let tempPass = rank;
						while(tempPass <= rank) { tempPass = Math.floor(Math.random() * amountToEnd); }
						pass += tempPass;
					}
					break;
				}
				
			}
		}
		pass += alphabetEnCons[rndNumberGen(alphabetEnCons.length)] + alphabetEnVowels[rndNumberGen(alphabetEnVowels.length)];
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
  }, 1000);
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
		}, 1000)
		return;
	}
	else if(passOutLbl.innerHTML == 'Скопирова<span style="color: red;">но</span>') return;
	copyToClipboard();
	ui_copyDone();
});

const ui_lengthChanged = () => {
	passLengthUI = document.getElementById('pass-length-view');
	passLengthSelected = document.getElementById('pass-length').value;
	passLengthUI.innerHTML = passLengthSelected;
}