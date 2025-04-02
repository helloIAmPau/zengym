from nvidia/cuda:12.8.1-base-ubuntu24.04 as base

env DEBIAN_FRONTEND=noninteractive
env PYTHONUNBUFFERED=1

from base as develop

run apt update && apt install -y python3-pip python3-virtualenv

run mkdir -p /python-env && virtualenv /python-env

copy requirements.txt /requirements.txt
run . /python-env/bin/activate && pip install -r /requirements.txt 

copy zengym /zengym
run . /python-env/bin/activate && pip install /zengym

cmd . ./python-env/bin/activate && pip install -r /scripts/requirements.txt && python3 /scripts/main.py

from base

run apt update && apt install -y curl python3 gosu

run echo "deb https://apt.postgresql.org/pub/repos/apt noble-pgdg main" > /etc/apt/sources.list.d/pgdg.list
run curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

run apt update && apt install -y postgresql-16 postgresql-plpython3-16

run curl -sfL https://install.pgx.sh | sh -
run pgxman install hydra_columnar pgvector

run usermod -u 102 postgres

copy --from=develop /python-env /python-env
#run chown postgres /python-env

expose 5432
copy start-container.sh /start-container.sh
cmd /start-container.sh
