# Salesforce custom functions

Custom functions to interact with the connected Salesforce org in order to run a flow, call an invocable action, etc.

# Functions

## Run a flow
This step allows you to run a named flow, provide a single input, and get direct access to a single variable output by the flow.

Create a Flow in your Salesforce org. It should have variable named `input_string` that is available for input. It should assign the value of a separate variable named `output_string` that is available for output.

![run a flow step image](/assets/run-flow-step.png)

## Generate an Einstein prompt template response
Generates a response based on the specified prompt template and input parameters.

# Getting started

## Create a Connected App

Create a [Connected App](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_basics.htm&type=5) from the *App Manager* in your Salesforce org and [Enable OAuth Settings](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_api_integration.htm&type=5).

- Redirect URI: `https://oauth2.slack.com/external/auth/callback`
- Scopes: `full_access`, `refresh_token`
- Click *Manage Consumer Details* button to copy your Client ID and Secret

## Setup and run the Slack workflows
- Install the [Slack CLI](https://api.slack.com/automation/cli/install-mac-linux)
- Clone the repo locally and open the project in your code editor
- Rename `.env.sample` to `.env` and update the values. The `SALESFORCE_INSTANCE_DOMAINS` will be your Salesforce domain name. The `CLIENT_ID` is the Client ID that is obtained from the `Create a Connected App` step above.
- In your terminal, navigate to the project folder. Use `slack login` to authenticate to the Slack workspace where you'd like to install the Workflow Builder steps. 
- Use `slack run` to install the Workflow steps to your Slack workspace
- Run `slack external-auth add-secret` to add your app client secret
- Rerun the app with `slack run`. You now have a locally-running instance of the Workflow steps
- Use `slack deploy` to deploy the steps to the workspace
- Use `slack function distribute` to distribute the steps to other users in the workspace

## Build a workflow

In Workflow Builder, create a new workflow and add **Salesforce custom functions (local) > Run a Sync Flow** from the *Custom* section of the step library. The flow name input should be set to the *Flow API Name* found in the Flow properties. The input can be whatever string value you like.
  
