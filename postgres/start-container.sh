#!/usr/bin/env bash

if [ ! -f /data/postgresql.conf ]; then
  chown postgres /data
  gosu postgres /usr/lib/postgresql/17/bin/initdb -D /data
  gosu postgres /usr/lib/postgresql/17/bin/postgres -D /data &
  while ! psql -U postgres -c 'select 1'; do sleep 0.5; done
  psql -U postgres -v ON_ERROR_STOP=1 << SQL
create user "$POSTGRES_USER" with password '$POSTGRES_PASSWORD';
create database "$POSTGRES_DB";
alter user "$POSTGRES_USER" with superuser;
SQL
  gosu postgres /usr/lib/postgresql/17/bin/pg_ctl stop -D /data -m immediate
  fi

gosu postgres bash -c ". /python-env/bin/activate && /usr/lib/postgresql/17/bin/postgres -D /data"
