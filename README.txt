SPECTRE: BLACKSITE — Assets for your HTML RPG

All PNGs are 512 x 512 pixels.

INSTALLATION
1. Unzip the package.
2. Copy the PNG and MP3 files next to index.html, styles.css and app.js.
3. Your current HTML uses src="forward_base.png" and src="attackSound.mp3" etc, so these file paths will resolve without changes when the files sit beside index.html.
4. Images other than forward_base.png will only appear if your app.js references their filenames. Sound effects will only play if your app.js calls the matching audio IDs.

IMAGES
forward_base.png — base/start
armory.png — shop
underground_bunker.png — bunker
enemy_stronghold.png — stronghold
spectre_operator.png / spectre_operator_alt.png — player portraits
pmc_mercenary.png / pmc_mercenary_alt.png — PMC enemies
hooded_sniper_in_red_smoke.png — sniper
armoured_tactical_soldier_in_red_fog.png — armored enemy
futuristic_tactical_operator_in_red_haze.png — electronic warfare / specialist
red_accented_tactical_commander.png — commander

SOUNDS (original digitally synthesized effects)
attackSound.mp3 — short combat impact
damageSound.mp3 — taking damage
victorySound.mp3 — win jingle
defeatSound.mp3 — loss jingle

Note: HTML text does not automatically replace filenames in app.js; update that file separately if its code uses different assets.
