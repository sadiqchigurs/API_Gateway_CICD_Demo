// #!/usr/bin/env node
/*
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayCicdDemoStacks } from '../lib/api_gateway_cicd_demo-stack';

const app = new cdk.App();

const envName = app.node.tryGetContext('env') || 'dev';
const config = app.node.tryGetContext('environments')[envName];

new ApiGatewayCicdDemoStacks(app, 'ApiGatewayCicdDemoStacks', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */

  //env: { region: 'us-east-1' } // Change region as needed

  /*env: {
    region: config.region
  },
  tags: {
    Environment: envName
  }

});*/

/*
// Commented at 8:50pm on 15 july 2025 
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayCicdDemoStack } from '../lib/api_gateway_cicd_demo-stack';
import * as fs from 'fs';
import * as path from 'path';

const app = new cdk.App();

// Get env name from context or fallback to 'dev'
const envName = app.node.tryGetContext('env') || 'dev';

// Path to the environment-specific config file
const configPath = path.join(__dirname, `../config/${envName}.json`);

if (!fs.existsSync(configPath)) {
  throw new Error(`Missing environment config file: ${configPath}`);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Create the stack with env config
new ApiGatewayCicdDemoStack(app, `LoyaltyApiStack-${envName}`, {
  env: {
    account: config.account,
    region: config.region,
  },
  tags: {
    Environment: envName,
  },
});
*/




/////////////////////////////////////////
/*
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayCicdDemoStack } from '../lib/api_gateway_cicd_demo-stack';

const app = new cdk.App();
const envName = app.node.tryGetContext('env');

if (!envName) {
  throw new Error("Provide environment via context: -c env=dev|stage|prod");
}

new ApiGatewayCicdDemoStack(app, `ApiGwStack-${envName}`, {
  env: {
    region: 'us-east-1'
  }
}, envName);
*/

/*
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayCicdDemoStack } from '../lib/api_gateway_cicd_demo-stack';

const app = new cdk.App();

new ApiGatewayCicdDemoStack(app, 'ApiGwSharedStack', {
  env: { region: 'us-east-1' }
});
*/

#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayStack } from '../lib/api-gateway-stack';

const app = new cdk.App();

// Get region from context or use default
const region = app.node.tryGetContext('region') || 'us-east-1';

// Get spec file from context or use default
const specFile = app.node.tryGetContext('specFile') || 'api-spec.json';

// Get REST API name from context
const restApiName = app.node.tryGetContext('restApiName');

// Get stages to deploy from context
const deployStages = app.node.tryGetContext('deployStages');

console.log(`Deploying with spec file: ${specFile}`);
if (restApiName) {
  console.log(`Using custom REST API name: ${restApiName}`);
}

// Parse stages to deploy
const stagesToDeploy = deployStages && deployStages !== 'none' ? 
  deployStages.split(',').map((s: string) => s.trim()) : [];

if (stagesToDeploy.length > 0) {
  console.log(`Creating stacks for stages: ${stagesToDeploy.join(', ')}`);
} else {
  console.log(`Creating API Gateway without stages`);
}

// Single stack with multiple stages
new ApiGatewayStack(app, 'ApiGatewayStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: region,
  },
  specFile: specFile, // Pass the spec file
  restApiName: restApiName, // Pass the REST API name
  deployStages: stagesToDeploy, // Pass the stages to deploy
});


