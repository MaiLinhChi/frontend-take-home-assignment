import * as Tabs from '@radix-ui/react-tabs'
import { useEffect, useState } from 'react'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'
import { api } from '@/utils/client/api'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */
const FILTER_TYPE = ['All', 'Pending', 'Completed']
export type Todo = {
  id: number
  body: string
  status: 'pending' | 'completed'
}
export type TodoProps = {
  todos: Todo[]
}

const Index = () => {
  const [listTodo, setListTodo] = useState<Todo[]>([])
  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: ['pending', 'completed'],
  })

  useEffect(() => {
    setListTodo(todos)
  }, [todos])
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <div className="pt-10">
          <Tabs.Root defaultValue="all" className="flex flex-col gap-4">
            <Tabs.List className="TabsList flex gap-2" color="cyan">
              {FILTER_TYPE.map((item, index) => (
                <Tabs.Trigger
                  value={item.toLowerCase()}
                  key={index}
                  onClick={() =>
                    setListTodo(
                      todos.filter((todo) =>
                        item.toLowerCase() === 'all'
                          ? true
                          : todo.status === item.toLowerCase()
                      )
                    )
                  }
                  className="TabsTrigger rounded-[24px] border border-solid border-gray-200 px-7 py-3 text-white"
                >
                  {item}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {FILTER_TYPE.map((item, index) => (
              <Tabs.Content
                value={item.toLowerCase()}
                key={index}
                className="TabsContent"
              >
                <TodoList todos={listTodo} />
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
