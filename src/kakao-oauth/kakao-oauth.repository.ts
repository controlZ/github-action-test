import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class KakaoOauthRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOneById(Id: bigint): Promise<User | undefined> {
    return this.dataSource.manager.findOneBy(User, { id: Id });
  }

  async createUser(userdata): Promise<void> {
    this.dataSource.transaction(
      async (manager: EntityManager): Promise<void> => {
        const UserToCreate = new User();
        UserToCreate.id = userdata.id;
        UserToCreate.nickname = userdata.properties.nickname;
        UserToCreate.email = userdata.kakao_account.email;
        await manager.save(UserToCreate);
      },
    );
  }

  async updateUser(Id: bigint, username: string): Promise<void> {
    this.dataSource.transaction(
      async (manager: EntityManager): Promise<void> => {
        const UserToUpdate = await manager.findOneBy(User, { id: Id });
        UserToUpdate.nickname = username;
        await manager.save(UserToUpdate);
      },
    );
  }

  async deleteUser(Id: bigint): Promise<void> {
    this.dataSource.transaction(
      async (manager: EntityManager): Promise<void> => {
        const UserToDelete = await manager.findOneBy(User, { id: Id });
        await manager.remove(UserToDelete);
      },
    );
  }
}
