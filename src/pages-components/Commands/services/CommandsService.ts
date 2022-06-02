import { serverApi } from 'services/serverApi';
import { Command } from '../types/Command';

class CommandsService {
  async getAllCommands() {
    const { data } = await serverApi.get('/commands');
    return data;
  }

  async storeCommand(command: Command) {
    const { data } = await serverApi.post('/commands', command);
    return data;
  }
}

export default new CommandsService();