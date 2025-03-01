import { query } from '@zengym/postgres';

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

export const today = function(_, { user }) {
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
	day = current_date and (
		log_type = 'FOOD' or
		log_type = 'ACTIVITY'
	) and
  owner = $1
group by
	log_type
  `, [ user.uid ]).then(function(rows) {
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
