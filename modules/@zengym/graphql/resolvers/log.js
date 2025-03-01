import { v4 as uuid } from 'uuid';
import { query } from '@zengym/postgres';

// We use append only technique so we can rebuild the entire history of each item
export const log = function({ logInput }, { user }) {
  logInput.uid = logInput.uid || uuid();
  logInput.owner = user.uid;

  return query(`
insert into data.log (
  uid,
  owner,
  day,
  log_type,
  name,
  meta,
  weight,
  body_fat_percentage,
  resting_calories,
  active_calories,
  food_quantity,
  food_calories,
  food_proteins,
  food_carbohydrates,
  food_fats,
  food_alcohol,
  protein_target_index,
  fats_target_index,
  target_calories_delta,
  completed
) values (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8,
  $9,
  $10,
  $11,
  $12,
  $13,
  $14,
  $15,
  $16,
  $17,
  $18,
  $19,
  $20
) returning uid
  `, [
    logInput.uid,
    logInput.owner,
    logInput.day,
    logInput.log_type,
    logInput.name,
    logInput.meta,
    logInput.weight,
    logInput.body_fat_percentage,
    logInput.resting_calories,
    logInput.active_calories,
    logInput.food_quantity,
    logInput.food_calories,
    logInput.food_proteins,
    logInput.food_carbohydrates,
    logInput.food_fats,
    logInput.food_alcohol,
    logInput.protein_target_index,
    logInput.fats_target_index,
    logInput.target_calories_delta,
    logInput.completed
  ]).then(function([ { uid } ]) {
    return uid;
  });
};
