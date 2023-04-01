import BattleCharacter from "./BattleCharacter";
import { calculationsType, rating } from "../character/types";
import { randomIntFromInterval } from "../common/utils";

export const generateOponentByRating = (rating: rating): BattleCharacter => {
  const values = generateValues(rating);

  return new BattleCharacter({name: 'Shargath', ...values});
}

const generateValues = (rating: rating): calculationsType => {
  return {
    damage: {
      minDamage: randomIntFromInterval(5, 15),
      maxDamage: randomIntFromInterval(15, 30),
    },
    health:randomIntFromInterval(80, 150),
    hitChanse: randomIntFromInterval(35, 75),
    dodgeChanse: randomIntFromInterval(35, 75),
    mitigation: randomIntFromInterval(10, 30),
    initiative: randomIntFromInterval(1, 5)
  }
}
