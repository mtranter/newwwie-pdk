import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePublicApiApiClient } from "./../../hooks/useTypeSafeApiClient";
import { Button } from "./../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./../ui/form";
import { Input } from "./../ui/input";
import { Textarea } from "./../ui/textarea";

// zod schema for sign up. Email, company, position, linkedIn url, how did you hear about us, 'anything else we should know'
const formSchema = z.object({
  email: z.string().email(),
  company: z.string(),
  position: z.string(),
  linkedIn: z.string().url().optional(),
  howDidYouHearAboutUs: z.string(),
  anythingElse: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const apiClient = usePublicApiApiClient();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    await apiClient?.createSlackInvite({
      createSlackInviteRequestContent: data,
    });
    setHasSubmitted(true);
    setLoading(false);
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      company: "",
      position: "",
      howDidYouHearAboutUs: "",
    },
  });

  return hasSubmitted ? (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Thank you for signing up!</h2>
      <p className="text-lg">We'll be in touch soon.</p>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="lordmayor@ncc.nsw.gov.au" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Newcastle City Council" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Lord Mayor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/in/newielordmayor"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="howDidYouHearAboutUs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us?</FormLabel>
              <FormControl>
                <Input placeholder="Word of mouth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anythingElse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anything else we should know?</FormLabel>
              <FormControl>
                <Textarea placeholder="I'm excited to join!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
