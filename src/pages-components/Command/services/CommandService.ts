import { serverApi } from 'services/serverApi';

class CommandService {
  async getOneCommand({ commandId }: { commandId: string }) {
    const { data } = await serverApi.get(`/commands/${commandId}`);
    return data;
  }
}

export default new CommandService();
