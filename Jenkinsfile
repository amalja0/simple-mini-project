pipeline {
  agent any
  environment {
    SECRET_FILE_EXPRESS = credentials("customer-express-env")
  }
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage("Check NPM Version") {
      steps {
        bat "npm version"
      }
    }
    stage("Create Express Service ENV"){
        steps{
            script {
              withCredentials([string(credentialsId: "customer-express-env", variable: "SECRET_FILE_EXPRESS")]) {
                writeFile file: '.env', text: "${SECRET_FILE_EXPRESS}"
              }
            }
        }
    }
    stage("Build Express Service") {
      steps {
        dir("express-service") {
          bat "npm install"
          bat "node -r dotenv/config src\configs\db.config.js"
        }
      }
    }
  }
}