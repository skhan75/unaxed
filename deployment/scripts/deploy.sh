#!/bin/bash

# Navigate to the deployment directory
cd "$(dirname "$0")"

# Deploy the Aurora stack
aws cloudformation deploy \
  --template-file ./templates/aurora-template.yaml \
  --stack-name UnaxedAuroraStack \
  --parameter-overrides MasterUsername=YOUR_USERNAME MasterUserPassword=YOUR_PASSWORD \
  --capabilities CAPABILITY_NAMED_IAM

# Print the Aurora Endpoint
aws cloudformation describe-stacks \
  --stack-name UnaxedAuroraStack \
  --query "Stacks[0].Outputs[?OutputKey=='AuroraEndpoint'].OutputValue" \
  --output text
