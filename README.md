
#Localstack to mock AWS S3 setup in local for development

LocalStack is a cloud service emulator that runs on your laptop or in your CI environment. With LocalStack, you can run your AWS applications on your local machine without connecting to a remote cloud provider!

Benefits of using localstack:
Works offline
No need to worry about paying for AWS usage
No need to log into AWS

# Initial Setup
* [Install Docker](https://docs.docker.com/engine/install/)
* [Intall AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
    ```
    brew install awscli
    ```
    Once AWS CLI is installed, configure the AWS using command `aws configure`, this command will set credentails for default profile. 
    ```
    //sample
    AWS Access Key ID [None]: xyz
    AWS Secret Access Key [None]: xyz
    Default region name [None]: <not required>
    Default output format [None]: json
    ```
    To view configuration use command `aws configure list`
    ```
    Name                    Value             Type    Location
    ----                    -----             ----    --------
    profile                <not set>             None    None
    access_key      ****************xyz shared-credentials-file    
    secret_key      ****************123 shared-credentials-file    
    region                <not set>             None    None
    ```

# Run localstack
we are running localstack using docker-compose, you can also run using localstack CLI or docker.
* Clone this repo and navigate the folder from terminal or command propmpt
* Start container using `docker-compose up`

To make sure its working, we can visit `http://s3.localhost.localstack.cloud:4566`

### Now AWS S3 in your local, lets create a bucket
Create bucket using below command
```
aws --endpoint-url=http://localhost:4572 s3 mb s3://demo-bucket
```
Attach an [ACL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html) to the bucket so it is readable: 

```
aws --endpoint-url=http://localhost:4572 s3api put-bucket-acl --bucket demo-bucket --acl public-read

```
If refresh URL `http://s3.localhost.localstack.cloud:4566` which previously opened will show created bucket.

# Run Node JS to test uploading file using [AWS SDK](https://www.npmjs.com/package/aws-sdk)

Refer the aws.js and upload.js in the repo, its simple javascript uploading an image to above created bucket. Simply run `npm start` inside folder from terminal.

Thats it! Please raise bugs if there are any issues with setup.






