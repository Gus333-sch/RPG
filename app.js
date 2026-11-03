

 // ==========================================
 // SPECTRE: BLACKSITE - VERSION 2.0
 // ==========================================

 // 1. PLAYER STATISTICS

 let xp = 0;
 let health = 100;
 let gold = 50;
 let currentWeapon = 0;
 let armorLevel = 0;
 let medkits = 2;
 let currentMonster = 0;
 let monsterHealth = 0;
 let inCombat = false;

 const maxHealth = 100;

 // 2. HTML ELEMENTS

 const text = document.querySelector("#text");
 const xpText = document.querySelector("#xpText");
 const healthText = document.querySelector("#healthText");
 const goldText = document.querySelector("#goldText");

 const monsterStats = document.querySelector("#monsterStats");
 const monsterName = document.querySelector("#monsterName");
 const monsterHealthText = document.querySelector("#monsterHealth");
 const image = document.querySelector("#img");

 const controls = document.querySelector("#controls");

 // Keep original buttons and add two more

 const buttons = [
   document.querySelector("#button1"),
   document.querySelector("#button2"),
   document.querySelector("#button3"),
   document.querySelector("#button4")
 ];

 for (let i = 5; i <= 6; i++) {
   const button = document.createElement("button");
   button.id = "button" + i;
   controls.appendChild(button);
   buttons.push(button);
 }

 // 3. WEAPONS

 const weapons = [
   { name: "Combat Knife", power: 8, price: 0 },
   { name: "Suppressed Pistol", power: 20, price: 50 },
   { name: "MP5 SMG", power: 35, price: 100 },
   { name: "M4 Carbine", power: 55, price: 170 },
   { name: "HK416 Rifle", power: 80, price: 260 },
   { name: "MK18 Rifle", power: 110, price: 400 },
   { name: "SCAR-H", power: 150, price: 600 },
   { name: "DMR", power: 200, price: 850 },
   { name: "Anti-Materiel Rifle", power: 260, price: 1200 },
   { name: "Experimental Rifle", power: 340, price: 1700 }
 ];

 // 4. ARMOR

 const armors = [
   { name: "No Armor", reduction: 0, price: 0 },
   { name: "Light Vest", reduction: 0.15, price: 120 },
   { name: "Plate Carrier", reduction: 0.28, price: 300 },
   { name: "Heavy Armor", reduction: 0.40, price: 650 }
 ];

 // 5. ENEMIES AND BOSSES

 const monsters = [
   {
     name: "PMC Scout",
     picture: "pmc_mercenary.png",
     health: 40,
     damage: 6,
     xp: 8,
     reward: 35,
     requiredValor: 0,
     boss: false
   },
   {
     name: "PMC Raider",
     picture: "pmc_mercenary_alt.png",
     health: 85,
     damage: 11,
     xp: 15,
     reward: 65,
     requiredValor: 0,
     boss: false
   },
   {
     name: "PMC Sniper",
     picture: "hooded_sniper_in_red_smoke.png",
     health: 130,
     damage: 17,
     xp: 24,
     reward: 95,
     requiredValor: 0,
     boss: false
   },
   {
     name: "PMC Heavy",
     picture: "armoured_tactical_soldier_in_red_fog.png",
     health: 200,
     damage: 23,
     xp: 35,
     reward: 140,
     requiredValor: 0,
     boss: false
   },
   {
     name: "BOSS: Bunker Warden",
     picture: "armoured_tactical_soldier_in_red_fog.png",
     health: 320,
     damage: 28,
     xp: 60,
     reward: 250,
     requiredValor: 25,
     boss: true
   },
   {
     name: "BOSS: Blacksite Specialist",
     picture: "futuristic_tactical_operator_in_red_haze.png",
     health: 480,
     damage: 35,
     xp: 85,
     reward: 400,
     requiredValor: 70,
     boss: true
   },
   {
     name: "BOSS: Shadow Hunter",
     picture: "hooded_sniper_in_red_smoke.png",
     health: 700,
     damage: 43,
     xp: 125,
     reward: 650,
     requiredValor: 140,
     boss: true
   },
   {
     name: "FINAL BOSS: PMC Commander",
     picture: "red_accented_tactical_commander.png",
     health: 1100,
     damage: 52,
     xp: 200,
     reward: 1000,
     requiredValor: 250,
     boss: true
   }
 ];

 // 6. SOUND EFFECTS

 function playSound(id) {
   const sound = document.getElementById(id);

   if (sound) {
     sound.currentTime = 0;
     sound.play().catch(() => {});
   }
 }

 // 7. GAME INTERFACE

 function showScreen(description, picture, choices) {
   inCombat = false;
   monsterStats.style.display = "none";

   text.innerText = description;

   if (picture) {
     image.src = picture;
   }

   setButtons(choices);
 }

 function setButtons(choices) {
   buttons.forEach((button, i) => {
     if (choices[i]) {
       button.style.display = "";
       button.innerText = choices[i][0];
       button.onclick = choices[i][1];
     } else {
       button.style.display = "none";
       button.onclick = null;
     }
   });
 }

 function updateStats() {
   xpText.innerText = xp;
   healthText.innerText = Math.max(0, health);
   goldText.innerText = gold;
 }

 function message(value) {
   text.innerText = value;
 }

 // 8. FORWARD OPERATING BASE

 function goTown() {
   showScreen(
     "SPECTRE FORWARD OPERATING BASE\n\n" +
     "Welcome back, Operator.\n" +
     "Current weapon: " + weapons[currentWeapon].name + "\n" +
     "Armor: " + armors[armorLevel].name + "\n" +
     "Medkits: " + medkits + "\n\n" +
     "Select your next operation.",
     "forward_base.png",
     [
       ["Armory", goShop],
       ["Bunker", goCave],
       ["PMC Outpost", goOutpost],
       ["Research Lab", goLab],
       ["Stronghold", goCastle],
       ["Command Center", goCommand]
     ]
   );
 }

 // 9. ARMORY

 function goShop() {
   const next = weapons[currentWeapon + 1];
   const nextArmor = armors[armorLevel + 1];

   showScreen(
     "SPECTRE ARMORY\n\n" +
     "Weapon: " + weapons[currentWeapon].name + "\n" +
     "Armor: " + armors[armorLevel].name + "\n" +
     "Medkits: " + medkits + "\n\n" +
     "Available Credits: " + gold,
     "armory.png",
     [
       ["Buy Medkit (30)", buyMedkit],
       [
         next ? "Weapon Upgrade (" + next.price + ")" : "Max Weapon",
         buyWeapon
       ],
       [
         nextArmor ? "Armor Upgrade (" + nextArmor.price + ")" : "Max Armor",
         buyArmor
       ],
       ["Heal (20)", buyHealth],
       ["Equipment Info", equipmentInfo],
       ["Return to Base", goTown]
     ]
   );
 }

 function buyMedkit() {
   if (gold >= 30) {
     gold -= 30;
     medkits++;
     updateStats();
     goShop();
     message("Medkit purchased!\nYou now have " + medkits + " medkits.");
   } else {
     message("ARMORY: Insufficient Credits for a medkit.");
   }
 }

 function buyWeapon() {
   if (currentWeapon >= weapons.length - 1) {
     message("You already have the strongest weapon!");
     return;
   }

   const next = weapons[currentWeapon + 1];

   if (gold >= next.price) {
     gold -= next.price;
     currentWeapon++;
     updateStats();
     goShop();
     message("WEAPON UNLOCKED\n" + next.name +
       "\nDamage: " + next.power);
   } else {
     message("Not enough Credits!\nRequired: " + next.price);
   }
 }

 function buyArmor() {
   if (armorLevel >= armors.length - 1) {
     message("You already have the best armor!");
     return;
   }

   const next = armors[armorLevel + 1];

   if (gold >= next.price) {
     gold -= next.price;
     armorLevel++;
     updateStats();
     goShop();
     message("ARMOR UNLOCKED\n" + next.name +
       "\nDamage reduction: " +
       Math.round(next.reduction * 100) + "%");
   } else {
     message("Not enough Credits!\nRequired: " + next.price);
   }
 }

 function buyHealth() {
   if (gold >= 20 && health < maxHealth) {
     gold -= 20;
     health = Math.min(maxHealth, health + 30);
     updateStats();
     message("Medical treatment completed.\nHealth: " + health);
   } else {
     message("Not enough Credits, or health is already full.");
   }
 }

 function equipmentInfo() {
   message(
     "OPERATOR EQUIPMENT\n\n" +
     "Weapon: " + weapons[currentWeapon].name + "\n" +
     "Weapon Damage: " + weapons[currentWeapon].power + "\n" +
     "Armor: " + armors[armorLevel].name + "\n" +
     "Damage Reduction: " +
     Math.round(armors[armorLevel].reduction * 100) + "%\n" +
     "Medkits: " + medkits + "\n" +
     "Valor: " + xp
   );
 }

 // 10. BUNKER

 function goCave() {
   showScreen(
     "UNDERGROUND BUNKER\n\n" +
     "Hostile activity detected inside the facility.\n" +
     "A heavily armored Warden controls this sector.",
     "underground_bunker.png",
     [
       ["Fight Scout", () => startFight(0)],
       ["Fight Raider", () => startFight(1)],
       ["Fight Warden", () => startFight(4)],
       ["PMC Outpost", goOutpost],
       ["Armory", goShop],
       ["Return to Base", goTown]
     ]
   );
 }

 // 11. PMC OUTPOST

 function goOutpost() {
   showScreen(
     "HOSTILE PMC OUTPOST\n\n" +
     "Enemy patrols are defending the area.\n" +
     "Scouts, raiders, and snipers have been spotted.",
     "enemy_stronghold.png",
     [
       ["Fight Scout", () => startFight(0)],
       ["Fight Raider", () => startFight(1)],
       ["Fight Sniper", () => startFight(2)],
       ["Fight Heavy", () => startFight(3)],
       ["Research Lab", goLab],
       ["Return to Base", goTown]
     ]
   );
 }

 // 12. RESEARCH LAB

 function goLab() {
   showScreen(
     "CLASSIFIED RESEARCH LAB\n\n" +
     "An experimental military program has been discovered.\n" +
     "The Blacksite Specialist is guarding classified data.",
     "underground_bunker.png",
     [
       ["Fight Raider", () => startFight(1)],
       ["Fight Sniper", () => startFight(2)],
       ["Fight Heavy", () => startFight(3)],
       ["Fight Specialist", () => startFight(5)],
       ["Stronghold", goCastle],
       ["Return to Base", goTown]
     ]
   );
 }

 // 13. STRONGHOLD

 function goCastle() {
   showScreen(
     "ENEMY STRONGHOLD\n\n" +
     "You have entered a fortified PMC compound.\n" +
     "Elite hostile units control the perimeter.",
     "enemy_stronghold.png",
     [
       ["Fight Sniper", () => startFight(2)],
       ["Fight Heavy", () => startFight(3)],
       ["Fight Warden", () => startFight(4)],
       ["Fight Specialist", () => startFight(5)],
       ["Fight Shadow Hunter", () => startFight(6)],
       ["Return to Base", goTown]
     ]
   );
 }

 // 14. FINAL COMMAND CENTER

 function goCommand() {
   showScreen(
     "BLACKSITE COMMAND CENTER\n\n" +
     "The final PMC command facility has been located.\n" +
     "You must reach 250 Valor to challenge the Commander.\n\n" +
     "Current Valor: " + xp,
     "enemy_stronghold.png",
     [
       ["Fight Heavy", () => startFight(3)],
       ["Fight Warden", () => startFight(4)],
       ["Fight Specialist", () => startFight(5)],
       ["Fight Hunter", () => startFight(6)],
       ["FINAL BOSS", () => startFight(7)],
       ["Return to Base", goTown]
     ]
   );
 }

 // 15. START FIGHT

 function startFight(index) {
   const enemy = monsters[index];

   if (xp < enemy.requiredValor) {
     message(
       "MISSION LOCKED\n\n" +
       enemy.name + " requires " +
       enemy.requiredValor + " Valor.\n" +
       "Your Valor: " + xp
     );
     return;
   }

   currentMonster = index;
   monsterHealth = enemy.health;

   inCombat = true;
   image.src = enemy.picture;

   monsterStats.style.display = "block";
   monsterName.innerText = enemy.name;
   monsterHealthText.innerText = monsterHealth;

   message(
     "HOSTILE CONTACT!\n\n" +
     enemy.name + "\n" +
     "Enemy Health: " + enemy.health +
     "\nYour Weapon: " + weapons[currentWeapon].name
   );

   setButtons([
     ["Attack", attack],
     ["Aimed Shot", aimedShot],
     ["Dodge", dodge],
     ["Take Cover", block],
     ["Medkit (" + medkits + ")", useMedkit],
     ["Retreat", retreat]
   ]);
 }

 // 16. ENEMY COUNTERATTACK

 function enemyTurn(defense = 0) {
   const enemy = monsters[currentMonster];

   // 12% chance of an enemy critical hit
   const critical = Math.random() < 0.12;

   let damage = enemy.damage;

   if (critical) {
     damage = Math.ceil(damage * 1.5);
   }

   // Armor reduces incoming damage
   damage *= (1 - armors[armorLevel].reduction);

   // Cover or successful dodge reduces damage further
   damage *= (1 - defense);

   damage = Math.max(0, Math.ceil(damage));

   health -= damage;
   updateStats();

   const result = critical ? " CRITICAL HIT!" : "";

   text.innerText +=
     "\n\nEnemy returns fire: " +
     damage + " damage." + result;

   if (health <= 0) {
     health = 0;
     updateStats();
     lose();
   }
 }

 // 17. STANDARD ATTACK

 function attack() {
   if (!inCombat) return;

   const weapon = weapons[currentWeapon];

   // Random damage variation
   const variation = 0.85 + Math.random() * 0.3;

   const damage = Math.ceil(
     weapon.power * variation
   );

   monsterHealth -= damage;
   playSound("attackSound");

   message(
     "You attack using your " +
     weapon.name + "!\nDamage dealt: " + damage
   );

   finishPlayerAttack();
 }

 // 18. AIMED SHOT

 function aimedShot() {
   if (!inCombat) return;

   const weapon = weapons[currentWeapon];

   // 70% chance to hit
   if (Math.random() < 0.7) {
     const damage = Math.ceil(weapon.power * 1.8);

     monsterHealth -= damage;
     playSound("attackSound");

     message(
       "PRECISION HIT!\n" +
       "You deal " + damage + " damage."
     );
   } else {
     message("AIMED SHOT MISSED!\nEnemy remains active.");
   }

   finishPlayerAttack();
 }

 function finishPlayerAttack() {
   monsterHealthText.innerText = Math.max(0, monsterHealth);

   if (monsterHealth <= 0) {
     defeatMonster();
     return;
   }

   enemyTurn();
 }

 // 19. DODGE

 function dodge() {
   if (!inCombat) return;

   if (Math.random() < 0.7) {
     message("SUCCESSFUL DODGE!\nYou evade incoming fire.");
     enemyTurn(1);
   } else {
     message("DODGE FAILED!\nYou are exposed.");
     enemyTurn();
   }
 }

 // 20. TAKE COVER

 function block() {
   if (!inCombat) return;

   message(
     "You take cover behind a reinforced position.\n" +
     "Incoming damage reduced."
   );

   enemyTurn(0.55);
 }

 // 21. MEDKIT IN COMBAT

 function useMedkit() {
   if (!inCombat) return;

   if (medkits <= 0) {
     message("NO MEDKITS REMAINING!");
     return;
   }

   if (health >= maxHealth) {
     message("Health is already full.");
     return;
   }

   medkits--;

   const restored = Math.min(40, maxHealth - health);
   health += restored;

   updateStats();

   message(
     "MEDKIT USED!\n" +
     "Restored " + restored + " health.\n" +
     "Remaining medkits: " + medkits
   );

   // Using a medkit consumes a combat turn
   enemyTurn();

   if (inCombat) {
     refreshCombatButtons();
   }
 }

 function refreshCombatButtons() {
   setButtons([
     ["Attack", attack],
     ["Aimed Shot", aimedShot],
     ["Dodge", dodge],
     ["Take Cover", block],
     ["Medkit (" + medkits + ")", useMedkit],
     ["Retreat", retreat]
   ]);
 }

 // 22. RETREAT

 function retreat() {
   if (!inCombat) return;

   inCombat = false;

   // Retreat penalty
   gold = Math.max(0, gold - 10);
   updateStats();

   goTown();

   message(
     "TACTICAL RETREAT COMPLETE.\n" +
     "You have returned to base.\n" +
     "Retreat cost: 10 Credits."
   );
 }

 // 23. DEFEAT ENEMY

 function defeatMonster() {
   const enemy = monsters[currentMonster];

   inCombat = false;

   xp += enemy.xp;
   gold += enemy.reward;

   playSound("victorySound");
   updateStats();

   // Final boss victory
   if (currentMonster === 7) {
     winGame();
     return;
   }

   showScreen(
     "MISSION SUCCESSFUL!\n\n" +
     enemy.name + " defeated.\n\n" +
     "Valor gained: +" + enemy.xp + "\n" +
     "Credits earned: +" + enemy.reward + "\n\n" +
     "You can return to base and upgrade your equipment.",
     "spectre_operator.png",
     [
       ["Return to Base", goTown],
       ["Visit Armory", goShop],
       ["Bunker", goCave],
       ["Outpost", goOutpost],
       ["Stronghold", goCastle],
       ["Command Center", goCommand]
     ]
   );
 }

 // 24. PLAYER DEFEAT

 function lose() {
   inCombat = false;
   playSound("defeatSound");

   showScreen(
     "OPERATION FAILED\n\n" +
     "Your operator has been defeated.\n" +
     "All progress has been lost.\n\n" +
     "Restart your deployment to try again.",
     "forward_base.png",
     [
       ["Restart Game", restart]
     ]
   );
 }

 // 25. FINAL VICTORY

 function winGame() {
   playSound("victorySound");

   showScreen(
     "OPERATION BLACKSITE COMPLETE!\n\n" +
     "The PMC Commander has been defeated.\n" +
     "The enemy command network has collapsed.\n\n" +
     "FINAL VALOR: " + xp + "\n" +
     "FINAL CREDITS: " + gold + "\n\n" +
     "Congratulations, Operator.",
     "spectre_operator.png",
     [
       ["Play Again", restart],
       ["Return to Base", goTown]
     ]
   );
 }

 // 26. RESTART GAME

 function restart() {
   xp = 0;
   health = 100;
   gold = 50;
   currentWeapon = 0;
   armorLevel = 0;
   medkits = 2;
   currentMonster = 0;
   monsterHealth = 0;
   inCombat = false;

   updateStats();
   goTown();
 }

 // 27. INITIALIZE GAME

 updateStats();
 goTown();

