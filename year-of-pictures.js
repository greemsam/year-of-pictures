'use strict'

const $ = (dom) => {
  if(dom.includes('.')){
    return document.querySelectorAll(dom)
  }
  else{
    return document.querySelector(dom)
  }
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

const hideControlButtons = () =>{
  if(window.outerWidth < 800){
    $('meta[name=viewport]').content = 'width=800, initial-scale=1.0, user-scalable=no'
  }
  else{
    $('meta[name=viewport]').content = 'width=device-width, initial-scale=1.0, user-scalable=no'
  }
}

addEventListener('resize', hideControlButtons)

//각 엘러먼트에 이미지 업로드 시 화면에 출력
for(const key of Object.keys(picturesByYear)){
	const imgTagLists = $(`#${key}-img`)
	picturesByYear[key].addEventListener('change', (e)=>{
		const targetFilesArray = Array.from(e.target.files)
		const selectedFile = targetFilesArray.map(file => {return URL.createObjectURL(file)})
    imgTagLists.classList.add('updated')
		imgTagLists.setAttribute('src', selectedFile)
	})
}

// 배경색 출력 
for(let i = 0; i<imgListArray.length; i++){
	imgListArray[i].style.backgroundColor = imgListBackgrounds[i]
}

//제목
$('h1').innerHTML = `My Drawings in 2022` //${new Date().getFullYear()}


//스크린 조정
$('#set-default-screen').addEventListener('click', ()=>{
	$('#app').classList.remove(...classForScreenSizes)
	$('#app').classList.add('default-screen')
  $('#set-huge-screen').classList.remove('selected')
  $('#set-default-screen').classList.add('selected')
})
$('#set-huge-screen').addEventListener('click', ()=>{
	$('#app').classList.remove(...classForScreenSizes)
	$('#app').classList.add('huge-screen')
  $('#set-default-screen').classList.remove('selected')
  $('#set-huge-screen').classList.add('selected')
})

//캡쳐 버튼
$('#capture-button').addEventListener('click', ()=>{
	html2canvas($('#capture')).then(canvas => {
		saveAs(canvas.toDataURL('image/jpeg'), 'year-of-pictures.jpg')
	})
})
