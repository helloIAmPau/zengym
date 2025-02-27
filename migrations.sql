begin;

create schema if not exists data;

create table if not exists data.log (
  uid uuid not null default gen_random_uuid(),

  day date not null default now(),
  log_type text not null,

  name text,
  description text,

  weight float,
  body_fat_percentage integer,

  resting_calories integer,
  active_calories integer,

  food_quantity float,
  food_calories float,
  food_proteins float,
  food_carbohydrates float,
  food_fats float,
  food_alcohol float,

  protein_target_index float,
  fats_target_index float,
  target_calories_delta integer,

  completed boolean not null default false,

  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  completed_at timestamp
);

commit;
