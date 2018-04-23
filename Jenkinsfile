
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
      dockerDir = "${env.WORKSPACE}/project"
      publishMaster = 'yes'
      healthChk = 'no'
    }
  }
}
