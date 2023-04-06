import { Injectable, UploadedFiles } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as md5 from 'md5';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/database/entities/chat/Message';
import { putImageToS3 } from 'src/helpers/utils';

@Injectable()
export class CommonService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const results = [];

    for (let file of files) {
      let arr_ext = (file.originalname || '').split('.');
      const originalName = md5(file.originalname);

      let md5Name = arr_ext.length
        ? `${originalName}.${arr_ext[arr_ext.length - 1]}`
        : originalName;

      const fileName = `${Date.now().toString()}-${md5Name}`;

      await putImageToS3(file, fileName);

      results.push(fileName);
    }
    return results;
  }
}