const passOutLbl = document.getElementById('pass-out-lbl'),
copyBtn = document.querySelector('.bi-files'),
diffCaseCheckbox = document.querySelector('.diff-case-checkbox'),
rndNumsCheckbox = document.getElementById('rnd-nums-checkbox'),
rndYearsRadio = document.querySelector('.generator__choose-years'),
rndNumsRadio = document.querySelector('.generator__choose-random');

let passLengthSelected = 16;
const generate = new Generator(passLengthSelected);

const fillHtml = pass => {
	passOutLbl.innerHTML = pass;
}

fillHtml(generate.password());

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
	passLengthUI.value = passLengthSelected;
	fillHtml(generate.password());
}

const ui_lengthChangedManual = () => {
	passLengthUI = document.getElementById('pass-length-view');
	if (passLengthUI.value == "") passLengthUI.value = passLengthSelected;
	if (passLengthUI.value % 2 != 0) {
		let temp = parseInt(passLengthUI.value);
		passLengthUI.value = temp + 1;
	}
	if (passLengthUI.value < 6) passLengthUI.value = 6;
	if (passLengthUI.value > 24) passLengthUI.value = 24;
	passLengthSelected = passLengthUI.value;
	passLengthInptRange = document.getElementById('pass-length');
	passLengthInptRange.value = passLengthUI.value;
	fillHtml(generate.password());
}

const applyChanges = () => {
	fillHtml(generate.password());
}