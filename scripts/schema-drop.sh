if [ "$STAGE" = 'development' ]; then
  echo "Dropping Schema"
  node ./scripts/generate-orm-config.js
  ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js schema:drop
else
  # Prevent script from running outside a dev environment
  echo -e "\033[0;33m Cannot drop schema. \$STAGE must be set to development. (Currently set to: '$STAGE')"
  echo "Run the following command in your terminal to set the environment variable."
  echo ""
  echo "              export STAGE=development"
  echo "\033[0m "
  exit 1
fi