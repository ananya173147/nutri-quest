import { useEffect, useState } from "react"
import { useToast } from "@/hooks/useToast"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Leaf, Apple } from "lucide-react"
import { Challenge, getChallenges, completeChallenge } from "@/api/challenges"

export function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        setLoading(true)
        const { challenges } = await getChallenges()
        setChallenges(challenges)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (error as Error).message,
        })
      } finally {
        setLoading(false)
      }
    }

    loadChallenges()
  }, [toast])

  const handleComplete = async (id: string) => {
    try {
      const { success, points } = await completeChallenge(id)
      if (success) {
        setChallenges(challenges.map(c => 
          c._id === id ? { ...c, completed: true } : c
        ))
        toast({
          title: "Challenge Completed!",
          description: `You earned ${points} points!`,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      })
    }
  }

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{challenge.title}</CardTitle>
        {challenge.type === 'waste' ? (
          <Trophy className="h-5 w-5 text-yellow-500" />
        ) : challenge.type === 'sustainability' ? (
          <Leaf className="h-5 w-5 text-green-500" />
        ) : (
          <Apple className="h-5 w-5 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Progress</span>
          <span className="text-sm font-medium">{challenge.completed ? "100%" : "In Progress"}</span>
        </div>
        <Progress value={challenge.completed ? 100 : 60} className="mb-4" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Due {new Date(challenge.deadline).toLocaleDateString()}
          </span>
          <Button 
            size="sm" 
            disabled={challenge.completed}
            onClick={() => handleComplete(challenge._id)}
          >
            {challenge.completed ? "Completed" : "Mark Complete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Challenges</h1>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="waste">Waste Reduction</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {challenges.map(challenge => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </TabsContent>
        <TabsContent value="waste" className="mt-6">
          {challenges.filter(c => c.type === 'waste').map(challenge => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </TabsContent>
        <TabsContent value="sustainability" className="mt-6">
          {challenges.filter(c => c.type === 'sustainability').map(challenge => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </TabsContent>
        <TabsContent value="nutrition" className="mt-6">
          {challenges.filter(c => c.type === 'nutrition').map(challenge => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}