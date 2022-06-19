import { serverApi } from 'services/serverApi';

class CommandService {
  async getTodayCommands({ isActive }: { isActive: string }) {
    const { data } = await serverApi.get(`/commands?isActive=${isActive}`);
    return data;
  }
}

export default new CommandService();
