import BattleCharacter from "./BattleCharacter";
import { calculationsType, powerCalculations, rating, resilensCalculations } from "../character/types";
import { randomIntFromInterval } from "../common/utils";
import { DODGE_RESILENCE_COEFICIENT } from "../character/Character";

export const generateOponentByRating = (rating: rating): BattleCharacter => {
  const values = generateValues(rating);

  console.log('->>>>>>>>>>>>>>>> generateOponentByRating ', values);

  return new BattleCharacter({name: 'Shargath', ...values});
}

const generateValues = (rating: rating): calculationsType => {
  const { resilience, power} = rating;

  const {health, mitigation, dodgeChanse} = generateResilienceDependentValues(resilience);

  console.log('!!!!!!!!!!!!!!!!! generate initiative Values ', {
    iputResilience: resilience,
    resultResilence: Math.floor((health + mitigation) + (DODGE_RESILENCE_COEFICIENT * (dodgeChanse / 100))),
    resilenceValues: {health, mitigation, dodgeChanse},
  });

  const {hitChanse, initiative, damage: {minDamage, maxDamage}} = generatePowerDependentValues(power);

  console.log('!!!!!!!!!!!!!!!!! generate POWER Values ', {
    iputPower: power,
    resultPower: Math.floor((((minDamage + maxDamage) / 2) * (hitChanse / 100)) * initiative),
    powerValues: {hitChanse, initiative, minDamage, maxDamage}
  });

  return {
    // ...generateResilienceDependentValues(resilience),
    // ...generatePowerDependentValues(power)
    ...{health, mitigation, dodgeChanse},
    ...{hitChanse, initiative, damage: {minDamage, maxDamage}}
  };
}

const generateResilienceDependentValues = (resilience: number): resilensCalculations => {
  const dodgeChanse = randomIntFromInterval(10, 40);

  const maxHealthPlusMitigation = Math.floor(resilience - (DODGE_RESILENCE_COEFICIENT * (dodgeChanse / 100)));
  const mitigation = randomIntFromInterval(5, 25);
  const health = maxHealthPlusMitigation - mitigation;

  return {
    health,
    dodgeChanse,
    mitigation,
  }
}

const generatePowerDependentValues = (power: number): powerCalculations => {
  const initiative = randomIntFromInterval(4, 8);
  const hitChanse = randomIntFromInterval(55, 75);

  const damageMedian = (power / initiative) / (hitChanse / 100);
  const quoterDamage = damageMedian / 4;
  const minDamage = Math.floor(damageMedian - quoterDamage);
  const maxDamage = Math.floor(damageMedian + quoterDamage);

  return {
    hitChanse,
    initiative,
    damage: {
      minDamage,
      maxDamage,
    }
  }
}
