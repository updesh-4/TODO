import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/client";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Todos() {
  const qc = useQueryClient();
  const { data: todos } = useQuery(["todos"], async () => (await API.get("/todos")).data);

  const create = useMutation(
    async (payload: any) => (await API.post("/todos", payload)).data,
    { onSuccess: () => qc.invalidateQueries(["todos"]) }
  );

  const toggle = useMutation(
    async ({ id, completed }: { id: string; completed: boolean }) =>
      (await API.patch(`/todos/${id}`, { completed })).data,
    { onSuccess: () => qc.invalidateQueries(["todos"]) }
  );

  const remove = useMutation(
    async (id: string) => (await API.delete(`/todos/${id}`)).data,
    { onSuccess: () => qc.invalidateQueries(["todos"]) }
  );

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>

        {/* Add Todo */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const t = (e.target as any).title.value;
            if (t.trim()) create.mutate({ title: t });
            (e.target as any).reset();
          }}
          className="flex gap-3"
        >
          <Input name="title" placeholder="Add a new task..." />
          <Button>Add</Button>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos?.map((t: any) => (
            <Card
              key={t._id}
              className="p-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={t.completed}
                  onCheckedChange={() =>
                    toggle.mutate({ id: t._id, completed: !t.completed })
                  }
                />
                <span
                  className={`text-lg ${
                    t.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.title}
                </span>
              </div>

              <Trash2
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => remove.mutate(t._id)}
              />
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
