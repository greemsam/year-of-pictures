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

for(const key of Object.keys(picturesByYear)){
	const imgTagLists = $(`#${key}-img`)
	picturesByYear[key].addEventListener('change', (e)=>{
		const targetFilesArray = Array.from(e.target.files)
		const selectedFile = targetFilesArray.map(file => {return URL.createObjectURL(file)})
		imgTagLists.setAttribute('src', selectedFile)
	})
}


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
const captureForYear =  () =>{
	html2canvas($('#capture')).then(canvas => {
		saveAs(canvas.toDataURL('image/*'), 'year-of-pictures.jpg')
	})
}

