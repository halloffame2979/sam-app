current_dir=$(pwd)


# Disables the exit-on-error mode (set -e) for the script.
# This allows the script to continue executing even if a command fails.
set -ex

# Create lambda layer folder
layer_dir=${current_dir}/lambda_layer/nodejs
mkdir -p ${current_dir}/lambda_layer/nodejs
# Install dependencies
cp package.json ${current_dir}/lambda_layer/nodejs
cd ${current_dir}/lambda_layer/nodejs

npm install --omit=dev

# Copy dependencies to the lambda layer folder

# Build
cd $current_dir
sam.cmd build
# sam.cmd package --s3-bucket $1 --output-template-file packaged.yaml
# sam.cmd deploy --template-file packaged.yaml --stack-name $2 --capabilities CAPABILITY_IAM --region $3 --parameter-overrides LambdaLayerS3Bucket=$1