let box =[];

let Main = document.getElementsByClassName("Main");
let display = Main[0].children["display"];
let display_ctx = display.getContext('2d');

function setBox() { //120x50 px
    let image = new Image();
    let images = ["","","","","",""];
    image.src = "images/cash.png";



    for( let i =0; i<3;i++){

        let section = {id : i, amount:3, pos:[10,10+50*i], image:image};
        let section2 = {id : i+1, amount:3, pos:[160,10+50*i], image:image};

        box.push(section);box.push(section2);

    }
    printBox();
}




function printBox(){

    display_ctx.clearRect(0,0 , display.width, display.height);

    for(let i=0;i<box.length;i++){

        let x = box[i].pos[0];
        let y = box[i].pos[1];
        if(box[i].amount!=0)display_ctx.drawImage(box[i].image, x,y, 120, 30);
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



let check_box = setInterval(CheckBox, 2000);


 
 