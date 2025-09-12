import { useForm, type SubmitHandler } from "react-hook-form";
import type { Hero } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface HeroFormProps {
  onSubmit: SubmitHandler<Hero>;
}

export default function HeroForm({ onSubmit }: HeroFormProps) {
  const { register, handleSubmit } = useForm<Hero>({
    defaultValues: {
      nickname: "",
      real_name: "",
      origin_description: "",
      superpowers: ["Super", "Power"],
      catch_phrase: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        {...register("nickname", { required: true })}
        placeholder="Nickname"
      />
      <Input {...register("real_name")} placeholder="Real Name" />
      <Textarea
        {...register("origin_description")}
        placeholder="Origin Description"
      />
      <Input {...register("catch_phrase")} placeholder="Catch Phrase" />
      <Button type="submit">Create Hero</Button>
    </form>
  );
}
