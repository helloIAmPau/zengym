from node:20.15.1-alpine as builder

arg service
env service=${service}

copy package.json /source/package.json
copy package-lock.json /source/package-lock.json
copy modules /source/modules

run cd /source && npm install && npm --workspace=@zengym/${service} run build

expose 80
cmd cd /source && npm --workspace=@zengym/${service} run build && npm --workspace=@zengym/${service} run develop

from node:20.15.1-alpine

arg service
env service=${service}
env NODE_ENV=production

copy --from=builder /source/modules/@zengym/${service}/dist /app
copy --from=builder /source/modules/@zengym/${service}/package.json /app/package.json
copy --from=builder /source/package-lock.json /app/package-lock.json

run cd /app && npm install

expose 80
cmd cd /app && npm start
