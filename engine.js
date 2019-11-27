let box =[];

let Main = document.getElementsByClassName("Main");
let display = Main[0].children["display"];
let display_ctx = display.getContext('2d');
let hole = Main[0].children["hole"];
let hole_ctx = hole.getContext('2d');


function setBox() { //120x50 px
    let image = new Image();
    let images = ["","","","","",""];
    let priceList = [2,6,4,3,2,3];
    image.src = "images/cash.png";


    let id = 0;
    for( let i =0; i<3;i++){

        let section = {id : id, amount:3, pos:[10,10+50*i], image:image, price:priceList[id]};
        id++;
        let section2 = {id : id, amount:3, pos:[160,10+50*i], image:image, price:priceList[id]};
        id++;
        box.push(section);box.push(section2);

    }
    printBox();
}




function printBox(){

    display_ctx.clearRect(0,0 , display.width, display.height);
    display_ctx.fillStyle = "#ff0600";
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

    if(box.length==0){
        setBox();
    }

}

setInterval(CheckBox, 2000);





function getThing( id ){
    hole_ctx.clearRect(0,0 , hole.width, hole.height);
    printBox();
    let section;
    for(let i = 0; i<box.length;i++){
        if(box[i].id==id){section = box[i];box[i].amount--;break;}
    }

    if(section!=undefined) {
        let obj = {pos: section.pos.concat(), image: section.image};

        let timer = setInterval(function () {

            printBox();


            if (obj.pos[1] === 190) {

                printBox();
                hole_ctx.drawImage(obj.image,10,10,280,120);
                clearInterval(timer);
                return;
            }


            let x = obj.pos[0];
            let y = obj.pos[1];
            display_ctx.drawImage(obj.image, x, y, 120, 30);
            console.log(1);
            obj.pos[1]++;

        }, 10);
    }
}

