@Library('folio_jenkins_shared_libs@modgql-1') _

buildNPM { 
  buildNode = 'jenkins-slave-all'
  npmDeploy = 'no'
  runLint = 'yes'
  runTest = 'yes'
  publishAPI = 'no'
  publishModDescriptor = 'no'
  ModDescriptor = 'ModuleDescriptor.json'
  
  doDocker = {
    buildDocker {
      publishMaster = 'yes'
      healthChk = 'no'
    }
  }
}
