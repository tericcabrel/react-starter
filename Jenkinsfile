// Config email recipients
def to = emailextrecipients([
    [$class: 'CulpritsRecipientProvider'], // Sent to the manager
    [$class: 'DevelopersRecipientProvider'], // The developer wo did th commit
    [$class: 'RequesterRecipientProvider'] // If the build is executed manually, notify the person who started it
])

pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'mhart/alpine-node:10.16.3'
                    args  '-v ${ENV_FOLDER}/dist:/home'
                }
            }
            steps {
                sh "cp /home/client.env ./client/.env"
                sh "./build.sh"
            }
        }
        stage('Deploy') {
            steps {
                sh "./run.sh"
            }
        }
    }
    post {
        /*always {
            deleteDir()
        }*/
        success {
            script {
                echo "The build completed successfully!"

                // Mark build as failed
                // currentBuild.result = "FAILURE";

                def subject = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} FAILURE"
                def content = '${JELLY_SCRIPT,template="html"}'

                // Send email
                if(to != null && !to.isEmpty()) {
                    emailext(
                        body: content,
                        mimeType: 'text/html',
                        replyTo: '$DEFAULT_REPLYTO',
                        subject: subject,
                        to: to,
                        attachLog: true
                    )
                }
            }
        }

        failure {
            steps {
                script {
                    // Mark build as failed
                    // currentBuild.result = "FAILURE";

                    echo "Fail to complete all the stages"

                    // Mark current build as a failure and throw the error
                    throw e;
                }
            }
        }
    }
    // The options directive is for configuration that applies to the whole job.
    options {
        // For example, we'd like to make sure we only keep 10 builds at a time, so
        // we don't fill up our storage!
        // buildDiscarder(logRotator(numToKeepStr:'10'))

        // And we'd really like to be sure that this build doesn't hang forever, so
        // let's time it out after an hour.
        timeout(time: 60, unit: 'MINUTES')
    }
}
