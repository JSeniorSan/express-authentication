run: 
	docker run -d -p 80:80 --name nodeapp --rm -v /app/node_modules -e PORT=80 -e SECRET=TEKAI-REST-API -e MONGO_URL=mongodb+srv://tekai:Tekai321@cluster0.lppxftn.mongodb.net/test?retryWrites=true"&"w=majority"&"appName=Cluster0 -v logs:/app/data 5aa55a4e2d04
run-dev: 
	docker run -d -p 80:5000 -v "express_course\production-build-node-ts" -v /app/node_modules -v logs:/app/data --rm --name nodevolumes node
stop: 
	docker stop nodeapp:volumes