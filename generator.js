class Generator {
	constructor(passLength){
		this.passLengthSelected = passLength;
	}

	password = () => {
		const alphabetEnVowels = "yuoiea";
		const alphabetEnCons = "zxwvtsrqpnmlkjhgfdcb";
		let pass = "";
		for (let i = 0; pass.length != passLengthSelected; ++i){
			if(diffCaseCheckbox.checked == true && i == 0){
				pass += alphabetEnCons[this.rndNumberGen(alphabetEnCons.length)].toUpperCase() + alphabetEnVowels[this.rndNumberGen(alphabetEnVowels.length)];
				continue;
			}
			if(rndNumsCheckbox.checked == true){
				if (rndYearsRadio.checked == true && pass.length + 4 == passLengthSelected){
					pass += this.rndNumberGen(2022, 1901);
					break;
				}
				else if(rndNumsRadio.checked == true){
					let amountToEnd;
					for(;;){
						amountToEnd = this.rndNumberGen(7,1);
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
						if (amountToEnd <= 65535) { pass +=  this.rndNumberGen(amountToEnd, rank);}
						else {
							let tempPass = rank;
							while(tempPass <= rank) { tempPass = Math.floor(Math.random() * amountToEnd); }
							pass += tempPass;
						}
						break;
					}			
				}
			}
			pass += alphabetEnCons[this.rndNumberGen(alphabetEnCons.length)] + alphabetEnVowels[this.rndNumberGen(alphabetEnVowels.length)];
		}
		if (this.filterPass(pass)) {
			return pass;
		}
		else {
			return this.password();
		} 
	}

	rndNumberGen = (maxLength, minLength = -1) => {
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