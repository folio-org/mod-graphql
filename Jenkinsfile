
buildNPM {
  buildNode = 'jenkins-slave-all'
  npmDeploy = false
  runLint = false
  runTest = true
  publishModDescriptor = true
  modDescriptor = 'ModuleDescriptor.json'

  doDocker = {
    buildDocker {
      publishMaster = 'yes'
      dockerDir = 'project'
      healthChk = 'no'
    }
  }
}
