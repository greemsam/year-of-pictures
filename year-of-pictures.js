'use strict'
const $ = (dom) => {
	if(dom.includes('#')){
		return document.querySelector(dom)
	}
	else{
		return document.querySelectorAll(dom)
	}
}
const appName = `My Drawings in ${new Date().getFullYear()}`
const selectedScreen = {value:'device-width'}
const selectedShape = {value:'one-to-one'}
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const classForScreenSizes = ["screen-800", "screen-1000", "screen-device-width"];
const classForShapes = ['one-to-one', 'horizon', 'vertical']
const imgListElement = {value:''}
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
	const monthSticker = document.createElement('div')
	const imgIcon =  document.createElement('i')

	fileInput.setAttribute('type', 'file')
	fileInput.setAttribute('accept', 'image/*')
	fileInput.setAttribute('id', month)
	imgLabel.setAttribute('for', month)
	imgTag.setAttribute('id', `${month}-img`)

	imgContent.classList.add('img-lists__element')
	imgIcon.classList.add('fa-regular', 'fa-image')
	monthSticker.classList.add('month-sticker')
	monthNumberSpan.classList.add('month-number')

	if(monthNumber > 9){
		monthNumberSpan.classList.add('digit-2')
	}

	$('.img-lists')[0].appendChild(imgContent)
	imgContent.appendChild(fileInput)
	imgContent.appendChild(imgLabel)
	imgContent.appendChild(monthSticker)
	monthSticker.appendChild(monthNumberSpan)
	imgLabel.appendChild(imgTag)
	imgLabel.appendChild(imgIcon)
	monthNumberSpan.innerHTML = monthNumber

	//이미지 리스트 선택자 적용
	imgListElement.value = $('.img-lists__element')
}

//월 표시 삼각형 크기 계산
const setMonthStickerSize = (domSelectorName) => {
	const imgListElement = domSelectorName[0]
	const monthNumber = $('.month-number')
	const monthStickerSize = imgListElement.clientWidth * 0.4
	$('.month-sticker').forEach((item, index) =>{
		const month = index+1
		item.style.width = `${monthStickerSize}px`
		item.style.height = `${monthStickerSize}px`
		item.style.top = `${-monthStickerSize/2 + 4}px`
		item.style.left = `${-monthStickerSize/2 + 4}px`
		monthNumber[index].style.right = `${monthStickerSize/4}px`
		monthNumber[index].style.bottom = `${monthStickerSize/5}px`
		monthNumber[index].style.fontSize = `${monthStickerSize/5}px`
		if(month > 9 ){
			monthNumber[index].style.right = `${monthStickerSize/6}px`
		}
	})
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
			if(imgListElement.value[index].clientWidth > imgTagLists.clientWidth){
				imgTagLists.classList.add('img-width-100')
			}
			else{
				imgTagLists.classList.remove('img-width-100')
			}
		}
	}
	$(`#${month}`).addEventListener('change', (e)=>{
		previewImg(e)
		imgFittingBySize()
	})
}
//업데이트된 이미지 크기 조정
const resetUpdatedImgs = () => {
	const updatedImgs = $('.updated')
	for(let i = 0; i<updatedImgs.length; i++){
		if(imgListElement.value[i].clientWidth > updatedImgs[i].clientWidth){
			console.log('width-100')
			updatedImgs[i].classList.add('img-width-100')
		}
		else{
			console.log('width-100-removed')
			updatedImgs[i].classList.remove('img-width-100')
		}
	}
}

// 배경색 적용
const setBackgroundOfImgLists = (index) =>{
	imgListElement.value[index].style.background = imgListBackgrounds[index]
}

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

//이미지 리스트 컴포넌트 생성
for(let i = 0; i<months.length; i++){
	appendImgListElements(i, months[i])
	addEventShowingPreview(i)
	setBackgroundOfImgLists(i)
}

