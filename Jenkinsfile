pipeline {
  agent any
  environment {
    SECRET_FILE_EXPRESS = credentials("customer-express-env")
  }
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage("Create Express Service ENV"){
        steps{
          dir("express-service") {
            script {
              withCredentials([file(credentialsId: "customer-express-env", variable: "SECRET_FILE_EXPRESS")]) {
                writeFile file: '.env', text: "${SECRET_FILE_EXPRESS}"
              }
              def envContent = readFile file: '.env'
              echo "====++++ENV FILE++++===="
              echo envContent
            }
          }
        }
    }
    stage("Build Express Service") {
      steps {
        dir("express-service") {
          bat "npm install"
          bat "node -r dotenv/config src/configs/db.config.js"
          // bat "node index.js"
        }
      }
    }
  }
}