
 // ==========================================
 // SPECTRE: BLACKSITE - TACTICAL RPG
 // ==========================================

 // 1. PLAYER VARIABLES

 let xp = 0;
 let health = 100;
 let gold = 50;
 let currentWeapon = 0;
 let currentMonster = 0;
 let monsterHealth = 0;

 // 2. HTML ELEMENTS

 const button1 = document.querySelector("#button1");
 const button2 = document.querySelector("#button2");
 const button3 = document.querySelector("#button3");
 const button4 = document.querySelector("#button4");

 const text = document.querySelector("#text");
 const xpText = document.querySelector("#xpText");
 const healthText = document.querySelector("#healthText");
 const goldText = document.querySelector("#goldText");

 const monsterStats = document.querySelector("#monsterStats");
 const monsterName = document.querySelector("#monsterName");
 const monsterHealthText = document.querySelector("#monsterHealth");
 const image = document.querySelector("#img");

 // 3. WEAPONS

 const weapons = [
   { name: "Combat Knife", power: 5 },
   { name: "Suppressed Pistol", power: 30 },
   { name: "SMG", power: 50 },
   { name: "Assault Rifle", power: 100 },
   { name: "Marksman Rifle", power: 300 },
   { name: "Advanced Carbine", power: 400 }
 ];

 // 4. ENEMIES

 const monsters = [
   {
     name: "PMC Scout",
     picture: "pmc_mercenary.png",
     level: 2,
     health: 15
   },
   {
     name: "PMC Heavy",
     picture: "armoured_tactical_soldier_in_red_fog.png",
     level: 10,
     health: 100
   },
   {
     name: "Blacksite Specialist",
     picture: "futuristic_tactical_operator_in_red_haze.png",
     level: 50,
     health: 400
   },
   {
     name: "PMC Commander",
     picture: "red_accented_tactical_commander.png",
     level: 100,
     health: 1000
   }
 ];

 // 5. LOCATIONS

 const locations = {
   town: {
     buttonText: [
       "Go to Armory",
       "Enter Bunker",
       "Enemy Stronghold",
       "Fight Commander"
     ],
     buttonFunctions: [
       goShop, goCave, goCastle, fightWalker
     ],
     text: "SPECTRE FORWARD OPERATING BASE. Welcome, Operator. Hostile PMC forces have been detected. Select your next operation.",
     picture: "forward_base.png"
   },

   shop: {
     buttonText: [
       "Buy Medkit (10 Credits)",
       "Upgrade Weapon (50 Credits)",
       "Return to Base",
       "Return to Base"
     ],
     buttonFunctions: [
       buyHealth, buyWeapon, goTown, goTown
     ],
     text: "SPECTRE ARMORY. Purchase medical supplies or upgrade your weapon before your next operation.",
     picture: "armory.png"
   },

   cave: {
     buttonText: [
       "Engage PMC Scout",
       "Go to Stronghold",
       "Visit Armory",
       "Return to Base"
     ],
     buttonFunctions: [
       fightKennedy, goCastle, goShop, goTown
     ],
     text: "UNDERGROUND BUNKER. You enter a classified military bunker. A hostile PMC scout is guarding the facility.",
     picture: "underground_bunker.png"
   },

   castle: {
     buttonText: [
       "Engage PMC Heavy",
       "Engage Specialist",
       "Fight Commander",
       "Return to Base"
     ],
     buttonFunctions: [
       fightHarold, fightToth, fightWalker, goTown
     ],
     text: "ENEMY STRONGHOLD. Multiple hostile PMC units have been detected. Choose your target carefully.",
     picture: "enemy_stronghold.png"
   },

   fight: {
     buttonText: [
       "Attack",
       "Dodge",
       "Take Cover",
       "Retreat"
     ],
     buttonFunctions: [
       attack, dodge, block, goTown
     ],
     text: "CONTACT! You are engaging a hostile enemy."
   },

   defeated: {
     buttonText: [
       "Return to Base",
       "Return to Base",
       "Return to Base",
       "Return to Base"
     ],
     buttonFunctions: [
       goTown, goTown, goTown, goTown
     ],
     text: "TARGET NEUTRALIZED. Mission successful. You have earned Valor and Credits.",
     picture: "spectre_operator.png"
   },

   lose: {
     buttonText: [
       "Restart Mission",
       "Restart Mission",
       "Restart Mission",
       "Restart Mission"
     ],
     buttonFunctions: [
       restart, restart, restart, restart
     ],
     text: "MISSION FAILED. Your operator has been defeated. Restart to try again.",
     picture: "forward_base.png"
   },

   win: {
     buttonText: [
       "Play Again",
       "Play Again",
       "Play Again",
       "Play Again"
     ],
     buttonFunctions: [
       restart, restart, restart, restart
     ],
     text: "OPERATION BLACKSITE COMPLETE. The PMC Commander has been defeated. Congratulations, Operator!",
     picture: "spectre_operator.png"
   }
 };

 // 6. UPDATE GAME SCREEN

 function update(location) {
   monsterStats.style.display = "none";

   button1.innerText = location.buttonText[0];
   button2.innerText = location.buttonText[1];
   button3.innerText = location.buttonText[2];
   button4.innerText = location.buttonText[3];

   button1.onclick = location.buttonFunctions[0];
   button2.onclick = location.buttonFunctions[1];
   button3.onclick = location.buttonFunctions[2];
   button4.onclick = location.buttonFunctions[3];

   text.innerText = location.text;

   if (location.picture && image) {
     image.src = location.picture;
   }
 }

 // 7. MOVEMENT

 function goTown() {
   update(locations.town);
 }

 function goShop() {
   update(locations.shop);
 }

 function goCave() {
   update(locations.cave);
 }

 function goCastle() {
   update(locations.castle);
 }

 // 8. ARMORY

 function buyHealth() {
   if (gold >= 10) {
     gold -= 10;
     health += 10;
     updateStats();
     text.innerText = "Medkit purchased. Restored 10 health.";
   } else {
     text.innerText = "Insufficient Credits!";
   }
 }

 function buyWeapon() {
   if (currentWeapon < weapons.length - 1 && gold >= 50) {
     gold -= 50;
     currentWeapon++;
     updateStats();
     text.innerText = "Weapon unlocked: " +
       weapons[currentWeapon].name + "!";
   } else if (currentWeapon === weapons.length - 1) {
     text.innerText = "You already have the best weapon!";
   } else {
     text.innerText = "Insufficient Credits!";
   }
 }

 // 9. START COMBAT

 function fightKennedy() {
   startFight(0);
 }

 function fightHarold() {
   startFight(1);
 }

 function fightToth() {
   startFight(2);
 }

 function fightWalker() {
   startFight(3);
 }

 function startFight(monsterIndex) {
   currentMonster = monsterIndex;
   monsterHealth = monsters[currentMonster].health;

   update(locations.fight);
   monsterStats.style.display = "block";

   monsterName.innerText = monsters[currentMonster].name;
   monsterHealthText.innerText = monsterHealth;

   if (image) {
     image.src = monsters[currentMonster].picture;
   }
 }

 // 10. ATTACK

 function attack() {
   const weapon = weapons[currentWeapon];

   monsterHealth -= weapon.power;

   text.innerText = "You attack " +
     monsters[currentMonster].name +
     " using your " + weapon.name + "!";

   if (monsterHealth <= 0) {
     defeatMonster();
     return;
   }

   const damage = monsters[currentMonster].level * 2;
   health -= damage;

   text.innerText +=
     " The enemy returns fire for " + damage + " damage.";

   updateStats();
   monsterHealthText.innerText = monsterHealth;

   if (health <= 0) {
     lose();
   }
 }

 // 11. DODGE

 function dodge() {
   text.innerText = "You successfully evade enemy fire!";
 }

 // 12. TAKE COVER

 function block() {
   const damage = monsters[currentMonster].level * 2;
   const reducedDamage = Math.ceil(damage / 2);

   health -= reducedDamage;

   text.innerText =
     "You take cover and receive only " +
     reducedDamage + " damage!";

   updateStats();

   if (health <= 0) {
     lose();
   }
 }

 // 13. DEFEAT ENEMY

 function defeatMonster() {
   const monster = monsters[currentMonster];

   xp += monster.level;
   gold += monster.level * 10;

   updateStats();

   if (currentMonster === 3) {
     update(locations.win);
   } else {
     update(locations.defeated);
   }
 }

 // 14. GAME OVER

 function lose() {
   update(locations.lose);
 }

 // 15. RESTART

 function restart() {
   xp = 0;
   health = 100;
   gold = 50;
   currentWeapon = 0;
   currentMonster = 0;
   monsterHealth = 0;

   updateStats();
   goTown();
 }

 // 16. UPDATE STATISTICS

 function updateStats() {
   xpText.innerText = xp;
   healthText.innerText = health;
   goldText.innerText = gold;
 }

 // 17. START GAME

 updateStats();
 goTown();
