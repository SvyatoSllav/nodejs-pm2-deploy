require("dotenv").config({ path: "./production.env" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
} = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-frontend",
      script: "sh",
      args: "-c 'pwd >> /tmp/logor.txt && npm start'",
      cwd: "frontend",
      node_args: "--openssl-legacy-provider",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "git@github.com:SvyatoSllav/nodejs-pm2-deploy.git",
      path: `${DEPLOY_PATH}`,
      "post-deploy": `cd frontend &&
        npm ci &&
        pm2 reload ecosystem.config.js --env production`
    },
    // production: {
    //   user: "user",
    //   host: "",
    //   ref: "origin/main",
    //   repo: "git@github.com:SvyatoSllav/nodejs-pm2-deploy.git",
    //   path: "/home/user/mesto/frontend",
    //   "pre-setup": "rm -rf releases/* current shared",
    //   "post-deploy": [
    //     "npm ci",
    //     "npm run build",
    //     //# Serve статических файлов (установите nginx или serve)
    //     "npx serve -s build -l 3000 &",
    //   ],
    //   env: {
    //     NODE_ENV: "production",
    //   },
    // },
  },
};
