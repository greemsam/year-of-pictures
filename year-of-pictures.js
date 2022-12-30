'use strict'

const $ = (dom) => {
	return document.querySelector(dom)
}

const picturesByYear = {
	jan:$('#jan'),
	feb:$('#feb'),
	mar:$('#mar'),
	apr:$('#apr'),
	may:$('#may'),
	jun:$('#jun'),
	jul:$('#jul'),
	aug:$('#aug'),
	sep:$('#sep'),
	oct:$('#oct'),
	nov:$('#nov'),
	dec:$('#dec')
} 
const imgListBackgrounds = [
	'rgba(82, 80, 206, 1)',
	'rgba(82, 80, 206, 0.5)',
	'rgba(82, 80, 206, 1)',
	'rgba(82, 80, 206, 0.5)',
	'rgba(82, 80, 206, 0.5)',
	'rgba(82, 80, 206, 1)',
	'rgba(82, 80, 206, 0.5)',
	'rgba(82, 80, 206, 1)',
	'rgba(82, 80, 206, 1)',
	'rgba(82, 80, 206, 0.5)',
	'rgba(82, 80, 206, 1)',
	'rgba(82, 80, 206, 0.5)',
] 
const imgListArray = document.querySelectorAll('.img-lists__element')
const imgListMonthArray = document.querySelectorAll('.month')
const classForScreenSizes = ["default-screen", "huge-screen"];

//각 엘러먼트에 이미지 업로드 시 화면에 출력
for(const key of Object.keys(picturesByYear)){
	const imgTagLists = $(`#${key}-img`)
	picturesByYear[key].addEventListener('change', (e)=>{
		const targetFilesArray = Array.from(e.target.files)
		const selectedFile = targetFilesArray.map(file => {return URL.createObjectURL(file)})
		imgTagLists.setAttribute('src', selectedFile)
		imgTagLists.classList.add('updated')
	})
}

// 배경색 출력 
for(let i = 0; i<imgListArray.length; i++){
	imgListArray[i].style.background = imgListBackgrounds[i]
}

//제목
$('h1').innerHTML = `My Drawings in ${new Date().getFullYear()}`


//스크린 조정
$('.set-default-screen').addEventListener('click', ()=>{
	$('#app').classList.remove(...classForScreenSizes)
	$('#app').classList.add('default-screen')
})
$('.set-huge-screen').addEventListener('click', ()=>{
	$('#app').classList.remove(...classForScreenSizes)
	$('#app').classList.add('huge-screen')
})

//저장하기 
const saveAs = (url, fileName) =>{
	// 캡쳐된 파일을 이미지 파일로 내보낸다.
	var link = document.createElement('a'); 
	if (typeof link.download === 'string') { 
		link.href = url; 
		link.download = fileName; 
		document.body.appendChild(link); 
		link.click(); 
		document.body.removeChild(link); 
	} else { 
		window.open(url); 
	} 
}
//캡쳐 버튼
$('.not-captured__capture-button').addEventListener('click', ()=>{
	html2canvas($('#capture')).then(canvas => {
		saveAs(canvas.toDataURL('image/*'), 'year-of-pictures.jpg')
	})
})
