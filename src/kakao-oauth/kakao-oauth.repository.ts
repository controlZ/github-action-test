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
    await this.dataSource.manager.transaction(
      async (entityManager: EntityManager): Promise<void> => {
        const UserToCreate = new User();
        UserToCreate.id = userdata.id;
        UserToCreate.nickname = userdata.properties.nickname;
        UserToCreate.email = userdata.kakao_account.email;

        await entityManager.save(UserToCreate);
      },
    );
  }
}
