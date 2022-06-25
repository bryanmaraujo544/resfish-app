import { Command } from 'types/Command';

interface Action {
  type:
    | 'ADD-ALL-COMMANDS'
    | 'ADD-ONE-COMMAND'
    | 'REMOVE-ONE-COMMAND'
    | 'UPDATE-ONE-COMMAND';
  payload: any;
}

interface CommandsState {
  value: Command[] | [];
}

export const commandsReducer = (state: CommandsState, action: Action) => {
  switch (action.type) {
    case 'ADD-ALL-COMMANDS': {
      return { value: action.payload.commands };
    }
    case 'ADD-ONE-COMMAND': {
      const newCommand = action.payload.command;
      const commandAlreadyExists = state.value.some(
        (command) => command._id === newCommand._id
      );

      if (commandAlreadyExists) {
        return state;
      }

      const updatedCommands = [newCommand, ...state.value];
      const sortedCommands = updatedCommands.sort((a, b) => {
        if (a?.table < b?.table) {
          return -1;
        }
        if (b?.table < a?.table) {
          return 1;
        }
        if (b?.table === a?.table) {
          return 0;
        }
        return 0;
      });
      return { value: sortedCommands };
    }
    case 'UPDATE-ONE-COMMAND': {
      const updatedCommands = state.value.map((command) => {
        const newCommand = action.payload.command;
        if (command._id === newCommand._id) {
          return newCommand;
        }

        return command;
      });
      return { value: updatedCommands };
    }
    case 'REMOVE-ONE-COMMAND': {
      const updatedCommands = state.value.filter(
        (command) => command._id !== action.payload.commandId
      );
      return { value: updatedCommands };
    }
    default:
      throw new Error('The type informed is invalid');
  }
};
