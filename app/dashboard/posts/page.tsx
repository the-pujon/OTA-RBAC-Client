'use client'

import { MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { IPost } from "@/types/post"
import { useDeletePostMutation, useGetPostsQuery } from "@/redux/features/post/postApi"
import { withAuth } from "@/components/auth/withAuth"

 function PostsPage() {
  const {data: postData} = useGetPostsQuery({})
  const [deletePost] = useDeletePostMutation()
  const posts: IPost[] = postData?.data
  console.log(posts)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button asChild>
          <Link href="/dashboard/posts/create">Create Post</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post?._id}>
                <TableCell className="font-medium">{post?.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {post?.tags?.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
                {/* <TableCell>{post?.createdAt?.toLocaleDateString()}</TableCell>
                <TableCell>{post?.updatedAt?.toLocaleDateString()}</TableCell> */}
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <div className="outline-none hover:border-none hover:outline-none cursor-pointer" onClick={()=>{
                          deletePost(post?._id)
                        }}>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </div>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem asChild>
                        <Link href={`/dashboard/posts/update/${post?._id}`}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


// export default PostsPage;
export default withAuth(PostsPage,['moderator','superAdmin']);