begin;

create schema if not exists data;

create table if not exists data.log (
  uid uuid not null,
  owner uuid not null,
  created_at timestamp not null default now(),

  day date,
  log_type text,

  name text,
  meta jsonb,

  weight float,
  body_fat_percentage integer,

  resting_calories integer,
  active_calories integer,

  food_quantity float,
  food_calories integer,
  food_proteins float,
  food_carbohydrates float,
  food_fats float,
  food_alcohol float,

  protein_target_index float,
  fats_target_index float,
  target_calories_delta integer,

  completed boolean
);

drop view data.log_filtered;

create view
  data.log_filtered
as (
  select
  	uid,
  	owner,
  	(array_agg(created_at))[1] as created_at,
  	(array_agg(day) filter (where day is not null))[1] as day,
  	(array_agg(log_type) filter (where log_type is not null))[1] as log_type,
  	(array_agg(name) filter (where name is not null))[1] as name,
  	(array_agg(meta) filter (where meta is not null))[1] as meta,
  	(array_agg(weight) filter (where weight is not null))[1] as weight,
  	(array_agg(body_fat_percentage) filter (where body_fat_percentage is not null))[1] as body_fat_percentage,
  	(array_agg(resting_calories) filter (where resting_calories is not null))[1] as resting_calories,
  	(array_agg(active_calories) filter (where active_calories is not null))[1] as active_calories,
  	(array_agg(food_quantity) filter (where food_quantity is not null))[1] as food_quantity,
  	(array_agg(food_calories) filter (where food_calories is not null))[1] as food_calories,
  	(array_agg(food_proteins) filter (where food_proteins is not null))[1] as food_proteins,
  	(array_agg(food_carbohydrates) filter (where food_carbohydrates is not null))[1] as food_carbohydrates,
  	(array_agg(food_fats) filter (where food_fats is not null))[1] as food_fats,
  	(array_agg(food_alcohol) filter (where food_alcohol is not null))[1] as food_alcohol,
  	(array_agg(protein_target_index) filter (where protein_target_index is not null))[1] as protein_target_index,
  	(array_agg(fats_target_index) filter (where fats_target_index is not null))[1] as fats_target_index,
  	(array_agg(target_calories_delta) filter (where target_calories_delta is not null))[1] as target_calories_delta,
  	(array_agg(completed) filter (where completed is not null))[1] as completed
  from
  	(select * from data.log order by created_at desc)
  group by
  	uid,
  	owner
);

commit;
