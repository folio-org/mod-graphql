@Library('folio_jenkins_shared_libs@modgql-1') _

buildNodeJs { 
  publishModDescriptor = 'no'
  ModDescriptor = 'ModuleDescriptor.json'
  npmDeploy = 'no'
  runLint = 'no'
  runTest = 'yes'
  publishAPI = 'no'
  
  doDocker = {
    buildDocker {
      publishMaster = 'no'
      healthChk = 'no'
    }
  }
}
