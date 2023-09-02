const AWS = require('aws-sdk')
require('dotenv').config()

const credentials = {
   accessKeyId: "xyz",
   secretAccessKey: "123", //localstack doesnt validate credentials
}

const useLocal = process.env.NODE_ENV !== 'production'

const bucketName = "user-profiles"

const s3client = new AWS.S3({
   credentials,
   /**
    * When working locally, we'll use the Localstack endpoints. This is the one for S3.
    * A full list of endpoints for each service can be found in the Localstack docs.
    */
   endpoint: useLocal ? 'http://s3.localhost.localstack.cloud:4566' : undefined,
   /**
     * Including this option gets localstack to more closely match the defaults for
     * live S3. If you omit this, you will need to add the bucketName to the `Key`
     * property in the upload function below.
     *
     * see: https://github.com/localstack/localstack/issues/1180
     */
   s3ForcePathStyle: true,
})


const uploadFile = async (data, fileName) =>
   new Promise((resolve) => {
      s3client.upload(
         {
            Bucket: bucketName,
            Key: fileName,
            Body: data,
         },
         (err, response) => {
            if (err) throw err
            resolve(response)
         },
      )
   })

module.exports = uploadFile