"use client";

import { useState } from "react";
import { ArrowRight, Loader2, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/feature/chat/store/store";

// Define the form schema with zod
const formSchema = z.object({
  prompt: z.string().min(1, { message: "Message cannot be empty." }),
});

export default function ChatTextarea() {
  const router = useRouter();
  const { setPrompts, setUiPrompts } = useChatStore();
  const [showUpgrade, setShowUpgrade] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  // Watch the prompt field to control the Send button
  const messageValue = form.watch("prompt", "");

  // Form submission handler that processes streamed response
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted message:", values.prompt);
   
    try {
      setIsPending(true);
      const response = await axios.post(`/api/chat`, {
        title: values.prompt.trim(),
        prompt: values.prompt.trim(),
      });
    
   
      const { prompts, uiPrompts, newMessage } = response.data;
      setPrompts(prompts);
      setUiPrompts(uiPrompts);
      toast.success("Chat Created Successfully Redirecting....");
      if (prompts && uiPrompts && newMessage) {
        router.push(`/chat/${newMessage.id}`);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("An error occurred.");
      form.reset();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl p-4">
        {showUpgrade && (
          <div className="flex items-center justify-between p-2 mb-2 text-sm">
            <span>Need more messages? Get higher limits with Premium.</span>
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                className="text-primary hover:text-primary/90"
                onClick={() => console.log("Upgrade clicked")}
              >
                Upgrade Plan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => setShowUpgrade(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Card className="border rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Ask v0 a question..."
                          className="min-h-[100px] resize-none pr-24 border-0 px-4 py-4"
                          rows={5}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="absolute left-2 bottom-2 text-xs" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute top-2 right-2 rounded-full"
                disabled={!messageValue.trim() || isPending}
              >
                {isPending ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <ArrowRight size={20} />
                )}
              </Button>
            </form>
          </Form>
        </Card>

        <div className="flex gap-2 mt-4 flex-wrap">
          {[
            "Clone a Screenshot",
            "Import from Figma",
            "Landing Page",
            "Sign Up Form",
            "Calculate Factorial",
          ].map((action) => (
            <Button
              key={action}
              variant="outline"
              size="sm"
              onClick={() => console.log(`${action} clicked`)}
            >
              {action}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
