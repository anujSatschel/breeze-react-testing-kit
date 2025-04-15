
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { 
  counterState, 
  todoItemFamily, 
  todoListState, 
  completedTodosCountSelector,
  filteredTodosSelector,
  TodoItem
} from '../store/atoms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const RecoilExample = () => {
  const [counter, setCounter] = useRecoilState(counterState);
  const [todoIds, setTodoIds] = useRecoilState(todoListState);
  const completedCount = useRecoilValue(completedTodosCountSelector);
  const [newTodoText, setNewTodoText] = useState('');
  
  // Get todos filtered by status
  const allTodos = useRecoilValue(filteredTodosSelector('all'));
  const completedTodos = useRecoilValue(filteredTodosSelector('completed'));
  const incompleteTodos = useRecoilValue(filteredTodosSelector('incomplete'));
  
  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    
    const newId = todoIds.length > 0 ? Math.max(...todoIds) + 1 : 1;
    
    // Add new ID to the list
    setTodoIds([...todoIds, newId]);
    
    // Set the atom for this specific todo
    const setTodoItem = useSetRecoilState(todoItemFamily(newId));
    setTodoItem({
      id: newId,
      text: newTodoText,
      completed: false,
    });
    
    setNewTodoText('');
  };

  const toggleTodoCompletion = (todo: TodoItem) => {
    const setTodoItem = useSetRecoilState(todoItemFamily(todo.id));
    setTodoItem({
      ...todo,
      completed: !todo.completed,
    });
  };
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Recoil Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Counter Example */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Atom Example</CardTitle>
            <CardDescription>A simple counter using Recoil state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-3xl font-bold">{counter}</div>
              <div className="flex space-x-2">
                <Button onClick={() => setCounter(counter - 1)} variant="outline">-</Button>
                <Button onClick={() => setCounter(counter + 1)}>+</Button>
                <Button onClick={() => setCounter(0)} variant="secondary">Reset</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Todo List with AtomFamily */}
        <Card>
          <CardHeader>
            <CardTitle>AtomFamily Example</CardTitle>
            <CardDescription>Todo list using atomFamily and selectors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  type="text" 
                  value={newTodoText} 
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder="Add a new todo"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addTodo();
                  }}
                />
                <Button onClick={addTodo}>Add</Button>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Completed: {completedCount} / {allTodos.length}
                </p>
              </div>
              
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all">All ({allTodos.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedTodos.length})</TabsTrigger>
                  <TabsTrigger value="incomplete">Incomplete ({incompleteTodos.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-2">
                  {allTodos.map(todo => (
                    <TodoItemComponent key={todo.id} todo={todo} onToggle={toggleTodoCompletion} />
                  ))}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-2">
                  {completedTodos.map(todo => (
                    <TodoItemComponent key={todo.id} todo={todo} onToggle={toggleTodoCompletion} />
                  ))}
                </TabsContent>
                
                <TabsContent value="incomplete" className="space-y-2">
                  {incompleteTodos.map(todo => (
                    <TodoItemComponent key={todo.id} todo={todo} onToggle={toggleTodoCompletion} />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// TodoItem component
const TodoItemComponent = ({ 
  todo, 
  onToggle 
}: { 
  todo: TodoItem; 
  onToggle: (todo: TodoItem) => void;
}) => {
  return (
    <div className="flex items-center space-x-2 p-2 border rounded">
      <Checkbox 
        id={`todo-${todo.id}`} 
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo)}
      />
      <label 
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
      >
        {todo.text}
      </label>
    </div>
  );
};

export default RecoilExample;
