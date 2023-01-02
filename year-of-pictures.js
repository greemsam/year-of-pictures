'use strict'
const $ = (dom) => {
	if(dom.includes('#')){
		return document.querySelector(dom)
	}
	else{
		return document.querySelectorAll(dom)
	}
}
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const classForScreenSizes = ["screen-800", "screen-1000", "screen-device-width"];
const classForShapes = ['one-to-one', 'horizon', 'vertical']
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

//이미지 리스트 엘러먼트 생성
const appendImgListElements = async (index, month) =>{
	const monthNumber = index+1
	const imgContent = document.createElement('div')
	const fileInput = document.createElement('input')
	const imgLabel = document.createElement('label')
	const monthNumberSpan = document.createElement('span')
	const imgTag =  document.createElement('img')
	const monthTriangle = document.createElement('div')
	const imgIcon =  document.createElement('i')

	fileInput.setAttribute('type', 'file')
	fileInput.setAttribute('accept', 'image/*')
	fileInput.setAttribute('id', month)
	imgLabel.setAttribute('for', month)
	imgTag.setAttribute('id', `${month}-img`)

	imgContent.classList.add('img-lists__element')
	imgIcon.classList.add('fa-regular', 'fa-image')
	monthTriangle.classList.add('month-triangle')
	monthNumberSpan.classList.add('month-number')

	$('.img-lists')[0].appendChild(imgContent)
	imgContent.appendChild(fileInput)
	imgContent.appendChild(imgLabel)
	imgContent.appendChild(monthNumberSpan)
	imgContent.appendChild(monthTriangle)
	imgLabel.appendChild(imgTag)
	imgLabel.appendChild(imgIcon)
	monthNumberSpan.innerHTML = monthNumber
	
}

//이미지 리스트에 이미지 추가
const addEventShowingPreview = (index) =>{
	const month = months[index]
	const imgTagLists = $(`#${month}-img`)
	const previewImg = (event) =>{
		const targetFilesArray = Array.from(event.target.files)
		const selectedFile = targetFilesArray.map(file => {return URL.createObjectURL(file)})
		imgTagLists.setAttribute('src', selectedFile)
		imgTagLists.classList.add('updated')
	}
	const imgFittingBySize = () =>{
		imgTagLists.onload = () =>{
			if(imgTagLists.clientWidth < imgTagLists.clientHeight){
				imgTagLists.classList.add('vertical-fit')
			}
		}
	}
	$(`#${month}`).addEventListener('change', (e)=>{
		previewImg(e)
		imgFittingBySize()
	})
}

// 배경색 적용
const setBackgroundOfImgLists = (index) =>{
	$('.img-lists__element')[index].style.background = imgListBackgrounds[index]
}

//이미지 리스트 컴포넌트 생성
for(let i = 0; i<months.length; i++){
	appendImgListElements(i, months[i])
	addEventShowingPreview(i)
	setBackgroundOfImgLists(i)
}

//ui 초기화
window.addEventListener('click', (e)=>{
	if(e.target !== $('#option__toggle-click-area')){
		$('#option__list').classList.add('hide')
	}
})

//제목
$('h1')[0].innerHTML = `My Drawings in ${new Date().getFullYear()}`

//스크린 조정 옵션 불러오기
$('#option__toggle').addEventListener('click', ()=>{
	$('#option__list').classList.toggle('hide')
})
//스크린 조정 버튼 
$('.screen-control').forEach(item => item.addEventListener('click', (e)=>{
	const buttonData = item.dataset.size
	for(let i = 0; i<$('.screen-control').length; i++){
		$('.screen-control')[i].classList.remove('selected')
	}
	item.classList.add('selected')
	$('#app').classList.remove(...classForScreenSizes)
	$('#app').classList.add(`screen-${buttonData}`)
	$('#option__list').classList.toggle('hide')
	$('meta[name="viewport"]')[0].setAttribute('content', `width=${buttonData}`)
}))

// 이미지 엘러먼트 모양 적용
$('.shape-control button').forEach(item => item.addEventListener('click', (e)=>{
	const buttonData = item.dataset.shape
	for(let i = 0; i<$('.shape-control button').length; i++){
		$('.shape-control button')[i].classList.remove('selected')
	}
	item.classList.add('selected')
	$('.img-lists')[0].classList.remove(...classForShapes)
	$('.img-lists')[0].classList.add(buttonData)
}))

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
$('#capture-button').addEventListener('click', ()=>{
	html2canvas($('#capture')).then(canvas => {
		saveAs(canvas.toDataURL('image/*'), 'year-of-pictures.jpg')
	})
})
