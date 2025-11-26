import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const posts = [
  { title: "Launching", slug: "launch", status: "published", publishedAt: "May 1" },
  { title: "Roadmap", slug: "roadmap", status: "draft", publishedAt: "-" },
];

const AdminBlog = () => (
  <AdminLayout>
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Blog</CardTitle>
        <Button>Create post</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>{post.publishedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default AdminBlog;
