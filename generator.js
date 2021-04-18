class Generator {
	constructor(passLength){
		this.passLengthSelected = passLength;
	}

	password = () => {
		const alphabetEnVowels = "uoiea";
		const alphabetEnCons = "zxwvtsrqpnmlkjhgfdcb";
		let pass = "";
		let check = false;
		for (let i = 0; pass.length != passLengthSelected; ++i){
			if(diffCaseCheckbox.checked == true && i == 0){
				pass += alphabetEnCons[this.rndNumberGen(alphabetEnCons.length)].toUpperCase();
				check = true;
				continue;
			}
			if(rndNumsCheckbox.checked == true){
				if(rndYearsRadio.checked == true && pass.length + 4 == passLengthSelected){
					pass += this.rndNumberGen(2022, 1901);
					break;
				}
				else if(rndNumsRadio.checked == true && pass.length + this.rndNumberGen(6) == passLengthSelected){
					let currRndGenMin = Math.pow(10, passLengthSelected - pass.length - 1);
					let currRndGenMax = currRndGenMin * 10 - 1;
					pass += this.rndNumberGen(currRndGenMax, currRndGenMin);
					break;
				}
				else if(rndNumsRadio.checked == true && pass.length + 2 == passLengthSelected){
					pass += this.rndNumberGen(99, 10);
					break;
				}
			}
			if(check) {
				pass += alphabetEnVowels[this.rndNumberGen(alphabetEnVowels.length)]
				check = false;
			}
			else {
				pass += alphabetEnCons[this.rndNumberGen(alphabetEnCons.length)]
				check = true;
			}
		}
		if (this.filterPass(pass)) return pass;
		else return this.password();
	}

	rndNumberGen = (maxLength, minLength = -1) => {
		let rndNumber;
		if (maxLength > 255) { rndNumber = new Uint16Array(1); }
		else if (maxLength > 65535) { rndNumber = new Uint32Array(1); }
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

	filterPass = pass => {
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
}