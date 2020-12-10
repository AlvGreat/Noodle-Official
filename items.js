//weapons
class Weapon {
    constructor(name, minAtk, maxAtk) {
        this.name = name;
        this.minAtk = minAtk;
        this.maxAtk = maxAtk;
    }
}

//tier 1: melee
const stick = new Weapon("stick", 5, 20);
const knife = new Weapon("knife", 15, 30);
const sword = new Weapon("sword", 20, 35);
const lightsaber = new Weapon("lightsaber", 35, 45);

//tier 2: ranged
const basketball = new Weapon("basketball", 15, 30);
const pistol = new Weapon("pistol", 25, 40);
const blaster = new Weapon("blaster", 30, 50);
const sniper = new Weapon("sniper", 30, 60);

//heals
class Heal {
    constructor(name, minAtk, maxAtk) {
        this.name = name;
        this.minAtk = minAtk;
        this.maxAtk = maxAtk;
    }
}

const miniPotion = new Heal("miniPotion", 20, 40);
const healthPotion = new Heal("healthPotion", 30, 60);
const maxPotion = new Heal("maxPotion", 50, 100);
const overdosePotion = new Heal("overdosePotion", 15, 25);

//everything
const allItems = [stick, knife, sword, lightsaber, basketball, pistol, blaster, sniper, miniPotion, healthPotion, maxPotion, overdosePotion];
let allItemsNames = [];
allItems.forEach((item) => {
    allItemsNames.push(item.name);
})
//now allItemsNames should be like ["stick", "knife", ...]

//all weapons 
const fullWeapons = [stick, knife, sword, lightsaber, basketball, pistol, blaster, sniper];
let allWeaponNames = [];
fullWeapons.forEach((item) => {
    allWeaponNames.push(item.name);
})

const tier1 = [stick, knife, sword, lightsaber, miniPotion, healthPotion];
const tier2 = [basketball, pistol, blaster, sniper, maxPotion, overdosePotion];

//all heals
const heals = [miniPotion, healthPotion, maxPotion, overdosePotion];
let allHealNames = ["mini", "health", "max", "overdose"]; //include shortcuts
heals.forEach((item) => {
    allHealNames.push(item.name);
})


module.exports = { 
    Weapon: Weapon, 
    allItems: allItems,
    allItemsNames: allItemsNames,
    tier1: tier1, 
    tier2: tier2,
    fullWeapons: fullWeapons,
    allWeaponNames: allWeaponNames,
    heals: heals,
    allHealNames: allHealNames,
}
