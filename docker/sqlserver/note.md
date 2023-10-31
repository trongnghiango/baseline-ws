```
docker run \
-e "ACCEPT_EULA=Y" \
-e "SA_PASSWORD=Nghia@385685" \
--name sql-server-container \
-p 1435:1433 \
-d mcr.microsoft.com/mssql/server:2019-CU14-ubuntu-20.04
```
``` sql
INSERT table_name
(column_1, column_2, ...)
VALUES
(value_1, value_2, ...)

```