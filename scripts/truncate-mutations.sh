#!/bin/bash

# preserve line-endings
IFS=

# script location
DIRNAME=`dirname $0`

# cat to avoid CRLF errors
eval "$( cat $DIRNAME/../development.env )"

mysql -h host.docker.internal -P 3306 -u$DATABASE_USER -p$DATABASE_PASSWORD $DATABASE_NAME <<'EOF'
  TRUNCATE TABLE contract_mutation_approval_eligible_approvers_user;
  DELETE FROM contract_mutation_approval WHERE id IS NOT NULL;
  DELETE FROM change_driver_contract_mutation WHERE id IS NOT NULL;
  DELETE FROM change_vehicle_contract_mutation WHERE id IS NOT NULL;
  DELETE FROM request_vehicle_contract_mutation WHERE id IS NOT NULL;
  DELETE FROM return_vehicle_contract_mutation WHERE id IS NOT NULL;
  DELETE FROM contract_mutation WHERE id IS NOT NULL;
EOF

