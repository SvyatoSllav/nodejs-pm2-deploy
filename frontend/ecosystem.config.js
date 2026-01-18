const dotenv = require("dotenv");
dotenv.config({ path: "./.env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "git@github.com:SvyatoSllav/nodejs-pm2-deploy.git",
      path: DEPLOY_PATH,
      "post-deploy":
        "cd frontend && npm i && NODE_OPTIONS='--openssl-legacy-provider' npm run build",
    },
  },
};
