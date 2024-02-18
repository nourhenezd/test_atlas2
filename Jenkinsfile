pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Récupération du code à partir du référentiel Git
                git 'https://github.com/nourhenezd/test_atlas2.git'
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
