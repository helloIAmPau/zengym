#!/usr/bin/env bash

if [ ! -f /data/postgresql.conf ]; then
  chown postgres /data
  gosu postgres bash -c '/usr/lib/postgresql/16/bin/initdb -D /data --username "$POSTGRES_USER" --pwfile=<(printf "%s\n" "$POSTGRES_PASSWORD")'
  echo 'host    all             all             0.0.0.0/0            trust' >> /data/pg_hba.conf
  gosu postgres /usr/lib/postgresql/16/bin/postgres -D /data &
  while ! psql -U "$POSTGRES_USER" -d postgres -c 'select 1'; do sleep 0.5; done
  psql -U "$POSTGRES_USER" -d postgres -v ON_ERROR_STOP=1 << SQL
create database "$POSTGRES_DB";
SQL
  gosu postgres /usr/lib/postgresql/16/bin/pg_ctl stop -D /data -m immediate
  fi

gosu postgres bash -c ". /python-env/bin/activate && /usr/lib/postgresql/16/bin/postgres -h 0.0.0.0 -D /data"
