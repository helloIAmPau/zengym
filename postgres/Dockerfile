from ubuntu:24.04

env DEBIAN_FRONTEND=noninteractive
env PYTHONUNBUFFERED=1

#run apt update && apt install -y locales

#run sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
#env LANG en_US.UTF-8  
#env LANGUAGE en_US:en  
#env LC_ALL en_US.UTF-8 

run apt update && apt install -y curl gnupg2 jq python3-pip python3-virtualenv gosu

run echo "deb http://apt.postgresql.org/pub/repos/apt noble-pgdg main" > /etc/apt/sources.list.d/pgdg.list
run curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

run apt update && apt install -y postgresql-17 postgresql-17-pgvector postgresql-plpython3-17
run ln -s /usr/lib/postgresql/17/bin/postgres /usr/bin/postgres

run mkdir -p /python-envs && chown postgres /python-envs && virtualenv /python-envs/production
copy zengym /zengym
run . /python-envs/production/bin/activate && pip install /zengym && rm -rfv /zengym

expose 5432
copy start-container.sh /start-container.sh
cmd /start-container.sh
