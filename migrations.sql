begin;

create schema if not exists data;

create extension if not exists columnar;
alter database :DBNAME set default_table_access_method = 'heap';

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
) using columnar;

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

create extension if not exists vector;
create or replace language plpython3u;

create or replace function create_embedding_from_text(t text) returns vector(384)
as $$
  from threading import Lock

  if 'import_embedding_lock' not in GD:
    plpy.info('First encode embedding call: creating the lock object')
    GD['import_embedding_lock'] = Lock()

  with GD['import_embedding_lock']:
    if 'embedding' not in GD:
      plpy.info('Embeddings module not loaded yet. Loading globally')
      from zengym import embedding
      GD['embedding'] = embedding
      plpy.info('Embedding module is ready to embed your stuff')

  return GD['embedding'].encode(t)
$$ language plpython3u;

create extension if not exists file_fdw;
create server if not exists csv_server foreign data wrapper file_fdw;

create foreign table if not exists data.openfood_csv_data (
  code text,
  name text,
  product_name text,
  brands text,
  food_alcohol text,
  food_proteins text,
  food_carbohydrates text,
  food_fats text,
  food_calories text
)
server csv_server
options (
  filename '/datasets/food.csv',
  format 'csv',
  header 'false',
  delimiter ','
);

create table if not exists data.openfood (
  code text,
  name text,
  product_name text,
  brands text,
  food_alcohol numeric,
  food_proteins numeric,
  food_carbohydrates numeric,
  food_fats numeric,
  food_calories numeric,
  embedding vector(384),
  created_at timestamp not null default now(),
  hash text not null
);

create index if not exists hnsw_cosine on data.openfood using hnsw (embedding vector_cosine_ops);

create or replace procedure load_openfood_data()
as $$
declare
  last_code_processed text;
  processed int;
begin
  raise notice 'Starting openfood batch import';

  loop
    select coalesce(max(code), '') into last_code_processed from data.openfood;

    insert into
      data.openfood (
        select
        	*,
          create_embedding_from_text(concat(name, ' ', brands, ' ', product_name)) as embedding,
        	now() as created_at,
        	md5(concat(code, '::', product_name, '::', brands, '::', name, food_alcohol, food_proteins, food_carbohydrates, food_fats, food_calories)) as hash
        from (
        	select
            	code,
              name,
            	product_name,
            	brands,
              cast(food_alcohol as numeric) as food_alcohol,
              cast(food_proteins as numeric) as food_proteins,
              cast(food_carbohydrates as numeric) as food_carbohydrates,
              cast(food_fats as numeric) as food_fats,
              cast(food_calories as numeric) as food_calories
          	from
          		data.openfood_csv_data
            where code > last_code_processed
            order by code
            limit 1000
        )
      );

      get diagnostics processed = row_count;
      if processed = 0 then
        exit;
      end if;

      raise notice 'Last code processed: %', last_code_processed;
      raise notice 'Processed % rows', processed;

      commit;
  end loop;
end;
$$ language plpgsql;
commit;

-- create table if not exists data.openfood as (
--);