//옵션 리스트 바깥 영역 클릭 시 ui 숨김
window.addEventListener('click', (e)=>{
	if(e.target !== $('#option__toggle-click-area')){
		$('#option__list').classList.add('hide')
	}
})

//도움말 바깥 영역 클릭 시 ui 숨김
window.addEventListener('click', (e)=>{
	const isDescription = $('#description').classList.value.includes('show') && e.target === $('#description')
	if(isDescription){
		$('#description').classList.remove('show')
	}
})
//달력 삼각형 크기 조정
setMonthStickerSize(imgListElement.value)
window.addEventListener('resize', () => setMonthStickerSize(imgListElement.value))

//제목 기본값
$('#app-title').innerHTML = appName
$('#my-app-title').value = appName
//제목 변경 옵션 보여주기 
$('#app-title').addEventListener('click', ()=>{
	$('#modal-app-title-modify').classList.add('show')
})
//제목 변경옵션 닫기
$('#close-app-title').addEventListener('click', ()=>{
	$('#my-app-title').value = appName
	$('#modal-app-title-modify').classList.remove('show')
})
//제목 변경시
$('#modify-app-title').addEventListener('click', ()=>{
	$('#app-title').innerHTML = $('#my-app-title').value
	$('#modal-app-title-modify').classList.remove('show')
})
//도움말 열기
$('#description-toggle').addEventListener('click', ()=>{
	$('#description').classList.add('show')
})
//도움말 닫기 
$('#close-description').addEventListener('click', ()=>{
	$('#description').classList.remove('show')
})
//스크린 조정 옵션 열기
$('#option__toggle').addEventListener('click', ()=>{
	$('#option__list').classList.toggle('hide')
})
//스크린 조정 버튼 
$('.screen-control').forEach(item => item.addEventListener('click', (e)=>{
	selectedScreen.value = item.dataset.size
	for(let i = 0; i<$('.screen-control').length; i++){
		$('.screen-control')[i].classList.remove('selected')
	}
	item.classList.add('selected')
	$('#app').classList.remove(...classForScreenSizes)
	$('#app').classList.add(`screen-${selectedScreen.value}`)
	$('#option__list').classList.toggle('hide')

	//이미지 영역 : 달력 삼각형 다시 계산 
	setMonthStickerSize(imgListElement.value)
}))

// 이미지 엘러먼트 모양 적용
$('.shape-control button').forEach(item => item.addEventListener('click', ()=>{
	selectedShape.value = item.dataset.shape
	for(let i = 0; i<$('.shape-control button').length; i++){
		$('.shape-control button')[i].classList.remove('selected')
	}
	item.classList.add('selected')
	$('.img-lists')[0].classList.remove(...classForShapes)
	$('.img-lists')[0].classList.add(selectedShape.value)

	//업데이트된 이미지 크기 재조정 
	resetUpdatedImgs()
	//이미지 영역 : 달력 삼각형 다시 계산 
	setMonthStickerSize(imgListElement.value)
}))


//캡쳐 버튼
$('#capture-button').addEventListener('click', ()=>{
  const winWidth = {windowWidth:''}
  if(window.outerWidth < 800 && selectedScreen.value === 'device-width'){
    winWidth.windowWidth = 800+'px'
   $('meta[name="viewport"]')[0].setAttribute('content', 'width=800, initial-scale=1.0, user-scalable=no')
 }
  else if(window.outerWidth < 800 && selectedScreen.value !== 'device-width'){
    winWidth.windowWidth = selectedScreen.value+'px'
    $('meta[name="viewport"]')[0].setAttribute('content', `width=${selectedScreen.value}, initial-scale=1.0, user-scalable=no`)
  }
  window.scrollTo(0,0);
	html2canvas($('#capture')).then(canvas => {
    
		saveAs(canvas.toDataURL('image/png', 1), 'year-of-pictures.jpg')
    $('meta[name="viewport"]')[0].setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no')
	})
  
})
