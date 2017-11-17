@Library('folio_jenkins_shared_libs@modgql-1') _

buildNPM { 
  buildNode = 'jenkins-slave-all'
  npmDeploy = 'no'
  runLint = 'no'
  runTest = 'yes'
  publishAPI = 'no'
  publishModDescriptor = 'yes'
  modDescriptor = 'ModuleDescriptor.json'
  
  doDocker = {
    buildDocker {
      publishMaster = 'yes'
      healthChk = 'no'
    }
  }
}
