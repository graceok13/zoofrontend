var allAnimals = [];

function run(){
    var tigger = new Tiger("Tigger");
    var pooh = new Bear("Pooh");
    var rarity = new Unicorn("Rarity");
    var gemma = new Giraffe("Gemma");
    var stinger = new Bee("Stinger");

    allAnimals.push(tigger);
    allAnimals.push(pooh);
    allAnimals.push(rarity);
    allAnimals.push(gemma);
    allAnimals.push(stinger);

    listAnimals();
}

function createAnimal(){
    var newAnimal;
    var animName = $("#name").val();
    var type = $("#animalType").val();
    switch(parseInt(type)){
        case 1:
            newAnimal = new Tiger(animName);
            break;
        case 2:
            newAnimal = new Bear(animName);
            break;
        case 3:
            newAnimal = new Unicorn(animName);
            break;
        case 4:
            newAnimal = new Giraffe(animName);
            break;
        case 5:
            newAnimal = new Bee(animName);
    }
    console.log(newAnimal);
    allAnimals.push(newAnimal);

    $("#feed").append(newAnimal.name + " the " + newAnimal.constructor.name + " was created! ");

    listAnimals();
}

function listAnimals(){
    var listAnimals = [];
    console.log(allAnimals);
    for (var i=0; i<allAnimals.length; i++){
        listAnimals.push(allAnimals[i].name + " the " + allAnimals[i].constructor.name);
    }
    console.log(listAnimals);

    var table = $("#listTable");
    table.empty();
    var titleCol = document.createElement("tr");
    var tdAn = document.createElement("td");
    tdAn.innerHTML = "Animal:";
    var tdFo = document.createElement("td");
    tdFo.innerHTML = "Favorite Food:";
    var tdDe = document.createElement("td");
    tdDe.innerHTML = "Delete Animal?";
    titleCol.append(tdAn);
    titleCol.append(tdFo);
    titleCol.append(tdDe);
    table.append(titleCol);

    for (var j=0; j<listAnimals.length; j++){
        var animCol = document.createElement("tr");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML="X";
        deleteButton.setAttribute("class","delButton");
        deleteButton.setAttribute("class","btn btn-danger");
        deleteButton.setAttribute("onclick","deleteAnimal("+ j +")");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        td1.innerHTML = listAnimals[j];
        td1.setAttribute("id","animal" + j);
        td1.setAttribute("id","button" + j);
        td2.innerHTML = allAnimals[j].favoriteFood;
        td3.append(deleteButton);
        animCol.append(td1);
        animCol.append(td2);
        animCol.append(td3);
        table.append(animCol);
    }
}

function deleteAnimal(buttonId){
    $("#feed").append(allAnimals[buttonId].name + " the " + allAnimals[buttonId].constructor.name + " was deleted. ");
    allAnimals.splice(buttonId,1);
    listAnimals();
}

function feedAnimals(){
    $("#feed").empty();
    var userName = $("#userName").val();
    var meal = $("#meal").val();
    var zookeeper = new Zookeeper(userName);
    zookeeper.feedAnimal(meal);
}

class Animal{

    constructor(name, favoriteFood){
        this.name = name;
        this.favoriteFood = favoriteFood
    }

    eat(food){
        $("#feed").append(this.name + " eats " + food + ". ");
        food == this.favoriteFood ? $("#feed").append("YUM!!! " + this.name + " wants more " + food + ". ") : this.sleep();
    }

    sleep(){
        $("#feed").append(this.name + " sleeps for 8 hours. ");

    }
}

class Tiger extends Animal{

    constructor(name){
        super(name,"meat");
    }

}

class Bear extends Animal{

    constructor(name){
        super(name,"fish");
    }

    sleep(){
        $("#feed").append(this.name + " hibernates for 4 months. " );
    }

}

class Unicorn extends Animal{

    constructor(name){
        super(name,"marshmallows");
    }

    sleep(){
        $("#feed").append(this.name + " sleeps in a cloud. ");
    }

}

class Giraffe extends Animal{

    constructor(name){
        super(name,"leaves");
    }

    eat(food){
        if (food == "leaves"){
            super.eat("leaves");
            super.sleep();
        } else {
            $("#feed").append("Yuck!!! " + this.name + " will not eat " + food + ". ");
        }
    }

}

class Bee extends Animal{

    constructor(name){
        super(name,"pollen");
    }

    eat(food){
        if (food == "pollen"){
            super.eat("pollen");
        } else {
            $("#feed").append("Yuck!!! " + this.name + " will not eat " + food + ". ");
        }
    }

    sleep(){
        $("#feed").append(this.name + " never sleeps" + ". ");
    }
}

class Zookeeper{

    constructor(name){
        this.name = name;
    }

    feedAnimal(food){
        $("#feed").append(this.name + " is feeding " + food + " to animals. ");
        for (var i=0; i<allAnimals.length; i++){
            allAnimals[i].eat(food);
        }
    }
}