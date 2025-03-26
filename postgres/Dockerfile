from ubuntu:24.04

env DEBIAN_FRONTEND=noninteractive
env PYTHONUNBUFFERED=1

run apt update && apt install -y curl gnupg2 jq python3-pip python3-virtualenv gosu

run echo "deb https://apt.postgresql.org/pub/repos/apt noble-pgdg main" > /etc/apt/sources.list.d/pgdg.list
run curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

run apt update && apt install -y postgresql-16 postgresql-plpython3-16

run curl -sfL https://install.pgx.sh | sh -
run pgxman install hydra_columnar pgvector

run mkdir -p /python-env && chown postgres /python-env && virtualenv /python-env

run . /python-env/bin/activate && pip install -i https://download.pytorch.org/whl/cpu torch==2.6.0
copy requirements.txt /requirements.txt
run . /python-env/bin/activate && pip install -r /requirements.txt 

copy zengym /zengym
run . /python-env/bin/activate && pip install /zengym && rm -rfv /zengym

expose 5432
copy start-container.sh /start-container.sh
cmd /start-container.sh
