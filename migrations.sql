begin;

create schema if not exists data;

create table if not exists data.log (
  uid uuid not null,
  owner uuid not null,

  day date not null,
  log_type text not null,

  name text not null,
  meta jsonb not null,

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

  completed boolean not null,

  created_at timestamp not null default now()
);

create or replace view
  data.log_filtered
as (
  select distinct on (uid)
    *
  from
    data.log
  order by
    uid,
    created_at desc
);

commit;
