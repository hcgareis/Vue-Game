const app = Vue.createApp({
  data() {
    return {
      playerSelection: true,
      characters: [
        {
          id: 0,
          img: 'imgs/warrior.jpg',
          class: 'Warrior',
          attackName: 'Spear',
          attackPower: 5,
          spAttack: 'Spear Throw',
          spAttackPower: 10,
          spAttackDivisor: 3,
          health: 100
        },
        {
          id: 1,
          img: 'imgs/archer.jpg',
          class: 'Archer',
          attackName: 'Bow & Arrow',
          attackPower: 3,
          spAttack: 'Flaming Arrow',
          spAttackPower: 11,
          spAttackDivisor: 2,
          health: 95
        },
        {
          id: 2,
          img: 'imgs/berserker.jpg',
          class: 'Berserker',
          attackName: 'Hammer',
          attackPower: 8,
          spAttack: 'Power Smash',
          spAttackPower: 15,
          spAttackDivisor: 5,
          health: 110
        },
        {
          id: 3,
          img: 'imgs/mage.jpg',
          class: 'Mage',
          attackName: 'Fireball',
          attackPower: 4,
          spAttack: 'Volcano',
          spAttackPower: 18,
          spAttackDivisor: 4,
          health: 90
        }
      ],
      opponents: [
        {
          id: 0,
          img: 'imgs/dragon.jpg',
          class: 'Dragon',
          attackName: 'Fire Breath',
          attackPower: 8,
          health: 100
        }
      ],
      turn: 0,
      canAct: true,
      battleLog: [],
      player: [],
      monster: [],
      pHealth: "100",
      mHealth: "100",
      attackAvail: "",
      spAttackAvail: "grey",
      healAvail: "grey",
      surrenderAvail: "",
    }
  },
  watch: {
    turn() {
      this.canAct = true;
      this.attackAvail = "";
      if (this.turn % this.player.spAttackDivisor === 0) {
        this.spAttackAvail = "";
      }
      if (Math.random() >= 0.75) {
        this.healAvail = "";
      }
    },
    canAct() {
      if (this.canAct === false) {
        this.attackAvail = "grey";
        this.spAttackAvail = "grey";
        this.healAvail = "grey";
        this.surrenderAvail = "grey";
      }
      if (this.canAct === true) {
        this.surrenderAvail="";
      }
    },
    pHealth() {
      if (this.pHealth <= 0) {
        alert("Game Over! Player lost.");
        location.reload();
      }
    },
    mHealth() {
      if (this.mHealth <= 0) {
        alert("You defeated the monster!");
        location.reload();
      }
    }
  },
  methods: {
    select(id) {
      this.player = this.characters[id];
      this.monster = this.opponents[0];
      this.playerSelection = false;
    },
    pAttack() {
      if(this.attackAvail === "" && this.canAct === true) {
        this.battleLog = [];
        this.canAct = false;
        pwr = this.player.attackPower;
        const calcDamage = Math.random() * ((pwr+3) - (pwr-2)) + (pwr-2);
        const damage = Math.ceil(calcDamage);
        this.mHealth = this.mHealth - damage;
        this.battleLog.unshift(`Player attacked with ${this.player.attackName} for ${damage} damage`);
        setTimeout(() => this.mAttack(), 1000);
      }
    },
    spAttack() {
      if (this.spAttackAvail === "" && this.canAct === true) {
        this.battleLog = [];
        this.canAct = false;
        pwr = this.player.spAttackPower;
        const calcDamage = Math.random() * ((pwr+3) - (pwr-2)) + (pwr-2);
        const damage = Math.ceil(calcDamage);
        this.mHealth = this.mHealth - damage;
        this.battleLog.unshift(`Player attacked with ${this.player.spAttack} for ${damage} damage`);
        setTimeout(() => this.mAttack(), 1000);
      }
    },
    heal() {
      if (this.healAvail === "" && this.canAct === true) {
        this.battleLog = [];
        this.canAct = false;
        this.pHealth = this.pHealth + 15;
        this.battleLog.unshift(`Player healed themselves by 15 points`)
        setTimeout(() => this.mAttack(), 1000);
      }
    },
    mAttack() {
      pwr = this.monster.attackPower;
      const calcDamage = Math.random() * ((pwr+3) - (pwr-2)) + (pwr-2);
      const damage = Math.floor(calcDamage);
      this.pHealth = this.pHealth - damage;
      this.battleLog.unshift(`Monster attacked with ${this.monster.attackName} for ${damage} damage`);
      setTimeout(() => {
        this.turn = this.turn + 1;
      }, 1000);
    },
    surrender() {
      alert("You have surrendered! Reloading page...");
      location.reload();
    },
    textType(i) {
      if (i.includes("Player")) {
        return "green";
      } else {
        return "red";
      }
    }
  }
});

app.mount('#main');