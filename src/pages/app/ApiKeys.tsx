import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface ApiKey {
  id: string;
  organization_id: string;
  name: string;
  key_prefix: string;
  scopes: string[];
  status: string;
  app_id?: string;
  created_at?: string;
  last_used_at?: string;
}

interface ApiKeyResponse {
  data: ApiKey[];
}

interface CreateKeyResponse {
  full_key: string;
  key: ApiKey;
}

const ApiKeys = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [scopes, setScopes] = useState("read");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<ApiKeyResponse>({
    queryKey: ["api-keys"],
    queryFn: () => api.get("/api/api-keys"),
  });

  const createKey = useMutation<CreateKeyResponse, Error, { name: string; scopes: string[] }>(
    ({ name, scopes }) => api.post("/api/api-keys", { name, scopes }),
    {
      onSuccess: (res) => {
        toast({
          title: "API key created",
          description: `Save this key now: ${res.full_key}`,
        });
        queryClient.invalidateQueries({ queryKey: ["api-keys"] });
        setOpen(false);
        setName("");
        setScopes("read");
      },
      onError: (err) => {
        toast({ title: "Failed to create key", description: err.message, variant: "destructive" });
      },
    }
  );

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>API Keys</CardTitle>
            <p className="text-sm text-muted-foreground">Secure, per-app keys scoped to your organization.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Create key</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create API key</DialogTitle>
                <DialogDescription>Provide a label and scope. You will only see the full key once.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Production key" />
                </div>
                <div className="space-y-2">
                  <Label>Scopes</Label>
                  <Select value={scopes} onValueChange={setScopes}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scopes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="write">Write</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => createKey.mutate({ name: name || "New key", scopes: [scopes] })} disabled={createKey.isPending}>
                  {createKey.isPending ? "Creating..." : "Create key"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading && <Skeleton className="h-24" />}
          {error && <p className="text-sm text-destructive">Failed to load keys.</p>}
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Prefix</TableHead>
                  <TableHead>Scopes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>{key.name}</TableCell>
                    <TableCell className="font-mono text-xs">{key.key_prefix}</TableCell>
                    <TableCell className="space-x-1">
                      {key.scopes.map((scope) => (
                        <Badge key={scope} variant="outline">
                          {scope}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Badge variant={key.status === "active" ? "secondary" : "outline"}>{key.status}</Badge>
                    </TableCell>
                    <TableCell>{key.created_at ? new Date(key.created_at).toLocaleDateString() : "—"}</TableCell>
                    <TableCell>{key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default ApiKeys;
