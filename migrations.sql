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

drop view if exists data.log_unified;

create view
  data.log_unified
as (
  select
  	uid,
  	owner,
  	(array_agg(created_at order by created_at desc))[1] as created_at,
  	(array_agg(day order by created_at desc) filter (where day is not null))[1] as day,
  	(array_agg(log_type order by created_at desc) filter (where log_type is not null))[1] as log_type,
  	(array_agg(name order by created_at desc) filter (where name is not null))[1] as name,
  	(array_agg(meta order by created_at desc) filter (where meta is not null))[1] as meta,
  	(array_agg(weight order by created_at desc) filter (where weight is not null))[1] as weight,
  	(array_agg(body_fat_percentage order by created_at desc) filter (where body_fat_percentage is not null))[1] as body_fat_percentage,
  	(array_agg(resting_calories order by created_at desc) filter (where resting_calories is not null))[1] as resting_calories,
  	(array_agg(active_calories order by created_at desc) filter (where active_calories is not null))[1] as active_calories,
  	(array_agg(food_quantity order by created_at desc) filter (where food_quantity is not null))[1] as food_quantity,
  	(array_agg(food_calories order by created_at desc) filter (where food_calories is not null))[1] as food_calories,
  	(array_agg(food_proteins order by created_at desc) filter (where food_proteins is not null))[1] as food_proteins,
  	(array_agg(food_carbohydrates order by created_at desc) filter (where food_carbohydrates is not null))[1] as food_carbohydrates,
  	(array_agg(food_fats order by created_at desc) filter (where food_fats is not null))[1] as food_fats,
  	(array_agg(food_alcohol order by created_at desc) filter (where food_alcohol is not null))[1] as food_alcohol,
  	(array_agg(protein_target_index order by created_at desc) filter (where protein_target_index is not null))[1] as protein_target_index,
  	(array_agg(fats_target_index order by created_at desc) filter (where fats_target_index is not null))[1] as fats_target_index,
  	(array_agg(target_calories_delta order by created_at desc) filter (where target_calories_delta is not null))[1] as target_calories_delta,
  	(array_agg(completed order by created_at desc) filter (where completed is not null))[1] as completed
  from
  	data.log
  group by
  	uid,
  	owner
);

create language plpython3u;
create or replace function create_embeddings_from_text(text) returns text
as $$
  from zengym import hello

  return hello()
$$ language plpython3u;

create extension if not exists file_fdw;
create server if not exists csv_server foreign data wrapper file_fdw;

create foreign table if not exists data.openfood_csv_data (
  code text,
  generic_name text,
  product_name text,
  brands text,
  alcohol_100g text,
  proteins_100g text,
  carbohydrates_100g text,
  fat_100g text,
  "energy-kcal_100g" text
)
server csv_server
options (
  program 'curl -L ''https://static.openfoodfacts.org/data/openfoodfacts-products.jsonl.gz'' | gunzip | jq -r ''[.code, .generic_name, .product_name, .brands, .nutriments.alcohol_100g, .nutriments.proteins_100g, .nutriments.carbohydrates_100g, .nutriments.fat_100g, .nutriments."energy-kcal_100g" ] | @csv''',
  format 'csv',
  header 'false',
  delimiter ','
);

create table if not exists data.openfood as (
  select
  	*,
  	now() as created_at,
  	md5(concat(code, '::', product_name, '::', brands, '::', name, food_alcohol, food_proteins, food_carbohydrates, food_fats, food_calories)) as hash
  from (
  	select
      	code,
      	case
    			when generic_name is null or trim(generic_name) = '' then trim(concat(brands, ' ', product_name))
    			else generic_name
  		end as name,
      	product_name,
      	brands,
      	case
    			when alcohol_100g is null then 0
  	  		else cast(alcohol_100g as numeric)
  		end as food_alcohol,
      	case
    			when proteins_100g is null then 0
    			else cast(proteins_100g as numeric)
  		end as food_proteins,
      	case
    			when carbohydrates_100g is null then 0
    			else cast(carbohydrates_100g as numeric)
  		end as food_carbohydrates,
  		case
    			when fat_100g is null then 0
    			else cast(fat_100g as numeric)
  		end as food_fats,
      	case
    			when "energy-kcal_100g" is null then 0
    			else cast("energy-kcal_100g" as numeric)
  		end as food_calories
    	from
    		data.openfood_csv_data
  )
);

commit;
