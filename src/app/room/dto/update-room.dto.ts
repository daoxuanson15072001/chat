import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends CreateRoomDto{
    description ?: string;
    status?: number;
}
