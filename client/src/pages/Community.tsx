import { useEffect, useState } from "react"
import { useToast } from "@/hooks/useToast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Cookie, Lightbulb, Trophy } from "lucide-react"
import { Post, getPosts, createPost } from "@/api/community"

export function Community() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        const { posts } = await getPosts()
        setPosts(posts)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        })
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [toast])

  const handleCreatePost = async () => {
    if (!newPost.trim()) return

    try {
      const { post } = await createPost({
        content: newPost,
        type: 'tip'
      })
      setPosts([post, ...posts])
      setNewPost("")
      toast({
        title: "Success",
        description: "Post created successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Community</h1>
      
      <Card>
        <CardContent className="pt-6">
          <Textarea
            placeholder="Share your sustainable tips and achievements..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleCreatePost}>Share</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{post.avatar}</span>
                <div>
                  <CardTitle className="text-base font-medium">{post.username}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  <img
                    src={post.images[0]}
                    alt="Post content"
                    className="rounded-lg w-full"
                  />
                </div>
              )}
              <div className="flex items-center space-x-4 text-muted-foreground">
                <Button variant="ghost" size="sm" className="space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}