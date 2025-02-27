import { query } from '@zengym/postgres';

export const diary = function({ day }) {
  return query(`
select
	uid,
	log_type,
	name,
	description,
	completed
from
	data.log
where
	day = $1
  `, [  day ]);
};

export const today = function() {
  return query(`
select
	case
		when log_type = 'FOOD' then 'nutrition'
		when log_type = 'ACTIVITY' then 'activities'
	end as log_type,
	count(uid) filter (where completed = true) AS completed,
	count(uid) filter (where completed = false) AS pending
from
	data.log
where
	day = now()
	and (
		log_type = 'FOOD'
		or
		log_type = 'ACTIVITY'
	)
group by
	log_type
  `).then(function(rows) {
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
