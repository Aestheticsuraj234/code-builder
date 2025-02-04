import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"
import type { Step } from "../types"

interface StepsListProps {
  steps: Step[]
  currentStep: number
  onStepClick: (stepId: number) => void
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-white tracking-tight">Build Steps</h2>
          <Badge variant="secondary" className="bg-[#2A2A2A] text-gray-400 hover:bg-[#2A2A2A]">
            v1
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`group relative rounded-lg transition-all duration-200 ${
              currentStep === step.id ? "bg-[#2A2A2A] ring-1 ring-[#3A3A3A] p-4" : "p-4 hover:bg-[#242424]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {step.status === "completed" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : step.status === "in-progress" ? (
                  <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-medium text-white truncate">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{step.description}</p>
              </div>
            </div>
            {currentStep === step.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

