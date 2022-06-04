import { serverApi } from 'services/serverApi';
import { Command } from 'types/Command';

interface UpdateCommand extends Command {
  _id: string | undefined;
}

class CommandService {
  async getOneCommand({
    commandId,
  }: {
    commandId: string | string[] | undefined;
  }) {
    const { data } = await serverApi.get(`/commands/${commandId}`);
    return data;
  }

  async updateCommand({
    _id,
    waiter,
    table,
    fishingType,
    products,
    total,
    isActive,
  }: UpdateCommand) {
    const { data } = await serverApi.put(`/commands/${_id}`, {
      waiter,
      table,
      fishingType,
      products,
      total,
      isActive,
    });
    return data;
  }
}

export default new CommandService();
