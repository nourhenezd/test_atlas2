pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Récupération du code à partir du référentiel Git
                git credentialsId: 'test_atlast2', 
                url: 'https://github.com/nourhenezd/test_atlas2.git'
            }
        }
        
        stage("Building Project") {
           steps {
	   bat 'npm install --global yarn '
           bat "yarn install"
           bat "yarn  run build"
           
           
           }
       
       }
       
        // Ajoutez d'autres étapes de construction, de test, etc., selon vos besoins
        // stage('Build') {
        //     steps {
        //         // Vos étapes de construction ici
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         // Vos étapes de test ici
        //     }
        // }
    }
    
    // Ajoutez des directives de post-condition ici si nécessaire
    // post {
    //     always {
    //         // Actions à exécuter toujours après l'exécution du pipeline
    //     }
    // }
}
