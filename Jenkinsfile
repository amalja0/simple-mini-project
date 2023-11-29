pipeline {
  agent any
  environment {
    SECRET_FILE_EXPRESS = credentials("customer-express-env")
    SECRET_FILE_NEST = credentials("customer-nest-env")
  }
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage("Create ExpressJs Service ENV"){
        steps{
          dir("express-service") {
            script {
              withCredentials([file(credentialsId: "customer-express-env", variable: "SECRET_FILE_EXPRESS")]) {
                writeFile file: '.env', text: readFile(file: "${SECRET_FILE_EXPRESS}")
              }
            }
          }
        }
    }
    stage("Build ExpressJs Service") {
      steps {
        dir("express-service") {
          bat "npm install"
          bat "node -r dotenv/config index.js"
          bat "node -r dotenv/config src/configs/db.config.js"
          bat "node index.js"
        }
      }
    }
    stage("Create NestJs Service ENV"){
      steps{
        dir("nest-service") {
          script {
            withCredentials([file(credentialsId: "customer-nest-env", variable: "SECRET_FILE_NEST")]) {
              writeFile file: '.env', text: readFile(file: "${SECRET_FILE_NEST}")
            }
          }
        }
      }
    }
    stage("Building NestJs Service") {
      steps {
        dir("nest-service") {
          bat "npm install"
          bat "npm run start"
        }
      }
    }
  }
}