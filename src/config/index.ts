export const config = {
  s3: {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    bucketName : process.env.BUCKET_NAME
  },
};
