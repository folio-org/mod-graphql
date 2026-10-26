
buildNPM {
  buildNode = 'jenkins-agent-java17'
  npmDeploy = false
  runLint = false
  runTest = true
  publishModDescriptor = true
  modDescriptor = 'ModuleDescriptor.json'

  doDocker = {
    buildDocker {
      publishMaster = 'yes'
      dockerDir = 'project'
      healthChk = 'yes'
      healthChkCmd = 'wget --no-verbose --tries=1 --spider http://localhost:3001/admin/health || exit 1'
    }
  }
}
