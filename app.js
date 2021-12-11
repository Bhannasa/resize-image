const canvas = document.getElementById('canvas');
const cw = document.querySelector('.container').clientWidth
canvas.width = cw;
const c = canvas.getContext('2d')
const oriImage = document.getElementById('original-img'); 
const genImage = document.getElementById('generated-img');
const input = document.getElementById('input');
const ratio = document.getElementById('ratio');
input.addEventListener('input',e=>{
    console.log(input.files)
    if(!input.files[0])   return;
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = ()=>{
        const img = new Image();
        img.id = 'image';
        img.src = reader.result;
        oriImage.innerHTML = '<h4>Original image:</h4>';
        oriImage.appendChild(img);
        genImage.style.display='block'
        img.onload = ()=>{
            generate();
        }
    }
})
const generate = ()=>{
    if(ratio.value<0.1) ratio.value = 0.1;
    else if(ratio.value>10) ratio.value = 10;
    const rat = 1/ratio.value;
    let ch = cw/rat;
    canvas.height = ch;
    const img = document.getElementById('image');
    const ih = img.clientHeight;
    const iw = img.clientWidth;
    const ihg = (ih/iw)*cw;
    const iwg = (iw/ih)*ch;
    c.clearRect(0,0,cw,ch)
    if(rat<iw/ih){
        c.drawImage(img,(cw-iwg)/2,0,iwg,ch)
    }else{
        c.drawImage(img,0,(ch-ihg)/2,cw,ihg)
    }
}
const download = ()=>{
    const link = document.createElement('a');
    link.setAttribute('download', 'CroppedImage.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}