import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({
    description: 'Identificador Único',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
  })
  id: string = crypto.randomUUID();

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
  })
  createdAt: Date = new Date();

  @ApiProperty({
    description: 'Data de modificação do registro',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
  })
  updatedAt: Date = new Date();

  constructor() {
    return new Proxy(this, {
      set: (target, prop: string, value: unknown) => {
        if (!['createdAt', 'updatedAt'].includes(prop)) {
          target.updatedAt = new Date();
        }

        return Reflect.set(target, prop, value);
      },
    });
  }
}
