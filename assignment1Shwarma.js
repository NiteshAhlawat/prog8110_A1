// Author : Nitesh Ahlawat
const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    MENU:   Symbol("food"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    FRUITCUSTARD:   Symbol("fruitcustard"),
    NEEDSALAD: Symbol("needsalad"),
    SALAD:  Symbol("salad"),
    DRINKS:  Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sItem = "";
        this.sSize = "";
        this.sToppings = "";
        this.sFruitcustard = "";
        this.sSalad = "";
        this.sDrinks = "";
        this.sPrice = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.MENU;
                aReturn.push("Welcome to Nitesh's Cafe.");
                aReturn.push("What would you like to have today?");
                aReturn.push("Burger 🍔 or Wrap 🌯"); // Two items
                break;
            case OrderState.MENU:
                this.stateCur = OrderState.SIZE;
                this.sItem = sInput;
                aReturn.push("Great Choice :)");
                aReturn.push("What meal size do you  want? Small, Medium, Large");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if (this.sSize.toLowerCase() == 'small') {
                    this.sPrice += 8;
                }
                else if (this.sSize.toLowerCase() == 'medium') {
                    this.sPrice += 10;
                }
                else if (this.sSize.toLowerCase() == 'large') {
                    this.sPrice += 12;
                }
                else {
                    this.sPrice += 7;
                }
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.FRUITCUSTARD
                this.sToppings = sInput;
                aReturn.push("Which custard would you like?");
                break;
            case OrderState.FRUITCUSTARD:    // Upselling item
                this.stateCur = OrderState.NEEDSALAD
                this.sFruitcustard = sInput;
                if (this.sFruitcustard.toLowerCase() != 'no') {
                    this.sPrice += 5;
                }
                aReturn.push("Do you need a salad also?");
                break;
            case OrderState.NEEDSALAD:  //Third item
                //this.sToppings = sInput;
                this.sSalad = sInput;
                if (this.sSalad.toLowerCase() == 'yes') {
                    this.stateCur = OrderState.SALAD;
                    aReturn.push("what size do you want?");
                }
                else {
                    this.stateCur = OrderState.DRINKS;
                    aReturn.push("Would you like drinks with that?");
                }
                break;
            case OrderState.SALAD:
                this.stateCur = OrderState.DRINKS
                this.sSalad = sInput;
                if (this.sSalad.toLowerCase() == 'small') {
                    this.sPrice += 4;
                    }
                else if (this.sSalad.toLowerCase() == 'medium') {
                    this.sPrice += 6;
                    }
                else if (this.sSalad.toLowerCase() == 'large') {
                    this.sPrice += 8;
                    }
                else {
                    this.sPrice += 3;
                    }
                aReturn.push("Which drink would you like with that?");
                    break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.sPrice += 5;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} and `);
                if(this.sFruitcustard){
                    aReturn.push(`with a yummy ${this.sFruitcustard} custard and `)
                }
                if(this.sSalad){
                    aReturn.push(`with a healthy ${this.sSalad} Salad and `);
                }
                if(this.sDrinks){
                    aReturn.push(`with a drink of ${this.sDrinks}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                let sTax = 0.13 * this.sPrice;   // Estimated price or Total bill
                this.sPrice += sTax;
                aReturn.push(`Total bill with Tax : $${this.sPrice}`);
                break;
        }
        return aReturn;
    }
}