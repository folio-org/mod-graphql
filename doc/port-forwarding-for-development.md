First I am running my VM using a `Vagrantfile` that includes

	config.vm.network "forwarded_port", guest: 9130, host: 9130

And this, as usual, allows me to access the VM's Okapi on localhost's 9130. That works fine, as I can verify at URLs such as http://localhost:9130/_/proxy/tenants/diku

Second, I am `vagrant ssh`d into the VM with this in my `.ssh/config`:

	Host 127.0.0.1
	RemoteForward 3000 127.0.0.1:3001

Which means that when the VM tries to access its own port 3000 what it sees is port 3001 on the host machine (my development box).
And third, I have the VM's Okapi configured — at least, so I believe — such that when it gets requests on `/graphql` it forwards them to its local port 3000 (which, as we have seen, is really port 3001 of my host box — and that's where I am running mod-graphql).

