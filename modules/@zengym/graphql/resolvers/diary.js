import { query } from '@zengym/postgres';
import { ask } from '@zengym/llm';

export const searchFood = function({ picture }, { user }) {
  return ask({
    system: `
reply with nutrition facts of 100g of the food you receive as prompt using this JSON schema:
{ "code": string, "generic_name": string, "product_name": string, "brands": string, "food_carbohydrates": float, "food_fats": float, "food_proteins": float, "food_alcohol": float, "food_calories": integer }.
don't put the json in an array.
don't add any unit.
always use 2 decimals for float values.
if you don't find any food, do not return any object, but instead return the null value.
code, generic_name, product_name and brands must be in a format I can lately use them to query on openfood facts database.
all the numeric values must be not null.
code is the barcode of the product. if you can't provide any bar code for the product, set a null value.
if the input is a picture and in the picture a nutritional table is present, use that as data source, otherwise return a realistic estimation.
product name is the commercial name of the product. if the food is generic, just put a null value.
brands is the name of the producer of the food. if the food is generic, just put a null value.
each word in the generic name must have the first letter capitalized.
ensure that (food_carbohydrates * 4) + (food_fats * 9) + (food_proteins * 4) + (food_alcohol * 7) = food_calories.
    `,
    request: `a chicken brest`
  }).then(function(response) {
    console.log(response);

    return [];
  });
};

export const diary = function({ day }, { user }) {
  return query(`
select
	uid,
	log_type,
	name,
  food_quantity,
  food_calories,
  (food_quantity + food_calories) as total_food_calories,
	meta,
	completed
from
	data.log_unified
where
	day = $1 and
  owner = $2
order by
  completed,
  created_at desc
  `, [ day, user.uid ]);
};

export const today = function({ day }, { user }) {
  return query(`
select
	case
		when log_type = 'FOOD' then 'nutrition'
		when log_type = 'ACTIVITY' then 'activities'
	end as log_type,
	count(uid) filter (where completed = true) AS completed,
	count(uid) filter (where completed = false) AS pending,
  count(uid) as total
from
	data.log_unified
where
	day = $1 and (
		log_type = 'FOOD' or
		log_type = 'ACTIVITY'
	) and
  owner = $2
group by
	log_type
  `, [ day, user.uid ]).then(function(rows) {
    return rows.reduce(function(main, row) {
      const { log_type, ...todayRow } = row;

      main[log_type] = todayRow;

      return main;
    }, {
      nutrition: {
        total: 0,
        completed: 0,
        pending: 0
      },
      activities: {
        total: 0,
        completed: 0,
        pending: 0
      }
    })
  });
};
