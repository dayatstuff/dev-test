docker run \
	--rm \
	--network none \
	-v $(PWD)/sock:/var/run/dev-test \
	nubelacorp/dev-test:stable \
	/var/run/dev-test/sock