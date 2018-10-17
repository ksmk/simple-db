


// JS
{ customer_id:"XXATA", company_name:"Any_Company 634" }

// JSON 
{ "customer_id":"XXATA", "company_name":"Any_Company 634" }

{ "customer_id":"X6YATA", "company_name":"An2otjer Any_Company 634" }


{ "customer_id":"X6YATA", "company_name":"An2otjer Any_Company 634", "contact_name":"Baltazar" }

{ "customer_id":"X231TA", "company_name":"Switcher", "xxx":"xBaltazar" }



//URLs
"http://localhost:3000/customers/create"

"http://localhost:3000/customers/read"

"http://localhost:3000/customers/update"

"http://localhost:3000/customers/delete"




curl -i -X POST -H "Content-Type:application/json" "http://localhost:3000/customers/create" -d { "customer_id":"X231TA", "company_name":"Switcher", "xxx":"xBaltazar" }
curl -i -H "Content-Type:application/json" -X POST -d '{ "customer_id":"X231TA", "company_name":"Switcher", "xxx":"xBaltazar" }'  http://localhost:3000/customers/create


// proper WIN notation
curl -i -H "Content-Type:application/json" -X POST -d "{ \"customer_id\":\"X231TA\",   \"company_name\":\"Switcher\",   \"xxx\":\"xBaltazar\" }"  http://localhost:3000/customers/create
curl -i -H "Content-Type:application/json" -X POST -d "{ \"company_name\":\"Switcher\",   \"xxx\":\"xBaltazar\" }"  http://localhost:3000/customers/create



curl -i -H "Content-Type:application/json" -X POST -d "{ \"company_name\":\"Switcher\",  \"xxx\":\"xBaltazar\" }"  http://localhost:3000/customers/v1

curl -i -H "Content-Type:application/json" -X POST -d "{ \"company_name\":\"Sw&$\_itcher\", \"xxx\":\"xBaltazar\" }" http://localhost:3000/customers/v1



// curl -i -H "Content-Type:application/json" -X POST --data-urlencode "{ \"company_name\":\"Sw&#$9__#itcher\", \"xxx\":\"xBaltazar\" }" http://localhost:3000/customers/v1




curl -i -H "Content-Type:application/json" -X POST -d "{ \"company_name\":\"Switcher\",  \"xxx\":\"xBaltazar\" }"  http://localhost:3000/api/customers




curl -i -H "Content-Type: application/json" --data-binary @filename http://localhost:3000/customers/create


curl http://localhost:3000/customers/create


psql -d northwind_stg -U rappie -c \"GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO ksmk;\"

psql -d northwind_stg -U rappie -c "GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO ksmk;"



// generating models from existing DB
npm i -g sequelize-auto pg@6.4.2 pg-hstore
sequelize-auto -o "./models" -d northwind -h localhost -u rappie -p 5432 -x lotr -e postgres



// generating migrations from existing models
// get script
// sequelize-schema-file-generator.js


https://gist.githubusercontent.com/ahelord/a7a7d293695b71aadf04157f0f7dee64/raw/a5ad65f61ed361f3a871f16e9a49e814cc2e82a8/sequelize-schema-file-generator.js




// generating migrations 
npm i sequelize-auto-migrations


// OData protocol

curl -i -X GET -H "Content-Type:application/json" http://localhost:3000/customers