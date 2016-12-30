SCHEMA=test
DUMP_FILE="data.sql"
SCHEMA_FILE="schema.sql"

pg_dump consamables -a -f $DUMP_FILE -n $SCHEMA

psql -d consamables -f $SCHEMA_FILE
psql -d consamables -f $DUMP_FILE

