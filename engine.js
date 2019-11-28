let box =[];

let Main = document.getElementsByClassName("Main");
let Inventory = document.getElementsByClassName("inventory");
let display = Main[0].children["display"];
let display_ctx = display.getContext('2d');
let hole = Main[0].children["hole"];
let hole_ctx = hole.getContext('2d');

let counter = Main[0].children["keyboard"].children["counter"];

let money_slot = Inventory[0].children["pay"];

let balance = 0;

let card_flag = false;


function setBox() { //120x50 px
    //let image = new Image();
    let images = ["obj1","obj2","obj3","obj4","obj5","obj6"];
    let priceList = [2,6,4,3,2,3];


    let id = 0;
    for( let i =0; i<3;i++){


        let id_image = Math.floor(Math.random()*[1,2,3].length);
        let image1 = new Image(); image1.src = "images/"+images[ id_image ]+".png";
        console.log(images[ id_image ]+".png");
        id_image = Math.floor(Math.random()*[1,2,3].length);
        let image2 = new Image(); image2.src = "images/"+images[ id_image ]+".png";


        let section = {id : id, amount:3, pos:[10,10+50*i], image:image1, price:priceList[id]};
        id++;
        let section2 = {id : id, amount:3, pos:[160,10+50*i], image:image2, price:priceList[id]};
        id++;
        box.push(section);box.push(section2);

    }
    printBox();
}




function printBox(){

    display_ctx.clearRect(0,0 , display.width, display.height);
    display_ctx.fillStyle = "#00ff1f";
    display_ctx.font = "12pt Arial";
    for(let i=0;i<box.length;i++){
        let x = box[i].pos[0];
        let y = box[i].pos[1];
        if(box[i].amount!=0){display_ctx.drawImage(box[i].image, x,y, 120, 30); display_ctx.fillText((box[i].id+1).toString()+") $"+box[i].price.toString(), x,y+30);}
        else{
            box.splice(i,1);
        }
    }
}

function CheckBox(){
    printBox();
    if(box.length==0){
        setBox();
    }

}

setInterval(CheckBox, 1000);




function setBalance(){

    let data = money_slot.value;
    money_slot.value="";

    if(data[0]!="-"&&data!=""){balance += (isFinite(data))? parseInt(data):0;}

    counter.innerHTML=balance;

}


function soundClick( name ) {

    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = "sounds/"+name+'.wav'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем

}


let isNotFall = true;


function getThing( id, cost){
    if( (card_flag||balance-cost>=0)&&isNotFall){

        card_flag = false;
        hole_ctx.clearRect(0, 0, hole.width, hole.height);
        printBox();
        let section;
        for (let i = 0; i < box.length; i++) {
            if (box[i].id == id) {
                section = box[i];
                box[i].amount--;
                break;
            }
        }

        if (section != undefined) {

            soundClick("main");

            if(!(balance-cost<0))balance-=cost;

            isNotFall = false;

            let obj = {pos: section.pos.concat(), image: section.image};

            let timer = setInterval(function () {

                printBox();


                if (obj.pos[1] === 190) {

                    printBox();
                    hole_ctx.drawImage(obj.image, 10, 10, 280, 120);
                    isNotFall = true;
                    clearInterval(timer);

                }


                let x = obj.pos[0];
                let y = obj.pos[1];
                display_ctx.drawImage(obj.image, x, y, 120, 30);
                obj.pos[1]++;

            }, 10);
        }
    }else{

        card_flag = false;

    }
    counter.innerHTML = balance;
}

