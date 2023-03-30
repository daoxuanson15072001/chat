import Room from 'src/database/entities/Room';
import User from 'src/database/entities/User';
import { UserRoom } from 'src/database/entities/UserRoom';
import { getRepository } from 'typeorm';


export async function initRoom(userId: number) {
  const roomRepo = getRepository(Room);
  const userRepo = getRepository(User);
  const userRoomRepo = getRepository(UserRoom);
  const allUser = await userRepo.find();
  allUser.forEach(async (item) => {
    const room = await roomRepo.save({
      name: item.fullName,
      avatar: item.avatar,
    });
    await userRoomRepo.save({ userId, roomId: room.id });
  });
  
}
