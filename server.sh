# mkdir ./sock/ && chmod -R 777 ./sock/
docker build -t dayatstuff/nubela1 .
docker run \
	--rm \
	--network none \
	--memory 1g \
	-v $(PWD)/sock:/var/run/dev-test \
	dayatstuff/nubela1 /var/run/dev-test/sock