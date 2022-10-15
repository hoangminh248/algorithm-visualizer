const container = document.querySelector("#container")
const startButton = document.querySelector("#start_btn")
const min= 1 ;
const max= 100;
const container_Height = container.clientHeight;
const container_Width = container.clientWidth;
const numRectangles =   25;
const randomArray =[];
let delay = Number(document.querySelector("#delay").innerHTML);
const btnMinus = document.querySelector("#minus");
const btnPlus = document.querySelector("#plus");
console.log(delay);
/*Function to delay the code*/
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
}

/* Function to create a random number */
function randomNum (min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/* Make an random array with random height rectangles */
for (let i = 0 ; i < numRectangles ; i++ ){
    const rec = document.createElement("div");
    rec.className="rectangle";
    rec.style.width=String((container_Width-numRectangles*2*5)/numRectangles+"px");
    const randomNumber =randomNum(1,100);
    randomArray.push(randomNumber);
    rec.style.height=String(randomNumber*container_Height/100+"px");
    container.appendChild(rec);
}

/* Function use to swap the position of 2 child */
function swapChildren(parentElement, index1, index2) {
    if (index1 === index2)
        return

    if (index1 > index2) {

        const temp = index1

        index1 = index2
        index2 = temp
    }
    const element1 =parentElement.children[index1];
    const element2 =parentElement.children[index2];
    if (index2 === index1 + 1) {
        parentElement.insertBefore(element2, element1)
    } else {

        const reference = element2.nextSibling

        parentElement.replaceChild(element2, element1)
        parentElement.insertBefore(element1, reference)
    }
}

/*Insertion Sort */
async function interchangeSort(arr){
    const newArr = [...arr];
    for (let i = 0; i < newArr.length;i++){
        container.children[i].className="rectangle current";
        for(let j=i+1;j < newArr.length;j++){
            container.children[j].className="rectangle checking";
            if (newArr[j] < newArr[i])
            {
                const temp =newArr[i];
                newArr[i]=newArr[j];
                newArr[j]=temp;
                swapChildren(container,i,j);
                container.children[i].className="rectangle current";
                container.children[j].className="rectangle checking";
            }
            if (delay>0) await sleep(delay);
            container.children[j].className="rectangle";
        }
        container.children[i].className ="rectangle sorted";
    }
    return newArr;
}

startButton.addEventListener("click",function(){
    interchangeSort(randomArray)},true);
btnMinus.addEventListener("click",function(){
    if (delay > 0)
    {  
    if (delay> 50){
        delay-=50;
        console.log(delay);
        document.querySelector("#delay").textContent=delay;
    }
    else if (delay <= 50){
        delay-=10;
        console.log(delay);
        document.querySelector("#delay").textContent=delay;
    }}
},true)
btnPlus.addEventListener("click",function(){
    delay+=50;
    console.log(delay);
    document.querySelector("#delay").textContent=delay;
},true)

