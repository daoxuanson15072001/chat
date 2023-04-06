import { config } from 'src/config';
import * as AWS from 'aws-sdk';
import * as Sharp from 'sharp';

const s3 = new AWS.S3({
  secretAccessKey: config.s3.secretAccessKey,
  accessKeyId: config.s3.accessKeyId,
  region: config.s3.region,
});

export async function putImageToS3(
  image: Express.Multer.File,
  fileName: string,
) {
  await s3
    .putObject({
      ACL: 'public-read',
      Body: image.buffer,
      Bucket: config.s3.bucketName,
      ContentType: image.mimetype,
      Key: fileName,
    })
    .promise();

  // if (
  //   image.originalname.search(
  //     /\.(gif|jpe?g|tiff|png|webp|bmp|svg|HEIC|blob)$/gi
  //   ) !== -1
  // ) {
  //   await generateThumb(image, fileName);
  //   const putObjects = image["thumbs"].map((item) => {
  //     return s3
  //       .putObject({
  //         ACL: "public-read",
  //         Body: item.bufferData,
  //         Bucket: config.UPLOAD.S3_BUCKET,
  //         ContentType: image.mimetype,
  //         Key: item.fileName,
  //       })
  //       .promise();
  //   });

  //   await Promise.all(putObjects);
  // }
}
