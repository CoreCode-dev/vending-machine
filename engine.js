let box ={};



function openMenu(){

    let menu = document.getElementsByClassName("inventory");
    let menu_option = menu.getElementById("inventory_option");


    if(menu.style.width!="100px") {
        menu.style.width = "100px";
        menu.style.height = "300px";
        menu_option.display = "block";
    }
    else{
        menu.style.width = "50px";
        menu.style.height = "50px";
        menu_option.display = "none";
    }
}

 

 
 