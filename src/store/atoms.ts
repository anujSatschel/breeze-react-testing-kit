
import { atom, atomFamily, selector, selectorFamily } from 'recoil';

// Basic counter atom
export const counterState = atom({
  key: 'counterState',
  default: 0,
});

// Todo item type
export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// AtomFamily example - create an atom for each todo item
export const todoItemFamily = atomFamily<TodoItem, number>({
  key: 'todoItemFamily',
  default: (id) => ({
    id,
    text: `Todo Item ${id}`,
    completed: false,
  }),
});

// List of todo IDs
export const todoListState = atom<number[]>({
  key: 'todoListState',
  default: [1, 2, 3],
});

// Selector to get all todo items
export const todoListSelector = selector({
  key: 'todoListSelector',
  get: ({ get }) => {
    const todoIds = get(todoListState);
    return todoIds.map((id) => get(todoItemFamily(id)));
  },
});

// Selector to get completed todos count
export const completedTodosCountSelector = selector({
  key: 'completedTodosCount',
  get: ({ get }) => {
    const todoItems = get(todoListSelector);
    return todoItems.filter((item) => item.completed).length;
  },
});

// Selector to get filtered todos by completion status
export const filteredTodosSelector = selectorFamily<TodoItem[], 'all' | 'completed' | 'incomplete'>({
  key: 'filteredTodosSelector',
  get: (filter) => ({ get }) => {
    const todoItems = get(todoListSelector);
    
    switch (filter) {
      case 'completed':
        return todoItems.filter((item) => item.completed);
      case 'incomplete':
        return todoItems.filter((item) => !item.completed);
      default:
        return todoItems;
    }
  },
});
