import { Command } from '../types/Command';

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

type Reducer = (
  state: CommandsState,
  action: Action
) => { value: CommandsState };

export const commandsReducer = (state: CommandsState, action: Action) => {
  switch (action.type) {
    case 'ADD-ALL-COMMANDS': {
      return { value: action.payload.commands };
    }
    case 'ADD-ONE-COMMAND': {
      const updatedCommands = [...state.value, action.payload.command];
      return { value: updatedCommands };
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
