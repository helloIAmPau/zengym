from alpine:3.21.3

run apk add postgresql17 postgresql-pgvector postgresql-plpython3 py3-pip py3-virtualenv curl jq
run mkdir -p /run/postgresql && chown postgres /run/postgresql

run mkdir -p /python-env && chown postgres /python-env

user postgres

run virtualenv /python-env
copy --chown=postgres zengym /zengym
run source /python-env/bin/activate && pip install /zengym && rm -rf /zengym && deactivate

expose 5432
cmd sh -c 'source /python-env/bin/activate && postgres -D /data'
